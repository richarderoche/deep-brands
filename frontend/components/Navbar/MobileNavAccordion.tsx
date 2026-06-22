'use client'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {useRef, useState} from 'react'

import {cn} from '@/lib/utils'

import IconCarat from '../icons/IconCarat'

gsap.registerPlugin(useGSAP)

export interface AccordionSectionProps {
  children: React.ReactNode
  accordionTitle?: string
  innerId: string
  headingColor?: string
  liClasses?: string
  linkClasses?: string
}

export function MobileNavAccordion({
  children,
  accordionTitle = 'Show/Hide',
  innerId,
  liClasses,
  linkClasses,
}: AccordionSectionProps) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const headerId = `h-${innerId}`
  useGSAP(
    () => {
      gsap.to(ref.current, {
        height: expanded ? 'auto' : 0,
        duration: expanded ? 0.6 : 0.3,
        ease: 'expo.out',
      })
    },
    {dependencies: [expanded]},
  )
  return (
    <li className={cn(liClasses)}>
      <button
        className={cn('text-left w-full', linkClasses)}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls={innerId}
        id={headerId}
      >
        <span className="text-balance">{accordionTitle}</span>
        <div
          className={cn(
            'rounded-full border ts-btn size-btn md:size-[2.2em] p-[.5em] flex items-center justify-center transition-transform will-change-transform',
            expanded ? '-rotate-90' : 'rotate-90',
          )}
          aria-hidden={true}
        >
          <IconCarat className="h-full w-auto mr-[-.2em]" />
        </div>
        <span className="sr-only">{expanded ? 'Collapse' : 'Expand'}</span>
      </button>

      <div
        ref={ref}
        className="overflow-hidden h-0"
        id={innerId}
        role="region"
        aria-labelledby={headerId}
      >
        <div className={cn('pb-gut-50')}>{children}</div>
      </div>
    </li>
  )
}
