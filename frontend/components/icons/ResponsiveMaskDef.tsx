import {buildResponsiveMaskPaths} from '@/lib/responsiveMaskPath'

export default function ResponsiveMaskDef({
  id,
  ratio,
  rxTop,
  rxBottom,
}: {
  id: string
  ratio: number
  rxTop?: number
  rxBottom?: number
}) {
  const {width, height, paths} = buildResponsiveMaskPaths({ratio, rxTop, rxBottom})
  const scaleX = 1 / width
  const scaleY = 1 / height

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0"
      height="0"
      fill="none"
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          {paths.map((d, index) => (
            <path key={index} d={d} transform={`scale(${scaleX} ${scaleY})`} />
          ))}
        </clipPath>
      </defs>
    </svg>
  )
}
