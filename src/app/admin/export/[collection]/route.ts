import { isAdmin } from "@/lib/admin-auth";
import { listSubmissions, type Collection } from "@/lib/storage";

const collections: Collection[] = ["enquiries", "applications", "subscribers"];

function cell(value: unknown) {
  let s = Array.isArray(value) ? value.join("; ") : String(value ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(_req: Request, { params }: RouteContext<"/admin/export/[collection]">) {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });

  const { collection } = await params;
  if (!collections.includes(collection as Collection)) return new Response("Not found", { status: 404 });

  const records = await listSubmissions(collection as Collection);
  const keys = Array.from(new Set(records.flatMap((r) => Object.keys(r.data))));
  const header = ["id", "createdAt", ...keys, "file"];
  const rows = records.map((r) => [r.id, r.createdAt, ...keys.map((k) => r.data[k]), r.file?.name ?? ""].map(cell).join(","));
  const csv = [header.map(cell).join(","), ...rows].join("\r\n");

  return new Response(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="yaadhum-${collection}-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "private, no-store",
    },
  });
}
