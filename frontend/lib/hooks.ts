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

export function useViewportMaskRatio(ratios: { wide: number; mid: number; tall: number }) {
  const isWide = useMediaQuery('(min-aspect-ratio: 5/4)')
  const isTall = useMediaQuery('(max-aspect-ratio: 4/5)')

  if (isWide) return ratios.wide
  if (isTall) return ratios.tall
  return ratios.mid
}

export function usePrefersReducedMotion() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  return prefersReducedMotion
}
