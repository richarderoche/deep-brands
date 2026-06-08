import { defineField, defineType } from 'sanity'
import { IconBanner } from '../../lib/customIcons'
import { getTypeTitles } from '../../lib/utils'
import { imgAltField, sectionNameField, spaceBetweenBlocksField } from '../fields'
import { crops, hotspotPreviews, imageMaskTypes } from '../pbBlocks/pbBlockImage'

export default defineType({
  title: 'Banner Section',
  name: 'pbBanner',
  type: 'object',
  icon: IconBanner,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(sectionNameField),
    defineField({
      name: 'bannerDirection',
      type: 'string',
      options: {
        list: [{ title: 'Left to Right', value: 'ltr' }, { title: 'Right to Left', value: 'rtl' }],
      },
      initialValue: 'ltr',
    }),
    defineField({
      title: 'Banner Color',
      name: 'bgColor',
      type: 'colorChoice',
    }),
    defineField({
      title: 'Banner Image',
      name: 'bannerImage',
      type: 'object',
      fields: [
        defineField({
          title: 'Position',
          name: 'position',
          type: 'string',
          options: {
            list: [{ title: 'Offset XY', value: 'offsetXY' }, { title: 'Offset X', value: 'offsetX' }, { title: 'Edge', value: 'edge' }],
          },
          initialValue: 'offset',
        }),
        defineField({
          title: 'Image',
          name: 'image',
          type: 'image',
          fields: [
            defineField(imgAltField),
          ],
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
          hidden: ({ parent }) => parent?.imageMaskType !== 'none' && parent?.imageMaskType !== 'notches',
        }),        
        defineField({
          name: 'priority',
          title: 'High Priority Loading',
          type: 'boolean',
          description:
            'Enable for images above the fold to improve loading performance',
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
    prepare({ sectionName, blocks }) {
      const blockList = blocks ? blocks.map((block: any) => block._type) : []
      const blockTitles = getTypeTitles(blockList)
      return {
        title: sectionName
          ? `Banner: ${sectionName}`
          : 'Banner Section',
        subtitle: `Blocks: ${blockTitles || 'None'}`,
        media: IconBanner,
      }
    },
  },
})
