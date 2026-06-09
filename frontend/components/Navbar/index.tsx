import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import type {NavItem} from '@/types'
import NavLinks from '../shared/NavLinks'
import SiteWidth from '../shared/SiteWidth'
//import MobileNav from './MobileNav'
import SkipLink from './SkipLink'

export default async function Navbar() {
  const {data} = await sanityFetch({
    query: settingsQuery,
    stega: false,
  })
  const headerNav = data?.headerNav || ([] as NavItem[])
  //const siteTitle = data?.seoTitle || 'Deep Brands'

  return (
    <header className="h-header fixed top-0 left-0 w-full z-999">
      <SkipLink />
      <SiteWidth className="h-full flex items-center justify-end gap-x-gut ts-p-xs ts-sans-tall">
        {headerNav && (
          <nav role="navigation" className="h-full py-gut-33">
            {/* Desktop Header Menu */}
            <NavLinks
              navItems={headerNav}
              ulClasses="flex flex-wrap items-center gap-x-gut-50 bg-blue-600 text-white h-full px-gut-50 rounded-btn"
              liClasses=""
              liActiveClasses=""
            />
            {/* Mobile Header Menu */}
            {/*<MobileNav headerNav={headerNav} />*/}
          </nav>
        )}
      </SiteWidth>
    </header>
  )
}
