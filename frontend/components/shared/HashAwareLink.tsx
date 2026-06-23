'use client'

import {isSamePageHashLink} from '@/lib/isSamePageHashLink'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import type {ComponentProps} from 'react'

type HashAwareLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

export default function HashAwareLink({href, ...props}: HashAwareLinkProps) {
  const pathname = usePathname()

  if (isSamePageHashLink(href, pathname)) {
    const {prefetch, replace, scroll, locale, ...anchorProps} = props
    return <a href={href} {...anchorProps} />
  }

  return <Link href={href} {...props} />
}
