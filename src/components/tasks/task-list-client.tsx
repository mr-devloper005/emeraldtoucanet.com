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

  // Debug: Show all posts and their categories
  console.log('=== ALL POSTS DEBUG ===');
  console.log('Task:', task);
  console.log('Category filter:', category);
  console.log('Initial posts:', initialPosts.length);
  console.log('Local posts:', localPosts.length);
  
  initialPosts.forEach((post, index) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const postCategory = typeof (content as any).category === "string" ? (content as any).category : "NO_CATEGORY";
    console.log(`Post ${index + 1}: "${post.title}" - Category: "${postCategory}"`);
  });
  console.log('=== END DEBUG ===');

  const merged = useMemo(() => {
    // Create test posts with categories if no real posts exist
    const testPosts = initialPosts.length === 0 ? [
      {
        id: 'test-1',
        slug: 'test-1',
        title: 'Technology Post 1',
        summary: 'A test technology post',
        content: { category: 'technology' },
        media: [],
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'test-2',
        slug: 'test-2',
        title: 'Business Post 1',
        summary: 'A test business post',
        content: { category: 'business' },
        media: [],
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'test-3',
        slug: 'test-3',
        title: 'Technology Post 2',
        summary: 'Another test technology post',
        content: { category: 'technology' },
        media: [],
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ] : [];
    
    const allPosts = [...initialPosts, ...localPosts, ...testPosts];
    
    console.log('=== CATEGORY FILTER TEST ===');
    console.log('Initial posts:', initialPosts.length);
    console.log('Local posts:', localPosts.length);
    console.log('Test posts:', testPosts.length);
    console.log('Total posts:', allPosts.length);
    console.log('Category filter:', category);
    
    // Show all posts and their categories
    allPosts.forEach((post, index) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const postCategory = (content as any).category || "NO_CATEGORY";
      console.log(`Post ${index + 1}: "${post.title}" - Category: "${postCategory}"`);
    });
    
    // If no category filter, return all posts
    if (!category || category === "all" || category === "") {
      console.log('No category filter - returning all posts');
      return allPosts;
    }
    
    // Simple filter - exact match
    const filtered = allPosts.filter((post) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const postCategory = (content as any).category || "";
      const matches = postCategory === category;
      
      console.log(`Filtering "${post.title}": "${postCategory}" === "${category}" = ${matches}`);
      return matches;
    });
    
    console.log('Final result:', filtered.length, 'posts');
    console.log('=== END TEST ===');
    
    return filtered;
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

  const gridClassName =
    task === "image"
      ? "grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      : task === "profile"
        ? "grid gap-6 lg:grid-cols-2"
        : "grid gap-6 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={gridClassName}>
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
