export function isWebKit() {
  if (typeof navigator === 'undefined') return false

  const ua = navigator.userAgent

  return (
    /Apple/.test(navigator.vendor) &&
    !/CriOS|FxiOS|EdgiOS|Chrome|Chromium|Edg\//.test(ua)
  )
}
