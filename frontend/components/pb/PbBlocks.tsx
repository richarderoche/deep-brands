'use client'

import {colorValue} from '@/lib/colorValue'
import {cn, getClipPath} from '@/lib/utils'
import type {PbBlockMarquee, PbBlockVideoEmbed} from '@/sanity.types'
import {PbBlocksQueryResult} from '@/types'
import {PortableText, PortableTextBlock} from 'next-sanity'
import Link from 'next/link'
import type {Image as SanityImageType} from 'sanity'
import IconCarat from '../icons/IconCarat'
import Button from '../shared/Button'
import {CustomPortableText} from '../shared/CustomPortableText'
import Divider from '../shared/Divider'
import ImageBasic from '../shared/ImageBasic'
import RichTextWrap from '../shared/RichTextWrap'
import VideoEmbed from '../shared/VideoEmbed'
import MarqueeBlock from './MarqueeBlock'
import {SanityVisualEditingPath, useSanityDataAttribute} from './SanityVisualEditingContext'

export interface PbBlocksProps {
  columnBlocks: PbBlocksQueryResult
  trueSizes: string
  spaceBetweenBlocks: string
  blockWidths?: {
    mobile?: string
    tablet?: string
    desktop?: string
  }
  contentAlign?: 'start' | 'center'
  className?: string
}

export default function PbBlocks({
  columnBlocks,
  trueSizes,
  spaceBetweenBlocks,
  blockWidths = {
    mobile: 'grid-cols-1',
    tablet: 'md:grid-cols-1',
    desktop: 'lg:grid-cols-1',
  },
  contentAlign = 'start',
  className,
}: PbBlocksProps) {
  const {getDataAttribute, path} = useSanityDataAttribute()
  return (
    <div
      className={cn(
        'column-blocks grid h-full content-start',
        blockWidths.mobile,
        blockWidths.tablet,
        blockWidths.desktop,
        spaceBetweenBlocks,
        contentAlign === 'center' && 'justify-items-center',
        className,
      )}
    >
      {columnBlocks &&
        columnBlocks.map((block) => {
          const {_key, _type} = block
          const blockDataSanity = getDataAttribute(['pbBlocks', {_key}])

          switch (_type) {
            // Rich Text Block
            case 'pbBlockText':
              return (
                <RichTextWrap key={_key} data-sanity={blockDataSanity}>
                  <CustomPortableText value={block.textContent as PortableTextBlock[]} />
                </RichTextWrap>
              )

            // Plain Text Block
            case 'pbBlockPlainText':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  <PlainTextBlock block={block} />
                </div>
              )

            // Image Block
            case 'pbBlockImage':
              return (
                <div key={_key} data-sanity={blockDataSanity} className="corner-container w-full">
                  <ImageBlock block={block} trueSizes={trueSizes} />
                </div>
              )

            // Video Block
            case 'pbBlockVideoEmbed':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  <div className="relative" style={getRatioPadding(block)}>
                    <VideoEmbed url={block.videoEmbedUrl} />
                  </div>
                </div>
              )

            // Button Block
            case 'pbBlockButton':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  <ButtonBlock block={block} />
                </div>
              )

            // Button Group Block
            case 'pbBlockButtonMulti':
              return (
                <div
                  key={_key}
                  data-sanity={blockDataSanity}
                  className="flex flex-wrap items-center gap-gut-50"
                >
                  {block.buttons?.map((button) => (
                    <ButtonBlock key={button._key} block={button} />
                  ))}
                </div>
              )

            // Divider Block
            case 'pbBlockDivider':
              return (
                <Divider
                  key={_key}
                  data-sanity={blockDataSanity}
                  data-ignore-neighbor-padding
                  showOnMobile={block.showOnMobile ?? true}
                  showOnTablet={block.showOnTablet ?? true}
                  showOnDesktop={block.showOnDesktop ?? true}
                  showDividerLine={block.showDividerLine ?? true}
                  showOrnament={block.showOrnament ?? false}
                  size={block.size ?? 1}
                />
              )

            // Scrolling Marquee Block
            case 'pbBlockMarquee':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  <MarqueeBlock block={block as PbBlockMarquee} />
                </div>
              )

            // Jobs Listing Block
            case 'pbBlockJobs':
              return (
                <SanityVisualEditingPath key={_key} path={[...path, 'pbBlocks', {_key}]}>
                  <div data-sanity={blockDataSanity}>
                    <JobsBlock block={block} />
                  </div>
                </SanityVisualEditingPath>
              )

            default:
              return null
          }
        })}
    </div>
  )
}

