import {defineType} from 'sanity'

export default defineType({
  title: 'Sections',
  name: 'pbSections',
  type: 'array',
  of: [
    {type: 'pbGridSingle'},
    {type: 'pbGridDouble'},
    {type: 'pbGridMulti'},
    {type: 'pbBanner'},
    {type: 'pbImageWithCard'},
    {type: 'pbFeature'},
    {type: 'pbTriptych'},
    {type: 'pbHeroShape'},
    {type: 'pbHeroBrand'},
    {type: 'pbTimeline'},
    {type: 'pbNews'},
    {type: 'pbValues'},
  ],
})
