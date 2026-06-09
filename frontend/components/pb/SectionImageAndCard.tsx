'use client'
import {colorValue} from '@/lib/colorValue'
import {cn} from '@/lib/utils'
import {PbImageWithCard} from '@/sanity.types'
import {PbBlocksQueryResult} from '@/types'
import Card from '../shared/Card'
import Revealer from '../shared/Revealer'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import PbBlocks, {ImageBlock} from './PbBlocks'

export default function SectionImageAndCard({section}: {section: PbImageWithCard}) {
  const {pbBlocks, spaceBetweenBlocks, cardColor, backgroundImage, size} = section
  const hasBlocks = pbBlocks && pbBlocks.length > 0
  const hasImage = backgroundImage && backgroundImage.image
  const bgColor = colorValue(cardColor)

  if (!hasBlocks && !hasImage) {
    return null
  }

  return (
    <SiteWidth>
      <SiteGrid>
        <div
          className={cn(
            'col-span-12 md:col-span-10 md:col-start-2 -my-gut-75',
            size === 8 ? 'lg:col-span-8 lg:col-start-3' : 'lg:col-span-6 lg:col-start-4',
          )}
        >
          <Revealer direction="fade-up">
            {hasImage && (
              <div className="-mx-gut-50 relative top-gut-75">
                <ImageBlock block={backgroundImage} trueSizes="40vw" />
              </div>
            )}
            {hasBlocks && (
              <Revealer direction="stagger">
                <div className="md:px-gut-50 relative z-1 -top-gut-75">
                  <Card bgColor={bgColor}>
                    <PbBlocks
                      columnBlocks={pbBlocks as PbBlocksQueryResult}
                      trueSizes="66vw"
                      spaceBetweenBlocks={spaceBetweenBlocks || 'gap-gut'}
                    />
                  </Card>
                </div>
              </Revealer>
            )}
          </Revealer>
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}
