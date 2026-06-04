import { Utensils } from "lucide-react"
import { defineField, defineType } from "sanity"

export default defineType({
  name: 'brands',
  title: 'Brands',
  type: 'document',
  icon: Utensils,
  fields: [
    defineField({
      name: 'brandsNote',
      title: 'Brands Note',
      type: 'note',
      description: 'This entry stores brand info that is displayed in various places across the site. The brand pages are managed in the "Pages" section of the backend.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'websiteLink',
      title: 'Website Link',
      type: 'navExternal',
    }),
    defineField({
      name: 'socialIcons',
      title: 'Social Icons',
      type: 'array',
      of: [
        {
          type: 'socialLink',
        },
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Logo (SVG or PNG)',
      type: 'image',
    }),
    defineField({
      name: 'maskShape',
      title: 'Mask Shape (Black SVG, Square Ratio)',
      type: 'image',
    }),
    defineField({
      name: 'bgShape',
      title: 'Background Shape (Colored SVG or PNG)',
      type: 'image',
    })
  ],
  preview: {
    select: {
      title: 'title',
      logo: 'logo',
    },
    prepare({ title, logo }) {
      return {
        title: title ? title : 'Brands',
        media: logo || Utensils,
      }
    },
  },
})