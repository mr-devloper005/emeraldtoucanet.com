import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostMetadata } from "@/lib/seo";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 3;

type ImageContent = {
  category?: string;
  location?: string;
  description?: string;
  body?: string;
  images?: string[];
};

const isValidImageUrl = (value?: string | null) =>
  typeof value === "string" && (value.startsWith("/") || /^https?:\/\//i.test(value));

const getContent = (post: Awaited<ReturnType<typeof fetchTaskPostBySlug>>) => {
  const content = post?.content && typeof post.content === "object" ? post.content : {};
  return content as ImageContent;
};

const getImageUrls = (post: NonNullable<Awaited<ReturnType<typeof fetchTaskPostBySlug>>>, content: ImageContent) => {
  const media = Array.isArray(post.media) ? post.media : [];
  const mediaImages = media.map((item) => item?.url).filter((url): url is string => isValidImageUrl(url));
  const contentImages = Array.isArray(content.images) ? content.images.filter((url): url is string => isValidImageUrl(url)) : [];
  const merged = [...mediaImages, ...contentImages];
  return merged.length ? merged : ["/placeholder.svg?height=1200&width=1600"];
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("image", 50);
  if (!posts.length) {
    return [{ slug: "placeholder" }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("image", resolvedParams.slug);
  return post ? await buildPostMetadata("image", post) : {};
}

export default async function ImageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("image", resolvedParams.slug);
  if (!post) {
    notFound();
  }

  const content = getContent(post);
  const images = getImageUrls(post, content);
  const descriptionHtml = formatRichHtml(content.body || content.description || post.summary, "Image details coming soon.");
  const category = content.category || post.tags?.[0] || "Image";
  const related = (await fetchTaskPosts("image", 8)).filter((item) => item.slug !== post.slug).slice(0, 3);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#160705_0%,#2b0c08_30%,#100302_100%)] text-white">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SchemaJsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ImageObject",
            name: post.title,
            description: post.summary || content.description || "Image detail page",
            contentUrl: images[0],
            url: `${baseUrl}/images/${post.slug}`,
          }}
        />

        <Link href="/images" className="inline-flex items-center gap-2 text-sm text-[#f1d4ca] transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to images
        </Link>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-[2.4rem] border border-white/12 bg-white/8 shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
              <div className="relative aspect-[16/11] w-full">
                <ContentImage
                  src={images[0]}
                  alt={post.title}
                  fill
                  className="object-cover"
                  intrinsicWidth={1600}
                  intrinsicHeight={1100}
                  priority
                />
              </div>
            </div>

            {images.length > 1 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.slice(1, 4).map((image, index) => (
                  <div key={`${image}-${index}`} className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/6">
                    <ContentImage
                      src={image}
                      alt={`${post.title} view ${index + 2}`}
                      fill
                      className="object-cover"
                      intrinsicWidth={960}
                      intrinsicHeight={1200}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-6">
            <div className="rounded-[2.2rem] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#ffd8cb]">
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-3 py-1">
                  <Tag className="h-3.5 w-3.5" />
                  {category}
                </span>
                {content.location ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-3 py-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {content.location}
                  </span>
                ) : null}
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white">{post.title}</h1>
              <p className="mt-4 text-sm leading-8 text-[#f1d4ca]">
                A more editorial image detail page with a clear visual lead, supporting frames, and room for the description to breathe.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ffd8cb]">Story</p>
              <RichContent html={descriptionHtml} className="mt-4 prose-invert text-[#fff3ee] prose-p:text-[#f1d4ca] prose-strong:text-white prose-headings:text-white" />
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ffd8cb]">More images</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">Continue the gallery</h2>
              </div>
              <Link href="/images" className="inline-flex items-center gap-2 text-sm font-semibold text-[#fff1e7] transition hover:text-white">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={buildPostUrl("image", item.slug)} taskKey="image" />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
