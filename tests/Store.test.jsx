import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Store } from '../src/Store';
import UserContext from '../src/UserContext';

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  )
}

  
  describe('Store Component', () => {
    describe('render tests', () => {
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
      
      // it('renders inventory items when loaded', async () => {
      //   const providerProps = {
      //     loading: false,
      //     inventory: [{ id: 1, title: 'Test Item', price: 10, qty: 1, isDescVis: false, description: 'Test Description', image: 'test.jpg' }],
      //     error: null,
      //     addToCart: jest.fn(),
      //   }
      //   customRender(<Store />, { providerProps })
      //   // const itemTitle = await screen.findByText(/test item/i)
      //   // expect(itemTitle).toBeInTheDocument()
      //   expect(screen.getByText(/\$10.00/i)).toBeInTheDocument()
      // })
    })  

    
  });

  