'use client'

import {PbSections} from '@/sanity.types'
import {PbHeroShapeSection} from '@/types'
import SectionBanner from './SectionBanner'
import SectionFeature from './SectionFeature'
import SectionGridDouble from './SectionGridDouble'
import SectionGridMulti from './SectionGridMulti'
import SectionGridSingle from './SectionGridSingle'
import SectionHeroBrand, {PbHeroBrandSection} from './SectionHeroBrand'
import SectionHeroHome from './SectionHeroHome'
import SectionHeroShape from './SectionHeroShape'
import SectionImageAndCard from './SectionImageAndCard'
import SectionNews from './SectionNews'
import SectionTimeline from './SectionTimeline'
import SectionTriptych from './SectionTriptych'
import SectionValues from './SectionValues'

type PbSection = PbSections[number]

export interface PbSectionContentProps {
  section: PbSection
  sectionKey: string
  isFirst: boolean
  isDarkBgColor: boolean
}

export default function PbSectionContent({
  section,
  sectionKey,
  isFirst,
  isDarkBgColor,
}: PbSectionContentProps) {
  switch (section._type) {
    case 'pbGridMulti':
      return <SectionGridMulti section={section} />
    case 'pbGridSingle':
      return (
        <SectionGridSingle
          section={section}
          sectionKey={sectionKey}
          isDarkBgColor={isDarkBgColor}
        />
      )
    case 'pbGridDouble':
      return <SectionGridDouble section={section} sectionKey={sectionKey} />
    case 'pbHeroShape':
      return (
        <SectionHeroShape
          section={section as unknown as PbHeroShapeSection}
          isDarkBgColor={isDarkBgColor}
        />
      )
    case 'pbHeroBrand':
      return <SectionHeroBrand section={section as unknown as PbHeroBrandSection} />
    case 'pbHeroHome':
      return <SectionHeroHome section={section} />
    case 'pbBanner':
      return <SectionBanner section={section} />
    case 'pbImageWithCard':
      return <SectionImageAndCard section={section} />
    case 'pbFeature':
      return <SectionFeature section={section} />
    case 'pbTimeline':
      return <SectionTimeline section={section} />
    case 'pbNews':
      return <SectionNews section={section} />
    case 'pbValues':
      return <SectionValues section={section} />
    case 'pbTriptych':
      return <SectionTriptych section={section} isFirst={isFirst} />
    default:
      return null
  }
}
