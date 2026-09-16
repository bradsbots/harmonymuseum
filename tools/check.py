"""Site checks — the ways this site actually breaks. Runs in seconds, no browser.

    python tools/check.py              # everything except the slow external-link check
    python tools/check.py --external   # also follow every outside link (hijack/dead detection)

Exit code 1 if anything fails. Runs in GitHub Actions on every push (.github/workflows/check.yml).
"""
import glob, json, os, re, subprocess, sys, datetime, urllib.request

if hasattr(sys.stdout, "reconfigure"): sys.stdout.reconfigure(encoding="utf-8")   # Windows console
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
os.chdir(ROOT)
PAGES = sorted(f for f in glob.glob("*.html") if f != "booking.html")   # booking.html is a redirect stub
CHROME_ONLY = {"walkingtour.html", "404.html"}                          # own chrome: no site footer/nav
fails, warns = [], []
def fail(msg): fails.append(msg)
def warn(msg): warns.append(msg)
def read(f): return open(f, encoding="utf-8").read()

# ── 1. data/site.js must evaluate, and its dates must make sense ──────────────────
site = None
try:
    out = subprocess.run(["node", "-e", "const w={};global.window=w;require('./data/site.js');process.stdout.write(JSON.stringify(w.SITE))"],
                         capture_output=True, text=True, timeout=20)
    if out.returncode != 0:
        fail("data/site.js does not parse — every page's hours/prices/closures would vanish:\n    " + out.stderr.strip().splitlines()[-1])
    else:
        site = json.loads(out.stdout)
except FileNotFoundError:
    warn("node not installed — skipped the data/site.js syntax check (install Node to enable)")

def isdate(s):
    try: datetime.date.fromisoformat(s); return True
    except Exception: return False

if site:
    for k in ("hours", "closures", "admission", "contact", "venues", "events"):
        if k not in site: fail(f"data/site.js is missing `{k}`")
    for c in site.get("closures", []):
        if not (isdate(c.get("start", "")) and isdate(c.get("end", ""))): fail(f"closure has a bad date: {c}")
        elif c["start"] > c["end"]: fail(f"closure ends before it starts: {c}")
    for e in site.get("events", []):
        if not isdate(e.get("date", "")): fail(f"event has a bad date: {e}")
        if e.get("link") and e["link"].split("#")[0] and not os.path.exists(e["link"].split("#")[0]): fail(f"event links to a missing page: {e['link']}")
    for h in site.get("venueHolds", []):
        if not isdate(h.get("date", "")): fail(f"venue hold has a bad date: {h}")
        if h.get("venue") not in {v["key"] for v in site.get("venues", [])}: fail(f"venue hold names an unknown venue: {h}")
    for v in site.get("venues", []):
        for k in ("key", "name", "cap", "fee", "deposit"):
            if not v.get(k): fail(f"venue `{v.get('key','?')}` is missing `{k}`")
    if site.get("hours", {}).get("closedDays") and not all(0 <= d <= 6 for d in site["hours"]["closedDays"]): fail("hours.closedDays must be 0–6")
    if not site.get("hours", {}).get("tourTimes"): fail("hours.tourTimes is empty")

# ── 2. walking-tour.js must be the generated copy of walking-tour.json ─────────────
try:
    j = json.load(open("data/walking-tour.json", encoding="utf-8"))
    js = read("data/walking-tour.js")
    if json.loads(js.split("=", 1)[1].rstrip().rstrip(";")) != j:
        fail("data/walking-tour.js is out of date — regenerate it from walking-tour.json (see CLAUDE.md)")
    if len(j["stops"]) != 28: fail(f"walking tour has {len(j['stops'])} stops, expected 28")
except Exception as e:
    fail(f"walking-tour data unreadable: {e}")

# ── 3. every internal link, image and anchor resolves ─────────────────────────────
ids = {f: set(re.findall(r'\bid="([^"]+)"', read(f))) for f in PAGES + ["booking.html"]}
for f in PAGES:
    s = read(f)
    for m in re.finditer(r'(?:href|src)="([^"]+)"', s):
        u = m.group(1)
        if re.match(r'^(https?:|mailto:|tel:|geo:|//|#|data:)', u) or "' +" in u or u == "": continue
        path, _, frag = u.partition("#")
        path = path.split("?")[0]
        if path and not os.path.exists(path): fail(f"{f}: link to missing file `{u}`")
        elif frag and path in ids and frag not in ids[path] and not re.match(r"stop-\d+$", frag): fail(f"{f}: anchor `#{frag}` does not exist in {path}")
    for m in re.finditer(r'href="#([^"]+)"', s):
        if m.group(1) not in ids[f] and not re.match(r"stop-\d+$", m.group(1)): fail(f"{f}: anchor `#{m.group(1)}` does not exist on the page")

