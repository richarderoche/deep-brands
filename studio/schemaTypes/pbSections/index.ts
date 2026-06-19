import {defineType} from 'sanity'

/** Single source of truth for insert-menu labels and preview subtitles. */
export const pbSectionTypes = [
  {type: 'pbGridSingle', title: 'Grid: Single Column'},
  {type: 'pbGridDouble', title: 'Grid: Two Column'},
  {type: 'pbGridMulti', title: 'Grid: Multi Column'},
  {type: 'pbBanner', title: 'Banner Section'},
  {type: 'pbImageWithCard', title: 'Image + Card'},
  {type: 'pbFeature', title: 'Feature'},
  {type: 'pbTriptych', title: 'Triptych Section'},
  {type: 'pbHeroShape', title: 'Hero - Shape'},
  {type: 'pbHeroBrand', title: 'Hero - Brand'},
  {type: 'pbHeroHome', title: 'Hero - Home'},
  {type: 'pbTimeline', title: 'Timeline'},
  {type: 'pbNews', title: 'News Section'},
  {type: 'pbValues', title: 'Values Section'},
] as const

export default defineType({
  title: 'Sections',
  name: 'pbSections',
  type: 'array',
  of: [...pbSectionTypes, {type: 'pbSectionGroup'}],
})
