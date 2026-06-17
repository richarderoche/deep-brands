'use client'
import {isDark} from '@/lib/checkColor'
import {colorValue} from '@/lib/colorValue'
import {cn, getGridClasses, getOuterSettings, imgSizesFormat} from '@/lib/utils'
import {PbFeature} from '@/sanity.types'
import {PbBlocksQueryResult} from '@/types'
import type {CSSProperties} from 'react'
import Revealer from '../shared/Revealer'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import PbBlocks, {ImageBlock} from './PbBlocks'
import {useSanityDataAttribute} from './SanityVisualEditingContext'

export default function SectionFeature({section}: {section: PbFeature}) {
  const {getDataAttribute} = useSanityDataAttribute()
  const {pbBlocks, spaceBetweenBlocks, cardColor, featuredImage, rowWidth} = section
  const hasBlocks = pbBlocks && pbBlocks.length > 0
  const hasImage = featuredImage && featuredImage.image
  const bgColor = colorValue(cardColor)
  const isDarkCardColor =
    (cardColor?.colorType === 'custom' && !!bgColor && isDark(bgColor)) ||
    (cardColor?.colorType === 'dark' && !!bgColor)
  const imgSizes = imgSizesFormat(90, 80, rowWidth === 10 ? 66 : 50)
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''

  if (!hasBlocks && !hasImage) {
    return null
  }

  return (
    <SiteWidth>
      <SiteGrid>
        <div className={cn(outerClasses, 'shadow-md')}>
          <div
            className={cn(
              'grid grid-cols-1 lg:grid-cols-2 items-center   p-gut',
              !featuredImage?.bottomAlign ? 'gap-gut-150 lg:gap-gut' : 'gap-gut',
              isDarkCardColor
                ? 'dark-theme theme-vars-only text-body'
                : 'light-theme theme-vars-only text-body',
            )}
            style={
              {
                backgroundColor: bgColor,
                clipPath: 'var(--feature-clip-path)',
                ...(bgColor && {'--theme-btn-fg': bgColor}),
              } as CSSProperties
            }
          >
            {hasBlocks && (
              <Revealer direction="stagger">
                <div className="max-lg:pt-gut md:px-gut-50">
                  <PbBlocks
                    columnBlocks={pbBlocks as PbBlocksQueryResult}
                    trueSizes={imgSizes}
                    spaceBetweenBlocks={spaceBetweenBlocks || 'gap-gut'}
                    contentAlign="center"
                  />
                </div>
              </Revealer>
            )}
            {hasImage && (
              <div
                data-sanity={getDataAttribute(['featuredImage'])}
                className={cn(
                  'md:max-lg:px-gut-150',
                  featuredImage.bottomAlign && 'relative -bottom-gut',
                )}
              >
                <ImageBlock block={featuredImage} trueSizes={imgSizes} />
              </div>
            )}
          </div>
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}
