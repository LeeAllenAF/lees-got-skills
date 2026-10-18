import { describe, expect, it } from 'vitest';
import retrievalCases from '../../../../skills/teach-agentic-development/references/evals/retrieval-cases.json';
import compiledIndex from './generated/search-index.json';
import { buildInferenceMessages, maximumPromptBytes } from './inference';
import { parseLabSearchIndex, retrieveDocument, retrieveEvidence } from './retrieval';

const index = parseLabSearchIndex(compiledIndex);

describe('Corpus Lab retrieval adapter', () => {
  it.each(retrievalCases)('preserves teaching index results for $id', (fixture) => {
    const result = retrieveEvidence(fixture.query, index);
    const documentIds = result.passages.map(({ documentId }) => documentId);

    expect(result.status).toBe(fixture.status);
    expect(result.inferenceCalls).toBe(0);
    if ('anyOf' in fixture) {
      expect(fixture.anyOf.some((id) => documentIds.includes(id))).toBe(true);
    }
  });

  it('is deterministic and bounds the evidence packet', () => {
    const first = retrieveEvidence('context memory retrieval', index);
    const second = retrieveEvidence('context memory retrieval', index);

    expect(first).toEqual(second);
    expect(first.passages.length).toBeLessThanOrEqual(4);
    expect(new TextEncoder().encode(`${JSON.stringify(first)}\n`).byteLength).toBeLessThanOrEqual(12_000);
  });

  it('inspects exact document IDs without inference', () => {
    const result = retrieveDocument('aep-agent-004', index);

    expect(result.status).toBe('found');
    expect(result.inferenceCalls).toBe(0);
    expect(result.passages.every(({ documentId }) => documentId === 'AEP-AGENT-004')).toBe(true);
    expect(() => retrieveDocument('../../etc/passwd', index)).toThrow(/invalid/i);
    expect(() => retrieveDocument('AEP-NOT-REAL', index)).toThrow(/unknown/i);
  });

  it.each(retrievalCases.filter(({ status }) => status === 'found'))(
    'keeps the $id model prompt inside the hard byte boundary',
    (fixture) => {
      const retrieval = retrieveEvidence(fixture.query, index);
      const prompt = buildInferenceMessages(fixture.query, retrieval);

      expect(prompt.byteLength).toBeLessThanOrEqual(maximumPromptBytes);
    },
  );
});
