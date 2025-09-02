// Custom service worker for analytics optimization
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';

// Precache and route for offline functionality
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// Cache Google Analytics requests for offline tracking
registerRoute(
  ({ url }) => url.origin === 'https://www.google-analytics.com',
  new StaleWhileRevalidate({
    cacheName: 'google-analytics',
    plugins: [
      {
        cacheKeyWillBeUsed: async ({ request }) => {
          // Cache analytics requests for offline replay
          return `${request.url}?timestamp=${Date.now()}`;
        },
      },
    ],
  })
);

// Cache Google Tag Manager for faster loading
registerRoute(
  ({ url }) => url.origin === 'https://www.googletagmanager.com',
  new CacheFirst({
    cacheName: 'google-tag-manager',
    plugins: [
      {
        cacheWillUpdate: async ({ response }) => {
          // Only cache successful responses
          return response.status === 200 ? response : null;
        },
      },
    ],
  })
);

// Enhanced analytics tracking in service worker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'ANALYTICS_EVENT') {
    // Queue analytics events for when online
    const { eventName, parameters } = event.data;
    
    // Store event for later if offline
    if (!navigator.onLine) {
      const offlineEvents = JSON.parse(localStorage.getItem('offline_analytics_events') || '[]');
      offlineEvents.push({
        eventName,
        parameters,
        timestamp: Date.now(),
      });
      localStorage.setItem('offline_analytics_events', JSON.stringify(offlineEvents));
    }
  }
});

// Send queued analytics events when back online
self.addEventListener('online', () => {
  const offlineEvents = JSON.parse(localStorage.getItem('offline_analytics_events') || '[]');
  
  if (offlineEvents.length > 0) {
    // Send queued events
    offlineEvents.forEach(({ eventName, parameters }) => {
      if (self.gtag) {
        self.gtag('event', eventName, parameters);
      }
    });
    
    // Clear queued events
    localStorage.removeItem('offline_analytics_events');
  }
});

// Performance monitoring in service worker
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Track slow requests
  const startTime = Date.now();
  
  event.respondWith(
    fetch(request).then((response) => {
      const duration = Date.now() - startTime;
      
      // Track slow requests (> 2 seconds)
      if (duration > 2000) {
        self.postMessage({
          type: 'SLOW_REQUEST',
          url: request.url,
          duration,
        });
      }
      
      return response;
    }).catch((error) => {
      // Track failed requests
      self.postMessage({
        type: 'FAILED_REQUEST',
        url: request.url,
        error: error.message,
      });
      throw error;
    })
  );
});