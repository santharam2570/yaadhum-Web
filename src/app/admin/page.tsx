import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { Download, FileText, Inbox, LogOut, Mail, Users } from "lucide-react";
import { PageShell } from "@/components/ui";
import { adminEnabled, isAdmin } from "@/lib/admin-auth";
import { listSubmissions, type Collection, type Submission } from "@/lib/storage";
import { logout } from "./actions";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const tabs: { id: Collection; label: string; icon: typeof Inbox }[] = [
  { id: "enquiries", label: "Enquiries", icon: Inbox },
  { id: "applications", label: "Applications", icon: FileText },
  { id: "subscribers", label: "Subscribers", icon: Users },
];

const stamp = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" });
const when = (iso: string) => `${stamp.format(new Date(iso))} UTC`;

export default function AdminPage({ searchParams }: PageProps<"/admin">) {
  return (
    <PageShell>
      <section className="mx-auto min-h-[70vh] max-w-6xl px-5 pt-32 pb-24 sm:pt-40 lg:px-8">
        <Suspense fallback={<div className="panel mx-auto h-72 max-w-md animate-pulse" />}>
          <AdminGate searchParams={searchParams} />
        </Suspense>
      </section>
    </PageShell>
  );
}

async function AdminGate({ searchParams }: { searchParams: PageProps<"/admin">["searchParams"] }) {
  await connection();
  if (!adminEnabled()) {
    return (
      <div className="panel mx-auto max-w-xl p-8">
        <h1 className="font-display text-3xl font-bold">Admin inbox is disabled</h1>
        <p className="mt-3 text-cream/60">
          Set an <code className="rounded bg-cream/10 px-1.5 py-0.5 text-sm">ADMIN_PASSWORD</code> environment variable (at least 8 characters) and restart the server to enable it.
        </p>
      </div>
    );
  }
  if (!(await isAdmin())) return <LoginForm />;

  const { tab } = await searchParams;
  const active: Collection = tabs.some((t) => t.id === tab) ? (tab as Collection) : "enquiries";
  const [enquiries, applications, subscribers] = await Promise.all([listSubmissions("enquiries"), listSubmissions("applications"), listSubmissions("subscribers")]);
  const data: Record<Collection, Submission[]> = { enquiries, applications, subscribers };
  const records = data[active];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-brand text-xs font-bold tracking-logo text-gold">ADMIN</p>
          <h1 className="mt-2 font-display text-4xl font-bold">Website inbox</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={`/admin/export/${active}`}
            className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-5 py-2.5 text-sm font-semibold transition hover:border-flame hover:text-flame"
          >
            <Download className="size-4" /> Export CSV
          </a>
          <form action={logout}>
            <button type="submit" className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-5 py-2.5 text-sm font-semibold transition hover:border-flame hover:text-flame">
              <LogOut className="size-4" /> Sign out
            </button>
          </form>
        </div>
      </div>

      <nav aria-label="Collections" className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Link
            key={t.id}
            href={`/admin?tab=${t.id}`}
            aria-current={t.id === active ? "page" : undefined}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
              t.id === active ? "border-flame bg-flame/15 text-cream" : "border-cream/10 text-cream/60 hover:text-cream"
            }`}
          >
            <t.icon className="size-4" /> {t.label}
            <span className="rounded-full bg-cream/10 px-2 text-xs">{data[t.id].length}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8">
        {records.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-cream/15 p-12 text-center text-cream/55">Nothing here yet.</p>
        ) : active === "subscribers" ? (
          <SubscriberTable records={records} />
        ) : (
          <ul className="space-y-3">
            {records.map((r) => (
              <li key={r.id}>
                <RecordCard collection={active} record={r} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const str = (v: unknown) => (Array.isArray(v) ? v.join(", ") : typeof v === "boolean" ? (v ? "Yes" : "No") : String(v ?? ""));

const fieldOrder: Record<Exclude<Collection, "subscribers">, [string, string][]> = {
  enquiries: [
    ["company", "Company"],
    ["phone", "Phone"],
    ["country", "Country"],
    ["topic", "Topic"],
    ["services", "Services"],
    ["budget", "Budget"],
    ["timeline", "Timeline"],
  ],
  applications: [
    ["phone", "Phone"],
    ["location", "Location"],
    ["experience", "Experience"],
    ["noticePeriod", "Notice period"],
    ["linkedin", "LinkedIn"],
    ["portfolio", "Portfolio"],
  ],
};

function RecordCard({ collection, record }: { collection: Exclude<Collection, "subscribers">; record: Submission }) {
  const d = record.data;
  const longText = collection === "enquiries" ? str(d.message) : str(d.coverLetter);
  return (
    <details className="panel group p-0">
      <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
        <span>
          <span className="block font-display text-lg font-bold">{str(d.name)}</span>
          <span className="block text-sm text-cream/55">
            {collection === "applications" ? str(d.jobTitle) : str(d.topic) || "Enquiry"} · {str(d.email)}
          </span>
        </span>
        <span className="text-xs text-cream/45">{when(record.createdAt)}</span>
      </summary>
      <div className="border-t border-cream/10 p-5 sm:p-6">
        <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-cream/45">Email</dt>
            <dd>
              <a href={`mailto:${str(d.email)}`} className="inline-flex items-center gap-1.5 text-flame hover:underline">
                <Mail className="size-3.5" /> {str(d.email)}
              </a>
            </dd>
          </div>
          {fieldOrder[collection].map(([key, label]) => {
            const value = str(d[key]);
            if (!value) return null;
            const isUrl = /^https?:\/\//.test(value);
            return (
              <div key={key}>
                <dt className="text-xs text-cream/45">{label}</dt>
                <dd className="break-words text-cream/85">
                  {isUrl ? (
                    <a href={value} target="_blank" rel="noopener noreferrer" className="text-flame hover:underline">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
        {longText && <p className="mt-5 rounded-2xl bg-ink/60 p-4 text-sm leading-relaxed whitespace-pre-wrap text-cream/80">{longText}</p>}
        {record.file && (
          <a
            href={`/admin/files/${collection}/${encodeURIComponent(record.file.storedAs)}`}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-fire px-5 py-2.5 text-sm font-semibold text-white"
          >
            <Download className="size-4" /> {record.file.name} ({Math.max(1, Math.round(record.file.size / 1024))} KB)
          </a>
        )}
      </div>
    </details>
  );
}

function SubscriberTable({ records }: { records: Submission[] }) {
  return (
    <div className="panel overflow-x-auto p-0">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-cream/10 text-xs text-cream/45">
          <tr>
            <th className="px-5 py-3 font-semibold">Email</th>
            <th className="px-5 py-3 font-semibold">Source</th>
            <th className="px-5 py-3 font-semibold">Subscribed</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cream/5">
          {records.map((r) => (
            <tr key={r.id}>
              <td className="px-5 py-3">{str(r.data.email)}</td>
              <td className="px-5 py-3 text-cream/60">{str(r.data.source)}</td>
              <td className="px-5 py-3 text-cream/60">{when(r.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
