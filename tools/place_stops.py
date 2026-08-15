"""Assign lat/lng to all 28 stops and merge into data/walking-tour.json.

Sources, best first:
  osm-poi            named building/POI in OSM matching the stop
  nominatim-house    house-number geocode of a museum-confirmed address
  interpolated       placed along real OSM street geometry at the block position
                     shown on the brochure map — always approximate:true
"""
import json, math, os

ROOT = os.path.join(os.path.dirname(__file__), "..")
GEO = os.path.join(ROOT, "data", "geo")
inter = json.load(open(os.path.join(GEO, "intersections.json")))
flat = json.load(open(os.path.join(GEO, "streets_flat.json")))

MxM = inter["Main Street x Mercer Street"]
WxM = inter["Mercer Street x Wood Street"]
SxM = inter["Mercer Street x Spring Street"]
MxG = inter["Main Street x German Street"]
WISE = inter["Wise Road x Mercer Road"]

MLAT = 111320.0
def mlon(lat): return 111320.0 * math.cos(math.radians(lat))

def unit(a, b):
    dl, dn = b[0]-a[0], b[1]-a[1]
    dy, dx = dl*MLAT, dn*mlon(a[0])
    L = math.hypot(dy, dx)
    return (dy/L, dx/L)

uMain = unit(MxG, MxM)     # "north" along the Main St axis
uMerc = unit(MxM, WxM)     # "east" along the Mercer St axis

def place(base, main_m=0.0, merc_m=0.0):
    dy = main_m*uMain[0] + merc_m*uMerc[0]
    dx = main_m*uMain[1] + merc_m*uMerc[1]
    return [round(base[0] + dy/MLAT, 6), round(base[1] + dx/mlon(base[0]), 6)]

GC   = [40.802462, -80.128340]   # Grace Church of Harmony (OSM POI)
BORO = [40.802631, -80.128921]   # Harmony Borough Office, 217 Mercer (OSM POI)
INN  = [40.802951, -80.126514]   # The Harmony Inn, 230 Mercer (OSM POI)
ROPE = [40.803587, -80.125897]   # Historic Harmony Rope Maker Shop, 251 Mercer (OSM POI)
BARN = [40.805748, -80.123936]   # Historic Harmony Barn (OSM POI)
MEET = [40.809177, -80.127582]   # Harmony Mennonite Meeting House (OSM POI)
SEAT = [40.804634, -80.123127]   # Rapp's Seat viewpoint (OSM POI)
MUS  = [40.802702, -80.127697]   # Harmony Museum, 218 Mercer (OSM POI)
WAG  = [40.802888, -80.127333]   # 222 Mercer St (Nominatim house; OSM labels bldg US Post Office)
ZLOG = [40.801736, -80.127574]   # 546 Main St (Nominatim house)

# stop 26: a Wise Road vertex ~150-250m grid-east of the Mercer Rd fork
w_pts = [p for p in flat["Wise Road"]
         if 0 < (p[1]-WISE[1])*mlon(WISE[0]) < 260 and abs(p[0]-WISE[0])*MLAT < 200]
SHONTZ = [round(sum(p[0] for p in w_pts)/len(w_pts), 6),
          round(sum(p[1] for p in w_pts)/len(w_pts), 6)] if w_pts else place(WISE, 30, 180)

# stop 28: southern end of Edmond Street, nudged east toward Rt 68
edm = min(flat["Edmond Street"], key=lambda p: p[0])
CEM = place([edm[0], edm[1]], -20, 50)

SPEC = {
    1:  (MUS,  "osm-poi", False),
    2:  (place(MxM, -35,  8),  "interpolated", True),
    3:  (place(MxG,  40, -8),  "interpolated", True),
    4:  (ZLOG, "nominatim-house", False),
    5:  (place(GC,    -5, -30), "interpolated", True),
    6:  (GC,   "osm-poi", False),
    7:  (BORO, "osm-poi", False),
    8:  (place(MxM,  12, -45), "interpolated", True),
    9:  (place(MxM,  55, -12), "interpolated", True),
    10: (place(MxM, 110, -15), "interpolated", True),
    11: (place(MxM, 100,  12), "interpolated", True),
    12: (place(MxM,  60,  12), "interpolated", True),
    13: (place(MxM,  25,  12), "interpolated", True),
    14: (WAG,  "nominatim-house", False),
    15: (place(WxM,  15, -10), "interpolated", True),
    16: (place(WxM,  85,  25), "interpolated", True),
    17: (place(WxM,  12,  25), "interpolated", True),
    18: (INN,  "osm-poi", False),
    19: (place(WxM,  12,  60), "interpolated", True),
    20: (ROPE, "osm-poi", False),
    21: (place(ROPE,  5,  30), "interpolated", True),  # brochure row order 17-19-20-21 puts it east of the Rope Shop
    22: (place(SxM, -15,  35), "interpolated", True),
    23: (place(SxM, -15,  75), "interpolated", True),
    24: (BARN, "osm-poi", False),
    25: (MEET, "osm-poi", False),
    26: (SHONTZ, "interpolated", True),
    27: (SEAT, "osm-poi", False),
    28: (CEM,  "interpolated", True),
}

path = os.path.join(ROOT, "data", "walking-tour.json")
d = json.load(open(path, encoding="utf-8"))
for s in d["stops"]:
    (lat, lon), src, approx = SPEC[s["number"]]
    assert 40.799 < lat < 40.812 and -80.132 < lon < -80.118, f"stop {s['number']} out of Harmony bbox: {lat},{lon}"
    s["lat"], s["lng"] = lat, lon
    s["geo"] = {"source": src, "approximate": approx}
d["meta"]["geocoding"] = ("Anchors: OSM named POIs and house-number geocodes (Nominatim), fetched 2026-08-15. "
    "Approximate stops are placed along real OSM street geometry at the block positions shown on the brochure map; "
    "every one carries geo.approximate=true and needs a street address from the museum to firm up. "
    "Note: OSM labels the building at 222 Mercer St 'United States Post Office' while the museum lists it as the "
    "Wagner-Bentel Haus, and the brochure says the post office is in the old public school (Borough building, 217 Mercer) "
    "— possibly the post office moved; ask the museum.")
json.dump(d, open(path, "w", encoding="utf-8"), indent=2)

exact = sum(1 for s in d["stops"] if not s["geo"]["approximate"])
print(f"placed 28 stops: {exact} exact, {28-exact} approximate")
for s in d["stops"]:
    print(f"{s['number']:>2} {s['lat']:.6f} {s['lng']:.6f}  {s['geo']['source']:16s} {'~' if s['geo']['approximate'] else ' '} {s['name']}")
