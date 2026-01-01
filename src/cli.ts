#!/usr/bin/env bun

/**
 * CLI entry point for coffee roasters management
 */

import { Command } from 'commander';
const program = new Command();
import { readRoasters } from './utils/data';
import { validateSchema } from './validators/schema';
import { findDuplicates } from './validators/duplicates';
import { validateLinks } from './validators/links';
import { createReport, formatReport } from './validation/reporter';
import { findByState } from './utils/search';
import { writeRoasters } from './utils/data';
import type { Roaster } from './types';
import { green, red, yellow, cyan } from 'kleur';

program
  .name('coffee-roasters')
  .description('CLI tool for managing US coffee roasters data')
  .version('1.0.0');

program
  .command('add')
  .description('Add a new roaster')
  .argument('<name>', 'Roaster name')
  .argument('<state>', 'State name')
  .argument('<address>', 'Address')
  .argument('<website>', 'Website URL')
  .action((name: string, state: string, address: string, website: string) => {
    // Validate website URL format
    try {
      new URL(website);
    } catch {
      console.error(red('Error: Invalid website URL format'));
      process.exit(1);
    }

    const newRoaster: Roaster = {
      name,
      state,
      address,
      website
    };

    const roasters = readRoasters();

    // Check for duplicates
    const testRoasters = [...roasters, newRoaster];
    const duplicates = findDuplicates(testRoasters);

    if (duplicates.length > 0) {
      console.error(red('Error: Duplicate roaster detected'));
      for (const dup of duplicates) {
        if (dup.index2 === testRoasters.length - 1) {
          console.error(`  Matches entry #${dup.index1}: ${dup.roaster1.name}`);
        }
      }
      process.exit(1);
    }

    // Validate schema
    const schemaResult = validateSchema(testRoasters);
    if (!schemaResult.valid) {
      console.error(red('Error: Validation failed'));
      for (const error of schemaResult.errors) {
        if (error.index === testRoasters.length - 1) {
          console.error(`  ${error.field}: ${error.message}`);
        }
      }
      process.exit(1);
    }

    // Add and save
    roasters.push(newRoaster);
    writeRoasters(roasters);

    console.log(green(`✓ Added roaster: ${name}`));
    console.log(yellow(`  Total roasters: ${roasters.length}`));
  });

program
  .command('remove')
  .description('Remove a roaster by name or website')
  .argument('<name|website>', 'Roaster name or website URL')
  .action((query: string) => {
    const roasters = readRoasters();

    // Find roaster by name or website
    const index = roasters.findIndex(r =>
      r.name.toLowerCase() === query.toLowerCase() ||
      r.website.toLowerCase() === query.toLowerCase()
    );

    if (index === -1) {
      console.error(red(`Error: Roaster not found: ${query}`));
      process.exit(1);
    }

    const removed = roasters[index];
    roasters.splice(index, 1);
    writeRoasters(roasters);

    console.log(green(`✓ Removed roaster: ${removed.name}`));
    console.log(yellow(`  Total roasters: ${roasters.length}`));
  });

program
  .command('validate')
  .description('Run all validation checks')
  .option('--skip-links', 'Skip link checking (faster)')
  .action(async (options: { skipLinks?: boolean }) => {
    console.log('Running validation checks...\n');

    const roasters = readRoasters();

    // Schema validation
    console.log('Checking schema...');
    const schemaResult = validateSchema(roasters);

    // Duplicate check
    console.log('Checking for duplicates...');
    const duplicates = findDuplicates(roasters);

    // Link checking
    let linkResult = { valid: true, errors: [] };
    if (!options.skipLinks) {
      console.log('Checking website links...');
      linkResult = await validateLinks(roasters);
    } else {
      console.log('Skipping link checks...');
    }

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
  });

program
  .command('list')
  .description('List all roasters, optionally filtered by state')
  .option('-s, --state <state>', 'Filter by state')
  .action((options: { state?: string }) => {
    let roasters = readRoasters();

    if (options.state) {
      roasters = findByState(roasters, options.state);
      console.log(cyan(`\nRoasters in ${options.state} (${roasters.length}):\n`));
    } else {
      console.log(cyan(`\nAll roasters (${roasters.length}):\n`));
    }

    for (const roaster of roasters) {
      console.log(`${yellow(roaster.name)}`);
      console.log(`  State: ${roaster.state}`);
      console.log(`  Address: ${roaster.address}`);
      console.log(`  Website: ${roaster.website}`);
      console.log('');
    }
  });

program.parse();