# ── 4. house rules ────────────────────────────────────────────────────────────────
BRITISH = re.compile(r"\b(enquir\w*|cheque\w*|for hire|hire the|by post|in the post|programme|colour|organis\w+|centre|favourite|whilst)\b", re.I)
# Only phrases that promise an online transaction — "tickets" on its own is fine (events have tickets)
BOOKING = re.compile(r"\b(book (a |the |your )?tour|book now|book online|book ahead|reserve online|buy tickets( online)?|tickets online|online (booking|reservations?|checkout))\b", re.I)
for f in PAGES:
    s = read(f)
    text = re.sub(r"<script.*?</script>|<style.*?</style>|<!--.*?-->", " ", s, flags=re.S)   # visible copy only
    for m in BRITISH.finditer(text): fail(f"{f}: British spelling in visible text: “{m.group(0)}” — use American English")
    for m in BOOKING.finditer(text): fail(f"{f}: “{m.group(0)}” — no book/tickets wording while reservations are by phone")
    if "harmonybusinessassociation" in s and 'href="https://harmonybusinessassociation' in s: fail(f"{f}: links to harmonybusinessassociation.com (hijacked domain)")
    if re.search(r"\bChristina\b", text): fail(f"{f}: names a docent on the site — the museum asked us not to")
    body = s.split("<body", 1)[-1]
    if re.search(r"#[0-9A-Fa-f]{6}\b", re.sub(r"<script.*?</script>", "", s, flags=re.S)) and f != "walkingtour.html":
        fail(f"{f}: hex color literal outside assets/tokens.css")
    if '<link rel="stylesheet" href="assets/tokens.css">' not in s: fail(f"{f}: does not load assets/tokens.css")
    if f not in CHROME_ONLY:
        if '<footer class="site">' not in s: fail(f"{f}: missing the shared footer (run tools/apply_footer.py)")
        if 'href="assets/footer.css"' not in s: fail(f"{f}: does not load assets/footer.css")
    if "fonts.googleapis.com" in s: fail(f"{f}: loads Google Fonts at runtime — fonts are self-hosted in assets/fonts")
    if re.search(r"font-family:\"Bodoni Moda\"[^;{}]*(?![^;{}]*opsz)", s) and "opsz" not in s: warn(f"{f}: Bodoni Moda used without an opsz setting")
    if "<title>" not in s or "<title></title>" in s: fail(f"{f}: no <title>")
    if not re.search(r'<meta name="viewport"', s): fail(f"{f}: no viewport meta")

# footer must be identical on every page that has it
footers = {f: re.search(r"<footer class=\"site\">.*?</footer>", read(f), re.S).group(0) for f in PAGES if f not in CHROME_ONLY and '<footer class="site">' in read(f)}
if len(set(footers.values())) > 1:
    fail("footers differ between pages — edit tools/apply_footer.py and run it, never a single page: " +
         ", ".join(f for f, v in footers.items() if v != max(set(footers.values()), key=list(footers.values()).count)))

# ── 5. images referenced exist and aren't absurdly large ──────────────────────────
for f in PAGES:
    for m in re.finditer(r'src="(assets/[^"]+\.(?:jpg|jpeg|png|webp))"', read(f)):
        p = m.group(1)
        if os.path.exists(p) and os.path.getsize(p) > 900_000: warn(f"{f}: {p} is {os.path.getsize(p)//1024} KB — resize before shipping")

# ── 6. optional: outside links (slow) ──────────────────────────────────────────────
if "--external" in sys.argv:
    seen = set()
    for f in PAGES:
        for u in re.findall(r'href="(https?://[^"]+)"', read(f)):
            if u in seen: continue
            seen.add(u)
            host = re.sub(r"^https?://(www\.)?", "", u).split("/")[0]
            try:
                req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0"})
                r = urllib.request.urlopen(req, timeout=15)
                final = re.sub(r"^https?://(www\.)?", "", r.geturl()).split("/")[0]
                if final != host and not final.endswith(host): warn(f"{f}: {u} now redirects to {final} — check it is still the right site")
                page = r.read(200_000).decode("utf-8", "ignore").lower()
                if re.search(r"\b(gacor|slot online|judi|togel|casino)\b", page): fail(f"{f}: {u} serves gambling spam — remove the link")
            except Exception as e:
                code = getattr(e, "code", None)
                if code in (403, 406, 429, 503): warn(f"{f}: {u} blocked the automated check ({code}) — probably fine for humans")
                else: fail(f"{f}: {u} unreachable ({e})")

# ── report ────────────────────────────────────────────────────────────────────────
for w in warns: print("  warn  " + w)
for x in fails: print("  FAIL  " + x)
print(f"\n{len(PAGES)} pages · {len(fails)} failures · {len(warns)} warnings")
sys.exit(1 if fails else 0)
