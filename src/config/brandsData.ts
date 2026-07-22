export type Brand = {
  name: string;
  image: string;
  letter: string;
  tags: string[];
};

/** Base path for alphabetically organised brand logos in public/brand_logos/{Letter}/ */
const BASE = '/brand_logos';

type BrandEntry = {
  letter: string;
  file?: string;
  name: string;
  tags: string[];
};

/**
 * All brand logos from public/brand_logos — one entry per file, sorted A→Z by name.
 * Folder letter must match the first letter of the brand name.
 */
const BRAND_ENTRIES: BrandEntry[] = [
  // A
  { letter: 'A', file: 'Amazon_Pay.png', name: 'Amazon Pay Gift Card', tags: ['top', 'popular'] },
  { letter: 'A', file: 'Amos.png', name: 'Amos', tags: ['new'] },
  { letter: 'A', file: 'Aquaminder.png', name: 'Aquaminder', tags: ['new'] },
  { letter: 'A', name: 'Art of Puja', tags: ['new'] },
  { letter: 'A', name: 'Ayouthveda', tags: ['new'] },
  // B
  { letter: 'B', name: 'Back Bencher', tags: ['new'] },
  // C
  { letter: 'C', file: 'Cup_Ji.png', name: 'Cup-Ji', tags: ['new'] },
  // D
  { letter: 'D', file: 'Deep_Roots.png', name: 'Deep Roots', tags: ['new'] },
  // E
  { letter: 'E', file: 'Eat_Anytime.png', name: 'Eat Anytime', tags: ['new'] },
  // F
  { letter: 'F', file: 'Fireside.png', name: 'Fireside', tags: ['new'] },
  { letter: 'F', file: 'Fuzo.png', name: 'Fuzo', tags: ['new'] },
  // G
  { letter: 'G', file: 'Garmin.png', name: 'Garmin', tags: ['top'] },
  { letter: 'G', file: 'Glasafe.avif', name: 'Glassafe', tags: ['new'] },
  { letter: 'G', name: 'Globin', tags: ['new'] },
  { letter: 'G', file: 'Goodwyn_Tea.jpeg', name: 'Goodwyn Tea', tags: ['new'] },
  { letter: 'G', file: 'Goodwysh.jpeg', name: 'Goodwish', tags: ['new'] },
  // J
  { letter: 'J', file: 'Jack_and_Jones.jpg', name: 'Jack & Jones', tags: ['new'] },
  { letter: 'J', file: 'Joyspoon.jpeg', name: 'Joyspoon', tags: ['new'] },
  // K
  { letter: 'K', name: 'Khadi Legacy', tags: ['new'] },
  // L
  { letter: 'L', name: 'Lapcare', tags: ['new'] },
  { letter: 'L', name: 'Lapis Bard', tags: ['new'] },
  { letter: 'L', name: 'Lattice Lane', tags: ['new'] },
  // M
  { letter: 'M', file: 'Mathey_Tissot.jpg', name: 'Mathey-Tissot', tags: ['new'] },
  { letter: 'M', name: 'Moosario', tags: ['new'] },
  { letter: 'M', file: 'Mont_Blanc.jpg', name: 'Mont Blanc', tags: ['top'] },
  { letter: 'M', file: 'Movado.webp', name: 'Movado', tags: ['new'] },
  // N
  { letter: 'N', file: 'Nasher_Miles.jpg', name: 'Nasher Miles', tags: ['new'] },
  { letter: 'N', file: 'Nedis.jpg', name: 'Nedis', tags: ['new'] },
  { letter: 'N', file: 'Nothing.png', name: 'Nothing', tags: ['new'] },
  { letter: 'N', file: 'Nuuk.jpeg', name: 'Nuuk', tags: ['new'] },
  // O
  { letter: 'O', name: 'Obligue', tags: ['new'] },
  // P
  { letter: 'P', file: 'Pebble.jpg', name: 'Pebble', tags: ['new'] },
  { letter: 'P', file: 'Portronics.png', name: 'Portronics', tags: ['popular'] },
  { letter: 'P', file: 'Puretive_Botanics.png', name: 'Puretive Botanics', tags: ['new'] },
  // R
  { letter: 'R', file: 'Rare_Rabbit.png', name: 'Rare Rabbit', tags: ['new'] },
  { letter: 'R', file: 'Rico_Home_Appliances.webp', name: 'Rico Home Appliances', tags: ['new'] },
  // S
  { letter: 'S', file: 'Samsung.jpeg', name: 'Samsung', tags: ['top'] },
  { letter: 'S', file: 'Scuderia_Ferrari.jpg', name: 'Scuderia Ferrari', tags: ['new'] },
  { letter: 'S', file: 'Sheaffer.webp', name: 'Sheaffer', tags: ['new'] },
  { letter: 'S', file: 'Snackible.png', name: 'Snackible', tags: ['new'] },
  { letter: 'S', file: 'Swiss_Cross.jpg', name: 'Swiss Military (Swiss Cross)', tags: ['top', 'new'] },
  // T
  { letter: 'T', name: 'Timalfi', tags: ['new'] },
  { letter: 'T', file: 'Toreto.png', name: 'Toreto', tags: ['new'] },
  // U
  { letter: 'U', file: 'Urban_Gear.png', name: 'Urban Gear', tags: ['new'] },
  // V
  { letter: 'V', file: 'Versalis.png', name: 'Versalis', tags: ['new'] },
  // W
  { letter: 'W', file: 'Waterman.png', name: 'Waterman Paris', tags: ['new'] },
  { letter: 'W', file: 'Weber.png', name: 'Weber', tags: ['new'] },
  // X
  { letter: 'X', file: 'Xech.png', name: 'Xech', tags: ['new'] },
];

export const BRANDS: Brand[] = BRAND_ENTRIES.map(({ letter, file, name, tags }) => ({
  name,
  image: file ? `${BASE}/${letter}/${file}` : '',
  letter,
  tags,
})).sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/** Letters that have at least one brand logo in brand_logos */
export function getLettersWithBrands(brands: Brand[] = BRANDS): Set<string> {
  return new Set(brands.map((b) => b.letter));
}
