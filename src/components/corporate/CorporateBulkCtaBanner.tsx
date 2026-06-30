type CorporateBulkCtaBannerProps = {
  onEnquire: () => void;
};

export default function CorporateBulkCtaBanner({ onEnquire }: CorporateBulkCtaBannerProps) {
  return (
    <section className="border-t border-[#E8DFD4] bg-[var(--cream)] py-12 sm:py-14">
      <div className="section-container text-center">
        <h2 className="font-serif text-[clamp(1.35rem,3vw,2rem)] font-semibold text-[#4A1020]">
          Contact Us for Exclusive Bulk Orders
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#6E6360]">
          Custom branding, pan-India delivery, and dedicated support for corporate gifting programs.
        </p>
        <button
          type="button"
          onClick={onEnquire}
          className="mt-6 inline-flex min-h-12 min-w-[200px] items-center justify-center rounded-md bg-[#9D7D47] px-10 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#8a6d3f]"
        >
          Enquire Now
        </button>
      </div>
    </section>
  );
}
