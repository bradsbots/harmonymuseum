# Claude Code — Harmony Museum prototype

Paste everything below into Claude Code, with `harmony-museum-brief.md` and
`harmony-museum-v5-real-assets.html` in the working directory.

---

I'm prototyping a redesign of harmonymuseum.org — a small volunteer-run local
history museum in Harmony, PA. Two files in this directory:

- `harmony-museum-brief.md` — audit of the current site, corrected facts,
  asset inventory with live URLs, palette and type stack, priority order.
  Read it first. It's the source of truth for content.
- `harmony-museum-v5-real-assets.html` — a single-file design comp. Right
  direction, but it hotlinks the museum's images and the walking tour map is
  a hand-placed schematic with made-up coordinates.

**The problem I need solved:** I can't evaluate this design without the real
images sitting locally and the walking tour map actually working. Right now
it's a comp, not a prototype. Get it to where I can open it, click a stop, and
see whether the idea holds up.

## Build order

**1. Pull the assets down.**
Fetch every image listed in the brief's asset inventory plus
`/wp-content/uploads/2019/07/Walking-Tour-Map.pdf` into `assets/`. Rewrite the
comp to reference local paths. Generate responsive sizes and modern formats;
the originals are 2019-era JPEGs, mostly 1024px. Note in a report which ones
are too small to survive the crops the design asks for.

**2. Extract the walking tour map.**
The PDF is the printed brochure — 28 numbered stops on a schematic street map.
Extract the stop numbers and names from it. Cross-check against the list on
`/harmony-walking-tour/` (in the brief). They disagree on at least four names:
Langenbacher, Beam/Beahm, Shontz/Stromtz, and "Harmonist Stohr" which is
probably "Store." Produce `data/walking-tour.json` with, per stop: number,
name, both name variants where they differ, era tag (harmonist | mennonite),
whether it's in-town or outlying, and a `needsConfirmation` flag on any
disputed name. Do not silently pick a spelling — surface the conflicts as a
list I can take to the museum.

**3. Geocode the stops.**
Real lat/lng, not my schematic. Harmony PA is tiny — Mercer, Main, Wood,
German, Spring, Edmond streets, plus outlying stops on Wise Rd, Evergreen Mill
Rd, and Rt 68. The brief has confirmed addresses for the nine museum-owned
properties; those are your anchors. For the privately-owned buildings, work
from the PDF's block positions relative to the anchors and flag every one as
approximate. Accuracy matters here — the whole point is standing on the
sidewalk with a phone.

**4. Make the map real.**
Replace the hand-drawn SVG with Leaflet + OpenStreetMap tiles. No API key, no
billing account — this has to keep working after I stop volunteering. Styled
to the brief's palette: gold markers for Harmonist-era stops, sage for
Mennonite-era. Click a marker, get a panel with the stop's photo, name, era,
and description. Must work on a phone, must handle "locate me," must degrade
to a plain list if tiles fail to load.

**5. Wire the shell.**
Split the single HTML file into something maintainable — your call on stack,
but bias toward static output and minimal dependencies. It's going to be
handed to a volunteer eventually. Content (hours, closures, tours, events,
properties, venues, stops) lives in data files, not markup.

Implement dated closures properly: closures are records with start/end dates,
and the banner renders only inside its window. The current site has had a
"reopening March 3, 2026" notice up since at least August. That bug is the
single most visible failure on the live site and I want the fix demonstrated.

## Constraints

- Palette and type stack from the brief. Don't redesign it.
- The logo is the Virgin Sophia, the Harmony Society's emblem — not an angel,
  and it stays. Trace the existing PNG to vector if you clean it up. Don't
  redraw from imagination.
- Real alt text on every image. The live site has auto-generated garbage like
  "A black and purple background with two large eyes" on its own logo.
- Booking, payments and newsletter are stubs at this stage — UI only, no
  integrations. The brief explains why (hosted services, volunteer staffing).
- Don't invent history. If a fact isn't in the brief or on their site, leave a
  `TODO` rather than filling it in.

## Deliverables

- A prototype I can run locally and open on my phone over LAN.
- `data/` with the extracted, structured content.
- `REPORT.md`: what you extracted, the name conflicts you found, which
  geocodes are approximate, which images are too low-res, and what still
  needs an answer from the museum.

Start with steps 1 and 2 and show me the extracted stop data before building
the map — if the PDF extraction is bad, everything downstream is wrong.
