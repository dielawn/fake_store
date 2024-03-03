import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import User from './User';
import { describe } from 'vitest';



describe('User class', () => {
    it('displays welcome message with user name', () => {
        const userName = 'Dude'
        const cart = []
        render(<User userName={userName} cart={cart} removeFromAppCart={() => {}} />)
      
        expect(screen.getByText(`Welcome ${userName},`)).toBeInTheDocument()
      })

      it('toggles cart visibility on button click', () => {
        const { getByText, queryByText } = render(<User userName="Dude" cart={[{id: 1, title: "Item 1", price: 10, qty: 1, image: "image-url"}]} removeFromAppCart={() => {}} />)
        
        const cartButton = getByText('shopping_cart');
        fireEvent.click(cartButton)//open cart
        
        //check if total text appears indicating cart is visible
        expect(getByText(/Total \$10.00/)).toBeInTheDocument()
      
        fireEvent.click(cartButton); //close cart
        expect(queryByText(/Total \$10.00/)).not.toBeInTheDocument() //cart should be hidden now
      })

    //   it('removes item from cart on remove button click', () => {
    //     const removeFromAppCartMock = jest.fn()
    //     const { getByText, getAllByText } = render(<User userName="Dude" cart={[{id: 1, title: "Item 1", price: 10, qty: 1, image: "image-url"}]} removeFromAppCart={removeFromAppCartMock} />)
        
    //     const cartButton = getByText('shopping_cart')
    //     fireEvent.click(cartButton)//open cart
      
    //     const removeButton = getAllByText('❌')[0];
    //     fireEvent.click(removeButton)      

    //     expect(removeFromAppCartMock).toHaveBeenCalledWith({id: 1, title: "Item 1", price: 10, qty: 1, image: "image-url"})
    //   })
       
      
})