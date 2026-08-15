"""Geocode walking-tour stops.

Anchors: Nominatim house-level lookups for museum-owned addresses.
Everything else: placed along real OSM street geometry (Overpass) at block
positions read from the brochure map, flagged approximate.

Raw API responses are cached in data/geo/ so reruns don't hammer the APIs.
"""
import json, os, time, urllib.request, urllib.parse

ROOT = os.path.join(os.path.dirname(__file__), "..")
GEO = os.path.join(ROOT, "data", "geo")
os.makedirs(GEO, exist_ok=True)
UA = "harmonymuseum-prototype/0.1 (volunteer museum site redesign; maxedev@gmail.com)"

def fetch(url, data=None, cache=None):
    path = os.path.join(GEO, cache)
    if os.path.exists(path):
        return json.load(open(path, encoding="utf-8"))
    req = urllib.request.Request(url, data=data, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=90) as r:
        out = json.load(r)
    json.dump(out, open(path, "w", encoding="utf-8"), indent=1)
    time.sleep(1.2)
    return out

def nominatim(q, cache):
    url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode(
        {"q": q, "format": "jsonv2", "limit": 3, "countrycodes": "us"})
    return fetch(url, cache=cache)

# ---- 1. anchors --------------------------------------------------------------
ANCHORS = {
    "town":        "Harmony, Butler County, Pennsylvania",
    "museum":      "218 Mercer Street, Harmony, Butler County, Pennsylvania",
    "wagner":      "222 Mercer Street, Harmony, Butler County, Pennsylvania",
    "ziegler_log": "546 Main Street, Harmony, Butler County, Pennsylvania",
    "weavers":     "245 Mercer Street, Harmony, Butler County, Pennsylvania",
    "barn":        "303 Mercer Road, Harmony, Butler County, Pennsylvania",
    "meetinghouse":"114 Wise Road, Harmony, Butler County, Pennsylvania",
    "harmony_inn": "Harmony Inn, 230 Mercer Street, Harmony, Pennsylvania",
    "rapps_seat":  "Rapp's Seat, Harmony, Pennsylvania",
    "cemetery":    "Harmonist Cemetery, Harmony, Pennsylvania",
}
anchors = {}
for key, q in ANCHORS.items():
    res = nominatim(q, f"nominatim_{key}.json")
    if res:
        best = res[0]
        anchors[key] = {"lat": float(best["lat"]), "lon": float(best["lon"]),
                        "type": best.get("type"), "class": best.get("category") or best.get("class"),
                        "display": best.get("display_name", "")[:90]}
        print(f"{key:13s} {best['lat'][:9]}, {best['lon'][:10]}  [{best.get('type')}]  {best.get('display_name','')[:70]}")
    else:
        anchors[key] = None
        print(f"{key:13s} NO RESULT")

town = anchors["town"] or {"lat": 40.801, "lon": -80.126}
lat0, lon0 = town["lat"], town["lon"]

# ---- 2. street grid ----------------------------------------------------------
bbox = f"{lat0-0.02},{lon0-0.025},{lat0+0.02},{lon0+0.025}"
q = f"""[out:json][timeout:60];
(way["highway"]["name"]({bbox}); way["railway"]({bbox}); way["waterway"]["name"]({bbox}););
out geom;"""
ov = fetch("https://overpass-api.de/api/interpreter",
           data=("data=" + urllib.parse.quote(q)).encode(), cache="overpass_streets.json")
streets = {}
for el in ov.get("elements", []):
    name = el.get("tags", {}).get("name", el.get("tags", {}).get("railway", "?"))
    streets.setdefault(name, []).extend([(p["lat"], p["lon"]) for p in el.get("geometry", [])])
print("\nOSM ways found:", ", ".join(sorted(streets)))
json.dump({k: v for k, v in streets.items()}, open(os.path.join(GEO, "streets_flat.json"), "w"), indent=0)
json.dump(anchors, open(os.path.join(GEO, "anchors.json"), "w"), indent=1)
