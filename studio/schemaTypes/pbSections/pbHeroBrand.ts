import {defineField, defineType} from 'sanity'
import {IconHeroBrand} from '../../lib/customIcons'
import {imgAltField} from '../fields'

export default defineType({
  title: 'Hero - Brand',
  name: 'pbHeroBrand',
  type: 'object',
  icon: IconHeroBrand,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettingsHero',
    }),
    defineField({
      title: 'Brand',
      description: 'Determines the backdrop shape, logo, website link, and social links',
      name: 'brand',
      type: 'reference',
      to: [{type: 'brands'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Backdrop Shape Width',
      description: 'As a percentage of the screen width (you can go over 100)',
      name: 'shapeWidth',
      type: 'object',
      fields: [
        defineField({
          title: 'Mobile',
          name: 'mobile',
          type: 'number',
          initialValue: 95,
        }),
        defineField({
          title: 'Tablet',
          name: 'tablet',
          type: 'number',
          initialValue: 75,
        }),
        defineField({
          title: 'Desktop',
          name: 'desktop',
          type: 'number',
          initialValue: 50,
        }),
      ],
    }),
    defineField({
      title: 'Introduction Text',
      name: 'introductionText',
      type: 'text',
      rows: 3,
    }),
    defineField({
      title: 'Background Image (optional)',
      description: 'Full bleed image behind the brand shape',
      name: 'bgImage',
      type: 'image',
      options: {
        hotspot: {
          previews: [{title: '1:1', aspectRatio: 1}],
        },
        collapsible: false,
      },
      fields: [defineField(imgAltField)],
    }),
    defineField({
      title: 'Foreground Color - Top',
      description: 'Text and button color for content overlaid on the brand shape backdrop',
      name: 'fgColorTop',
      type: 'colorChoice',
    }),
    defineField({
      title: 'Background Color - Bottom',
      description: 'Color of the ornamental section divider below the hero',
      name: 'bgColorBottom',
      type: 'colorChoice',
    }),
    defineField({
      title: 'Foreground Color - Bottom (Mobile Only)',
      description: 'Text color for content below the hero on mobile',
      name: 'fgColorBottom',
      type: 'colorChoice',
    }),
  ],
  preview: {
    select: {
      title: 'brand.title',
      subtitle: 'introductionText',
      logo: 'brand.logo',
      shape: 'brand.bgShape',
    },
    prepare({title, subtitle, logo, shape}) {
      const media = shape ? shape : logo ? logo : IconHeroBrand
      return {
        title: title ? `Hero - Brand: ${title}` : 'Hero - Brand',
        subtitle: subtitle,
        media: media,
      }
    },
  },
})
