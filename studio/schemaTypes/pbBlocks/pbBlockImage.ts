import {Image as ImageIcon} from 'lucide-react'
import {defineField, defineType} from 'sanity'
import {imgAltField} from '../fields'

export const crops = [
  {title: 'Original', value: 0},
  {title: '1:1 (square)', value: 1},
  {title: '4:5', value: 0.8},
  {title: '4:6', value: 0.6666666667},
  {title: '5:4', value: 1.25},
  {title: '6:4', value: 1.5},
  {title: '16:9', value: 1.7777777778},
  {title: '5:2', value: 2.5},
]

export const hotspotPreviews = [
  {title: '1:1 / Arches', aspectRatio: 1},
  {title: '4:5', aspectRatio: 0.8},
  {title: '4:6', aspectRatio: 0.6666666667},
  {title: '5:4', aspectRatio: 1.25},
  {title: '6:4', aspectRatio: 1.5},
  {title: '16:9', aspectRatio: 1.7777777778},
  {title: '5:2', aspectRatio: 2.5},
  {title: 'Logo - DB', aspectRatio: 1.6411287988},
]

export const imageMaskTypes = [
  {title: 'None', value: 'none'},
  {title: 'Notches', value: 'notches'},
  {title: 'Logo - DB', value: 'logoDB'},
  {title: 'Arch - IK', value: 'archIK'},
  {title: 'Arch - TT', value: 'archTT'},
]

export default defineType({
  name: 'pbBlockImage',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [defineField(imgAltField)],
      options: {
        hotspot: {
          previews: hotspotPreviews,
        },
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
      hidden: ({parent}) => parent?.imageMaskType !== 'none' && parent?.imageMaskType !== 'notches',
    }),
    defineField({
      name: 'imageWidth',
      title: 'Image Width (in % of column)',
      description: 'Change sparingly - this can make responsive layouts harder to manage.',
      type: 'number',
      initialValue: 100,
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'caption',
      title: 'Caption (optional supporting text for all users)',
      placeholder: 'e.g. From left to right: Jane Doe, John Doe, Jim Doe',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'priority',
      title: 'High Priority Loading',
      type: 'boolean',
      description: 'Enable for images above the fold to improve loading performance',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      image: 'image.asset',
      alt: 'alt',
      imageCrop: 'imageCrop',
      priority: 'priority',
    },
    prepare({image, alt, imageCrop, priority}) {
      const maxLen = 40
      const truncate = (str: string) => (str.length > maxLen ? str.slice(0, maxLen - 1) + '…' : str)
      const altText = alt ? `: ${truncate(alt)}` : '(no alt text)'
      const priorityText = priority ? 'Priority' : 'Lazy'
      const imageCropText = imageCrop
        ? `: ${crops.find((crop) => crop.value === imageCrop)?.title}`
        : 'Original'
      return {
        title: 'Image: ' + altText,
        subtitle: 'Crop: ' + imageCropText + ' / Priority: ' + priorityText,
        media: image ? image : ImageIcon,
      }
    },
  },
})
