'use client'

import ResponsiveMaskDef from '@/components/icons/ResponsiveMaskDef'
import {useViewportMaskRatio} from '@/lib/hooks'
import {DEFAULT_RX_BOTTOM, DEFAULT_RX_TOP, DEFAULT_RATIO} from '@/lib/responsiveMaskPath'
import {cn} from '@/lib/utils'
import {useId} from 'react'
import type {CSSProperties, ReactNode} from 'react'

export type ResponsiveMaskRatios = {
  wide: number
  mid: number
  tall: number
}

/**
 * Clips children to the responsive ornament mask shape.
 * Use `object-cover` on images/video so media fills the masked area.
 */
export default function ResponsiveMask({
  ratio = DEFAULT_RATIO,
  ratios,
  rxTop = DEFAULT_RX_TOP,
  rxBottom = DEFAULT_RX_BOTTOM,
  className,
  style,
  children,
}: {
  ratio?: number
  /** Viewport aspect-ratio breakpoints: wide (>5:4), mid (4:5–5:4), tall (<4:5) */
  ratios?: ResponsiveMaskRatios
  rxTop?: number
  rxBottom?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  const clipId = useId().replace(/:/g, '')
  const viewportRatio = useViewportMaskRatio(
    ratios ?? {wide: ratio, mid: ratio, tall: ratio},
  )
  const activeRatio = ratios ? viewportRatio : ratio

  return (
    <>
      <ResponsiveMaskDef
        id={clipId}
        ratio={activeRatio}
        rxTop={rxTop}
        rxBottom={rxBottom}
      />
      <div
        className={cn('relative w-full', className)}
        style={{
          aspectRatio: activeRatio,
          clipPath: `url(#${clipId})`,
          ...style,
        }}
      >
        {children}
      </div>
    </>
  )
}
