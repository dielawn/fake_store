import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import App from './App';
import React from 'react';

describe('App component tests', () => {
  it('adds an item to cart', async () => {
    render(<App />)
    const addItemButton = await screen.findByRole('button', {name: /add item/i})

    fireEvent.click(addItemButton)

    const cartItem = await screen.findByText(/item name/i)
    expect(cartItem).toBeInTheDocument()
   
  })

  it('checks loading state', async () => {
    render(<App />)
    const loadTxt = await screen.findByText(/loading.../i)
    expect(loadTxt).toBeInTheDocument()
  })

})