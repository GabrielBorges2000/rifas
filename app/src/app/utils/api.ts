export function api(path: string, init?: RequestInit) {
  const baseUrl = 'http://localhost:3333'
  const url = new URL(path, baseUrl)

  return fetch(url, init)
}
