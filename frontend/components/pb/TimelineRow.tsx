'use client'
import {usePrefersReducedMotion} from '@/lib/hooks'
import {cn, imgSizesFormat} from '@/lib/utils'
import {PbTimeline} from '@/sanity.types'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/all'
import {PortableText, PortableTextBlock} from 'next-sanity'
import {useRef} from 'react'
import IconArrow from '../icons/IconArrow'
import {ImageBlock} from './PbBlocks'

gsap.registerPlugin(ScrollTrigger)

export default function TimelineRow({
  row,
  isFirst = false,
  isLast = false,
  rowWidth = 10,
}: {
  isFirst?: boolean
  isLast?: boolean
  row?: NonNullable<PbTimeline['events']>[number]
  rowWidth?: 12 | 10
}) {
  const {year, heading, description, image} = row || {}
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (!ref.current || !row || reducedMotion) return
      gsap.set('.timeline-event-element', {opacity: 0, y: 20})
      gsap.set('.timeline-line', {scaleY: 0})

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          markers: false,
        },
      })
      tl.to(
        '.timeline-line',
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '<',
      )
      tl.to(
        '.timeline-event-element',
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
        },
        '-=0.2',
      )
    },
    {scope: ref, dependencies: [row, reducedMotion]},
  )

  return (
    <div ref={ref} className="flex gap-x-gut-50 md:gap-x-gut-75 group/n">
      <div className="flex-1 group-odd/n:order-last max-md:hidden"></div>

      <div className="w-gut max-md:-ml-gut-50 md:group-odd/n:order-2 relative flex flex-col items-center">
        {isFirst && <BulletPoint />}
        {isLast && <BulletPoint isLast />}
        {!isFirst && <IconArrow className="w-auto h-gut-75 rotate-90 text-blue-600" />}
        <div className="timeline-line w-1 bg-lime-200 h-full my-4 origin-top"></div>
      </div>

      <div className="flex-1">
        {row && (
          <div className="timeline-event grid grid-cols-5 gap-gut md:max-lg:gap-gut-66 py-gut">
            <div
              className={cn(
                'flex flex-col gap-y-gut-33 col-span-3 md:max-lg:col-span-5',
                image ? 'col-span-3' : 'col-span-5',
              )}
            >
              {year && (
                <h3 className="timeline-event-element ts-h6 ts-sans-tall text-blue-900 bg-lime-200 flex w-fit items-center justify-center px-[.4em] py-[.2em] rounded-btn">
                  {year}
                </h3>
              )}
              {heading && (
                <h3 className="timeline-event-element ts-h6 ts-sans-tall text-blue-600">
                  {heading}
                </h3>
              )}
              {description && (
                <div className="timeline-event-element ts-p-xs text-balance">
                  <PortableText value={description as PortableTextBlock[]} />
                </div>
              )}
            </div>
            {image && (
              <div className="timeline-event-element col-span-2 md:max-lg:col-span-3 lg:group-odd/n:order-first shadow-sm">
                <ImageBlock
                  block={{
                    image,
                    imageMaskType: image.notchFrame ? 'notches' : 'none',
                    imageCrop: image.notchFrame ? 1 : 0,
                    disableCorners: true,
                  }}
                  trueSizes={imgSizesFormat(25, 14, rowWidth === 12 ? 16 : 13)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export const BulletPoint = ({isLast = false}: {isLast?: boolean}) => {
  return (
    <div
      className={cn(
        'timeline-bullet-point size-7 bg-blue-600 rounded-full absolute left-1/2 -translate-x-1/2',
        isLast ? '-bottom-4' : '-top-4',
      )}
    ></div>
  )
}
