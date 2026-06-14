import {defineType} from 'sanity'

export default defineType({
  title: 'Sections',
  name: 'pbSections',
  type: 'array',
  of: [
    {type: 'pbGridMulti'},
    {type: 'pbGridSingle'},
    {type: 'pbGridDouble'},
    {type: 'pbBanner'},
    {type: 'pbImageWithCard'},
    {type: 'pbTriptych'},
    {type: 'pbHeroShape'},
    {type: 'pbTimeline'},
    {type: 'pbNews'},
    {type: 'pbValues'},
  ],
})
