export const labBudget = {
  dailyAdmissionLimit: 80,
  dailyNeuronEstimateLimit: 8_800,
  neuronEstimatePerAdmission: 110,
  visitorAdmissionLimit: 12,
  visitorWindowLimit: 4,
  visitorWindowMilliseconds: 10 * 60 * 1_000,
} as const;

export type BudgetState = 'available' | 'exhausted' | 'rate_limited' | 'unavailable';
export type QuotaState = 'unknown' | 'observed_available' | 'exhausted';

export interface LabBudgetSnapshot {
  readonly state: BudgetState;
  readonly quotaState: QuotaState;
  readonly dailyAdmissions: number;
  readonly dailyAdmissionLimit: number;
  readonly remainingAdmissions: number;
  readonly reservedNeuronEstimate: number;
  readonly dailyNeuronEstimateLimit: number;
  readonly resetsAt: string;
}

export interface LabAdmissionDecision extends LabBudgetSnapshot {
  readonly admitted: boolean;
  readonly reason?: 'daily_budget' | 'visitor_window' | 'visitor_daily' | 'provider_quota';
}

export interface AdmissionDailyState {
  readonly admissions: number;
  readonly reserved_neurons: number;
  readonly provider_state: QuotaState;
}

export interface AdmissionVisitorState {
  readonly window_start: number;
  readonly window_count: number;
  readonly daily_count: number;
}

export function evaluateAdmission(
  daily: AdmissionDailyState,
  visitor: AdmissionVisitorState | undefined,
  windowStart: number,
): LabAdmissionDecision['reason'] | null {
  if (daily.provider_state === 'exhausted') return 'provider_quota';
  if (
    daily.admissions >= labBudget.dailyAdmissionLimit
    || daily.reserved_neurons + labBudget.neuronEstimatePerAdmission > labBudget.dailyNeuronEstimateLimit
  ) return 'daily_budget';
  if (visitor?.window_start === windowStart && visitor.window_count >= labBudget.visitorWindowLimit) {
    return 'visitor_window';
  }
  if ((visitor?.daily_count ?? 0) >= labBudget.visitorAdmissionLimit) return 'visitor_daily';
  return null;
}
