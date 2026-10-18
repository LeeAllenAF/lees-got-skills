import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('App', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('navigates to the released skill catalog', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('link', { name: /explore skills/i }));

    expect(screen.getByRole('heading', { name: /skill catalog/i })).toBeInTheDocument();
    const accessibilityCard = screen.getByRole('heading', { name: 'accessibility-check' }).closest('article');
    expect(accessibilityCard).not.toBeNull();
    const scopedCard = within(accessibilityCard as HTMLElement);
    expect(scopedCard.getByText('v0.1.0')).toBeInTheDocument();
    expect(scopedCard.getByText(/official release available/i)).toBeInTheDocument();
    expect(scopedCard.getByRole('link', { name: /documentation/i })).toHaveAttribute(
      'href',
      'https://github.com/LeeAllenAF/lees-got-skills/tree/main/skills/accessibility-check',
    );
    expect(scopedCard.getByRole('link', { name: /install/i })).toHaveAttribute(
      'href',
      'https://github.com/LeeAllenAF/lees-got-skills/releases/download/accessibility-check%400.1.0/accessibility-check-0.1.0.tar.gz',
    );
    expect(screen.getByRole('heading', { name: 'teach-agentic-development' })).toBeInTheDocument();
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

  it('shows context-engineer as development without release or install links', () => {
    renderApp('/skills');
    const card = screen.getByRole('heading', { name: 'context-engineer' }).closest('article');
    const scopedCard = within(card as HTMLElement);
    expect(scopedCard.getByText('development')).toBeInTheDocument();
    expect(scopedCard.getByText('No official release yet')).toBeInTheDocument();
    expect(scopedCard.getByText('Install pending')).toBeInTheDocument();
    expect(scopedCard.queryByRole('link', { name: /install|release notes/i })).not.toBeInTheDocument();
    expect(scopedCard.getByRole('link', { name: /documentation/i })).toHaveAttribute(
      'href', 'https://github.com/LeeAllenAF/lees-got-skills/tree/main/skills/context-engineer',
    );
  });

  it('orders primary navigation around the main site workflows', () => {
    renderApp();
    const navigation = screen.getByRole('navigation', { name: /primary navigation/i });
    const linkNames = within(navigation).getAllByRole('link').map((link) => link.textContent?.trim());

    expect(linkNames).toEqual(['Skills', 'Lab', 'Blog', 'Wiki', 'About', 'GitHub ↗']);
  });

  it('renders published articles without exposing drafts', () => {
    renderApp('/blog');

    expect(screen.getByRole('heading', { name: /corpus lab: small model, sharp edges/i })).toBeInTheDocument();
    expect(screen.getByText(/these are the next things i’ll try/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /welcome to the workshop/i })).toBeInTheDocument();
    expect(screen.queryByText(/repository bootstrap field notes/i)).not.toBeInTheDocument();
  });

  it('runs deterministic Corpus Lab commands without calling inference', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({
        inferenceAvailable: true,
        budgetState: 'available',
        quotaState: 'unknown',
        model: '@cf/meta/llama-3.2-3b-instruct',
        budget: {
          state: 'available',
          quotaState: 'unknown',
          dailyAdmissions: 0,
          dailyAdmissionLimit: 80,
          remainingAdmissions: 80,
          reservedNeuronEstimate: 0,
          dailyNeuronEstimateLimit: 8_800,
          resetsAt: '2026-10-19T00:00:00.000Z',
        },
      }),
    });
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    renderApp('/lab');

    const command = screen.getByLabelText(/command console/i);
    await user.clear(command);
    await user.type(command, 'help');
    await user.click(screen.getByRole('button', { name: /run/i }));

    expect(screen.getByText(/commands: ask <question>/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalledWith('/api/lab/ask', expect.anything());
    expect(await screen.findByText(/current state: available/i)).toBeInTheDocument();
  });

  it('loads and filters the generated wiki index', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        schemaVersion: 1,
        contentFingerprint: 'fixture',
        documentCount: 2,
        topics: [
          { topic: 'agents', count: 1 },
          { topic: 'coordination', count: 1 },
        ],
        documents: [
          {
            id: 'AEP-AGENT-001',
            title: 'Agent Architecture Fundamentals',
            summary: 'Deterministic control and orchestration.',
            collection: 'handbook',
            topic: 'coordination',
            type: 'guidance',
            status: 'recommended',
            tags: ['orchestration'],
            domains: ['agent-architecture'],
            scope: ['enterprise-global'],
            sourceReviewDate: '2026-10-01',
            sourcePath: 'corpus/handbook/agents/example.md',
            relatedDocumentIds: [],
          },
          {
            id: 'AEP-AGENT-004',
            title: 'Delegation, Subagents, and Parallelism',
            summary: 'Boundaries for multi-agent work.',
            collection: 'handbook',
            topic: 'agents',
            type: 'guidance',
            status: 'recommended',
            tags: ['delegation'],
            domains: ['agent-architecture'],
            scope: ['enterprise-global'],
            sourceReviewDate: '2026-10-01',
            sourcePath: 'corpus/handbook/agents/example-two.md',
            relatedDocumentIds: [],
          },
        ],
      }),
    }));
    const user = userEvent.setup();
    renderApp('/wiki');

    expect(await screen.findByText('Handbook')).toBeInTheDocument();
    await user.click(screen.getByText('Handbook'));
    await user.click(screen.getByText('Coordination'));
    expect(screen.getByRole('link', { name: /agent architecture fundamentals/i })).toBeInTheDocument();

    await user.type(screen.getByRole('searchbox', { name: /filter documents/i }), 'delegation');

    expect(screen.queryByRole('link', { name: /agent architecture fundamentals/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /delegation, subagents, and parallelism/i })).toBeInTheDocument();
  });
});
