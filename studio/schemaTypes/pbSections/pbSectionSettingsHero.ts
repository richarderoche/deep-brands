import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Section Settings',
  name: 'pbSectionSettingsHero',
  description: '(Show/Hide, Anchor ID, & Margins)',
  type: 'object',
  icon: CogIcon,
  fieldsets: [{title: 'Extra Margin', name: 'margin', options: {columns: 2}}],
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      title: 'Enable Section',
      name: 'enableSection',
      type: 'boolean',
      description: 'Disable to hide this section without deleting it',
      initialValue: true,
    }),
    defineField({
      title: 'ID (for anchor links)',
      name: 'sectionId',
      type: 'string',
      validation: (Rule) => Rule.regex(/^\S*$/).warning('No spaces allowed'),
    }),
    defineField({
      title: 'Color',
      name: 'sectionBgColor',
      type: 'colorChoice',
    }),
  ],
})
