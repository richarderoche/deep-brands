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
import SectionTitleHero from './SectionTitleHero'

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
        const {_key, sectionSettings} = section
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
            className={cn('group', isDarkBgColor && 'dark-theme theme-vars-only text-body')}
            data-sanity={getDataAttribute(sectionPath)}
            style={{backgroundColor: bgColor}}
          >
            {topOrnament && (
              <IconOrnamentTop
                style={{color: bgColor}}
                className={cn('h-ornament', !bgColor && 'text-bg')}
              />
            )}
            <div className={cn('py-gut-50 group-first:pt-0 group-last:pb-gut-300')}>
              <div
                style={{
                  paddingTop: marginTop ? `calc(var(--gut) * ${marginTop})` : undefined,
                  paddingBottom: marginBottom ? `calc(var(--gut) * ${marginBottom})` : undefined,
                }}
              >
                <SanityVisualEditingPath path={[...sectionPath]}>
                  {section._type === 'pbGridMulti' && <SectionGridMulti section={section} />}
                  {section._type === 'pbGridSingle' && (
                    <SectionGridSingle
                      section={section}
                      sectionKey={_key}
                      isDarkBgColor={isDarkBgColor}
                    />
                  )}
                  {section._type === 'pbGridDouble' && (
                    <SectionGridDouble section={section} sectionKey={_key} />
                  )}
                  {section._type === 'pbTitleSection' && (
                    <SectionTitleHero section={section} isFirst={_key === firstPbSectionKey} />
                  )}
                  {section._type === 'pbBanner' && <SectionBanner section={section} />}
                </SanityVisualEditingPath>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
