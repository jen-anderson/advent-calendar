import type { KeyboardEvent } from 'react'
import { Tile } from '../types'

//To do - styling to make obvious which tiles are in focus etc.
//General beautification.

export interface TileComponent {
  tile: Tile
  onClick: (id: number) => void
  //Function returns no value, changes state. Void makes this explicit.
}
function makeTile({ tile, onClick }: TileComponent) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick(tile.id)
    }
  }
  return (
    <div
      className={`calendar-tile ${tile.isOpen ? 'open' : 'closed'}`}
      onClick={() => onClick(tile.id)}
      onKeyDown={handleKeyDown}
      tabIndex={0} //Make focusable by keyboard
      role="button"
      aria-label={`Tile ${tile.id}`}
    >
      {/*Workaround to prevent flip effect from also returning flipped text and content of the card.
      The tile is split to two sides, front and back. Front is rotated 180 so it 
      reorientates correctly on flip. Back is hidden so that it doesn't show during effect. */}
      <div className="tile-flipper">
        <div className="tile-front">
          <span>{tile.id}</span>
        </div>
        <div className="tile-back">
          <div className="tile-content">
            <img src={tile.image} alt={`Day ${tile.id}`} />
            <p>{tile.text}</p>
            {/* eslint-disable jsx-a11y/media-has-caption */}
            {tile.music && (
              <audio src={tile.music} controls>
                {tile.captionFile && (
                  <track
                    kind="captions"
                    src={tile.captionFile}
                    srcLang="en"
                    label="English captions (Placeholder)"
                    default
                  />
                )}
                Your browser does not support the audio element.
              </audio>
            )}
            {/* eslint-enable jsx-a11y/media-has-caption */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default makeTile
