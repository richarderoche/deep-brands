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
  size?: 'small' | 'big'
  headingColor?: string
}

export function AccordionSection({
  children,
  accordionTitle = 'Show/Hide',
  innerId,
  size = 'small',
  headingColor = 'var(--theme-body)',
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
    <>
      <h3
        className={cn(
          size === 'big' ? 'border-t-2' : 'border-t',
          'border-body/15 first:border-t-0',
        )}
      >
        <button
          className={cn(
            'flex items-center text-left justify-between gap-x-gut py-gut-50 w-full',
            size === 'big' ? 'ts-h4' : 'ts-h5',
            'ts-sans-wide',
          )}
          style={{color: headingColor}}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={innerId}
          id={headerId}
        >
          <span className="text-balance">{accordionTitle}</span>
          <div
            className={cn(
              'rounded-full border ts-btn size-btn p-[.5em] flex items-center justify-center transition-transform will-change-transform',
              expanded ? '-rotate-90' : 'rotate-90',
            )}
            aria-hidden={true}
          >
            <IconCarat className="h-full w-auto mr-[-.2em]" />
          </div>
          <span className="sr-only">{expanded ? 'Collapse' : 'Expand'}</span>
        </button>
      </h3>

      <div
        ref={ref}
        className="overflow-hidden h-0"
        id={innerId}
        role="region"
        aria-labelledby={headerId}
      >
        <div className={size === 'big' ? 'pb-gut' : 'pb-gut-50'}>{children}</div>
      </div>
    </>
  )
}
