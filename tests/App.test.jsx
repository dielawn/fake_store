import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';
import UserContext from '../src/UserContext';

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(   
      <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,    
    renderOptions
  )
}

// Remove async from describe callback
describe('App component', () => {
  it('displays error header after async operation', async () => {
    const providerProps = { loading: true, inventory: [], error: null }
    customRender(<App />, {providerProps});
    
    // Wait for the header to be present in the document
    await waitFor(() => {
      const headerTxt = screen.getByRole('heading', { name: /Unexpected Application Error!/i });
      expect(headerTxt).toBeInTheDocument()
    })
  })
})
