import { describe, expect, test } from 'bun:test';
import type { StrategyAST } from '../types';
import { runInBrowserSimulation, fetchCanonicalSimulation, RUNTIME_DEPRECATION_NOTICE } from './simulator';

const BASE: StrategyAST = {
  $schema: 'https://marketing-lang.org',
  strategy_name: 'Single_Path',
  metadata: { author: 'Test', industry: 'Synthetic', currency: 'USD' },
  environment: { market_volatility: 'low', competitor_activity: 'passive' },
  entities: {
    budgets: { total_budget: 10000, max_cpc_limit: 2, initial_cash: 20000, settlement_delay_days: 2 },
    audiences: [{
      id: 'aud', name: 'Test cohort', type: 'cold', estimated_size: 5000,
      attributes: { brand_affinity: 0.7, price_sensitivity: 0.5, fomo_index: 0.3 },
    }],
    touchpoints: [
      { id: 'ad', type: 'paid_traffic', base_cpc: 0.8, ad_creative_score: 0.75 },
      { id: 'landing', type: 'conversion_surface', base_conversion_rate: 0.05 },
    ],
  },
  logic_flow: [{ step: 1, action: 'TriggerTraffic', source: 'aud', via: 'ad', destination: 'landing' }],
  simulation_engine: {
    engine_type: 'Agent-Based_Monte_Carlo',
    parameters: { virtual_agents_count: 50000, timeframe_days: 7, randomness_factor_sigma: 0.1 },
    output_metrics_requested: ['ROAS'],
  },
};

describe('Single Source of Truth: TypeScript runtime deprecation', () => {
  test('in-browser TypeScript simulation is fail-closed and unsupported', () => {
    const result = runInBrowserSimulation(BASE, 8, 12345);
    expect(result.status).toBe('unsupported');
    if (result.status === 'unsupported') {
      expect(result.reason).toBe(RUNTIME_DEPRECATION_NOTICE);
    }
  });

  test('no uncalibrated stochastic math or RNG executes in TypeScript', () => {
    const resA = runInBrowserSimulation(BASE, 10, 1);
    const resB = runInBrowserSimulation(BASE, 10, 9999);
    expect(resA).toEqual(resB);
  });

  test('fetchCanonicalSimulation reports error cleanly when Python backend is offline', async () => {
    const res = await fetchCanonicalSimulation(BASE, 'http://127.0.0.1:59999/api/simulate');
    expect(res.status).toBe('unsupported');
    if (res.status === 'unsupported') {
      expect(res.reason).toContain('Cannot reach FunnelScript Python runtime');
    }
  });
});
