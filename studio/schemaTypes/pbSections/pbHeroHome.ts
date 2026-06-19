import {defineField, defineType} from 'sanity'
import {IconHeroHome} from '../../lib/customIcons'
import {ptToText} from '../../lib/utils'

export default defineType({
  name: 'pbHeroHome',
  title: 'Hero - Home',
  type: 'object',
  icon: IconHeroHome,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettingsHero',
    }),
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'ptItalic',
    }),
    defineField({
      title: 'Images Prep',
      description:
        'Trim margins and remove backgrounds prior to uploading. Pure rectangles are most performant, but transparent images are supported.',
      name: 'imagesPrepNote',
      type: 'note',
    }),
    defineField({
      title: 'Images - Top #1',
      description: 'Suggested: Portrait ratio images',
      name: 'imagesTop1',
      type: 'imageCycle',
    }),
    defineField({
      title: 'Images - Top #2',
      description: 'Suggested: Portrait ratio images',
      name: 'imagesTop2',
      type: 'imageCycle',
    }),
    defineField({
      title: 'Images - Bottom #1',
      description: 'Suggested: Landscape ratio images',
      name: 'imagesBottom1',
      type: 'imageCycle',
    }),
    defineField({
      title: 'Images - Bottom #2',
      description: 'Suggested: Landscape ratio images',
      name: 'imagesBottom2',
      type: 'imageCycle',
    }),
    defineField({
      title: 'Images - Bottom #3 (Desktop Only)',
      description: 'Suggested: Landscape ratio images',
      name: 'imagesBottom3',
      type: 'imageCycle',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({heading}) {
      const subtitle = heading ? ptToText(heading) : 'No Heading'
      return {
        title: 'Hero - Home',
        subtitle: subtitle,
        media: IconHeroHome,
      }
    },
  },
})
