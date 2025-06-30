// Service Worker for LimitLoop
// Version 1.0.0

const CACHE_NAME = 'limitloop-v1.0.0';
const STATIC_CACHE_NAME = 'limitloop-static-v1.0.0';

// Files to cache for offline functionality
const STATIC_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon-16.png',
  './icon-32.png', 
  './icon-48.png',
  './icon-72.png',
  './icon-96.png',
  './icon-144.png',
  './icon-192.png',
  './icon-512.png'
];

// External CDN files to cache
const CDN_FILES = [
  'https://unpkg.com/react@18/umd/react.development.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.development.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdn.tailwindcss.com'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache static files
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('📦 Caching static files');
        return cache.addAll(STATIC_FILES.concat(CDN_FILES));
      })
    ]).then(() => {
      console.log('✅ Service Worker installed successfully');
      self.skipWaiting(); // Force activation
    }).catch((error) => {
      console.error('❌ Service Worker installation failed:', error);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker activated');
      return self.clients.claim(); // Take control of all clients
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests
  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache
          return cachedResponse;
        }

        // For external CDN resources, try network first, then cache
        if (url.origin !== location.origin) {
          return fetch(request).then((response) => {
            // Cache successful responses from CDN
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(STATIC_CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          }).catch(() => {
            // If network fails, try to serve from cache
            return caches.match(request);
          });
        }

        // For same-origin requests, network first
        return fetch(request).then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        }).catch(() => {
          // If offline, serve the main page for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          throw error;
        });
      })
    );
  }
});

// Background sync for data persistence
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Perform background sync operations
      syncData()
    );
  }
});

// Handle messages from the main app
self.addEventListener('message', (event) => {
  console.log('📨 Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Function to sync data (can be expanded for future features)
async function syncData() {
  try {
    // Placeholder for future sync functionality
    console.log('📊 Syncing data...');
    return Promise.resolve();
  } catch (error) {
    console.error('❌ Sync failed:', error);
    throw error;
  }
}

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Notification clicked:', event.notification.tag);
  
  event.notification.close();
  
  // Focus or open the app
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (let client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    })
  );
});

// Push notification handler (for future features)
self.addEventListener('push', (event) => {
  console.log('📱 Push notification received');
  
  const options = {
    body: 'Time to take a break from social media!',
    icon: './icon-192.png',
    badge: './icon-72.png',
    tag: 'limitloop-reminder',
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: 'View Stats'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('LimitLoop Reminder', options)
  );
});

console.log('🎯 LimitLoop Service Worker loaded successfully');