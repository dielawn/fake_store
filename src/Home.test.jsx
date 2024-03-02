import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import UserContext from './UserContext';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { describe, it, expect } from 'vitest';

const axiosMock = new MockAdapter(axios)
const mockUserContext = {
  userName: "Test User",
  inventory: [],
  setInventory: jest.fn(),
  setLoading: jest.fn(),
  loading: false,
  error: null,
  setError: jest.fn(),
}


describe('Home component tests', () => {
  it('shows loading state', async () => {
    render(
      <UserContext.Provider value={{ ...mockUserContext, loading: true }}>
        <Home />
      </UserContext.Provider>
    ) 
    
    expect(screen.getByText(/loading.../i)).toBeInTheDocument()
  })

  it('fetches products, displays product images', async () => {
    axiosMock.onGet('https://fakestoreapi.com/products/1').reply(200, {
      id: 1,
      title: 'Test Product',
      image: 'test-image-url',
    })
    render(
      <UserContext.Provider value={mockUserContext} >
        <Home />
      </UserContext.Provider>
    )

    await waitFor(() => expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image-url'))
  })

  it('displays error on fetch failure', async () => {
    axiosMock.onGet('https://fakestoreapi.com/products/1').networkError()
    render(
      <UserContext.Provider value={mockUserContext}>
        <Home />
      </UserContext.Provider>
    )

    await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument())
  })

})