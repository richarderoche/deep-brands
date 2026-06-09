import {defineField, defineType} from 'sanity'
import {IconButtonGroup} from '../../lib/customIcons'

export default defineType({
  title: 'Button Group',
  name: 'pbBlockButtonMulti',
  type: 'object',
  icon: IconButtonGroup,
  fields: [
    defineField({
      title: 'Buttons',
      name: 'buttons',
      type: 'array',
      of: [{type: 'pbBlockButton'}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      buttons: 'buttons',
    },
    prepare({buttons}) {
      const count = buttons?.length ?? 0
      return {
        title: 'Button Group',
        subtitle: count === 1 ? '1 button' : `${count} buttons`,
        media: IconButtonGroup,
      }
    },
  },
})
