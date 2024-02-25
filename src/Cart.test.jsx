import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import {Cart} from './Cart'

describe('Cart', () => {
    it('adds an item to the cart when "Add to Cart" is clicked', async () => {
      render(<Cart />);

      //simulate add item
      fireEvent.click(screen.getByText('Select Item'))

      //add uitem to the cart
      fireEvent.click(screen.getByText('Add to Cart'))

      //check if item was added to cart
      const cartItem = await screen.findByText(/Test Item - 1/)
      expect(cartItem).toBeInTheDocument()
        
    });
  });