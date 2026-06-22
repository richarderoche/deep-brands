import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'header',
      title: 'Header',
    },
    {
      name: 'footer',
      title: 'Footer',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'scripts',
      title: 'Scripts',
    },
  ],
  fields: [
    defineField({
      name: 'mainNavLeft',
      title: 'Main Navigation - Left',
      type: 'array',
      of: [
        {
          type: 'navPage',
        },
        {
          type: 'navExternal',
        },
        {
          type: 'dropdown',
        },
      ],
      group: 'header',
    }),
    defineField({
      name: 'mainNavRight',
      title: 'Main Navigation - Right',
      type: 'array',
      of: [
        {
          type: 'navPage',
        },
        {
          type: 'navExternal',
        },
        {
          type: 'dropdown',
        },
      ],
      group: 'header',
    }),
    defineField({
      name: 'showHeaderSocials',
      title: 'Include Social Links in Header?',
      type: 'boolean',
      group: 'header',
      initialValue: true,
    }),
    defineField({
      name: 'showHeaderCTAs',
      title: 'Include CTA Buttons in Header?',
      type: 'boolean',
      group: 'header',
      initialValue: true,
    }),
    defineField({
      name: 'headerCTAs',
      title: 'Header CTAs',
      type: 'array',
      group: 'header',
      hidden: ({parent}) => !parent?.showHeaderCTAs,
      of: [
        {
          type: 'pbBlockButton',
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'email',
      group: 'footer',
    }),
    defineField({
      name: 'socialIcons',
      title: 'Social Icons',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'socialLink',
        },
      ],
    }),
    defineField({
      name: 'badges',
      title: 'Badges (transparent PNGs)',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'image',
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      title: 'Footer Nav - Info',
      name: 'footerNav',
      type: 'navLinks',
      group: 'footer',
    }),
    defineField({
      title: 'Footer Nav - Secondary',
      name: 'footerNav2',
      type: 'navLinks',
      group: 'footer',
    }),
    defineField({
      name: 'footerBrands',
      title: 'Footer Brands',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'reference',
          to: [{type: 'brands'}],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Global SEO',
      description: 'Fallback SEO content for any page left blank',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'googletagmanagerID',
      title: 'Google Tag Manager ID',
      type: 'string',
      description:
        'If you need a cookie consent banner, use the custom scripts field below instead of this.',
      group: 'scripts',
    }),
    defineField({
      name: 'customScripts',
      title: 'Custom Scripts',
      type: 'array',
      of: [
        {
          name: 'customScript',
          title: 'Custom Script',
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name (for your reference)',
              type: 'string',
            },
            {
              name: 'script',
              title: 'Script',
              type: 'text',
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              description:
                'Necessary: scripts that are required for the site to function. (e.g. Support chat, etc.) Analytics: scripts that are used to track site usage. (Triggers cookie consent banner) Marketing: scripts that are used to track marketing efforts. (Triggers cookie consent banner)',
              options: {
                list: ['necessary', 'analytics', 'marketing'],
              },
              initialValue: 'necessary',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              name: 'name',
              category: 'category',
            },
            prepare({name = 'Custom Script', category}) {
              return {
                title: name,
                subtitle: category,
              }
            },
          },
        },
      ],
      group: 'scripts',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
