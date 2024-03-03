import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import { Nav } from './Nav';
import UserContext from './UserContext';
import userEvent from '@testing-library/user-event';

const customRender = (ui, { providerProps, ...options }) => {
  return render(
    <MemoryRouter>
      <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>
    </MemoryRouter>,
    options
  )
}

describe('Nav component', () => {
  it('renders navigation links', () => {
    const providerProps = {
      userName: '',
      cart: [],
      setUserName: vi.fn(),
      removeFromAppCart: vi.fn(),
    }
    customRender(<Nav />, { providerProps })
  
    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/store/i)).toBeInTheDocument()
  })

  it('text in input, login btn clicked, setUserName called', async () => {
    const setUserName = vi.fn();
    const providerProps = {
      userName: '',
      cart: [],
      setUserName,
      removeFromAppCart: vi.fn(),
    }
    customRender(<Nav />, { providerProps })
  
    const input = screen.getByLabelText(/user name:/i)
    const loginButton = screen.getByRole('button', { name: /login/i })
  
    await userEvent.type(input, 'John Doe')
    await userEvent.click(loginButton)
  
    expect(setUserName).toHaveBeenCalledWith('John Doe')
  })
  
  it('renders the User component when userName is provided', () => {
    const providerProps = {
      userName: 'John Doe',
      cart: [],
      setUserName: vi.fn(),
      removeFromAppCart: vi.fn(),
    }
    customRender(<Nav />, { providerProps })
  
    expect(screen.queryByLabelText(/user name:/i)).not.toBeInTheDocument()
    expect(screen.getByText('Welcome John Doe,')).toBeInTheDocument()
  })
})