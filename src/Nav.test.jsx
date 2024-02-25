import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import {Nav} from './Nav'

describe('Nav', () => {
    it('renders a paragraph', () => {
      render(<Nav />);
     const para = screen.getByText(/[\S]/)
     expect(para).toBeTruthy()
    });
  });