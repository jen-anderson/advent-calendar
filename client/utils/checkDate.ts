export function isTileReady(day: number): boolean {
  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth() //0 for January

  const adventMonth = 11 //11 is December

  if (currentMonth === adventMonth) {
    return currentDay >= day
  }
  return currentMonth > adventMonth //Past December all tiles can be opened
}
