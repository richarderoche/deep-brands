'use client'

import {cn, imgSizesFormat} from '@/lib/utils'
import {resolveHref} from '@/sanity/lib/utils'
import type {MainNavDropdownLinkItem, MainNavItem} from '@/types'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import Link from 'next/link'
import {useEffect, useId, useRef, useState} from 'react'
import IconCarat from '../icons/IconCarat'
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
      if (!panel) return

      gsap.killTweensOf(panel)

      if (isOpen) {
        hasOpenedRef.current = true
        gsap.fromTo(
          panel,
          {y: 10, scale: 0.98, autoAlpha: 0},
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            pointerEvents: 'auto',
            duration: 0.4,
            ease: 'expo.out',
          },
        )
        return
      }

      if (!hasOpenedRef.current) {
        gsap.set(panel, {y: 10, scale: 0.98, autoAlpha: 0, pointerEvents: 'none'})
        return
      }

      gsap.to(panel, {
        y: 10,
        scale: 0.98,
        autoAlpha: 0,
        pointerEvents: 'none',
        duration: 0.4,
        ease: 'expo.out',
      })
    },
    {dependencies: [isOpen], scope: dropdownRef},
  )

  if (!title || !items || items.length === 0) return null

  return (
    <li
      ref={dropdownRef}
      className={cn(liClasses)}
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
        <IconCarat className="h-[.5em] w-auto rotate-90 ml-[.5em] text-blue-200/60" />
      </button>
      <span
        aria-hidden="true"
        className={cn(
          'fixed inset-x-0 top-header h-header -translate-y-full',
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
          <ul className="px-gut-75 py-gut-75 grid grid-cols-3 gap-gut-75 bg-blue-600 rounded-xs xl:rounded-sm">
            {items.map((item: MainNavDropdownLinkItem) => {
              const {_key, title, subtitle, thumbnail} = item
              const path =
                item._type === 'dropdownPage' && item.page
                  ? resolveHref(item.page.type, item.page.slug)
                  : item._type === 'dropdownExternal'
                    ? item.url
                    : undefined
              const anchorLink = item._type === 'dropdownPage' ? item.anchorLink : undefined
              const href = anchorLink ? `${path}#${anchorLink.replace(/^#/, '')}` : path
              const page = item._type === 'dropdownPage' ? item.page : null
              return (
                <li key={_key} onClick={close}>
                  <Link
                    href={href || '/'}
                    target={!page ? '_blank' : undefined}
                    rel={!page ? 'noopener noreferrer' : undefined}
                    className="rounded-btn overflow-hidden block relative"
                  >
                    {thumbnail && (
                      <ImageBasic
                        image={thumbnail}
                        alt={title || page?.title}
                        ratio={5 / 3}
                        fetchPriority="low"
                        sizes={imgSizesFormat(30)}
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
                  </Link>
                </li>
              )
            })}
          </ul>
        </SiteWidth>
      </div>
    </li>
  )
}
