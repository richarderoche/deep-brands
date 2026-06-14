import {cn, getGridClasses, getOuterSettings} from '@/lib/utils'

import {PbTimeline} from '@/sanity.types'
import Revealer from '../shared/Revealer'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import {useSanityDataAttribute} from './SanityVisualEditingContext'
import TimelineRow from './TimelineRow'

export default function SectionTimeline({section}: {section: PbTimeline}) {
  const {getDataAttribute} = useSanityDataAttribute()
  const {rowWidth, preheading, title, events} = section
  const hasPreheading = preheading && preheading.length > 0
  const hasTitle = title && title.length > 0
  const totalEvents = events?.length || 0
  // Skip if no events yet
  if (!events || totalEvents === 0) {
    return null
  }
  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''

  return (
    <SiteWidth>
      <SiteGrid>
        <div className={cn(outerClasses)}>
          {(hasPreheading || hasTitle) && (
            <Revealer className="mb-gut-150 md:text-center" direction="fade-up">
              {hasPreheading && (
                <h2
                  data-sanity={getDataAttribute(['preheading'])}
                  className="ts-h6 ts-sans-wide text-blue-600"
                >
                  {preheading}
                </h2>
              )}
              {hasTitle && (
                <h3 data-sanity={getDataAttribute(['title'])} className="ts-h1 ts-serif italic">
                  {title}
                </h3>
              )}
            </Revealer>
          )}
          <div>
            {events.map((event, i) => (
              <TimelineRow
                key={event._key}
                row={event}
                isFirst={i === 0}
                isLast={i === events.length - 1}
                rowWidth={rowWidth}
              />
            ))}
          </div>
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}
