/**
 * Duplicate detection for roaster data
 */

import type { Roaster } from '../types';

export interface DuplicatePair {
  index1: number;
  index2: number;
  roaster1: Roaster;
  roaster2: Roaster;
  reason: string;
}

/**
 * Normalize URL for comparison
 */
function normalizeUrl(url: string): string {
  return url
    .toLowerCase()
    .replace(/\/$/, '')
    .replace(/^https?:\/\/(www\.)?/, '');
}

/**
 * Normalize name for comparison
 */
function normalizeName(name: string): string {
  return name.toLowerCase().trim();
}

/**
 * Find duplicate roasters by name AND website
 */
export function findDuplicates(roasters: Roaster[]): DuplicatePair[] {
  const duplicates: DuplicatePair[] = [];

  for (let i = 0; i < roasters.length; i++) {
    for (let j = i + 1; j < roasters.length; j++) {
      const r1 = roasters[i];
      const r2 = roasters[j];

      const name1 = normalizeName(r1.name);
      const name2 = normalizeName(r2.name);
      const url1 = normalizeUrl(r1.website);
      const url2 = normalizeUrl(r2.website);

      // Check if both name and website match
      if (name1 === name2 && url1 === url2) {
        duplicates.push({
          index1: i,
          index2: j,
          roaster1: r1,
          roaster2: r2,
          reason: `Same name "${r1.name}" and website "${r1.website}"`
        });
      }
    }
  }

  return duplicates;
}

