# Harmony Museum prototype — extraction report

**Status: all five build-order steps done.** Assets local; 28 stops extracted,
cross-checked and geocoded (10 exact / 18 approximate); Leaflet + OpenStreetMap tour
map live (`walkingtour.html`); content in data files with the dated-closures fix
implemented and demonstrable; booking and newsletter stubbed pending service signup.
Stack: zero-build static (see §2b).

## 0. Geocoding & map (steps 3–4)

Coordinate sources, best first — recorded per stop in `geo.source`:

- **osm-poi (8 stops):** OSM has these buildings as named POIs — Harmony Museum,
  Grace Church, Harmony Borough Office (217 Mercer), The Harmony Inn (230 Mercer),
  Historic Harmony Rope Maker Shop (251 Mercer), Historic Harmony Barn, Harmony
  Mennonite Meeting House, Rapp's Seat (a named viewpoint with its own trail).
- **nominatim-house (2 stops):** house-number geocodes for 546 Main and 222 Mercer.
- **interpolated (18 stops):** placed along real OSM street geometry at the block
  positions shown on the brochure map, `approximate: true` on every one. These are
  right-block, not right-parcel, until the museum supplies addresses.

Validation: the borough-office, rope-shop, barn, meetinghouse and Rapp's Seat POIs
all landed exactly where the brochure map puts those stop numbers, which also
confirms the brochure map is drawn north-up and roughly to grid.

**New data finding:** OSM labels the building at 222 Mercer St "United States Post
Office," while the museum says 222 Mercer is the Wagner-Bentel Haus and the brochure
says the post office is in the old public school (the Borough building, 217 Mercer).
Likeliest story: the post office moved after the brochure was printed — which would
also explain the website renaming stop 7 to "Harmony Borough Building." Ask the museum.

Map page: gold/sage markers per era (neutral ink for later/undetermined), dashed
ring on approximate stops, click-for-panel with photo (museum-owned stops), era,
description, name-variant notice on disputed stops, "open in your maps app" link,
locate-me, a list view, and automatic fallback to the list if tiles fail. Permalinks
use stop **numbers** (`#stop-13`) so disputed names never become URLs. Raw geocoding
responses are cached in `data/geo/` for reproducibility.

---

## 1. Asset pull — complete

All 16 assets in the brief's inventory downloaded to `assets/originals/` (manifest in
`assets/manifest.json`). The comp is rewritten to local paths as `index.html` — zero
remote wp-content references remain; it runs fully offline except Google Fonts, which
step 5 should self-host.

Responsive variants (480/800/1024/1600w, WebP + progressive JPEG at q82, never
upscaled) are in `assets/img/`, with dimensions logged in `assets/image-audit.json`.

### Images too small for the crops the design asks for

| File | Native size | Design usage | Verdict |
|---|---|---|---|
| `Properties-Harmonist-Cemetery.jpg` | **400×268** | 4:3 "door" card (~750 device px on retina) | **Too small.** Worst asset in the set. |
| `Stewart-Hall-from-stage.jpg` | **589×331** | 4:3 venue card | **Too small, and it's ~16:9** — the 4:3 crop chops both ends of the hall. |
| `Properties-Museum.jpg` | 1000×790 | **Full-bleed hero** | Marginal. Fine to ~1000px viewports; soft on desktop, bad on a large display. This is the single image most worth reshooting. |
| `Properties-Visitors-Cabin.jpg` | 995×662 | 2:1 wide tile | Marginal on retina. |
| `Properties-meeting-house-sm.jpg` | 950×713 | 2:1 wide tile | Marginal on retina. |
| `aa-logo.png` | 691×155 | Masthead logo | Adequate at 46px height, but it's an Elementor-generated thumb. The vector trace of the Sophia mark is still owed. |

Everything else is 1024px-class: fine at card sizes, not full-bleed — matching the
brief's own warning.

## 2. Walking tour extraction — complete

The PDF is a **scan with no text layer** (pypdf extracted 0 chars). The two page
images were pulled out of the PDF and transcribed visually — page 1 is the street map
with a 28-item legend, page 2 is "Site Historic Facts" with a description per stop.
Cross-checked against the live `/harmony-walking-tour/` page (fetched 2026-08-15;
saved at `data/walking-tour-page.html`), which lists all 28 in order, unnumbered, in
two columns of 14.

