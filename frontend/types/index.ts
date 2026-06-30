// Manual types (not created by Sanity typegen)
// Only reusable types should be here
// Put one-off types in the component file

import {HomePageQueryResult, PagesBySlugQueryResult, SettingsQueryResult} from '@/sanity.types'

export interface NavPage {
  type: string
  slug?: string | null
  title?: string | null
}

export interface NavItem {
  _key: string
  _type: string
  url?: string
  title?: string
  page?: NavPage | null
  anchorLink?: string | null
}

export type MainNavItem = NonNullable<
  NonNullable<NonNullable<SettingsQueryResult>['mainNavLeft']>[number]
>

export type MainNavDropdownLinkItem = NonNullable<
  NonNullable<Extract<MainNavItem, {_type: 'dropdown'}>['items']>[number]
>

export type HeaderCTA = NonNullable<
  NonNullable<SettingsQueryResult>['headerCTAs']
>[number]

// extract pbGridMulti from the pbGridSection union for the pbBlocks query result below
type PbGridSection = Extract<
  NonNullable<NonNullable<PagesBySlugQueryResult>['pbSections']>[number],
  {_type: 'pbGridMulti'}
>
export type PbBlocksQueryResult = NonNullable<
  NonNullable<PbGridSection['columns']>[number]['pbBlocks']
>

export type PageBuilderData = PagesBySlugQueryResult | HomePageQueryResult | undefined

export type PbHeroShapeSection = Extract<
  NonNullable<NonNullable<PageBuilderData>['pbSections']>[number],
  {_type: 'pbHeroShape'}
>
