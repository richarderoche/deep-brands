import {cn} from '@/lib/utils'

// use className to override height and color

export default function IconOrnamentRight({
  className = 'w-ornament text-bg',
  flip = false,
  ...props
}: {flip?: boolean} & React.SVGProps<SVGSVGElement>) {
  return (
    <div className="relative z-1 w-full h-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="108"
        height="661"
        fill="none"
        viewBox="0 0 108 661"
        className={cn(
          'h-auto absolute top-1/2 -translate-y-1/2  z-1',
          flip ? 'rotate-180 left-[.6px] -translate-x-full' : 'right-[.6px] translate-x-full',
          className,
        )}
        {...props}
      >
        <path
          fill="currentColor"
          d="M107.44 335.39q.5-2.1.55-4.27l.01-.62-.01-1c-.07-2.16-.45-3.68-2.18-10.59l-.03-.14a774 774 0 0 0-4.61-17.56 730 730 0 0 0-16.83-53.42c-8.45-23.3-17.1-42.1-25.72-55.89-5.85-9.36-11.7-16.53-17.9-21.92a58 58 0 0 0-7.84-5.74l.57-3.2c2.57-14.8 3.88-28.2 4.04-40.98a213 213 0 0 0 0-5.68c-.22-14.7-2.1-28.6-5.59-41.35A136 136 0 0 0 12 30.55C4.06 19.23.02 8.95.02 0L0 661c0-8.96 4.04-19.23 11.99-30.55 8.99-12.8 15.68-27.09 19.9-42.48 3.72-13.6 5.6-28.52 5.6-44.3 0-14.5-1.49-29.75-4.62-46.91a54 54 0 0 0 7.83-5.74c6.2-5.38 12.05-12.56 17.9-21.92 8.62-13.79 17.27-32.59 25.72-55.89 13.7-37.74 22.43-74.85 23.1-77.7z"
        />
      </svg>
    </div>
  )
}
