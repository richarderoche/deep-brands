import {defineType} from 'sanity'

export default defineType({
  name: 'ptBold',
  title: 'RTE',
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        decorators: [{title: 'Strong', value: 'strong'}],
        annotations: [],
      },
      styles: [],
      lists: [],
    },
  ],
})
