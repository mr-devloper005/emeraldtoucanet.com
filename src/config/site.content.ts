import type { TaskKey } from '@/lib/site-config'
import { siteIdentity } from '@/config/site.identity'

/** Task routes hidden from the main navbar (image-only chrome; logo + search + auth remain). */
export const navbarHiddenTaskKeys = ['image', 'article'] as const satisfies readonly TaskKey[]

/** Curated photography for the homepage (Unsplash — editorial-style captions). */
export const homeHeroShowcase = [
  {
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=720&q=82',
    caption: 'First light on the ridgeline',
    location: 'Julian Alps · Slovenia',
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=720&q=82',
    caption: 'Clouds rolling over the summit',
    location: 'Annapurna region · Nepal',
  },
  {
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=720&q=82',
    caption: 'Sun through the forest aisle',
    location: 'Black Forest · Germany',
  },
  {
    src: 'https://picsum.photos/seed/emerald-tide-hero/720/900',
    caption: 'Slow shutter on the tide',
    location: 'Big Sur coast · California',
  },
] as const

const galleryWallCaptions = [
  'Blue hour over the harbor',
  'Desert road at long lens',
  'Rain on cobblestones',
  'Alpine wind on the ridge',
  'Studio light on texture',
  'Coastal fog lifting',
  'City grid from above',
  'Wildflowers after rain',
  'Snow line at treeline',
  'Dunes at last light',
  'Forest floor in spring',
  'Reflections in still water',
] as const

const galleryWallPlaces = [
  'Reykjavík · Iceland',
  'Namib Desert · Namibia',
  'Lisbon · Portugal',
  'Banff · Canada',
  'Brooklyn · USA',
  'Oregon coast · USA',
  'Tokyo · Japan',
  'Tuscany · Italy',
  'Chamonix · France',
  'Western Australia',
  'Vancouver Island · Canada',
  'Scottish Highlands',
] as const

/**
 * Homepage “More frames” grid — fewer tiles, fixed 480×640 + stable seeds so nothing 404s or renders blank.
 * (Varying width/height per cell was causing occasional empty Picsum responses.)
 */
export const homeGalleryWall: { src: string; caption: string; location: string }[] = Array.from({ length: 24 }, (_, i) => ({
  src: `https://picsum.photos/seed/emeraldwall-${i + 1}/480/640`,
  caption: galleryWallCaptions[i % galleryWallCaptions.length],
  location: galleryWallPlaces[i % galleryWallPlaces.length],
}))

export const siteContent = {
  navbar: {
    tagline: 'Gallery-first visual publishing',
  },
  footer: {
    tagline: 'Image sharing and visual discovery',
  },
  hero: {
    badge: 'Fresh frames and posts',
    title: ['Bring your best visuals', 'to the surface.'],
    description:
      'A calmer home for photography and visual posts—large tiles, clear captions, and a gallery pace built for sharing work that deserves the screen.',
    primaryCta: {
      label: 'Open the gallery',
      href: '/images',
    },
    searchPlaceholder: 'Search images and visual posts',
    focusLabel: 'Focus',
    featureCardBadge: 'cover rotation',
    featureCardTitle: 'Recent uploads set the tone of the homepage.',
    featureCardDescription:
      'New images and posts stay up front while the rest of the experience stays one click away.',
  },
  home: {
    metadata: {
      title: 'Visual gallery and image sharing',
      description: 'A professional image-sharing home—photography, galleries, and visual posts with a gallery-first layout.',
      openGraphTitle: 'Visual gallery and image sharing',
      openGraphDescription: 'Discover image posts and visual stories in one cohesive gallery experience.',
      keywords: ['image sharing', 'visual gallery', 'photography', 'creative posts', siteIdentity.name],
    },
    primaryLink: {
      label: 'Browse images',
      href: '/images',
    },
    secondaryLink: {
      label: 'About',
      href: '/about',
    },
  },
  cta: {
    badge: 'Join the studio',
    title: 'Publish frames and keep your gallery discoverable.',
    description: 'Create an account to upload images, organize posts, and share your work in one professional surface.',
    primaryCta: {
      label: 'Create account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Contact',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and long reads',
    description: 'Essays, notes, and stories that complement the visual gallery.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'Explore listings, services, brands, and structured pages organized for easier browsing.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse classifieds, offers, notices, and time-sensitive posts across categories.',
  },
  image: {
    title: 'Images and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories in one gallery-first experience.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Discover public profiles, brand pages, and identity-focused posts in one place.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Browse useful links, saved references, and curated resources organized for discovery.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open reports, documents, and downloadable resources shared across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings connect naturally with articles, images, resources, and other content types so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    links: [
      { label: 'Gallery', href: '/images' },
      { label: 'Articles', href: '/articles' },
      { label: 'Classifieds', href: '/classifieds' },
    ],
  },
  article: {
    title: 'Articles beside the gallery',
    paragraphs: [
      'Long-form writing lives here with calmer typography and room for narrative—separate from the image grid but on the same platform.',
      'Use articles to add context, process notes, or stories behind the visuals visitors discover first.',
      'Jump back into the gallery any time; routes and behavior stay consistent with the base system.',
    ],
    links: [
      { label: 'Open images', href: '/images' },
      { label: 'Search everything', href: '/search' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Images', href: '/images' },
      { label: 'Articles', href: '/articles' },
      { label: 'Listings', href: '/listings' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'This lane is tuned for photography, renders, and visual drops—large media, tight metadata, and a gallery pace.',
      'Browse in a masonry rhythm built for visuals first: every tile is meant to carry a strong frame.',
      'Filters and cards use the same underlying feeds and metadata as elsewhere on the site; only the presentation changes here.',
    ],
    links: [],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with stories, listings, documents, and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Gallery', href: '/images' },
      { label: 'Articles', href: '/articles' },
      { label: 'Listings', href: '/listings' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a compact, shelf-like layout.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories or media.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Images', href: '/images' },
      { label: 'PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Gallery', href: '/images' },
      { label: 'Profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Images', href: '/images' },
      { label: 'Articles', href: '/articles' },
      { label: 'PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Gallery', href: '/images' },
      { label: 'Classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
