/* Campaign-look pages: analytics events and the one short form.
   - Any link with data-analytics="name" reports a click to Vercel Web Analytics.
   - Any video with data-analytics reports its first play.
   - A form with class js-lead-form posts to its action and then goes to its data-next page. */
(function () {
  'use strict';
  function send(name, extra) {
    if (!name || typeof window.va !== 'function') return;
    var data = { page: location.pathname };
    if (extra) for (var k in extra) data[k] = extra[k];
    window.va('event', { name: name, data: data });
  }
  /* Tagged arrivals (short links such as /numbers add utm_source). Reported once per page load
     so LinkedIn clicks can be told apart from direct visits. */
  try {
    var src = new URLSearchParams(location.search).get('utm_source');
    if (src) send('arrive-' + src.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 24));
  } catch (e) {}

  /* Where this visitor first came from, kept for 30 days in this browser only, so a sign-up a few
     pages (or days) later still says which email, post or forward brought them. First touch wins:
     a later visit doesn't overwrite it. utm tags if the link had them, else the other site that
     linked here. Nothing personal, and the browser may refuse storage: then it's just this visit. */
  var ORIGIN_KEY = 'bc_origin', ORIGIN_DAYS = 30;
  var origin = (function () {
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(ORIGIN_KEY) || 'null'); } catch (e) {}
    if (saved && saved.t && Date.now() - saved.t < ORIGIN_DAYS * 86400000) return saved;
    var now = null;
    try {
      var q = new URLSearchParams(location.search);
      var ref = document.referrer && new URL(document.referrer);
      var external = ref && ref.hostname.replace(/^www\./, '') !== location.hostname.replace(/^www\./, '');
      if (q.get('utm_source')) {
        now = { s: q.get('utm_source'), m: q.get('utm_medium') || '', c: q.get('utm_campaign') || '', r: external ? ref.href : '' };
      } else if (external) {
        now = { s: '', m: '', c: '', r: ref.href };
      }
    } catch (e) {}
    if (!now) return null;
    now.t = Date.now();
    try { localStorage.setItem(ORIGIN_KEY, JSON.stringify(now)); } catch (e) {}
    return now;
  })();
  /** One readable line for the form's email, e.g. "email / cold / brango-staffing" or "linkedin.com". */
  function originLabel() {
    if (!origin) return '';
    if (origin.s) return [origin.s, origin.m, origin.c].filter(Boolean).join(' / ');
    try { return new URL(origin.r).hostname.replace(/^www\./, ''); } catch (e) { return ''; }
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('a[data-analytics]') : null;
    if (el) send(el.getAttribute('data-analytics'));
  });
  Array.prototype.forEach.call(document.querySelectorAll('video[data-analytics]'), function (v) {
    v.addEventListener('play', function () { send(v.getAttribute('data-analytics') + '-play'); }, { once: true });
  });
  /* Next webinar date. First one is Monday 30 Nov 2026, then every 14 days, 1:00 PM Central.
     Rolls to the following date once the 2 PM Central hour starts on a webinar day. */
  (function () {
    var slots = document.querySelectorAll('[data-next-webinar]');
    if (!slots.length || !window.Intl) return;
    try {
      var parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', hour12: false }).formatToParts(new Date());
      var now = {};
      parts.forEach(function (p) { now[p.type] = parseInt(p.value, 10); });
      var today = Date.UTC(now.year, now.month - 1, now.day);
      var next = Date.UTC(2026, 10, 30);
      var step = 14 * 86400000;
      while (next < today || (next === today && now.hour % 24 >= 14)) next += step;
      var label = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric' }).format(new Date(next));
      Array.prototype.forEach.call(slots, function (el) { el.textContent = label + ' at 1:00 PM Central'; });
    } catch (e) { /* keep the fallback text */ }
  })();

  /* Phone menu: a button that opens the header links on small screens. */
  (function () {
    var head = document.querySelector('.cp-head');
    var nav = head && head.querySelector('.cp-nav');
    if (!nav) return;
    if (!nav.id) nav.id = 'cp-nav';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cp-menu-btn';
    btn.setAttribute('aria-controls', nav.id);
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Menu');
    btn.innerHTML = '<svg class="bars" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg><svg class="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    nav.parentNode.appendChild(btn);
    head.classList.add('has-menu');
    function set(open) {
      head.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    }
    btn.addEventListener('click', function () { set(!head.classList.contains('is-open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && head.classList.contains('is-open')) { set(false); btn.focus(); } });
    document.addEventListener('click', function (e) { if (head.classList.contains('is-open') && !head.contains(e.target)) set(false); });
    nav.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('a')) set(false); });
  })();

  /* Rep calculator (Go Independent). Job income vs owning the same book at 50% profit,
     and what that book is worth at 4X yearly profit. All from the visitor's own numbers. */
  var calcMath = function (income, book, years) {
    var own = Math.round(book * 0.5);
    return { job: income, own: own, month: Math.round(own / 12), gap: own - income,
             jobTotal: income * years, ownTotal: own * years, sale: own * 4 };
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = { calcMath: calcMath };
  (function () {
    var root = document.querySelector('[data-calc]');
    if (!root) return;
    var money = function (n) { return (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
    var digits = function (v) { var n = parseInt(String(v).replace(/[^0-9]/g, ''), 10); return isNaN(n) ? 0 : Math.min(n, 99999999); };
    var q = function (sel) { return root.querySelectorAll(sel); };
    var text = function (key, value) { Array.prototype.forEach.call(q('[data-calc="' + key + '"]'), function (el) { el.textContent = value; }); };
    var field = function (name) { return root.querySelector('[data-calc-input="' + name + '"]'); };
    var range = function (name) { return root.querySelector('[data-calc-range="' + name + '"]'); };
    var used = false;
    function render() {
      var years = parseInt(range('years').value, 10) || 1;
      var r = calcMath(digits(field('income').value), digits(field('book').value), years);
      var top = Math.max(r.job, r.own, 1);
      root.querySelector('[data-calc-bar="job"]').style.width = (r.job / top * 100).toFixed(2) + '%';
      root.querySelector('[data-calc-bar="own"]').style.width = (r.own / top * 100).toFixed(2) + '%';
      text('job', money(r.job)); text('own', money(r.own)); text('month', money(r.month));
      text('gap', money(Math.abs(r.gap)));
      text('gap-label', r.gap > 0 ? 'more a year as the owner.' : r.gap < 0 ? 'more a year in the job, at this size. The gap closes as the book grows.' : 'difference at this size.');
      text('years', years + (years === 1 ? ' year' : ' years')); text('years-out', String(years));
      text('job-total', money(r.jobTotal)); text('own-total', money(r.ownTotal)); text('sale', money(r.sale));
    }
    function touched() { if (!used) { used = true; send('calc-use'); } }
    ['income', 'book'].forEach(function (name) {
      var f = field(name), s = range(name);
      f.addEventListener('input', function () {
        var n = digits(f.value);
        f.value = n ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
        s.value = Math.max(+s.min, Math.min(+s.max, n));
        touched(); render();
      });
      s.addEventListener('input', function () { f.value = money(+s.value).slice(1); touched(); render(); });
    });
    range('years').addEventListener('input', function () { touched(); render(); });
    render();
  })();

  /* Copy of the lead for BrangoCRM, so it lands in the right pipeline. Best effort:
     the form itself still goes to Formspree, and a CRM failure never blocks the visitor. */
  function toCrm(form) {
    try {
      var val = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value : ''; };
      var lead = {
        form: /webinar/i.test(val('source')) ? 'webinar' : /one-to-one/i.test(val('source')) ? 'demo' : 'question',
        name: val('name'), email: val('email'), phone: val('phone'),
        i_am: val('i_am'), message: val('message'), _gotcha: val('_gotcha'), page: location.pathname
      };
      if (origin) {
        lead.utm_source = origin.s || undefined;
        lead.utm_medium = origin.m || undefined;
        lead.utm_campaign = origin.c || undefined;
        lead.referrer = origin.r || undefined;
      }
      fetch('https://www.brangocrm.com/api/intake', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead), keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  Array.prototype.forEach.call(document.querySelectorAll('form.js-lead-form'), function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      var status = form.querySelector('.form-status');
      var original = button ? button.innerHTML : '';
      if (button) { button.disabled = true; button.textContent = 'Sending…'; }
      if (status) { status.className = 'form-status'; status.textContent = ''; }
      toCrm(form);
      var data = new FormData(form);
      var cameFrom = originLabel();
      if (cameFrom) data.append('came_from', cameFrom);
      fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (response) {
          if (!response.ok) throw new Error('Form submission failed');
          var source = form.querySelector('[name="source"]');
          send('apply-submit', { source: source ? source.value : '' });
          window.location.href = form.getAttribute('data-next') || 'thank-you.html';
        })
        .catch(function () {
          if (status) {
            status.className = 'form-status error';
            status.innerHTML = 'We could not send the form. Please try again or email <a href="mailto:info@brangoconnect.com">info@brangoconnect.com</a>.';
          }
          if (button) { button.disabled = false; button.innerHTML = original; }
        });
    });
  });
})();
