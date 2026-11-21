/**
 * FunnelScript Web UI Execution Bridge.
 * 
 * PHASE 1 SINGLE SOURCE OF TRUTH MANDATE:
 * In-browser TypeScript simulation logic, linear congruential RNG, and stochastic math
 * have been permanently deprecated and eliminated from this module.
 * 
 * All parsing, linting, RNG seeding, event execution, and financial ledger accounting
 * execute exclusively in Python (src/funnelscript/runtime/engine.py).
 * 
 * This module acts strictly as a typed client bridge communicating with the canonical
 * FunnelScript Python runtime API bridge or WebAssembly runtime.
 */

import type { StrategyAST, BrowserPreviewResult, SimulationResult } from '../types';

export const RUNTIME_DEPRECATION_NOTICE =
  'Phase 1 Mandate: In-browser TypeScript simulation has been permanently deprecated. All simulation math and financial ledger metrics run exclusively on the canonical FunnelScript Python engine (funnelscript simulate or local runtime bridge).';

/**
 * Client for fetching verified simulation telemetry from the canonical Python engine.
 */
export async function fetchCanonicalSimulation(
  ast: StrategyAST,
  apiUrl = 'http://localhost:8000/api/simulate'
): Promise<BrowserPreviewResult> {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ast),
    });
    if (!response.ok) {
      return {
        status: 'unsupported',
        reason: `Python runtime API returned HTTP ${response.status}: ${await response.text()}`,
      };
    }
    const metrics: SimulationResult = await response.json();
    return {
      status: 'illustrative',
      metrics,
      limitations: 'Executed by canonical FunnelScript Python simulation engine.',
    };
  } catch (err) {
    return {
      status: 'unsupported',
      reason: `Cannot reach FunnelScript Python runtime at ${apiUrl}. Run 'funnelscript serve' or export simulation JSON via 'funnelscript simulate <file> --export-json'. (${err})`,
    };
  }
}

/**
 * Synchronous client stub for UI preview.
 * Enforces fail-closed deprecation of duplicate TypeScript simulation math.
 */
export function runInBrowserSimulation(
  _ast: StrategyAST,
  _trialsCount = 50,
  _seed = 12345
): BrowserPreviewResult {
  return {
    status: 'unsupported',
    reason: RUNTIME_DEPRECATION_NOTICE,
  };
}
