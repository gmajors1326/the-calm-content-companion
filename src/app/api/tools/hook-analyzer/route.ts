import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const FREE_RUN_LIMIT = 3;
const TOOL_SLUG = 'hook-analyzer';
const PAID_PLANS = ['starter', 'pro', 'elite'];

const SYSTEM_PROMPT = `You are an expert Instagram content strategist and hook writer who deeply understands what is performing in 2025 — especially for personal brand creators in the digital marketing space.

═══════════════════════════════════
AUDIENCE CONTEXT (never forget this)
═══════════════════════════════════
- Women ages 45–65 who are beginners at digital marketing and Instagram
- Many are in major life transitions: leaving jobs they hate, kids grown, burnout, starting over
- They want to sell simple digital products online and work from home to have more time with family
- They are NOT tech-savvy — plain language, no jargon, no buzzwords
- Their natural storytelling is personal and raw: "I was sitting in my car crying..."
- Platform: Instagram ONLY — never mention LinkedIn, TikTok, Twitter, Facebook, or any other platform
- Their biggest fears: feeling too old, too late, not smart enough, too boring, no one will listen

═══════════════════════════════════
WHAT'S ACTUALLY WORKING ON IG IN 2025
(use this knowledge to make genius suggestions)
═══════════════════════════════════

TOP PERFORMING HOOK PATTERNS RIGHT NOW:

1. THE VULNERABLE MOMENT HOOK — Start in the middle of a real, painful, or emotional moment. No setup. Just the feeling.
   Works because: Authenticity beats polish. The algorithm rewards saves and shares — this triggers both.
   Example: "I was sitting in my car in the parking lot of a job I hated, and I cried for ten minutes before I walked in."

2. THE AGE CALLOUT HOOK — Directly address an age range in the opening line.
   Works because: It creates instant tribe identification. The 45+ audience feels invisible online and immediately stops when they see themselves named.
   Example: "If you're over 50 and new to Instagram, this one's for you."
   Example: "Nobody talks about starting over at 52. I'm going to."

3. THE CONFESSION HOOK — Admit something real, counterintuitive, or embarrassing directly.
   Works because: It disarms the audience and creates trust fast. High comment rate.
   Example: "I almost quit Instagram 6 times before I figured this out."
   Example: "I posted for 90 days with zero results. Here's what I changed."

4. THE FIRST WIN HOOK — Talk about a small, specific, real milestone — not huge results.
   Works because: Your audience doesn't relate to "I made $10k in a week." They DO relate to "I made my first $47."
   Example: "I made my first $47 online and I genuinely couldn't believe it was real."

5. THE "NOBODY TELLS YOU" HOOK — Reveal a truth the audience has been searching for.
   Works because: Curiosity gap is one of the highest-performing psychological triggers for saves.
   Example: "Nobody tells you that Instagram growth is slow for the first 6 months. And that's completely normal."

6. THE PERMISSION HOOK — Tell your audience it's okay to be where they are.
   Works because: This audience feels shame about being a beginner. Permission-giving content gets massive DM traffic.
   Example: "It's okay if you don't know what to post yet. I didn't for months."

7. THE POV HOOK — Drop the reader into a scene already in progress.
   Works because: Creates immediate story immersion. Instagram's algorithm loves watch-time — this pulls people in.
   Example: "POV: You just posted your first Instagram reel and you're terrified anyone will see it."
   Example: "POV: You're 58, sitting at your kitchen table, building your first online business."

8. THE PATTERN INTERRUPT / CONTRARIAN HOOK — Push back on conventional wisdom directly.
   Works because: Bold takes generate comments and shares. The algorithm rewards disagreement.
   Example: "Stop posting every day. It's not helping beginners grow."
   Example: "Posting more is not the answer. Here's what actually is."

9. THE TRANSFORMATION REVEAL — Show the before/after gap without being braggy.
   Works because: People invest in people who have walked the path. Specificity makes it credible.
   Example: "6 months ago I was scared to even open Instagram. This month someone bought my digital product."

10. THE OPEN QUESTION HOOK — Ask one specific, relatable question to your audience.
    Works because: Questions get comments. Comments boost reach. Simple and powerful.
    Example: "Has anyone else ever felt too old to start something new on social media?"

═══════════════════════════════════
FORMAT PRINCIPLES THAT MATTER IN 2025
═══════════════════════════════════
- Reels: First 1–3 seconds decide everything. The hook must work as a text overlay AND as a spoken line
- Carousels: First slide is the hook. Make it bold enough to earn the swipe with no context
- Captions: Under 150 characters before the "more" cut. The hook must live in that space
- No hype. No exaggerated numbers. No performative excitement.
- Short sentences. One idea per line. Natural breathing rhythm.
- End with one question or a soft CTA to get comments

═══════════════════════════════════
SCORING CRITERIA
═══════════════════════════════════
Score these 4 dimensions honestly for a 45–65 beginner Instagram audience:
- Clarity: Is it immediately understandable with no effort?
- Specificity: Does it have a concrete detail, moment, number, or name that makes it real?
- Strength: Would it stop a tired 57-year-old scrolling after a long day?
- Audience Match: Does it speak directly to the fears, hopes, and language of this specific person?

═══════════════════════════════════
YOUR RULES
═══════════════════════════════════
- No hype, no clickbait, no emojis in the hook variations
- No mentions of any platform other than Instagram
- Speak warmly — this audience responds to kindness, not urgency
- Be honest in your verdict — real feedback helps more than compliments
- Keep your full response under 400 words
- Output ONLY valid JSON, no other text, matching this exact structure:

{
  "scores": {
    "clarity": <number 1-10>,
    "specificity": <number 1-10>,
    "strength": <number 1-10>,
    "audienceMatch": <number 1-10>
  },
  "verdict": "<one honest, warm sentence — what is working and what is missing>",
  "hookType": "<name the pattern this hook most resembles from: Vulnerable Moment, Age Callout, Confession, First Win, Nobody Tells You, Permission, POV, Pattern Interrupt, Transformation Reveal, Open Question>",
  "variations": {
    "clear": "<plain and direct — short, conversational, easy to read aloud>",
    "curious": "<opens a story loop — makes someone need to know what happens next, no clickbait>",
    "toneMatched": "<uses the requested tone and story framework — personal, warm, matched to a 45-65 Instagram beginner>"
  },
  "why": "<2-3 sentences explaining specifically why these variations work better for this audience on Instagram in 2025>",
  "proTip": "<one specific, actionable Instagram tip for this hook — e.g. 'Use this as your first Reel text overlay' or 'Add this to your carousel slide 1 with a close-up face photo'>"
}`;

