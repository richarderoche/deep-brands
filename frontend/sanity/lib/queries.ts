import {defineQuery} from 'next-sanity'

// PARTIALS
const seo = `
  "seoTitle": seo.seoTitle,
  "description": seo.description,
  "ogImage": seo.image,
  "noIndex": seo.hideFromSearchEngines
`

const page = `
  "type": _type,
  "slug": slug.current,
  title
`

const link = `
  ...,
  "page": page->{
    ${page},
  }
`

const dropdownLink = `
  ...,
  "page": page->{
    ${page},
  },
  "thumbnail": coalesce(dropdownThumbnail, page->seo.image),
`

const portableText = `
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => {
      ...,
      "slug": reference->slug,
      "type": reference->_type
    }
  }
`

const textSizeByStyle = `
  "textSize": select(
    textStyle == "ts-body" => textSize,
    textStyle == "ts-serif" => textSizeSerif,
    textStyle == "ts-sans" || textStyle == "ts-sans-extended" => textSizeSans
  )
`

const pbButton = `
  ...,
  sitePage {
    ${link},
  },
  externalLink {
    ${link},
  },
  fileLink {
    ...,
    "url": file.asset->url,
  },
`

const pbBlocks = `
  ...,
  _type == "pbBlockPlainText" => {
    ...,
    ${textSizeByStyle},
  },
  _type == "pbBlockText" => {
    ...,
    textContent[]{
      ${portableText}
    }
  },
  _type == "pbBlockButton" => {
    ${pbButton}
  },
  _type == "pbBlockButtonMulti" => {
    ...,
    buttons[]{
      ${pbButton}
    },
  },
  _type == "pbBlockJobs" => {
    ...,
    jobs[]{
      ...,
      "company": company->title,
      "url": select(
        linkType == "file" => file.asset->url,
        url
      ),
    },
  },
`

const pbSections = `
  ...,
  _type == "pbGridMulti" => {
    columns[]{
      ...,
      pbBlocks[]{
        ${pbBlocks}
      }
    }
  },
  _type == "pbGridSingle" => {
    ...,
    pbBlocks[]{
      ${pbBlocks}
    }
  },
  _type == "pbGridDouble" => {
    ...,
    columnOne {
      ...,
      pbBlocks[]{
        ${pbBlocks}
      }
    },
    columnTwo {
      ...,
      pbBlocks[]{
        ${pbBlocks}
      }
    }
  },
  _type == "pbBanner" => {
    ...,
    pbBlocks[]{
      ${pbBlocks}
    }
  },
  _type == "pbImageWithCard" => {
    ...,
    pbBlocks[]{
      ${pbBlocks}
    }
  },
  _type == "pbFeature" => {
    ...,
    pbBlocks[]{
      ${pbBlocks}
    }
  },
  _type == "pbNews" => {
    ...,
    ctaButton {
      ${pbButton}
    }
  },
  _type == "pbHeroBrand" => {
    ...,
    brand->{
      ...,
    },
  },
  _type == "pbHeroShape" => {
    ...,
    backdropVideo {
      ...,
      asset-> {
        playbackId,
      },
    },
  },
`

const pb = `
  pbSections[]{
    ${pbSections}
    _type == "pbSectionGroup" => {
      ...,
      pbGroupSections[]{
        ${pbSections}
      }
    }
  }
`

// QUERIES
export const homePageQuery = defineQuery(`
  *[_type == "home"][0]{
    ...,
    ${pb},
  }
`)

export const pagesBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    ...,
    "slug": slug.current,
    ${pb},
    ${seo},
  }
`)

export const slugsByTypeQuery = defineQuery(`
  *[_type == $type && defined(slug.current)]{"slug": slug.current}
`)

export const sitemapByTypeQuery = defineQuery(`
  *[_type == $type]{"slug": slug.current, "updatedAt": _updatedAt}
`)

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    ...,
    "mainNavLeft": mainNavLeft[]{
      _type != "dropdown" => {
        ${link}
      },
      _type == "dropdown" => {
        ...,
        items[]{
          ${dropdownLink}
        }
      },
    },
    "mainNavRight": mainNavRight[]{
      _type != "dropdown" => {
        ${link}
      },
      _type == "dropdown" => {
        ...,
        items[]{
          ${dropdownLink}
        }
      },
    },
    "footerNav": footerNav.navItems[]{
      ${link},
    },
    "footerNav2": footerNav2.navItems[]{
      ${link},
    },
    "footerBrands": footerBrands[]->{
      _id,
      title,
      websiteLink,
      socialIcons,
    },
    ${seo},
  }
`)

export const scriptsQuery = defineQuery(`
  *[_type == "settings"][0]{
    "gtmId": googletagmanagerID,
    customScripts,
  }
`)
