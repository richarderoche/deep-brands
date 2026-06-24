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
              title: 'Link Type',
              name: 'linkType',
              type: 'string',
              options: {
                list: [
                  {title: 'External Link', value: 'externalLink'},
                  {title: 'File', value: 'file'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'externalLink',
            }),
            defineField({
              title: 'Link URL',
              name: 'url',
              type: 'url',
              hidden: ({parent}) => parent?.linkType !== 'externalLink',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https', 'mailto'],
                }),
            }),
            defineField({
              title: 'File',
              name: 'file',
              type: 'file',
              hidden: ({parent}) => parent?.linkType !== 'file',
              options: {
                accept: '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx',
              },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              company: 'company.title',
            },
            prepare({title, subtitle, company = 'Deep Brands'}) {
              return {
                title: title || 'Job',
                subtitle: `(${company}) ${subtitle || 'No subtitle'}`,
                media: BriefcaseBusiness,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      job1: 'jobs.0.title',
      job2: 'jobs.1.title',
      job3: 'jobs.2.title',
    },
    prepare({job1, job2, job3}) {
      const jobs = [job1, job2, job3].filter((job) => job !== null && job !== undefined)
      return {
        title: 'Jobs Listing',
        subtitle: jobs.join(', '),
        media: BriefcaseBusiness,
      }
    },
  },
})