export function PlainTextBlock({block}) {
  const isRichText = block.textStyle === 'ts-serif'
  return (
    <div
      className={cn(
        'max-w-max-ch',
        block.textStyle || 'ts-p-md',
        block.textSize,
        block.textAlign,
        block.textAlign === 'text-center' && 'mx-auto',
        block.balanceLines ? 'text-balance' : 'text-pretty',
      )}
      style={{
        color: colorValue(block.textColor),
      }}
    >
      {isRichText ? <PortableText value={block.textContentRich || []} /> : block.textContent || ''}
    </div>
  )
}

export function ImageBlock({block, trueSizes}) {
  const {image, imageMaskType, imageWidth, imageCrop, priority, fetchPriority, loading, caption} =
    block
  const roundCorners = false
  const cropRatio = (() => {
    switch (imageMaskType) {
      case 'logoDB':
        return 1.6411287988
      case 'archIK':
        return 1
      case 'archTT':
        return 1
      default:
        return imageCrop || 0
    }
  })()
  return (
    <>
      <div
        className={cn(
          'relative group',
          imageWidth ? 'mx-auto' : 'w-full',
          roundCorners ? 'corner' : '',
        )}
        style={{
          ...(imageWidth && {width: `${imageWidth}%`}),
          clipPath: getClipPath(imageMaskType, cropRatio),
        }}
      >
        <ImageBasic
          image={image as SanityImageType}
          alt={image?.alt || ''}
          sizes={trueSizes}
          ratio={cropRatio}
          priority={priority ?? false}
          fetchPriority={fetchPriority}
          loading={loading}
        />
      </div>
      {caption && <div className="ts-p-sm text-pretty text-body-subtle mt-gut-50">{caption}</div>}
    </>
  )
}

export function ButtonBlock({block}) {
  const isPage = block.linkType === 'sitePage'
  const isAnchorLink = block.sitePage?.anchorLink
  const isExternal = block.linkType === 'externalLink'
  const isFile = block.linkType === 'file'
  return (
    <Button
      navItem={
        isPage
          ? block.sitePage
          : isExternal
            ? block.externalLink
            : isFile
              ? block.fileLink
              : undefined
      }
      anchorLink={isAnchorLink ? block.sitePage?.anchorLink : undefined}
      path={isFile ? block.fileLink?.url || '' : undefined}
      text={isFile ? block.fileLink?.buttonText || 'Download' : undefined}
      download={isFile ? true : false}
      icon={block.icon}
      arrowDirection={block.arrowDirection}
      buttonStyle={block.buttonStyle}
      buttonColor={block.buttonColor}
    />
  )
}

export function JobsBlock({block}) {
  const {getDataAttribute} = useSanityDataAttribute()

  return (
    <div className="flex flex-col gap-4">
      {block.jobs?.map((job) => {
        const {_key, title, subtitle, company, description, url} = job
        const isFile = job.linkType === 'file'
        const href = isFile ? job.fileLink?.url || '' : url || ''
        return (
          <div
            key={_key}
            data-sanity={getDataAttribute(['jobs', {_key}])}
            className="border-t last:border-b border-body/50 p-gut-25"
          >
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              download={isFile ? true : false}
              className="flex flex-col gap-gut-33 justify-between p-gut-25 hover:bg-body/10 hover:scale-101 transition-all rounded-sm"
            >
              <div className="flex gap-gut items-center justify-between w-full">
                <div className="flex flex-col gap-gut-25">
                  <h3 className="ts-h6 ts-sans-wide text-balance">{title}</h3>
                  <div className="flex items-center gap-gut-33">
                    <p className="ts-meta ts-sans-tall flex w-fit items-center h-btn px-[.5em] rounded-btn bg-current/15 whitespace-nowrap">
                      {company ? (company as string) : 'Deep Brands'}
                    </p>
                    <p className="ts-meta line-clamp-1 ts-sans-wide opacity-70">{subtitle}</p>
                  </div>
                </div>
                <div className="rounded-full border ts-btn size-btn p-[.5em] flex items-center justify-center">
                  <IconCarat className="h-full w-auto mr-[-.2em]" />
                </div>
              </div>
              {description && <div className="ts-p-xs text-pretty">{description}</div>}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

function getRatioPadding(block: PbBlockVideoEmbed) {
  const ar = block.videoAspectRatio
  const paddingRatio = ar && ar.width && ar.height ? ar.height / ar.width : 9 / 16
  return {paddingTop: paddingRatio * 100 + '%'}
}
