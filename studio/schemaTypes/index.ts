import brands from './documents/brands'
import page from './documents/page'
import redirect from './documents/redirect'
import colorChoice from './objects/colorChoice'
import navExternal from './objects/navExternal'
import navLinks from './objects/navLinks'
import navPage from './objects/navPage'
import ptBasic from './objects/ptBasic'
import ptBody from './objects/ptBody'
import ptBold from './objects/ptBold'
import ptItalic from './objects/ptItalic'
import ptSingle from './objects/ptSingle'
import ptSlim from './objects/ptSlim'
import seo from './objects/seo'
import socialLink from './objects/socialLink'
import pbBlocks from './pbBlocks'
import pbBlockButton from './pbBlocks/pbBlockButton'
import pbBlockButtonMulti from './pbBlocks/pbBlockButtonMulti'
import pbBlockDivider from './pbBlocks/pbBlockDivider'
import pbBlockImage from './pbBlocks/pbBlockImage'
import pbBlockMarquee from './pbBlocks/pbBlockMarquee'
import pbBlockPlainText from './pbBlocks/pbBlockPlainText'
import pbBlockText from './pbBlocks/pbBlockText'
import pbBlockVideoEmbed from './pbBlocks/pbBlockVideoEmbed'
import pbSections from './pbSections'
import column from './pbSections/column'
import pbBanner from './pbSections/pbBanner'
import pbColSettings from './pbSections/pbColSettings'
import pbGridDouble from './pbSections/pbGridDouble'
import pbGridMulti from './pbSections/pbGridMulti'
import pbGridSingle from './pbSections/pbGridSingle'
import pbImageWithCard from './pbSections/pbImageWithCard'
import pbSectionSettings from './pbSections/pbSectionSettings'
import pbTimeline from './pbSections/pbTimeline'
import pbTitleSection from './pbSections/pbTitle'
import home from './singletons/home'
import settings from './singletons/settings'

export const singletonSchemaTypes = [home, settings]

export const schemaTypes = [
  // Singletons
  home,
  settings,
  // Documents
  page,
  brands,
  redirect,
  // Objects
  column,
  colorChoice,
  navExternal,
  navLinks,
  navPage,
  pbBanner,
  pbBlockImage,
  pbBlockButton,
  pbBlockButtonMulti,
  pbBlocks,
  pbBlockDivider,
  pbBlockMarquee,
  pbBlockPlainText,
  pbBlockText,
  pbBlockVideoEmbed,
  pbColSettings,
  pbGridMulti,
  pbGridSingle,
  pbGridDouble,
  pbImageWithCard,
  pbSections,
  pbSectionSettings,
  pbTitleSection,
  pbTimeline,
  ptBasic,
  ptBody,
  ptBold,
  ptItalic,
  ptSingle,
  ptSlim,
  seo,
  socialLink,
]

export const singletons = []
