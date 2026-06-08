import '@/app/globals.css'
import DraftModeToast from '@/components/DraftModeToast'
import Footer from '@/components/Footer'
import IconMasks from '@/components/icons/IconMasks'
import GlobalScripts from '@/components/shared/GlobalScripts'
import {GSAP} from '@/components/shared/GSAP'
import {Lenis} from '@/components/shared/Lenis'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {urlForOpenGraphImage} from '@/sanity/lib/utils'
import {Metadata, Viewport} from 'next'
import {VisualEditing} from 'next-sanity/visual-editing'
import localFont from 'next/font/local'
import {draftMode} from 'next/headers'
import type {Image} from 'sanity'
import {Toaster} from 'sonner'
import {handleError} from './client-utils'

export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    stega: false,
  })

  const ogImage = urlForOpenGraphImage(settings?.ogImage as Image)
  const noIndex = settings?.noIndex ?? false
  return {
    title: settings?.seoTitle
      ? {
          template: `%s | ${settings.seoTitle}`,
          default: settings.seoTitle || 'Deep Brands',
        }
      : undefined,
    description: settings?.description ? settings.description : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        noimageindex: noIndex,
      },
    },
    authors: [
      {
        name: 'Infinite Productivity',
        url: 'https://infinite-productivity.com',
      },
    ],
  }
}

export const viewport: Viewport = {
  themeColor: '#000',
}

const serifFont = localFont({
  src: [
    {
      path: '../public/fonts/GT-Alpina-Condensed-Light.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/GT-Alpina-Condensed-Light-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--alpina',
})

const sansFont = localFont({
  src: [
    {
      path: '../public/fonts/GT-America-Condensed-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/GT-America-Condensed-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--america-cond',
})

const sansExtendedFont = localFont({
  src: [
    {
      path: '../public/fonts/GT-America-Extended-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--america-ex',
})

export default async function RootLayout({children}: LayoutProps<'/'>) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} ${sansExtendedFont.variable} light-theme`}
      data-scroll-behavior="smooth"
    >
      <body>
        <IconMasks />
        <Lenis />
        <GSAP />
        <div className="flex min-h-screen flex-col justify-start ts-body ts-p-md overflow-x-hidden max-w-full">
          {/* <Navbar /> */}
          <main className="grow" id="main-content">
            {children}
          </main>
          <Footer />
        </div>

        <Toaster />
        <SanityLive onError={handleError} />
        {isDraftMode && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
        <GlobalScripts />
      </body>
    </html>
  )
}
