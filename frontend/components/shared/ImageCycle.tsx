'use client'

import ImageBasic from '@/components/shared/ImageBasic'
import {usePrefersReducedMotion} from '@/lib/hooks'
import {cn} from '@/lib/utils'
import {ImageCycle as ImageCycleType} from '@/sanity.types'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {useRef} from 'react'

export default function ImageCycle({
  imageCycle,
  sizes,
  startDelay = 0,
  className = '',
  imgClassName = '',
}: {
  imageCycle: ImageCycleType
  sizes: string
  startDelay?: number
  className?: string
  imgClassName?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const images = imageCycle?.images?.filter((image) => image?.asset?._ref) ?? []
  const shouldAnimate = images.length > 1

  useGSAP(
    () => {
      const INTERVAL_MS = 3000
      const TRANSITION_DURATION = 0.5
      const EASE = 'back.out(1)'
      if (!shouldAnimate || !containerRef.current) return

      const slots = containerRef.current.querySelectorAll('[data-image-cycle-slot]')
      if (slots.length < 2) return

      gsap.set(slots, {
        transformOrigin: 'center center',
        opacity: 0,
        scale: reducedMotion ? 1 : 0,
      })
      gsap.set(slots[0], {opacity: 1, scale: 1})

      const outProps = {opacity: 0, ...(reducedMotion ? {} : {scale: 0})}
      const inProps = {opacity: 1, ...(reducedMotion ? {} : {scale: 1})}

      let index = 0
      let waitCall: gsap.core.Tween | undefined
      let activeTimeline: gsap.core.Timeline | undefined

      const transition = () => {
        const current = slots[index]
        const next = slots[(index + 1) % slots.length]

        activeTimeline = gsap
          .timeline({
            onComplete: () => {
              index = (index + 1) % slots.length
              waitCall = gsap.delayedCall(INTERVAL_MS / 1000, transition)
            },
          })
          .to(current, {...outProps, duration: TRANSITION_DURATION, ease: EASE})
          .to(next, {...inProps, duration: TRANSITION_DURATION, ease: EASE}, '<')
      }

      waitCall = gsap.delayedCall((INTERVAL_MS + startDelay) / 1000, transition)

      return () => {
        waitCall?.kill()
        activeTimeline?.kill()
        gsap.killTweensOf(slots)
      }
    },
    {
      scope: containerRef,
      dependencies: [shouldAnimate, reducedMotion, startDelay, images.length],
    },
  )

  if (!images.length) return null

  const carouselLabel = imageCycle.altText?.trim() || 'Product Image Carousel'

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={carouselLabel}
      className={cn('relative h-full w-full', className)}
    >
      {images.map((image, index) => (
        <div
          key={image._key}
          data-image-cycle-slot
          aria-hidden
          className={cn(
            'absolute inset-0 origin-center',
            index !== 0 && shouldAnimate && 'scale-0 opacity-0',
            !shouldAnimate && index !== 0 && 'invisible',
          )}
        >
          <ImageBasic
            image={image}
            alt=""
            fitTo="manual"
            mode="contain"
            className={cn('h-full w-full object-contain', imgClassName)}
            sizes={sizes}
            fetchPriority={index === 0 ? 'high' : 'low'}
          />
        </div>
      ))}
    </div>
  )
}
