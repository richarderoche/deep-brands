export const REF_WIDTH = 375
export const REF_HEIGHT = 568
export const TOP_H = 46
export const BOT_H = 22
/** Overlap at ornament seams to avoid subpixel gaps after clip-path scaling */
export const SEAM_OVERLAP = 1
export const DEFAULT_RX_TOP = 18
export const DEFAULT_RX_BOTTOM = 36
export const DEFAULT_RATIO = REF_WIDTH / REF_HEIGHT
export const VIEWPORT_WIDE_ASPECT = 5 / 4
export const VIEWPORT_TALL_ASPECT = 4 / 5
export const HERO_SHAPE_LANDSCAPE_RATIO = 3 / 2
export const HERO_SHAPE_MID_RATIO = 1
export const HERO_SHAPE_PORTRAIT_RATIO = 5 / 8

export const TOP_ORNAMENT_PATH =
  'M184.705 0.236479C184.107 0.096484 183.503 0.0202516 182.889 0.00339768L182.625 0C182.473 0 182.335 0.00128632 182.202 0.00543629C181.28 0.0342696 180.635 0.195502 177.695 0.931209L177.633 0.946594C175.986 1.35715 173.354 2.03167 170.163 2.90842C164.522 4.46014 155.991 6.96527 147.432 10.0687C137.519 13.6662 129.518 17.3476 123.654 21.0147C119.667 23.5057 116.617 25.9971 114.327 28.6343C113.496 29.5901 112.772 30.5617 112.146 31.5448C112.056 31.6853 111.969 31.8264 111.883 31.9674C111.427 31.8839 110.974 31.8029 110.523 31.7248C104.221 30.6324 98.5205 30.0751 93.0844 30.0056C92.6963 30.0006 92.3095 29.9981 91.924 29.9981C91.5043 29.9981 91.0857 30.0007 90.6689 30.007C84.4167 30.1007 78.5001 30.8973 73.0744 32.3847C66.5259 34.173 60.4448 37.0259 54.9993 40.853C50.1823 44.2348 45.8118 45.9536 42 45.9536L323.249 45.9604C319.438 45.9603 315.068 44.2415 310.251 40.8598C304.805 37.0328 298.725 34.1867 292.176 32.3915C286.389 30.8049 280.043 30.0049 273.327 30.0049C267.155 30.0049 260.67 30.6382 253.367 31.9742C252.69 30.8401 251.873 29.7266 250.924 28.6411C248.634 26.0038 245.583 23.5126 241.596 21.0215C235.732 17.3544 227.732 13.6736 217.818 10.0762C201.759 4.24886 185.969 0.533819 184.758 0.248803L184.705 0.236479Z'

export const BOTTOM_ORNAMENT_PATH =
  'M308.216 553.197C310.276 551.261 311.907 548.863 313 546.069C312.529 545.955 63.0244 546 63 546.076C66.1021 554.023 73.5501 558.767 82.9149 558.767C88.3674 558.767 92.4151 557.919 96.6878 557.024L96.7867 557.003C103.657 555.551 112.21 553.752 133.237 553.752C148.213 553.752 160.798 557.17 168.721 560.039C177.071 563.063 182.179 566.141 182.637 566.417L182.659 566.43C184.29 567.472 186.141 568 188 568C189.858 568 191.71 567.479 193.341 566.43C193.772 566.155 214.293 553.752 242.756 553.752C263.749 553.752 272.308 555.552 279.173 556.996L279.205 557.003C283.515 557.913 287.583 558.767 293.077 558.767C299.153 558.767 304.418 556.77 308.216 553.197Z'

const BEZIER_K = 0.5522847498

