"use client";

import { useMemo } from "react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";
import { homeGalleryWall } from "@/config/site.content";

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
};

export function TaskListClient({ task, initialPosts, category }: Props) {
  const localPosts = getLocalPostsForTask(task);

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) {
        bySlug.add(post.slug);
      }
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    if (normalizedCategory === "all") {
      return combined.filter((post) => {
        const content = post.content && typeof post.content === "object" ? post.content : {};
        const value = typeof (content as any).category === "string" ? (content as any).category : "";
        return !value || isValidCategory(value);
      });
    }

    return combined.filter((post) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const value =
        typeof (content as any).category === "string"
          ? normalizeCategory((content as any).category)
          : "";
      return value === normalizedCategory;
    });
  }, [category, initialPosts, localPosts]);

  if (!merged.length) {
    if (task === "image") {
      return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeGalleryWall.slice(0, 12).map((item, index) => (
            <div
              key={`${item.src}-${index}`}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm"
            >
              <div className="relative aspect-[4/5] w-full">
                <img
                  src={item.src}
                  alt={item.caption}
                  width={480}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-0.5 p-3">
                <p className="text-xs font-semibold leading-snug text-white">{item.caption}</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#e8c4bc]/75">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="rounded-[1.75rem] border border-dashed border-[rgba(116,10,3,0.22)] bg-[#fff9f5] p-12 text-center">
        <p className="text-sm font-semibold text-[#280905]">Nothing published here yet</p>
        <p className="mt-2 text-sm text-[#5c2f28]/85">When posts arrive, they will appear in this grid using the same rules as the rest of the platform.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {merged.map((post) => {
        const localOnly = (post as any).localOnly;
        const href = localOnly
          ? `/local/${task}/${post.slug}`
          : buildPostUrl(task, post.slug);
        return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
      })}
    </div>
  );
}
