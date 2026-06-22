import {defineField} from 'sanity'

export const imgAltField = {
  title: 'Alt text',
  name: 'alt',
  type: 'text',
  placeholder: 'e.g. A woman and two men standing on a beach during sunset',
  rows: 2,
}

export const revealEffectField = {
  title: 'Reveal Effect',
  name: 'revealEffect',
  type: 'string',
  options: {
    list: [
      {title: 'None', value: 'none'},
      {title: 'Stagger', value: 'stagger'},
      {title: 'Fade In Up', value: 'fade-up'},
      {title: 'Fade In Right', value: 'fade-right'},
    ],
  },
  initialValue: 'none',
}

export const rowWidthField = {
  title: 'Width of this section (only affects desktop)',
  name: 'rowWidth',
  type: 'number',
  initialValue: 12,
  options: {
    list: [
      {title: 'Full', value: 12},
      {title: 'Medium', value: 10},
      {title: 'Small', value: 8},
      {title: 'Extra Small', value: 6},
    ],
  },
}

export const rowWidthFieldLimited = {
  title: 'Width of this section (only affects desktop)',
  name: 'rowWidth',
  type: 'number',
  initialValue: 12,
  options: {
    list: [
      {title: 'Full', value: 12},
      {title: 'Medium', value: 10},
    ],
  },
}

export const sectionNameField = {
  title: 'Section Name (for organizational purposes)',
  name: 'sectionName',
  type: 'string',
  placeholder: 'e.g. "Intro Part 1", "Culture Blurb", "Contact Emails"',
}

export const spaceBetweenBlocksField = {
  title: 'Space Between Blocks',
  name: 'spaceBetweenBlocks',
  type: 'string',
  initialValue: 'gap-gut',
  hidden: ({parent}: {parent: any}) => parent?.pbBlocks?.length < 2,
  options: {
    list: [
      {title: 'None', value: 'gap-0'},
      {title: 'Tighter', value: 'gap-gut-25'},
      {title: 'Tight', value: 'gap-gut-50'},
      {title: 'Normal', value: 'gap-gut'},
      {title: 'Loose', value: 'gap-gut-150'},
      {title: 'Looser', value: 'gap-gut-200'},
    ],
  },
}

export const navExternalFields = [
  defineField({
    title: 'Title',
    name: 'title',
    type: 'string',
    description: 'Display Text',
  }),
  defineField({
    title: 'URL',
    name: 'url',
    type: 'url',
    description: 'enter an external URL',
    validation: (Rule) =>
      Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel'],
      }),
  }),
]

export const navPageFields = [
  defineField({
    title: 'Title Override',
    name: 'title',
    type: 'string',
    description: 'Display Text',
  }),
  defineField({
    title: 'Page',
    name: 'page',
    type: 'reference',
    to: [{type: 'home'}, {type: 'page'}],
  }),
  defineField({
    name: 'anchorLink',
    title: 'Anchor Link',
    type: 'string',
    description: 'Scroll to an anchor link (e.g. #about)',
    validation: (Rule) => [
      Rule.regex(/^#?[a-z0-9-]+$/),
      Rule.custom((value) =>
        value && !value.startsWith('#') ? 'Anchor links should start with # (e.g. #about)' : true,
      ).warning(),
    ],
  }),
]

export const dropdownNavFields = [
  defineField({
    title: 'Subtitle',
    name: 'subtitle',
    type: 'text',
    rows: 1,
  }),
  defineField({
    title: 'Thumbnail',
    description: 'Defaults to SEO Image if not provided',
    name: 'dropdownThumbnail',
    type: 'image',
    options: {
      hotspot: {
        previews: [
          {title: 'Mobile', aspectRatio: 1.25},
          {title: 'Desktop', aspectRatio: 1.6666666667},
        ],
      },
    },
  }),
]
