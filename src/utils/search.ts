/**
 * Search and filter utilities for roaster data
 */

import type { Roaster } from '../types';

/**
 * Find all roasters in a specific state
 */
export function findByState(roasters: Roaster[], state: string): Roaster[] {
  return roasters.filter(r => r.state === state);
}

/**
 * Search roasters by name (case-insensitive partial match)
 */
export function searchByName(roasters: Roaster[], query: string): Roaster[] {
  const lowerQuery = query.toLowerCase();
  return roasters.filter(r =>
    r.name.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Find a roaster by exact website URL match
 */
export function findByWebsite(roasters: Roaster[], url: string): Roaster | undefined {
  return roasters.find(r => normalizeUrl(r.website) === normalizeUrl(url));
}

/**
 * Filter roasters by multiple states
 */
export function filterByStates(roasters: Roaster[], states: string[]): Roaster[] {
  const stateSet = new Set(states);
  return roasters.filter(r => stateSet.has(r.state));
}

/**
 * Normalize URL for comparison (remove trailing slash, lowercase, etc.)
 */
function normalizeUrl(url: string): string {
  return url
    .toLowerCase()
    .replace(/\/$/, '')
    .replace(/^https?:\/\/(www\.)?/, '');
}

