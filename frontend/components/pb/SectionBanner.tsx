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
          'max-md:flex-col flex md:items-center',
          isRTL && 'flex-row-reverse',
          isOffset && 'pt-gut-200',
        )}
      >
        <div
          className={cn(
            'relative z-1',
            isOffset ? 'w-[40vw]' : 'w-[30vw]',
            isOffsetXY && 'self-start -top-gut-200',
            isOffset && isRTL && '-right-gut-200',
            isOffset && !isRTL && '-left-gut-200',
          )}
        >
          <ImageBlock block={bannerImage} trueSizes="30vw" />
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
              'py-gut-200 relative z-1 border',
              isOffset ? 'w-[50vw]' : 'w-[55vw]',
              !isRTL && 'pr-gut',
              isRTL && 'pl-gut',
              !isOffset && !isRTL && 'pl-gut-200',
              !isOffset && isRTL && 'pr-gut-200',
              isDarkBannerColor
                ? 'dark-theme theme-vars-only text-body'
                : 'light-theme theme-vars-only text-body',
            )}
          >
            <PbBlocks
              columnBlocks={pbBlocks as PbBlocksQueryResult}
              trueSizes="66vw"
              spaceBetweenBlocks={spaceBetweenBlocks || 'gap-gut'}
              className="border"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
