import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import NavLinks from '../shared/NavLinks'
import SiteWidth from '../shared/SiteWidth'
//import MobileNav from './MobileNav'
import {SettingsQueryResult} from '@/sanity.types'
import Image from 'next/image'
import Link from 'next/link'
import {ButtonBlock} from '../pb/PbBlocks'
import SocialIcon from '../shared/SocialIcon'
import MobileNav from './MobileNav'
import SkipLink from './SkipLink'

export default async function Navbar() {
  const {data} = (await sanityFetch({
    query: settingsQuery,
    stega: false,
  })) as {data: SettingsQueryResult}
  const {mainNavLeft, mainNavRight, socialIcons, showHeaderSocials, showHeaderCTAs, headerCTAs} =
    data || {}
  const mainNavMobile = [...(mainNavLeft ?? []), ...(mainNavRight ?? [])]
  const hasSocialIcons = showHeaderSocials && socialIcons && socialIcons.length > 0
  const hasHeaderCTAs = showHeaderCTAs && headerCTAs && headerCTAs.length > 0

  const desktopUlClasses =
    'flex flex-wrap items-center gap-x-gut-50 text-offwhite h-full px-gut-25 rounded-btn'
  const desktopLinkClasses =
    'flex w-fit items-center h-btn px-[.5em] rounded-btn border border-transparent transition-all hover:bg-blue-650 will-change-transform ts-btn'

  return (
    <header
      className="h-header fixed top-0 left-0 w-full z-999"
      style={{viewTransitionName: 'site-header'}}
    >
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
            <MobileNav
              mainNavMobile={mainNavMobile}
              hasHeaderCTAs={hasHeaderCTAs}
              headerCTAs={headerCTAs}
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="block">
              <Image
                src={'/deep-brands-logo.svg'}
                alt={'Deep Brands Logo'}
                width={513}
                height={312}
                className="h-header w-auto scale-95 -translate-y-1/40  lg:scale-90 lg:-translate-y-1/30 shadow-sm"
                priority
              />
            </Link>
          </div>
          <div className="h-full w-full grow flex items-center justify-end gap-gut-33 text-offwhite">
            {mainNavRight && (
              <nav role="navigation" className="h-full max-lg:hidden">
                <NavLinks
                  navItems={mainNavRight}
                  ulClasses={desktopUlClasses}
                  linkClasses={desktopLinkClasses}
                />
              </nav>
            )}
            {hasSocialIcons && (
              <div>
                {socialIcons.map((icon) => (
                  <Link
                    href={icon.url || ''}
                    key={icon._key}
                    aria-label={icon.icon}
                    className="rounded-full ts-btn size-btn p-[.4em] flex items-center justify-center border border-offwhite [&_svg]:h-full [&_svg]:w-auto"
                  >
                    <SocialIcon name={icon.icon} />
                  </Link>
                ))}
              </div>
            )}
            {hasHeaderCTAs && (
              <div className="flex items-center gap-gut-33 max-lg:hidden">
                {headerCTAs.map((cta) => (
                  <ButtonBlock key={cta._key} block={cta} />
                ))}
              </div>
            )}
          </div>
        </div>
      </SiteWidth>
    </header>
  )
}
