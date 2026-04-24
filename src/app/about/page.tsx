import Link from 'next/link'
import { ArrowRight, Camera } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { marketingPages } from '@/config/site.marketing-pages'

const card =
  'rounded-[1.75rem] border border-[rgba(116,10,3,0.12)] bg-white p-6 shadow-[0_16px_48px_rgba(40,9,5,0.06)] sm:p-8'

export default function AboutPage() {
  const { about } = marketingPages

  return (
    <PageShell
      eyebrow="Company"
      title={`About ${SITE_CONFIG.name}`}
      description={about.storyLead}
      actions={
        <>
          <Button variant="outline" className="rounded-full border-[rgba(116,10,3,0.2)] bg-white" asChild>
            <Link href="/team">Meet the team</Link>
          </Button>
          <Button className="rounded-full bg-[#c3110c] text-white hover:bg-[#740a03]" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className={card}>
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(195,17,12,0.2)] bg-[#fff5f0] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#740a03]">
            <Camera className="h-3.5 w-3.5 text-[#c3110c]" />
            {about.storyEyebrow}
          </div>
          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-[#280905] sm:text-3xl">{about.storyTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-[#5c2f28] sm:text-base">{about.storyBody}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {about.stats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-[rgba(40,9,5,0.08)] bg-[#fff9f5] p-4">
                <div className="text-2xl font-semibold tracking-tight text-[#c3110c]">{item.value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-[#740a03]/80">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="rounded-full bg-[#280905] text-[#fff4ec] hover:bg-[#740a03]" asChild>
              <Link href="/images">
                Open gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="rounded-full border-[rgba(116,10,3,0.2)]" asChild>
              <Link href="/register">Create account</Link>
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {about.pillars.map((value) => (
            <div key={value.title} className={card}>
              <h3 className="text-lg font-semibold text-[#280905]">{value.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#5c2f28]">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
