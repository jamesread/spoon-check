let t=[];async function e(){let e=await caches.open("");await e.addAll(t)}async function a(){let t=await caches.keys();await Promise.all(t.map(t=>""!==t&&caches.delete(t)))}async function n(t){t.request.url.startsWith(self.location.origin)&&t.respondWith(caches.match(t.request).then(e=>e||caches.open("runtime").then(e=>fetch(t.request).then(a=>e.put(t.request,a.clone()).then(()=>a)))))}addEventListener("install",t=>t.waitUntil(e())),addEventListener("activate",t=>t.waitUntil(a())),addEventListener("fetch",t=>t.waitUntil(n(t)));
//# sourceMappingURL=sw.e92fbbfd.js.map