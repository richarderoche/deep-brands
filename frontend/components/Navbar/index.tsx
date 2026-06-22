import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import NavLinks from '../shared/NavLinks'
import SiteWidth from '../shared/SiteWidth'
//import MobileNav from './MobileNav'
import {imgSizesFormat} from '@/lib/utils'
import {SettingsQueryResult} from '@/sanity.types'
import Image from 'next/image'
import Link from 'next/link'
import MobileNav from './MobileNav'
import SkipLink from './SkipLink'

export default async function Navbar() {
  const {data} = (await sanityFetch({
    query: settingsQuery,
    stega: false,
  })) as {data: SettingsQueryResult}

  const mainNavLeft = data?.mainNavLeft
  const mainNavRight = data?.mainNavRight

  const desktopUlClasses =
    'flex flex-wrap items-center gap-x-gut-50 text-offwhite h-full px-gut-25 rounded-btn'
  const desktopLinkClasses =
    'flex w-fit items-center h-btn px-[.5em] rounded-btn border border-transparent transition-all hover:bg-blue-650 will-change-transform ts-btn'

  return (
    <header className="h-header fixed top-0 left-0 w-full z-999">
      <SkipLink />
      <SiteWidth className="h-full pt-gut-66 lg:pt-gut-50 pb-gut-25">
        <div className="h-full flex items-center justify-between gap-x-gut bg-blue-600 relative rounded-xs xl:rounded-sm box-shadow-sm px-gut-50 max-md:-mx-gut-50">
          <div className="h-full w-full grow flex items-center">
            {mainNavLeft && (
              <nav role="navigation" className="h-full max-lg:hidden">
                <NavLinks
                  navItems={mainNavLeft}
                  ulClasses={desktopUlClasses}
                  linkClasses={desktopLinkClasses}
                />
              </nav>
            )}
            <MobileNav headerNav={mainNavLeft} />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="block">
              <Image
                src={'/deep-brands-logo.svg'}
                alt={'Deep Brands Logo'}
                width={513}
                height={312}
                className="h-header w-auto scale-95 -translate-y-1/40  lg:scale-90 lg:-translate-y-1/30 shadow-sm"
                sizes={imgSizesFormat(30, 18, 9)}
              />
            </Link>
          </div>
          <div className="h-full w-full grow flex items-center justify-end">
            {mainNavRight && (
              <nav role="navigation" className="h-full max-lg:hidden">
                <NavLinks
                  navItems={mainNavRight}
                  ulClasses={desktopUlClasses}
                  linkClasses={desktopLinkClasses}
                />
              </nav>
            )}
          </div>
        </div>
      </SiteWidth>
    </header>
  )
}
