'use client'
import Link from 'next/link'

import {cn} from '@/lib/utils'
import {resolveHref} from '@/sanity/lib/utils'
import type {MainNavItem} from '@/types'
import MainNavDropdown from '../Navbar/MainNavDropdown'

interface NavLinkProps {
  navItems: MainNavItem[]
  ulClasses?: string
  liClasses?: string
  linkClasses?: string
  sep?: boolean
  onClick?: () => void
}

export default function NavLinks(props: NavLinkProps) {
  const {navItems, ulClasses, liClasses, linkClasses, sep = false, onClick} = props

  return (
    <ul className={ulClasses}>
      {navItems &&
        navItems.map((navItem: MainNavItem, i) => {
          if (navItem._type === 'dropdown') {
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
                {title || page?.title}
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
