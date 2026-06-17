'use client'

import {cn} from '@/lib/utils'
import {StickyImages} from '@/sanity.types'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/all'
import {useRef} from 'react'
import {Image} from 'sanity'
import ImageBasic from '../shared/ImageBasic'

gsap.registerPlugin(ScrollTrigger)

export default function PbStickyImages({images: _images}: {images?: StickyImages}) {
  const pinRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const pinEl = pinRef.current
      const triggerEl = pinEl?.closest('section[data-pb-section="pbSectionGroup"]') as HTMLElement
      if (!pinEl || !triggerEl) return

      const syncPinWidth = () => {
        gsap.set(pinEl, {width: triggerEl.offsetWidth})
      }

      syncPinWidth()

      ScrollTrigger.create({
        trigger: triggerEl,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinEl,
        pinSpacing: false,
        invalidateOnRefresh: true,
        onRefresh: syncPinWidth,
        markers: false,
      })
    },
    {scope: pinRef},
  )

  return (
    <div ref={pinRef} className="pointer-events-none z-0 h-svh w-full min-w-full" aria-hidden>
      <div className="relative h-full w-full">
        {_images?.topLeft && <StickyImage img={_images.topLeft} x="left" y="top" />}
        {_images?.topRight && <StickyImage img={_images.topRight} x="right" y="top" />}
        {_images?.bottomLeft && <StickyImage img={_images.bottomLeft} x="left" y="bottom" />}
        {_images?.bottomRight && <StickyImage img={_images.bottomRight} x="right" y="bottom" />}
      </div>
    </div>
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
