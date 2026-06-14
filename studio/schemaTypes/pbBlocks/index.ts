import {defineType} from 'sanity'

export default defineType({
  title: 'Content Blocks',
  name: 'pbBlocks',
  type: 'array',
  of: [
    {title: 'Rich Text', type: 'pbBlockText'},
    {title: 'Plain Text', type: 'pbBlockPlainText'},
    {title: 'Image', type: 'pbBlockImage'},
    {title: 'Video Embed', type: 'pbBlockVideoEmbed'},
    {title: 'Button', type: 'pbBlockButton'},
    {title: 'Button Group', type: 'pbBlockButtonMulti'},
    {title: 'Divider/Spacer', type: 'pbBlockDivider'},
    {title: 'Jobs Listing', type: 'pbBlockJobs'},
    {title: 'Scrolling Marquee', type: 'pbBlockMarquee'},
  ],
  options: {
    insertMenu: {
      groups: [
        {
          name: 'essential',
          title: 'Essential',
          of: [
            'pbBlockText',
            'pbBlockPlainText',
            'pbBlockImage',
            'pbBlockVideoEmbed',
            'pbBlockButton',
            'pbBlockButtonMulti',
            'pbBlockDivider',
          ],
        },
        {
          name: 'specialty',
          title: 'Specialty',
          of: ['pbBlockJobs', 'pbBlockMarquee'],
        },
      ],
    },
  },
})
