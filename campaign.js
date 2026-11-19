/* Campaign pages: send booking clicks and video plays to Vercel Web Analytics.
   Any element with data-analytics="name" reports once per click (links) or once per page view (videos). */
(function () {
  'use strict';
  function send(name) {
    if (!name || typeof window.va !== 'function') return;
    window.va('event', { name: name, data: { page: location.pathname } });
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('a[data-analytics]') : null;
    if (el) send(el.getAttribute('data-analytics'));
  });
  Array.prototype.forEach.call(document.querySelectorAll('video[data-analytics]'), function (v) {
    v.addEventListener('play', function () { send(v.getAttribute('data-analytics') + '-play'); }, { once: true });
  });
})();
