import { create } from 'zustand'

interface ScrollState {
    progress: number
    currentSection: number
    setProgress: (progress: number) => void
    setCurrentSection: (section: number) => void
}

export const useScrollStore = create<ScrollState>((set) => ({
    progress: 0,
    currentSection: 0,
    setProgress: (progress) => set({ progress }),
    setCurrentSection: (currentSection) => set({ currentSection }),
}))