Output: **`data/walking-tour.json`** — per stop: number, working name, all three name
variants (PDF facts page, PDF map legend, website), era, in-town/outlying,
`needsConfirmation`, description (from the museum's own brochure text), and address
for the museum-owned anchors.

### Name conflicts — for the museum to decide, not us

No spelling was chosen anywhere. `name` carries the brochure facts-page label purely
as a working key; **stop URLs must not be minted until the museum rules.**

| # | PDF facts page | PDF map legend | Website |
|---|---|---|---|
| 2 | Langenbacher/Ziegler Haus | Langenbacher **or** Ziegler Haus | Langenbacher Haus *(drops Ziegler)* |
| 7 | Post Office (Harmony Public School) | same | **Harmony Borough Building** (Harmony Public School) |
| 13 | **Beahm** Hotel (Site of Harmonite Inn) | Beahm Hotel | **Beam** Hotel |
| 17 | **Bank of Harmony** | **Harmony National Bank** | Harmony National Bank |
| 23 | **Otto House** | **Mennonite Double House** | Mennonite Double House |

Note that on 17 and 23 **the brochure disagrees with itself** — the facts page and the
map legend use different names. Those two were not in the brief's predicted list.

### Predicted conflicts that did NOT materialize

- **"Harmonist Stohr" vs "Store":** both the PDF and the website say **Stohr**. The
  brochure's own text calls it "the 1807 Harmonist store" and then uses "The Stohr"
  as a noun, so it reads as a deliberate period spelling. Flagged for confirmation
  anyway.
- **"Shontz" vs "Stromtz":** all three sources say **Shontz**. "Stromtz" appears
  nowhere on the walking-tour page; where the brief saw it is unverified.

### Location-flag discrepancies

- **#14 Wagner-Bentel Haus:** the website's footnote marks it *outside downtown* —
  but it's at 222 Mercer St and the map places it in-town. Almost certainly a website
  error; worth telling the museum.
- **#26 Shontz School:** the map places it outside the town grid, but the website
  does *not* flag it as outlying. Following the map.

### Deviation from the requested schema

The prompt asked for era ∈ {harmonist, mennonite}. That enum can't honestly tag the
1856 Pearce Home, the ca. 1887 Opera House, the 1882 school building, or the ca. 1900
Shontz School — and "don't invent history" wins. The data uses
**harmonist | mennonite | later | undetermined** (19 Log House and 22 Franz Log House
are `undetermined` because the brochure itself says so / gives no era). The map
styling can render `later`/`undetermined` in a neutral ink tone alongside gold and sage.

### Geocoding anchors ready (step 3)

7 of the 28 stops are museum-owned with confirmed addresses from the brief:
1 (218 Mercer), 4 (546 Main), 14 (222 Mercer), 24 (303 Mercer Rd), 25 (114 Wise Rd),
27 (Evergreen Mill Rd), 28 (Rt 68 & Edmund). Two museum properties — Weavers Cabin
(245 Mercer) and the Washington 1753 Cabin (Main St) — are **not** walking-tour stops
but are more anchor points for the same blocks. The other 21 stops will be placed
from the PDF map's block positions relative to these anchors and every one flagged
`approximate: true`.

## 2b. Stack decision & the pieces nobody wants to maintain

**Stack: zero-build static.** Plain HTML + two data files, no framework, no npm, no
build step — there is nothing to update, patch, or renew, ever. Any static host
serves it. The board doesn't log into anything for day-to-day content; a volunteer
edits `data/site.js` (hours, closures, events) and `data/walking-tour.json` in plain
text. If the museum later wants an editing UI, a git-backed CMS (Pages CMS / Decap)
can be layered on top of the same files without changing the site.

**Hosting:** Cloudflare Pages or Netlify free tier, deploying from a GitHub repo.
$0/month, no server, no PHP versions, no plugin updates — the failure class that
killed the current site (dead Maps key, Elementor rot, staging URLs in nav) does not
exist here. The domain stays the museum's; only DNS points at the host.

**Booking — recommend FareHarbor, fallback Bookeo.**
- *FareHarbor:* $0/month to the museum; ~6% fee added to the guest (≈42¢ on a $7
  ticket); FareHarbor's own staff build the setup and answer the phone 24/7. For an
  all-volunteer org, "someone else's support desk" is the feature. Handles capacity
  12, two slots/day, Tue–Sat natively.
- *Bookeo:* ~$14.95/month flat, no per-ticket fee to guests. Cheaper for guests,
  but the museum owns the configuration and the credit-card account questions.
- Avoid: any WordPress booking plugin (maintenance), Eventbrite ($1.79+3.7% on a $7
  ticket is disproportionate).
- The booking page (`booking.html`) is a UI stub; at launch its Book buttons become
  deep links into the chosen service's hosted checkout.

**Newsletter — Kit,** per the brief: free to 10,000 subscribers, hosted signup form,
deliverability/unsubscribe/CAN-SPAM are their problem. The homepage form is stubbed;
at launch it becomes a plain HTML POST to Kit's form endpoint. Store nothing locally.

**How the calendar relates to tour availability (three layers of truth):**
1. *Pattern truth* — Tue–Sat, 1:00/2:30, dated closures — lives in `data/site.js`
   and drives the calendar grid, the booking page's schedule, and the banner.
2. *Seat truth* — how many of the 12 places remain — lives ONLY in the hosted
   booking service. The site never mirrors seat counts (a mirrored count is a lie
   the moment someone books by phone); clicking a tour day hands off to the
   service's checkout, which is where live availability appears.
3. *Occasional truth* — events and venue holds — one-line entries in `data/site.js`.

Double-entry note: a seasonal closure lives in two places — `data/site.js`
(banner + calendar) and the booking service's blackouts (stops actual bookings).
Plan of record: a small sync tool when the service is chosen — a scheduled GitHub
Action that reads `closures` from `data/site.js` and pushes blackout dates via the
booking service's API, so the data file stays the single thing a volunteer touches.
**This tilts the service choice:** Bookeo has an open, documented public API;
FareHarbor's API is partner/invite-only. If the sync tool matters, pick Bookeo
(~$15/mo); with FareHarbor the second entry stays manual (~2×/year in their
dashboard). Decide when booking goes live.

**Pricing — online must be the cheaper path.** Online keeps today's published
prices (adult $7, senior $6, child $3) with the booking fee absorbed; the door
goes up $1 (adult $8, senior $7, child $3.50). The guest saves a real dollar by
booking ahead, and the $1 door premium more than covers the ~42¢ absorbed fee.
⚠ Both sides of this are proposals in `data/site.js` pending museum sign-off —
the door increase especially is a board decision.

**Venue booking (`rental.html`):** enquiry-based by design — weddings need a human,
a contract, and the $350 deposit; instant online checkout is wrong for this. The
form posts to the host's built-in form handler (Netlify Forms or equivalent) which
emails the museum: no server, no plugin. Booked/held dates come from `venueHolds`
in `data/site.js` (a volunteer adds a line when a contract signs) and appear on both
the rental page and the shared calendar. ⚠ The published rate card is dated Oct 2020
— flagged as a TODO on the page rather than invented.

**Calendar/events — a data file, not a service.** The museum's actual volume (a
handful of events a year, two blog posts since 2025) doesn't justify calendar
infrastructure. `data/site.js` has an `events` array that renders on the booking
page; adding an event is one line of text. If they outgrow it, a public Google
Calendar embed is the zero-maintenance upgrade path.

