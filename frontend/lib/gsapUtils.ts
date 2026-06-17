import gsap from 'gsap'

export function getVisibleColumnBlocks(container: HTMLElement) {
  return gsap.utils.toArray<HTMLElement>('.column-blocks > *', container).filter((target) => {
    const {display, visibility} = getComputedStyle(target)
    return display !== 'none' && visibility !== 'hidden'
  })
}
