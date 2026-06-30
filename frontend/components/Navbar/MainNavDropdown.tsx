'use client'

import {cn, imgSizesFormat} from '@/lib/utils'
import {resolveHref} from '@/sanity/lib/utils'
import type {MainNavDropdownLinkItem, MainNavItem} from '@/types'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {useEffect, useId, useRef, useState} from 'react'
import IconCarat from '../icons/IconCarat'
import HashAwareLink from '../shared/HashAwareLink'
import ImageBasic from '../shared/ImageBasic'
import SiteWidth from '../shared/SiteWidth'

export default function MainNavDropdown({
  navItem,
  linkClasses,
  liClasses,
}: {
  navItem: Extract<MainNavItem, {_type: 'dropdown'}>
  linkClasses?: string
  liClasses?: string
}) {
  const {title, items} = navItem
  const [isOpen, setIsOpen] = useState(false)
  const buttonId = useId()
  const panelId = useId()
  const dropdownRef = useRef<HTMLLIElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const hasOpenedRef = useRef(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const open = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setIsOpen(true)
  }

  const close = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setIsOpen(false)
  }

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null
      setIsOpen(false)
    }, 120)
  }

  const isWithinDropdown = (target: EventTarget | null) => {
    if (!(target instanceof Node)) return false
    return dropdownRef.current?.contains(target) ?? false
  }

  const handleLiMouseLeave = (event: React.MouseEvent) => {
    if (isWithinDropdown(event.relatedTarget)) return
    scheduleClose()
  }

  const handlePanelMouseEnter = () => open()

  const handlePanelMouseLeave = (event: React.MouseEvent) => {
    if (isWithinDropdown(event.relatedTarget)) return
    scheduleClose()
  }

  const handleLiFocus = () => open()

  const handleLiBlur = (event: React.FocusEvent) => {
    if (isWithinDropdown(event.relatedTarget)) return
    close()
  }

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      open()
      const firstLink = panelRef.current?.querySelector('a')
      if (firstLink instanceof HTMLAnchorElement) {
        firstLink.focus()
      }
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      open()
    }
  }

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      close()
      buttonRef.current?.focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useGSAP(
    () => {
      const panel = panelRef.current
      const backdropStart = {scale: 0.96, autoAlpha: 0}
      const ulStart = {y: 8, opacity: 0}
      if (!panel) return

      gsap.killTweensOf([panel, '.panel-backdrop', 'ul'])

      if (isOpen) {
        hasOpenedRef.current = true

        gsap.set(panel, {autoAlpha: 1, pointerEvents: 'auto'})

        gsap.fromTo('.panel-backdrop', backdropStart, {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'back.out(2)',
        })
        gsap.fromTo('ul', ulStart, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(2)',
        })
        return
      }

      if (!hasOpenedRef.current) {
        gsap.set(panel, {autoAlpha: 0, pointerEvents: 'none'})
        gsap.set('.panel-backdrop', backdropStart)
        gsap.set('ul', ulStart)
        return
      }

      gsap.to(panel, {
        autoAlpha: 0,
        pointerEvents: 'none',
        duration: 0.25,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set('.panel-backdrop', backdropStart)
          gsap.set('ul', ulStart)
        },
      })
    },
    {dependencies: [isOpen], scope: dropdownRef, revertOnUpdate: false},
  )

  if (!title || !items || items.length === 0) return null

  return (
    <li
      ref={dropdownRef}
      className={cn(liClasses, 'relative')}
      onMouseLeave={handleLiMouseLeave}
      onFocus={handleLiFocus}
      onBlur={handleLiBlur}
    >
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        onMouseEnter={open}
        onKeyDown={handleButtonKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={cn(linkClasses, isOpen && 'bg-blue-650')}
      >
        {title}
        <IconCarat
          className={cn(
            'h-[.5em] w-auto ml-[.5em] text-blue-200 transition-all',
            isOpen ? '-rotate-90 opacity-100' : 'rotate-90 opacity-60',
          )}
        />
      </button>
      <span
        aria-hidden="true"
        className={cn(
          'absolute -inset-x-gut-25 ts-btn top-btn h-header',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        onMouseEnter={open}
      />
      <div
        ref={panelRef}
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        onMouseEnter={handlePanelMouseEnter}
        onMouseLeave={handlePanelMouseLeave}
        className="panel fixed top-header left-0 w-full invisible"
      >
        <SiteWidth>
          <div className="relative">
            <div className="panel-backdrop bg-blue-600 rounded-xs xl:rounded-sm absolute inset-0 box-shadow-sm will-change-transform"></div>
            <ul className="px-gut-75 py-gut-75 grid grid-cols-3 gap-gut-75">
              {items.map((item: MainNavDropdownLinkItem) => {
                const {_key, title, subtitle, thumbnail} = item
                const {href, page} = GetDropdownLinkVars(item)
                return (
                  <li key={_key} onClick={close}>
                    <HashAwareLink
                      href={href || '/'}
                      target={!page ? '_blank' : undefined}
                      rel={!page ? 'noopener noreferrer' : undefined}
                      className="rounded-btn overflow-hidden block relative group"
                    >
                      {thumbnail && (
                        <ImageBasic
                          image={thumbnail}
                          alt={title || page?.title}
                          ratio={5 / 3}
                          fetchPriority="low"
                          sizes={imgSizesFormat(0, 0, 30)}
                          className="group-hover:scale-103 transition-transform will-change-transform duration-300 ease-in-out"
                        />
                      )}
                      <div className="flex gap-gut-50 items-end text-pretty absolute top-1/2 left-0 right-0 bottom-0 bg-ease-in-out-to-t from-black/85 to-transparent p-gut-25">
                        <div className="flex flex-col grow">
                          <span className="ts-h6 ts-sans-wide">{title || page?.title}</span>
                          {subtitle && <span className="ts-p-xs">{subtitle}</span>}
                        </div>
                        <div
                          className={cn(
                            'rounded-full border ts-btn size-btn p-[.5em] flex items-center justify-center transition-transform will-change-transform',
                          )}
                          aria-hidden={true}
                        >
                          <IconCarat className="h-full w-auto mr-[-.2em]" />
                        </div>
                      </div>
                    </HashAwareLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </SiteWidth>
      </div>
    </li>
  )
}

export function GetDropdownLinkVars(item) {
  const path =
    item._type === 'dropdownPage' && item.page
      ? resolveHref(item.page.type, item.page.slug)
      : item._type === 'dropdownExternal'
        ? item.url
        : undefined
  const anchorLink = item._type === 'dropdownPage' ? item.anchorLink : undefined
  const href = anchorLink ? `${path}#${anchorLink.replace(/^#/, '')}` : path
  const page = item._type === 'dropdownPage' ? item.page : null
  return {
    href,
    page,
  }
}
