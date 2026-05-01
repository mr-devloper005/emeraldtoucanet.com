import Link from "next/link";
import { ArrowLeft, ArrowRight, Globe, Mail, MapPin, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 3;

type ProfileContent = {
  logo?: string;
  brandName?: string;
  companyName?: string;
  name?: string;
  website?: string;
  email?: string;
  location?: string;
  address?: string;
  category?: string;
  description?: string;
  body?: string;
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }

  const content = (post.content && typeof post.content === "object" ? post.content : {}) as ProfileContent;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const profileName = content.brandName || content.companyName || content.name || post.title;
  const website = typeof content.website === "string" ? content.website : "";
  const email = typeof content.email === "string" ? content.email : "";
  const location = content.address || content.location || "";
  const category = content.category || post.tags?.[0] || "Profile";
  const summaryHtml = formatRichHtml(content.body || content.description || post.summary, "Profile details will appear here once available.");
  const suggestedProfiles = (await fetchTaskPosts("profile", 6)).filter((item) => item.slug !== post.slug).slice(0, 2);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff8f3_0%,#fff1e7_38%,#ffffff_100%)] text-[#280905]">
      <NavbarShell />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <SchemaJsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            name: profileName,
            url: `${baseUrl}/profile/${post.slug}`,
            about: {
              "@type": "Organization",
              name: profileName,
              url: website || undefined,
            },
          }}
        />

        <Link href="/profile" className="inline-flex items-center gap-2 text-sm text-[#6a4033] transition hover:text-[#280905]">
          <ArrowLeft className="h-4 w-4" />
          Back to profiles
        </Link>

        <section className="mt-6 overflow-hidden rounded-[2.5rem] border border-[rgba(40,9,5,0.1)] bg-white shadow-[0_30px_90px_rgba(40,9,5,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative min-h-[340px] bg-[linear-gradient(160deg,#f7e3d7_0%,#f0cdbd_100%)]">
              {logoUrl ? (
                <ContentImage src={logoUrl} alt={profileName} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" intrinsicWidth={960} intrinsicHeight={1200} priority />
              ) : (
                <div className="flex h-full items-center justify-center text-7xl font-semibold text-[#9b6a57]">
                  {profileName.slice(0, 1).toUpperCase()}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2b130d]/20 via-transparent to-transparent" />
            </div>

            <div className="p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#8c5c4a]">
                <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(40,9,5,0.1)] bg-[#fff4ec] px-3 py-1">
                  <Tag className="h-3.5 w-3.5" />
                  {category}
                </span>
                {location ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(40,9,5,0.1)] bg-[#fffaf6] px-3 py-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {location}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{profileName}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-[#6a4033]">
                The profile detail page now opens with a cleaner introduction, a larger identity panel, and supporting business cues that feel closer to an editorial feature than a default listing template.
              </p>

              
              <div className="mt-6 flex flex-wrap gap-3">
                {website ? (
                  <Button asChild size="lg" className="rounded-full bg-[#280905] px-7 text-base text-[#fff4ec] hover:bg-[#6b2210]">
                    <Link href={website} target="_blank" rel="noopener noreferrer">
                      Visit Official Site
                    </Link>
                  </Button>
                ) : null}
                {email ? (
                  <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-full border border-[rgba(40,9,5,0.12)] bg-white px-5 py-3 text-sm font-semibold text-[#280905] transition hover:bg-[#fff5ef]">
                    <Mail className="h-4 w-4" />
                    Email profile
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[rgba(40,9,5,0.1)] bg-white p-6 shadow-[0_18px_60px_rgba(40,9,5,0.05)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8c5c4a]">Profile summary</p>
            <RichContent html={summaryHtml} className="mt-4 prose-p:text-[#6a4033] prose-strong:text-[#280905] prose-headings:text-[#280905]" />
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-[rgba(40,9,5,0.1)] bg-white p-6 shadow-[0_18px_60px_rgba(40,9,5,0.05)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8c5c4a]">Contact details</p>
              <div className="mt-4 space-y-4 text-sm text-[#6a4033]">
                {website ? (
                  <div className="flex items-start gap-2">
                    <Globe className="mt-0.5 h-4 w-4 text-[#8c5c4a]" />
                    <a href={website} target="_blank" rel="noreferrer" className="break-all text-[#280905] hover:underline">
                      {website}
                    </a>
                  </div>
                ) : null}
                {email ? (
                  <div className="flex items-start gap-2">
                    <Mail className="mt-0.5 h-4 w-4 text-[#8c5c4a]" />
                    <a href={`mailto:${email}`} className="break-all text-[#280905] hover:underline">
                      {email}
                    </a>
                  </div>
                ) : null}
                {location ? (
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-[#8c5c4a]" />
                    <span>{location}</span>
                  </div>
                ) : null}
              </div>
            </div>

            {suggestedProfiles.length ? (
              <div className="rounded-[2rem] border border-[rgba(40,9,5,0.1)] bg-white p-6 shadow-[0_18px_60px_rgba(40,9,5,0.05)]">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8c5c4a]">Related profiles</p>
                    <h2 className="mt-2 text-xl font-semibold">Keep browsing</h2>
                  </div>
                  <Link href="/profile" className="inline-flex items-center gap-2 text-sm font-semibold text-[#280905] hover:text-[#6b2210]">
                    View all
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="mt-5 grid gap-4">
                  {suggestedProfiles.map((item) => (
                    <TaskPostCard key={item.id} post={item} href={buildPostUrl("profile", item.slug)} taskKey="profile" compact />
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </section>

      </main>
      <Footer />
    </div>
  );
}
