export type LabCommand =
  | { readonly kind: 'ask'; readonly question: string }
  | { readonly kind: 'clear' | 'context' | 'help' | 'sources' | 'stats' }
  | { readonly kind: 'inspect'; readonly documentId: string }
  | { readonly kind: 'invalid'; readonly message: string };

export function parseLabCommand(input: string): LabCommand {
  const normalized = input.trim().replace(/^\//, '');
  if (!normalized) return { kind: 'invalid', message: 'Enter a command. Try help.' };
  const [name = '', ...argumentParts] = normalized.split(/\s+/);
  const argument = argumentParts.join(' ').trim();

  if (name === 'ask') {
    return argument
      ? { kind: 'ask', question: argument }
      : { kind: 'invalid', message: 'ask needs a question.' };
  }
  if (name === 'inspect') {
    if (!/^[a-z0-9-]+$/i.test(argument)) {
      return { kind: 'invalid', message: 'inspect needs one valid document ID.' };
    }
    return { kind: 'inspect', documentId: argument.toUpperCase() };
  }
  if (['clear', 'context', 'help', 'sources', 'stats'].includes(name) && !argument) {
    return { kind: name as 'clear' | 'context' | 'help' | 'sources' | 'stats' };
  }
  return { kind: 'invalid', message: `Unknown command: ${name}. Try help.` };
}
