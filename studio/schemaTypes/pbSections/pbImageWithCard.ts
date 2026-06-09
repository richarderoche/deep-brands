import {PanelBottom} from 'lucide-react'
import {defineField, defineType} from 'sanity'
import {getTypeTitles} from '../../lib/utils'
import {imgAltField, sectionNameField, spaceBetweenBlocksField} from '../fields'
import {crops, hotspotPreviews, imageMaskTypes} from '../pbBlocks/pbBlockImage'

export default defineType({
  title: 'Image + Card',
  name: 'pbImageWithCard',
  type: 'object',
  icon: PanelBottom,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(sectionNameField),
    defineField({
      title: 'Size (Desktop)',
      name: 'size',
      type: 'number',
      initialValue: 6,
      options: {
        list: [
          {title: 'Small', value: 6},
          {title: 'Large', value: 8},
        ],
      },
    }),
    defineField({
      title: 'Card Color',
      name: 'cardColor',
      type: 'colorChoice',
    }),
    defineField({
      title: 'Background Image',
      name: 'backgroundImage',
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
      ],
    }),
    defineField({
      title: 'Blocks',
      name: 'pbBlocks',
      type: 'pbBlocks',
    }),
    defineField(spaceBetweenBlocksField),
  ],
  preview: {
    select: {
      sectionName: 'sectionName',
      blocks: 'pbBlocks',
    },
    prepare({sectionName, blocks}) {
      const blockList = blocks ? blocks.map((block: any) => block._type) : []
      const blockTitles = getTypeTitles(blockList)
      return {
        title: sectionName ? `Image + Card: ${sectionName}` : 'Image + Card Section',
        subtitle: `Blocks: ${blockTitles || 'None'}`,
        media: PanelBottom,
      }
    },
  },
})
