import {PbBanner} from '@/sanity.types'

import {isDark} from '@/lib/checkColor'
import {colorValue} from '@/lib/colorValue'
import {cn} from '@/lib/utils'
import {PbBlocksQueryResult} from '@/types'
import PbBlocks, {ImageBlock} from './PbBlocks'

export default function SectionGridSingle({
  section,
  sectionKey,
  isDarkBgColor,
}: {
  section: PbBanner
  sectionKey: string
  isDarkBgColor: boolean
}) {
  const {pbBlocks, spaceBetweenBlocks, bgColor, bannerImage, bannerDirection} = section
  const hasBlocks = pbBlocks && pbBlocks.length > 0
  const hasBannerImage = bannerImage && bannerImage.image
  const isOffsetX = bannerImage?.position === 'offsetX'
  const isOffsetXY = bannerImage?.position === 'offsetXY'
  const isOffset = isOffsetX || isOffsetXY
  const isRTL = bannerDirection === 'rtl'
  const bannerColor = colorValue(bgColor)
  const isDarkBannerColor =
    (bgColor?.colorType === 'custom' && !!bannerColor && isDark(bannerColor)) ||
    (bgColor?.colorType === 'dark' && !!bannerColor)

  if (!hasBlocks && !hasBannerImage) {
    return null
  }

  return (
    <div className={isOffset ? 'max-w-[2000px] mx-auto' : ''}>
      <div
        className={cn(
          'flex max-lg:flex-col lg:items-center',
          isRTL ? 'flex-row-reverse max-lg:pl-gut-200' : 'max-lg:pr-gut-200',
          isOffset && 'pt-gut-200',
          !isOffset && isRTL && 'max-lg:items-end',
        )}
      >
        <div
          className={cn(
            'relative z-1 shadow-md max-lg:top-gut-150',
            isOffset ? 'lg:w-[40vw]' : 'w-[35vw] lg:w-[30vw]',
            isOffsetXY && 'lg:self-start lg:-top-gut-200',
            isOffset && isRTL && '-right-gut lg:-right-gut-200',
            isOffset && !isRTL && '-left-gut lg:-left-gut-200',
          )}
        >
          <ImageBlock block={bannerImage} trueSizes="40vw" />
        </div>
        <div className="relative">
          <div
            className={cn(
              'absolute top-0 w-[200vw] h-full rounded-banner',
              isRTL ? 'left-0' : 'right-0',
            )}
            style={{backgroundColor: bannerColor}}
          ></div>
          <div
            className={cn(
              'max-lg:px-gut max-lg:pt-gut-300 pt-gut-200 pb-gut-200 relative z-1',
              isOffset ? 'lg:w-[50vw]' : 'lg:w-[55vw]',
              !isRTL && 'lg:pr-gut',
              isRTL && 'lg:pl-gut',
              !isOffset && !isRTL && 'lg:pl-gut-200',
              !isOffset && isRTL && 'lg:pr-gut-200',
              isDarkBannerColor
                ? 'dark-theme theme-vars-only text-body'
                : 'light-theme theme-vars-only text-body',
            )}
          >
            <PbBlocks
              columnBlocks={pbBlocks as PbBlocksQueryResult}
              trueSizes="66vw"
              spaceBetweenBlocks={spaceBetweenBlocks || 'gap-gut'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
