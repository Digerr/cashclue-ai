/**
 * In-memory rate limiter using sliding window.
 * For single-instance deployments (current setup).
 * For multi-instance: replace with Redis-backed limiter.
 */

interface RateBucket {
  timestamps: number[];
}

const buckets = new Map<string, RateBucket>();

interface RateLimitOptions {
  /** Identifier (userId or ipHash) */
  key: string;
  /** Max number of requests in the window */
  max: number;
  /** Window size in ms */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
  total: number;
}

export function rateLimit({ key, max, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { timestamps: [] };

  // Filter out timestamps outside the window
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);

  if (bucket.timestamps.length >= max) {
    const oldest = bucket.timestamps[0];
    return {
      allowed: false,
      remaining: 0,
      resetMs: oldest + windowMs - now,
      total: max,
    };
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);

  return {
    allowed: true,
    remaining: max - bucket.timestamps.length,
    resetMs: windowMs,
    total: max,
  };
}

// Periodic cleanup of stale buckets (every 5 min)
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();
export function cleanupStaleBuckets() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets.entries()) {
    bucket.timestamps = bucket.timestamps.filter((t) => now - t < 60 * 60 * 1000);
    if (bucket.timestamps.length === 0) {
      buckets.delete(key);
    }
  }
}
