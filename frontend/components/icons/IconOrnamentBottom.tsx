import {cn} from '@/lib/utils'

// use className to override height and color

export default function IconOrnamentBottom({
  className = 'h-ornament w-auto text-bg',
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="relative z-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="268"
        height="24"
        fill="none"
        viewBox="0 0 268 24"
        className={cn(
          'absolute bottom-[.6px] left-1/2 -translate-x-1/2 translate-y-full z-1',
          className,
        )}
        {...props}
      >
        <path
          fill="currentColor"
          d="M262.87 7.85A21 21 0 0 0 268 .08C267.5-.05.03 0 0 .08c3.33 8.67 11.31 13.85 21.35 13.85 5.84 0 10.18-.93 14.76-1.9l.1-.03c7.37-1.58 16.54-3.54 39.08-3.54 16.06 0 29.55 3.73 38.04 6.85a88 88 0 0 1 14.92 6.96l.02.02a10.5 10.5 0 0 0 11.46 0c.46-.3 22.46-13.83 52.97-13.83 22.5 0 31.68 1.96 39.04 3.54h.03c4.62 1 8.98 1.93 14.87 1.93 6.52 0 12.16-2.18 16.23-6.08"
        />
      </svg>
    </div>
  )
}
