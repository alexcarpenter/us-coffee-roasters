#!/usr/bin/env bun

/**
 * Remove command - remove a roaster from data.json
 */

import { readRoasters, writeRoasters } from '../utils/data';
import { green, red, yellow } from 'kleur';

function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error(red('Error: Missing required argument'));
    console.log('Usage: bun run src/commands/remove.ts <name|website>');
    process.exit(1);
  }

  const query = args[0];
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
}

main();

