type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionSectionProps = {
  id?: string;
  title?: string;
  items: FaqItem[];
  className?: string;
};

export default function FaqAccordionSection({
  id = 'faqs',
  title = 'Frequently Asked Questions',
  items,
  className = 'bg-[#F9F6F1]',
}: FaqAccordionSectionProps) {
  return (
    <section id={id} className={`section-pad scroll-mt-28 ${className}`} aria-labelledby={`${id}-heading`}>
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Need answers?</p>
          <h2 id={`${id}-heading`} className="section-heading-corporate mt-3">
            {title}
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3 lg:mt-12">
          {items.map((item, idx) => (
            <details
              key={idx}
              className="group rounded-2xl border border-[#ebe6e0]/80 bg-white px-5 py-4 shadow-sm open:shadow-[0_4px_20px_-8px_rgba(74,16,32,0.1)] sm:px-6"
            >
              <summary className="cursor-pointer list-none font-serif text-[16px] font-semibold text-[#1A1010] marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span className="shrink-0 text-[#9D7D47] transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </span>
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-[#6b6560]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
