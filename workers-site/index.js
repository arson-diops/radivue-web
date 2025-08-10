addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Serve static assets from the public/ directory
  return await fetch(request)
}
