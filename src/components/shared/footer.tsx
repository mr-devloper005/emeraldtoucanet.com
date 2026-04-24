import Link from 'next/link'
import { ArrowRight, Github, Twitter, Linkedin, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { FOOTER_OVERRIDE_ENABLED, FooterOverride } from '@/overrides/footer'

const footerLinks = {
  company: [{ name: 'About', href: '/about' }],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Licenses', href: '/licenses' },
  ],
} as const

const columnsFooterOrder = ['company', 'resources', 'legal'] as const

const columnHeadingClass =
  'text-[11px] font-semibold uppercase tracking-[0.2em] text-[#740a03]/90'

const columnLinkClass =
  'text-[15px] font-medium text-[#3a1f1a] transition hover:text-[#c3110c]'

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export function Footer() {
  if (FOOTER_OVERRIDE_ENABLED) {
    return <FooterOverride />
  }

  const { recipe } = getFactoryState()
  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]

  if (recipe.footer === 'minimal-footer') {
    return (
      <footer className="border-t border-[#d7deca] bg-[#f4f6ef] text-[#1f2617]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
            <p className="mt-1 text-sm text-[#56604b]">{SITE_CONFIG.description}</p>
          </div>
          {primaryTask ? (
            <Link
              href={primaryTask.route}
              className="rounded-lg border border-[#d7deca] bg-white px-4 py-2.5 text-sm font-semibold text-[#1f2617] hover:bg-[#ebefdf]"
            >
              {primaryTask.label}
            </Link>
          ) : null}
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'dense-footer') {
    return (
      <footer className="border-t border-[rgba(40,9,5,0.35)] bg-[linear-gradient(180deg,#1a0806_0%,#2a0c09_100%)] text-[#fff4ec]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/8 p-1.5">
                  <img src="/favicon.png?v=202604242" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#e8c4bc]/75">{siteContent.footer.tagline}</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-[#e8c4bc]/88">{SITE_CONFIG.description}</p>
              {primaryTask ? (
                <Link href={primaryTask.route} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c3110c] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(0,0,0,0.25)] hover:bg-[#e6501b]">
                  Explore {primaryTask.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8c4bc]/75">Resources</h3>
                <ul className="mt-4 space-y-3 text-[15px] text-[#f5e3de]/95">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8c4bc]/75">Connect</h3>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map((item) => (
                    <Link key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/8 p-2.5 text-[#f5e3de] hover:bg-white/12 hover:text-white">
                      <item.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-5 text-sm text-[#e8c4bc]/65">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'editorial-footer') {
    return (
      <footer className="border-t border-[#dbc6b6] bg-[linear-gradient(180deg,#fff9f0_0%,#fff1df_100%)] text-[#2f1d16]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#dbc6b6] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#72594a]">
                <Sparkles className="h-3.5 w-3.5" />
                Editorial desk
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{SITE_CONFIG.name}</h3>
              <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-[#72594a]">{SITE_CONFIG.description}</p>
            </div>
            <div>
              <h4 className={columnHeadingClass}>Company</h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className={`${columnLinkClass} text-[#5c4338]`}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t border-[rgba(40,9,5,0.08)] bg-[linear-gradient(180deg,#ffffff_0%,#fff7f2_100%)] text-[#280905]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-2xl border border-[rgba(116,10,3,0.15)] bg-white p-1 shadow-[0_10px_30px_rgba(40,9,5,0.06)]">
                <img src="/favicon.png?v=202604242" alt={`${SITE_CONFIG.name} logo`} width="44" height="44" className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="block text-lg font-semibold tracking-tight">{SITE_CONFIG.name}</span>
                <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#740a03]/85">{siteContent.footer.tagline}</span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-[1.75] text-[#5c2f28]">{SITE_CONFIG.description}</p>
          </div>
          {columnsFooterOrder.map((section) => (
            <div key={section}>
              <h3 className={columnHeadingClass}>
                {section === 'company' ? 'Company' : section === 'resources' ? 'Resources' : 'Legal'}
              </h3>
              <ul className="mt-5 space-y-3">
                {footerLinks[section].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className={columnLinkClass}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-[rgba(40,9,5,0.08)] pt-6 text-center text-sm text-[#740a03]/70">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
      </div>
    </footer>
  )
}
