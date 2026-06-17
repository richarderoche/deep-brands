'use client'

import {PbSections, StickyImages} from '@/sanity.types'
import {Image} from 'sanity'
import PbSectionContent from './PbSectionContent'
import PbSectionShell, {getPbSectionDarkBg} from './PbSectionShell'
import PbStickyImages from './PbStickyImages'
import {SanityPathSegment, SanityVisualEditingPath} from './SanityVisualEditingContext'

type PbSectionGroup = {
  _key: string
  _type: 'pbSectionGroup'
  sectionSettings?: PbSections[number]['sectionSettings']
  stickyBackgroundImages?: boolean
  stickyImages?: {
    topLeft?: Image
    topRight?: Image
    bottomLeft?: Image
    bottomRight?: Image
  }
  pbGroupSections?: PbSections
}

type PbSectionItem = PbSections[number] | PbSectionGroup

export interface PageBuilderContentProps {
  firstIsHero: boolean
  firstPbSectionKey: string
}

interface PageBuilderSectionListProps extends PageBuilderContentProps {
  sections: PbSectionItem[]
  pathPrefix: SanityPathSegment[]
  /** Nested lists skip page-level header offset and first-section tracking. */
  isNested?: boolean
}

function PageBuilderSectionList({
  sections,
  pathPrefix,
  firstIsHero,
  firstPbSectionKey,
  isNested = false,
}: PageBuilderSectionListProps) {
  if (!sections?.length) return null

  const items = sections.flatMap((section) => {
    const {_key, _type, sectionSettings} = section
    const {enableSection = true} = sectionSettings || {}

    if (!enableSection) return []

    const sectionPath: SanityPathSegment[] = [...pathPrefix, {_key}]
    const isFirst = !isNested && _key === firstPbSectionKey
    const needsHeaderSpace = isFirst && !firstIsHero

    if (_type === 'pbSectionGroup') {
      const group = section as PbSectionGroup
      const {stickyBackgroundImages, stickyImages} = group
      const hasStickyImages = Boolean(
        stickyBackgroundImages &&
        (stickyImages?.topLeft ||
          stickyImages?.topRight ||
          stickyImages?.bottomLeft ||
          stickyImages?.bottomRight),
      )
      return (
        <PbSectionShell
          key={_key}
          sectionKey={_key}
          sectionType={_type}
          sectionSettings={sectionSettings}
          sectionPath={sectionPath}
          needsHeaderSpace={needsHeaderSpace}
          hasStickyImages={hasStickyImages}
        >
          {hasStickyImages ? (
            <PbStickyImages
              images={stickyImages as StickyImages}
              marginTop={sectionSettings?.marginTop}
              marginBottom={sectionSettings?.marginBottom}
            >
              <SanityVisualEditingPath path={[...sectionPath]}>
                <PageBuilderSectionList
                  sections={group.pbGroupSections ?? []}
                  pathPrefix={[...sectionPath, 'pbGroupSections']}
                  firstIsHero={false}
                  firstPbSectionKey=""
                  isNested
                />
              </SanityVisualEditingPath>
            </PbStickyImages>
          ) : (
            <SanityVisualEditingPath path={[...sectionPath]}>
              <PageBuilderSectionList
                sections={group.pbGroupSections ?? []}
                pathPrefix={[...sectionPath, 'pbGroupSections']}
                firstIsHero={false}
                firstPbSectionKey=""
                isNested
              />
            </SanityVisualEditingPath>
          )}
        </PbSectionShell>
      )
    }

    const isDarkBgColor = getPbSectionDarkBg(sectionSettings)

    return (
      <PbSectionShell
        key={_key}
        sectionKey={_key}
        sectionType={_type}
        sectionSettings={sectionSettings}
        sectionPath={sectionPath}
        needsHeaderSpace={needsHeaderSpace}
      >
        <SanityVisualEditingPath path={[...sectionPath]}>
          <PbSectionContent
            section={section as PbSections[number]}
            sectionKey={_key}
            isFirst={isFirst}
            isDarkBgColor={isDarkBgColor}
          />
        </SanityVisualEditingPath>
      </PbSectionShell>
    )
  })

  return <div className="flex flex-col">{items}</div>
}

export default function PageBuilderSections({
  pbSections,
  firstIsHero,
  firstPbSectionKey,
}: {
  pbSections: PbSections
  firstIsHero: boolean
  firstPbSectionKey: string
}) {
  return (
    <PageBuilderSectionList
      sections={pbSections as PbSectionItem[]}
      pathPrefix={['pbSections']}
      firstIsHero={firstIsHero}
      firstPbSectionKey={firstPbSectionKey}
    />
  )
}
