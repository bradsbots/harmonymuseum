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
    function openDay(d) { return S.hours.closedDays.indexOf(d.getDay()) < 0; }
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
