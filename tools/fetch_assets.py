"""Download every asset listed in the brief into assets/originals/."""
import urllib.request, os, json

BASE = "https://harmonymuseum.org"
UP = "/wp-content/uploads/2019/07/"
ASSETS = [
    "/wp-content/uploads/elementor/thumbs/aa-logo-rnh9jp9ohjy8zdlqj8c9s6ls4qmi5vo9uf3sozxnm6.png",
    UP + "wing2-separator.png",
    UP + "Properties-Museum.jpg",
    UP + "Properties-Wagner-1024x768.jpg",
    UP + "Properties-Zeigler-Log-Cabin-1024x768.jpg",
    UP + "Properties-Weavers-Cabin-1024x768.jpg",
    UP + "Properties-Harmonist-Barn-1024x682.jpg",
    UP + "Properties-meeting-house-sm.jpg",
    UP + "Properties-Rapps-Seat-1024x768.jpg",
    UP + "Properties-Harmonist-Cemetery.jpg",
    UP + "Properties-Visitors-Cabin.jpg",
    UP + "Stewart-Hall-from-stage.jpg",
    UP + "barn-8-1024x775.jpg",
    UP + "Meetinghouse-Pulpit-1024x768.jpg",
    UP + "insideBanner.jpg",
    UP + "Walking-Tour-Map.pdf",
]

OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "originals")
os.makedirs(OUT, exist_ok=True)
results = []
for path in ASSETS:
    name = path.rsplit("/", 1)[-1]
    if name.startswith("aa-logo-"):
        name = "aa-logo.png"
    dest = os.path.join(OUT, name)
    try:
        req = urllib.request.Request(BASE + path, headers={"User-Agent": "Mozilla/5.0 (asset-fetch for redesign prototype)"})
        with urllib.request.urlopen(req, timeout=30) as r, open(dest, "wb") as f:
            f.write(r.read())
        results.append({"file": name, "bytes": os.path.getsize(dest), "url": BASE + path, "ok": True})
    except Exception as e:
        results.append({"file": name, "url": BASE + path, "ok": False, "error": str(e)})

for r in results:
    print(("OK  " if r["ok"] else "FAIL") + f"  {r['file']}" + (f"  {r['bytes']:>9,} B" if r.get("bytes") else f"  {r.get('error','')}"))
with open(os.path.join(OUT, "..", "manifest.json"), "w") as f:
    json.dump(results, f, indent=2)
