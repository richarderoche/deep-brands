import ResponsiveMaskDef from '@/components/icons/ResponsiveMaskDef'
import {
  HERO_SHAPE_LANDSCAPE_RATIO,
  HERO_SHAPE_MID_RATIO,
  HERO_SHAPE_PORTRAIT_RATIO,
  HERO_SHAPE_RX_BOTTOM,
  HERO_SHAPE_RX_TOP,
} from '@/lib/responsiveMaskPath'

export const HERO_SHAPE_MASK_IDS = {
  wide: 'hero-shape-wide',
  mid: 'hero-shape-mid',
  tall: 'hero-shape-tall',
} as const

export default function HeroShapeMasks() {
  return (
    <>
      <ResponsiveMaskDef
        id={HERO_SHAPE_MASK_IDS.wide}
        ratio={HERO_SHAPE_LANDSCAPE_RATIO}
        rxTop={HERO_SHAPE_RX_TOP}
        rxBottom={HERO_SHAPE_RX_BOTTOM}
      />
      <ResponsiveMaskDef
        id={HERO_SHAPE_MASK_IDS.mid}
        ratio={HERO_SHAPE_MID_RATIO}
        rxTop={HERO_SHAPE_RX_TOP}
        rxBottom={HERO_SHAPE_RX_BOTTOM}
      />
      <ResponsiveMaskDef
        id={HERO_SHAPE_MASK_IDS.tall}
        ratio={HERO_SHAPE_PORTRAIT_RATIO}
        rxTop={HERO_SHAPE_RX_TOP}
        rxBottom={HERO_SHAPE_RX_BOTTOM}
      />
    </>
  )
}
