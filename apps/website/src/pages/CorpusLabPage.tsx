import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  askCorpusLab,
  getCorpusLabStatus,
  inspectCorpusDocument,
  type LabAskResponse,
  type LabStatusResponse,
} from '../lab/api';
import { parseLabCommand } from '../lab/commands';
import './CorpusLabPage.css';

type Pane = 'answer' | 'evidence' | 'telemetry';

const paneLabels: readonly [Pane, string][] = [
  ['answer', '0: Answer'],
  ['evidence', '1: Evidence'],
  ['telemetry', '2: Telemetry'],
];
const initialMessage = 'Checking inference availability. Type help to see the deterministic commands.';

function EmptyEvidence() {
  return <p className="lab-muted">Run an <code>ask</code> command to inspect selected passages.</p>;
}

export function CorpusLabPage() {
  const [command, setCommand] = useState('ask How do skills differ from tools?');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [response, setResponse] = useState<LabAskResponse>();
  const [labStatus, setLabStatus] = useState<LabStatusResponse>();
  const [message, setMessage] = useState(initialMessage);
  const [running, setRunning] = useState(false);
  const [activePane, setActivePane] = useState<Pane>('answer');
  const requestRef = useRef<AbortController | undefined>(undefined);

  useEffect(() => {
    const controller = new AbortController();
    void getCorpusLabStatus(controller.signal)
      .then((status) => {
        setLabStatus(status);
        setMessage((current) => current === initialMessage
          ? status.inferenceAvailable
            ? 'Admission is open. The first answer will verify current model access and provider quota.'
            : 'Inference is paused. Deterministic corpus commands remain available.'
          : current);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setMessage('Admission status is unavailable. Inference will fail closed until it recovers.');
      });
    return () => controller.abort();
  }, []);

  function showMessage(nextMessage: string, pane: Pane = 'answer') {
    setMessage(nextMessage);
    setActivePane(pane);
  }

  async function execute(rawCommand: string) {
    const parsed = parseLabCommand(rawCommand);
    if (parsed.kind === 'invalid') {
      showMessage(parsed.message);
      return;
    }
    if (parsed.kind === 'clear') {
      requestRef.current?.abort();
      setResponse(undefined);
      showMessage('Session output cleared. The corpus remains read-only.');
      return;
    }
    if (parsed.kind === 'help') {
      showMessage('Commands: ask <question>, sources, inspect <id>, context, stats, clear. Only ask may use inference; every other command is local and deterministic.');
      return;
    }
    if (parsed.kind === 'sources') {
      showMessage(
        response?.retrieval.passages.length
          ? `${response.retrieval.passages.length} selected source passages. Use inspect <id> or open a source link.`
          : 'No sources are selected yet. Run ask first.',
        'evidence',
      );
      return;
    }
    if (parsed.kind === 'context') {
      showMessage(
        response?.retrieval.passages.length
          ? `The bounded context contains ${response.telemetry.contextCharacters.toLocaleString()} characters across ${response.telemetry.passageCount} passages.`
          : 'No context packet exists yet. Run ask first.',
        'evidence',
      );
      return;
    }
    if (parsed.kind === 'stats') {
      showMessage(
        response
          ? `Retrieval ${response.retrieval.status}; ${response.telemetry.inferenceCalls} inference calls; budget ${response.telemetry.budgetState}.`
          : 'No request telemetry exists yet.',
        'telemetry',
      );
      return;
    }
    if (parsed.kind === 'inspect') {
      requestRef.current?.abort();
      const controller = new AbortController();
      requestRef.current = controller;
      setRunning(true);
      try {
        const result = await inspectCorpusDocument(parsed.documentId, controller.signal);
        setResponse(result);
        showMessage(result.message ?? `Loaded ${parsed.documentId} without inference.`, 'evidence');
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        showMessage(error instanceof Error ? error.message : 'The document could not be loaded.');
      } finally {
        if (requestRef.current === controller) setRunning(false);
      }
      return;
    }
    if (parsed.kind !== 'ask') return;

    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setRunning(true);
    setActivePane('answer');
    showMessage('Retrieving bounded evidence…');
    try {
      const result = await askCorpusLab(parsed.question, controller.signal);
      setResponse(result);
      setLabStatus({
        inferenceAvailable: result.telemetry.budgetState === 'available',
        budgetState: result.telemetry.budgetState,
        quotaState: result.telemetry.quotaState,
        model: result.telemetry.model ?? 'not configured',
        budget: result.telemetry.budget,
      });
      if (result.status === 'ambiguous' || result.status === 'insufficient') {
        showMessage(result.message ?? result.retrieval.reason ?? 'The corpus could not support that request.');
      } else if (result.status !== 'found') {
        showMessage(result.message ?? 'Inference is not available. The selected evidence is still inspectable.');
      } else {
        showMessage('Answer complete.');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      showMessage(error instanceof Error ? error.message : 'The lab request failed.');
    } finally {
      if (requestRef.current === controller) setRunning(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (running) return;
    const submitted = command.trim();
    if (submitted) {
      setHistory((current) => [...current.filter((entry) => entry !== submitted), submitted]);
      setHistoryIndex(-1);
    }
    void execute(command);
  }

  function navigateHistory(event: KeyboardEvent<HTMLInputElement>) {
    if (!['ArrowUp', 'ArrowDown'].includes(event.key) || history.length === 0) return;
    event.preventDefault();
    const nextIndex = event.key === 'ArrowUp'
      ? Math.min(history.length - 1, historyIndex + 1)
      : Math.max(-1, historyIndex - 1);
    setHistoryIndex(nextIndex);
    setCommand(nextIndex === -1 ? '' : history[history.length - 1 - nextIndex] ?? '');
  }

  const passages = response?.retrieval.passages ?? [];
  const budget = response?.telemetry.budget ?? labStatus?.budget;
  const budgetState = response?.telemetry.budget
    ? response.telemetry.budgetState
    : labStatus?.budgetState ?? 'unavailable';
  const quotaState = response?.telemetry.budget
    ? response.telemetry.quotaState
    : labStatus?.quotaState ?? 'unknown';
  const inferenceReady = labStatus?.inferenceAvailable && budgetState === 'available';
  const operatingLabel = inferenceReady ? '● ADMISSION OPEN' : '● INFERENCE PAUSED';
  const budgetSummary = budget
    ? `${budget.remainingAdmissions} of ${budget.dailyAdmissionLimit} app admissions remain · resets ${new Date(budget.resetsAt).toLocaleString()}`
    : 'Admission state unavailable · inference fails closed';

  return (
    <>
      <section className="lab-intro" aria-labelledby="corpus-lab-title">
        <div>
          <p className="eyebrow">// KNOWLEDGE + DETERMINISTIC RETRIEVAL + SMALL MODEL</p>
          <h1 id="corpus-lab-title">CORPUS LAB_</h1>
          <p>Ask big questions. Inspect exactly which documents were retrieved, how much context was selected, and what evidence supports the answer.</p>
        </div>
        <details className="lab-budget">
          <summary>● FREE-TIER MODE · $0 ADDITIONAL COST TARGET</summary>
          <p>Designed to run within Cloudflare’s free allowances while capacity lasts. Inference has metered resource usage; when the free quota or app budget is unavailable, new AI answers pause.</p>
          <strong>Current state: {budgetState} · provider quota {quotaState.replace('_', ' ')} · {budgetSummary}</strong>
        </details>
      </section>

      <section className="lab-workspace" aria-label="Corpus Lab terminal">
        <header className="lab-window-bar">
          <span aria-hidden="true" className="lab-window-dots">● ● ●</span>
          <span>session corpus-lab</span>
          <span>read-only knowledge / no external tools</span>
        </header>

        <div className="lab-panes">
          <section className={`lab-pane lab-answer ${activePane === 'answer' ? 'is-active' : ''}`} aria-labelledby="lab-answer-title">
            <div className="lab-pane-heading">
              <h2 id="lab-answer-title">0: TEACHER / OUTPUT</h2>
              <span>CORPUS-GROUNDED</span>
            </div>
            {response && <p className="lab-prompt"><strong>visitor@corpus:~$</strong> ask “{response.question}”</p>}
            <div className="lab-output" aria-live="polite" aria-atomic="true" aria-busy={running}>
              {running ? <p>Retrieving bounded evidence…</p> : (
                <>
                  <h3>{response?.answer ? 'Answer' : 'Lab status'}</h3>
                  {response?.answer
                    ? response.answer.split('\n').filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                    : <p>{message}</p>}
                  {response?.retrieval.clarificationOptions && (
                    <ul>{response.retrieval.clarificationOptions.map((option) => <li key={option}>{option}</li>)}</ul>
                  )}
                </>
              )}
            </div>
          </section>

          <div className="lab-side-panes">
            <section className={`lab-pane ${activePane === 'evidence' ? 'is-active' : ''}`} aria-labelledby="lab-evidence-title">
              <div className="lab-pane-heading">
                <h2 id="lab-evidence-title">1: RETRIEVAL / EVIDENCE</h2>
                <span>DETERMINISTIC</span>
              </div>
              {passages.length === 0 ? <EmptyEvidence /> : (
                <ol className="lab-sources">
                  {passages.map((passage) => (
                    <li key={`${passage.documentId}:${passage.lineStart}`}>
                      <Link to={`/wiki/${passage.documentId.toLowerCase()}`}>{passage.documentId} · {passage.title}</Link>
                      <span>{passage.heading} · lines {passage.lineStart}–{passage.lineEnd}</span>
                      <details>
                        <summary>Inspect passage</summary>
                        <p>{passage.text}</p>
                      </details>
                    </li>
                  ))}
                </ol>
              )}
            </section>

            <section className={`lab-pane ${activePane === 'telemetry' ? 'is-active' : ''}`} aria-labelledby="lab-telemetry-title">
              <div className="lab-pane-heading">
                <h2 id="lab-telemetry-title">2: INFERENCE / TELEMETRY</h2>
                <span>ONE SLM MAXIMUM</span>
              </div>
              <dl className="lab-telemetry">
                <div><dt>retrieval</dt><dd>{response?.retrieval.status ?? 'idle'}</dd></div>
                <div><dt>passages</dt><dd>{response?.telemetry.passageCount ?? 0}</dd></div>
                <div><dt>context</dt><dd>{response ? `${response.telemetry.contextCharacters.toLocaleString()} characters` : 'none'}</dd></div>
                <div><dt>inference</dt><dd>{response?.telemetry.inferenceCalls ?? 0} calls</dd></div>
                <div><dt>model</dt><dd>{response?.telemetry.model ?? labStatus?.model ?? 'checking'}</dd></div>
                <div><dt>latency</dt><dd>{response?.telemetry.inferenceMilliseconds != null ? `${response.telemetry.inferenceMilliseconds} ms` : 'none'}</dd></div>
                <div><dt>tokens</dt><dd>{response?.telemetry.usage?.totalTokens ?? 'not reported'}</dd></div>
                <div><dt>quota</dt><dd>{quotaState.replace('_', ' ')}</dd></div>
                <div><dt>budget</dt><dd>{budgetState}{budget ? ` · ${budget.remainingAdmissions} admissions remain` : ''}</dd></div>
              </dl>
            </section>
          </div>
        </div>

        <div className="lab-tabs" role="group" aria-label="Choose a Corpus Lab pane">
          {paneLabels.map(([pane, label]) => (
            <button
              key={pane}
              type="button"
              aria-pressed={activePane === pane}
              onClick={() => setActivePane(pane)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="lab-status-line" aria-label="Lab operating status">
          <span>{operatingLabel}</span>
          <span>0:answer{activePane === 'answer' ? '*' : ''}</span>
          <span>1:evidence{activePane === 'evidence' ? '*' : ''}</span>
          <span>2:telemetry{activePane === 'telemetry' ? '*' : ''}</span>
          <span>UTF-8 · READ ONLY</span>
        </div>

        <form className="lab-console" onSubmit={submit}>
          <label htmlFor="lab-command">COMMAND CONSOLE — try: ask, sources, inspect, context, stats, help</label>
          <div className="lab-entry">
            <span aria-hidden="true">$</span>
            <input
              id="lab-command"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              onKeyDown={navigateHistory}
              autoComplete="off"
              spellCheck="false"
              maxLength={520}
            />
            <button type="submit" disabled={running}>{running ? 'RUNNING' : '↵ RUN'}</button>
          </div>
          <p>↑↓ command history · only <code>ask</code> may consume inference</p>
        </form>
      </section>
      <p className="lab-footnote">EXPERIMENT 001 / bounded corpus retrieval / one-model ceiling / no external tools</p>
    </>
  );
}
