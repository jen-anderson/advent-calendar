import { createShuffledArray } from './array'

describe('createShuffledArray', () => {
  it('should return an array of the correct length', () => {
    const length = 25
    const shuffledArray = createShuffledArray(length)
    expect(shuffledArray.length).toBe(length)
  })

  it('should contain all the numbers from 0 to length - 1', () => {
    const length = 25
    const shuffledArray = createShuffledArray(length)
    const sortedArray = [...shuffledArray].sort((a, b) => a - b)

    const expectedArray = Array.from({ length }, (_, i) => i)
    expect(sortedArray).toEqual(expectedArray)
  })
  //Array.from() creates array like structure with n positions
  //(_, i) is intentionally unused but present parameter (current value of element)
  //In this map, that's irrelevant, we need to count up index position to check length

  it('should not be in the same order as the original array', () => {
    const length = 25
    const shuffledArray = createShuffledArray(length)
    const originalArray = Array.from({ length }, (_, i) => i)
    expect(shuffledArray).not.toEqual(originalArray)
  })
  //Very small chance this might return an array with the same order of values
  //Could retest a few times.
})
