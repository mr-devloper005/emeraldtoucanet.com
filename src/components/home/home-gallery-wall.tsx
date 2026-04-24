import Link from 'next/link'
import { homeGalleryWall } from '@/config/site.content'
import { cn } from '@/lib/utils'

export function HomeGalleryWall({
  tone = 'light',
  id = 'gallery-wall',
}: {
  tone?: 'light' | 'dark'
  id?: string
}) {
  return (
    <section
      id={id}
      className={cn(
        'border-y border-[rgba(40,9,5,0.06)] py-10 sm:py-14',
        tone === 'dark' ? 'border-white/10 bg-black/20' : 'bg-[#fff5f0]/65',
      )}
    >
      <div className="mx-auto max-w-[1680px] px-2 sm:px-4 lg:px-6">
        <div className="mb-6 text-center sm:mb-8">
          <p
            className={cn(
              'text-[11px] font-semibold uppercase tracking-[0.28em]',
              tone === 'dark' ? 'text-[#e8c4bc]/75' : 'text-[#740a03]/80',
            )}
          >
            Scroll the wall
          </p>
          <h2
            className={cn(
              'mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl',
              tone === 'dark' ? 'text-white' : 'text-[#280905]',
            )}
          >
            More frames to explore
          </h2>
          <p
            className={cn(
              'mx-auto mt-2 max-w-2xl px-2 text-sm leading-relaxed',
              tone === 'dark' ? 'text-[#e8c4bc]/85' : 'text-[#5c2f28]/88',
            )}
          >
            Twenty-four reference tiles—hover for captions. Each tile opens the gallery.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {homeGalleryWall.map((item, index) => (
            <Link
              key={`${item.src}-${index}`}
              href="/images"
              className={cn(
                'group relative aspect-[3/4] overflow-hidden rounded-md border shadow-sm sm:rounded-lg',
                tone === 'dark' ? 'border-white/10 bg-white/5' : 'border-[rgba(40,9,5,0.08)] bg-white',
              )}
            >
              <img
                src={item.src}
                alt={`${item.caption} — ${item.location}`}
                width={480}
                height={640}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#280905]/92 via-[#280905]/40 to-transparent p-2 pt-7 opacity-0 transition duration-200 group-hover:opacity-100 sm:p-2.5 sm:pt-9">
                <p className="text-[10px] font-semibold leading-snug text-white sm:text-[11px]">{item.caption}</p>
                <p className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.12em] text-white/78 sm:text-[9px]">{item.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
