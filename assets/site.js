/* Shared page logic: dated closure banner, live hours, newsletter stub.
   Content lives in data/site.js — volunteers edit that file, never this one. */
(function () {
  var S = window.SITE;
  if (!S) return;

  /* ?today=YYYY-MM-DD lets anyone preview a date (e.g. ?today=2026-12-25) */
  function now() {
    var m = location.search.match(/[?&]today=(\d{4}-\d{2}-\d{2})/);
    return m ? new Date(m[1] + "T12:00:00") : new Date();
  }
  var today = now();

  /* Prototype flag: once data/site.js says prototype:false, anything marked .proto disappears */
  if (!S.prototype) document.documentElement.classList.add("live");

  /* Booking mode — "phone" until a hosted service is chosen, then "online" */
  var B = S.booking || { mode: "phone" };
  var online = B.mode === "online" && !!B.onlineUrl;
  var bookHref = online ? B.onlineUrl : S.contact.phoneHref;
  window.SITE_BOOK = { online: online, href: bookHref, label: online ? "Book" : "Call to reserve" };

  function inClosure(d) {
    return (S.closures || []).some(function (c) {
      return new Date(c.start + "T00:00:00") <= d && d <= new Date(c.end + "T23:59:59");
    });
  }
  function openDay(d) { return S.hours.closedDays.indexOf(d.getDay()) < 0; }
  window.SITE_IS_OPEN = function (d) { return openDay(d) && !inClosure(d); };

  /* Closure banner — renders only inside a closure's window */
  var active = (S.closures || []).filter(function (c) {
    return new Date(c.start + "T00:00:00") <= today &&
           today <= new Date(c.end + "T23:59:59");
  });
  var banner = document.getElementById("closureBanner");
  if (banner && active.length) {
    banner.textContent = active[0].message;
    banner.classList.add("show");
  }

  /* Utility-bar open/closed line — an active closure overrides the weekly schedule */
  /* fall back to the class selector so a stale cached index.html still updates */
  var line = document.getElementById("openLine") || document.querySelector(".util .open");
  if (line) {
    var NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if (active.length) {
      line.textContent = "Closed today — see notice above";
    } else if (!openDay(today)) {
      var n = new Date(today);
      do { n.setDate(n.getDate() + 1); } while (!openDay(n));
      line.textContent = "Closed today · reopens " + NAMES[n.getDay()] + " " + S.hours.hoursShort;
    } else {
      line.textContent = "Open today " + S.hours.hoursShort;
    }
  }

  /* Homepage "Tours today" ledger — today's tour times, or the next open day's */
  var tourRows = document.getElementById("tourRows");
  if (tourRows) {
    var day = new Date(today), isToday = true, guard = 0;
    while (!(openDay(day) && !inClosure(day)) && guard++ < 400) { day.setDate(day.getDate() + 1); isToday = false; }
    var dayFmt = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" });
    var lbl = document.getElementById("todayLabel"), head = document.getElementById("todayHead");
    if (lbl) lbl.textContent = dayFmt.format(day);
    if (head) head.textContent = isToday ? "Tours today" : "Next tours";
    var cta = online
      ? '<span class="seats">Book ahead</span><span class="act"><a class="btn" href="' + bookHref + '">Book</a></span>'
      : '<span class="seats">By phone</span><span class="act"><a class="btn" href="' + bookHref + '">Call</a></span>';
    tourRows.innerHTML = S.hours.tourTimes.map(function (t) {
      return '<div class="row"><span class="when">' + t + '</span>' +
        '<span class="what">Museum guided tour<small>1809 warehouse, wine cellar &amp; Ziegler Log House</small></span>' +
        cta + "</div>";
    }).join("");
  }

  /* Hours + admission blocks read from data, so prices live in exactly one place */
  var hd = document.getElementById("hoursDays"), hn = document.getElementById("hoursNote");
  if (hd) hd.textContent = S.hours.days + ", " + S.hours.hoursShort;
  if (hn) hn.textContent = S.hours.note;
  var adm = document.getElementById("admission");
  if (adm) {
    adm.innerHTML = S.admission.map(function (p) {
      return '<div class="price"><span>' + p[0] + "</span><span>" + p[1] + "</span></div>";
    }).join("");
  }
  var on = document.getElementById("onlineNote");
  if (on) {
    on.innerHTML = online
      ? '<a href="' + bookHref + '" style="color:var(--gold)">Book online</a> — ' +
        S.onlinePricing.map(function (p) { return p[0] + " " + p[1]; }).join(" · ") + "."
      : 'Reserve a place by phone: <a href="' + S.contact.phoneHref + '" style="color:var(--gold)">' + S.contact.phone + "</a>.";
  }

  /* Mobile menu toggle */
  var mb = document.getElementById("menuBtn"), nav = document.getElementById("mainNav");
  if (mb && nav) {
    mb.addEventListener("click", function () {
      mb.setAttribute("aria-expanded", String(nav.classList.toggle("open")));
    });
  }

  /* Newsletter — stub until the form is pointed at Kit */
  var nlBtn = document.querySelector(".band .form button");
  if (nlBtn) {
    nlBtn.addEventListener("click", function () {
      var fine = document.querySelector(".band .fine");
      if (fine) fine.textContent = "Prototype — this form connects to Kit at launch. Nothing was sent.";
    });
  }

  window.SITE_TODAY = today; /* booking page reuses the same date override */
})();
