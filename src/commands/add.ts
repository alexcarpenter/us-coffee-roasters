#!/usr/bin/env bun

/**
 * Add command - add a new roaster to data.json
 */

import { readRoasters, writeRoasters } from '../utils/data';
import { validateSchema } from '../validators/schema';
import { findDuplicates } from '../validators/duplicates';
import type { Roaster } from '../types';
import { green, red, yellow } from 'kleur';

function main() {
  const args = process.argv.slice(2);

  if (args.length < 4) {
    console.error(red('Error: Missing required arguments'));
    console.log('Usage: bun run src/commands/add.ts <name> <state> <address> <website>');
    process.exit(1);
  }

  const [name, state, address, website] = args;

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
}

main();

