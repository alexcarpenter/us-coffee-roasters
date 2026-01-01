/**
 * JSON schema validation for roaster data
 */

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Roaster } from '../types';

const SCHEMA_FILE = join(process.cwd(), 'schema.json');

export interface SchemaError {
  index: number;
  field: string;
  message: string;
  value?: unknown;
}

/**
 * Validate roasters against JSON schema
 */
export function validateSchema(roasters: Roaster[]): {
  valid: boolean;
  errors: SchemaError[];
} {
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);

  const schema = JSON.parse(readFileSync(SCHEMA_FILE, 'utf-8'));
  const validate = ajv.compile(schema);

  const valid = validate(roasters);
  const errors: SchemaError[] = [];

  if (!valid && validate.errors) {
    for (const error of validate.errors) {
      // Extract index from path (e.g., "/42/name" -> 42)
      const pathMatch = error.instancePath.match(/^\/(\d+)/);
      const index = pathMatch ? parseInt(pathMatch[1], 10) : -1;

      // Extract field name
      const field = error.instancePath.split('/').pop() || 'unknown';

      errors.push({
        index,
        field,
        message: error.message || 'Validation error',
        value: error.data
      });
    }
  }

  return { valid: valid || false, errors };
}

