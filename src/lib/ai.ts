import ZAI from 'z-ai-web-dev-sdk';
import type { Lang } from './i18n';

export type ThemeId = 'sideHustle' | 'startup' | 'content' | 'career' | 'passive';

export interface ThemeConfig {
  id: ThemeId;
  /** AI persona for this theme */
  persona: string;
  /** What kind of ideas to generate */
  ideaFocus: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  sideHustle: {
    id: 'sideHustle',
    persona:
      'a ruthless, sharp, no-bullshit side-hustle strategist who has helped 10,000+ people build profitable micro-businesses on the side of their day job',
    ideaFocus:
      'side hustles — extra income streams the user can start on the side of their current commitments, with realistic time and capital requirements',
  },
  startup: {
    id: 'startup',
    persona:
      'a sharp startup strategist and ex-VC who has evaluated 5,000+ pitch decks and helped founders raise from pre-seed to Series A',
    ideaFocus:
      'fundable startup ideas — real businesses with defensible moats, scalable distribution, and venture-scale upside. Not lifestyle businesses. Real companies.',
  },
  content: {
    id: 'content',
    persona:
      'a content strategist who has grown channels from 0 to 1M+ followers across YouTube, TikTok, Substack, X, and Instagram',
    ideaFocus:
      'content creator business plans — specific niches, content formats, platform strategies, monetization paths (sponsorships, products, memberships, courses), and 90-day launch plans',
  },
  career: {
    id: 'career',
    persona:
      'a career strategist who has coached 3,000+ professionals through high-leverage career pivots into higher-paying, higher-leverage roles',
    ideaFocus:
      'career pivot paths — specific target roles, skill bridges, certifications, networking strategies, and 6-12 month transition roadmaps that materially increase income',
  },
  passive: {
    id: 'passive',
    persona:
      'a passive income architect who has built portfolios of digital assets, dividend stocks, rental properties, and automated online businesses',
    ideaFocus:
      'passive income plays — assets and systems that generate recurring revenue with minimal ongoing effort: digital products, content royalties, automated services, investment vehicles, and licensing deals',
  },
};

export interface HustleInput {
  skills: string;
  hoursPerWeek: string;
  budget: string;
  goal: string;
  riskTolerance: 'low' | 'medium' | 'high';
  theme: ThemeId;
  lang: Lang;
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

const LANG_NAMES: Record<Lang, string> = {
  en: 'English',
  ru: 'Russian (Русский)',
  es: 'Spanish (Español)',
  de: 'German (Deutsch)',
  fr: 'French (Français)',
};

function buildSystemPrompt(theme: ThemeConfig, lang: Lang): string {
  return `You are CashClue AI, ${theme.persona}.

Your job: take a user's skills, time, budget, and goals, then produce 3 REALISTIC, ACTIONABLE, monetizable ${theme.ideaFocus} tailored to them. Not generic crap. Specific plays with real numbers, real tools, real first steps.

Rules:
- Be concrete. Name actual platforms, real tools, real marketing channels relevant to the theme.
- Numbers must be realistic. Cite plausible income ranges based on the user's constraints.
- Roadmap must be 3 concrete steps with clear duration.
- Risks must be honest, not vague.
- Unfair advantage = how THIS user specifically wins given their input.
- Quick wins = things that produce cash in <30 days. Long-term plays = 6+ month bets.
- Pick ONE idea as the recommended starting point and explain why.
- ALL output (ideas, pitches, roadmap steps, summaries, etc.) MUST be written in ${LANG_NAMES[lang]}. The labels like "name", "pitch", "roadmap" stay in English (they are JSON keys), but the VALUES must be in ${LANG_NAMES[lang]}.
- BE CONCISE. Keep every text value SHORT: pitch 1-2 sentences, descriptions 1 sentence, risks 1 short sentence each. Total response MUST be valid JSON that fits in ~4000 tokens. Do NOT exceed. If you are running out of space, shorten descriptions rather than truncating JSON.

Return ONLY valid JSON. No markdown, no commentary, no code fences. Pure JSON matching the schema.`;
}

function buildUserPrompt(input: HustleInput, theme: ThemeConfig): string {
  return `User profile:
- Skills / interests: ${input.skills || 'not specified'}
- Available time: ${input.hoursPerWeek || 'not specified'} hours/week
- Starting budget: ${input.budget || '$0'}
- Goal: ${input.goal || 'make money'}
- Risk tolerance: ${input.riskTolerance}

Theme: ${theme.ideaFocus}

Generate a plan with exactly 3 ideas. Each idea must have:
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

ALL human-readable text values MUST be in ${LANG_NAMES[input.lang]}.

ONLY return valid JSON. No markdown. No commentary before or after.`;
}

export async function generateHustlePlan(input: HustleInput): Promise<HustlePlan> {
  const theme = THEMES[input.theme] ?? THEMES.sideHustle;
  const zai = await ZAI.create();

  const completion = await zai.chat.completions.create({
    messages: [
      { role: 'assistant', content: buildSystemPrompt(theme, input.lang) },
      { role: 'user', content: buildUserPrompt(input, theme) },
    ],
    thinking: { type: 'disabled' },
    temperature: 0.85,
    max_tokens: 12000,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('AI returned empty response');
  }

  const cleaned = stripCodeFences(content);
  const parsed = parseJsonLenient(cleaned);
  if (!parsed) {
    console.error('Failed to parse AI response:', cleaned.slice(0, 800));
    throw new Error('AI returned invalid JSON. Please try again.');
  }
  return parsed as HustlePlan;
}

function stripCodeFences(s: string): string {
  let out = s.trim();
  // Remove leading ```json or ```
  out = out.replace(/^```(?:json)?\s*/i, '');
  // Remove trailing ```
  out = out.replace(/\s*```$/i, '');
  // If there's a code fence in the middle, take the content between first and last fence
  const firstFence = out.indexOf('```');
  const lastFence = out.lastIndexOf('```');
  if (firstFence !== -1 && lastFence !== -1 && lastFence > firstFence) {
    const inner = out.slice(firstFence + 3, lastFence);
    // skip optional language tag on the first line
    const nl = inner.indexOf('\n');
    out = nl >= 0 ? inner.slice(nl + 1) : inner;
  }
  return out.trim();
}

function parseJsonLenient(s: string): HustlePlan | null {
  // Attempt 1: direct parse
  try {
    return JSON.parse(s) as HustlePlan;
  } catch {}

  // Attempt 2: extract the outermost JSON object via brace matching
  const start = s.indexOf('{');
  if (start === -1) return null;
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < s.length; i++) {
    const c = s[i];
    if (escape) { escape = false; continue; }
    if (c === '\\' && inString) { escape = true; continue; }
    if (c === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        const candidate = s.slice(start, i + 1);
        try {
          return JSON.parse(candidate) as HustlePlan;
        } catch {
          break;
        }
      }
    }
  }

  // Attempt 3: try truncating to last balanced } and closing — last resort for cut-off JSON
  const lastBrace = s.lastIndexOf('}');
  if (lastBrace > start) {
    const candidate = s.slice(start, lastBrace + 1);
    try {
      return JSON.parse(candidate) as HustlePlan;
    } catch {}
  }

  return null;
}
