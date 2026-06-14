import {HandFist} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Values Section',
  name: 'pbValues',
  type: 'object',
  icon: HandFist,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField({
      name: 'colorSteps',
      title: 'Color Steps (between 4 and 6)',
      type: 'number',
      initialValue: 4,
      validation: (Rule) => Rule.min(4).max(6),
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [
        defineField({
          name: 'value',
          title: 'Value',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              caption: 'caption',
            },
            prepare({title, caption}) {
              return {
                title: title ? title : 'Value',
                subtitle: caption ? caption : 'No caption',
                media: HandFist,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      values: 'values',
    },
    prepare({title, values}) {
      const valueCount = values ? values.length : 0
      return {
        title: title ? title : 'Values Section',
        subtitle: 'Values: ' + valueCount || 'None',
        media: HandFist,
      }
    },
  },
})
