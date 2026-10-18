import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from './App';

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('App', () => {
  it('navigates to the truthful empty skill catalog', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('link', { name: /explore skills/i }));

    expect(screen.getByRole('heading', { name: /skill catalog/i })).toBeInTheDocument();
    expect(screen.getByText(/no skills are currently available/i)).toBeInTheDocument();
    await waitFor(() => expect(document.title).toBe("Skills // Lee's Got Skills"));
  });

  it('closes the navigation with Escape and restores focus', async () => {
    const user = userEvent.setup();
    renderApp();
    const menuButton = screen.getByRole('button', { name: /open navigation/i });

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{Escape}');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveFocus();
  });

  it('renders published articles without exposing drafts', () => {
    renderApp('/blog');

    expect(screen.getByRole('heading', { name: /welcome to the workshop/i })).toBeInTheDocument();
    expect(screen.queryByText(/repository bootstrap field notes/i)).not.toBeInTheDocument();
  });
});
