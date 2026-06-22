import { generateHustlePlan, HustleInput } from './ai';
import type { Job } from './queue';

/**
 * Execute a job: calls the AI generator with retry on transient failures.
 */
export async function executeJob(job: Job): Promise<unknown> {
  const input = job.payload as HustleInput;
  const MAX_RETRIES = 2;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await generateHustlePlan(input);
      return result;
    } catch (e: any) {
      lastError = e;
      const msg = e?.message ?? '';
      // Retry on transient failures: timeouts, parse errors, 429s
      const transient = /timeout|invalid JSON|429|rate limit|fetch failed|ECONNRESET|ETIMEDOUT/i.test(msg);
      if (!transient || attempt === MAX_RETRIES) {
        throw e;
      }
      // Exponential backoff: 1s, 2s
      await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
    }
  }

  throw lastError ?? new Error('Job failed without error');
}
