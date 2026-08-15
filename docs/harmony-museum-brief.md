# Harmony Museum — redesign brief

Everything below was pulled from the live site on 15 Aug 2026. Verify anything
marked ⚠ with the museum before it ships.

---

## 1. Audit of the current site

Platform: WordPress + Elementor + WooCommerce 11.0.1, on Bluehost.
Built by Identitate Brand (identitatebrand.ro).

### Broken

| # | Issue | Where |
|---|---|---|
| 1 | Properties map dead — renders "No Records Found" and "Sorry, unable to load Google Maps API." A custom-post-type + map plugin has lost its data or its API key. | `/museum-properties/` |
| 2 | Staging host leaking into live nav | History menu link, Harmonist Cemetery property link, and a `pin.png` all point at `ayg.gen.mybluehost.me/website_94c3bb04/...` |
| 3 | Stale seasonal banner: "will reopen March 3, 2026" — still showing in August | Sitewide header |
| 4 | Hours block renders twice with contradictory copy (one says reopening March 3, one says "March – date TBD") | Homepage |
| 5 | Christmas/New Year closure list showing year-round | Homepage + every footer |
| 6 | Empty widgets render as bare headings on every page: "Area Memories", "Upcoming Events" | Sitewide |
| 7 | Two URLs for one venue: `/mennonite-meeting-house` and `/mennonite-meetinghouse/`, both linked from the rentals page | `/facility-rentals/` |
| 8 | Directory-theme leftovers in footer: "Change Location", "Find awesome listings near you!" | Sitewide |
| 9 | Same banner image (`insideBanner.jpg`, a cemetery) used as page header on every interior page — including facility rentals, where they're selling weddings | Sitewide |
| 10 | Auto-generated alt text, inaccurate: logo is "A black and white image of an angel"; wing graphic is "A black and purple background with two large eyes" | Sitewide |
| 11 | Blog archive has two entries a year apart (July 2025, June 2026) | `/news/` |
| 12 | WooCommerce installed and versioned, but no evident storefront | Sitewide |

### Missing

- **No online tour booking.** Phone only.
- **No online event registration.** "Call the Museum to register."
- **No rental enquiry form.** Pages claim a per-venue availability calendar; verify it renders. ⚠
- Membership and Donate pages exist but aren't surfaced in primary nav.
- Newsletter is listed as a member benefit; no public signup anywhere.

---

## 2. Corrected facts

Earlier drafts of the mockups had these wrong. These are from the museum's
own pages:

- **9 properties** owned by Historic Harmony, Inc.
- **Museum building:** 1809, brick, originally the Harmony Society warehouse.
  Has a preserved wine cellar. 218 Mercer St.
- **Stewart Hall:** main floor 30×46 ft + raised area 22×15 ft. **120** dining.
  Stage/bar/dancing, 2 accessible restrooms, full kitchen.
- **Wine cellar:** 42×18 ft, accessed *via* Stewart Hall, **not included** in
  Stewart Hall rental — additional charge. Underused selling point.
- **1805 Harmonist Barn:** 42×64 ft. ~**260** auditorium, ~**200** seated at
  tables across four bays. One of the oldest west of the Alleghenies.
  This is their *largest* room.
- **1825 Mennonite Church:** main room 30×28 ft + 11×16 annex.
  **130–150** on original bleacher-style benches. National Register.
- **Walking tour:** full loop ~2 hours, ~3 miles. In-town portion ~20 minutes,
  ~¼ mile flat. 28 numbered stops.
- **Admission:** under 5 free / 6–17 $3 / 18–59 $7 / 60+ $6.
- **Hours:** Tue–Sat 1–4 p.m. Guided tours only, 1:00 and 2:30.
- **Rental deposit:** $350, refundable. Rates effective Oct 2020 — ⚠ likely stale.
- **Location:** I-79 exits 87–88, ~30 mi north of Pittsburgh.

⚠ Walking tour stop names differ between the printed brochure and the website
(`Langenbacher Haus` vs `Langenbacher or Ziegler Haus`; `Beam` vs `Beahm`;
`Shontz` vs `Stromtz`; `Harmonist Stohr` is probably `Store`). Get one
authoritative list from the museum.

---

## 3. Existing assets

All live on harmonymuseum.org. Mostly uploaded 2019, max 1024px wide —
fine at card sizes, not full-bleed on a large display.

