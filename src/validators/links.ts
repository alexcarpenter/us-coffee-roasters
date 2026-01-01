/**
 * HTTP link checking for roaster websites
 */

import type { Roaster } from '../types';

export interface LinkError {
  index: number;
  url: string;
  status?: number;
  message: string;
}

const TIMEOUT_MS = 10000; // 10 seconds
const CONCURRENCY_LIMIT = 10;

/**
 * Check if a URL is reachable
 */
async function checkUrl(url: string): Promise<{ status?: number; error?: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow'
    });

    clearTimeout(timeoutId);

    // Accept 2xx and 3xx as valid
    if (response.status >= 200 && response.status < 400) {
      return { status: response.status };
    }

    return {
      status: response.status,
      error: `HTTP ${response.status} ${response.statusText}`
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return { error: 'Request timeout' };
      }
      return { error: error.message };
    }
    return { error: 'Unknown error' };
  }
}

/**
 * Check all URLs with concurrency limit
 */
async function checkUrlsBatch(
  urls: Array<{ index: number; url: string }>,
  concurrency: number
): Promise<Array<{ index: number; url: string; result: { status?: number; error?: string } }>> {
  const results: Array<{ index: number; url: string; result: { status?: number; error?: string } }> = [];

  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(async ({ index, url }) => ({
        index,
        url,
        result: await checkUrl(url)
      }))
    );
    results.push(...batchResults);
  }

  return results;
}

/**
 * Validate all website URLs
 */
export async function validateLinks(roasters: Roaster[]): Promise<{
  valid: boolean;
  errors: LinkError[];
}> {
  const urls = roasters.map((r, index) => ({ index, url: r.website }));
  const results = await checkUrlsBatch(urls, CONCURRENCY_LIMIT);

  const errors: LinkError[] = [];

  for (const { index, url, result } of results) {
    if (result.error || (result.status && result.status >= 400)) {
      errors.push({
        index,
        url,
        status: result.status,
        message: result.error || `HTTP ${result.status}`
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

