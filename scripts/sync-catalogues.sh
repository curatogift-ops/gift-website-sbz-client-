#!/usr/bin/env bash
# Sync catalogue PDFs into public/catalogues with the rename map used by the Catalogue Library page.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${1:-$HOME/Downloads/drive-download-20260712T093520Z-2-001 2}"
DEST="$ROOT/public/catalogues"
mkdir -p "$DEST"

python3 - "$SRC" "$DEST" <<'PY'
import os, shutil, sys
src, dest = sys.argv[1], sys.argv[2]
MAP = {
  "Gift-set catalogue - May 2026.pdf ( Corporate ).pdf": "corporate-gift-catalogue.pdf",
  "BACKBENCHER SOFTWARE COLLECTION 2025-26.pdf": "urban-gear-collection.pdf",
  "EO Apr 2026 (2).pdf": "everyday-organisers.pdf",
  "Brillare science limited PDF.pdf (2).pdf": "brillare-wellness-collection.pdf",
  "CLASSIC SERIES PEN - 2026.pdf": "classic-pen-collection.pdf",
  "EXECUTIVE SERIES PEN - 2026.pdf": "executive-pen-collection.pdf",
  "ECO-FRIENDLY PEN - 2026.pdf": "eco-pen-collection.pdf",
  "METAL PENS CATALOGUE.pdf": "metal-pen-collection.pdf",
  "S Series CATALOG 24-25.pdf": "s-series-pen-collection.pdf",
  "Parker All in 1 - March 2026.pdf": "parker-collection.pdf",
  "Sheaffer 2026.pdf": "sheaffer-collection.pdf",
  "Sheaffer Giftsets.pdf": "sheaffer-gift-collection.pdf",
  "Iscape Notebook Catalogue - 2026 (1).pdf": "iscape-notebook-collection.pdf",
  "Sca Iscape Notebook catalouge.pdf": "corporate-notebook-collection.pdf",
  "iScape Note Book Catalogue - 2025 (1).pdf": "premium-notebook-collection.pdf",
  "ISCAPE SINGLE NOTEBOOK catalogue 2023-24.pdf": "single-notebook-collection.pdf",
  "KEYCHAIN CATALOGUE.pdf": "keychain-collection.pdf",
  "iScape Metal Mobile stand and calendars.pdf.pdf": "mobile-stands-calendars.pdf",
  "Pebble Feb26.pdf": "pebble-smart-devices.pdf",
  "lapcare catalouge sept 2024.pdf": "lapcare-collection.pdf",
  "soud crash catalouge.pdf": "sound-crush-audio.pdf",
  "Rico Jan .pdf": "rico-home-electronics.pdf",
  "GOBLIN - 2026.pdf": "goblin-luggage.pdf",
  "The House of Crea.pdf": "house-of-crea-collection.pdf",
  "MOOSARIO Catalog 2024.pdf": "moosario-backpacks.pdf",
  "LAPIS BARD.pdf": "lapis-bard-luxury-collection.pdf",
  "Highline All Shades.pdf": "highline-apparel-collection.pdf",
  "pexpo 2026.pdf": "pexpo-drinkware-collection.pdf",
  "Timalfi.pdf": "timalfi-lighting-collection.pdf",
  "Diwali Gift Set Catalogue - 2025.pdf": "festive-gift-collection.pdf",
  "Movenpac Bags.pptx": "movenpac-bags.pptx",
}
missing = []
for name, out in MAP.items():
    sp = os.path.join(src, name)
    if not os.path.isfile(sp):
        missing.append(name)
        continue
    shutil.copy2(sp, os.path.join(dest, out))
    print("OK", out)
print("Missing:", missing or "none")
PY
