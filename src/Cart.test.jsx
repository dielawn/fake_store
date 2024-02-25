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
      const cartItem = await screen.findByText(/Test Item/)
      expect(cartItem).toBeInTheDocument()


        
    });
    it('adjusts qty of item in cart', async () => {
        render(<Cart />)

       
        fireEvent.click(screen.getByText('Select Item'))
        fireEvent.click(screen.getByText('Add to Cart'))
        //adjust input value
        const qtyInput = screen.getByDisplayValue('1')
        fireEvent.change(qtyInput, {target: {value: '2'}})
        expect(qtyInput.value).toBe('2')
        fireEvent.change(qtyInput, {target: {value: '1'}})
        expect(qtyInput.value).toBe('1')
    })
  });