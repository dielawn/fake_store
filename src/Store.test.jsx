import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import {Store} from './Store'
import axios from 'axios';

// Setup axios mock at the top
vi.mock('axios', () => ({
    __esModule: true, // This line is crucial for making it recognized as a module with a default export
    default: {
      get: vi.fn(),
    },
  }));
  
  describe('Store Component', () => {
    beforeEach(() => {
      vi.resetAllMocks()
    })
  
    it('displays loading state initially', async () => {        
        
        await waitFor(() => {
            axios.get.mockResolvedValueOnce({ data: [] })
            render(<Store />)
            expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
          })
        
      })  
  
    it('displays error message on fetch failure', async () => {
      // Adjust the mock for this specific test to simulate a rejection
      axios.get.mockRejectedValue(new Error('Failed to fetch'))  
      render(<Store />);
      const errorElement = await screen.findByText(/Error:/i)
      expect(errorElement).toBeInTheDocument()
    })

    it('displays items after successful fetch', async () => {
        // Mock axios.get to resolve with an array of items
        axios.get.mockImplementation(url => 
          Promise.resolve({
            data: {
              id: url.slice(-1), // Example to dynamically create item IDs based on URL
              title: "Test Item " + url.slice(-1),
              price: 10.00 + parseInt(url.slice(-1), 10),
              description: "description text...",
              category: "item category",
              image: "image url",
              rating: { rate: 3.9, count: 120 }
            }
          })
        )
      
        render(<Store />)
      
        // Wait for the items to be fetched and rendered
        await waitFor(() => {
          //check for the presence of multiple items based on the mocked fetch
          //adjust this based on the actual number of items you expect to fetch and render
          [...Array(20).keys()].forEach(async (i) => {
            const itemTitle = await screen.findByText(new RegExp("Test Item " + (i + 1), "i"))
            expect(itemTitle).toBeInTheDocument()
            
          })
        })
      })
      
  })
  