import {create} from 'zustand'

type Store = {
  isMobileNavOpen: boolean
  setIsMobileNavOpen: (value: boolean) => void
  pauseLenis: boolean
  setPauseLenis: (value: boolean) => void
}

export const useStore = create<Store>((set) => ({
  isMobileNavOpen: false,
  setIsMobileNavOpen: (value: boolean) => set({isMobileNavOpen: value}),
  pauseLenis: false,
  setPauseLenis: (value: boolean) => set({pauseLenis: value}),
}))
