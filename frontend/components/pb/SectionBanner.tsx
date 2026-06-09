'use client'
import {isDark} from '@/lib/checkColor'
import {colorValue} from '@/lib/colorValue'
import {usePrefersReducedMotion} from '@/lib/hooks'
import {cn} from '@/lib/utils'
import {PbBanner} from '@/sanity.types'
import {PbBlocksQueryResult} from '@/types'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/all'
import {useRef} from 'react'
import IconOrnamentRight from '../icons/IconOrnamentRight'
import PbBlocks, {ImageBlock} from './PbBlocks'

gsap.registerPlugin(ScrollTrigger)

const TRIGGER_START = 'top 95%'
const BACKDROP_DURATION = 0.8
const BLOCKS_DURATION = 1.3
const BACKDROP_EASE = 'power3.out'
const BLOCKS_EASE = 'expo.out'
const DELAY = 0.2
const STAGGER = 0.15
const BLOCKS_OVERLAP = 0.3

export default function SectionGridSingle({section}: {section: PbBanner}) {
  const {pbBlocks, spaceBetweenBlocks, bgColor, bannerImage, bannerDirection} = section
  const hasBlocks = pbBlocks && pbBlocks.length > 0
  const hasBannerImage = bannerImage && bannerImage.image
  const isOffsetX = bannerImage?.position === 'offsetX'
  const isOffsetXY = bannerImage?.position === 'offsetXY'
  const isOffset = isOffsetX || isOffsetXY
  const isRTL = bannerDirection === 'rtl'
  const bannerColor = colorValue(bgColor)
  const bannerContainerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const isDarkBannerColor =
    (bgColor?.colorType === 'custom' && !!bannerColor && isDark(bannerColor)) ||
    (bgColor?.colorType === 'dark' && !!bannerColor)

  useGSAP(
    () => {
      const el = bannerContainerRef.current
      if (!el) return

      const scrollTrigger = {trigger: el, start: TRIGGER_START, markers: false}
      const blockDistance = reducedMotion ? 0 : 30

      const tl = gsap.timeline({scrollTrigger, delay: DELAY})

      if (!reducedMotion) {
        const slideFrom = isRTL ? window.innerWidth : -window.innerWidth
        tl.fromTo(
          '.banner-backdrop',
          {x: slideFrom},
          {x: 0, duration: BACKDROP_DURATION, ease: BACKDROP_EASE},
        )
      }

      tl.fromTo(
        '.column-blocks > *',
        {y: blockDistance, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: BLOCKS_DURATION,
          ease: BLOCKS_EASE,
          stagger: STAGGER,
        },
        reducedMotion ? 0 : `-=${BACKDROP_DURATION * BLOCKS_OVERLAP}`,
      )
    },
    {scope: bannerContainerRef, dependencies: [isRTL, reducedMotion, hasBlocks]},
  )

  if (!hasBlocks && !hasBannerImage) {
    return null
  }

  return (
    <div className={isOffset ? 'max-w-[2000px] mx-auto' : ''}>
      <div
        className={cn(
          'flex max-lg:flex-col lg:items-center',
          isRTL ? 'flex-row-reverse max-lg:pl-gut-200' : 'max-lg:pr-gut-200',
          isOffset && 'pt-gut-200',
          !isOffset && isRTL && 'max-lg:items-end',
        )}
      >
        <div
          className={cn(
            'relative z-1 shadow-md max-lg:top-gut-150',
            isOffset ? 'md:w-[75vw] lg:w-[40vw]' : 'w-[35vw] lg:w-[30vw]',
            isOffsetXY && 'lg:self-start lg:-top-gut-150',
            isOffset && isRTL && '-right-gut md:max-lg:ml-auto',
            isOffset && !isRTL && '-left-gut',
          )}
        >
          <ImageBlock block={bannerImage} trueSizes="40vw" />
        </div>
        <div ref={bannerContainerRef} className="relative">
          <div
            className={cn(
              'banner-backdrop absolute top-0 w-[200vw] h-full rounded-banner',
              isRTL ? 'left-0' : 'right-0',
            )}
            style={{backgroundColor: bannerColor}}
          >
            <IconOrnamentRight
              style={{color: bannerColor}}
              className={cn('w-gut-150 md:w-gut', !bannerColor && 'text-bg')}
              flip={isRTL}
            />
          </div>
          <div
            className={cn(
              'max-lg:px-gut max-lg:pt-gut-300 pt-gut-200 pb-gut-200 relative z-1',
              isOffset ? 'lg:w-[50vw] lg:px-gut' : 'lg:w-[55vw]',
              !isRTL && 'lg:pr-gut-150',
              isRTL && 'lg:pl-gut-150',
              !isOffset && !isRTL && 'lg:pl-gut-200',
              !isOffset && isRTL && 'lg:pr-gut-200',
              isDarkBannerColor
                ? 'dark-theme theme-vars-only text-body'
                : 'light-theme theme-vars-only text-body',
            )}
          >
            <PbBlocks
              columnBlocks={pbBlocks as PbBlocksQueryResult}
              trueSizes="66vw"
              spaceBetweenBlocks={spaceBetweenBlocks || 'gap-gut'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
