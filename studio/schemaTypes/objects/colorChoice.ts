import { defineType } from "sanity"

export default defineType({
  title: 'Color',
  name: 'colorChoice',
  type: 'object',
  options: {
    collapsible: false,
  },
  fields: [
    {
      title: 'Color Type',
      name: 'colorType',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'none' },
          { title: 'Default 65%', value: 'semitransparent' },
          { title: 'Dark', value: 'dark' },
          { title: 'Light', value: 'light' },
          { title: 'Custom', value: 'custom' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'none',
    },
    {
      title: 'Color (Dark)',
      name: 'colorDark',
      type: 'string',
      hidden: ({ parent }: { parent: any }) => parent?.colorType !== 'dark',
      options: {
        list: [
          { title: 'Navy', value: '--color-blue-800' },
          { title: 'Dark Blue', value: '--color-blue-700' },
          { title: 'Blue', value: '--color-blue-650' },
          { title: 'Teal', value: '--color-teal' },
          { title: 'Logo Red', value: '--color-logo-red' },
          { title: 'IK Red', value: '--color-ik-red' },
          { title: 'TT Pink', value: '--color-tt-pink' },
          { title: 'TT Teal', value: '--color-tt-teal' },
          { title: 'Saffron', value: '--color-saffron-600' },
          { title: 'Chili', value: '--color-chili-600' },
          { title: 'Tumeric', value: '--color-tumeric-600' },
          { title: 'Lime', value: '--color-lime-600' },
          { title: 'Lotus', value: '--color-lotus-600' },
        ],
      },
      initialValue: '--color-blue-800',
    },
    {
      title: 'Color (Light)',
      name: 'colorLight',
      type: 'string',
      hidden: ({ parent }: { parent: any }) => parent?.colorType !== 'light',
      options: {
        list: [
          { title: 'Offwhite', value: '--color-offwhite' },
          { title: 'Blue', value: '--color-blue-200' },
          { title: 'Saffron', value: '--color-saffron-200' },
          { title: 'Chili', value: '--color-chili-200' },
          { title: 'Tumeric', value: '--color-tumeric-200' },
          { title: 'Lime', value: '--color-lime-200' },
          { title: 'Lotus', value: '--color-lotus-200' },         
        ],
      },
      initialValue: '--color-offwhite',
    },
    {
      title: 'Color (Custom)',
      description: 'When choosing custom, it is your responsibility to ensure accessibility contrast standards are met.',
      name: 'colorCustom',
      type: 'color',
      options: {
        disableAlpha: true,
        collapsible: false,
      },
      hidden: ({ parent }: { parent: any }) => parent?.colorType !== 'custom',
    },
  ]
})