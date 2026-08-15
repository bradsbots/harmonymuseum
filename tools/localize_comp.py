"""Validate walking-tour.json and rewrite the design comp to local asset paths."""
import json, re, os

ROOT = os.path.join(os.path.dirname(__file__), "..")
d = json.load(open(os.path.join(ROOT, "data", "walking-tour.json"), encoding="utf-8"))
stops = d["stops"]
assert [s["number"] for s in stops] == list(range(1, 29)), "stop numbering broken"
print("28 stops OK;",
      sum(1 for s in stops if s["needsConfirmation"]), "flagged needsConfirmation;",
      sum(1 for s in stops if not s["inTown"]), "outlying;",
      len(d["conflicts"]), "conflicts listed")

html = open(os.path.join(ROOT, "docs", "harmony-museum-v5-real-assets.html"), encoding="utf-8").read()

def local(m):
    name = m.group(1).rsplit("/", 1)[-1]
    if name.startswith("aa-logo"):
        name = "aa-logo.png"
    return "assets/originals/" + name

out = re.sub(r'https://harmonymuseum\.org(/wp-content/[^"]+)', local, html)
out = out.replace("All photography loaded live from harmonymuseum.org",
                  "All photography served locally from assets/originals (downloaded from harmonymuseum.org)")
open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8").write(out)
print("remote wp-content refs remaining:", len(re.findall(r"harmonymuseum\.org/wp-content", out)))
missing = [p for p in set(re.findall(r'assets/originals/[^"]+', out))
           if not os.path.exists(os.path.join(ROOT, p.replace("/", os.sep)))]
print("missing local files:", missing or "none")
