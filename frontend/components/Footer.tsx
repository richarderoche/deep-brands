import NavLinks from '@/components/shared/NavLinks'
import SiteWidth from '@/components/shared/SiteWidth'
import SocialIcon from '@/components/shared/SocialIcon'
import {cn, imgSizesFormat} from '@/lib/utils'
import {SocialLink} from '@/sanity.types'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import Link from 'next/link'
import IconOrnamentTop from './icons/IconOrnamentTop'
import CurrentYear from './shared/CurrentYear'
import ImageBasic from './shared/ImageBasic'

export default async function Footer() {
  const {data} = await sanityFetch({
    query: settingsQuery,
    stega: false,
  })
  const {badges, contactEmail, footerBrands, footerNav, footerNav2, socialIcons} = data || {}

  const hasFooterNav = footerNav && footerNav?.length > 0
  const hasFooterNav2 = footerNav2 && footerNav2?.length > 0
  const hasBadges = badges && badges?.length > 0
  const hasFooterBrands = footerBrands && footerBrands?.length > 0

  return (
    <footer
      className="dark-theme theme-vars-only flex flex-col"
      style={{viewTransitionName: 'site-footer'}}
    >
      <IconOrnamentTop />
      <div className="bg-bg text-body">
        <SiteWidth className="pb-gut pt-gut-150 md:pt-gut-200">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-gut-150 md:gap-gut">
            <div className="col-span-2 lg:col-span-4">
              <FooterHeading text="Contact" />
              <div className="flex flex-col md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:items-center gap-gut pb-gut-50">
                <div className="flex items-center justify-between md:flex-col md:items-start gap-gut-50">
                  {contactEmail && (
                    <Link
                      href={`mailto:${contactEmail}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ts-btn"
                    >
                      {contactEmail}
                    </Link>
                  )}
                  {socialIcons && <SocialIcons socialIcons={socialIcons} />}
                </div>
                {hasBadges && (
                  <div className="flex items-center gap-gut-50">
                    {badges.map((badge, key) => {
                      const {link} = badge
                      const hasLink = link && link.length > 0
                      const image = (
                        <ImageBasic
                          image={badge}
                          alt={badge.alt}
                          sizes={imgSizesFormat(15, 10, 6.5)}
                        />
                      )
                      return (
                        <div className="w-[15vw] md:w-[10vw] lg:w-[6.5vw]" key={key}>
                          {hasLink ? (
                            <Link
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block hover:scale-105 transition-all"
                            >
                              {image}
                            </Link>
                          ) : (
                            image
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-1 md:col-start-1 lg:col-span-3 lg:col-start-6">
              <FooterHeading text="Info" />
              {hasFooterNav && (
                <nav role="navigation">
                  <NavLinks navItems={footerNav} ulClasses="flex flex-col gap-em ts-btn" />
                </nav>
              )}
            </div>
            <div className="col-span-1 lg:col-span-3 lg:col-start-10">
              <FooterHeading text="Our Brands" />
              {hasFooterBrands && (
                <div className="flex flex-col">
                  {footerBrands.map((brand, key) => {
                    const {title, websiteLink, socialIcons} = brand
                    const hasWebsiteLink = websiteLink && websiteLink.url && websiteLink.title
                    return (
                      <div
                        className="flex flex-col gap-gut-50 border-b border-offwhite/20 py-gut first:pt-0 last:pb-0 last:border-b-0"
                        key={key}
                      >
                        <p className="ts-btn ts-sans-tall">{title}</p>
                        {hasWebsiteLink && (
                          <Link
                            href={websiteLink.url || ''}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ts-meta ts-sans-wide"
                          >
                            {websiteLink.title}
                          </Link>
                        )}
                        {socialIcons && <SocialIcons socialIcons={socialIcons} />}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            <div
              className={cn(hasFooterNav2 ? 'col-span-1 lg:col-span-4' : 'col-span-12 text-center')}
            >
              <p className="text-blue-200 ts-meta">
                &copy; <CurrentYear /> Deep Brands. All Rights Reserved.
              </p>
            </div>
            {hasFooterNav2 && (
              <div className="col-span-1 lg:col-span-3 lg:col-start-6">
                <nav role="navigation">
                  <NavLinks navItems={footerNav2} ulClasses="ts-meta flex gap-em" />
                </nav>
              </div>
            )}
          </div>
        </SiteWidth>
      </div>
    </footer>
  )
}

export const FooterHeading = ({
  text,
  ...props
}: {
  text: string
  props?: React.HTMLAttributes<HTMLHeadingElement>
}) => {
  return (
    <h2 className="ts-meta ts-sans-wide text-blue-200 mb-gut-66" {...props}>
      {text}
    </h2>
  )
}

export const SocialIcons = ({socialIcons}: {socialIcons: SocialLink[]}) => {
  return (
    <div className="flex gap-gut-50">
      {socialIcons.map((link, key) => {
        return (
          <a
            key={key}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ts-btn hover:opacity-50"
            aria-label={link.icon}
          >
            <SocialIcon name={link.icon} />
          </a>
        )
      })}
    </div>
  )
}
