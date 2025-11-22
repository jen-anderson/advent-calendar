import { createShuffledArray } from '../utils/array'
import { Tile } from '../types'
import TileComponent from './Tile'
import { useState, useEffect } from 'react'
import { tiledata } from '../data/tiles'
import { isTileReady } from '../utils/checkDate'

const calendarSize = 25

function Calendar() {
  //Contains shuffledTiles state, so local storage fits here.

  const [shuffledTiles, setShuffledTiles] = useState<Tile[]>(() => {
    try {
      const savedTiles = localStorage.getItem('adventCalendarState')
      if (savedTiles) {
        return JSON.parse(savedTiles)
      }
    } catch (error) {
      console.error('failed to load state from localStorage', error)
    }
    //If no saved data (or failed to load), return an empty array.
    return []
  })

  useEffect(() => {
    //This effect each time shuffledTiles changes.
    try {
      //Don't save initial empty array state
      if (shuffledTiles.length > 0) {
        localStorage.setItem(
          'adventCalendarState',
          JSON.stringify(shuffledTiles),
        )
      }
    } catch (error) {
      console.error('Failed to save state to local storage', error)
    }
  }, [shuffledTiles])

  useEffect(() => {
    const initialTiles: Tile[] = Array.from(
      { length: calendarSize },
      (_, index) => {
        const tileContent = tiledata[index]
        //Initially set this from 1D to 2D array to match HTML table structure
        //That was causing display issues with css styling so changed to flat array
        return {
          id: index + 1, //Tile ids from 1-25
          image: tileContent.image,
          text: tileContent.text,
          music: tileContent.music,
          captionFile: tileContent.captionFile,
          isOpen: false,
        }
      },
    )

    const shuffledIds = createShuffledArray(calendarSize)
    const trulyShuffledTiles = shuffledIds.map((id) => initialTiles[id])
    setShuffledTiles(trulyShuffledTiles)
  }, [])

  const handleTileClick = (id: number) => {
    //Keep function here because primary role is to manage the state of this compoenent
    if (isTileReady(id)) {
      console.log(`Tile ${id} can be opened!`)
      setShuffledTiles((currentTiles) =>
        currentTiles.map((tile) =>
          tile.id === id ? { ...tile, isOpen: true } : tile,
        ),
      )
    } else {
      alert('Later...')
    }
  }

  return (
    <div className="calendar-grid">
      {shuffledTiles.map((tile) => (
        <TileComponent key={tile.id} tile={tile} onClick={handleTileClick} />
      ))}
    </div>
  )
}

export default Calendar
