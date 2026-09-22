# harmonymuseum.org — working notes for Claude Code

This is the website of the Harmony Museum (Historic Harmony, Inc., Harmony, PA).
Plain HTML/CSS/JS, no build step, no framework. **Pushing to `main` deploys the
preview at bradsbots.github.io/harmonymuseum within about a minute.** There is no
staging: what you push is what visitors see (once the domain is switched over).

## Where things live

| You want to change… | Edit this | Notes |
|---|---|---|
| Hours, tour times, closures, admission prices | `data/site.js` | **The volunteer file.** Most day-to-day edits are here and nowhere else. |
| Events (calendar + news "This season") | `data/site.js` → `events[]` | One line per event. Dates are `YYYY-MM-DD`. |
| Rental fees, venue capacities, booked dates | `data/site.js` → `venues[]`, `venueHolds[]` | |
| The Instagram post on the homepage | `data/site.js` → `featured[]` | Paste a new post URL; the embed loads on click. |
| Membership/donate checkout links (Zeffy) | `data/site.js` → `giving` | Empty = pages say "call or mail a check". |
| Walking-tour stop names/descriptions | `data/walking-tour.json`, then regenerate `data/walking-tour.js` (see below) | |
| A page's words | the `.html` file | Pages are self-contained; shared bits are in `assets/`. |
| Footer (all pages at once) | `tools/apply_footer.py` → then run it | Never edit the footer in individual pages. |
| Colors | `assets/tokens.css` | The only place a color may be defined. |
| Text a news post | `news.html` | Add an `<article class="post">`; dated events also go in `data/site.js`. |

Regenerate the JS copy of the walking-tour data after editing the JSON:

```
python3 -c "import json;d=json.load(open('data/walking-tour.json',encoding='utf-8'));open('data/walking-tour.js','w',encoding='utf-8').write('window.WALKING_TOUR = '+json.dumps(d,ensure_ascii=False,indent=1)+';\n')"
```

## Launch switches in `data/site.js`

- `prototype: true` — preview mode: shows "Preview — not the live site" notes and tells
  search engines not to index. **Set to `false` on launch day.** `?live=1` on any URL previews the launched look.
- `booking.mode: "phone"` — tours are reserved by phone. Leave it. (`"online"` is a phase-2 decision.)
- `shop.mode: "off"` — shop page is a "where and when" page, not a catalog. Phase 2.
- `newsletter.publicSignup: false` — newsletter is a members' perk by mail. Leave it.

## House rules (decided with the museum — do not undo)

1. **Never invent museum facts.** Prices, hours, dates, names, fees, credentials come
   from the museum. If something is unknown, leave a `TODO` comment or ask; don't guess.
2. **American English.** request (not enquiry), check (not cheque), rent (not hire), mail (not post).
3. **Don't promise online booking** while reservations are phone-only — no "book now",
   "book online", "buy tickets online", "reserve online". Say "Plan a visit", "call to
   reserve", "just turn up". The word "tickets" by itself is fine (events have tickets).
4. **The buildings are seen by guided tour only** (1:00 and 2:30, Tue–Sat); outdoors is
   open any time. Say both halves together wherever hours appear.
5. **One solid red button per block**, ghost buttons for secondary links, small-caps text
   links inside cards. Icons always paired with text (never an icon alone).
6. **Type:** Bodoni Moda for headings (`font-variation-settings:"opsz" 20`; `"opsz" 12`
   at 24px and under — the hairlines vanish otherwise), Newsreader for body, Archivo
   Narrow caps for labels. Don't add fonts.
7. **Colors only from `assets/tokens.css`.** No hex literals in pages.
8. Uppercase labels must fit on one or two lines at phone width — shorten the words, don't shrink the type.
9. Don't name individual volunteers or docents on the site without the museum's say-so.
10. Katina Koontz's credentials ("B.A., M.A.") stay on the About page — they matter for
    the historical-society designation.
11. Don't link to `harmonybusinessassociation.com` — the domain was hijacked (gambling
    redirect, Sept 2026). Plain text until they have a working site.

## Checking your work

```
python3 tools/check.py            # ALWAYS run before pushing (`python` on Windows) — takes a few seconds
python3 -m http.server 8765       # then open http://127.0.0.1:8765/
```

`tools/check.py` catches the things that actually break this site: a typo in
`data/site.js` (which would blank every page's hours), links to renamed pages, the
house rules below, footers edited by hand, hex colors outside tokens.css. It also runs
on GitHub after every push — a red ✗ on the commit means something's wrong; run it
locally to see what. `--external` additionally follows every outside link (slow; runs
weekly on GitHub by itself).

Look at the page at phone width too (narrow the window to ~400px). Before pushing,
make sure nothing scrolls sideways and no heading runs past three lines on a phone.

## Deploying

```
git add -A
git commit -m "What you changed, in one line"
git push
```

That's it — GitHub Pages rebuilds in about a minute. If you break something, `git revert HEAD` and push again.

## What's still owed by the museum

See `REPORT.md` ("Still open") — Zeffy account, Katina's degree subjects, March reopening
date, people per tour, a few photos, and the domain/Bluehost logins for switch-over day.
