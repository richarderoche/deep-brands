import {cn, getGridClasses, getOuterSettings} from '@/lib/utils'
import {PbGridSingle} from '@/sanity.types'

import IconLogoShape from '../icons/IconLogoShape'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import GridCol from './GridCol'

export default function SectionGridSingle({
  section,
  sectionKey,
  isDarkBgColor,
}: {
  section: PbGridSingle
  sectionKey: string
  isDarkBgColor: boolean
}) {
  const {rowWidth, pbBlocks, revealEffect, spaceBetweenBlocks, centerBlocks, bgLogoShape, blockWidths} =
    section
  // Skip if no blocks yet
  if (!pbBlocks || pbBlocks.length === 0) {
    return null
  }
  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''

  return (
    <SiteWidth className={cn(bgLogoShape && 'py-gut-500 lg:py-gut-600')}>
      <SiteGrid>
        <div className={outerClasses}>
          <div className={cn(bgLogoShape && 'relative w-full z-10')}>
            {bgLogoShape && (
              <div className="absolute min-w-full min-h-full aspect-1134/691 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-200 md:scale-150 lg:scale-125">
                <IconLogoShape
                  className={cn(
                    'opacity-15 w-full h-full object-cover object-center',
                    isDarkBgColor ? 'text-black' : 'text-white',
                  )}
                />
              </div>
            )}
            <div className="relative z-2 w-full">
              <GridCol
                col={{
                  _key: sectionKey,
                  pbBlocks,
                  revealEffect,
                  spaceBetweenBlocks,
                  centerBlocks,
                  blockWidths,
                }}
                outerSettings={outerSettings}
              />
            </div>
          </div>
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}
