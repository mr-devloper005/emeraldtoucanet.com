import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { marketingPages } from '@/config/site.marketing-pages'

export default function LicensesPage() {
  const { licenses } = marketingPages

  return (
    <PageShell
      eyebrow="Legal"
      title="Licenses"
      description={licenses.intro}
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-[rgba(116,10,3,0.12)] bg-white shadow-[0_16px_48px_rgba(40,9,5,0.06)]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[rgba(40,9,5,0.08)] bg-[#fff9f5] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#740a03]/85">
              <th className="px-5 py-3 sm:px-6">Project</th>
              <th className="hidden px-4 py-3 sm:table-cell sm:px-6">License</th>
              <th className="px-5 py-3 text-right sm:px-6">Notice</th>
            </tr>
          </thead>
          <tbody>
            {licenses.rows.map((row) => (
              <tr key={row.name} className="border-b border-[rgba(40,9,5,0.06)] last:border-0">
                <td className="px-5 py-4 sm:px-6">
                  <div className="font-semibold text-[#280905]">{row.name}</div>
                  <div className="mt-0.5 text-xs text-[#5c2f28] sm:hidden">{row.license}</div>
                </td>
                <td className="hidden px-4 py-4 text-[#5c2f28] sm:table-cell sm:px-6">{row.license}</td>
                <td className="px-5 py-4 text-right sm:px-6">
                  <Link
                    href={row.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#c3110c] hover:text-[#740a03]"
                  >
                    View
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t border-[rgba(40,9,5,0.06)] bg-[#fffdfb] px-5 py-4 text-xs leading-relaxed text-[#5c2f28] sm:px-6">
          Demo imagery may include Unsplash or Picsum URLs; attribution and terms follow each provider. This table is not exhaustive.
        </p>
      </div>
    </PageShell>
  )
}
