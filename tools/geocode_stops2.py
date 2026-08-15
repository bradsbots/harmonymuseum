"""Phase 2: named historic/tourism POIs in the town core + street intersections."""
import json, os, urllib.parse
from geocode_stops import fetch, GEO  # reuses cache + UA; anchor lookups are cached

anchors = json.load(open(os.path.join(GEO, "anchors.json")))
lat0, lon0 = anchors["town"]["lat"], anchors["town"]["lon"]

# tight bbox around the historic core + outlying stops (~2km)
bbox = f"{lat0-0.012},{lon0-0.012},{lat0+0.015},{lon0+0.018}"
q = f"""[out:json][timeout:60];
(
  nwr["historic"]({bbox});
  nwr["tourism"]({bbox});
  nwr["amenity"~"place_of_worship|post_office|library|townhall|restaurant|pub|bank"]({bbox});
  nwr["landuse"="cemetery"]({bbox});
  nwr["building"]["name"]({bbox});
);
out center tags;"""
ov = fetch("https://overpass-api.de/api/interpreter",
           data=("data=" + urllib.parse.quote(q)).encode(), cache="overpass_pois.json")

pois = []
for el in ov.get("elements", []):
    t = el.get("tags", {})
    name = t.get("name")
    if not name:
        continue
    lat = el.get("lat") or el.get("center", {}).get("lat")
    lon = el.get("lon") or el.get("center", {}).get("lon")
    pois.append({"name": name, "lat": lat, "lon": lon,
                 "tags": {k: v for k, v in t.items() if k in
                          ("historic", "tourism", "amenity", "building", "addr:housenumber", "addr:street", "landuse", "religion")}})
    print(f"{name:45s} {lat:.6f} {lon:.6f}  {pois[-1]['tags']}")
json.dump(pois, open(os.path.join(GEO, "pois.json"), "w"), indent=1)

# ---- intersections of the tour-relevant streets ------------------------------
flat = json.load(open(os.path.join(GEO, "streets_flat.json")))
CORE = ["Main Street", "Mercer Street", "Wood Street", "German Street", "Spring Street",
        "Edmond Street", "Wise Road", "Mercer Road", "Evergreen Mill Road", "Mennonite Lane"]

def near(p, q, tol=0.00012):  # ~13 m
    return abs(p[0]-q[0]) < tol and abs(p[1]-q[1]) < tol

inter = {}
for i, a in enumerate(CORE):
    for b in CORE[i+1:]:
        pts = [p for p in flat.get(a, []) for r in flat.get(b, []) if near(p, r)]
        if pts:
            la = sum(p[0] for p in pts)/len(pts); lo = sum(p[1] for p in pts)/len(pts)
            inter[f"{a} x {b}"] = [round(la, 6), round(lo, 6)]
print()
for k, v in sorted(inter.items()):
    print(f"{k:38s} {v[0]:.6f} {v[1]:.6f}")
json.dump(inter, open(os.path.join(GEO, "intersections.json"), "w"), indent=1)
