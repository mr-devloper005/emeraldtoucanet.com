import Link from "next/link";
import { ArrowRight, Sparkles, Tag } from "lucide-react";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl, fetchTaskPosts } from "@/lib/task-data";
import { buildTaskMetadata } from "@/lib/seo";
import { taskPageMetadata, homeGalleryWall } from "@/config/site.content";
import { CATEGORY_OPTIONS, normalizeCategory } from "@/lib/categories";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 3;

export const generateMetadata = () =>
  buildTaskMetadata("image", {
    title: taskPageMetadata.image.title,
    description: taskPageMetadata.image.description,
  });

export default async function ImageSharingPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const posts = await fetchTaskPosts("image", 30);
  const normalizedCategory = resolvedSearchParams?.category ? normalizeCategory(resolvedSearchParams.category) : "all";
  const filteredPosts =
    normalizedCategory === "all"
      ? posts
      : posts.filter((post) => {
          const content = post.content && typeof post.content === "object" ? post.content : {};
          const value = typeof (content as Record<string, unknown>).category === "string"
            ? normalizeCategory((content as Record<string, unknown>).category as string)
            : "";
          return value === normalizedCategory;
        });
  const featuredPosts = filteredPosts.slice(0, 3);
  const leadFeature = featuredPosts[0];
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#1a0806_0%,#3b0f0a_38%,#120403_100%)] text-white">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SchemaJsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${taskPageMetadata.image.title} | ${SITE_CONFIG.name}`,
            url: `${baseUrl}/images`,
            hasPart: filteredPosts.slice(0, 10).map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${baseUrl}/images/${post.slug}`,
              name: post.title,
            })),
          }}
        />

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="overflow-hidden rounded-[2.4rem] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ffd9cc]">
              <Sparkles className="h-3.5 w-3.5" />
              Visual editorial
            </div>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-white">
              Discover image stories with a stronger gallery rhythm.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#f1d4ca]">
              This page now leans into a feature-led layout: bold lead framing, calmer metadata, and cards tuned for visual browsing instead of a generic post grid.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["Feature-led cards", "Category-guided curation", "Story-paced detail pages"].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-semibold text-[#fff1e7]">{item}</p>
                </div>
              ))}
            </div>
            <form className="mt-8 flex flex-col gap-3 sm:flex-row" action="/images">
              <select name="category" defaultValue={normalizedCategory} className="h-12 flex-1 rounded-full border border-white/14 bg-white/8 px-4 text-sm text-white outline-none">
                <option value="all" className="text-slate-900">All categories</option>
                {CATEGORY_OPTIONS.map((item) => (
                  <option key={item.slug} value={item.slug} className="text-slate-900">
                    {item.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="h-12 rounded-full bg-[#cf3d17] px-6 text-sm font-semibold text-white transition hover:bg-[#e6501b]">
                Curate feed
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {homeGalleryWall.slice(0, 2).map((item, idx) => (
              <div key={item.src} className={`relative min-h-[220px] overflow-hidden rounded-[2rem] border ${idx === 0 ? "border-white/12 bg-white/10" : "border-white/10 bg-white/6"}`}>
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
            <div className="relative col-span-2 min-h-[160px] overflow-hidden rounded-[2rem] border border-white/12 bg-white/10">
              <img
                src={homeGalleryWall[2]?.src}
                alt={homeGalleryWall[2]?.caption ?? ""}
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

        {leadFeature ? (
          <section className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2.2rem] border border-white/12 bg-white/8 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#ffd1c1]">Lead collection</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">{leadFeature.title}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-[#f1d4ca]">
                {(leadFeature.summary || "A featured visual story surfaced from the current image stream.").replace(/<[^>]+>/g, " ")}
              </p>
              <Link href={buildPostUrl("image", leadFeature.slug)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#2b100c] transition hover:bg-[#ffe8de]">
                Open featured image
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4">
              {featuredPosts.slice(1).map((post) => (
                <Link key={post.id} href={buildPostUrl("image", post.slug)} className="rounded-[1.8rem] border border-white/10 bg-black/20 p-5 transition hover:bg-black/28">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ffd7c8]">
                    <Tag className="h-3.5 w-3.5" />
                    Visual note
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{post.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#f1d4ca]">
                    {(post.summary || "Explore a curated image entry from the feed.").replace(/<[^>]+>/g, " ")}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#ffd1c1]">Gallery stream</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">Current image collection</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#f1d4ca]">
              Cards are now shaped to suit the project: more visual weight for images, lighter text, and clearer calls into the detail page.
            </p>
          </div>

          {filteredPosts.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredPosts.map((post) => (
                <TaskPostCard key={post.id} post={post} href={buildPostUrl("image", post.slug)} taskKey="image" />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-white/12 bg-white/8 p-12 text-center">
              <p className="text-lg font-semibold text-white">No images match this category yet.</p>
              <p className="mt-3 text-sm text-[#f1d4ca]">Try another category to reopen the full gallery stream.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
