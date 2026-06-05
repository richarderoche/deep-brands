import 'chroma-js/src/io/hex/index.js'
import contrast from 'chroma-js/src/utils/contrast.js'

export function isDark(hex?: string): boolean {
  if (!hex) return false
  const blue800 = '#1d2533'
  const offwhite = '#f9f7f3'
  const contrastWithBlue = contrast(hex, blue800)
  const contrastWithOffwhite = contrast(hex, offwhite)
  return contrastWithOffwhite > contrastWithBlue
}
