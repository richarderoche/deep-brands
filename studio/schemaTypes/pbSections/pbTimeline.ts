import {defineField, defineType} from 'sanity'
import {timelineIcon} from '../../lib/customIcons'
import {getRowWidthTitle, ptToText} from '../../lib/utils'
import {imgAltField, rowWidthFieldLimited} from '../fields'

export default defineType({
  title: 'Timeline',
  name: 'pbTimeline',
  type: 'object',
  icon: timelineIcon,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(rowWidthFieldLimited),
    defineField({
      title: 'Preheading',
      name: 'preheading',
      type: 'string',
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Events',
      name: 'events',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              title: 'Year',
              name: 'year',
              type: 'string',
            }),
            defineField({
              title: 'Heading',
              name: 'heading',
              type: 'string',
            }),
            defineField({
              title: 'Description',
              name: 'description',
              type: 'ptBold',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: {
                  previews: [{title: '1:1', aspectRatio: 1}],
                },
              },
              fields: [
                defineField(imgAltField),
                defineField({
                  name: 'notchFrame',
                  title: 'Square Notch Frame?',
                  description:
                    'Disable if you want to render the image without cropping or framing.',
                  type: 'boolean',
                  initialValue: true,
                }),
              ],
            }),
          ],
          preview: {
            select: {
              year: 'year',
              heading: 'heading',
              description: 'description',
              image: 'image',
            },
            prepare({year, heading, description, image}) {
              const subtitle = description ? ptToText(description) : 'No Description'
              return {
                title: year ? `${year} - ${heading}` : heading || 'No Heading',
                subtitle: subtitle,
                media: image ? image : timelineIcon,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      rowWidth: 'rowWidth',
      title: 'title',
      events: 'events',
    },
    prepare({rowWidth, title, events}) {
      const rowWidthTitle = getRowWidthTitle(rowWidth)
      const rowCount = events ? events.length : 0
      return {
        title: title ? `Timeline: ${title}` : 'Timeline',
        subtitle: `${rowWidthTitle} Width / Events: ${rowCount || 'None'}`,
        media: timelineIcon,
      }
    },
  },
})
