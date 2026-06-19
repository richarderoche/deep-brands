'use client'

import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/all'
import Image from 'next/image'
import {useRef} from 'react'

gsap.registerPlugin(ScrollTrigger)

function getOffsetTopWithin(child: HTMLElement, ancestor: HTMLElement) {
  let top = 0
  let node: HTMLElement | null = child

  while (node && node !== ancestor) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }

  if (node !== ancestor) {
    const childRect = child.getBoundingClientRect()
    const ancestorRect = ancestor.getBoundingClientRect()
    return childRect.top - ancestorRect.top
  }

  return top
}

function getMetrics(panelEl: HTMLElement, maskEl: HTMLElement, logoEl: HTMLElement) {
  const maskTop = getOffsetTopWithin(maskEl, panelEl)
  const maskCenterY = maskTop + maskEl.offsetHeight / 2
  const logoHeight = logoEl.offsetHeight
  const startTop = window.innerHeight
  const endTop = maskCenterY - logoHeight / 2
  const scrollDistance = Math.max(startTop - endTop, 1)

  return {startTop, endTop, scrollDistance}
}

function syncSectionBackground(bgEl: HTMLElement, sectionEl: HTMLElement | null) {
  if (!sectionEl) return

  const {background, backgroundColor} = getComputedStyle(sectionEl)
  bgEl.style.background = background
  bgEl.style.backgroundColor = backgroundColor
}

export default function HeroShapeStickyLogo({children}: {children: React.ReactNode}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const flowRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const tailRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const rootEl = rootRef.current
      const flowEl = flowRef.current
      const panelEl = panelRef.current
      const bgEl = bgRef.current
      const tailEl = tailRef.current
      const logoEl = logoRef.current
      if (!rootEl || !flowEl || !panelEl || !bgEl || !tailEl || !logoEl) return

      const maskEl = panelEl.querySelector<HTMLElement>('[data-hero-shape-mask]')
      if (!maskEl) return

      const sectionEl = rootEl.closest('section[data-pb-section]') as HTMLElement | null
      const metrics = {startTop: 0, endTop: 0, scrollDistance: 1}
      let isPinned = false

      const setBackgroundHeight = (extended: boolean) => {
        bgEl.style.height = extended
          ? `${panelEl.offsetHeight + metrics.scrollDistance}px`
          : `${panelEl.offsetHeight}px`
      }

      const syncLayout = () => {
        Object.assign(metrics, getMetrics(panelEl, maskEl, logoEl))
        flowEl.style.minHeight = `${panelEl.offsetHeight}px`
        tailEl.style.height = `${metrics.scrollDistance}px`
        syncSectionBackground(bgEl, sectionEl)
        setBackgroundHeight(isPinned)
      }

      syncLayout()
      gsap.set(logoEl, {top: metrics.startTop})

      const tween = gsap.fromTo(
        logoEl,
        {top: () => metrics.startTop},
        {
          top: () => metrics.endTop,
          ease: 'none',
          scrollTrigger: {
            trigger: flowEl,
            start: 'top top',
            end: () => `+=${metrics.scrollDistance}`,
            pin: panelEl,
            pinSpacing: false,
            scrub: true,
            invalidateOnRefresh: true,
            markers: false,
            onRefresh: syncLayout,
            onEnter: () => {
              isPinned = true
              setBackgroundHeight(true)
            },
            onEnterBack: () => {
              isPinned = true
              setBackgroundHeight(true)
            },
            onLeave: () => {
              isPinned = false
              setBackgroundHeight(false)
            },
            onLeaveBack: () => {
              isPinned = false
              setBackgroundHeight(false)
            },
          },
        },
      )

      const onResize = () => {
        syncLayout()
        ScrollTrigger.refresh()
      }

      const resizeObserver = new ResizeObserver(onResize)
      resizeObserver.observe(maskEl)
      resizeObserver.observe(logoEl)

      window.addEventListener('load', onResize)
      maskEl.querySelectorAll('img, video').forEach((el) => {
        el.addEventListener('load', onResize)
      })

      requestAnimationFrame(() => {
        if (tween.scrollTrigger?.isActive) {
          isPinned = true
          setBackgroundHeight(true)
        }
      })

      return () => {
        window.removeEventListener('load', onResize)
        resizeObserver.disconnect()
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    {scope: rootRef},
  )

  return (
    <div ref={rootRef}>
      <div ref={flowRef}>
        <div ref={panelRef} className="relative isolate">
          <div
            ref={bgRef}
            aria-hidden
            className="pointer-events-none absolute top-0 left-1/2 -z-10 w-screen -translate-x-1/2"
          />
          {children}
          <div
            ref={logoRef}
            className="pointer-events-none absolute left-1/2 top-[100vh] z-10 w-3/4 md:w-1/2 -translate-x-1/2 lg:w-1/3"
            aria-hidden="true"
          >
            <Image
              src="/deep-brands-logo.svg"
              alt=""
              className="block h-auto w-full"
              width={513}
              height={312}
            />
          </div>
        </div>
      </div>
      <div ref={tailRef} aria-hidden className="w-full shrink-0" />
    </div>
  )
}
