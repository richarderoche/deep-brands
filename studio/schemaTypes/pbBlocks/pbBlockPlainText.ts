import {CaseSensitive} from 'lucide-react'
import {defineField, defineType} from 'sanity'
import {ptToText} from '../../lib/utils'

export const textStyleOptions = [
  {title: 'Body', value: 'ts-body'},
  {title: 'Serif', value: 'ts-serif'},
  {title: 'Uppercase Narrow', value: 'ts-sans-tall'},
  {title: 'Uppercase Wide', value: 'ts-sans-wide'},
]

export const textSizeOptionsAll = [
  {title: 'H1', value: 'ts-h1', styleGroup: 'serif'},
  {title: 'H2', value: 'ts-h2', styleGroup: 'serif'},
  {title: 'H3', value: 'ts-h3', styleGroup: 'serif'},
  {title: 'H4', value: 'ts-h4', styleGroup: 'serif'},
  {title: 'Body Large', value: 'ts-p-lg', styleGroup: 'body'},
  {title: 'Body Medium', value: 'ts-p-md', styleGroup: 'body'},
  {title: 'Body Small', value: 'ts-p-sm', styleGroup: 'body'},
  {title: 'Body XS', value: 'ts-p-xs', styleGroup: 'body'},
  {title: 'Label', value: 'ts-h5', styleGroup: 'uppercase'},
  {title: 'Label Small', value: 'ts-h6', styleGroup: 'uppercase'},
]

// If adding options, add classes to frontend/safelist-classes.txt
export const textColorOptions = [
  {title: 'Body Normal', value: 'text-body'},
  {title: 'Accent', value: 'text-accent'},
]

export const textAlignOptions = [
  {title: 'Left', value: 'text-left'},
  {title: 'Center', value: 'text-center'},
  {title: 'Right', value: 'text-right'},
]

export default defineType({
  name: 'pbBlockPlainText',
  title: 'Plain Text',
  type: 'object',
  icon: CaseSensitive,
  fields: [
    defineField({
      title: 'Text Style',
      name: 'textStyle',
      type: 'string',
      options: {
        list: textStyleOptions,
      },
      initialValue: 'ts-body',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Text Size',
      name: 'textSize',
      type: 'string',
      hidden: ({parent}) => parent?.textStyle !== 'ts-body',
      options: {
        list: getTextSizeOptions('body'),
      },
      initialValue: 'ts-p-md',
    }),
    defineField({
      title: 'Text Size',
      name: 'textSizeSerif',
      type: 'string',
      hidden: ({parent}) => parent?.textStyle !== 'ts-serif',
      options: {
        list: getTextSizeOptions('serif'),
      },
      initialValue: 'ts-h2',
    }),
    defineField({
      title: 'Text Size',
      name: 'textSizeSans',
      type: 'string',
      hidden: ({parent}) =>
        parent?.textStyle !== 'ts-sans-tall' && parent?.textStyle !== 'ts-sans-wide',
      options: {
        list: getTextSizeOptions('uppercase'),
      },
      initialValue: 'ts-h6',
    }),
    defineField({
      name: 'textContent',
      title: 'Text',
      type: 'text',
      rows: 4,
      hidden: ({parent}) => parent?.textStyle === 'ts-serif',
    }),
    defineField({
      title: 'Text Content',
      name: 'textContentRich',
      type: 'ptItalic',
      hidden: ({parent}) => parent?.textStyle !== 'ts-serif',
    }),
    defineField({
      title: 'Text Align',
      name: 'textAlign',
      type: 'string',
      initialValue: 'text-left',
      options: {
        list: textAlignOptions,
      },
    }),
    defineField({
      title: 'Color',
      name: 'textColor',
      type: 'colorChoice',
    }),
    defineField({
      title: 'Balance Lines?',
      name: 'balanceLines',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      textContent: 'textContent',
      textContentRich: 'textContentRich',
      textStyle: 'textStyle',
    },
    prepare({textContent, textContentRich, textStyle}) {
      const textStyleText = textStyleOptions.find((o) => o.value === textStyle)?.title ?? 'Body'
      const subtitle = textContentRich
        ? ptToText(textContentRich)
        : textContent
          ? textContent
          : 'No Text'
      return {
        title: 'Text: ' + textStyleText,
        subtitle: subtitle,
        media: CaseSensitive,
      }
    },
  },
})

export function getTextSizeOptions(textStyle: string) {
  return textSizeOptionsAll.filter((o) => o.styleGroup === textStyle)
}
