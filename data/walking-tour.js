window.WALKING_TOUR = {
 "meta": {
  "extractedFrom": {
   "pdf": "assets/originals/Walking-Tour-Map.pdf (scanned brochure, 2 pages: map+legend, 'Site Historic Facts'). No text layer; transcribed from page images.",
   "website": "https://harmonymuseum.org/harmony-walking-tour/ fetched 2026-08-15 (two unnumbered 14-item lists, in stop order)"
  },
  "namePolicy": "Names were ruled on by the museum on 2026-09-15 (stops 2, 7, 13, 17, 23, Stohr). `nameVariants` keeps the historical spellings from the brochure and the old website for reference. Stops 19 and 22 remain era-undetermined.",
  "eraNote": "The requested era enum was harmonist|mennonite. It cannot honestly cover post-1850 buildings (1856 Pearce Home, 1887 Opera House, ca.1900 Shontz School, 1882 school building), so the enum here is harmonist|mennonite|later|undetermined. Harmonist = Harmony Society period 1804-1814 (plus their surviving buildings); mennonite = Abraham Ziegler / Mennonite period from 1815; later = post-Mennonite 19th-20th century; undetermined = the brochure itself says the history is unknown.",
  "inTownNote": "inTown reflects the PDF map geometry. The website footnote-1 ('located outside downtown Harmony') agrees except: it flags #14 Wagner-Bentel Haus as outlying (contradicts its 222 Mercer St address — almost certainly a site error) and does NOT flag #26 Shontz School (which the map places outside the grid).",
  "geocoding": "Anchors: OSM named POIs and house-number geocodes (Nominatim), fetched 2026-08-15. Approximate stops are placed along real OSM street geometry at the block positions shown on the brochure map; every one carries geo.approximate=true and needs a street address from the museum to firm up. Note: OSM labels the building at 222 Mercer St 'United States Post Office' while the museum lists it as the Wagner-Bentel Haus, and the brochure says the post office is in the old public school (Borough building, 217 Mercer) — possibly the post office moved; ask the museum."
 },
 "conflicts": [
  {
   "stop": 2,
   "issue": "PDF facts page: 'Langenbacher/Ziegler Haus'; PDF map legend: 'Langenbacher or Ziegler Haus'; website: 'Langenbacher Haus' (drops Ziegler entirely).",
   "resolved": "2026-09-15"
  },
  {
   "stop": 7,
   "issue": "PDF (both pages): 'Post Office (Harmony Public School)'; website: 'Harmony Borough Building (Harmony Public School)'. Description says the building houses Borough offices AND the Post Office — which is the lead name?",
   "resolved": "2026-09-15"
  },
  {
   "stop": 8,
   "issue": "Both PDF and website say 'Harmonist Stohr' — the predicted 'Store' spelling appears nowhere in either source. The brochure's own description calls it 'the 1807 Harmonist store' and uses 'The Stohr' as a noun, so 'Stohr' looks deliberate (period spelling), but confirm with the museum.",
   "resolved": "2026-09-15"
  },
  {
   "stop": 13,
   "issue": "PDF: 'Beahm Hotel (Site of Harmonite Inn)'; website: 'Beam Hotel'. Beahm vs Beam is a surname spelling — museum must rule.",
   "resolved": "2026-09-15"
  },
  {
   "stop": 14,
   "issue": "Location flag, not name: website marks Wagner-Bentel Haus as outside downtown; its address is 222 Mercer St, in-town, and the PDF map places it in-town. Website flag looks erroneous.",
   "resolved": "2026-09-15"
  },
  {
   "stop": 17,
   "issue": "The PDF disagrees with itself: facts page says 'Bank of Harmony', map legend says 'Harmony National Bank'. Website says 'Harmony National Bank'.",
   "resolved": "2026-09-15"
  },
  {
   "stop": 23,
   "issue": "The PDF disagrees with itself: facts page says 'Otto House', map legend says 'Mennonite Double House'. Website says 'Mennonite Double House'.",
   "resolved": "2026-09-15"
  },
  {
   "stop": 26,
   "issue": "All three sources say 'Shontz School'. The predicted variant 'Stromtz' appears nowhere on the walking-tour page — its origin is unverified (possibly another page of the site). Also: map places it outside the town grid but the website does not flag it as outlying.",
   "resolved": "2026-09-15"
  },
  {
   "stop": 1,
   "issue": "Brochure says museum tours 'Tues-Sun 1-4 p.m.'; the website and brief say Tue-Sat. Brochure is stale on hours — do not source hours from it.",
   "resolved": "2026-09-15"
  }
 ],
 "stops": [
  {
   "number": 1,
   "name": "Great House / Warehouse — Museum",
   "nameVariants": {
    "pdfFacts": "Great House/Warehouse-Museum",
    "pdfLegend": "Great House (Museum) Warehouse",
    "website": "Great House (Museum) Warehouse"
   },
   "era": "harmonist",
   "inTown": true,
   "needsConfirmation": false,
   "ownedByMuseum": true,
   "address": "218 Mercer St",
   "description": "The Harmonists' warehouse for goods sold to outsiders, a granary, and one of two wine cellars in Harmony. From 1817 it housed a pioneering boarding school for girls. Today it is the main Harmony Museum building and headquarters of Historic Harmony.",
   "lat": 40.802702,
   "lng": -80.127697,
   "geo": {
    "source": "osm-poi",
    "approximate": false
   }
  },
  {
   "number": 2,
   "name": "Langenbacher/Ziegler Haus",
   "nameVariants": {
    "pdfFacts": "Langenbacher/Ziegler Haus",
    "pdfLegend": "Langenbacher or Ziegler Haus",
    "website": "Langenbacher Haus"
   },
   "era": "harmonist",
   "eraNote": "Original Harmonist structure; Abraham Ziegler added the two-story Mennonite-style addition after 1815.",
   "inTown": true,
   "needsConfirmation": false,
   "description": "The original structure ended at the door frame, showing Harmonist architecture at half today's size. When Abraham Ziegler bought Harmony he moved into this house and built the two-story addition to center the door in the Mennonite fashion.",
   "lat": 40.802512,
   "lng": -80.127779,
   "geo": {
    "source": "interpolated",
    "approximate": true
   },
   "museumRuling": "Name confirmed by the museum 2026-09-15."
  },
  {
   "number": 3,
   "name": "Neff Haus",
   "nameVariants": {
    "pdfFacts": "Neff Haus",
    "pdfLegend": "Neff Haus",
    "website": "Neff Haus"
   },
   "era": "harmonist",
   "inTown": true,
   "needsConfirmation": false,
   "description": "Home of Harmonists Jacob and Maria Neff.",
   "lat": 40.801774,
   "lng": -80.127592,
   "geo": {
    "source": "interpolated",
    "approximate": true
   }
  },
  {
   "number": 4,
   "name": "Ziegler Log Haus",
   "nameVariants": {
    "pdfFacts": "Ziegler Log Haus",
    "pdfLegend": "Ziegler Log Haus",
    "website": "Ziegler Log House"
   },
   "era": "mennonite",
   "eraNote": "Built by Andrew Ziegler, grandson of Abraham Ziegler, in Middle Lancaster; relocated to this site in 1976.",
   "inTown": true,
   "needsConfirmation": false,
   "ownedByMuseum": true,
   "address": "546 Main St",
   "description": "Andrew Ziegler, a grandson of Abraham Ziegler, built this structure in Middle Lancaster; it was relocated to its present site in 1976. Area children learn pioneer crafts here.",
   "lat": 40.801736,
   "lng": -80.127574,
   "geo": {
    "source": "nominatim-house",
    "approximate": false
   }
  },
  {
   "number": 5,
   "name": "Schmidt Haus",
   "nameVariants": {
    "pdfFacts": "Schmidt Haus",
    "pdfLegend": "Schmidt Haus",
    "website": "Schmidt Haus"
   },
   "era": "harmonist",
   "inTown": true,
   "needsConfirmation": false,
   "description": "Home of the Harmonist Schmidt family. It now serves as offices for Grace Church of Harmony.",
   "lat": 40.802316,
   "lng": -80.128646,
   "geo": {
    "source": "interpolated",
    "approximate": true
   }
  },
  {
   "number": 6,
   "name": "Grace Church / Harmonist Church",
   "nameVariants": {
    "pdfFacts": "Grace Church/Harmonist Church",
    "pdfLegend": "Grace Church (Harmonist Church Site)",
    "website": "Grace Church (Harmonist Church)"
   },
   "era": "harmonist",
   "eraNote": "Northwest section along Mercer St was the 1809-1814 Harmonist Church; sanctuary facing Main St built 1929, expanded 2001.",
   "inTown": true,
   "needsConfirmation": false,
   "description": "The county's oldest church in continued use. The northwest section along Mercer Street was the 1809-1814 Harmonist Church and also served the Mennonites for a time; a German Evangelical and Reformed congregation bought it in 1826.",
   "lat": 40.802462,
   "lng": -80.12834,
   "geo": {
    "source": "osm-poi",
    "approximate": false
   }
  },
  {
   "number": 7,
   "name": "Harmony Borough Building (Harmony Public School)",
   "nameVariants": {
    "pdfFacts": "Post Office (Harmony Public School)",
    "pdfLegend": "Post Office (Harmony Public School)",
    "website": "Harmony Borough Building (Harmony Public School)"
   },
   "era": "later",
   "eraNote": "Built as Harmony's public school, 1882-1958.",
   "inTown": true,
   "needsConfirmation": false,
   "description": "Harmony's public school from 1882 to 1958; now houses Borough offices as well as the Post Office. The exterior was restored in the late 20th century.",
   "lat": 40.802631,
   "lng": -80.128921,
   "geo": {
    "source": "osm-poi",
    "approximate": false
   },
   "museumRuling": "Name confirmed by the museum 2026-09-15."
  },
  {
   "number": 8,
   "name": "Harmonist Stohr",
   "nameVariants": {
    "pdfFacts": "Harmonist Stohr",
    "pdfLegend": "Harmonist Stohr",
    "website": "Harmonist Stohr"
   },
   "era": "harmonist",
   "inTown": true,
   "needsConfirmation": false,
   "description": "The 1807 Harmonist store, where Society members obtained the goods they needed in daily life. It also has a wine cellar, and its attic was a granary.",
   "lat": 40.802719,
   "lng": -80.128566,
   "geo": {
    "source": "interpolated",
    "approximate": true
   },
   "museumRuling": "'Stohr' spelling confirmed by the museum 2026-09-15."
  },
  {
   "number": 9,
   "name": "George Rapp Haus",
   "nameVariants": {
    "pdfFacts": "George Rapp Haus",
    "pdfLegend": "George Rapp Haus",
    "website": "George Rapp Haus"
   },
   "era": "harmonist",
   "inTown": true,
   "needsConfirmation": false,
   "description": "Father Rapp resided in this house after he established the community here.",
   "lat": 40.803193,
   "lng": -80.128395,
   "geo": {
    "source": "interpolated",
    "approximate": true
   }
  },
  {
   "number": 10,
   "name": "Waldmann Log House",
   "nameVariants": {
    "pdfFacts": "Waldmann Log House",
    "pdfLegend": "Waldmann Log House",
    "website": "Waldmann Log House"
   },
   "era": "harmonist",
   "inTown": true,
   "needsConfirmation": false,
   "description": "Harmonist log house with a brick addition that was the home of Christian and Elisabeth Waldmann.",
   "lat": 40.803641,
   "lng": -80.128671,
   "geo": {
    "source": "interpolated",
    "approximate": true
   }
  },
  {
   "number": 11,
   "name": "Weingartner Haus",
   "nameVariants": {
    "pdfFacts": "Weingartner Haus",
    "pdfLegend": "Weingartner Haus",
    "website": "Weingartner Haus"
   },
   "era": "harmonist",
   "inTown": true,
   "needsConfirmation": false,
   "description": "Much modified brick home of Harmonists Frederick and Christina Weingartner.",
   "lat": 40.803652,
   "lng": -80.128331,
   "geo": {
    "source": "interpolated",
    "approximate": true
   }
  },
  {
   "number": 12,
   "name": "Frederick Reichert Rapp Haus",
   "nameVariants": {
    "pdfFacts": "Frederick Reichert Rapp Haus",
    "pdfLegend": "Frederick Rapp Haus",
    "website": "Frederick Rapp Haus"
   },
   "era": "harmonist",
   "inTown": true,
   "needsConfirmation": false,
   "description": "Home of Father Rapp's adopted son, the Harmony Society's business manager. Frederick Rapp was to be the next leader of the Harmonists but died in 1834 at Economy, 13 years before George.",
   "lat": 40.803318,
   "lng": -80.128155,
   "geo": {
    "source": "interpolated",
    "approximate": true
   }
  },
  {
   "number": 13,
   "name": "Beam Hotel (Site of Harmonite Inn)",
   "nameVariants": {
    "pdfFacts": "Beahm Hotel (Site of Harmonite Inn)",
    "pdfLegend": "Beahm Hotel",
    "website": "Beam Hotel"
   },
   "era": "later",
   "eraNote": "Original brick-and-frame structure burned in the 1850s; rebuilt as the two-story Beahm Hotel, third story and Victorian addition added ca. 1890s.",
   "inTown": true,
   "needsConfirmation": false,
   "description": "A brick and frame structure that burned in the 1850s, rebuilt as the two-story Beahm Hotel. The third story and Victorian addition were added around the 1890s.",
   "lat": 40.803026,
   "lng": -80.128,
   "geo": {
    "source": "interpolated",
    "approximate": true
   },
   "museumRuling": "Name confirmed by the museum 2026-09-15."
  },
  {
   "number": 14,
   "name": "Wagner-Bentel Haus",
   "nameVariants": {
    "pdfFacts": "Wagner-Bentel Haus",
    "pdfLegend": "Wagner-Bentel Haus",
    "website": "Wagner-Bentel Haus"
   },
   "era": "harmonist",
   "inTown": true,
   "locationNote": "Website footnote marks this as outside downtown; its address is 222 Mercer St and the PDF map places it in-town. The website flag appears to be an error.",
   "needsConfirmation": false,
   "ownedByMuseum": true,
   "address": "222 Mercer St",
   "description": "This Harmonist duplex was built for two sisters and their families. The garden features a beehive bake oven relocated from a nearby farm, and millstones from the Harmonist oil mill on the Little Connoquenessing Creek.",
   "lat": 40.802888,
   "lng": -80.127333,
   "geo": {
    "source": "nominatim-house",
    "approximate": false
   },
   "museumRuling": "In-town placement confirmed by the museum 2026-09-15; the old website's 'outlying' footnote was an error."
  },
  {
   "number": 15,
   "name": "Dr. Muller Haus",
   "nameVariants": {
    "pdfFacts": "Dr. Muller Haus",
    "pdfLegend": "Dr. Muller Haus",
    "website": "Muller Haus"
   },
   "era": "harmonist",
   "inTown": true,
   "needsConfirmation": false,
   "description": "Harmony Society home of Johannes Christoph Muller — doctor, schoolteacher, music director, composer, printer, archivist and museum curator. Note the angled corner on the Wood Street side, built so wagons turning toward the original bridge would not hit the wall.",
   "lat": 40.80319,
   "lng": -80.127179,
   "geo": {
    "source": "interpolated",
    "approximate": true
   }
  },
  {
   "number": 16,
   "name": "Schreiber Haus",
   "nameVariants": {
    "pdfFacts": "Schreiber Haus",
    "pdfLegend": "Schreiber Haus",
    "website": "Schreiber Haus"
   },
   "era": "harmonist",
   "inTown": true,
   "needsConfirmation": false,
   "description": "Home of Harmonists Ludwig and Anna Schreiber.",
   "lat": 40.803896,
   "lng": -80.127105,
   "geo": {
    "source": "interpolated",
    "approximate": true
   }
  },
  {
   "number": 17,
   "name": "Bank of Harmony / Harmony National Bank",
   "nameVariants": {
    "pdfFacts": "Bank of Harmony",
    "pdfLegend": "Harmony National Bank",
    "website": "Harmony National Bank"
   },
   "era": "later",
   "eraNote": "Built in the 19th century as one of Harmony's two banks.",
   "inTown": true,
   "needsConfirmation": false,
   "description": "Built in the 19th century as one of Harmony's two banks; now apartments.",
   "lat": 40.803287,
   "lng": -80.126783,
   "geo": {
    "source": "interpolated",
    "approximate": true
   },
   "museumRuling": "Name confirmed by the museum 2026-09-15."
  },
  {
   "number": 18,
   "name": "Austin Pearce Home",
   "nameVariants": {
    "pdfFacts": "Austin Pearce Home",
    "pdfLegend": "Austin Pearce Home",
    "website": "Austin Pearce Home"
   },
   "era": "later",
   "inTown": true,
   "needsConfirmation": false,
   "description": "Built in 1856 by a businessman and founder of the Pittsburgh and Western Railroad; purchased in the 1870s by Louis Ziegler and run as an inn and tavern by Zieglers until the late 20th century. Now the Harmony Inn restaurant.",
   "lat": 40.802951,
   "lng": -80.126514,
   "geo": {
    "source": "osm-poi",
    "approximate": false
   }
  },
  {
   "number": 19,
   "name": "Log House",
   "nameVariants": {
    "pdfFacts": "Log House",
    "pdfLegend": "Log House",
    "website": "Log House"
   },
   "era": "undetermined",
   "eraNote": "Early 19th-century structure; the brochure says its early history is undetermined. Era still undetermined as of 2026-09-15.",
   "inTown": true,
   "needsConfirmation": false,
   "description": "Early 19th-century structure relocated from the western end of German Street in 1999. Its early history is undetermined.",
   "lat": 40.803409,
   "lng": -80.1264,
   "geo": {
    "source": "interpolated",
    "approximate": true
   }
  },
  {
   "number": 20,
   "name": "Rope Shop",
   "nameVariants": {
    "pdfFacts": "Rope Shop",
    "pdfLegend": "Rope Shop",
    "website": "Rope Shop"
   },
   "era": "harmonist",
   "inTown": true,
   "needsConfirmation": false,
   "description": "Harmonist rope manufacturing site.",
   "lat": 40.803587,
   "lng": -80.125897,
   "geo": {
    "source": "osm-poi",
    "approximate": false
   }
  },
  {
   "number": 21,
   "name": "Opera House (Odd Fellows)",
   "nameVariants": {
    "pdfFacts": "Opera House (Odd Fellows)",
    "pdfLegend": "Opera House (Odd Fellows)",
    "website": "Opera House (Odd Fellows Hall)"
   },
   "era": "later",
   "eraNote": "ca. 1887.",
   "inTown": true,
   "needsConfirmation": false,
   "description": "Built around 1887 as the Odd Fellows (IOOF) Hall. The upper floor was used for performances by traveling troupes and for school productions.",
   "lat": 40.803733,
   "lng": -80.125591,
   "geo": {
    "source": "interpolated",
    "approximate": true
   }
  },
  {
   "number": 22,
   "name": "Franz Log House",
   "nameVariants": {
    "pdfFacts": "Franz Log House",
    "pdfLegend": "Franz Log House",
    "website": "Franz Log House"
   },
   "era": "undetermined",
   "eraNote": "Log construction, era not stated in either source; relocated from Zelienople in the 1990s. Era still undetermined as of 2026-09-15.",
   "inTown": true,
   "needsConfirmation": false,
   "description": "Relocated from Zelienople in the 1990s.",
   "lat": 40.80325,
   "lng": -80.126077,
   "geo": {
    "source": "interpolated",
    "approximate": true
   }
  },
  {
   "number": 23,
   "name": "Otto House / Mennonite Double House",
   "nameVariants": {
    "pdfFacts": "Otto House",
    "pdfLegend": "Mennonite Double House",
    "website": "Mennonite Double House"
   },
   "era": "mennonite",
   "eraNote": "Constructed post-1815.",
   "inTown": true,
   "needsConfirmation": false,
   "description": "Mennonite duplex constructed after 1815.",
   "lat": 40.803389,
   "lng": -80.125639,
   "geo": {
    "source": "interpolated",
    "approximate": true
   },
   "museumRuling": "Name confirmed by the museum 2026-09-15."
  },
  {
   "number": 24,
   "name": "Harmonist/Mennonite Barn",
   "nameVariants": {
    "pdfFacts": "Harmonist/Mennonite Barn",
    "pdfLegend": "Harmonist/Mennonite Barn",
    "website": "Harmonist / Mennonite Barn"
   },
   "era": "harmonist",
   "eraNote": "Built 1805 by the Harmonists to shelter sheep; modified ca. 1850 by David Ziegler, later part of the Wise Farm — genuinely both eras.",
   "inTown": false,
   "needsConfirmation": false,
   "ownedByMuseum": true,
   "address": "303 Mercer Rd",
   "description": "The region's oldest barn, built in 1805 to shelter the Harmonists' sheep and modified around 1850 by David Ziegler, son of Harmony's 'second founder' Abraham Ziegler. A three-quarter-mile walking trail to the Mennonite Meetinghouse and Cemetery begins here.",
   "lat": 40.805748,
   "lng": -80.123936,
   "geo": {
    "source": "osm-poi",
    "approximate": false
   }
  },
  {
   "number": 25,
   "name": "Mennonite Meetinghouse and Cemetery",
   "nameVariants": {
    "pdfFacts": "Mennonite Meetinghouse and Cemetery",
    "pdfLegend": "Mennonite Meeting House and Cemetery",
    "website": "Mennonite Meetinghouse & Cemetery"
   },
   "era": "mennonite",
   "inTown": false,
   "needsConfirmation": false,
   "ownedByMuseum": true,
   "address": "114 Wise Rd",
   "description": "The cemetery was established in 1815; the meetinghouse was built in 1825. It is the oldest Mennonite church west of the Alleghenies and is on the National Register.",
   "lat": 40.809177,
   "lng": -80.127582,
   "geo": {
    "source": "osm-poi",
    "approximate": false
   }
  },
  {
   "number": 26,
   "name": "Shontz School",
   "nameVariants": {
    "pdfFacts": "Shontz School",
    "pdfLegend": "Shontz School",
    "website": "Shontz School"
   },
   "era": "later",
   "eraNote": "ca. 1900.",
   "inTown": false,
   "locationNote": "PDF map places it outside the town grid; the website does not flag it as outlying. Following the map.",
   "needsConfirmation": false,
   "description": "One-room schoolhouse from around 1900, closed in 1931 and adapted as a private home in 1999.",
   "lat": 40.809388,
   "lng": -80.122943,
   "geo": {
    "source": "interpolated",
    "approximate": true
   },
   "museumRuling": "All sources agree on 'Shontz'; no ruling needed (cleared 2026-09-15)."
  },
  {
   "number": 27,
   "name": "Rapp's Seat",
   "nameVariants": {
    "pdfFacts": "Rapp's Seat",
    "pdfLegend": "Rapp's Seat",
    "website": "Rapp's Seat"
   },
   "era": "harmonist",
   "inTown": false,
   "needsConfirmation": false,
   "ownedByMuseum": true,
   "address": "Evergreen Mill Rd",
   "description": "The site of the Harmonists' sandstone quarry, vineyard and music pavilion. George Rapp meditated on the seat carved in rock near the hilltop.",
   "lat": 40.804634,
   "lng": -80.123127,
   "geo": {
    "source": "osm-poi",
    "approximate": false
   }
  },
  {
   "number": 28,
   "name": "Harmonist Cemetery",
   "nameVariants": {
    "pdfFacts": "Harmonist Cemetery",
    "pdfLegend": "Harmonist Cemetery",
    "website": "Harmonist Cemetery"
   },
   "era": "harmonist",
   "inTown": false,
   "needsConfirmation": false,
   "ownedByMuseum": true,
   "address": "Rt 68 & Edmund St",
   "description": "Members of the Harmony Society who died between 1804 and 1814 were buried here in unmarked graves. The revolving stone gate — symbolic of leaving one world for the next — and the wall were built in 1869.",
   "lat": 40.800418,
   "lng": -80.123588,
   "geo": {
    "source": "interpolated",
    "approximate": true
   }
  }
 ]
};
