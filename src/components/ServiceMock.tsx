import type { CSSProperties, ReactNode } from "react";
import {
  Bot,
  Check,
  CircleDollarSign,
  Cloud,
  FileText,
  GitBranch,
  Laptop,
  Mail,
  Package,
  Printer,
  Router,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
  Database,
  Bell,
} from "lucide-react";
import type { ServiceSlug } from "@/data/services";

const d = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

function Frame({ path, children }: { path: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-cream/10 bg-[#0c0505]/95 shadow-2xl shadow-ember-900/60">
      <div className="flex items-center gap-3 border-b border-cream/8 px-4 py-3">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-ember-500/80" />
          <span className="size-2.5 rounded-full bg-gold/70" />
          <span className="size-2.5 rounded-full bg-cream/25" />
        </span>
        <span className="mx-auto truncate rounded-md bg-cream/5 px-3 py-1 font-mono text-[11px] text-cream/45">app.yaadhum.com/{path}</span>
        <span className="flex items-center gap-1.5 font-brand text-[10px] font-bold tracking-logo text-flame">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 animate-ping-slow rounded-full bg-flame" />
            <span className="relative size-1.5 rounded-full bg-flame" />
          </span>
          LIVE
        </span>
      </div>
      <div className="min-h-[17rem] p-4 sm:p-5">{children}</div>
    </div>
  );
}

function Kpi({ label, value, delay, tone = "cream", trend }: { label: string; value: string; delay: number; tone?: "cream" | "fire"; trend?: ReactNode }) {
  return (
    <div className="animate-rise rounded-xl border border-cream/8 bg-cream/[0.03] px-3 py-2.5" style={d(delay)}>
      <p className="truncate text-[10px] tracking-wide text-cream/45 uppercase">{label}</p>
      <p className={`mt-0.5 flex items-baseline gap-1.5 font-display text-lg font-bold sm:text-xl ${tone === "fire" ? "text-fire" : "text-cream"}`}>
        {value}
        {trend}
      </p>
    </div>
  );
}

function Bars({ values, highlightLast = true, className = "h-28" }: { values: number[]; highlightLast?: boolean; className?: string }) {
  return (
    <div className={`flex items-end gap-1.5 ${className}`}>
      {values.map((h, i) => (
        <span
          key={i}
          className={`flex-1 origin-bottom animate-grow rounded-t ${highlightLast && i === values.length - 1 ? "bg-fire" : "bg-gradient-to-t from-ember-800 to-ember-500/70"}`}
          style={{ height: `${h}%`, ...d(200 + i * 60) }}
        />
      ))}
    </div>
  );
}

function AiMock() {
  return (
    <Frame path="cortex/assistant">
      <div className="flex min-h-[15.5rem] flex-col gap-3">
        <div className="ml-auto max-w-[80%] animate-rise rounded-2xl rounded-br-sm bg-fire px-4 py-2.5 text-[13px] text-white" style={d(200)}>
          Summarise this week&apos;s supplier invoices and flag anything unusual.
        </div>
        <div className="relative">
          <div className="absolute top-0 left-0 flex animate-rise items-center gap-2" style={d(700)}>
            <span className="grid size-7 place-items-center rounded-full bg-sun">
              <Bot className="size-4 text-ember-700" />
            </span>
            <span className="flex animate-fade-away gap-1 rounded-full bg-cream/5 px-3 py-2" style={d(1900)}>
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-1.5 animate-bounce-dot rounded-full bg-cream/60" style={d(i * 150)} />
              ))}
            </span>
          </div>
          <div className="flex animate-rise gap-2" style={d(2000)}>
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sun">
              <Bot className="size-4 text-ember-700" />
            </span>
            <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-cream/10 bg-cream/[0.04] px-4 py-3 text-[13px] text-cream/85">
              <p>
                <span className="font-semibold text-cream">214 invoices</span> processed, totalling <span className="font-semibold text-gold">$1.28M</span>. Two need your
                attention:
              </p>
              <div className="mt-2.5 space-y-1.5 text-[11px]">
                {[
                  ["INV-8841 · Duplicate of INV-8790", "$12,400"],
                  ["INV-8902 · Price 18% above contract", "$7,950"],
                ].map(([a, b]) => (
                  <div key={a} className="flex items-center justify-between gap-2 rounded-md bg-ink/70 px-2.5 py-1.5">
                    <span className="truncate text-cream/70">{a}</span>
                    <span className="shrink-0 text-ember-300">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pl-9">
          {["Hold payments", "Email supplier", "Open report"].map((s, i) => (
            <span key={s} className="flex animate-rise items-center gap-1 rounded-full border border-ember-500/30 bg-ember-500/10 px-3 py-1 text-[11px] text-cream/85" style={d(2600 + i * 120)}>
              <Sparkles className="size-3 text-flame" /> {s}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function SoftwareMock() {
  const code = [
    ["text-flame", "export async function", "text-cream", " createOrder", "text-cream/50", "(input) {"],
    ["text-cream/40", "  const", "text-cream", " order = await", "text-gold", " db.orders.insert(input);"],
    ["text-cream/40", "  await", "text-cream", " events.publish(", "text-emerald-300", "\"order.created\"", "text-cream", ", order);"],
    ["text-cream/40", "  return", "text-cream", " { id: order.id, status:", "text-emerald-300", " \"confirmed\"", "text-cream", " };"],
    ["text-cream/50", "}"],
  ];
  const steps = [
    { label: "Build", time: "42s" },
    { label: "Unit & e2e tests", time: "1m 18s" },
    { label: "Security scan", time: "26s" },
    { label: "Deploy to production", time: "live" },
  ];
  return (
    <Frame path="pipelines/web-platform">
      <div className="grid gap-3 sm:grid-cols-[1.35fr_1fr]">
        <div className="overflow-hidden rounded-xl border border-cream/8 bg-ink/80 p-3 font-mono text-[10.5px] leading-relaxed">
          <p className="mb-2 flex items-center gap-1.5 text-[10px] text-cream/40">
            <GitBranch className="size-3" /> feature/checkout-v2 · src/orders.ts
          </p>
          {code.map((line, i) => (
            <p key={i} className="animate-rise truncate whitespace-pre" style={d(150 + i * 140)}>
              <span className="mr-3 text-cream/20 select-none">{i + 1}</span>
              {Array.from({ length: line.length / 2 }, (_, k) => (
                <span key={k} className={line[k * 2]}>
                  {line[k * 2 + 1]}
                </span>
              ))}
            </p>
          ))}
          <p className="mt-2 animate-rise text-emerald-300" style={d(1000)}>
            ✓ 248 tests passed · coverage 92%
          </p>
        </div>
        <ol className="space-y-2">
          {steps.map((s, i) => {
            const last = i === steps.length - 1;
            return (
              <li
                key={s.label}
                className={`relative flex animate-rise items-center gap-2.5 overflow-hidden rounded-lg border px-3 py-2.5 text-[11px] ${last ? "border-flame/40" : "border-cream/8 bg-cream/[0.03]"}`}
                style={d(500 + i * 350)}
              >
                {last && <span className="absolute inset-0 origin-left animate-progress bg-fire/25 [animation-duration:2.4s]" style={d(1900)} />}
                <span className={`relative grid size-5 shrink-0 place-items-center rounded-full ${last ? "bg-fire" : "bg-emerald-400/15"}`}>
                  <Check className={`size-3 ${last ? "text-white" : "text-emerald-300"}`} strokeWidth={3} />
                </span>
                <span className="relative flex-1 text-cream/85">{s.label}</span>
                <span className="relative font-mono text-cream/45">{s.time}</span>
              </li>
            );
          })}
          <li className="flex animate-rise items-center justify-between rounded-lg bg-cream/[0.03] px-3 py-2 text-[10px] text-cream/50" style={d(2200)}>
            <span>Release v4.12.0</span>
            <span className="text-gold">14 deploys this week</span>
          </li>
        </ol>
      </div>
    </Frame>
  );
}

function CloudMock() {
  const providers = [
    { name: "AWS", spend: 62, color: "bg-fire" },
    { name: "Azure", spend: 41, color: "bg-gold" },
    { name: "Google Cloud", spend: 24, color: "bg-ember-300" },
  ];
  const resources = [
    ["eks-prod-cluster", "Healthy", "text-emerald-300 bg-emerald-400/10"],
    ["sql-analytics-01", "Rightsize", "text-gold bg-gold/10"],
    ["vm-legacy-batch", "Idle → stop", "text-ember-300 bg-ember-500/15"],
  ];
  return (
    <Frame path="cloudops/overview">
      <div className="grid grid-cols-3 gap-2.5">
        <Kpi label="Monthly spend" value="$48.2k" delay={100} tone="fire" trend={<TrendingDown className="size-3.5 text-emerald-300" />} />
        <Kpi label="Savings found" value="31%" delay={200} />
        <Kpi label="Uptime" value="99.98%" delay={300} />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1.1fr_1fr]">
        <div className="rounded-xl border border-cream/8 bg-cream/[0.025] p-3">
          <p className="text-[10px] tracking-wide text-cream/45 uppercase">Spend by provider</p>
          <div className="mt-3 space-y-3">
            {providers.map((p, i) => (
              <div key={p.name}>
                <div className="flex justify-between text-[11px] text-cream/70">
                  <span className="flex items-center gap-1.5">
                    <Cloud className="size-3 text-cream/40" /> {p.name}
                  </span>
                  <span className="font-mono">${(p.spend * 0.38).toFixed(1)}k</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-cream/8">
                  <div className={`h-full origin-left animate-progress rounded-full ${p.color} [animation-duration:1.4s]`} style={{ width: `${p.spend}%`, ...d(300 + i * 150) }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {resources.map(([name, status, tone], i) => (
            <div key={name} className="flex animate-rise items-center justify-between gap-2 rounded-lg border border-cream/8 bg-cream/[0.03] px-3 py-2.5 text-[11px]" style={d(700 + i * 140)}>
              <span className="flex min-w-0 items-center gap-2">
                <Server className="size-3.5 shrink-0 text-flame" />
                <span className="truncate font-mono text-cream/80">{name}</span>
              </span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${tone}`}>{status}</span>
            </div>
          ))}
          <div className="flex animate-rise items-center gap-2 rounded-lg bg-fire/15 px-3 py-2 text-[11px] text-cream" style={d(1200)}>
            <ShieldCheck className="size-3.5 text-gold" /> 214 / 218 policy checks passing
          </div>
        </div>
      </div>
    </Frame>
  );
}

function InfraMock() {
  const tickets = [
    { id: "INC-2041", title: "Branch 12 · Wi-Fi down", sla: "18 min left", tone: "text-ember-300 bg-ember-500/15", icon: Router },
    { id: "REQ-1187", title: "New laptop setup · Finance", sla: "On track", tone: "text-emerald-300 bg-emerald-400/10", icon: Laptop },
    { id: "PM-0332", title: "Quarterly server maintenance", sla: "Scheduled", tone: "text-gold bg-gold/10", icon: Server },
    { id: "INC-2038", title: "Printer queue stuck · HQ", sla: "Resolved", tone: "text-cream/60 bg-cream/5", icon: Printer },
  ];
  return (
    <Frame path="servicedesk/queue">
      <div className="grid gap-3 sm:grid-cols-[1fr_1.5fr]">
        <div className="flex flex-col items-center justify-center rounded-xl border border-cream/8 bg-cream/[0.025] p-4">
          <div className="relative size-28">
            <svg viewBox="0 0 100 100" className="size-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgb(255 243 223 / 0.08)" strokeWidth="9" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="url(#sla-grad)" strokeWidth="9" strokeLinecap="round" pathLength={100} strokeDasharray="100" strokeDashoffset={3} />
              <defs>
                <linearGradient id="sla-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#f6c27a" />
                  <stop offset="1" stopColor="#e3221c" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <p className="font-display text-2xl font-bold">97%</p>
            </div>
          </div>
          <p className="mt-2 text-[10px] tracking-wide text-cream/45 uppercase">SLA met · 30 days</p>
          <div className="mt-3 grid w-full grid-cols-2 gap-2 text-center">
            <div className="rounded-lg bg-cream/[0.03] py-1.5">
              <p className="font-display text-sm font-bold">1,284</p>
              <p className="text-[9px] text-cream/45 uppercase">Assets</p>
            </div>
            <div className="rounded-lg bg-cream/[0.03] py-1.5">
              <p className="font-display text-sm font-bold">22m</p>
              <p className="text-[9px] text-cream/45 uppercase">Avg response</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {tickets.map((t, i) => (
            <div key={t.id} className="flex animate-rise items-center gap-2.5 rounded-lg border border-cream/8 bg-cream/[0.03] px-3 py-2.5 text-[11px]" style={d(200 + i * 160)}>
              <t.icon className="size-4 shrink-0 text-flame" />
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] text-cream/40">{t.id}</span>
                <span className="block truncate text-cream/85">{t.title}</span>
              </span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.tone}`}>{t.sla}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function AutomationMock() {
  const nodes = [
    { icon: Mail, label: "Invoice email", sub: "Trigger" },
    { icon: Sparkles, label: "AI extraction", sub: "98.7% confidence" },
    { icon: UserCheck, label: "Auto-approve", sub: "< $5,000 rule" },
    { icon: Database, label: "Post to ERP", sub: "SAP · AP module" },
    { icon: Bell, label: "Notify team", sub: "Teams channel" },
  ];
  return (
    <Frame path="flowstudio/accounts-payable">
      <div className="relative">
        <div className="absolute top-5 bottom-5 left-[1.4rem] w-px bg-gradient-to-b from-flame via-ember-500/40 to-transparent" />
        <ol className="relative space-y-2">
          {nodes.map((n, i) => (
            <li key={n.label} className="flex animate-rise items-center gap-3" style={d(150 + i * 220)}>
              <span className={`grid size-11 shrink-0 place-items-center rounded-xl border ${i === 1 ? "border-flame bg-fire" : "border-cream/10 bg-coal"}`}>
                <n.icon className={`size-5 ${i === 1 ? "text-white" : "text-flame"}`} />
              </span>
              <span className="flex flex-1 items-center justify-between gap-2 rounded-lg border border-cream/8 bg-cream/[0.03] px-3 py-2 text-[11px]">
                <span>
                  <span className="block font-semibold text-cream/90">{n.label}</span>
                  <span className="text-cream/45">{n.sub}</span>
                </span>
                <Check className="size-3.5 text-emerald-300" strokeWidth={3} />
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-3 grid animate-rise grid-cols-3 gap-2" style={d(1400)}>
        {[
          ["Runs today", "1,846"],
          ["Hours saved", "312"],
          ["Exceptions", "9"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-cream/[0.03] px-2.5 py-2 text-center">
            <p className="font-display text-sm font-bold text-cream">{v}</p>
            <p className="text-[9px] tracking-wide text-cream/45 uppercase">{k}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function EcommerceMock() {
  const orders = [
    ["#10482", "Shopify · UK", "$184.00"],
    ["#10481", "Amazon · US", "$62.50"],
    ["#10480", "Web · UAE", "AED 940"],
  ];
  return (
    <Frame path="commercehub/today">
      <div className="grid grid-cols-3 gap-2.5">
        <Kpi label="Revenue today" value="$38.4k" delay={100} tone="fire" trend={<TrendingUp className="size-3.5 text-emerald-300" />} />
        <Kpi label="Conversion" value="3.9%" delay={200} />
        <Kpi label="Orders" value="612" delay={300} />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-cream/8 bg-cream/[0.025] p-3">
          <p className="text-[10px] tracking-wide text-cream/45 uppercase">Hourly sales</p>
          <Bars values={[18, 22, 30, 26, 40, 52, 48, 61, 70, 66, 82, 94]} className="mt-3 h-24" />
        </div>
        <div className="space-y-2">
          {orders.map(([id, ch, amt], i) => (
            <div key={id} className="flex animate-rise items-center gap-2 rounded-lg border border-cream/8 bg-cream/[0.03] px-3 py-2 text-[11px]" style={d(800 + i * 140)}>
              <Package className="size-3.5 shrink-0 text-flame" />
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-cream/80">{id}</span>
                <span className="block truncate text-[10px] text-cream/45">{ch}</span>
              </span>
              <span className="font-semibold text-cream">{amt}</span>
            </div>
          ))}
          <div className="flex animate-rise items-center gap-2 rounded-lg bg-emerald-400/10 px-3 py-2 text-[11px] text-emerald-200" style={d(1300)}>
            <Check className="size-3.5" strokeWidth={3} /> Stock synced across 4 channels
          </div>
        </div>
      </div>
    </Frame>
  );
}

function EnterpriseMock() {
  const modules = [
    { icon: Users, label: "CRM", value: "$2.4M pipeline" },
    { icon: UserCheck, label: "HR", value: "412 employees" },
    { icon: Wallet, label: "Finance", value: "Books closed" },
    { icon: Package, label: "Inventory", value: "98.6% accuracy" },
    { icon: FileText, label: "Projects", value: "27 active" },
    { icon: CircleDollarSign, label: "Cash flow", value: "+12% QoQ" },
  ];
  return (
    <Frame path="bizsuite/executive">
      <div className="grid gap-3 sm:grid-cols-[1.5fr_1fr]">
        <div className="rounded-xl border border-cream/8 bg-cream/[0.025] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] tracking-wide text-cream/45 uppercase">Revenue · FY to date</p>
            <p className="flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
              <TrendingUp className="size-3" /> +24%
            </p>
          </div>
          <svg viewBox="0 0 300 110" className="draw mt-3 w-full" fill="none" preserveAspectRatio="none">
            <path pathLength={1} d="M0 95 C 30 88, 50 80, 75 76 S 120 60, 150 58 S 200 40, 225 34 S 270 16, 300 10" stroke="#ff6a2b" strokeWidth="2.5" />
            <path pathLength={1} d="M0 100 C 40 98, 70 92, 100 88 S 160 78, 190 74 S 250 62, 300 56" stroke="#f6c27a" strokeOpacity=".5" strokeWidth="1.5" style={{ "--i": 3 } as CSSProperties} />
          </svg>
          <div className="mt-1 flex gap-4 text-[10px] text-cream/50">
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-3 bg-flame" /> Actual
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-3 bg-gold/60" /> Plan
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {modules.map((m, i) => (
            <div key={m.label} className="animate-rise rounded-lg border border-cream/8 bg-cream/[0.03] p-2.5" style={d(300 + i * 110)}>
              <m.icon className="size-3.5 text-flame" />
              <p className="mt-1.5 text-[10px] font-semibold tracking-wide text-cream/80 uppercase">{m.label}</p>
              <p className="truncate text-[10px] text-cream/50">{m.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

const mocks: Record<ServiceSlug, () => ReactNode> = {
  "ai-machine-learning": AiMock,
  "software-development": SoftwareMock,
  "cloud-management": CloudMock,
  "it-infrastructure-amc": InfraMock,
  "process-automation": AutomationMock,
  ecommerce: EcommerceMock,
  "enterprise-solutions": EnterpriseMock,
};

export function ServiceMock({ slug }: { slug: ServiceSlug }) {
  const Mock = mocks[slug];
  return <Mock />;
}
