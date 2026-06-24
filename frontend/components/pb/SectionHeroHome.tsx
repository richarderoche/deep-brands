import {PbHeroHome} from '@/sanity.types'
import {PortableText} from 'next-sanity'
import Image from 'next/image'
import ImageCycle from '../shared/ImageCycle'

export default function SectionHeroHome({section}: {section: PbHeroHome}) {
  const {heading, imagesTop1, imagesTop2, imagesBottom1, imagesBottom2, imagesBottom3} = section
  const hasTopRow = imagesTop1 && imagesTop2
  const hasBottomRow = imagesBottom1 && imagesBottom2 && imagesBottom3

  return (
    <div className="h-[185vw] md:h-[150vw] lg:h-[66vw] flex flex-col gap-gut-25 lg:gap-[8vw] justify-center max-md:pt-gut-200 lg:pb-gut">
      {hasTopRow && (
        <div className="flex justify-around w-full h-[40vw] lg:h-[25vw]">
          <div className="w-22/100 lg:w-1/3 h-full shadow-hero">
            <ImageCycle imageCycle={imagesTop1} sizes="25vw" className="rotate-35" />
          </div>
          <div className="w-1/3 h-full max-lg:hidden">
            <div className="h-full flex flex-col items-center justify-center gap-gut-33 translate-y-[8vw]">
              <Image
                src="/deep-brands-logo.svg"
                alt=""
                className="block h-[20vw] w-auto"
                width={513}
                height={312}
                priority
              />
              {heading && (
                <h2 className="ts-h4 ts-serif text-center text-balance">
                  <PortableText value={heading} />
                </h2>
              )}
            </div>
          </div>
          <div className="w-22/100 lg:w-1/3 h-full shadow-hero">
            <ImageCycle imageCycle={imagesTop2} sizes="25vw" className="-rotate-35" />
          </div>
        </div>
      )}
      <div className="w-full flex flex-col items-center justify-center gap-gut-33 lg:hidden">
        <Image
          src="/deep-brands-logo.svg"
          alt=""
          className="block h-[40vw] md:h-[33vw] w-auto mx-auto"
          width={513}
          height={312}
        />
        {heading && (
          <h2 className="ts-size-35/24 md:ts-size-58/36 ts-serif text-center text-pretty md:text-balance px-gut">
            <PortableText value={heading} />
          </h2>
        )}
      </div>
      {hasBottomRow && (
        <div className="flex justify-around w-full h-[40vw] lg:h-[25vw] shadow-hero">
          <div className="w-1/3 lg:w-1/4 h-full">
            <ImageCycle
              imageCycle={imagesBottom1}
              sizes="25vw"
              className="rotate-15 lg:-rotate-15"
            />
          </div>
          <div className="w-1/3 lg:w-1/4 h-full">
            <ImageCycle
              imageCycle={imagesBottom2}
              sizes="25vw"
              imgClassName="lg:object-bottom max-lg:-rotate-15"
            />
          </div>
          <div className="w-1/4 h-full portrait:hidden max-lg:hidden">
            <ImageCycle imageCycle={imagesBottom3} sizes="25vw" className="rotate-15" />
          </div>
        </div>
      )}
    </div>
  )
}
