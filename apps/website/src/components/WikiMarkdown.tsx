import { createElement, Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface WikiMarkdownProps {
  readonly markdown: string;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[`*_]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function renderInline(value: string, keyPrefix: string): ReactNode[] {
  const tokenPattern = /(\[[^\]]+]\([^)]+\)|https?:\/\/[^\s)]+|`[^`]+`|\*\*[^*]+\*\*)/g;
  const output: ReactNode[] = [];
  let cursor = 0;

  for (const match of value.matchAll(tokenPattern)) {
    const index = match.index ?? 0;
    if (index > cursor) output.push(value.slice(cursor, index));

    const token = match[0];
    const key = `${keyPrefix}-${index}`;
    if (token.startsWith('http')) {
      output.push(<a key={key} href={token} rel="noreferrer">{token}</a>);
    } else if (token.startsWith('`')) {
      output.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith('**')) {
      output.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else {
      const link = token.match(/^\[([^\]]+)]\(([^)]+)\)$/);
      if (link) {
        const label = link[1] ?? '';
        const href = link[2] ?? '';
        output.push(href.startsWith('/wiki/')
          ? <Link key={key} to={href}>{label}</Link>
          : <a key={key} href={href} rel="noreferrer">{label}</a>);
      }
    }
    cursor = index + token.length;
  }

  if (cursor < value.length) output.push(value.slice(cursor));
  return output;
}

function isBlockStart(line: string, nextLine = '') {
  return /^#{1,6}\s/.test(line)
    || /^```/.test(line)
    || /^>\s?/.test(line)
    || /^[-*]\s+/.test(line)
    || /^\d+\.\s+/.test(line)
    || /^---+$/.test(line)
    || (/^\|/.test(line) && /^\|?\s*:?-+/.test(nextLine));
}

export function WikiMarkdown({ markdown }: WikiMarkdownProps) {
  const lines = markdown.split('\n');
  const blocks: ReactNode[] = [];
  let lineIndex = 0;
  let skippedTitle = false;

  while (lineIndex < lines.length) {
    const line = lines[lineIndex] ?? '';
    if (!line.trim()) {
      lineIndex += 1;
      continue;
    }

    const fence = line.match(/^```(.*)$/);
    if (fence) {
      const code: string[] = [];
      lineIndex += 1;
      while (lineIndex < lines.length && !(lines[lineIndex] ?? '').startsWith('```')) {
        code.push(lines[lineIndex] ?? '');
        lineIndex += 1;
      }
      lineIndex += 1;
      blocks.push(
        <pre key={`code-${lineIndex}`}><code data-language={(fence[1] ?? '').trim() || undefined}>{code.join('\n')}</code></pre>,
      );
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = (heading[1] ?? '').length;
      const text = heading[2] ?? '';
      lineIndex += 1;
      if (level === 1 && !skippedTitle) {
        skippedTitle = true;
        continue;
      }
      const headingName = `h${Math.min(level + 1, 6)}`;
      blocks.push(createElement(headingName, { id: slugify(text), key: `heading-${lineIndex}` }, renderInline(text, `heading-${lineIndex}`)));
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (lineIndex < lines.length && /^>\s?/.test(lines[lineIndex] ?? '')) {
        quote.push((lines[lineIndex] ?? '').replace(/^>\s?/, ''));
        lineIndex += 1;
      }
      blocks.push(<blockquote key={`quote-${lineIndex}`}>{renderInline(quote.join(' '), `quote-${lineIndex}`)}</blockquote>);
      continue;
    }

    const unordered = /^[-*]\s+/.test(line);
    const ordered = /^\d+\.\s+/.test(line);
    if (unordered || ordered) {
      const items: string[] = [];
      const pattern = unordered ? /^[-*]\s+/ : /^\d+\.\s+/;
      while (lineIndex < lines.length && pattern.test(lines[lineIndex] ?? '')) {
        items.push((lines[lineIndex] ?? '').replace(pattern, ''));
        lineIndex += 1;
      }
      const List = ordered ? 'ol' : 'ul';
      blocks.push(
        <List key={`list-${lineIndex}`}>
          {items.map((item, itemIndex) => (
            <li key={`${lineIndex}-${itemIndex.toString()}`}>{renderInline(item, `item-${lineIndex}-${itemIndex.toString()}`)}</li>
          ))}
        </List>,
      );
      continue;
    }

    if (/^\|/.test(line) && /^\|?\s*:?-+/.test(lines[lineIndex + 1] ?? '')) {
      const rows: string[][] = [];
      while (lineIndex < lines.length && /^\|/.test(lines[lineIndex] ?? '')) {
        rows.push((lines[lineIndex] ?? '').slice(1, -1).split('|').map((cell) => cell.trim()));
        lineIndex += 1;
      }
      const [header = [], _separator, ...body] = rows;
      blocks.push(
        <div className="wiki-table-wrap" key={`table-${lineIndex}`} role="region" aria-label="Scrollable data table" tabIndex={0}>
          <table>
            <thead><tr>{header.map((cell, index) => <th key={index.toString()} scope="col">{renderInline(cell, `th-${lineIndex}-${index.toString()}`)}</th>)}</tr></thead>
            <tbody>{body.map((row, rowIndex) => <tr key={rowIndex.toString()}>{row.map((cell, cellIndex) => <td key={cellIndex.toString()}>{renderInline(cell, `td-${lineIndex}-${rowIndex.toString()}-${cellIndex.toString()}`)}</td>)}</tr>)}</tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (/^---+$/.test(line)) {
      blocks.push(<hr key={`rule-${lineIndex}`} />);
      lineIndex += 1;
      continue;
    }

    const paragraph: string[] = [];
    while (
      lineIndex < lines.length
      && (lines[lineIndex] ?? '').trim()
      && !isBlockStart(lines[lineIndex] ?? '', lines[lineIndex + 1] ?? '')
    ) {
      paragraph.push((lines[lineIndex] ?? '').trim());
      lineIndex += 1;
    }
    blocks.push(
      <p key={`paragraph-${lineIndex}`}>{renderInline(paragraph.join(' '), `paragraph-${lineIndex}`)}</p>,
    );
  }

  return <>{blocks.map((block, index) => <Fragment key={index.toString()}>{block}</Fragment>)}</>;
}
