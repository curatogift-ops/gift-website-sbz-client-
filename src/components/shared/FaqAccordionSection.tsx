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
  className = 'bg-white',
}: FaqAccordionSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-12 sm:py-14 lg:py-16 ${className}`} aria-labelledby={`${id}-heading`}>
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id={`${id}-heading`} className="section-heading-corporate">
            {title}
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-3 lg:mt-10">
          {items.map((item, idx) => (
            <details
              key={idx}
              className="group rounded-2xl border border-border bg-white px-5 py-4 transition-colors open:border-[#C9A96E]/45 sm:px-6"
            >
              <summary className="cursor-pointer list-none font-serif text-[16px] font-semibold text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span className="shrink-0 text-[#9D7D47] transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </span>
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
