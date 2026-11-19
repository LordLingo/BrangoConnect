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
