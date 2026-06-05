import type { ColorChoice } from '@/sanity.types'

export function colorValue(color?: ColorChoice | null): string | undefined {
  if (!color?.colorType || color.colorType === 'none') {
    return undefined
  }

  switch (color.colorType) {
    case 'dark':
      return color.colorDark ? `var(${color.colorDark})` : undefined
    case 'light':
      return color.colorLight ? `var(${color.colorLight})` : undefined
    case 'custom':
      return color.colorCustom?.hex ?? undefined
    default:
      return undefined
  }
}
