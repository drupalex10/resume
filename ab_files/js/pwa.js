if ('serviceWorker' in navigator) {
  (function() {
    try {
      var swUrl = '/sw.js';

      navigator.serviceWorker.register(swUrl, { updateViaCache: 'none' }).then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        if (registration && registration.update) {
          registration.update().catch(function(){});
        }
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });

      // Reload the page once when a new SW takes control
      var refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', function() {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });

      // Clean up any old registrations using versioned script URLs
      if (navigator.serviceWorker.getRegistrations) {
        navigator.serviceWorker.getRegistrations().then(function(regs) {
          regs.forEach(function(reg) {
            try {
              var active = reg.active;
              if (!active) return;
              var url = new URL(active.scriptURL);
              if (url.origin === window.location.origin && !url.pathname.endsWith('/sw.js')) {
                reg.unregister();
              }
            } catch (e) {}
          });
        });
      }
    } catch (e) {
      console.log('ServiceWorker bootstrap error:', e);
    }
  })();
}


