import Link from 'next/link'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { RegisterForm } from '@/components/auth/register-form'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

function getRegisterConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f8fbff] text-slate-950',
      panel: 'border border-slate-200 bg-white',
      side: 'border border-slate-200 bg-slate-50',
      muted: 'text-slate-600',
      action: 'bg-slate-950 text-white hover:bg-slate-800',
      icon: Building2,
      title: 'Create a business-ready account',
      body: 'List services, manage locations, and activate trust signals with a proper directory workflow.',
      highlights: [
        'Different onboarding per product family',
        'No repeated one-size-fits-all shell',
        'Profile, publishing, and discovery aligned',
      ],
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      side: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
      icon: FileText,
      title: 'Start your contributor workspace',
      body: 'Create a profile for essays, issue drafts, editorial review, and publication scheduling.',
      highlights: [
        'Different onboarding per product family',
        'No repeated one-size-fits-all shell',
        'Profile, publishing, and discovery aligned',
      ],
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[linear-gradient(175deg,#2a0b08_0%,#1a0705_55%,#0f0302_100%)] text-[#fff4ec]',
      panel: 'border border-white/12 bg-[rgba(40,9,5,0.35)] backdrop-blur-sm',
      side: 'border border-[rgba(195,17,12,0.35)] bg-[rgba(28,9,5,0.55)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
      muted: 'text-[#e8c4bc]/88',
      action: 'bg-[#c3110c] text-white hover:bg-[#e6501b]',
      icon: ImageIcon,
      iconClass: 'text-[#e6501b]',
      highlightClass: 'border border-[rgba(230,80,27,0.28)] bg-[rgba(40,9,5,0.45)] text-[#f5e3de]/95',
      title: 'Create your gallery account',
      body: `Post photography and visual stories with captions and locations—your uploads flow into the same masonry rhythm as the rest of ${SITE_CONFIG.name}.`,
      highlights: [
        'Publish frames with captions and place lines that match browse cards',
        'Surface on the homepage wall, /images, and search without extra setup',
        'Ember palette and spacing aligned with the public gallery experience',
      ],
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    side: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    icon: Bookmark,
    title: 'Create a curator account',
    body: 'Build shelves, save references, and connect collections to your profile without a generic feed setup.',
    highlights: [
      'Different onboarding per product family',
      'No repeated one-size-fits-all shell',
      'Profile, publishing, and discovery aligned',
    ],
  }
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getRegisterConfig(productKind)
  const Icon = config.icon

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Icon className={cn('h-8 w-8 shrink-0', (config as { iconClass?: string }).iconClass)} />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {config.highlights.map((item) => (
                <div key={item} className={cn('rounded-[1.5rem] px-4 py-4 text-sm leading-relaxed', (config as { highlightClass?: string }).highlightClass ?? 'border border-current/10')}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Create account</p>
            <RegisterForm actionClassName={config.action} />
            <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
