import { defineType } from 'sanity'

export default defineType({
  name: 'ptItalic',
  title: 'RTE',
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        decorators: [
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [],
      },
      styles: [],
      lists: [],
    },
  ],
})
