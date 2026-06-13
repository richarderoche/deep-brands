import {Newspaper} from 'lucide-react'
import {defineField, defineType} from 'sanity'
import {imgAltField} from '../fields'

export default defineType({
  title: 'News Section',
  name: 'pbNews',
  type: 'object',
  icon: Newspaper,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'colorSteps',
      title: 'Color Steps (between 4 and 6)',
      description:
        'Choose how many color steps to use for the card backgrounds so that the first and last cards in the loop are not the same or too similar',
      type: 'number',
      initialValue: 4,
      validation: (Rule) => Rule.min(4).max(6),
    }),
    defineField({
      name: 'newsPosts',
      title: 'News Posts',
      type: 'array',
      of: [
        defineField({
          name: 'newsPost',
          title: 'News Post',
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
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: {
                  previews: [{title: '5:4', aspectRatio: 1.25}],
                },
                collapsible: false,
              },
              fields: [defineField(imgAltField)],
            }),
            defineField({
              title: 'Link URL',
              name: 'url',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https'],
                }),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              caption: 'caption',
              image: 'image',
            },
            prepare({title, caption, image}) {
              return {
                title: title || 'News Post',
                subtitle: caption || 'No caption',
                media: image ? image : Newspaper,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'pbBlockButton',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      newsPosts: 'newsPosts',
    },
    prepare({title, newsPosts}) {
      const postCount = newsPosts ? newsPosts.length : 0
      return {
        title: title || 'News Section',
        subtitle: 'Posts: ' + postCount || 'None',
        media: Newspaper,
      }
    },
  },
})
