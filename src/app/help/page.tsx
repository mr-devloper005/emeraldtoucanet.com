import Link from 'next/link'
import { ArrowRight, LifeBuoy } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { marketingPages } from '@/config/site.marketing-pages'

const tile =
  'group flex h-full flex-col rounded-[1.75rem] border border-[rgba(116,10,3,0.12)] bg-white p-6 shadow-[0_12px_40px_rgba(40,9,5,0.05)] transition hover:border-[rgba(195,17,12,0.28)] hover:shadow-md'

export default function HelpPage() {
  const { help } = marketingPages

  return (
    <PageShell
      eyebrow="Resources"
      title="Help Center"
      description="Guides for publishing, browsing the gallery, search, and account basics—written for the image-first experience on this site."
      actions={
        <Button className="rounded-full bg-[#c3110c] text-white hover:bg-[#740a03]" asChild>
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="mb-10 flex flex-wrap items-center gap-3 rounded-[1.5rem] border border-[rgba(195,17,12,0.18)] bg-[#fff5f0] px-4 py-3 text-sm text-[#5c2f28]">
        <LifeBuoy className="h-5 w-5 shrink-0 text-[#c3110c]" />
        <span>
          Tip: start with{' '}
          <Link href="/images" className="font-semibold text-[#c3110c] hover:underline">
            Browse images
          </Link>{' '}
          to see how captions and locations render on tiles.
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          {help.topics.map((topic) => (
            <div key={topic.title} className={tile}>
              <h2 className="text-lg font-semibold text-[#280905]">{topic.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5c2f28]">{topic.description}</p>
              <Link
                href={topic.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#c3110c] hover:text-[#740a03]"
              >
                {topic.cta}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
        <div className="rounded-[1.75rem] border border-[rgba(116,10,3,0.12)] bg-white p-6 shadow-[0_16px_48px_rgba(40,9,5,0.06)] sm:p-8">
          <h3 className="text-lg font-semibold text-[#280905]">Frequently asked</h3>
          <p className="mt-1 text-sm text-[#5c2f28]">Answers tuned for gallery publishing on this demo.</p>
          <Accordion type="single" collapsible className="mt-5 w-full">
            {help.faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-[rgba(40,9,5,0.1)]">
                <AccordionTrigger className="text-left text-sm font-semibold text-[#280905] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-[#5c2f28]">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </PageShell>
  )
}
