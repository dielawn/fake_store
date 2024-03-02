import { render, fireEvent, screen } from '@testing-library/react';
import { Store } from './Store';
import UserContext from './UserContext';

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  )
}

  
  describe('Store Component', () => {
    it('displays loading state', () => {
      const providerProps = { loading: true, inventory: [], error: null }
      customRender(<Store />, { providerProps })
      expect(screen.getByText(/loading.../i)).toBeInTheDocument()
    })
    
    it('displays error message', () => {
      const providerProps = { loading: false, inventory: [], error: 'Test Error' }
      customRender(<Store />, { providerProps })
      expect(screen.getByText(/error: test error/i)).toBeInTheDocument()
    })
    
    it('renders inventory items when loaded', () => {
      const providerProps = {
        loading: false,
        inventory: [{ id: 1, title: 'Test Item', price: 10, qty: 1, isDescVis: false, description: 'Test Description', image: 'test.jpg' }],
        error: null,
        addToCart: jest.fn(),
      }
      customRender(<Store />, { providerProps })
      expect(screen.getByText(/test item/i)).toBeInTheDocument()
      expect(screen.getByText(/\$10.00/i)).toBeInTheDocument()
    })
    
  })
  