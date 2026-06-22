'use client'
import Link from 'next/link'

import {cn, imgSizesFormat} from '@/lib/utils'
import {resolveHref} from '@/sanity/lib/utils'
import type {MainNavDropdownLinkItem, MainNavItem} from '@/types'
import MainNavDropdown, {GetDropdownLinkVars} from '../Navbar/MainNavDropdown'
import {MobileNavAccordion} from '../Navbar/MobileNavAccordion'
import IconCarat from '../icons/IconCarat'
import ImageBasic from './ImageBasic'

interface NavLinkProps {
  navItems: MainNavItem[]
  ulClasses?: string
  liClasses?: string
  linkClasses?: string
  sep?: boolean
  onClick?: () => void
  isMobileNav?: boolean
}

export default function NavLinks(props: NavLinkProps) {
  const {
    navItems,
    ulClasses,
    liClasses,
    linkClasses,
    sep = false,
    onClick,
    isMobileNav = false,
  } = props

  return (
    <ul className={ulClasses}>
      {navItems &&
        navItems.map((navItem: MainNavItem, i) => {
          if (!isMobileNav && navItem._type === 'dropdown') {
            return (
              <MainNavDropdown
                key={navItem._key}
                navItem={navItem}
                linkClasses={linkClasses}
                liClasses={liClasses}
              />
            )
          }

          const {_key, title} = navItem
          const path =
            navItem._type === 'navPage' && navItem.page
              ? resolveHref(navItem.page.type, navItem.page.slug)
              : navItem._type === 'navExternal'
                ? navItem.url
                : undefined
          const anchorLink = navItem._type === 'navPage' ? navItem.anchorLink : undefined
          const page = navItem._type === 'navPage' ? navItem.page : null
          const href = anchorLink ? `${path}#${anchorLink.replace(/^#/, '')}` : path

          if (isMobileNav && navItem._type === 'dropdown') {
            const {items} = navItem
            if (!items || items.length === 0) return null
            return (
              <MobileNavAccordion
                key={navItem._key}
                innerId={`mobile-nav-accordion-${navItem._key}`}
                accordionTitle={navItem.title}
                liClasses={liClasses}
                linkClasses={linkClasses}
              >
                {items.map((item: MainNavDropdownLinkItem) => {
                  const {_key, title, subtitle, thumbnail} = item
                  const {href, page} = GetDropdownLinkVars(item)
                  return (
                    <div
                      key={_key}
                      onClick={onClick}
                      className="border-b border-blue-650 last:border-b-0 md:mx-gut"
                    >
                      <Link
                        href={href || '/'}
                        target={!page ? '_blank' : undefined}
                        rel={!page ? 'noopener noreferrer' : undefined}
                        className="grid grid-cols-6 items-center py-gut-50"
                      >
                        {thumbnail && (
                          <ImageBasic
                            image={thumbnail}
                            alt={title || page?.title}
                            ratio={1.6}
                            fetchPriority="low"
                            sizes={imgSizesFormat(30, 30, 0)}
                            className="rounded-[2px] col-span-2"
                          />
                        )}
                        <div className="col-span-4 pl-gut-50 flex flex-col text-pretty">
                          <span className="ts-h6 ts-h5 ts-sans-wide">{title || page?.title}</span>
                          {subtitle && <span className="ts-p-xs pt-[.2em]">{subtitle}</span>}
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </MobileNavAccordion>
            )
          }

          return (
            <li key={_key} className={cn(liClasses)}>
              {i > 0 && sep && <Sep />}
              <Link
                href={href || '/'}
                target={!page ? '_blank' : undefined}
                rel={!page ? 'noopener noreferrer' : undefined}
                onClick={onClick}
                className={linkClasses}
              >
                {isMobileNav ? (
                  <>
                    <span className="">{title || page?.title}</span>
                    <div
                      className={cn(
                        'rounded-full border ts-btn size-btn md:size-[2.2em] p-[.5em] flex items-center justify-center transition-transform will-change-transform',
                      )}
                      aria-hidden={true}
                    >
                      <IconCarat className="h-full w-auto mr-[-.2em]" />
                    </div>
                  </>
                ) : (
                  title || page?.title
                )}
              </Link>
            </li>
          )
        })}
    </ul>
  )
}

function Sep() {
  return <span className="mx-[.3em]">|</span>
}
