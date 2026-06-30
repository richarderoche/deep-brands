import {HERO_SHAPE_MASK_IDS} from '@/components/icons/HeroShapeMasks'
import ResponsiveMask from '@/components/shared/ResponsiveMask'
import ImageBasic from '@/components/shared/ImageBasic'
import BackgroundVideoPlayer, {muxPlaybackHlsUrl} from '@/components/shared/BackgroundVideoPlayer'
import {
  HERO_SHAPE_LANDSCAPE_RATIO,
  HERO_SHAPE_MID_RATIO,
  HERO_SHAPE_PORTRAIT_RATIO,
} from '@/lib/responsiveMaskPath'
import {backdropPositionStyle} from '@/lib/objectPosition'
import {imgSizesFormat} from '@/lib/utils'
import type {Image as SanityImageType} from 'sanity'

const mediaClassName = 'h-full w-full object-cover'

export default function HeroShapeBackdrop({
  image,
  playbackId,
  objectPosition,
  imageDataSanity,
  videoDataSanity,
}: {
  image?: SanityImageType
  playbackId?: string | null
  objectPosition?: string | null
  imageDataSanity?: string
  videoDataSanity?: string
}) {
  const mediaStyle = backdropPositionStyle(objectPosition)

  return (
    <ResponsiveMask
      ratios={{
        wide: HERO_SHAPE_LANDSCAPE_RATIO,
        mid: HERO_SHAPE_MID_RATIO,
        tall: HERO_SHAPE_PORTRAIT_RATIO,
      }}
      maskIds={HERO_SHAPE_MASK_IDS}
      className="w-full"
    >
      {image ? (
        <ImageBasic
          image={image}
          ratio={0}
          mode="cover"
          fitTo="manual"
          className={mediaClassName}
          style={mediaStyle}
          sizes={imgSizesFormat(90, 80, 66)}
          priority
          {...(imageDataSanity && {'data-sanity': imageDataSanity})}
        />
      ) : playbackId ? (
        <BackgroundVideoPlayer
          src={muxPlaybackHlsUrl(playbackId)}
          className={mediaClassName}
          style={mediaStyle}
          {...(videoDataSanity && {'data-sanity': videoDataSanity})}
        />
      ) : null}
    </ResponsiveMask>
  )
}
