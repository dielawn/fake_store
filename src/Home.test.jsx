import { render, screen, waitFor, } from '@testing-library/react';
import Home from './Home';
import UserContext from './UserContext';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <MemoryRouter>
      <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>
    </MemoryRouter>,
    renderOptions
  )
}



describe('Home component tests', () => {
  it('displays loading state', () => {
    const providerProps = { loading: true, inventory: [], error: null }
    customRender(<Home />, { providerProps })
    expect(screen.getByText(/loading.../i)).toBeInTheDocument()
  })
  
  it('displays error message', () => {
    const providerProps = { loading: false, inventory: [], error: 'Test Error' }
    customRender(<Home />, { providerProps })
    expect(screen.getByText(/error: test error/i)).toBeInTheDocument()
  })

  it('displays header', () => {    
    const providerProps = {  loading: false, inventory: [], error: null }
    customRender(<Home />, { providerProps })//render the component first
    const headerTxt = screen.getByRole('heading', { name: /fakest of stores/i })   
    const welcomeTxt = screen.getByRole('heading', { name: /welcome dude,/i})

    expect(headerTxt).toBeInTheDocument()
    expect(welcomeTxt).toBeInTheDocument()
  })

  



  

})