import {cn} from '@/lib/utils'
import IconArrow from '../icons/IconArrow'

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  showOnMobile?: boolean
  showOnTablet?: boolean
  showOnDesktop?: boolean
  showDividerLine?: boolean
  showOrnament?: boolean
  size?: number
}

export default function Divider({
  showOnMobile,
  showOnTablet,
  showOnDesktop,
  showDividerLine,
  showOrnament,
  size = 1,
  className,
  ...props
}: DividerProps) {
  return (
    <div
      className={cn(
        'w-full hidden relative items-center justify-center gap-5',
        showOnMobile ? 'max-md:flex' : '',
        showOnTablet ? 'md:max-lg:flex' : '',
        showOnDesktop ? 'lg:flex' : '',
        className && className,
        size === 2
          ? 'my-gut-50'
          : size === 3
            ? 'my-gut'
            : size === 4
              ? 'my-gut-150'
              : size === 5
                ? 'my-gut-200'
                : '',
      )}
      {...props}
    >
      {showDividerLine && <DividerLine />}
      {showOrnament && <IconArrow className="w-gut-75 h-auto rotate-90" />}
      {showDividerLine && showOrnament && <DividerLine />}
    </div>
  )
}

export function DividerLine() {
  return <div className="h-1 grow bg-current/25" />
}
