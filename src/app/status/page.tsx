import { Activity, CheckCircle2 } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { marketingPages } from '@/config/site.marketing-pages'

export default function StatusPage() {
  const { status } = marketingPages

  return (
    <PageShell
      eyebrow="Resources"
      title="System status"
      description={status.sub}
    >
      <div className="mb-8 flex flex-wrap items-center gap-4 rounded-[1.75rem] border border-emerald-200/80 bg-emerald-50/90 px-5 py-4 text-emerald-950">
        <CheckCircle2 className="h-8 w-8 shrink-0 text-emerald-600" />
        <div>
          <p className="text-lg font-semibold tracking-tight">{status.headline}</p>
          <p className="mt-1 text-sm text-emerald-900/80">Demo build — metrics are illustrative.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {status.metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-[rgba(116,10,3,0.1)] bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#740a03]/75">{m.label}</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-[#280905]">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {status.services.map((service) => (
          <div
            key={service.name}
            className="flex items-start justify-between gap-4 rounded-[1.5rem] border border-[rgba(116,10,3,0.1)] bg-white p-6 shadow-sm"
          >
            <div>
              <h2 className="text-lg font-semibold text-[#280905]">{service.name}</h2>
              <p className="mt-1 text-sm text-[#5c2f28]">{service.detail}</p>
            </div>
            <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">{service.status}</span>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <div className="mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-[#c3110c]" />
          <h3 className="text-lg font-semibold text-[#280905]">Incident history</h3>
        </div>
        <div className="space-y-3">
          {status.incidents.map((incident) => (
            <div
              key={incident.title + incident.date}
              className="rounded-2xl border border-[rgba(40,9,5,0.08)] bg-[#fff9f5] px-5 py-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#740a03]/75">{incident.date}</span>
                <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5c2f28] ring-1 ring-[rgba(40,9,5,0.08)]">
                  {incident.status}
                </span>
              </div>
              <p className="mt-2 font-semibold text-[#280905]">{incident.title}</p>
              <p className="mt-1 text-sm text-[#5c2f28]">{incident.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
