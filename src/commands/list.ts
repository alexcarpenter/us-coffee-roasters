#!/usr/bin/env bun

/**
 * List command - list roasters, optionally filtered by state
 */

import { readRoasters } from '../utils/data';
import { findByState } from '../utils/search';
import { cyan, yellow } from 'kleur';

function main() {
  const args = process.argv.slice(2);
  const stateIndex = args.indexOf('--state');

  let roasters = readRoasters();

  if (stateIndex !== -1 && args[stateIndex + 1]) {
    const state = args[stateIndex + 1];
    roasters = findByState(roasters, state);
    console.log(cyan(`\nRoasters in ${state} (${roasters.length}):\n`));
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
}

main();

