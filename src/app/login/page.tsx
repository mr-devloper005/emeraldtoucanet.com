import Link from 'next/link'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { LoginForm } from '@/components/auth/login-form'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'
import { cn } from '@/lib/utils'

function getLoginConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f8fbff] text-slate-950',
      panel: 'border border-slate-200 bg-white',
      side: 'border border-slate-200 bg-slate-50',
      muted: 'text-slate-600',
      action: 'bg-slate-950 text-white hover:bg-slate-800',
      icon: Building2,
      title: 'Access your business dashboard',
      body: 'Manage listings, verification details, contact info, and local discovery surfaces from one place.',
      highlights: [
        'Cleaner product-specific workflows',
        'Palette and layout matched to the site family',
        'Fewer repeated admin patterns',
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
      title: 'Sign in to your publication workspace',
      body: 'Draft, review, and publish long-form work with the calmer reading system intact.',
      highlights: [
        'Cleaner product-specific workflows',
        'Palette and layout matched to the site family',
        'Fewer repeated admin patterns',
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
      title: 'Sign in to your gallery',
      body: 'Pick up where you left off—uploads, captions, and the same masonry grid you see on the homepage and /images.',
      highlights: [
        'Large tiles, captions, and location-style context on every post',
        'Homepage wall and images lane read from the same feeds you publish to',
        'Ember-toned chrome tuned for photography, not a generic admin shell',
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
    title: 'Open your curated collections',
    body: 'Manage saved resources, collection notes, and curator identity from a calmer workspace.',
    highlights: [
      'Cleaner product-specific workflows',
      'Palette and layout matched to the site family',
      'Fewer repeated admin patterns',
    ],
  }
}

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getLoginConfig(productKind)
  const Icon = config.icon

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
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
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Welcome back</p>
            <LoginForm actionClassName={config.action} />
            <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
              <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Create account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
