"""Stamp the shared footer into every page and make sure assets/footer.css is linked.
Run after editing FOOTER below:  python tools/apply_footer.py
Idempotent — replaces whatever <footer ...>...</footer> each page already has."""
import re, os, glob

ROOT = os.path.join(os.path.dirname(__file__), "..")

FOOTER = '''<footer class="site">
  <div class="wrap">
    <div class="brand">
      <h4>Harmony Museum</h4>
      <p>Historic Harmony, Inc. — a volunteer-run 501(c)(3) organized in 1943, preserving nine properties of the Harmony Society and the Mennonites who followed.</p>
      <p>218 Mercer Street<br>Harmony, PA 16037</p>
    </div>
    <div>
      <span class="lbl">Get in touch</span>
      <ul class="contact">
        <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg><a href="tel:+17244527341">(724) 452-7341<small>Tuesday – Saturday, 1–4 p.m.</small></a></li>
        <li><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3 7 9 6 9-6"/></svg><a href="mailto:hmuseum@zoominternet.net">hmuseum@zoominternet.net<small>Replies within 3 business days</small></a></li>
        <li><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none"/></svg><a href="https://www.instagram.com/historicharmonymuseum/" rel="noopener">@historicharmonymuseum<small>Instagram</small></a></li>
      </ul>
    </div>
    <div>
      <span class="lbl">Hours</span>
      <p class="ft-days">Tuesday – Saturday, 1–4 p.m.</p>
      <p class="ft-note">Guided tours at 1:00 and 2:30.</p>
      <p style="opacity:.55">Closed Sunday and Monday.</p>
      <p style="margin-top:10px"><a href="visit.html">Plan a visit &rarr;</a></p>
    </div>
    <div>
      <span class="lbl">Explore</span>
      <ul class="links">
        <li><a href="visit.html">Plan a visit</a></li>
        <li><a href="walkingtour.html">Walking tour</a></li>
        <li><a href="properties.html">Properties</a></li>
        <li><a href="history.html">History</a></li>
        <li><a href="rental.html">Host an event</a></li>
        <li><a href="calendar.html">Calendar</a></li>
        <li><a href="news.html">News</a></li>
        <li><a href="membership.html">Membership</a></li>
        <li><a href="donate.html">Donate</a></li>
        <li><a href="get-involved.html">Volunteer</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
  </div>
  <div class="bottom">
    <span>&copy; 2026 Historic Harmony, Inc.</span>
    <span><a href="privacy.html">Privacy</a><span class="proto"> · Preview — not the live site</span></span>
  </div>
</footer>'''

LINK = '<link rel="stylesheet" href="assets/footer.css">'
n = 0
for path in glob.glob(os.path.join(ROOT, "*.html")):
    name = os.path.basename(path)
    if name in ("404.html", "walkingtour.html"):          # full-screen map / bare error page keep their own chrome
        continue
    s = open(path, encoding="utf-8").read()
    s2, k = re.subn(r"<footer\b[^>]*>.*?</footer>", FOOTER, s, count=1, flags=re.S)
    if not k:
        continue
    if LINK not in s2:
        s2 = s2.replace('<link rel="stylesheet" href="assets/fonts/fonts.css">',
                        '<link rel="stylesheet" href="assets/fonts/fonts.css">\n' + LINK, 1)
    if s2 != s:
        open(path, "w", encoding="utf-8", newline="\n").write(s2); n += 1
print(f"footer stamped into {n} pages")
