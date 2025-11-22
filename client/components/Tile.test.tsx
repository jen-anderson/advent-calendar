import TileComponent from './Tile'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event' //Means we don't need to import 'fireEvent'
import { Tile } from '../types'

//User event is a higher-level library that replicates full user interactions
//eg await userEvent.click(button) will hover, fire mouseDown, mouseup, then click.
//also handles focusing elements when tabbibg. fireEvent just dispatches Exactly the DOM event
//you tell it tp = fireEvent.click(button) just dispatches a single click event.

describe('Tile Component', () => {
  const mockOnClick = vi.fn()

  const closedTile: Tile = {
    id: 1,
    image: '/src/images/01.jpg',
    text: 'Test Text Closed',
    isOpen: false,
  }

  const openTile: Tile = {
    id: 2,
    image: '/src/images/02.jpg',
    text: 'Test Text Open',
    isOpen: true,
  }

  it('renders correctly in the closed state', () => {
    render(<TileComponent tile={closedTile} onClick={mockOnClick} />)

    //Check whether ID visible
    expect(screen.getByText('1')).toBeInTheDocument()
    /*Check the content is not visible removed - flip function means that these
    are still present in html, but hidden. JSDOM does not manage CSS or render, so 
    from the environment perspective, the element is always there.
    expect(screen.queryByAltText('Day 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Test Text Closed')).not.toBeInTheDocument()
*/
    //Check if the correct class is applied
    const tileElement = screen.getByRole('button', {
      name: `Tile ${closedTile.id}`,
    })
    expect(tileElement).toHaveClass('calendar-tile')
    expect(tileElement).toHaveClass('closed')
    expect(tileElement).not.toHaveClass('open')
  })

  it('renders correctly in the open state', () => {
    render(<TileComponent tile={openTile} onClick={mockOnClick} />)
    //No need to check if ID visible, it is present and will skew test - see above explanation
    //expect(screen.queryByText('2')).not.toBeInTheDocument()
    //Check the content is visible
    expect(screen.getByAltText('Day 2')).toBeInTheDocument()
    expect(screen.getByText('Test Text Open')).toBeInTheDocument()

    //Check if the correct class is applied
    const tileElement = screen.getByRole('button', {
      name: `Tile ${openTile.id}`,
    })
    expect(tileElement).toHaveClass('calendar-tile')
    expect(tileElement).toHaveClass('open')
    expect(tileElement).not.toHaveClass('closed')
  })

  it('Calls onClick when clicked in the closed state', async () => {
    mockOnClick.mockClear() //Clear any prior calls
    render(<TileComponent tile={closedTile} onClick={mockOnClick} />)

    const tileElement = screen.getByRole('button', {
      name: `Tile ${closedTile.id}`,
    })
    await userEvent.click(tileElement)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(mockOnClick).toHaveBeenCalledWith(1)
  })

  it('calls onClick when Enter key is pressed in the closed state', async () => {
    mockOnClick.mockClear() //Clear any prior calls
    render(<TileComponent tile={closedTile} onClick={mockOnClick} />)

    const tileElement = screen.getByRole('button', {
      name: `Tile ${closedTile.id}`,
    })
    tileElement.focus() //Focus the element
    await userEvent.keyboard('{enter}')

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(mockOnClick).toHaveBeenCalledWith(1)
  })

  //Couldn't handle userEvent - does not fire synthetic clink as Enter does
  //Use lower level fireEvent function to force the issue
  it('calls onClick when Space key is pressed in the closed state', () => {
    mockOnClick.mockClear() //Clear any prior calls
    render(<TileComponent tile={closedTile} onClick={mockOnClick} />)

    const tileElement = screen.getByRole('button', {
      name: `Tile ${closedTile.id}`,
    })

    fireEvent.keyDown(tileElement, { key: ' ', code: '{space}' })

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(mockOnClick).toHaveBeenCalledWith(1)
  })
})
