import { describe, expect, it } from 'vitest';
import { evaluateAdmission, labBudget } from './admission-policy';

const openDailyState = {
  admissions: 0,
  reserved_neurons: 0,
  provider_state: 'unknown' as const,
};

describe('Corpus Lab admission policy', () => {
  it('reserves less than the Workers AI daily free allocation', () => {
    expect(labBudget.dailyAdmissionLimit * labBudget.neuronEstimatePerAdmission).toBe(8_800);
    expect(labBudget.dailyNeuronEstimateLimit).toBe(8_800);
  });

  it('fails closed at the app budget or observed provider quota', () => {
    expect(evaluateAdmission({
      ...openDailyState,
      admissions: labBudget.dailyAdmissionLimit,
    }, undefined, 0)).toBe('daily_budget');
    expect(evaluateAdmission({
      ...openDailyState,
      provider_state: 'exhausted',
    }, undefined, 0)).toBe('provider_quota');
  });

  it('enforces rolling-window and daily visitor limits', () => {
    expect(evaluateAdmission(openDailyState, {
      window_start: 100,
      window_count: labBudget.visitorWindowLimit,
      daily_count: 4,
    }, 100)).toBe('visitor_window');
    expect(evaluateAdmission(openDailyState, {
      window_start: 0,
      window_count: 1,
      daily_count: labBudget.visitorAdmissionLimit,
    }, 100)).toBe('visitor_daily');
  });
});
