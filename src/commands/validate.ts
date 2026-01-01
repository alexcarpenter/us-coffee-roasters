#!/usr/bin/env bun

/**
 * Validate command - runs all validation checks
 */

import { readRoasters } from '../utils/data';
import { validateSchema } from '../validators/schema';
import { findDuplicates } from '../validators/duplicates';
import { validateLinks } from '../validators/links';
import { createReport, formatReport } from '../validation/reporter';
import { green, red } from 'kleur';

async function main() {
  console.log('Running validation checks...\n');

  const roasters = readRoasters();

  // Schema validation
  console.log('Checking schema...');
  const schemaResult = validateSchema(roasters);

  // Duplicate check
  console.log('Checking for duplicates...');
  const duplicates = findDuplicates(roasters);

  // Link checking
  console.log('Checking website links...');
  const linkResult = await validateLinks(roasters);

  // Create report
  const report = createReport(
    schemaResult.errors,
    duplicates,
    linkResult.errors
  );

  // Output results
  console.log('\n' + formatReport(report));

  if (report.valid) {
    console.log(green('\n✓ All validations passed!'));
    process.exit(0);
  } else {
    console.log(red('\n✗ Validation failed!'));
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});

