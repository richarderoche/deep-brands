import {isDark} from '@/lib/checkColor'
import {colorValue} from '@/lib/colorValue'
import {cn, getShapeWidthStyle, imgSizesFormat, imgSizesOrientationBleed} from '@/lib/utils'
import {PagesBySlugQueryResult} from '@/sanity.types'
import IconOrnamentTop from '../icons/IconOrnamentTop'
import Button from '../shared/Button'
import Divider from '../shared/Divider'
import ImageBasic from '../shared/ImageBasic'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import SocialIcon from '../shared/SocialIcon'
import {useSanityDataAttribute} from './SanityVisualEditingContext'

export type PbHeroBrandSection = Extract<
  NonNullable<NonNullable<PagesBySlugQueryResult>['pbSections']>[number],
  {_type: 'pbHeroBrand'}
>

interface SectionHeroBrandProps {
  section: PbHeroBrandSection
}

export default function SectionHeroBrand({section}: SectionHeroBrandProps) {
  const {getDataAttribute} = useSanityDataAttribute()
  const {brand, shapeWidth, introductionText, bgImage, fgColorTop, bgColorBottom, fgColorBottom} =
    section
  const {websiteLink, socialIcons, logo, bgShape} = brand

  const topFgColor = colorValue(fgColorTop)
  const bottomBgColor = colorValue(bgColorBottom)
  const isDarkTopFgColor =
    (fgColorTop?.colorType === 'custom' && !!topFgColor && isDark(topFgColor)) ||
    (fgColorTop?.colorType === 'dark' && !!topFgColor)
  const socialIconColor = isDarkTopFgColor ? 'var(--color-offwhite)' : bottomBgColor
  const socialButtonClassName =
    'rounded-full ts-btn size-btn p-[.4em] flex items-center justify-center hover:opacity-50 [&_svg]:block [&_svg]:h-full [&_svg]:w-auto'

  if (!brand) return null

  return (
    <div className="pt-header overflow-hidden relative z-1">
      {bgImage && (
        <div className="absolute inset-0 -z-1">
          <ImageBasic
            image={bgImage}
            maxDimension={1500}
            mode="cover"
            fitTo="manual"
            ratio={1}
            className="w-full h-full object-cover"
            sizes={imgSizesOrientationBleed()}
            priority={true}
          />
        </div>
      )}
      <div className="min-h-[85vh] flex flex-col justify-end">
        <div className="flex w-full justify-center -mb-gut-66">
          <div
            className="shape-width shrink-0 h-auto relative"
            style={getShapeWidthStyle(shapeWidth)}
          >
            {bgShape && (
              <ImageBasic
                image={bgShape}
                maxDimension={1000}
                mode="contain"
                className="shadow-sm"
                sizes={imgSizesFormat(
                  shapeWidth?.mobile ?? 95,
                  shapeWidth?.tablet ?? 75,
                  shapeWidth?.desktop ?? 50,
                )}
                priority={true}
              />
            )}
            <div className="absolute inset-0">
              <div className="h-full max-w-[66vw] md:max-w-[55vw] lg:max-w-[35vw] mx-auto flex flex-col gap-gut items-center justify-center">
                {logo && (
                  <div className="h-2/5 max-h-150 xl:max-h-200">
                    <ImageBasic
                      image={logo}
                      maxDimension={200}
                      fitTo="height"
                      sizes={imgSizesFormat(50, 40, 30)}
                    />
                  </div>
                )}
                {introductionText && (
                  <p className="text-center text-balance max-md:hidden" style={{color: topFgColor}}>
                    {introductionText}
                  </p>
                )}
                <div className="flex items-center justify-center gap-gut-50 flex-wrap">
                  {socialIcons?.map((icon) => {
                    const style = {
                      backgroundColor: topFgColor,
                      color: socialIconColor,
                    }

                    if (icon.url) {
                      return (
                        <a
                          key={icon._key}
                          href={icon.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={icon.icon}
                          className={socialButtonClassName}
                          style={style}
                        >
                          <SocialIcon name={icon.icon} />
                        </a>
                      )
                    }

                    return (
                      <span key={icon._key} className={socialButtonClassName} style={style}>
                        <SocialIcon name={icon.icon} />
                      </span>
                    )
                  })}
                  {websiteLink && (
                    <Button
                      style={{
                        backgroundColor: topFgColor,
                        color: socialIconColor,
                      }}
                      text="Visit Website"
                      path={websiteLink.url}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-2 relative" style={{backgroundColor: bottomBgColor}}>
        <IconOrnamentTop
          style={{color: bottomBgColor}}
          className={cn('h-ornament w-auto', !bottomBgColor && 'text-bg')}
        />
        {introductionText && (
          <SiteWidth className="md:hidden">
            <SiteGrid>
              <div className="col-span-12" style={{color: colorValue(fgColorBottom)}}>
                <p
                  data-sanity={getDataAttribute(['introductionText'])}
                  className="text-center text-balance my-gut-200"
                >
                  {introductionText}
                </p>
                <Divider showDividerLine showOrnament showOnMobile size={1} />
              </div>
            </SiteGrid>
          </SiteWidth>
        )}
      </div>
    </div>
  )
}
