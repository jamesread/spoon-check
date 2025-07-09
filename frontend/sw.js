import { manifest, version } from '@parcel/service-worker'

const RUNTIME = 'runtime'

async function install () {
  const cache = await caches.open(version)

  await cache.addAll(manifest)
}

// The activate handler takes care of cleaning up old caches.
async function activate () {
  const keys = await caches.keys()

  await Promise.all(
    keys.map(k => k !== version && caches.delete(k))
  )
}

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
async function swFetch (event) {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response
            })
          })
        })
      })
    )
  }
}

addEventListener('install', e => e.waitUntil(install()))
addEventListener('activate', e => e.waitUntil(activate()))
addEventListener('fetch', e => e.waitUntil(swFetch(e)))