### Brand
```
/wp-content/uploads/elementor/thumbs/aa-logo-rnh9jp9ohjy8zdlqj8c9s6ls4qmi5vo9uf3sozxnm6.png
/wp-content/uploads/2019/07/wing2-separator.png
```
The mark is the **Virgin Sophia**, the Harmony Society's emblem — divine
wisdom in female form, from Jacob Böhme. Not an angel. Keep it. It needs a
clean vector redraw; do not redraw it from imagination, trace the original.

### Photography (prefix `https://harmonymuseum.org/wp-content/uploads/2019/07/`)
```
Properties-Museum.jpg                     1809 warehouse / main museum
Properties-Wagner-1024x768.jpg            Wagner/Bentel Haus, 222 Mercer
Properties-Zeigler-Log-Cabin-1024x768.jpg Ziegler Log House, 546 Main
Properties-Weavers-Cabin-1024x768.jpg     Weavers Cabin, 245 Mercer
Properties-Harmonist-Barn-1024x682.jpg    Harmonist/Ziegler Barn, 303 Mercer Rd
Properties-meeting-house-sm.jpg           1825 Mennonite Meetinghouse, 114 Wise Rd
Properties-Rapps-Seat-1024x768.jpg        Rapp's Seat, Evergreen Mill Rd
Properties-Harmonist-Cemetery.jpg         Harmonist Cemetery, Rt 68 & Edmund
Properties-Visitors-Cabin.jpg             Washington 1753 Cabin, Main St
Stewart-Hall-from-stage.jpg               Stewart Hall interior
barn-8-1024x775.jpg                       1805 Barn exterior
Meetinghouse-Pulpit-1024x768.jpg          Meetinghouse interior
insideBanner.jpg                          2100×400 cemetery banner (retire)
```

**Gaps:** no photo of the wine cellar, no people in any shot, no interior of
the museum proper, nothing seasonal, nothing of an event in progress.
A half-day shoot fixes all of it and is worth more than any layout decision.

### Existing PDF
`/wp-content/uploads/2019/07/Walking-Tour-Map.pdf` — the printed brochure.
Source of the 28 stops.

---

## 4. What to build

Design direction is set — see `harmony-museum-v5-real-assets.html`.

Palette:
```
--ink        #141A24
--indigo     #1F2E48
--indigo-deep#182338
--paper      #E9E3D4
--white      #F6F3EA
--madder     #8C3A2E   Harmonist red
--gold       #B08D52   the Society's golden rose
--sage       #6C7A5C
```
Type: Bodoni Moda (display) / Newsreader (body) / Archivo Narrow (labels).

### Priority order

1. **Live hours + dated closures.** Closures become data rows with start/end
   dates. Banner renders only inside its window. This alone fixes the site's
   worst recurring failure.
2. **Tour booking.** Capacity 12 per tour, two slots daily, Tue–Sat.
   Recommend a hosted service over a plugin — a volunteer staff can't maintain
   a payment integration. Evaluate Bookeo / Checkfront / FareHarbor.
3. **Interactive walking tour map.** 28 stops, geocoded, phone-first. The
   existing broken properties map gets replaced by the same component.
   Each stop needs a permanent URL, a photo, and 2–3 sentences.
4. **Rental enquiry + availability.** Highest-revenue path on the site.
   Lead with the Barn (largest), and surface the wine cellar.
5. **Newsletter capture.** Use **Kit** — free to 10,000 subscribers, unlimited
   broadcasts. Their branding on emails is the only real cost, and it's
   invisible to a monthly museum letter. Do not self-host: deliverability,
   bounce handling, unsubscribe compliance, and CAN-SPAM are the actual work,
   and they outlive your involvement. Form posts to Kit; store nothing locally.
6. **Artifact of the Month.** They already have the format and it's dormant.
   One object, one photo, one story, permanent URL. It's the only content a
   volunteer can produce monthly without a meeting.

### Constraints

- Whoever maintains this is a volunteer, not a developer. Every recurring
  content type needs an editing path that doesn't involve code.
- If it stays on WordPress, the Elementor dependency is the real problem —
  it's why the current site has duplicated blocks and orphaned widgets.
- Accessibility: real alt text on everything, visible focus states, and don't
  ship the auto-generated descriptions.

### Don't

- Don't redraw the Sophia mark from scratch. Trace the existing one.
- Don't lean on the Harmony Line railway — it's museum content, not part of
  the walking tour, and it crowded out better material in an earlier pass.
- Don't use the cemetery banner on the rentals pages.
