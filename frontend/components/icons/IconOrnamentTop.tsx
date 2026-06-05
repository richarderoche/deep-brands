import {cn} from '@/lib/utils'

// use className to override height and color

export default function IconOrnamentTop({
  className = 'h-ornament text-bg',
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="relative z-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="661"
        height="108"
        fill="none"
        viewBox="0 0 661 108"
        className={cn(
          'w-auto absolute top-[.6px] left-1/2 -translate-x-1/2 -translate-y-full z-1',
          className,
        )}
        {...props}
      >
        <path
          fill="currentColor"
          d="M335.39.56q-2.1-.5-4.27-.55L330.5 0l-1 .01c-2.16.07-3.68.45-10.59 2.18l-.14.03c-3.87.97-10.06 2.55-17.56 4.61a730 730 0 0 0-53.42 16.83c-23.3 8.45-42.1 17.1-55.89 25.72-9.36 5.85-16.53 11.7-21.92 17.9a58 58 0 0 0-5.74 7.84l-3.2-.57c-14.8-2.57-28.2-3.88-40.98-4.04a213 213 0 0 0-5.68 0c-14.7.22-28.6 2.1-41.35 5.59A136 136 0 0 0 30.55 96C19.23 103.94 8.95 107.98 0 107.98l661 .02c-8.96 0-19.23-4.04-30.55-11.99-12.8-8.99-27.09-15.68-42.48-19.9-13.6-3.72-28.52-5.6-44.3-5.6-14.5 0-29.75 1.49-46.91 4.62a54 54 0 0 0-5.74-7.83c-5.38-6.2-12.56-12.05-21.92-17.9-13.79-8.62-32.59-17.27-55.89-25.72-37.74-13.7-74.85-22.43-77.7-23.1z"
        />
      </svg>
    </div>
  )
}
