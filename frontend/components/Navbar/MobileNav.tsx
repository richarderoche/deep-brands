'use client'

import {useGSAP} from '@gsap/react'
import {FocusTrap} from 'focus-trap-react'
import gsap from 'gsap'
import {useEffect, useRef} from 'react'

import NavLinks from '@/components/shared/NavLinks'
import {useStore} from '@/lib/store'
import {PbBlockButton} from '@/sanity.types'
import type {MainNavItem} from '@/types'
import IconNavClose from '../icons/IconNavClose'
import IconNavOpen from '../icons/IconNavOpen'
import {ButtonBlock} from '../pb/PbBlocks'

interface NavbarProps {
  mainNavMobile?: MainNavItem[] | null
  hasHeaderCTAs?: boolean
  headerCTAs?: Array<{_key: string} & PbBlockButton>
}

export default function MobileNav(props: NavbarProps) {
  const {mainNavMobile, hasHeaderCTAs, headerCTAs} = props

  const isMobileNavOpen = useStore((state) => state.isMobileNavOpen)
  const setIsMobileNavOpen = useStore((state) => state.setIsMobileNavOpen)
  const setPauseLenis = useStore((state) => state.setPauseLenis)

  const handleOpenMobileNav = () => {
    setIsMobileNavOpen(true)
    setPauseLenis(true)
  }

  const handleCloseMobileNav = () => {
    setIsMobileNavOpen(false)
    setPauseLenis(false)
  }

  const handleToggleMobileNav = () => {
    if (isMobileNavOpen) {
      handleCloseMobileNav()
    } else {
      handleOpenMobileNav()
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileNavOpen(false)
        setPauseLenis(false)
      }
    }
    if (isMobileNavOpen) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileNavOpen, setIsMobileNavOpen, setPauseLenis])

  const navRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to(navRef.current, {
        x: isMobileNavOpen ? 0 : '-100%',
        duration: isMobileNavOpen ? 0.6 : 0.3,
        ease: 'expo.out',
      })
    },
    {dependencies: [isMobileNavOpen]},
  )

  return (
    <FocusTrap active={isMobileNavOpen}>
      <div className="lg:hidden ts-btn-size-only size-btn">
        <button
          onClick={handleToggleMobileNav}
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle Menu"
          className="z-50 relative bg-white text-blue-800 h-full rounded-[2px]"
        >
          {isMobileNavOpen ? (
            <IconNavClose className="h-full w-auto" />
          ) : (
            <IconNavOpen className="h-full w-auto" />
          )}
        </button>

        <nav
          id="mobile-nav"
          ref={navRef}
          className="fixed top-0 bottom-0 left-0 w-full bg-blue-600 text-offwhite z-10 overflow-auto -translate-x-full px-gut md:px-gut-150"
          data-lenis-prevent
          role="navigation"
          aria-label="Mobile Navigation"
          inert={!isMobileNavOpen}
        >
          <div>
            {hasHeaderCTAs && (
              <div className="h-header flex items-center justify-end pt-gut-66  pb-gut-25">
                <div className="flex items-center gap-gut-33">
                  {headerCTAs?.map((cta) => (
                    <ButtonBlock key={cta._key} block={cta} />
                  ))}
                </div>
              </div>
            )}
            <NavLinks
              navItems={mainNavMobile ?? []}
              ulClasses="flex flex-col mt-gut pb-gut-200"
              liClasses="border-b-2 border-blue-650 last:border-b-0"
              linkClasses="ts-h1 ts-serif py-gut-50 flex items-center justify-between"
              onClick={handleCloseMobileNav}
              isMobileNav={true}
            />
          </div>
        </nav>
      </div>
    </FocusTrap>
  )
}
