import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import {Store} from './Store'

describe('Store', () => {
    it('renders a paragraph', () => {
      render(<Store />);
     const para = screen.getByText(/[\S]/)
     expect(para).toBeTruthy()
    });
  });