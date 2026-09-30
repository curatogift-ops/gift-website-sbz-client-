/**
 * Testimonials slot after Vouchers.
 * Real client quotes are added in TESTIMONIALS — do not invent names or reviews.
 */
export type CorporateTestimonial = {
  name: string;
  company?: string;
  text: string;
  rating?: number;
};

export const TESTIMONIALS: CorporateTestimonial[] = [];

export default function CorporateTestimonialsSection() {
  return (
    <section
      id="client-testimonials"
      className="scroll-mt-28 bg-white py-12 sm:py-14 lg:py-16"
      aria-labelledby="client-testimonials-heading"
    >
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Client stories</p>
          <h2 id="client-testimonials-heading" className="section-heading-corporate mt-3">
            Testimonials
          </h2>
          <p className="section-lede mx-auto mt-4">
            Client name, company, and review text will appear here once the stories are provided.
          </p>
        </div>

        {TESTIMONIALS.length === 0 ? (
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {['Client name', 'Company', 'Testimonial'].map((label) => (
              <article
                key={label}
                className="flex min-h-[11rem] flex-col justify-between rounded-2xl border border-dashed border-[#C9A96E]/45 bg-[#FFFDF9] p-5"
              >
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#9D7D47]">
                  {label}
                </p>
                <p className="font-serif text-[15px] leading-relaxed text-muted-foreground">
                  Waiting for the real testimonial details.
                </p>
              </article>
            ))}
          </div>
        ) : (
          <ul className="mt-8 grid list-none gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <li key={`${item.name}-${item.company ?? item.text.slice(0, 16)}`}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-[#FFFDF9] p-5 shadow-[0_16px_45px_-36px_rgba(26,16,16,0.72)]">
                  {typeof item.rating === 'number' && (
                    <p className="font-sans text-[12px] font-semibold text-[#9D7D47]">
                      {item.rating.toFixed(1)} / 5
                    </p>
                  )}
                  <p className="mt-3 flex-1 font-serif text-[15px] leading-relaxed text-foreground/85">
                    {item.text}
                  </p>
                  <div className="mt-5 border-t border-border/70 pt-4">
                    <p className="text-[14px] font-bold text-foreground">{item.name}</p>
                    {item.company && (
                      <p className="mt-0.5 text-[12px] text-muted-foreground">{item.company}</p>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
