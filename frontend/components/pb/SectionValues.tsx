'use client'
import {usePrefersReducedMotion} from '@/lib/hooks'
import {cn, getColorStepClass} from '@/lib/utils'
import {PbValues} from '@/sanity.types'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/all'
import {useRef} from 'react'
import {AccordionSection} from '../shared/AccordionSection'
import Card from '../shared/Card'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import {useSanityDataAttribute} from './SanityVisualEditingContext'

gsap.registerPlugin(ScrollTrigger)

export default function SectionValues({section}: {section: PbValues}) {
  const {getDataAttribute} = useSanityDataAttribute()
  const {colorSteps, values} = section
  const hasValues = values && values.length > 0
  const desktopRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      const el = desktopRef.current
      if (!el) return

      const distance = reducedMotion ? 0 : 30

      gsap.fromTo(
        '.value-container',
        {y: distance, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'expo.out',
          stagger: 0.15,
          delay: 0.2,
          scrollTrigger: {trigger: el, start: 'top 95%', markers: false},
        },
      )
    },
    {scope: desktopRef, dependencies: [reducedMotion, hasValues]},
  )

  if (!hasValues) {
    return null
  }

  return (
    <SiteWidth>
      <div className="md:hidden dark-theme theme-vars-only -mx-gut-50 mt-gut-200 mb-gut-50">
        <Card
          outerClassName="shadow-sm h-full"
          innerClassName="h-full flex flex-col"
          bgColor="var(--color-blue-800)"
        >
          <div className={getColorStepClass(colorSteps)}>
            {hasValues &&
              values.map((value) => {
                const {_key, title, caption} = value
                return (
                  <div
                    data-sanity={getDataAttribute(['values', {_key}])}
                    className="rainbow-light-var"
                    key={_key}
                  >
                    <AccordionSection
                      innerId={_key}
                      accordionTitle={title}
                      headingColor="var(--rainbow-light)"
                    >
                      <p className="text-pretty">{caption}</p>
                    </AccordionSection>
                  </div>
                )
              })}
          </div>
        </Card>
      </div>
      <SiteGrid className="max-md:hidden">
        <div
          ref={desktopRef}
          className={cn(
            'col-span-12 flex flex-wrap text-blue-800 text-balance text-center -mx-gut-25',
            values.length < 4 && 'justify-center',
            getColorStepClass(colorSteps),
          )}
        >
          {hasValues &&
            values.map((value) => {
              const {_key, title, caption} = value
              return (
                <div
                  key={_key}
                  data-sanity={getDataAttribute(['values', {_key}])}
                  className="value-container md:basis-1/2 lg:basis-1/4 rainbow-light-var py-gut-200 px-gut-25 odd:-mt-gut even:-mb-gut"
                >
                  <Card
                    outerClassName="shadow-sm h-full"
                    innerClassName="h-full flex flex-col gap-gut-33"
                    bgColor="var(--rainbow-light)"
                  >
                    <h3 className="ts-h6 ts-sans-wide py-gut-25">{title}</h3>
                    <p className="pb-gut-25">{caption}</p>
                  </Card>
                </div>
              )
            })}
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}
