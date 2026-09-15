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

  /* Gift shop page. "off": on hold (2026-09-15) — a short "the shop is at 222 Mercer" page,
     no catalog, not in the nav. "list": show what's in the shop, buy in person.
     "cart": online ordering (needs Square and a volunteer who ships). */
  shop: { mode: "off" },

  /* Newsletter is a members-only perk, sent the old-fashioned way (decided 2026-09-15).
     No public signup. Set formAction to a Kit form URL if that ever changes. */
  newsletter: { formAction: "", publicSignup: false },

  hours: {
    hoursShort: "1–4 p.m.",
    days: "Tuesday – Saturday",
    tourTimes: ["1:00", "2:30"],
    closedDays: [0, 1],            /* 0=Sunday, 1=Monday */
    note: "Guided tours only, at 1:00 and 2:30.",
    capacityPerTour: null          /* museum hasn't set a number (2026-09-15); null = don't show one */
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
    /* Confirmed 2026-09-15: closed Dec 24–26. No winter closure is scheduled — the
       museum may run tours in January. Add a record here if that changes. */
    {
      start: "2026-12-24", end: "2026-12-26",
      message: "Closed December 24 – 26 for Christmas. Reopening Tuesday, December 29."
    }
  ],

  /* Door prices — the board's new schedule, confirmed 2026-09-15. */
  admission: [
    ["Ages 5 and under", "Free"],
    ["Ages 6–17", "$5"],
    ["Ages 18–64", "$10"],
    ["Ages 65 and up", "$8"],
    ["Veterans", "$8"],
    ["Members", "Free"]
  ],

  contact: {
    address: "218 Mercer Street, Harmony, PA 16037",
    phone: "(724) 452-7341",
    phoneHref: "tel:+17244527341",
    email: "hmuseum@zoominternet.net",
    instagram: "historicharmonymuseum",
    directions: "I-79 exits 87–88 · 30 miles north of Pittsburgh"
  },

  /* Ways to pay. The museum chose Zeffy (2026-09-15); account to be created under
     hmuseum@zoominternet.net. Paste the Zeffy form links here when they exist.
     Empty = the pages show phone + mail instructions. */
  giving: {
    provider: "Zeffy",
    membershipUrl: "",
    donateUrl: "",
    chequesTo: "Historic Harmony, Inc., 218 Mercer Street, Harmony, PA 16037",
    replyDays: "3 business days"
  },

  /* Featured post — an Instagram reel/post shown on the homepage. Swap the URL to
     feature a newer one; leave the array empty to hide the section. Loads
     Instagram's embed only when a visitor clicks Watch. */
  featured: [
    {
      url: "https://www.instagram.com/reel/DdMpdPUywxb/",
      by: "@412onthemove",
      date: "2026-09-12",
      title: "Come along on a guided tour",
      blurb: "Pittsburgh's 412 On The Move filmed the tour with Christina in September 2026 — the 1809 warehouse, the wine cellar and the Ziegler Log House in three minutes."
    }
  ],

  /* Online prices — only shown when booking.mode is "online" (decision deferred 2026-09-15).
     Same as the door until the museum decides otherwise. */
  onlinePricing: [
    ["Ages 18–64", "$10"],
    ["Ages 65 and up / veterans", "$8"],
    ["Ages 6–17", "$5"],
    ["5 and under", "Free"]
  ],

  /* Events — one line each, shown on the calendar and the news page.
     Optional: link (a page with details), where, note. */
  events: [
    { date: "2026-11-14", time: "10 a.m. – 6 p.m.", title: "Weihnachtsmarkt — German Christmas Market",
      where: "Downtown Harmony", link: "news.html#weihnachtsmarkt", note: "$10 · children 12 and under and seniors 65+ $5" },
    { date: "2026-11-15", time: "12 – 4 p.m.", title: "Weihnachtsmarkt — German Christmas Market, day two",
      where: "Downtown Harmony", link: "news.html#weihnachtsmarkt", note: "$10 · children 12 and under and seniors 65+ $5" },
    { date: "2026-12-31", time: "Evening", title: "Silvester — New Year's Eve, German style",
      where: "Stewart Hall", note: "Details to be announced" }
  ],

  /* Rental venues and fees — confirmed by the museum 2026-09-15. A refundable security
     deposit is REQUIRED for every rental and is charged when the contract is signed. */
  venues: [
    { key: "barn",    name: "1805 Harmonist Barn",   cap: "260 auditorium · 200 seated",
      fee: "$600", deposit: "$600", window: "Friday to Monday — decorate Friday, event Saturday, clean up Sunday/Monday",
      size: "42 × 64 ft, four bays · outside restroom" },
    { key: "stewart", name: "Stewart Hall",          cap: "120 dining · full kitchen · wine cellar add-on",
      fee: "$350", deposit: "$350", window: "8 a.m. to 11 p.m.",
      size: "30 × 46 ft main floor + 22 × 15 ft stage · 2 accessible restrooms · full kitchen",
      extra: "The 1809 wine cellar (42 × 18 ft) is reached through Stewart Hall and can be added to a Stewart Hall rental only, for an additional $100 rental fee." },
    { key: "church",  name: "1825 Mennonite Meetinghouse", cap: "130–150 on original benches",
      fee: "$200", deposit: "$200", window: "8 a.m. to 8 p.m.",
      size: "30 × 28 ft main room + 11 × 16 ft annex · pulpit platform · restroom facility provided by you" }
  ],
  /* Booked/held dates. A volunteer adds a line when a contract is signed; the
     calendar and the rental page both read from here.  e.g.
     { venue: "barn", date: "2027-06-12", status: "booked" }  */
  venueHolds: []
};
