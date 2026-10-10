const VERSION = 'v2'
const CACHE_PREFIX = 'spoon-check'
const PRECACHE = `${CACHE_PREFIX}-precache-${VERSION}`
const RUNTIME = `${CACHE_PREFIX}-runtime-${VERSION}`
const PRECACHE_URLS = [
  './',
  './index.html',
  './data/icons.json'
]

async function install () {
  const cache = await caches.open(PRECACHE)

  await cache.addAll(PRECACHE_URLS)
  await self.skipWaiting()
}

// The activate handler takes care of cleaning up old caches.
async function activate () {
  const keys = await caches.keys()
  const expectedCaches = [PRECACHE, RUNTIME]

  await Promise.all(
    keys.map(k => {
      if (k.startsWith(CACHE_PREFIX) && !expectedCaches.includes(k)) {
        return caches.delete(k)
      }

      return null
    })
  )

  await clients.claim()
}

async function networkFirst (request) {
  const cache = await caches.open(RUNTIME)

  try {
    const response = await fetch(request)

    if (response.ok) {
      await cache.put(request, response.clone())
    }

    return response
  } catch (err) {
    const cachedResponse = await caches.match(request)

    if (cachedResponse) {
      return cachedResponse
    }

    if (request.mode === 'navigate') {
      return caches.match('./index.html')
    }

    throw err
  }
}

// The fetch handler keeps same-origin resources fresh when online and falls
// back to cached responses when the network is unavailable.
async function swFetch (event) {
  if (event.request.method !== 'GET') {
    return
  }

  const requestUrl = new URL(event.request.url)

  if (requestUrl.origin !== self.location.origin) {
    return
  }

  event.respondWith(networkFirst(event.request))
}

self.addEventListener('install', e => e.waitUntil(install()))
self.addEventListener('activate', e => e.waitUntil(activate()))
self.addEventListener('fetch', swFetch)
