'use client'

import {cn} from '@/lib/utils'
import {PbSectionSettings, StickyImages} from '@/sanity.types'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/all'
import {type ReactNode, useRef} from 'react'
import {Image} from 'sanity'
import ImageBasic from '../shared/ImageBasic'

gsap.registerPlugin(ScrollTrigger)

type SectionMargin = PbSectionSettings['marginTop']

function sectionMarginHeight(multiplier?: SectionMargin) {
  return multiplier ? `calc(var(--gut) * ${multiplier})` : undefined
}

export default function PbStickyImages({
  images,
  marginTop,
  marginBottom,
  children,
}: {
  images?: StickyImages
  marginTop?: SectionMargin
  marginBottom?: SectionMargin
  children: ReactNode
}) {
  const scrollRangeRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const scrollRange = scrollRangeRef.current
      const pinEl = pinRef.current
      if (!scrollRange || !pinEl) return

      ScrollTrigger.create({
        trigger: scrollRange,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinEl,
        pinSpacing: false,
        invalidateOnRefresh: true,
        markers: false,
      })
    },
    {scope: scrollRangeRef, dependencies: [marginTop, marginBottom]},
  )

  return (
    <>
      {marginTop ? (
        <div aria-hidden className="w-full" style={{height: sectionMarginHeight(marginTop)}} />
      ) : null}
      <div ref={scrollRangeRef} className="w-full">
        <div className="grid w-full *:col-start-1 *:row-start-1">
          <div ref={pinRef} className="pointer-events-none z-0 h-svh w-full min-w-full" aria-hidden>
            <div className="relative h-full w-full">
              {images?.topLeft && <StickyImage img={images.topLeft} x="left" y="top" />}
              {images?.topRight && <StickyImage img={images.topRight} x="right" y="top" />}
              {images?.bottomLeft && <StickyImage img={images.bottomLeft} x="left" y="bottom" />}
              {images?.bottomRight && <StickyImage img={images.bottomRight} x="right" y="bottom" />}
            </div>
          </div>
          <div className="relative z-1 w-full">{children}</div>
        </div>
        {marginBottom ? (
          <div aria-hidden className="w-full" style={{height: sectionMarginHeight(marginBottom)}} />
        ) : null}
      </div>
    </>
  )
}

function StickyImage({img, x, y}: {img: Image; x: 'left' | 'right'; y: 'top' | 'bottom'}) {
  return (
    <div
      className={cn(
        'absolute w-1/5 lg:w-3/20 h-1/2',
        x === 'left' ? 'left-0' : 'right-0',
        y === 'top' ? 'top-gut-200 portrait:top-gut-300' : 'bottom-gut-200 portrait:bottom-gut-300',
      )}
    >
      <ImageBasic
        image={img}
        alt=""
        fitTo="manual"
        className={cn('h-full w-full object-contain', getPositionClass(x, y))}
        sizes="15vw"
      />
    </div>
  )
}

function getPositionClass(x: 'left' | 'right', y: 'top' | 'bottom') {
  const position = `${x}-${y}`
  switch (position) {
    case 'left-top':
      return 'object-top-left'
    case 'left-bottom':
      return 'object-bottom-left'
    case 'right-top':
      return 'object-top-right'
    case 'right-bottom':
      return 'object-bottom-right'
    default:
      return ''
  }
}
