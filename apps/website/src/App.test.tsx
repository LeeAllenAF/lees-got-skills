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
  it('navigates to the released skill catalog', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('link', { name: /explore skills/i }));

    expect(screen.getByRole('heading', { name: /skill catalog/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'accessibility-check' })).toBeInTheDocument();
    expect(screen.getByText('v0.1.0')).toBeInTheDocument();
    expect(screen.getByText(/official release available/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /documentation/i })).toHaveAttribute(
      'href',
      'https://github.com/LeeAllenAF/lees-got-skills/tree/main/skills/accessibility-check',
    );
    expect(screen.getByRole('link', { name: /install/i })).toHaveAttribute(
      'href',
      'https://github.com/LeeAllenAF/lees-got-skills/releases/download/accessibility-check%400.1.0/accessibility-check-0.1.0.tar.gz',
    );
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
