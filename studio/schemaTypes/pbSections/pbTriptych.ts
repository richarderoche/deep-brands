import {GalleryHorizontal} from 'lucide-react'
import {defineField, defineType} from 'sanity'
import {imgAltField, sectionNameField} from '../fields'

const triptychTypeOptions = [
  {title: 'Still', value: 'still'},
  {title: 'Carousel - Singles', value: 'carouselSingles'},
  {title: 'Carousel - Groups', value: 'carouselGroups'},
]

export default defineType({
  name: 'pbTriptych',
  title: 'Triptych Section',
  type: 'object',
  icon: GalleryHorizontal,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(sectionNameField),
    defineField({
      title: 'Triptych Type',
      name: 'triptychType',
      type: 'string',
      options: {
        list: triptychTypeOptions,
      },
    }),
    defineField({
      title: 'Images',
      name: 'images',
      type: 'array',
      hidden: ({parent}) => !parent?.triptychType,
      of: [
        defineField({
          title: 'Image',
          name: 'image',
          type: 'image',
          options: {
            hotspot: {
              previews: [{title: '4:5', aspectRatio: 0.8}],
            },
            collapsible: false,
          },
          fields: [defineField(imgAltField)],
        }),
      ],
      validation: (Rule) =>
        Rule.custom((images, context) => {
          const triptychType = (context.parent as {triptychType?: string})?.triptychType
          if (!triptychType) return true

          const count = images?.length ?? 0

          switch (triptychType) {
            case 'still':
              if (count !== 3) {
                return 'Still triptych requires exactly 3 images.'
              }
              return true
            case 'carouselGroups':
              if (count < 6) {
                return 'Carousel groups requires at least 6 images.'
              }
              if (count % 3 !== 0) {
                return 'Carousel groups requires the image count to be divisible by 3 (e.g. 6, 9, 12).'
              }
              return true
            case 'carouselSingles':
              if (count < 4) {
                return 'Carousel singles requires at least 4 images.'
              }
              return true
            default:
              return true
          }
        }),
    }),
  ],
  preview: {
    select: {
      title: 'sectionSettings.name',
      subtitle: 'triptychType',
      media: 'images.1',
    },
    prepare({title, subtitle, media}) {
      const subtitleText = subtitle
        ? `Type: ${triptychTypeOptions.find((o) => o.value === subtitle)?.title}`
        : 'Triptych Section'
      return {
        title: title ? `Triptych: ${title}` : 'Triptych Section',
        subtitle: subtitleText,
        media: media ? media : GalleryHorizontal,
      }
    },
  },
})
