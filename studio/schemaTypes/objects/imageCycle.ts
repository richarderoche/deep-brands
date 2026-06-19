import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageCycle',
  title: 'Image Cycle',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images (max 5)',
      type: 'array',
      validation: (Rule) => Rule.max(5),
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text (group-wide summary)',
      type: 'string',
    }),
  ],
})
