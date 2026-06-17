import {Group} from 'lucide-react'
import {defineField, defineType} from 'sanity'
import {pbSectionTypes} from '.'
import {formatPbSectionGroupPreview} from '../../lib/utils'
import {sectionNameField} from '../fields'

export default defineType({
  name: 'pbSectionGroup',
  title: 'Section Group',
  type: 'object',
  icon: Group,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(sectionNameField),
    defineField({
      title: 'Sticky Background Images?',
      name: 'stickyBackgroundImages',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Sticky Images',
      name: 'stickyImages',
      type: 'object',
      hidden: ({parent}) => !parent?.stickyBackgroundImages,
      options: {
        columns: 2,
      },
      fields: [
        defineField({
          title: 'Top Left',
          name: 'topLeft',
          type: 'image',
        }),
        defineField({
          title: 'Top Right',
          name: 'topRight',
          type: 'image',
        }),
        defineField({
          title: 'Bottom Left',
          name: 'bottomLeft',
          type: 'image',
        }),
        defineField({
          title: 'Bottom Right',
          name: 'bottomRight',
          type: 'image',
        }),
      ],
    }),
    defineField({
      name: 'pbGroupSections',
      title: 'Sections',
      type: 'array',
      of: [...pbSectionTypes],
    }),
  ],
  preview: {
    select: {
      title: 'sectionName',
      sections: 'pbGroupSections',
    },
    prepare({title, sections}) {
      return {
        title: `Group: ${title}` || 'Section Group',
        subtitle: formatPbSectionGroupPreview(sections),
        media: Group,
      }
    },
  },
})