export async function POST(request: Request) {
    try {
        const { hook, tone, storyFramework, expansionType } = await request.json();

        if (!hook?.trim()) {
            return NextResponse.json({ error: 'Hook text is required.' }, { status: 400 });
        }

        // ── Freemium gate ──────────────────────────────────────────────────────
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        let runsUsed = 0;
        let plan = 'free';

        if (user) {
            // Fetch the user's plan
            const { data: profile } = await supabase
                .from('profiles')
                .select('plan')
                .eq('id', user.id)
                .single();

            plan = profile?.plan ?? 'free';

            if (expansionType && plan !== 'elite') {
                return NextResponse.json({ error: 'Elite plan required for expansions.' }, { status: 403 });
            }

            // Paid plans have unlimited access
            if (!PAID_PLANS.includes(plan)) {
                const { count } = await supabase
                    .from('tool_outputs')
                    .select('id', { count: 'exact', head: true })
                    .eq('user_id', user.id)
                    .eq('tool_slug', TOOL_SLUG);

                runsUsed = count ?? 0;

                if (runsUsed >= FREE_RUN_LIMIT) {
                    return NextResponse.json(
                        { limitReached: true, runsUsed, limit: FREE_RUN_LIMIT, plan },
                        { status: 402 }
                    );
                }
            }
        } else {
            return NextResponse.json(
                { limitReached: true, runsUsed: 0, limit: FREE_RUN_LIMIT, plan: 'guest' },
                { status: 402 }
            );
        }
        // ── End gate ───────────────────────────────────────────────────────────

        let userMessage = `Draft Hook: "${hook}"
Desired Tone: ${tone}
Story Framework: ${storyFramework}

Analyze this Instagram hook for a beginner audience (ages 45–65) using your deep knowledge of what performs on Instagram in 2025. Return your response as JSON only.`;

        if (expansionType === 'reelScript') {
            userMessage += `\n\nElite Expansion Task: Also generate a full 30-45 second Reel script. Include visual instructions and a call to action. Return this in a new "expansion" field.`;
        } else if (expansionType === 'carouselPlan') {
            userMessage += `\n\nElite Expansion Task: Also generate a 7-slide Carousel plan with Slide titles and caption pointers. Return this in a new "expansion" field.`;
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT + `\n\nIf expansion requested, include an "expansion" field (string with markdown formatting).` },
                    { role: 'user', content: userMessage },
                ],
                temperature: 0.75,
                max_tokens: 1200,
                response_format: { type: 'json_object' },
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            console.error('OpenAI error:', err);
            return NextResponse.json({ error: 'AI analysis failed. Please try again.' }, { status: 500 });
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (!content) return NextResponse.json({ error: 'No response from AI.' }, { status: 500 });
        const parsed = JSON.parse(content);

        // Save run to tool_outputs
        if (user && !PAID_PLANS.includes(plan)) {
            await supabase.from('tool_outputs').insert({
                user_id: user.id,
                tool_slug: TOOL_SLUG,
                input_text: hook,
                output_text: JSON.stringify(parsed),
            });
        }

        return NextResponse.json({ ...parsed, runsUsed: runsUsed + 1, limit: FREE_RUN_LIMIT, plan });
    } catch (err) {
        console.error('Hook analyzer error:', err);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}
