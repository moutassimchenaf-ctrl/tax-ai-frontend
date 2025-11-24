/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react'
import { useGsapScroll } from '../useGsapScroll'

// Mock GSAP
jest.mock('gsap', () => ({
  gsap: {
    registerPlugin: jest.fn(),
  },
}))

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: jest.fn(() => ({
      kill: jest.fn(),
    })),
  },
}))

describe('useGsapScroll', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useGsapScroll())

    expect(result.current.scrollProgress).toBe(0)
    expect(result.current.scrollY).toBe(0)
    expect(result.current.scrollTrigger).toBeNull()
    expect(result.current.triggerRef).toBeDefined()
  })

  it('should accept custom options', () => {
    const onUpdate = jest.fn()
    const { result } = renderHook(() =>
      useGsapScroll({
        start: 'top center',
        end: 'bottom center',
        scrub: 2,
        onUpdate,
      })
    )

    expect(result.current.triggerRef).toBeDefined()
  })
})
