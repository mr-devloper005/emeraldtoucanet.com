import { siteIdentity } from '@/config/site.identity'

/** Shared copy and structured data for marketing / legal surfaces (image-first site). */
export const marketingPages = {
  lastUpdatedLegal: 'April 24, 2026',
  about: {
    storyEyebrow: 'Why we exist',
    storyTitle: 'A calmer home for photography and visual posts.',
    storyLead: `${siteIdentity.name} is built gallery-first: large tiles, readable captions, and motion that stays lightweight so the work—not the chrome—stays in focus.`,
    storyBody: `Visitors land on real photography and curated frames. Creators publish once and see their posts in the same rhythm on the homepage, the images lane, and search.`,
    stats: [
      { label: 'Showcase scenes in rotation', value: '12+' },
      { label: 'Wall frames (curated grid)', value: '24' },
      { label: 'Core focus', value: 'Images' },
    ],
    pillars: [
      {
        title: 'Images as the hero',
        description: 'Layouts assume tall media first—aspect-aware cards, clear hierarchy, and metadata that supports discovery without crowding the frame.',
      },
      {
        title: 'One visual language',
        description: 'Ember tones and spacing match across browse, upload, and account paths so the experience feels like one studio, not a bolted-on admin.',
      },
      {
        title: 'Built to share',
        description: 'Captions, locations, and consistent cards make it easier for viewers to understand context and save what resonates.',
      },
    ],
  },
  help: {
    topics: [
      {
        title: 'Getting started',
        description: 'Create an account, sign in, and land on the homepage with the same gallery rhythm as /images.',
        href: '/register',
        cta: 'Create account',
      },
      {
        title: 'Publishing images',
        description: 'Upload frames, add captions and locations, and see how posts appear in masonry grids and search.',
        href: '/images',
        cta: 'Browse gallery',
      },
      {
        title: 'Search & discovery',
        description: 'Use the navbar search to find posts by title and metadata; results follow the same card layout as browse.',
        href: '/search',
        cta: 'Open search',
      },
      {
        title: 'Account & safety',
        description: 'Manage your profile from the account menu. Report concerns through contact—we review within two business days.',
        href: '/contact',
        cta: 'Contact',
      },
    ],
    faqs: [
      {
        id: 'faq-img-1',
        question: 'What file types can I upload?',
        answer: 'Use common web formats (JPEG, PNG, WebP, GIF). Keep files reasonably sized so tiles stay fast on mobile networks.',
      },
      {
        id: 'faq-img-2',
        question: 'Where do my posts appear?',
        answer: 'Published image posts flow into the homepage gallery sections, the /images lane, and site search using the same card layout.',
      },
      {
        id: 'faq-img-3',
        question: 'How do captions and locations work?',
        answer: 'Captions display under each tile. Location lines read like place names—they help viewers orient the scene without opening the post.',
      },
      {
        id: 'faq-img-4',
        question: 'Can I delete my account?',
        answer: 'Yes. Contact support with the email on your account and we will remove your profile and associated posts per our privacy policy.',
      },
      {
        id: 'faq-img-5',
        question: 'Is there an API for uploads?',
        answer: 'This demo focuses on the web gallery. For integrations, reach out via Contact with your use case.',
      },
    ],
  },
  community: {
    intro: 'Ways to stay close to the gallery—office hours, feedback windows, and contributor norms.',
    programs: [
      {
        title: 'Gallery office hours',
        schedule: 'First Tuesday · 17:00 UTC',
        tag: 'Live',
        description: 'Walk through publishing tips, captioning, and how we tune masonry layouts for clarity.',
      },
      {
        title: 'Monthly photo walk digest',
        schedule: 'Published mid-month',
        tag: 'Editorial',
        description: 'Curated selections from member uploads with short notes on light, composition, and place.',
      },
      {
        title: 'Safety & norms',
        schedule: 'Always on',
        tag: 'Policy',
        description: 'Respectful feedback only; no harassment. Moderation follows the same acceptable-use rules as the rest of the site.',
      },
    ],
    groups: [
      { name: 'Landscape & travel', members: 1840, focus: 'Location lines, weather, and long lenses' },
      { name: 'Street & night', members: 2260, focus: 'Low light, color balance, candid rhythm' },
      { name: 'Studio & still life', members: 980, focus: 'Lighting setups, texture, minimal sets' },
    ],
  },
  status: {
    headline: 'All systems operational',
    sub: 'Synthetic checks run every five minutes from three regions. Numbers below are illustrative for this demo build.',
    services: [
      { name: 'Public gallery', detail: 'Homepage + /images', status: 'Operational' as const },
      { name: 'Media delivery', detail: 'CDN + image optimization', status: 'Operational' as const },
      { name: 'Search index', detail: 'Post titles + metadata', status: 'Operational' as const },
      { name: 'Auth & sessions', detail: 'Sign-in / sign-up', status: 'Operational' as const },
    ],
    metrics: [
      { label: 'Gallery p95 (demo)', value: '420 ms' },
      { label: 'API p95 (demo)', value: '190 ms' },
      { label: 'Last incident', value: '42d ago' },
    ],
    incidents: [
      { date: 'Mar 12, 2026', title: 'Elevated latency on image tiles', status: 'Resolved', detail: 'CDN edge cache warm-up; no data loss.' },
      { date: 'Feb 22, 2026', title: 'Search indexing lag', status: 'Resolved', detail: 'Backfill completed within 35 minutes.' },
      { date: 'Jan 8, 2026', title: 'Scheduled maintenance', status: 'Completed', detail: 'Database minor version upgrade.' },
    ],
  },
  privacy: {
    sections: [
      {
        title: 'What we collect',
        body: [
          'Account details you provide (name, email) when you register or contact us.',
          'Content you publish (images, captions, locations, and timestamps).',
          'Technical data such as browser type, approximate region, and basic usage signals to keep the site reliable.',
        ],
      },
      {
        title: 'How we use information',
        body: [
          'To operate the gallery: render posts, power search, and prevent abuse.',
          'To respond to support requests and send essential service messages.',
          'To improve performance and layout quality—using aggregated patterns where possible.',
        ],
      },
      {
        title: 'Sharing',
        body: [
          'We do not sell personal information. Processors (e.g. hosting, email) only receive what they need to deliver the service.',
          'Published posts are visible to visitors according to your publish settings for this demo environment.',
        ],
      },
      {
        title: 'Retention & deletion',
        body: [
          'We keep account and post data while your account is active.',
          'You may request deletion of your account and posts by contacting us; we confirm by email before erasure where required.',
        ],
      },
      {
        title: 'Your choices',
        body: [
          'Update profile fields from the account menu when available.',
          'Opt out of non-essential communications by replying to any message or writing to the contact address on this site.',
        ],
      },
    ],
  },
  terms: {
    sections: [
      {
        title: 'Using the service',
        body: [
          `You agree to follow these terms when using ${siteIdentity.name}.`,
          'You must be able to form a binding contract in your jurisdiction, or use the site under supervision of someone who can.',
        ],
      },
      {
        title: 'Your content',
        body: [
          'You retain rights to content you upload. You grant us a limited license to host, display, and distribute that content to operate the gallery.',
          'You represent that you have the rights needed for each image and caption you publish.',
        ],
      },
      {
        title: 'Acceptable use',
        body: [
          'No unlawful, hateful, harassing, or exploitative material—especially imagery involving minors or non-consenting subjects.',
          'No attempts to disrupt the service, scrape at abusive rates, or bypass security controls.',
        ],
      },
      {
        title: 'Disclaimers',
        body: [
          'The service is provided as-is to the extent permitted by law. We do not guarantee uninterrupted availability.',
          'Third-party imagery sources (e.g. demo stock URLs) may change; we are not responsible for third-party availability.',
        ],
      },
      {
        title: 'Changes',
        body: [
          'We may update these terms; the “Last updated” date at the top will change when we do.',
          'Continued use after changes constitutes acceptance of the revised terms.',
        ],
      },
    ],
  },
  cookies: {
    sections: [
      {
        title: 'Essential cookies',
        body: [
          'Required for authentication, security, and basic preferences (such as session continuity).',
          'These cannot be toggled off without breaking sign-in flows.',
        ],
      },
      {
        title: 'Analytics',
        body: [
          'We may use first-party or privacy-preserving analytics to understand which layouts and paths perform best.',
          'Where used, analytics aim to avoid fingerprinting and minimize retention.',
        ],
      },
      {
        title: 'Preferences',
        body: [
          'Remember UI choices such as dismissed banners when we add them.',
          'You can clear cookies through your browser; you may need to sign in again afterward.',
        ],
      },
    ],
  },
  licenses: {
    intro: 'This project ships with open-source dependencies. Below is a representative subset; the full bill of materials lives in package manifests.',
    rows: [
      { name: 'Next.js', license: 'MIT', href: 'https://github.com/vercel/next.js/blob/canary/license.md' },
      { name: 'React', license: 'MIT', href: 'https://github.com/facebook/react/blob/main/LICENSE' },
      { name: 'Tailwind CSS', license: 'MIT', href: 'https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE' },
      { name: 'Lucide (icons)', license: 'ISC', href: 'https://github.com/lucide-icons/lucide/blob/main/LICENSE' },
      { name: 'Radix UI', license: 'MIT', href: 'https://github.com/radix-ui/primitives/blob/main/LICENSE' },
      { name: 'class-variance-authority', license: 'Apache-2.0', href: 'https://github.com/joe-bell/cva/blob/main/LICENSE.md' },
      { name: 'Zod', license: 'MIT', href: 'https://github.com/colinhacks/zod/blob/master/LICENSE' },
      { name: 'Unsplash / Picsum (demo imagery)', license: 'See respective terms', href: 'https://unsplash.com/license' },
    ],
  },
} as const
