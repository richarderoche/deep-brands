'use client'
import {usePathname} from 'next/navigation'
import {ViewTransition} from 'react'

export default function PageWrapper({children}: {children: React.ReactNode}) {
  const pathname = usePathname()
  return (
    <ViewTransition key={pathname} name="page-content" default="auto">
      {children}
    </ViewTransition>
  )
}
