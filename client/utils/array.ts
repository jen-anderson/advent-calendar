export function createShuffledArray(length: number): number[] {
  const array = Array.from({ length }, (_, i) => i) //Create array 0-24
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]] //Swap elements
    //Fisher-Yates shuffle array vs generating random number and then removing from pool of candidates.
  }
  return array
}
