import {getImageDimensions} from '@sanity/asset-utils'
import type {PbBlockImage} from '@/sanity.types'

const MASK_ASPECT_RATIOS: Partial<
  Record<NonNullable<PbBlockImage['imageMaskType']>, number>
> = {
  logoDB: 1.6411287988,
  archIK: 1,
  archTT: 1,
}

export type ImageAspectBlock = Pick<PbBlockImage, 'image' | 'imageCrop' | 'imageMaskType'>

export function getAspect(block: ImageAspectBlock): number {
  const {image, imageCrop, imageMaskType} = block

  const maskRatio = imageMaskType && MASK_ASPECT_RATIOS[imageMaskType]
  if (maskRatio) return maskRatio

  if (imageCrop) return imageCrop

  const asset = image?.asset
  if (asset?._ref) {
    const {width, height} = getImageDimensions(asset)
    if (height) return width / height
  }

  return 1
}
