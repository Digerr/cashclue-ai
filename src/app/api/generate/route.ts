import { NextRequest, NextResponse } from 'next/server';
import { generateHustlePlan, HustleInput } from '@/lib/ai';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as HustleInput;

    if (!body || (!body.skills && !body.goal)) {
      return NextResponse.json(
        { error: 'Please describe your skills or goal.' },
        { status: 400 }
      );
    }

    const plan = await generateHustlePlan({
      skills: body.skills?.trim() ?? '',
      hoursPerWeek: body.hoursPerWeek?.trim() ?? '',
      budget: body.budget?.trim() ?? '',
      goal: body.goal?.trim() ?? '',
      riskTolerance: body.riskTolerance ?? 'medium',
      theme: body.theme ?? 'sideHustle',
      lang: body.lang ?? 'en',
    });

    return NextResponse.json(plan);
  } catch (err: any) {
    console.error('Generate API error:', err);
    return NextResponse.json(
      { error: err?.message || 'Something went wrong generating your plan.' },
      { status: 500 }
    );
  }
}
