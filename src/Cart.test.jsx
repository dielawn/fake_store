import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import {Cart} from './Cart'

describe('Cart', () => {
    it('renders a paragraph', () => {
      render(<Cart />);
     const para = screen.getByText(/[\S]/)
     expect(para).toBeTruthy()
    });
  });