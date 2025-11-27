'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function KeyboardShortcuts() {
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // Global Shortcuts
      switch (e.key.toLowerCase()) {
        case 'c':
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault()
            console.log('Create Issue Triggered')
            // In a real app, this would open the global create modal via context/store
          }
          break
        case 'g':
          // Go to... (Navigation)
          // Implement double-key chords if needed (e.g., g then i for issues)
          break
        case 'Escape':
          // Close modals (handled by individual components usually, but global fallback here)
          break
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [router])

  return null // Headless component
}
