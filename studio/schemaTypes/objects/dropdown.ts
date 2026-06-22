import {LinkIcon, SquareChevronDown} from 'lucide-react'
import {defineField, defineType} from 'sanity'
import {dropdownNavFields, navExternalFields, navPageFields} from '../fields'

export default defineType({
  title: 'Dropdown',
  name: 'dropdown',
  type: 'object',
  icon: SquareChevronDown,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          name: 'dropdownPage',
          type: 'object',
          fields: [...navPageFields, ...dropdownNavFields],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              pageTitle: 'page.title',
              pageSlug: 'page.slug.current',
              pageOgImage: 'page.seo.image',
              anchorLink: 'anchorLink',
              dropdownThumbnail: 'dropdownThumbnail',
            },
            prepare({
              title,
              subtitle,
              pageSlug,
              pageTitle,
              pageOgImage,
              anchorLink,
              dropdownThumbnail,
            }) {
              const path = `/${pageSlug ? pageSlug : ''}${anchorLink ? `${anchorLink}` : ''}`
              return {
                title: `${title || pageTitle} ${path ? `${path}` : ''}`,
                subtitle: subtitle,
                media: dropdownThumbnail ? dropdownThumbnail : pageOgImage ? pageOgImage : LinkIcon,
              }
            },
          },
        },
        {
          name: 'dropdownExternal',
          type: 'object',
          fields: [...navExternalFields, ...dropdownNavFields],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({title, items}) {
      const itemCount = items ? items.length : 0
      return {
        title: title,
        subtitle: `Items: ${itemCount}`,
        media: SquareChevronDown,
      }
    },
  },
})
