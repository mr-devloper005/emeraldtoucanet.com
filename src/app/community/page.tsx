import Link from 'next/link'
import { Users, Calendar, Shield } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { marketingPages } from '@/config/site.marketing-pages'

const tagClass = (tag: string) => {
  const t = tag.toLowerCase()
  if (t === 'live') return 'bg-[#c3110c]/12 text-[#740a03]'
  if (t === 'editorial') return 'bg-[#e6501b]/15 text-[#8a3a0f]'
  return 'bg-[rgba(40,9,5,0.06)] text-[#5c2f28]'
}

export default function CommunityPage() {
  const { community } = marketingPages

  return (
    <PageShell
      eyebrow="Resources"
      title="Community"
      description={community.intro}
      actions={
        <Button className="rounded-full bg-[#c3110c] text-white hover:bg-[#740a03]" asChild>
          <Link href="/contact">Reach the team</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          {community.programs.map((program) => (
            <div
              key={program.title}
              className="rounded-[1.75rem] border border-[rgba(116,10,3,0.12)] bg-white p-6 shadow-[0_12px_40px_rgba(40,9,5,0.05)] sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${tagClass(program.tag)}`}>
                  {program.tag}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] text-[#740a03]/75">
                  <Calendar className="h-3.5 w-3.5" />
                  {program.schedule}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[#280905]">{program.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5c2f28]">{program.description}</p>
            </div>
          ))}
        </div>
        <aside className="space-y-5">
          <div className="rounded-[1.75rem] border border-[rgba(116,10,3,0.12)] bg-[#280905] p-6 text-[#fff4ec]">
            <Users className="h-8 w-8 text-[#e6501b]" />
            <h3 className="mt-4 text-lg font-semibold">Interest clusters</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#e8c4bc]/88">Illustrative groups for how photographers self-organize around subject matter.</p>
            <ul className="mt-5 space-y-4">
              {community.groups.map((g) => (
                <li key={g.name} className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                  <p className="font-semibold text-white">{g.name}</p>
                  <p className="mt-1 text-xs text-[#e8c4bc]/75">{g.focus}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#e6501b]/90">~{g.members.toLocaleString()} members (demo)</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.75rem] border border-[rgba(116,10,3,0.12)] bg-white p-6">
            <Shield className="h-6 w-6 text-[#c3110c]" />
            <h3 className="mt-3 text-base font-semibold text-[#280905]">Norms</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5c2f28]">
              Give constructive feedback on technique and composition. Report harassment or stolen work via{' '}
              <Link href="/contact" className="font-semibold text-[#c3110c] hover:underline">
                Contact
              </Link>
              .
            </p>
          </div>
        </aside>
      </div>
    </PageShell>
  )
}
