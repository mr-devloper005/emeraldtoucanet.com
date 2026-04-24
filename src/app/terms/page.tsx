import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'
import { marketingPages } from '@/config/site.marketing-pages'

export default function TermsPage() {
  const { terms, lastUpdatedLegal } = marketingPages

  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of service"
      description={`Rules for using ${SITE_CONFIG.name}, including content you upload to the gallery.`}
    >
      <p className="mb-10 text-sm text-[#740a03]">Last updated: {lastUpdatedLegal}</p>
      <div className="space-y-6">
        {terms.sections.map((section) => (
          <section
            key={section.title}
            className="rounded-[1.75rem] border border-[rgba(116,10,3,0.1)] bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-lg font-semibold text-[#280905]">{section.title}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#5c2f28] marker:text-[#c3110c]">
              {section.body.map((line) => (
                <li key={line.slice(0, 48)}>{line}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm text-[#5c2f28]">
        For privacy-specific topics, see the{' '}
        <Link href="/privacy" className="font-semibold text-[#c3110c] hover:underline">
          Privacy policy
        </Link>
        .
      </p>
    </PageShell>
  )
}
