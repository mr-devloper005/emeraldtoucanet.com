import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, Tag, User } from 'lucide-react'
import { HomeGalleryWall } from '@/components/home/home-gallery-wall'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { homeGalleryWall, taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory':
    'bg-[radial-gradient(circle_at_0%_0%,rgba(195,17,12,0.07),transparent_34%),linear-gradient(180deg,#fffdfb_0%,#f3f6ff_52%,#ffffff_100%)]',
  'listing-showcase': 'bg-[linear-gradient(180deg,#ffffff_0%,#fff4ec_100%)]',
  'article-editorial':
    'bg-[radial-gradient(circle_at_100%_0%,rgba(230,80,27,0.1),transparent_32%),linear-gradient(180deg,#fffaf5_0%,#fff2e8_38%,#ffffff_100%)]',
  'article-journal': 'bg-[linear-gradient(185deg,#fffdf9_0%,#f7ebe4_55%,#ffffff_100%)]',
  'image-masonry': 'bg-[linear-gradient(175deg,#2a0b08_0%,#4a120d_40%,#1a0705_100%)] text-white',
  'image-portfolio': 'bg-[linear-gradient(165deg,#1a0806_0%,#3a0e0a_48%,#0f0302_100%)] text-white',
  'profile-creator': 'bg-[linear-gradient(180deg,#1f0a08_0%,#2f100c_100%)] text-white',
  'profile-business': 'bg-[linear-gradient(180deg,#fff9f5_0%,#ffffff_100%)]',
  'classified-bulletin': 'bg-[linear-gradient(125deg,#fff8f0_0%,#ffe8d9_40%,#ffffff_100%)]',
  'classified-market': 'bg-[linear-gradient(180deg,#fffaf5_0%,#fff0e6_100%)]',
  'sbm-curation': 'bg-[linear-gradient(180deg,#faf7f4_0%,#ebe4dc_100%)]',
  'sbm-library': 'bg-[linear-gradient(180deg,#f4f1ec_0%,#e3ddd4_100%)]',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid

  const isDark = ['image-masonry', 'image-portfolio', 'profile-creator'].includes(layoutKey)
  const ui = isDark
    ? {
        muted: 'text-[#e8c4bc]/88',
        introTitle: 'text-2xl font-semibold tracking-[-0.03em] text-[#fff4ec] sm:text-[1.65rem]',
        introBody: 'text-[15px] leading-[1.7] text-[#f0d8d0]/92',
        panel: 'border border-white/12 bg-white/8',
        soft: 'border border-white/10 bg-white/6',
        input: 'border-white/14 bg-white/8 text-white placeholder:text-white/45',
        button: 'bg-[#c3110c] text-white hover:bg-[#e6501b]',
      }
    : layoutKey.startsWith('article') || layoutKey.startsWith('sbm')
      ? {
          muted: 'text-[#5c2f28]',
          introTitle: 'text-2xl font-semibold tracking-[-0.03em] text-[#280905] sm:text-[1.65rem]',
          introBody: 'text-[15px] leading-[1.7] text-[#5c2f28]',
          panel: 'border border-[rgba(116,10,3,0.14)] bg-white/95 shadow-[0_18px_50px_rgba(40,9,5,0.06)]',
          soft: 'border border-[rgba(116,10,3,0.12)] bg-[#fff5f0]',
          input: 'border border-[rgba(116,10,3,0.18)] bg-white text-[#280905]',
          button: 'bg-[#c3110c] text-white hover:bg-[#740a03]',
        }
      : {
          muted: 'text-[#5c2f28]',
          introTitle: 'text-2xl font-semibold tracking-[-0.03em] text-[#280905] sm:text-[1.65rem]',
          introBody: 'text-[15px] leading-[1.7] text-[#5c2f28]',
          panel: 'border border-[rgba(40,9,5,0.1)] bg-white shadow-[0_16px_48px_rgba(40,9,5,0.06)]',
          soft: 'border border-[rgba(40,9,5,0.08)] bg-[#fff9f5]',
          input: 'border border-[rgba(40,9,5,0.12)] bg-white text-[#280905]',
          button: 'bg-[#280905] text-[#fff4ec] hover:bg-[#740a03]',
        }

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className={`rounded-[2rem] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.07)] ${ui.panel}`}>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] opacity-70"><Icon className="h-4 w-4" /> {taskConfig?.label || task}</div>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>Built with a cleaner scan rhythm, stronger metadata grouping, and a structure designed for business discovery rather than editorial reading.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={taskConfig?.route || '#'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}>Explore results <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.soft}`}>Open search</Link>
              </div>
            </div>
            <form className={`grid gap-3 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${ui.soft}`} action={taskConfig?.route || '#'}>
              <div>
                <label className={`text-xs uppercase tracking-[0.2em] ${ui.muted}`}>Category</label>
                <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-11 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={`h-11 rounded-xl text-sm font-medium ${ui.button}`}>Apply filters</button>
            </form>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This reading surface uses slower pacing, stronger typographic hierarchy, and more breathing room so long-form content feels intentional rather than squeezed into a generic feed.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${ui.muted}`}>Reading note</p>
              <p className={`mt-4 text-sm leading-7 ${ui.muted}`}>Use category filters to jump between topics without collapsing the page into the same repeated card rhythm used by other task types.</p>
              <form className="mt-5 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-masonry' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
                <Icon className="h-3.5 w-3.5" /> Masonry stream
              </div>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>
                Taller tiles, ember-tinted chrome, and a rhythm tuned for photography—built for scanning frames, not text-heavy layouts.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {homeGalleryWall.slice(0, 2).map((item, idx) => (
                <div
                  key={item.src}
                  className={`relative min-h-[220px] overflow-hidden rounded-[2rem] ${idx === 0 ? ui.panel : ui.soft}`}
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    width={480}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              ))}
              <div className={`relative col-span-2 min-h-[140px] overflow-hidden rounded-[2rem] sm:min-h-[160px] ${ui.panel}`}>
                <img
                  src={homeGalleryWall[2]?.src}
                  alt={homeGalleryWall[2]?.caption ?? ''}
                  width={960}
                  height={320}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-portfolio' ? (
          <section className="mb-12 space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
                  <Icon className="h-3.5 w-3.5" /> Portfolio rail
                </div>
                <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{taskConfig?.description || 'Latest posts'}</h1>
              </div>
              <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}>
                Search visuals
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr]">
              <div className={`relative min-h-[280px] overflow-hidden rounded-[2rem] lg:min-h-[320px] ${ui.panel}`}>
                <img
                  src={homeGalleryWall[3]?.src}
                  alt={homeGalleryWall[3]?.caption ?? ''}
                  width={960}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className={`relative min-h-[200px] overflow-hidden rounded-[2rem] ${ui.soft}`}>
                <img
                  src={homeGalleryWall[4]?.src}
                  alt={homeGalleryWall[4]?.caption ?? ''}
                  width={480}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className={`relative min-h-[200px] overflow-hidden rounded-[2rem] ${ui.soft}`}>
                <img
                  src={homeGalleryWall[5]?.src}
                  alt={homeGalleryWall[5]?.caption ?? ''}
                  width={480}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-12 rounded-[2.2rem] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1)] ${ui.panel}`}>
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className={`min-h-[240px] rounded-[2rem] ${ui.soft}`} />
              <div>
                <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Profiles with stronger identity, trust, and reputation cues.</h1>
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This layout prioritizes the person or business surface first, then lets the feed continue below without borrowing the same visual logic used by articles or listings.</p>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className={`rounded-[1.8rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Fast-moving notices, offers, and responses in a compact board format.</h1>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {['Quick to scan', 'Shorter response path', 'Clearer urgency cues'].map((item) => (
                <div key={item} className={`rounded-[1.5rem] p-5 ${ui.soft}`}>
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">
                {layoutKey === 'sbm-library'
                  ? 'Reference shelf: tighter rows, quieter chrome, index-first browsing.'
                  : 'Curated resources arranged more like boards than a generic post feed.'}
              </h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>
                {layoutKey === 'sbm-library'
                  ? 'Library mode borrows from card catalogs—more neutral paper, less marketing chrome—while using the same bookmark data as every other layout.'
                  : 'Bookmarks need calmer grouping and lighter metadata so links stay scannable next to the bolder gallery lanes.'}
              </p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.24em] ${ui.muted}`}>Collection filter</p>
              <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {task === 'pdf' ? (
          <section className="mb-12 overflow-hidden rounded-[2rem] border border-[rgba(40,9,5,0.1)] bg-white shadow-[0_20px_60px_rgba(40,9,5,0.07)]">
            <div className="grid lg:grid-cols-[minmax(0,300px)_1fr]">
              <div className="flex flex-col justify-between bg-[#280905] p-8 text-[#fff4ec]">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e8c4bc]/85">Document vault</p>
                  <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{taskConfig?.description || 'Latest posts'}</h1>
                </div>
                <p className="mt-8 text-sm leading-7 text-[#e8c4bc]/90">Downloads and reports use a denser index layout than the gallery—built for filenames, categories, and quick retrieval.</p>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
                {['Versioned files', 'Readable previews', 'Cross-linked topics'].map((label) => (
                  <div key={label} className={`rounded-2xl p-5 ${ui.soft}`}>
                    <FileText className="h-5 w-5 text-[#c3110c]" />
                    <p className="mt-4 text-sm font-semibold text-[#280905]">{label}</p>
                    <p className={`mt-2 text-xs leading-6 ${ui.muted}`}>Structured for scanning without borrowing image-grid spacing.</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {intro ? (
          <section className={`mb-12 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(40,9,5,0.06)] sm:p-8 ${ui.panel}`}>
            <h2 className={ui.introTitle}>{intro.title}</h2>
            <div className="mt-5 space-y-4">
              {intro.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={ui.introBody}>
                  {paragraph}
                </p>
              ))}
            </div>
            {intro.links.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                {intro.links.map((link) => (
                  <a key={link.href} href={link.href} className="font-semibold text-foreground hover:underline">
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />

        {task === 'image' ? (
          <div className="mt-16">
            <HomeGalleryWall tone="dark" id="images-page-wall" />
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
