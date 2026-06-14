import {BriefcaseBusiness} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pbBlockJobs',
  title: 'Jobs Listing',
  type: 'object',
  icon: BriefcaseBusiness,
  fields: [
    defineField({
      name: 'jobs',
      title: 'Jobs',
      type: 'array',
      of: [
        defineField({
          name: 'job',
          title: 'Job',
          type: 'object',
          icon: BriefcaseBusiness,
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              description: 'e.g."Remote / New York"',
              type: 'string',
            }),
            defineField({
              name: 'company',
              title: 'Company',
              description: 'Leave blank for Deep Brands',
              type: 'reference',
              to: [{type: 'brands'}],
            }),
            defineField({
              title: 'Link URL',
              name: 'url',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https', 'mailto'],
                }),
            }),
          ],
        }),
      ],
    }),
  ],
})
