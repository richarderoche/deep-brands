// @refresh reset
'use client'

import '@/app/css/embla.css'
import {cn, getColorStepClass, imgSizesFormat} from '@/lib/utils'
import {PbNews} from '@/sanity.types'
import Accessibility from 'embla-carousel-accessibility'
import useEmblaCarousel from 'embla-carousel-react'
import {useAccessibility} from '../embla/EmblaAccessibility'
import {NextButton, PrevButton, usePrevNextButtons} from '../embla/EmblaArrowButtons'
import Button from '../shared/Button'
import Card from '../shared/Card'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import {ButtonBlock, ImageBlock} from './PbBlocks'

export default function SectionNews({section}: {section: PbNews}) {
  const {title, colorSteps, ctaButton, newsPosts} = section
  const hasPosts = newsPosts && newsPosts.length > 0
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true, align: 'start'}, [
    Accessibility({
      announceChanges: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    }),
  ])
  useAccessibility(emblaApi)
  const {prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick} =
    usePrevNextButtons(emblaApi)

  if (!hasPosts) return null

  return (
    <div className="embla">
      <SiteWidth>
        <SiteGrid>
          <div className="col-span-12 flex gap-gut-50 max-lg:flex-col lg:justify-between lg:items-end">
            <h2 className="ts-h1 ts-serif grow">
              <em>{title}</em>
            </h2>
            <div className="flex max-lg:justify-between items-center gap-gut-50">
              {ctaButton && <ButtonBlock block={ctaButton} />}
              <div className="embla__buttons flex gap-gut-50 bg-black/30 p-5 rounded-full max-lg:order-first">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
              </div>
            </div>
          </div>
        </SiteGrid>
      </SiteWidth>

      {hasPosts && (
        <div ref={emblaRef} className="embla__viewport mt-gut">
          <div className={cn('embla__container text-blue-800', getColorStepClass(colorSteps))}>
            {newsPosts.map((post) => {
              const {_key, image, title, caption, url} = post
              return (
                <div
                  key={_key}
                  className="embla__slide basis-4/5 md:basis-6/10 lg:basis-3/10 pl-gut-200 rainbow-light-var"
                >
                  <div className="h-full flex flex-col">
                    <div className="-ml-gut">
                      <ImageBlock
                        block={{
                          image: image,
                          imageMaskType: 'notches',
                          imageCrop: 1.25,
                          disableCorners: true,
                        }}
                        trueSizes={imgSizesFormat(80, 60, 30)}
                      />
                    </div>
                    <div className="-mt-gut -mx-gut-50 pb-gut grow">
                      <Card
                        outerClassName="shadow-sm h-full"
                        innerClassName="h-full flex flex-col gap-gut-33"
                        bgColor="var(--rainbow-light)"
                      >
                        {title && <h3 className="ts-h6 ts-sans-wide text-balance">{title}</h3>}
                        {caption && <p className="ts-p-xs text-pretty grow">{caption}</p>}
                        {url && <Button path={url} text="View More" subtle />}
                      </Card>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="embla__live-region" />
    </div>
  )
}
