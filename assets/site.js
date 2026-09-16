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

  /* Prototype flag: once data/site.js says prototype:false, anything marked .proto disappears.
     While it's on, ask search engines not to index the preview so it never outranks the real site. */
  /* ?live=1 previews the launched look without editing the data file */
  var isProto = S.prototype && !/[?&]live=1/.test(location.search);
  if (!isProto) {
    document.documentElement.classList.add("live");
  } else {
    var robots = document.createElement("meta");
    robots.name = "robots"; robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
  }

  /* Booking mode — "phone" until a hosted service is chosen, then "online" */
  var B = S.booking || { mode: "phone" };
  var online = B.mode === "online" && !!B.onlineUrl;
  var bookHref = online ? B.onlineUrl : S.contact.phoneHref;
  window.SITE_BOOK = { online: online, href: bookHref, label: online ? "Reserve" : "Call to reserve" };

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
    var times = S.hours.tourTimes.join(" &amp; ");
    tourRows.innerHTML = online
      ? '<div class="row"><span class="when">' + times + '</span><span class="what">Guided tour of the museum<small>1809 warehouse, wine cellar &amp; Ziegler Log House</small></span>' +
        '<span class="seats">Reserve ahead</span><span class="act"><a class="btn" href="' + bookHref + '">Reserve</a></span></div>'
      : '<div class="row"><span class="when">' + times + '</span><span class="what">Guided tour of the museum<small>1809 warehouse, wine cellar &amp; Ziegler Log House · about an hour</small></span>' +
        '<span class="seats">Just turn up</span><span class="act"></span></div>';
  }

  /* Hours + admission blocks read from data, so prices live in exactly one place */
  var hd = document.getElementById("hoursDays"), hn = document.getElementById("hoursNote");
  if (hd) hd.textContent = S.hours.days + ", " + S.hours.hoursShort;
  if (hn) hn.textContent = S.hours.note;
  document.querySelectorAll(".ft-days").forEach(function (el) { el.textContent = S.hours.days + ", " + S.hours.hoursShort; });
  document.querySelectorAll(".ft-note").forEach(function (el) { el.textContent = S.hours.note; });
  var al = document.getElementById("admissionLine");
  if (al) al.textContent = S.admission.filter(function (p) { return p[0] !== "Ages 18–64"; })
    .map(function (p) { return p[0].replace("Ages ", "ages ").replace("and up", "and up") + " " + p[1]; }).join(" · ");
  var adm = document.getElementById("admission");
  if (adm) {
    adm.innerHTML = S.admission.map(function (p) {
      return '<div class="price"><span>' + p[0] + "</span><span>" + p[1] + "</span></div>";
    }).join("");
  }
  var on = document.getElementById("onlineNote");
  if (on) {
    on.innerHTML = online
      ? '<a href="' + bookHref + '" style="color:var(--madder)">Reserve online</a> — ' +
        S.onlinePricing.map(function (p) { return p[0] + " " + p[1]; }).join(" · ") + "."
      : 'Reserve a place by phone: <a href="' + S.contact.phoneHref + '" style="color:var(--madder)">' + S.contact.phone + "</a>.";
  }

  /* Featured Instagram post — official embed, loaded only when the visitor clicks */
  var feat = document.getElementById("featured"), post = (S.featured || [])[0];
  if (feat && post && post.url) {
    feat.hidden = false;
    var when = new Date(post.date + "T12:00:00");
    document.getElementById("featLbl").textContent = "Seen on Instagram · " +
      new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(when);
    document.getElementById("featTitle").textContent = post.title;
    document.getElementById("featBlurb").textContent = post.blurb;
    document.getElementById("featBy").textContent = "Filmed by " + post.by;
    document.getElementById("featLink").href = post.url;
    document.getElementById("reelPlay").addEventListener("click", function () {
      var reel = document.getElementById("reel");
      reel.insertAdjacentHTML("beforeend",
        '<blockquote class="instagram-media" data-instgrm-permalink="' + post.url +
        '" data-instgrm-version="14" style="width:100%"><a href="' + post.url + '">View this post on Instagram</a></blockquote>');
      reel.classList.add("loaded");
      if (window.instgrm) { window.instgrm.Embeds.process(); return; }
      var sc = document.createElement("script");
      sc.async = true; sc.src = "https://www.instagram.com/embed.js";
      document.body.appendChild(sc);
    });
  }

  /* Mobile menu toggle — any .menuBtn opens the nav named in its aria-controls */
  document.querySelectorAll(".menuBtn").forEach(function (mb) {
    var nav = document.getElementById(mb.getAttribute("aria-controls"));
    if (!nav) return;
    mb.addEventListener("click", function () {
      mb.setAttribute("aria-expanded", String(nav.classList.toggle("open")));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { nav.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); mb.focus(); }
    });
  });

  /* Newsletter band — shown only if the museum turns public signup on (it's a members' perk for now) */
  var band = document.getElementById("newsletterBand"), NL = S.newsletter || {};
  if (band) {
    if (!NL.publicSignup) { band.hidden = true; }
    else {
      var nl = document.getElementById("newsletter");
      if (NL.formAction) nl.action = NL.formAction;
      nl.addEventListener("submit", function (e) {
        if (NL.formAction) return;
        e.preventDefault();
        var fine = document.querySelector(".band .fine");
        if (fine) fine.textContent = "Signup isn't connected yet — email the museum to be added to the list.";
      });
    }
  }

  /* Shop nav links disappear while the shop page is on hold */
  if (!S.shop || S.shop.mode === "off") {
    document.querySelectorAll('a[href="shop.html"]').forEach(function (a) { a.hidden = true; });
  }

  window.SITE_TODAY = today; /* booking page reuses the same date override */
})();
