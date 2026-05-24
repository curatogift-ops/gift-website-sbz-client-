import { useMemo, useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type Brand = {
  name: string;
  image: string;
  letter: string;
};

const BRANDS: Brand[] = [
  { name: 'Amazon Pay', image: '/images/brands/imageye___-_imgi_100_f25939_7f99461f862e447a866cdc45d9194707~mv2.png', letter: 'A' },
  { name: 'Apple', image: '/images/brands/imageye___-_imgi_101_f25939_0ca66acadc894ec48e3f3101f9de8e82~mv2.png', letter: 'A' },
  { name: 'Asics', image: '/images/brands/imageye___-_imgi_102_f25939_5f5fe90d6aa64485bfe21606c4da0f03~mv2.png', letter: 'A' },
  { name: 'Ajio', image: '/images/brands/imageye___-_imgi_1_white_letter_logo.png', letter: 'A' },
  { name: 'BOSS', image: '/images/brands/imageye___-_imgi_10_f25939_758f5155520d4631b0bfdb148278e926~mv2.png', letter: 'B' },
  { name: 'boAt', image: '/images/brands/imageye___-_imgi_9_1200px-Boat_Logo_webp.png', letter: 'B' },
  { name: 'Bata', image: '/images/brands/imageye___-_imgi_11_f25939_3d3e7896e243463d888c86ddcdf8516d~mv2.jpg', letter: 'B' },
  { name: 'Baskin Robbins', image: '/images/brands/imageye___-_imgi_12_bfbb3caf432d0c1370b99e805bb1eec3.jpg', letter: 'B' },
  { name: 'Case', image: '/images/brands/imageye___-_imgi_13_f25939_dded8338f9be4e0c81e03e6f8e141de1~mv2.png', letter: 'C' },
  { name: 'Chokhi Dhani', image: '/images/brands/imageye___-_imgi_14_f25939_28aa483a85fe4f5885b6847966be2cc4~mv2.png', letter: 'C' },
  { name: 'Deep Roots', image: '/images/brands/imageye___-_imgi_15_Deep-Roots-Farms-Logo.png', letter: 'D' },
  { name: 'Eat', image: '/images/brands/imageye___-_imgi_17_f25939_24116c3d2b9e43bb9a766fc7e459b9e5~mv2.png', letter: 'E' },
  { name: 'Eclair', image: '/images/brands/imageye___-_imgi_16_f25939_d5ea3fc7c4c64914b810e362407b6b6a~mv2.png', letter: 'E' },
  { name: 'Fuzo', image: '/images/brands/imageye___-_imgi_18_fuzo-logo-png_seeklogo-379183.png', letter: 'F' },
  { name: 'Garmin', image: '/images/brands/imageye___-_imgi_19_f25939_e73e17bc2cf24a9da4f98458a2720cc5~mv2.jpg', letter: 'G' },
  { name: 'Greenbrrew', image: '/images/brands/imageye___-_imgi_20_f25939_1ee5f8c905c848ac95b50adc1fcd5d8f~mv2.jpg', letter: 'G' },
  { name: 'Goodwyn Tea', image: '/images/brands/imageye___-_imgi_21_images (1).png', letter: 'G' },
  { name: 'Haldirams', image: '/images/brands/imageye___-_imgi_22_f25939_20b5069932c949f498ff3ed38f3f4dd6~mv2.jpg', letter: 'H' },
  { name: 'Jockey', image: '/images/brands/imageye___-_imgi_23_f25939_bea46c63b2634397bd084dd36f9e2c6a~mv2.jpg', letter: 'J' },
  { name: 'JW Marriott', image: '/images/brands/imageye___-_imgi_24_images (1).jpg', letter: 'J' },
  { name: 'Mont Blanc', image: '/images/brands/imageye___-_imgi_25_montblanc-logo-01.jpg', letter: 'M' },
  { name: 'Mokobara', image: '/images/brands/imageye___-_imgi_26_f25939_4b6db1de71e844a9bb1f01afe4f447b5~mv2.jpg', letter: 'M' },
  { name: 'Marks & Spencer', image: '/images/brands/imageye___-_imgi_27_f25939_93e96b87aaf549a8b85ab328c3da6021~mv2.webp', letter: 'M' },
  { name: 'MAX', image: '/images/brands/imageye___-_imgi_28_f25939_e785f3af7eac487190e320ce200cf213~mv2.jpg', letter: 'M' },
  { name: 'Nothing', image: '/images/brands/imageye___-_imgi_29_f25939_f3df2163653e492288009c6acaabad1c~mv2.png', letter: 'N' },
  { name: 'Nike', image: '/images/brands/imageye___-_imgi_30_f25939_669985f3a21849aa9b3582eb8bb02506~mv2.jpg', letter: 'N' },
  { name: 'Nedis', image: '/images/brands/imageye___-_imgi_31_f25939_78801ef87c674aed8c45f703911479fb~mv2.png', letter: 'N' },
  { name: 'Nykaa', image: '/images/brands/imageye___-_imgi_32_f25939_b267a1aed9c34c5f9537121aafc6469d~mv2.jpg', letter: 'N' },
  { name: 'OnePlus', image: '/images/brands/imageye___-_imgi_33_f25939_ee8429bd385146b4b81683716af2c425~mv2.png', letter: 'O' },
  { name: 'Puma', image: '/images/brands/imageye___-_imgi_34_f25939_df0169a718604fc5be5e846587486b63~mv2.png', letter: 'P' },
  { name: 'PortHouse', image: '/images/brands/imageye___-_imgi_35_f25939_222a0f3334c14200bc894872d56df5e5~mv2.png', letter: 'P' },
  { name: 'Portronics', image: '/images/brands/imageye___-_imgi_36_f25939_754b6d43207240d7a150a8bb3c3918c8~mv2.jpg', letter: 'P' },
  { name: 'Rage Coffee', image: '/images/brands/imageye___-_imgi_37_f25939_1959c258edbe46f5869947660dde28be~mv2.png', letter: 'R' },
  { name: 'Rico', image: '/images/brands/imageye___-_imgi_38_f25939_976e794e93a2475a953cd8e8ab5a1dd4~mv2.webp', letter: 'R' },
  { name: 'Samsung', image: '/images/brands/imageye___-_imgi_39_f25939_6370213bb3fb402fb8d2de0de2da791d~mv2.png', letter: 'S' },
  { name: 'Skullcandy', image: '/images/brands/imageye___-_imgi_40_f25939_10bd114af209459281a5b9375c9289f4~mv2.png', letter: 'S' },
  { name: 'Starbucks', image: '/images/brands/imageye___-_imgi_41_f25939_1d0ee1be9d0b4cbea62b8d7f42845d37~mv2.webp', letter: 'S' },
  { name: 'Skechers', image: '/images/brands/imageye___-_imgi_42_f25939_ccba8b93bb264f559943bc9a569a56ac~mv2.jpg', letter: 'S' },
  { name: 'The Body Shop', image: '/images/brands/imageye___-_imgi_43_f25939_0efc1d7beee545bbbd9753619ce6c2b7~mv2.jpg', letter: 'T' },
  { name: 'Titan', image: '/images/brands/imageye___-_imgi_44_f25939_7a7c368ff262471fbb9a1cefa12e30b2~mv2.png', letter: 'T' },
  { name: 'Voyager', image: '/images/brands/imageye___-_imgi_45_f25939_1d28301c8cb74a928c2f174887b77cb0~mv2.png', letter: 'V' },
  { name: 'Vero Moda', image: '/images/brands/imageye___-_imgi_46_f25939_9e056ee340d74b4ab8d1393696156cb6~mv2.png', letter: 'V' },
  { name: 'Wildcraft', image: '/images/brands/imageye___-_imgi_47_f25939_5de41c999f414bd8b9bbe76552ada5b6~mv2.png', letter: 'W' },
  { name: 'WOW Skin', image: '/images/brands/imageye___-_imgi_48_f25939_4cbccbb08e854d39b71a60ce912947d7~mv2.png', letter: 'W' },
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function BrandsPage() {
  const [activeLetter, setActiveLetter] = useState<string>('A');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const grouped = useMemo(() => {
    const map = new Map<string, Brand[]>();
    for (const letter of ALPHABET) map.set(letter, []);
    for (const brand of BRANDS) map.get(brand.letter)?.push(brand);
    return map;
  }, []);

  const jumpToLetter = (letter: string) => {
    setActiveLetter(letter);
    sectionRefs.current[letter]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f1ea]">
      <Navbar />
      <main className="flex-grow pt-[calc(11.5rem+env(safe-area-inset-top,0px))] md:pt-[9rem] xl:pt-[5.75rem] 2xl:pt-[6rem]">
        <section className="border-b border-[#d8cfc0] bg-[#f8f4ec]">
          <div className="section-container py-3 md:py-4">
            <div className="flex flex-wrap items-center gap-2 text-[#4A1020]">
              <h1 className="font-serif text-[18px] font-semibold leading-none md:text-[22px]">Brand Index:</h1>
              <p className="text-[11px] font-bold tracking-[0.12em] md:text-[12px]">A to Z Partner Logos</p>
            </div>
          </div>
        </section>

        <section className="sticky top-[5.6rem] z-30 border-b border-[#d8cfc0] bg-[#f8f4ec]/95 backdrop-blur md:top-[5.7rem] xl:top-[3.6rem]">
          <div className="section-container py-2">
            <div className="flex flex-wrap items-center justify-center gap-1">
              {ALPHABET.map((letter) => {
                const hasBrands = (grouped.get(letter)?.length ?? 0) > 0;
                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => jumpToLetter(letter)}
                    className={[
                      'h-6 min-w-6 rounded px-1.5 text-[10px] font-bold transition-all',
                      activeLetter === letter
                        ? 'bg-[#4A1020] text-[#F2EDE8]'
                        : hasBrands
                        ? 'text-[#4A1020] hover:bg-[#eadfce]'
                        : 'text-[#b9afa2] hover:bg-[#efe6d8]',
                    ].join(' ')}
                    aria-label={`Go to ${letter}`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-container py-3 md:py-5">
          <div className="space-y-4">
            {ALPHABET.map((letter) => {
              const brands = grouped.get(letter) ?? [];
              return (
                <section
                  key={letter}
                  id={`brands-${letter}`}
                  ref={(el) => {
                    sectionRefs.current[letter] = el;
                  }}
                  className="scroll-mt-36"
                >
                  <div className="relative rounded-none border-2 border-[#df9a1b] bg-[#f8f4ec] px-2.5 py-2.5 md:px-4 md:py-3">
                    <div className="absolute -bottom-[13px] left-[42px] h-0 w-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-[#df9a1b]" />
                    <div className="absolute -bottom-[10px] left-[44px] h-0 w-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-[#f8f4ec]" />
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-7 shrink-0 text-center font-serif text-[50px] leading-[0.9] text-[#0f4d1f] md:w-10 md:text-[64px]">
                        {letter}
                      </div>
                      <div className="min-h-[52px] flex-1 pt-1 md:min-h-[66px]">
                        {brands.length > 0 ? (
                          <div className="flex flex-wrap items-center gap-2.5 md:gap-3.5">
                            {brands.map((brand) => (
                              <div
                                key={`${letter}-${brand.name}`}
                                className="flex h-[58px] w-[102px] items-center justify-center overflow-hidden bg-white px-1.5 md:h-[90px] md:w-[190px] md:px-2"
                                title={brand.name}
                              >
                                <img
                                  src={brand.image}
                                  alt={brand.name}
                                  className="max-h-[54px] max-w-[96px] object-contain md:max-h-[82px] md:max-w-[178px]"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="h-[58px] md:h-[90px]" />
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
