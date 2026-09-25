import { Link } from 'react-router-dom';

type CorporateStructuredInfoProps = {
  productTitle: string;
  information: string;
  details: string[];
  enquiryLabel?: string;
};

/**
 * Shared block used after a category listing or a product detail:
 * Product → Product Information → Benefits/Details → Enquiry.
 */
export default function CorporateStructuredInfo({
  productTitle,
  information,
  details,
  enquiryLabel = 'Enquire',
}: CorporateStructuredInfoProps) {
  const blocks = [
    { step: '01', title: 'Product', body: productTitle },
    { step: '02', title: 'Product Information', body: information },
    {
      step: '03',
      title: 'Benefits / Details',
      body: details.filter(Boolean).join(' · '),
    },
  ];

  return (
    <section className="border-t border-border bg-[var(--cream)] py-10 sm:py-12" aria-label="Product information">
      <div className="section-container">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {blocks.map((block) => (
            <article
              key={block.step}
              className="flex h-full flex-col rounded-2xl border border-border bg-white p-5 sm:p-6"
            >
              <p className="font-sans text-[11px] font-bold tracking-[0.16em] text-[#C9A96E]">{block.step}</p>
              <h2 className="mt-2 font-serif text-[1.15rem] font-semibold text-[#4A1020]">{block.title}</h2>
              <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{block.body}</p>
            </article>
          ))}
          <article className="flex h-full flex-col rounded-2xl border border-[#C9A96E]/35 bg-[#4A1020] p-5 text-[#F2EDE8] sm:p-6">
            <p className="font-sans text-[11px] font-bold tracking-[0.16em] text-[#C9A96E]">04</p>
            <h2 className="mt-2 font-serif text-[1.15rem] font-semibold">Enquiry</h2>
            <p className="mt-3 flex-1 text-[13px] leading-relaxed text-white/75">
              Ask for branding, quantities, and delivery on this selection.
            </p>
            <Link
              to="/corporate#corporate-gift-enquiry"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-[#C9A96E] px-4 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#4A1020] transition hover:bg-[#E8D5A8]"
            >
              {enquiryLabel}
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
