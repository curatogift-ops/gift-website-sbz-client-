#!/usr/bin/env python3
"""Extract catalogue ZIP parts into public/catalogues before Vite build."""
from __future__ import annotations

import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BUNDLES = ROOT / "catalogue-bundles"
DEST = ROOT / "public" / "catalogues"


def main() -> int:
    DEST.mkdir(parents=True, exist_ok=True)
    zips = sorted(BUNDLES.glob("catalogues-part-*.zip"))
    if not zips:
        print("No catalogue-bundles/*.zip found — skipping extract (local PDFs may already exist).")
        return 0

    extracted = 0
    for zp in zips:
        with zipfile.ZipFile(zp) as zf:
            for info in zf.infolist():
                if info.is_dir():
                    continue
                name = Path(info.filename).name
                target = DEST / name
                with zf.open(info) as src, open(target, "wb") as out:
                    out.write(src.read())
                extracted += 1
                print(f"OK {name}")
        print(f"Extracted {zp.name}")

    print(f"Done — {extracted} catalogue files ready in public/catalogues")
    return 0


if __name__ == "__main__":
    sys.exit(main())
