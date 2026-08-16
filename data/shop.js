/* Gift shop catalog — ALL ITEMS ARE SAMPLES for the prototype.
   At launch, inventory truth lives in Square (POS + Square Online share one
   catalog); this file either goes away or is generated from Square's catalog.
   shipping:false = in-store only (fragile / heavy).  stock is demo data. */
window.SHOP = {
  items: [
    { id: "book-harmony",  cat: "Books",     name: "A History of Harmony (SAMPLE)",            price: 24.00, stock: 7,  shipping: true,
      blurb: "Paperback local history. Placeholder title — the shop's real book list goes here." },
    { id: "book-society",  cat: "Books",     name: "The Harmony Society, 1804–1814 (SAMPLE)",  price: 18.00, stock: 3,  shipping: true,
      blurb: "Placeholder — swap for the titles actually on the shelf." },
    { id: "map-print",     cat: "Prints",    name: "Walking Tour Map print, 11×17 (SAMPLE)",   price: 12.00, stock: 15, shipping: true,
      blurb: "The 28-stop map as a keepsake print." },
    { id: "postcards",     cat: "Prints",    name: "Postcard set — nine properties (SAMPLE)",  price: 8.00,  stock: 22, shipping: true,
      blurb: "Nine cards, one per property." },
    { id: "mug",           cat: "Home",      name: "Museum mug — Virgin Sophia mark (SAMPLE)", price: 14.00, stock: 9,  shipping: true,
      blurb: "Stoneware mug with the Society's emblem." },
    { id: "ornament",      cat: "Home",      name: "Brass ornament — 1809 warehouse (SAMPLE)", price: 16.00, stock: 0,  shipping: true,
      blurb: "Etched brass, boxed. Currently sold out — demo of the sold-out state." },
    { id: "redware",       cat: "Home",      name: "Redware bowl, local potter (SAMPLE)",      price: 45.00, stock: 2,  shipping: false,
      blurb: "Handmade and fragile — pick up at the shop, we don't ship these." },
    { id: "honey",         cat: "Pantry",    name: "Local honey, 12 oz (SAMPLE)",              price: 9.00,  stock: 11, shipping: false,
      blurb: "From hives a mile from the museum. In-store only." }
  ]
};
