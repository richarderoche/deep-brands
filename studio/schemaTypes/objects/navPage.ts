import {LinkIcon} from '@sanity/icons'
import {defineType} from 'sanity'
import {navPageFields} from '../fields'

export default defineType({
  title: 'Page',
  name: 'navPage',
  type: 'object',
  icon: LinkIcon,
  fields: navPageFields,
  preview: {
    select: {
      title: 'title',
      pageTitle: 'page.title',
      pageSlug: 'page.slug.current',
      anchorLink: 'anchorLink',
    },
    prepare({title, pageSlug, pageTitle, anchorLink}) {
      return {
        title: `${title || pageTitle}`,
        subtitle: `/${pageSlug ? pageSlug : ''}${anchorLink ? `${anchorLink}` : ''}`,
        media: LinkIcon,
      }
    },
  },
})