export function roundedRectPath(
  x: number,
  y: number,
  w: number,
  h: number,
  rxTop: number,
  rxBottom: number,
): string {
  const rt = Math.min(Math.max(0, rxTop), w / 2, h / 2)
  const rb = Math.min(Math.max(0, rxBottom), w / 2, h / 2)
  const x2 = x + w
  const y2 = y + h

  return [
    `M${x} ${y + rt}`,
    `C${x} ${y + rt * (1 - BEZIER_K)} ${x + rt * (1 - BEZIER_K)} ${y} ${x + rt} ${y}`,
    `H${x2 - rt}`,
    `C${x2 - rt * (1 - BEZIER_K)} ${y} ${x2} ${y + rt * (1 - BEZIER_K)} ${x2} ${y + rt}`,
    `V${y2 - rb}`,
    `C${x2} ${y2 - rb * (1 - BEZIER_K)} ${x2 - rb * (1 - BEZIER_K)} ${y2} ${x2 - rb} ${y2}`,
    `H${x + rb}`,
    `C${x + rb * (1 - BEZIER_K)} ${y2} ${x} ${y2 - rb * (1 - BEZIER_K)} ${x} ${y2 - rb}`,
    `V${y + rt}`,
    'Z',
  ].join('')
}

function isYArg(command: string, argIndex: number) {
  const c = command.toUpperCase()
  if (c === 'V') return true
  if (c === 'H') return false
  if (c === 'C') return argIndex % 6 === 1 || argIndex % 6 === 3 || argIndex % 6 === 5
  if (c === 'S' || c === 'Q') return argIndex % 4 === 1 || argIndex % 4 === 3
  if (c === 'A') return argIndex % 7 === 6
  if (c === 'M' || c === 'L' || c === 'T') return argIndex % 2 === 1
  return false
}

function isXArg(command: string, argIndex: number) {
  const c = command.toUpperCase()
  if (c === 'H') return true
  if (c === 'V') return false
  if (c === 'C') return argIndex % 6 === 0 || argIndex % 6 === 2 || argIndex % 6 === 4
  if (c === 'S' || c === 'Q') return argIndex % 4 === 0 || argIndex % 4 === 2
  if (c === 'A') return argIndex % 7 === 5
  if (c === 'M' || c === 'L' || c === 'T') return argIndex % 2 === 0
  return false
}

function offsetPathAxis(d: string, delta: number, axis: 'x' | 'y') {
  if (delta === 0) return d

  const isAxisArg = axis === 'x' ? isXArg : isYArg
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) ?? []
  const out: string[] = []
  let command = ''
  let argIndex = 0

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (/^[a-zA-Z]$/.test(token)) {
      command = token
      out.push(token)
      argIndex = 0
      continue
    }

    let num = parseFloat(token)
    if (isAxisArg(command, argIndex)) num += delta
    out.push(String(num))
    argIndex++
  }

  return out.join(' ')
}

export function offsetPathY(d: string, dy: number) {
  return offsetPathAxis(d, dy, 'y')
}

export function offsetPathX(d: string, dx: number) {
  return offsetPathAxis(d, dx, 'x')
}

function getPathXCenter(d: string) {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) ?? []
  let command = ''
  let argIndex = 0
  let min = Infinity
  let max = -Infinity

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (/^[a-zA-Z]$/.test(token)) {
      command = token
      argIndex = 0
      continue
    }

    if (isXArg(command, argIndex)) {
      const num = parseFloat(token)
      min = Math.min(min, num)
      max = Math.max(max, num)
    }
    argIndex++
  }

  return (min + max) / 2
}

export function buildResponsiveMaskPaths({
  ratio,
  rxTop = DEFAULT_RX_TOP,
  rxBottom = DEFAULT_RX_BOTTOM,
}: {
  ratio: number
  rxTop?: number
  rxBottom?: number
}): {
  width: number
  height: number
  paths: string[]
} {
  const width = REF_WIDTH
  const height = REF_WIDTH / ratio
  const middleY = TOP_H - SEAM_OVERLAP
  const middleHeight = Math.max(1, height - TOP_H - BOT_H + SEAM_OVERLAP * 2)
  const middlePath = roundedRectPath(0, middleY, width, middleHeight, rxTop, rxBottom)
  const bottomOrnamentOffsetY = height - REF_HEIGHT
  const topOrnamentOffsetX = width / 2 - getPathXCenter(TOP_ORNAMENT_PATH)

  return {
    width,
    height,
    paths: [
      middlePath,
      offsetPathX(TOP_ORNAMENT_PATH, topOrnamentOffsetX),
      offsetPathY(BOTTOM_ORNAMENT_PATH, bottomOrnamentOffsetY),
    ],
  }
}
