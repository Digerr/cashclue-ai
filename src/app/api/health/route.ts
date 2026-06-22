import { NextResponse } from 'next/server';
import { getQueueStats } from '@/lib/queue';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const stats = getQueueStats();
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    queue: stats,
    uptime: process.uptime(),
  });
}
