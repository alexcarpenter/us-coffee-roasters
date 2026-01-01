/**
 * Data file I/O utilities for CLI
 * Used only in development/maintenance context
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Roaster } from '../types';

const DATA_FILE = join(process.cwd(), 'data.json');

/**
 * Read roasters from data.json
 */
export function readRoasters(): Roaster[] {
  const content = readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(content);
}

/**
 * Write roasters to data.json with proper formatting
 */
export function writeRoasters(roasters: Roaster[]): void {
  // Sort by state, then by name
  const sorted = [...roasters].sort((a, b) => {
    if (a.state !== b.state) {
      return a.state.localeCompare(b.state);
    }
    return a.name.localeCompare(b.name);
  });

  // Write with 2-space indentation
  const content = JSON.stringify(sorted, null, 2) + '\n';
  writeFileSync(DATA_FILE, content, 'utf-8');
}

