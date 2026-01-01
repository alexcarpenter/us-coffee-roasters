/**
 * Statistics and analytics utilities for roaster data
 */

import type { Roaster } from '../types';

/**
 * Get comprehensive statistics about roasters
 */
export function getStats(roasters: Roaster[]): {
  total: number;
  byState: Record<string, number>;
} {
  const byState: Record<string, number> = {};

  for (const roaster of roasters) {
    byState[roaster.state] = (byState[roaster.state] || 0) + 1;
  }

  return {
    total: roasters.length,
    byState
  };
}

/**
 * Get count of roasters per state
 */
export function getStateCounts(roasters: Roaster[]): Record<string, number> {
  return getStats(roasters).byState;
}

/**
 * Get list of unique states
 */
export function getStates(roasters: Roaster[]): string[] {
  const states = new Set(roasters.map(r => r.state));
  return Array.from(states).sort();
}

