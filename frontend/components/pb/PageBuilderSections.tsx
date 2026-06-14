'use client'

import {isDark} from '@/lib/checkColor'
import {colorValue} from '@/lib/colorValue'
import {cn} from '@/lib/utils'
import {PbSections} from '@/sanity.types'
import {PageBuilderData} from '@/types'
import IconOrnamentTop from '../icons/IconOrnamentTop'
import {
  SanityPathSegment,
  SanityVisualEditingPath,
  useSanityDataAttribute,
} from './SanityVisualEditingContext'
import SectionBanner from './SectionBanner'
import SectionGridDouble from './SectionGridDouble'
import SectionGridMulti from './SectionGridMulti'
import SectionGridSingle from './SectionGridSingle'
import SectionHeroShape from './SectionHeroShape'
import SectionImageAndCard from './SectionImageAndCard'
import SectionNews from './SectionNews'
import SectionTimeline from './SectionTimeline'
import SectionTriptych from './SectionTriptych'
import SectionValues from './SectionValues'

export interface PageBuilderContentProps {
  data: PageBuilderData
  baseUrl: string
  firstPbSectionKey: string
}

export default function PageBuilderSections({
  pbSections,
  firstPbSectionKey,
}: {
  pbSections: PbSections
  firstPbSectionKey: string
}) {
  const {getDataAttribute} = useSanityDataAttribute()
  if (!pbSections?.length) return null

  return (
    <div className="flex flex-col">
      {pbSections.map((section) => {
        const {_key, _type, sectionSettings} = section
        const {
          enableSection = true,
          sectionId,
          marginTop,
          marginBottom,
          sectionBgColor,
          topOrnament,
        } = sectionSettings || {}

        const bgColor = colorValue(sectionBgColor)
        const isDarkBgColor =
          (sectionBgColor?.colorType === 'custom' && !!bgColor && isDark(bgColor)) ||
          (sectionBgColor?.colorType === 'dark' && !!bgColor)

        if (!enableSection) return null

        const sectionPath: SanityPathSegment[] = ['pbSections', {_key}]

        return (
          <section
            id={sectionId ? sectionId : 'section-' + _key}
            key={_key}
            className={cn(
              'group',
              isDarkBgColor && 'dark-theme theme-vars-only text-body',
              sectionBgColor?.colorType === 'gradient' && 'db-gradient',
            )}
            data-sanity={getDataAttribute(sectionPath)}
            style={{backgroundColor: bgColor}}
          >
            {topOrnament && (
              <IconOrnamentTop
                style={{color: bgColor}}
                className={cn('h-ornament w-auto', !bgColor && 'text-bg')}
              />
            )}
            <div className={cn('py-gut-50 group-first:pt-0 group-last:pb-gut-500')}>
              <div
                style={{
                  paddingTop: marginTop ? `calc(var(--gut) * ${marginTop})` : undefined,
                  paddingBottom: marginBottom ? `calc(var(--gut) * ${marginBottom})` : undefined,
                }}
              >
                <SanityVisualEditingPath path={[...sectionPath]}>
                  {_type === 'pbGridMulti' && <SectionGridMulti section={section} />}
                  {_type === 'pbGridSingle' && (
                    <SectionGridSingle
                      section={section}
                      sectionKey={_key}
                      isDarkBgColor={isDarkBgColor}
                    />
                  )}
                  {_type === 'pbGridDouble' && (
                    <SectionGridDouble section={section} sectionKey={_key} />
                  )}
                  {_type === 'pbHeroShape' && (
                    <SectionHeroShape section={section} isDarkBgColor={isDarkBgColor} />
                  )}
                  {_type === 'pbBanner' && <SectionBanner section={section} />}
                  {_type === 'pbImageWithCard' && <SectionImageAndCard section={section} />}
                  {_type === 'pbTimeline' && <SectionTimeline section={section} />}
                  {_type === 'pbNews' && <SectionNews section={section} />}
                  {_type === 'pbValues' && <SectionValues section={section} />}
                  {_type === 'pbTriptych' && (
                    <SectionTriptych section={section} isFirst={_key === firstPbSectionKey} />
                  )}
                </SanityVisualEditingPath>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
