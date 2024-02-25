import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import {Home} from './Home'

describe('Home', () => {
    it('renders a paragraph', () => {
      render(<Home />);
     const para = screen.getByText(/[\S]/)
     expect(para).toBeTruthy()
    });
  });