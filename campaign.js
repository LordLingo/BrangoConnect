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
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
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
