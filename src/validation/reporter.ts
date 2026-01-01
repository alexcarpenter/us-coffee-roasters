/**
 * Detailed validation error reporting
 */

import type { SchemaError } from '../validators/schema';
import type { DuplicatePair } from '../validators/duplicates';
import type { LinkError } from '../validators/links';

export interface ValidationReport {
  valid: boolean;
  schemaErrors: SchemaError[];
  duplicates: DuplicatePair[];
  linkErrors: LinkError[];
}

/**
 * Format validation errors into readable report
 */
export function formatReport(report: ValidationReport): string {
  const lines: string[] = [];

  if (report.schemaErrors.length > 0) {
    lines.push('Schema Validation Errors:');
    for (const error of report.schemaErrors) {
      lines.push(`  - Entry #${error.index}: ${error.field} - ${error.message}`);
    }
    lines.push('');
  }

  if (report.duplicates.length > 0) {
    lines.push('Duplicate Entries:');
    for (const dup of report.duplicates) {
      lines.push(`  - Entries #${dup.index1} and #${dup.index2}: ${dup.reason}`);
    }
    lines.push('');
  }

  if (report.linkErrors.length > 0) {
    lines.push('Link Check Failures:');
    for (const error of report.linkErrors) {
      const status = error.status ? ` (${error.status})` : '';
      lines.push(`  - Entry #${error.index}: ${error.url}${status} - ${error.message}`);
    }
    lines.push('');
  }

  if (lines.length === 0) {
    return '✓ All validations passed!';
  }

  return lines.join('\n');
}

/**
 * Create validation report object
 */
export function createReport(
  schemaErrors: SchemaError[],
  duplicates: DuplicatePair[],
  linkErrors: LinkError[]
): ValidationReport {
  return {
    valid: schemaErrors.length === 0 && duplicates.length === 0 && linkErrors.length === 0,
    schemaErrors,
    duplicates,
    linkErrors
  };
}

