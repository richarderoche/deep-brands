import {cn} from '@/lib/utils'
import IconOrnamentBottom from '../icons/IconOrnamentBottom'
import IconOrnamentTop from '../icons/IconOrnamentTop'

export default function Card({
  children,
  outerClassName,
  innerClassName,
  bgColor = 'var(--theme-bg-subtle)',
  ...props
}: {
  children: React.ReactNode
  outerClassName?: string
  innerClassName?: string
  bgColor?: string
} & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn(outerClassName ? outerClassName : 'shadow-md')}>
      <IconOrnamentTop
        style={{color: bgColor}}
        className={cn('w-2/3 h-auto', !bgColor && 'text-bg')}
      />
      <div
        className={cn('px-gut-66 py-gut rounded-t-card-top rounded-b-card-bottom', innerClassName)}
        style={{backgroundColor: bgColor}}
        {...props}
      >
        {children}
      </div>
      <IconOrnamentBottom
        style={{color: bgColor}}
        className={cn('w-2/3 h-auto', !bgColor && 'text-bg')}
      />
    </div>
  )
}
