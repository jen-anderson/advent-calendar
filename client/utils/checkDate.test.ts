import { isTileReady } from './checkDate'

describe('isTileReady', () => {
  it('should return true if the date is in the past', () => {
    const mockDate = new Date('2025-12-20')
    vi.setSystemTime(mockDate)

    expect(isTileReady(15)).toBe(true)
    expect(isTileReady(20)).toBe(true)

    vi.useRealTimers()
  })

  it('should return false if the date is in the future', () => {
    const mockDate = new Date('2025-12-10')
    vi.setSystemTime(mockDate)
    expect(isTileReady(15)).toBe(false)
    vi.useRealTimers()
  })
})
