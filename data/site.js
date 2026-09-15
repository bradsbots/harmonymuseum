/* Site content — the file a volunteer edits. No code below this folder needs touching.
   Dates are YYYY-MM-DD. A closure banner shows ONLY between start and end, inclusive. */
window.SITE = {
  /* true while this is a preview: shows the "concept" footer and prototype notes.
     Set to false on launch day — nothing else needs to change. */
  prototype: true,

  /* How tours are reserved. "phone": every Book button becomes a call link.
     "online": buttons open the hosted booking service at onlineUrl (FareHarbor/Bookeo). */
  booking: {
    mode: "phone",
    onlineUrl: ""
  },

  hours: {
    hoursShort: "1–4 p.m.",
    days: "Tuesday – Saturday",
    tourTimes: ["1:00", "2:30"],
    closedDays: [0, 1],            /* 0=Sunday, 1=Monday */
    note: "Guided tours only, at 1:00 and 2:30.",
    capacityPerTour: 12
  },

  /* Closures are dated records. The old site's bug — a "reopening March 3, 2026"
     banner still up in August — cannot happen here: the first record below IS that
     banner, and it stopped rendering on March 3 with no one lifting a finger.
     Test any date with ?today=YYYY-MM-DD in the URL. */
  closures: [
    {
      start: "2025-11-20", end: "2026-03-02",
      message: "The museum is closed for the season — reopening March 3, 2026. Walking tour and grounds remain open."
    },
    {
      start: "2026-12-24", end: "2027-01-01",
      message: "Closed December 24 – January 1 for the holidays. See you in the new year."
    }
  ],

  /* Door prices. ⚠ The board approved an increase on 2026-09-15 but the amounts are
     not confirmed yet — these are the CURRENT published prices until they are. */
  admission: [
    ["Ages 5 and under", "Free"],
    ["Ages 6–17", "$3"],
    ["Ages 18–59", "$7"],
    ["Ages 60 and up", "$6"],
    ["Members", "Free"]
  ],

  contact: {
    address: "218 Mercer Street, Harmony, PA 16037",
    phone: "(724) 452-7341",
    phoneHref: "tel:+17244527341",
    email: "hmuseum@zoominternet.net",
    directions: "I-79 exits 87–88 · 30 miles north of Pittsburgh"
  },

  /* Online prices — only shown when booking.mode is "online". Proposal: keep these
     LOWER than the door so booking ahead is the better deal. ⚠ pending museum sign-off. */
  onlinePricing: [
    ["Adults (18–59)", "$7"],
    ["Seniors (60+)", "$6"],
    ["Ages 6–17", "$3"],
    ["5 and under", "Free"]
  ],

  /* Events — one line each, shown on the calendar. */
  events: [
    { date: "2026-09-12", time: "6:00 p.m.", title: "Evening concert in the 1805 Barn (SAMPLE)" },
    { date: "2026-09-26", time: "10:00 a.m.", title: "Fall pioneer crafts, Ziegler Log Haus (SAMPLE)" }
  ],

  /* Rental venues + booked/held dates. A volunteer adds a line when a contract is
     signed; the calendar and the rental page both read from here. */
  venues: [
    { key: "barn",    name: "1805 Harmonist Barn",   cap: "260 auditorium · 200 seated" },
    { key: "stewart", name: "Stewart Hall",          cap: "120 dining · full kitchen · wine cellar add-on" },
    { key: "church",  name: "1825 Mennonite Church", cap: "130–150 on original benches" }
  ],
  venueHolds: [
    { venue: "barn",    date: "2026-09-19", status: "booked", label: "(SAMPLE)" },
    { venue: "stewart", date: "2026-08-29", status: "hold",   label: "(SAMPLE)" }
  ]
};
