import {defineField, defineType} from 'sanity'
import {IconFeature} from '../../lib/customIcons'
import {getTypeTitles} from '../../lib/utils'
import {
  imgAltField,
  rowWidthFieldLimited,
  sectionNameField,
  spaceBetweenBlocksField,
} from '../fields'
import {crops, hotspotPreviews, imageMaskTypes} from '../pbBlocks/pbBlockImage'

export default defineType({
  title: 'Feature',
  name: 'pbFeature',
  type: 'object',
  icon: IconFeature,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(sectionNameField),
    defineField(rowWidthFieldLimited),
    defineField({
      title: 'Card Color',
      name: 'cardColor',
      type: 'colorChoice',
    }),
    defineField({
      title: 'Featured Image',
      name: 'featuredImage',
      type: 'object',
      fields: [
        defineField({
          title: 'Image',
          name: 'image',
          type: 'image',
          fields: [defineField(imgAltField)],
          options: {
            hotspot: {
              previews: hotspotPreviews,
            },
            collapsible: false,
          },
        }),
        defineField({
          name: 'imageMaskType',
          title: 'Image Mask',
          type: 'string',
          options: {
            list: imageMaskTypes,
          },
          initialValue: 'none',
        }),
        defineField({
          name: 'imageCrop',
          title: 'Aspect Ratio',
          type: 'number',
          options: {
            list: crops,
          },
          initialValue: 0,
          hidden: ({parent}) =>
            parent?.imageMaskType !== 'none' && parent?.imageMaskType !== 'notches',
        }),
        defineField({
          name: 'priority',
          title: 'High Priority Loading',
          type: 'boolean',
          description: 'Enable for images above the fold to improve loading performance',
          initialValue: false,
        }),
        defineField({
          name: 'bottomAlign',
          title: 'Bottom Align Image?',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      title: 'Content Blocks',
      name: 'pbBlocks',
      type: 'pbBlocks',
    }),
    defineField(spaceBetweenBlocksField),
  ],
  preview: {
    select: {
      sectionName: 'sectionName',
      blocks: 'pbBlocks',
      image: 'featuredImage.image',
    },
    prepare({sectionName, blocks, image}) {
      const blockList = blocks ? blocks.map((block: any) => block._type) : []
      const blockTitles = getTypeTitles(blockList)
      return {
        title: sectionName ? `Feature: ${sectionName}` : 'Feature Section',
        subtitle: `Blocks: ${blockTitles || 'None'}`,
        media: image ? image : IconFeature,
      }
    },
  },
})
