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

  /* Utility-bar hours — an active closure overrides the weekly schedule */
  var hrs = document.getElementById("hrs");
  if (hrs) {
    hrs.textContent = active.length ? "— closed today"
      : S.hours.closedDays.indexOf(today.getDay()) >= 0
        ? "— closed Sun & Mon" : S.hours.hoursShort;
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
