import { DurableObject } from 'cloudflare:workers';
import {
  evaluateAdmission,
  labBudget,
  type BudgetState,
  type LabAdmissionDecision,
  type LabBudgetSnapshot,
  type QuotaState,
} from './admission-policy';

interface DailyRow extends Record<string, SqlStorageValue> {
  admissions: number;
  reserved_neurons: number;
  provider_state: QuotaState;
}

interface VisitorRow extends Record<string, SqlStorageValue> {
  window_start: number;
  window_count: number;
  daily_count: number;
}

function nextUtcDay(day: string) {
  const next = new Date(`${day}T00:00:00.000Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  return next.toISOString();
}

function snapshot(day: string, row?: DailyRow, state: BudgetState = 'available'): LabBudgetSnapshot {
  const dailyAdmissions = row?.admissions ?? 0;
  const reservedNeuronEstimate = row?.reserved_neurons ?? 0;
  const quotaState = row?.provider_state ?? 'unknown';
  const exhausted = dailyAdmissions >= labBudget.dailyAdmissionLimit
    || reservedNeuronEstimate + labBudget.neuronEstimatePerAdmission > labBudget.dailyNeuronEstimateLimit
    || quotaState === 'exhausted';

  return {
    state: exhausted ? 'exhausted' : state,
    quotaState,
    dailyAdmissions,
    dailyAdmissionLimit: labBudget.dailyAdmissionLimit,
    remainingAdmissions: Math.max(0, labBudget.dailyAdmissionLimit - dailyAdmissions),
    reservedNeuronEstimate,
    dailyNeuronEstimateLimit: labBudget.dailyNeuronEstimateLimit,
    resetsAt: nextUtcDay(day),
  };
}

function validateDay(day: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) throw new Error('Invalid UTC budget day.');
}

export class LabAdmissionController extends DurableObject<Env> {
  private rateLimitSecret = new ArrayBuffer(0);

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    ctx.blockConcurrencyWhile(async () => {
      this.ctx.storage.sql.exec(`
        CREATE TABLE IF NOT EXISTS daily_state (
          day TEXT PRIMARY KEY,
          admissions INTEGER NOT NULL DEFAULT 0,
          reserved_neurons INTEGER NOT NULL DEFAULT 0,
          provider_state TEXT NOT NULL DEFAULT 'unknown'
        );
        CREATE TABLE IF NOT EXISTS visitor_state (
          day TEXT NOT NULL,
          client_hash TEXT NOT NULL,
          window_start INTEGER NOT NULL,
          window_count INTEGER NOT NULL DEFAULT 0,
          daily_count INTEGER NOT NULL DEFAULT 0,
          PRIMARY KEY (day, client_hash)
        );
      `);

      const existingSecret = await this.ctx.storage.get<ArrayBuffer>('rate-limit-secret');
      if (existingSecret) {
        this.rateLimitSecret = existingSecret;
        return;
      }

      const secretBytes = crypto.getRandomValues(new Uint8Array(32));
      const secret = secretBytes.buffer.slice(0);
      await this.ctx.storage.put('rate-limit-secret', secret);
      this.rateLimitSecret = secret;
    });
  }

  private readDaily(day: string) {
    return this.ctx.storage.sql.exec<DailyRow>(
      'SELECT admissions, reserved_neurons, provider_state FROM daily_state WHERE day = ?',
      day,
    ).toArray()[0];
  }

  private async hashClient(day: string, clientMaterial: string) {
    if (!clientMaterial || clientMaterial.length > 512) throw new Error('Invalid client material.');
    const key = await crypto.subtle.importKey(
      'raw',
      this.rateLimitSecret,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );
    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(`${day}\0${clientMaterial}`),
    );
    return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  getStatus(day: string): LabBudgetSnapshot {
    validateDay(day);
    return snapshot(day, this.readDaily(day));
  }

  async admit(day: string, clientMaterial: string): Promise<LabAdmissionDecision> {
    validateDay(day);
    const clientHash = await this.hashClient(day, clientMaterial);
    const now = Date.now();
    const windowStart = Math.floor(now / labBudget.visitorWindowMilliseconds)
      * labBudget.visitorWindowMilliseconds;

    return this.ctx.storage.transactionSync(() => {
      this.ctx.storage.sql.exec('DELETE FROM visitor_state WHERE day <> ?', day);
      this.ctx.storage.sql.exec('DELETE FROM daily_state WHERE day <> ?', day);
      this.ctx.storage.sql.exec('INSERT OR IGNORE INTO daily_state (day) VALUES (?)', day);

      const daily = this.readDaily(day);
      if (!daily) throw new Error('Daily admission state could not be initialized.');
      const visitor = this.ctx.storage.sql.exec<VisitorRow>(
        'SELECT window_start, window_count, daily_count FROM visitor_state WHERE day = ? AND client_hash = ?',
        day,
        clientHash,
      ).toArray()[0];
      const rejection = evaluateAdmission(daily, visitor, windowStart);
      if (rejection) {
        const state = rejection.startsWith('visitor_') ? 'rate_limited' : 'available';
        return { ...snapshot(day, daily, state), admitted: false, reason: rejection };
      }

      this.ctx.storage.sql.exec(
        `INSERT INTO visitor_state (day, client_hash, window_start, window_count, daily_count)
         VALUES (?, ?, ?, 1, 1)
         ON CONFLICT(day, client_hash) DO UPDATE SET
           window_start = excluded.window_start,
           window_count = CASE
             WHEN visitor_state.window_start = excluded.window_start THEN visitor_state.window_count + 1
             ELSE 1
           END,
           daily_count = visitor_state.daily_count + 1`,
        day,
        clientHash,
        windowStart,
      );
      this.ctx.storage.sql.exec(
        `UPDATE daily_state
         SET admissions = admissions + 1,
             reserved_neurons = reserved_neurons + ?
         WHERE day = ?`,
        labBudget.neuronEstimatePerAdmission,
        day,
      );

      const updated = this.readDaily(day);
      if (!updated) throw new Error('Daily admission state could not be updated.');
      return { ...snapshot(day, updated), admitted: true };
    });
  }

  recordProviderState(day: string, state: Exclude<QuotaState, 'unknown'>): LabBudgetSnapshot {
    validateDay(day);
    this.ctx.storage.sql.exec('INSERT OR IGNORE INTO daily_state (day) VALUES (?)', day);
    this.ctx.storage.sql.exec(
      `UPDATE daily_state
       SET provider_state = CASE
         WHEN provider_state = 'exhausted' THEN provider_state
         ELSE ?
       END
       WHERE day = ?`,
      state,
      day,
    );
    return snapshot(day, this.readDaily(day));
  }
}
