import {isDark} from '@/lib/checkColor'
import {colorValue} from '@/lib/colorValue'
import {cn} from '@/lib/utils'
import {PbSectionSettings, PbSectionSettingsHero} from '@/sanity.types'
import {type ReactNode} from 'react'
import IconOrnamentTop from '../icons/IconOrnamentTop'
import {SanityPathSegment, useSanityDataAttribute} from './SanityVisualEditingContext'

export type PbSectionSettingsLike = PbSectionSettings | PbSectionSettingsHero

export interface PbSectionShellProps {
  sectionKey: string
  sectionType: string
  sectionSettings?: PbSectionSettingsLike | null
  sectionPath: SanityPathSegment[]
  needsHeaderSpace?: boolean
  hasStickyImages?: boolean
  className?: string
  children: ReactNode
}

export default function PbSectionShell({
  sectionKey,
  sectionType,
  sectionSettings,
  sectionPath,
  needsHeaderSpace = false,
  hasStickyImages = false,
  className,
  children,
}: PbSectionShellProps) {
  const {getDataAttribute} = useSanityDataAttribute()
  const {sectionId, marginTop, marginBottom, sectionBgColor, topOrnament} = sectionSettings || {}

  const bgColor = colorValue(sectionBgColor)
  const isDarkBgColor =
    (sectionBgColor?.colorType === 'custom' && !!bgColor && isDark(bgColor)) ||
    (sectionBgColor?.colorType === 'dark' && !!bgColor)

  return (
    <section
      id={sectionId ? sectionId : 'section-' + sectionKey}
      data-pb-section={sectionType}
      className={cn(
        'group',
        needsHeaderSpace && 'pt-header',
        isDarkBgColor && 'dark-theme theme-vars-only text-body',
        sectionBgColor?.colorType === 'gradient' && 'db-gradient',
        hasStickyImages && 'relative',
        className,
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
      <div
        className={cn(
          sectionType !== 'pbHeroBrand' && sectionType !== 'pbSectionGroup' && 'py-gut-50',
          'group-first:pt-0 group-last:pb-gut-500',
        )}
      >
        <div
          style={
            !hasStickyImages
              ? {
                  paddingTop: marginTop ? `calc(var(--gut) * ${marginTop})` : undefined,
                  paddingBottom: marginBottom ? `calc(var(--gut) * ${marginBottom})` : undefined,
                }
              : undefined
          }
        >
          {children}
        </div>
      </div>
    </section>
  )
}

export function getPbSectionDarkBg(sectionSettings?: PbSectionSettingsLike | null) {
  const sectionBgColor = sectionSettings?.sectionBgColor
  const bgColor = colorValue(sectionBgColor)
  return (
    (sectionBgColor?.colorType === 'custom' && !!bgColor && isDark(bgColor)) ||
    (sectionBgColor?.colorType === 'dark' && !!bgColor)
  )
}
