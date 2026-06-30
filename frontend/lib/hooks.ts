import { isWebKit } from '@/lib/browser'
import { useMediaQuery } from 'hamo'
import { useEffect } from 'react'

export function useWebKitClass() {
  useEffect(() => {
    document.documentElement.classList.add(isWebKit() ? 'is-webkit' : 'not-webkit')
  }, [])
}

export function useOrientation() {
  const isPortrait = useMediaQuery('(orientation: portrait)')
  const isLandscape = useMediaQuery('(orientation: landscape)')
  return { isPortrait, isLandscape }
}

export type ViewportMaskBreakpoint = 'wide' | 'mid' | 'tall'

export function useViewportMaskBreakpoint(): ViewportMaskBreakpoint {
  const isWide = useMediaQuery('(min-aspect-ratio: 5/4)')
  const isTall = useMediaQuery('(max-aspect-ratio: 4/5)')

  if (isWide) return 'wide'
  if (isTall) return 'tall'
  return 'mid'
}

export function useViewportMaskRatio(ratios: { wide: number; mid: number; tall: number }) {
  const breakpoint = useViewportMaskBreakpoint()
  return ratios[breakpoint]
}

export function usePrefersReducedMotion() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  return prefersReducedMotion
}
