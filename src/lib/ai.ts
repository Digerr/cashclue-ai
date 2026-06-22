import ZAI from 'z-ai-web-dev-sdk';

export interface HustleInput {
  skills: string;
  hoursPerWeek: string;
  budget: string;
  goal: string;
  riskTolerance: 'low' | 'medium' | 'high';
}

export interface RoadmapStep {
  title: string;
  description: string;
  duration: string;
}

export interface HustleIdea {
  name: string;
  tagline: string;
  category: string;
  pitch: string;
  monthlyIncomeRange: {
    min: number;
    max: number;
    currency: string;
  };
  startupCost: number;
  timeToFirstDollar: string;
  timeToProfitable: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  scalability: 'Low' | 'Medium' | 'High' | 'Unlimited';
  roadmap: RoadmapStep[];
  keyResources: string[];
  risks: string[];
  monetizationModel: string;
  unfairAdvantage: string;
}

export interface HustlePlan {
  ideas: HustleIdea[];
  executiveSummary: string;
  recommendedPick: number;
  quickWins: string[];
  longTermPlays: string[];
}

const SYSTEM_PROMPT = `You are CashClue AI, a ruthless, sharp, no-bullshit side-hustle strategist who has helped 10,000+ people build profitable micro-businesses.

Your job: take a user's skills, time, budget, and goals, then produce 3 REALISTIC, ACTIONABLE, monetizable side-hustle ideas tailored to them. Not generic crap. Specific plays with real numbers, real tools, real first steps.

Rules:
- Be concrete. Name actual platforms (Etsy, Gumroad, Substack, TikTok, Notion, Stripe, etc.), real tools, real marketing channels.
- Numbers must be realistic. Cite plausible income ranges based on the user's constraints.
- Roadmap must be 3 concrete steps with clear duration.
- Risks must be honest, not vague.
- Unfair advantage = how THIS user specifically wins given their input.
- Quick wins = things that produce cash in <30 days. Long-term plays = 6+ month bets.
- Pick ONE idea as the recommended starting point and explain why.

Return ONLY valid JSON. No markdown, no commentary, no code fences. Pure JSON matching the schema.`;

function buildUserPrompt(input: HustleInput): string {
  return `User profile:
- Skills / interests: ${input.skills || 'not specified'}
- Available time: ${input.hoursPerWeek || 'not specified'} hours/week
- Starting budget: ${input.budget || '$0'}
- Goal: ${input.goal || 'make money'}
- Risk tolerance: ${input.riskTolerance}

Generate a HustlePlan with exactly 3 ideas. Each idea must have:
- name (catchy, brandable, 2-4 words)
- tagline (one-line hook, max 80 chars)
- category (e.g. "Digital Product", "Service Business", "Content", "E-commerce", "SaaS", "Marketplace", "Community")
- pitch (2-3 sentences explaining the play and why it works for this user)
- monthlyIncomeRange: { min, max, currency: "USD" } — realistic after 3-6 months of effort
- startupCost (USD, number)
- timeToFirstDollar (e.g. "1-2 weeks")
- timeToProfitable (e.g. "2-3 months")
- difficulty: "Easy" | "Medium" | "Hard"
- scalability: "Low" | "Medium" | "High" | "Unlimited"
- roadmap: array of 3 steps { title, description (1-2 sentences), duration }
- keyResources: array of 4-6 specific tools/platforms/books
- risks: array of 2-3 honest risks
- monetizationModel (one sentence: how money actually flows)
- unfairAdvantage (one sentence: why THIS user wins)

Also return:
- executiveSummary: 3-4 sentence honest assessment of user's situation and best path
- recommendedPick: index (0-2) of the idea they should start with
- quickWins: array of 3 concrete things they can do THIS WEEK to make first $
- longTermPlays: array of 2 plays for 6+ month wealth building

Return as JSON object with shape: { ideas: HustleIdea[], executiveSummary: string, recommendedPick: number, quickWins: string[], longTermPlays: string[] }

ONLY return valid JSON. No markdown. No commentary before or after.`;
}

export async function generateHustlePlan(input: HustleInput): Promise<HustlePlan> {
  const zai = await ZAI.create();

  const completion = await zai.chat.completions.create({
    messages: [
      { role: 'assistant', content: SYSTEM_PROMPT },
      { role: 'user', content: buildUserPrompt(input) },
    ],
    thinking: { type: 'disabled' },
    temperature: 0.85,
    max_tokens: 6000,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('AI returned empty response');
  }

  // Strip markdown fences if present
  let cleaned = content.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  }

  try {
    const parsed = JSON.parse(cleaned);
    return parsed as HustlePlan;
  } catch (e) {
    console.error('Failed to parse AI response:', cleaned.slice(0, 500));
    throw new Error('AI returned invalid JSON. Please try again.');
  }
}
