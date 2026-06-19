export const BACKDROP_POSITIONS = [
  'top left',
  'top center',
  'top right',
  'center left',
  'center center',
  'center right',
  'bottom left',
  'bottom center',
  'bottom right',
] as const

export type BackdropPosition = (typeof BACKDROP_POSITIONS)[number]

export const DEFAULT_BACKDROP_POSITION: BackdropPosition = 'center center'

export function resolveBackdropPosition(value?: string | null): BackdropPosition {
  if (value && BACKDROP_POSITIONS.includes(value as BackdropPosition)) {
    return value as BackdropPosition
  }
  return DEFAULT_BACKDROP_POSITION
}

export function backdropPositionStyle(value?: string | null) {
  return {objectPosition: resolveBackdropPosition(value)}
}
