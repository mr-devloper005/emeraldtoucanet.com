import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, UserRound } from "lucide-react";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl, fetchTaskPosts } from "@/lib/task-data";
import { buildTaskMetadata } from "@/lib/seo";
import { taskPageMetadata } from "@/config/site.content";
import { CATEGORY_OPTIONS, normalizeCategory } from "@/lib/categories";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 3;

export const generateMetadata = () =>
  buildTaskMetadata("profile", {
    title: taskPageMetadata.profile.title,
    description: taskPageMetadata.profile.description,
  });

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const posts = await fetchTaskPosts("profile", 30);
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
  const featuredProfiles = filteredPosts.slice(0, 2);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff9f5_0%,#fff2ea_42%,#ffffff_100%)] text-[#280905]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SchemaJsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${taskPageMetadata.profile.title} | ${SITE_CONFIG.name}`,
            url: `${baseUrl}/profile`,
            hasPart: filteredPosts.slice(0, 10).map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${baseUrl}/profile/${post.slug}`,
              name: post.title,
            })),
          }}
        />

        <section className="rounded-[2.5rem] border border-[rgba(40,9,5,0.1)] bg-white p-8 shadow-[0_28px_80px_rgba(40,9,5,0.08)]">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-[rgba(40,9,5,0.08)] bg-[#fff4ec] p-5">
                <BadgeCheck className="h-5 w-5 text-[#9d2f14]" />
                <p className="mt-4 text-lg font-semibold">Trust signals are visible earlier in the journey.</p>
              </div>
              <div className="rounded-[2rem] border border-[rgba(40,9,5,0.08)] bg-[#fff7f2] p-5">
                <Building2 className="h-5 w-5 text-[#9d2f14]" />
                <p className="mt-4 text-lg font-semibold">Cards now suit brands, creators, and profile-led discovery.</p>
              </div>
              <div className="rounded-[2rem] border border-[rgba(40,9,5,0.08)] bg-[#fffaf6] p-5 sm:col-span-2">
                <form className="grid gap-3 sm:grid-cols-[1fr_auto]" action="/profile">
                  <select name="category" defaultValue={normalizedCategory} className="h-12 rounded-full border border-[rgba(40,9,5,0.12)] bg-white px-4 text-sm outline-none">
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="h-12 rounded-full bg-[#280905] px-6 text-sm font-semibold text-[#fff4ec] transition hover:bg-[#6b2210]">
                    Filter profiles
                  </button>
                </form>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(40,9,5,0.1)] bg-[#fff5ef] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8c5c4a]">
                <UserRound className="h-3.5 w-3.5" />
                Profile editorial
              </div>
              <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.05em]">
                Profiles arranged like feature introductions, not generic rows.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-[#6a4033]">
                This layout gives people and businesses a stronger first impression with wider cards, cleaner summaries, and more confidence-building structure before the click.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#280905] px-5 py-3 text-sm font-semibold text-[#fff4ec] transition hover:bg-[#6b2210]">
                  Claim or update a profile
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/search" className="inline-flex items-center gap-2 rounded-full border border-[rgba(40,9,5,0.12)] bg-white px-5 py-3 text-sm font-semibold text-[#280905] transition hover:bg-[#fff5ef]">
                  Search directory
                </Link>
              </div>
            </div>
          </div>
        </section>

        {featuredProfiles.length ? (
          <section className="mt-12 grid gap-6 lg:grid-cols-2">
            {featuredProfiles.map((post, index) => (
              <Link key={post.id} href={buildPostUrl("profile", post.slug)} className="rounded-[2rem] border border-[rgba(40,9,5,0.1)] bg-white p-6 shadow-[0_18px_60px_rgba(40,9,5,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(40,9,5,0.1)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8c5c4a]">
                  {index === 0 ? "Featured profile" : "Recommended view"}
                </p>
                <h2 className="mt-3 text-2xl font-semibold">{post.title}</h2>
                <p className="mt-4 text-sm leading-8 text-[#6a4033]">
                  {(post.summary || "Explore this profile with stronger identity cues and a cleaner detail layout.").replace(/<[^>]+>/g, " ")}
                </p>
              </Link>
            ))}
          </section>
        ) : null}

        <section className="mt-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8c5c4a]">Profile stream</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Browse current profiles</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#6a4033]">
              Cards now fit the needs of this project: identity-first composition, better excerpt balance, and clearer pathways into the profile page.
            </p>
          </div>

          {filteredPosts.length ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredPosts.map((post) => (
                <TaskPostCard key={post.id} post={post} href={buildPostUrl("profile", post.slug)} taskKey="profile" />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-[rgba(40,9,5,0.1)] bg-white p-12 text-center shadow-[0_18px_50px_rgba(40,9,5,0.05)]">
              <p className="text-lg font-semibold">No profiles match this category yet.</p>
              <p className="mt-3 text-sm text-[#6a4033]">Switch categories to reopen the full profile feed.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
