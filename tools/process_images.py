"""Audit originals and generate responsive sizes + WebP into assets/img/."""
import os, json
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), "..")
SRC = os.path.join(ROOT, "assets", "originals")
OUT = os.path.join(ROOT, "assets", "img")
os.makedirs(OUT, exist_ok=True)

WIDTHS = [480, 800, 1024, 1600]
SKIP = {"Walking-Tour-Map.pdf"}
audit = []

for fn in sorted(os.listdir(SRC)):
    if fn in SKIP:
        continue
    path = os.path.join(SRC, fn)
    im = Image.open(path)
    w, h = im.size
    base, ext = os.path.splitext(fn)
    is_photo = ext.lower() in (".jpg", ".jpeg")
    entry = {"file": fn, "width": w, "height": h, "outputs": []}

    if not is_photo:
        # PNGs (logo, wing): keep as-is + a lossless webp
        im.save(os.path.join(OUT, base + ".webp"), "WEBP", lossless=True)
        entry["outputs"].append(base + ".webp")
        audit.append(entry)
        continue

    targets = [tw for tw in WIDTHS if tw <= w] or [w]  # never upscale; tiny images keep native size
    for tw in targets:
        r = im.convert("RGB") if im.mode != "RGB" else im
        scaled = r.resize((tw, round(h * tw / w)), Image.LANCZOS) if tw != w else r
        for fmt, e, kw in (("WEBP", ".webp", {"quality": 82, "method": 6}),
                           ("JPEG", ".jpg", {"quality": 82, "optimize": True, "progressive": True})):
            out_name = f"{base}-{tw}w{e}"
            scaled.save(os.path.join(OUT, out_name), fmt, **kw)
            entry["outputs"].append(out_name)
    audit.append(entry)

with open(os.path.join(ROOT, "assets", "image-audit.json"), "w") as f:
    json.dump(audit, f, indent=2)
for a in audit:
    print(f"{a['file']:45s} {a['width']}x{a['height']}  -> {len(a['outputs'])} outputs")
