import {defineField, defineType} from 'sanity'
import {IconHeroShape} from '../../lib/customIcons'

export default defineType({
  title: 'Hero - Shape',
  name: 'pbHeroShape',
  type: 'object',
  icon: IconHeroShape,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettingsHero',
    }),
    defineField({
      name: 'showPreheading',
      title: 'Show Preheadings?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'preheading',
      type: 'object',
      hidden: ({parent}) => parent?.showPreheading === false,
      fields: [
        defineField({
          title: 'Preheading Color',
          name: 'color',
          type: 'colorChoice',
        }),
        defineField({
          title: 'Preheading Left',
          name: 'left',
          type: 'string',
        }),
        defineField({
          title: 'Preheading Right',
          name: 'right',
          type: 'string',
        }),
      ],
    }),
    defineField({
      title: 'Backdrop Type',
      name: 'backdropType',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
          {title: 'Color', value: 'color'},
        ],
      },
    }),
    defineField({
      title: 'Backdrop Shape Color',
      name: 'backdropColor',
      type: 'colorChoice',
      hidden: ({parent}) => parent?.backdropType !== 'color',
    }),
    defineField({
      title: 'Backdrop Image',
      name: 'backdropImage',
      type: 'image',
      hidden: ({parent}) => parent?.backdropType !== 'image',
    }),
    defineField({
      title: 'Backdrop Video - MP4',
      name: 'backdropVideo',
      type: 'file',
      options: {
        accept: '.mp4',
      },
      hidden: ({parent}) => parent?.backdropType !== 'video',
    }),
    defineField({
      title: 'Content Overlay',
      name: 'contentOverlay',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Heading / Subbrand Logos', value: 'headingLogos'},
          {title: 'Sticky Main Logo', value: 'stickyLogo'},
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'ptItalic',
      hidden: ({parent}) => parent?.contentOverlay !== 'headingLogos',
    }),
    defineField({
      title: 'Subbrand Logos (transparent PNGs or SVGs)',
      name: 'subbrandLogos',
      type: 'array',
      hidden: ({parent}) => parent?.contentOverlay !== 'headingLogos',
      of: [
        {
          type: 'image',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Hero - Shape',
        media: IconHeroShape,
      }
    },
  },
})
