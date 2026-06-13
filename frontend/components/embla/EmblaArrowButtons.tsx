import {cn} from '@/lib/utils'
import {EmblaCarouselType} from 'embla-carousel'
import {ComponentPropsWithRef, useCallback, useEffect, useState} from 'react'
import IconCarat from '../icons/IconCarat'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.goToPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.goToNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canGoToPrev())
    setNextBtnDisabled(!emblaApi.canGoToNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect(emblaApi)
    emblaApi.on('reinit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

type PropType = ComponentPropsWithRef<'button'>

const buttonClasses =
  'rounded-full bg-body text-blue-600 ts-btn size-btn p-[.4em] flex items-center justify-center'
const iconClasses = 'h-full w-auto mr-[-.2em]'

export const PrevButton = (props: PropType) => {
  const {disabled, ...restProps} = props

  return (
    <button
      className={cn(
        'embla__prev rotate-180',
        buttonClasses,
        disabled && 'opacity-50 pointer-events-none',
      )}
      type="button"
      {...restProps}
    >
      <IconCarat className={cn('', iconClasses)} />
    </button>
  )
}

export const NextButton = (props: PropType) => {
  const {disabled, ...restProps} = props

  return (
    <button
      className={cn('embla__next', buttonClasses, disabled && 'opacity-50 pointer-events-none')}
      type="button"
      {...restProps}
    >
      <IconCarat className={iconClasses} />
    </button>
  )
}
