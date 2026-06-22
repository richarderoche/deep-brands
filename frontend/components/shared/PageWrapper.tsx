import {ViewTransition} from 'react'

export default function PageWrapper({children}: {children: React.ReactNode}) {
  return (
    <ViewTransition name="page-content" default="auto">
      {children}
    </ViewTransition>
  )
}