**The dated-closures fix is live and demonstrable.** Closures are records with
start/end dates in `data/site.js`; the banner and the booking slots both derive from
them. The infamous "reopening March 3, 2026" banner is literally in the data — and
correctly does not render, because its window ended. Preview any date with
`?today=YYYY-MM-DD` (try `index.html?today=2026-12-25` — banner appears, hours line
flips to "closed today", booking slots vanish for the window).

### Audit addendum (user-observed, 2026-08-15)

13. Homepage "Learn more" button and the main slider are broken on the live site —
    consistent with the Elementor/staging rot in issues 2 and 6.

## 3. Still needs an answer from the museum

1. One authoritative spelling for stops 2, 7, 13, 17, 23 (and a nod on Stohr).
2. Wagner-Bentel outlying flag on the website — error?
3. Era/origin of the Log House (#19) and Franz Log House (#22).
4. Street addresses for the 21 privately-owned stops (geocodes will be approximate
   until then).
5. Brochure says tours "Tues–Sun"; website says Tue–Sat. Which is current? (Brochure
   assumed stale.)
6. A photo of the wine cellar, a real Stewart Hall photo, and a hero-grade museum
   exterior — the three images the design most needs and doesn't have.

## 4. Repo layout

```
index.html                 homepage — local assets, data-driven banner/hours, works offline
walkingtour.html           Leaflet + OSM tour map: 28 stops, panel, locate-me, list fallback
booking.html               booking UI stub — schedule generated from data/site.js closures
data/site.js               THE volunteer-edited file: hours, closures, admission, events
assets/site.js             shared page logic (banner windows, hours, newsletter stub)
assets/vendor/leaflet/     Leaflet 1.9.4, vendored — no CDN at runtime
data/geo/                  cached Nominatim/Overpass responses + computed intersections
data/walking-tour.js       file://-safe JS copy of walking-tour.json (regenerate on change)
assets/originals/          16 downloaded source files incl. Walking-Tour-Map.pdf
assets/img/                responsive WebP/JPEG variants
assets/pdf-pages/          the two PDF page scans (extraction source)
assets/image-audit.json    native dimensions + generated outputs
data/walking-tour.json     THE extracted dataset — review this
data/walking-tour-page.html live site snapshot used for the cross-check
docs/                      original brief, prompt, and untouched v5 comp
tools/                     fetch_assets.py, process_images.py, localize_comp.py
```
