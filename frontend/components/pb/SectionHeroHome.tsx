import {PbHeroHome} from '@/sanity.types'
import Image from 'next/image'
import ImageCycle from '../shared/ImageCycle'

export default function SectionHeroHome({section}: {section: PbHeroHome}) {
  const {heading, imagesTop1, imagesTop2, imagesBottom1, imagesBottom2, imagesBottom3} = section
  const hasTopRow = imagesTop1 && imagesTop2
  const hasBottomRow = imagesBottom1 && imagesBottom2 && imagesBottom3

  return (
    <div className="min-h-screen">
      {hasTopRow && (
        <div className="flex justify-around w-full h-[50vh] border">
          <div className="w-1/3 h-full">
            <ImageCycle imageCycle={imagesTop1} sizes="25vw" className="" />
          </div>
          <div className="w-1/3 h-full">
            <Image
              src="/deep-brands-logo.svg"
              alt=""
              className="block h-auto w-full"
              width={513}
              height={312}
            />
          </div>
          <div className="w-1/3 h-full">
            <ImageCycle imageCycle={imagesTop2} sizes="25vw" className="" />
          </div>
        </div>
      )}
      {hasBottomRow && (
        <div className="flex justify-around w-full h-[50vh] border">
          <div className="w-1/3 h-full">
            <ImageCycle imageCycle={imagesBottom1} sizes="25vw" className="" />
          </div>
          <div className="w-1/3 h-full">
            <ImageCycle imageCycle={imagesBottom2} sizes="25vw" className="" />
          </div>
          <div className="w-1/3 h-full">
            <ImageCycle imageCycle={imagesBottom3} sizes="25vw" className="" />
          </div>
        </div>
      )}
    </div>
  )
}
