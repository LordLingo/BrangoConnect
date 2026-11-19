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

  Array.prototype.forEach.call(document.querySelectorAll('form.js-lead-form'), function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      var status = form.querySelector('.form-status');
      var original = button ? button.innerHTML : '';
      if (button) { button.disabled = true; button.textContent = 'Sending…'; }
      if (status) { status.className = 'form-status'; status.textContent = ''; }
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
