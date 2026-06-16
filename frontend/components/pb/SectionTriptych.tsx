'use client'

import '@/app/css/embla.css'
import {usePrefersReducedMotion} from '@/lib/hooks'
import {cn, imgSizesFormat} from '@/lib/utils'
import {PbTriptych} from '@/sanity.types'
import Accessibility from 'embla-carousel-accessibility'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import useEmblaCarousel from 'embla-carousel-react'
import {useEffect, useMemo, useState} from 'react'
import {useAccessibility} from '../embla/EmblaAccessibility'
import SiteWidth from '../shared/SiteWidth'
import {ImageBlock} from './PbBlocks'

type TriptychImage = NonNullable<NonNullable<PbTriptych['images']>[number]>
type TriptychCarouselMode = 'carouselSingles' | 'carouselGroups'

function TriptychImage({
  image,
  priority = false,
  fetchPriority,
  loading,
}: {
  image: TriptychImage
  priority?: boolean
  fetchPriority?: 'high' | 'low' | 'auto'
  loading?: 'eager' | 'lazy'
}) {
  return (
    <ImageBlock
      block={{
        image,
        imageMaskType: 'notches',
        disableCorners: true,
        imageWidth: 100,
        imageCrop: 0.8,
        priority,
        fetchPriority,
        loading,
      }}
      trueSizes={imgSizesFormat(48, 30)}
    />
  )
}

function TriptychCarousel({
  images,
  mode,
  isFirst,
}: {
  images: TriptychImage[]
  mode: TriptychCarouselMode
  isFirst: boolean
}) {
  /* Duration is not in milliseconds because Embla uses an attraction physics simulation when scrolling instead of easings. Only values between 20-60 are recommended. */
  const SLIDE_ANIMATION_DURATION = 25
  const AUTOPLAY_DELAY = 3500

  const isGroups = mode === 'carouselGroups'
  const prefersReducedMotion = usePrefersReducedMotion()

  const useFade = isGroups || !!prefersReducedMotion
  const slidesToScroll = useFade ? 3 : 1
  const align: 'center' | 'start' = prefersReducedMotion && !isGroups ? 'center' : 'start'

  const slideCount = images.length
  const [selectedSnap, setSelectedSnap] = useState(0)

  const plugins = useMemo(() => {
    const carouselPlugins = [
      Autoplay({delay: AUTOPLAY_DELAY}),
      Accessibility({
        announceChanges: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      }),
    ]

    return useFade ? [Fade(), ...carouselPlugins] : carouselPlugins
  }, [AUTOPLAY_DELAY, useFade])

  const emblaOptions = useMemo(
    () => ({
      loop: true,
      align,
      slidesToScroll,
      duration: SLIDE_ANIMATION_DURATION,
      containScroll: false as const,
    }),
    [align, slidesToScroll],
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, plugins)

  useAccessibility(emblaApi)

  useEffect(() => {
    if (!emblaApi) return

    const updateSelectedSnap = () => {
      setSelectedSnap(emblaApi.selectedSnap())
    }

    emblaApi.on('reinit', updateSelectedSnap)
    emblaApi.on('select', updateSelectedSnap)
    emblaApi.on('scroll', updateSelectedSnap)
    updateSelectedSnap()

    emblaApi.plugins().autoplay?.play()
  }, [emblaApi])

  const isFeatured = (index: number) => {
    if (isGroups) {
      return index % 3 === 1
    }

    if (prefersReducedMotion) {
      return false
    }

    const snap = ((selectedSnap % slideCount) + slideCount) % slideCount
    const center = (snap + 1) % slideCount
    return index === center
  }

  return (
    <div className="embla max-md:mx-[-30vw]">
      <div ref={emblaRef} className="embla__viewport">
        <div className="embla__container items-center">
          {images.map((image, index) => (
            <div key={image._key} className="embla__slide basis-1/3">
              <div
                className={cn(
                  !isFeatured(index) && 'scale-90',
                  !useFade && 'transition-transform duration-250',
                )}
              >
                <TriptychImage
                  image={image}
                  loading="eager"
                  fetchPriority={isFirst && index < 3 ? 'high' : 'low'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="embla__live-region" />
    </div>
  )
}

export default function SectionTriptych({
  section,
  isFirst = false,
}: {
  section: PbTriptych
  isFirst?: boolean
}) {
  const {triptychType, images} = section
  const hasImages = images && images.length > 0
  const isStill = hasImages && triptychType === 'still'
  const stillImages = images && images.length > 3 ? images.slice(0, 3) : images
  const isCarouselSingles = triptychType === 'carouselSingles'
  const isCarouselGroups = triptychType === 'carouselGroups'

  if (!hasImages) {
    return null
  }

  return (
    <SiteWidth>
      {isStill && stillImages && (
        <div className="grid grid-cols-3 items-center max-md:mx-[-30vw]">
          {stillImages.map((image) => (
            <div className="first:scale-90 last:scale-90" key={image._key}>
              <TriptychImage image={image} priority={isFirst} />
            </div>
          ))}
        </div>
      )}
      {isCarouselSingles && images && (
        <TriptychCarousel images={images} mode="carouselSingles" isFirst={isFirst} />
      )}
      {isCarouselGroups && images && (
        <TriptychCarousel images={images} mode="carouselGroups" isFirst={isFirst} />
      )}
    </SiteWidth>
  )
}
