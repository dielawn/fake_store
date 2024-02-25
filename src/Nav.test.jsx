import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; 

import {Nav} from './Nav'

describe('Nav', () => {
    it('renders expected links and a paragraph', () => {
      render(<MemoryRouter><Nav /></MemoryRouter>)

      const todoParagraph = screen.getByText(/links to home, shop, cart icon w\/qty,/i);
      expect(todoParagraph).toBeInTheDocument()

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Store')).toBeInTheDocument();
      expect(screen.getByText('Cart')).toBeInTheDocument();  
    

    });
  });