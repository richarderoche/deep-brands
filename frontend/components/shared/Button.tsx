import HashAwareLink from './HashAwareLink'
import type {CSSProperties} from 'react'

import {colorValue} from '@/lib/colorValue'
import {cn} from '@/lib/utils'
import type {ColorChoice, PbBlockButton} from '@/sanity.types'
import {resolveHref} from '@/sanity/lib/utils'
import {NavItem} from '@/types'
import IconArrow from '../icons/IconArrow'
import SocialIcon, {type SocialIconName} from './SocialIcon'

export type ButtonIcon = NonNullable<PbBlockButton['icon']>
export type ArrowDirection = NonNullable<PbBlockButton['arrowDirection']>

type ButtonOwnProps = {
  text?: string
  path?: string
  navItem?: NavItem
  anchorLink?: string
  download?: boolean
  icon?: ButtonIcon
  arrowDirection?: ArrowDirection
  buttonStyle?: NonNullable<PbBlockButton['buttonStyle']>
  outline?: boolean
  subtle?: boolean
  buttonColor?: ColorChoice
}

/**
 * Handlers and globals typed for `HTMLElement` so they apply to both `<button>` and `<a>`
 */
type InteractivePassthroughProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  keyof ButtonOwnProps | 'children'
>

type ButtonOnlyProps = Pick<React.ComponentPropsWithoutRef<'button'>, 'disabled' | 'type'>

export type ButtonProps = ButtonOwnProps & InteractivePassthroughProps & ButtonOnlyProps

export default function Button(props: ButtonProps) {
  const {
    text,
    path,
    navItem,
    anchorLink,
    onClick,
    className,
    download,
    icon = 'arrow',
    arrowDirection = 'right',
    disabled = false,
    buttonStyle,
    outline = false,
    subtle = false,
    buttonColor,
    ...rest
  } = props
  const resolvedStyle = buttonStyle ?? (outline ? 'outline' : 'default')
  const isOutline = resolvedStyle === 'outline'
  const isNoBg = resolvedStyle === 'no-bg'
  const fgColor = colorValue(buttonColor)
  const themeStyle = fgColor ? ({'--theme-btn-fg': fgColor} as CSSProperties) : undefined
  let href: string | undefined = ''
  let buttonText: string | undefined = ''

  if (navItem) {
    const {page, title, url, anchorLink: navAnchorLink} = navItem
    href = page ? resolveHref(page.type, page.slug) : url
    const hash = anchorLink ?? navAnchorLink
    if (hash) {
      const normalizedHash = hash.replace(/^#/, '')
      href = href ? `${href}#${normalizedHash}` : `#${normalizedHash}`
    }
    buttonText = title || page?.title || ''
  } else {
    href = path || ''
    buttonText = text || 'Button'
  }

  const isExternal = href?.startsWith('http')
  const isVerticalArrow = icon === 'arrow' && (arrowDirection === 'up' || arrowDirection === 'down')
  const buttonClasses = cn(
    'flex w-fit items-center h-btn px-[.5em] rounded-btn border transition-all hover:scale-105 will-change-transform',
    isNoBg ? 'ts-h6 ts-sans-wide' : 'ts-btn',
    isVerticalArrow && 'flex-col h-auto py-[.5em] gap-[.15em]',
    isOutline
      ? fgColor
        ? 'border-btn-fg text-btn-fg bg-transparent'
        : ''
      : isNoBg
        ? fgColor
          ? 'border-transparent text-btn-fg bg-transparent'
          : 'border-transparent bg-transparent'
        : subtle
          ? 'border-transparent bg-white/35 hover:bg-white/70 text-btn-fg-subtle'
          : 'border-transparent bg-body text-btn-fg',
    disabled && 'opacity-50 pointer-events-none',
    className,
  )

  if (href) {
    return (
      <HashAwareLink
        href={href || ''}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={buttonClasses}
        style={themeStyle}
        download={download}
        onClick={onClick}
        {...rest}
      >
        <ButtonContent
          text={buttonText}
          icon={icon}
          arrowDirection={arrowDirection}
          buttonStyle={resolvedStyle}
        />
      </HashAwareLink>
    )
  }

  return (
    <button
      type="button"
      className={buttonClasses}
      style={themeStyle}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <ButtonContent
        text={buttonText}
        icon={icon}
        arrowDirection={arrowDirection}
        buttonStyle={resolvedStyle}
      />
    </button>
  )
}

function isSocialIcon(icon: ButtonIcon): icon is SocialIconName {
  return icon !== 'none' && icon !== 'arrow'
}

const ARROW_ROTATION: Record<ArrowDirection, string> = {
  up: '-rotate-90',
  right: '',
  down: 'rotate-90',
  left: 'rotate-180',
}

const ButtonContent = ({
  text,
  icon,
  arrowDirection = 'right',
  buttonStyle,
}: {
  text: string
  icon: ButtonIcon
  arrowDirection?: ArrowDirection
  buttonStyle: NonNullable<PbBlockButton['buttonStyle']>
}) => {
  const isVertical = arrowDirection === 'up' || arrowDirection === 'down'
  const isArrowFirst = arrowDirection === 'left' || arrowDirection === 'up'

  return (
    <>
      <span className={cn('whitespace-nowrap', isArrowFirst ? 'order-2' : 'order-1')}>{text}</span>
      {icon === 'arrow' && (
        <IconArrow
          className={cn(
            'h-[.6em] w-auto shrink-0',
            ARROW_ROTATION[arrowDirection],
            isArrowFirst ? 'order-1' : 'order-2',
            isVertical ? '' : isArrowFirst ? 'pr-[.35em]' : 'pl-[.35em]',
          )}
        />
      )}
      {isSocialIcon(icon) && (
        <span
          className={cn(
            'rounded-full flex justify-center items-center ml-[.5em] p-[.45em] aspect-square text-[.6em] text-center order-3',
            buttonStyle === 'outline'
              ? 'bg-body text-btn-fg'
              : buttonStyle === 'no-bg'
                ? 'text-btn-fg'
                : 'bg-btn-fg text-body',
          )}
        >
          <SocialIcon name={icon} />
        </span>
      )}
    </>
  )
}
