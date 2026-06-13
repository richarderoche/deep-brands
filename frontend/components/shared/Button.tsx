import Link from 'next/link'

import {cn} from '@/lib/utils'
import type {PbBlockButton} from '@/sanity.types'
import {resolveHref} from '@/sanity/lib/utils'
import {NavItem} from '@/types'
import IconArrow from '../icons/IconArrow'
import SocialIcon, {type SocialIconName} from './SocialIcon'

export type ButtonIcon = NonNullable<PbBlockButton['icon']>

type ButtonOwnProps = {
  text?: string
  path?: string
  navItem?: NavItem
  download?: boolean
  icon?: ButtonIcon
  outline?: boolean
  subtle?: boolean
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
    onClick,
    className,
    download,
    icon = 'arrow',
    disabled = false,
    outline = false,
    subtle = false,
    ...rest
  } = props
  let href: string | undefined = ''
  let buttonText: string | undefined = ''

  if (navItem) {
    const {page, title, url} = navItem
    href = page ? resolveHref(page.type, page.slug) : url
    buttonText = title || page?.title || ''
  } else {
    href = path || ''
    buttonText = text || 'Button'
  }

  const isExternal = href?.startsWith('http')
  const buttonClasses = cn(
    'flex w-fit items-center h-btn px-[.5em] rounded-btn ts-btn border transition-all hover:scale-105 will-change-transform',
    outline
      ? ''
      : subtle
        ? 'border-transparent bg-white/35 hover:bg-white/70 text-btn-fg'
        : 'border-transparent bg-body text-btn-fg',
    disabled && 'opacity-50 pointer-events-none',
    className,
  )

  if (href) {
    return (
      <Link
        href={href || ''}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={buttonClasses}
        download={download}
        onClick={onClick}
        {...rest}
      >
        <ButtonContent text={buttonText} icon={icon} outline={outline} />
      </Link>
    )
  }

  return (
    <button type="button" className={buttonClasses} onClick={onClick} disabled={disabled} {...rest}>
      <ButtonContent text={buttonText} icon={icon} outline={outline} />
    </button>
  )
}

function isSocialIcon(icon: ButtonIcon): icon is SocialIconName {
  return icon !== 'none' && icon !== 'arrow'
}

const ButtonContent = ({
  text,
  icon,
  outline,
}: {
  text: string
  icon: ButtonIcon
  outline: boolean
}) => {
  return (
    <>
      <span className="whitespace-nowrap">{text}</span>
      {icon === 'arrow' && <IconArrow className="pl-[.35em] h-[.6em] w-auto" />}
      {isSocialIcon(icon) && (
        <span
          className={cn(
            'rounded-full  flex justify-center items-center ml-[.5em] p-[.45em] aspect-square text-[.6em] text-center',
            outline ? 'bg-body text-btn-fg' : 'bg-btn-fg text-body',
          )}
        >
          <SocialIcon name={icon} />
        </span>
      )}
    </>
  )
}
