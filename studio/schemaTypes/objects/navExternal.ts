import {LaunchIcon} from '@sanity/icons'
import {defineType} from 'sanity'
import {navExternalFields} from '../fields'

export default defineType({
  title: 'External Link',
  name: 'navExternal',
  type: 'object',
  icon: LaunchIcon,
  fields: navExternalFields,
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare({title, url}) {
      return {
        title: title ?? url,
        subtitle: title && url,
        media: LaunchIcon,
      }
    },
  },
})
