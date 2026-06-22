/**
 * In-memory job queue with concurrency control.
 * Real-world production would use Redis + BullMQ, but for a single-instance
 * MVP this gives us: bounded concurrency, queue position tracking,
 * real-time progress, and graceful degradation under load.
 */

export type JobStatus = 'queued' | 'running' | 'completed' | 'failed';

export interface Job {
  id: string;
  status: JobStatus;
  position: number; // 0 = currently processing
  queuedAt: number;
  startedAt?: number;
  completedAt?: number;
  result?: unknown;
  error?: string;
  // Metadata for the worker
  payload: unknown;
}

const jobs = new Map<string, Job>();
const queue: string[] = []; // FIFO of job IDs waiting
const MAX_CONCURRENCY = 5; // Max simultaneous AI calls
let activeCount = 0;

// Listeners for real-time position updates
const listeners = new Map<string, Set<(job: Job) => void>>();

export function createJob(payload: unknown): Job {
  const id = `job_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const job: Job = {
    id,
    status: 'queued',
    position: queue.length + 1,
    queuedAt: Date.now(),
    payload,
  };
  jobs.set(id, job);
  queue.push(id);
  // Kick off processing
  void processNext();
  return job;
}

export function getJob(id: string): Job | undefined {
  return jobs.get(id);
}

export function subscribe(jobId: string, cb: (job: Job) => void): () => void {
  if (!listeners.has(jobId)) listeners.set(jobId, new Set());
  listeners.get(jobId)!.add(cb);
  return () => {
    listeners.get(jobId)?.delete(cb);
  };
}

function notify(jobId: string) {
  const job = jobs.get(jobId);
  if (!job) return;
  listeners.get(jobId)?.forEach((cb) => cb({ ...job }));
}

async function processNext() {
  if (activeCount >= MAX_CONCURRENCY) return;
  const nextId = queue.shift();
  if (!nextId) return;

  const job = jobs.get(nextId);
  if (!job) return processNext();

  activeCount++;
  job.status = 'running';
  job.startedAt = Date.now();
  job.position = 0;
  notify(nextId);

  // Update positions of remaining queued jobs
  queue.forEach((id, idx) => {
    const j = jobs.get(id);
    if (j) {
      j.position = idx + 1;
      notify(id);
    }
  });

  try {
    // Dynamic import to avoid circular deps
    const { executeJob } = await import('./queue-worker');
    const result = await executeJob(job);
    job.status = 'completed';
    job.result = result;
    job.completedAt = Date.now();
  } catch (e: any) {
    job.status = 'failed';
    job.error = e?.message ?? 'Unknown error';
    job.completedAt = Date.now();
  } finally {
    notify(nextId);
    activeCount--;
    // Cleanup old jobs (older than 10 min)
    setTimeout(() => {
      jobs.delete(nextId);
      listeners.delete(nextId);
    }, 10 * 60 * 1000);
    // Process next in queue
    void processNext();
  }
}

export function getQueueStats() {
  return {
    queued: queue.length,
    active: activeCount,
    maxConcurrency: MAX_CONCURRENCY,
  };
}
