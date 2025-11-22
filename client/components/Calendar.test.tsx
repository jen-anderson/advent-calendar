import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calendar from './Calendar'
import { isTileReady } from '../utils/checkDate'
import { createShuffledArray } from '../utils/array'

vi.mock('../utils/checkDate')
vi.mock('../utils/array')

describe('Calendar Component', () => {
  beforeEach(() => {
    vi.mocked(isTileReady).mockReturnValue(true)
    vi.mocked(createShuffledArray).mockReturnValue(
      Array.from({ length: 25 }, (_, i) => i),
    )
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render all 25 tiles initially', () => {
    render(<Calendar />)
    const tiles = screen.getAllByRole('button')
    expect(tiles.length).toBe(25)
  })

  it('should render all tiles as initially closed', () => {
    render(<Calendar />)
    const tiles = screen.getAllByRole('button')
    tiles.forEach((tile) => {
      expect(tile).toHaveClass('closed')
    })
  })

  it('should find the first tile ', async () => {
    render(<Calendar />)
    const firstTile = screen.getAllByRole('button')[0]

    expect(firstTile).toHaveClass('closed')
    expect(firstTile).not.toHaveClass('open')

    //Simulate click on the first tile.

    await userEvent.click(firstTile)

    expect(firstTile).toHaveClass('open')
    expect(firstTile).not.toHaveClass('closed')
    expect(isTileReady).toHaveBeenCalledWith(1)
  })

  it('should not open a tile if it is not ready, should show an alert', async () => {
    //Mock window.alert to prevent it firing during test.
    const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {})
    //Set isTileReady to false.
    vi.mocked(isTileReady).mockReturnValue(false)
    render(<Calendar />)

    const firstTile = screen.getAllByRole('button')[0]

    expect(firstTile).toHaveClass('closed')

    await userEvent.click(firstTile)
    //If we didn't call this, the next condition would be checked preemptively.

    expect(firstTile).toHaveClass('closed')
    expect(firstTile).not.toHaveClass('open')

    expect(mockAlert).toHaveBeenCalledTimes(1)
    expect(mockAlert).toHaveBeenCalledWith('Later...')

    mockAlert.mockRestore()
  })
})
