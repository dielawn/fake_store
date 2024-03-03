import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Remove async from describe callback
describe('App component', () => {
  it('renders the content for /home route', async () => {
    render(<App />);
    
    const heading = await screen.findByText(/fakest of stores/i);
    expect(heading).toBeInTheDocument();
  });
});
