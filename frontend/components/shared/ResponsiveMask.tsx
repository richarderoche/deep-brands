'use client'

import ResponsiveMaskDef from '@/components/icons/ResponsiveMaskDef'
import {useViewportMaskBreakpoint} from '@/lib/hooks'
import {DEFAULT_RX_BOTTOM, DEFAULT_RX_TOP, DEFAULT_RATIO} from '@/lib/responsiveMaskPath'
import {cn} from '@/lib/utils'
import {useId} from 'react'
import type {CSSProperties, ReactNode} from 'react'

export type ResponsiveMaskRatios = {
  wide: number
  mid: number
  tall: number
}

export type ResponsiveMaskIds = {
  wide: string
  mid: string
  tall: string
}

/**
 * Clips children to the responsive ornament mask shape.
 * Use `object-cover` on images/video so media fills the masked area.
 *
 * Pass `maskIds` (stable clip-path ids from layout-level mask defs) to avoid
 * a flash of unmasked content during client navigations.
 */
export default function ResponsiveMask({
  ratio = DEFAULT_RATIO,
  ratios,
  maskIds,
  rxTop = DEFAULT_RX_TOP,
  rxBottom = DEFAULT_RX_BOTTOM,
  className,
  style,
  children,
}: {
  ratio?: number
  /** Viewport aspect-ratio breakpoints: wide (>5:4), mid (4:5–5:4), tall (<4:5) */
  ratios?: ResponsiveMaskRatios
  /** Stable clip-path ids registered in the document (e.g. via IconMasks) */
  maskIds?: ResponsiveMaskIds
  rxTop?: number
  rxBottom?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  const dynamicClipId = useId().replace(/:/g, '')
  const breakpoint = useViewportMaskBreakpoint()
  const resolvedRatios = ratios ?? {wide: ratio, mid: ratio, tall: ratio}
  const activeRatio = resolvedRatios[breakpoint]
  const clipId = maskIds ? maskIds[breakpoint] : dynamicClipId

  return (
    <>
      {!maskIds && (
        <ResponsiveMaskDef
          id={dynamicClipId}
          ratio={activeRatio}
          rxTop={rxTop}
          rxBottom={rxBottom}
        />
      )}
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
