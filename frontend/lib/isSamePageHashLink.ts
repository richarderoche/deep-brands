export function normalizePath(path: string) {
  if (!path || path === '/') return '/'
  return path.endsWith('/') ? path.slice(0, -1) : path
}

export function isSamePageHashLink(href: string, pathname: string) {
  const hashIndex = href.indexOf('#')
  if (hashIndex === -1) return false

  const pathPart = href.slice(0, hashIndex) || pathname
  return normalizePath(pathPart) === normalizePath(pathname)
}
