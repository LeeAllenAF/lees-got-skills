import { describe, expect, it } from 'vitest';
import { parseLabCommand } from './commands';

describe('Corpus Lab commands', () => {
  it('keeps ask as the sole question command', () => {
    expect(parseLabCommand('ask What is context?')).toEqual({
      kind: 'ask',
      question: 'What is context?',
    });
    expect(parseLabCommand('compare two models')).toEqual({
      kind: 'invalid',
      message: 'Unknown command: compare. Try help.',
    });
  });

  it('parses deterministic commands without inference', () => {
    expect(parseLabCommand('/help')).toEqual({ kind: 'help' });
    expect(parseLabCommand('sources')).toEqual({ kind: 'sources' });
    expect(parseLabCommand('inspect aep-agent-004')).toEqual({
      kind: 'inspect',
      documentId: 'AEP-AGENT-004',
    });
  });
});
