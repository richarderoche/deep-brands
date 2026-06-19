import {isDark} from '@/lib/checkColor'
import {colorValue} from '@/lib/colorValue'
import {cn} from '@/lib/utils'
import {PbHeroShapeSection} from '@/types'
import {PortableText} from 'next-sanity'
import IconLogoShape from '../icons/IconLogoShape'
import IconOrnamentBottom from '../icons/IconOrnamentBottom'
import IconOrnamentTop from '../icons/IconOrnamentTop'
import ImageBasic from '../shared/ImageBasic'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import HeroShapeBackdrop from './HeroShapeBackdrop'
import HeroShapeStickyLogo from './HeroShapeStickyLogo'
import {useSanityDataAttribute} from './SanityVisualEditingContext'

export default function SectionHeroShape({
  section,
  isDarkBgColor,
}: {
  section: PbHeroShapeSection
  isDarkBgColor: boolean
}) {
  const {getDataAttribute} = useSanityDataAttribute()
  const {
    showPreheading,
    preheading,
    backdropColor,
    backdropType,
    backdropImage,
    backdropVideo,
    backdropPosition,
    contentOverlay,
    heading,
    subbrandLogos,
  } = section
  const hasPreheading = showPreheading && preheading?.left && preheading?.right
  const isColorShape = backdropType === 'color'
  const isImageShape = backdropType === 'image' && !!backdropImage?.asset?._ref
  const playbackId = backdropVideo?.asset?.playbackId
  const isVideoShape = backdropType === 'video' && !!playbackId
  const isMediaShape = isImageShape || isVideoShape
  const shapeColor = colorValue(backdropColor)
  const isDarkShapeColor =
    (backdropColor?.colorType === 'custom' && !!shapeColor && isDark(shapeColor)) ||
    (backdropColor?.colorType === 'dark' && !!shapeColor)

  const isStickyLogo = contentOverlay === 'stickyLogo' && (isMediaShape || isColorShape)

  const content = (
    <SiteWidth
      className={cn('py-header', isStickyLogo && 'min-h-screen flex flex-col justify-center')}
    >
      <SiteGrid className="pt-gut-200 lg:pt-gut">
        <div className="col-span-12 lg:col-span-10 lg:col-start-2 relative">
          {hasPreheading && (
            <div
              data-sanity={getDataAttribute(['preheading'])}
              className={cn(
                'absolute max-md:-top-em lg:top-[2em] left-0 w-full flex justify-between ts-h6 ts-sans-wide text-balance z-1',
                isDarkBgColor ? 'text-offwhite' : 'text-blue-600',
              )}
            >
              <div
                data-sanity={getDataAttribute(['preheading', 'left'])}
                className="max-lg:max-w-[15vw]"
              >
                {preheading?.left}
              </div>
              <div
                data-sanity={getDataAttribute(['preheading', 'right'])}
                className="text-right max-lg:max-w-[15vw]"
              >
                {preheading?.right}
              </div>
            </div>
          )}
          <div
            data-hero-shape-mask={isStickyLogo ? '' : undefined}
            className={cn(
              (isColorShape || isMediaShape) && 'relative',
              isColorShape && 'max-lg:pt-hero-ornament-t max-lg:pb-hero-ornament-b',
            )}
          >
            {isMediaShape && (
              <HeroShapeBackdrop
                image={isImageShape ? backdropImage : undefined}
                playbackId={isVideoShape ? playbackId : undefined}
                objectPosition={backdropPosition}
                imageDataSanity={getDataAttribute(['backdropImage'])}
                videoDataSanity={getDataAttribute(['backdropVideo'])}
              />
            )}
            {isColorShape && (
              <div>
                <IconLogoShape
                  className={cn('max-lg:hidden w-full h-auto object-cover object-center')}
                  style={{color: shapeColor}}
                />
                <IconOrnamentTop
                  style={{color: shapeColor}}
                  className={cn('lg:hidden w-auto h-hero-ornament-t', !shapeColor && 'text-bg')}
                />
              </div>
            )}
            {contentOverlay === 'headingLogos' && (
              <div
                className={cn(
                  'lg:absolute lg:w-full top-1/2 left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bg-transparent!',
                  'text-center text-balance px-gut lg:px-gut-200 flex flex-col items-center justify-center gap-gut-150 max-lg:py-gut-200 max-lg:-mx-gut-50 lg:pt-gut-150 rounded-t-card-top rounded-b-card-bottom',
                  isMediaShape && 'absolute inset-0 max-lg:mx-0',
                  isDarkShapeColor || (isMediaShape && isDarkBgColor)
                    ? 'text-offwhite'
                    : 'text-blue-800',
                )}
                style={isColorShape ? {background: shapeColor} : undefined}
              >
                {heading && (
                  <h2 data-sanity={getDataAttribute(['heading'])} className="ts-h1-h3 ts-serif">
                    <PortableText value={heading} />
                  </h2>
                )}
                {subbrandLogos && (
                  <div
                    data-sanity={getDataAttribute(['subbrandLogos'])}
                    className="flex items-center justify-center gap-gut"
                  >
                    {subbrandLogos.map((logo) => (
                      <div
                        data-sanity={getDataAttribute(['subbrandLogos', {_key: logo._key}])}
                        key={logo._key}
                        className="w-1/3 lg:w-1/5 aspect-3/2 items-center justify-center flex"
                      >
                        <ImageBasic image={logo} maxDimension={100} fitTo="height" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {isColorShape && (
              <IconOrnamentBottom
                style={{color: shapeColor}}
                className={cn('lg:hidden w-auto h-hero-ornament-b', !shapeColor && 'text-bg')}
              />
            )}
          </div>
        </div>
      </SiteGrid>
    </SiteWidth>
  )

  if (isStickyLogo) {
    return <HeroShapeStickyLogo>{content}</HeroShapeStickyLogo>
  }

  return content
}
