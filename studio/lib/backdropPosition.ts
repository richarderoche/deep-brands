export const BACKDROP_POSITIONS = [
  {title: 'Top Left', value: 'top left'},
  {title: 'Top Center', value: 'top center'},
  {title: 'Top Right', value: 'top right'},
  {title: 'Center Left', value: 'center left'},
  {title: 'Center Center', value: 'center center'},
  {title: 'Center Right', value: 'center right'},
  {title: 'Bottom Left', value: 'bottom left'},
  {title: 'Bottom Center', value: 'bottom center'},
  {title: 'Bottom Right', value: 'bottom right'},
] as const

export type BackdropPosition = (typeof BACKDROP_POSITIONS)[number]['value']

export const DEFAULT_BACKDROP_POSITION: BackdropPosition = 'center center'
