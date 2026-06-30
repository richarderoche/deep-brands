import IconLogoShape from './IconLogoShape'
import NotchMasks from './NotchMasks'
import SubrandMasks from './SubrandMasks'

export default function IconMasks() {
  return (
    <div className="absolute size-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
      <IconLogoShape forMask={true} />
      <NotchMasks />
      <SubrandMasks />
    </div>
  )
}
