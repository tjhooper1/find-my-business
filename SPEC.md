# Find My Business — Product & Technical Spec

**Status:** Draft v0.2 · **Date:** 2026-10-17

## 0. Decisions Made

| Topic | Decision | Implication |
|---|---|---|
| Market | **US-only** at launch | USD, US regulations (FTC, CAN-SPAM, CCPA); GDPR consent flow can wait, but keep the cookie banner simple and extensible |
| Tone | **Playful** | Friendly copy, memorable archetype names, light humor; keep income/legal content plainly worded |
| Accounts | **Anonymous + email**, no accounts | Results retrievable via emailed link; accounts stay out of scope |
| Team | **Solo build** | Favor boring tech, data-as-files, static rendering; timelines in §16 stretched accordingly |
| Business scope | **Online and local/trades** | Catalog needs location/physical-ops fields and hard constraints for both |
| Paid report | **Deferred; full report is always free** | No paywall on results; monetize via affiliates and ads only |
| Owner validation | **Not now** | Calibrate via beta-user feedback ratings instead (§8) |
| Affiliate stance | **No MLM or high-risk categories** initially | Written partner policy in §9.4 |

---

## 1. Summary

A web app that helps people figure out what kind of business they would enjoy starting. Users complete an assessment about their behavior, temperament, motivations and (optionally) skills. We build a profile, match it against a curated catalog of business types, and show a ranked list with plain-language explanations of *why* each fits. Each result leads to a "how to get started" page that is the primary monetization surface (affiliate links, courses, tools), with display ads as a secondary layer.

**Core promise:** "Stop guessing. Find the business that fits who you actually are."

---

## 2. Goals & Non-Goals

### Goals
- Deliver a result in under ~10 minutes that feels personal, accurate and surprising-in-a-good-way.
- Explain every match (transparent reasoning builds trust and shareability).
- Convert result-page visitors into clicks on genuinely useful starter resources.
- Build an SEO moat: a content page per business type and per personality archetype.
- Collect an email list (the most durable asset in this kind of business).

### Non-Goals (v1)
- Business plan generation, legal/financial advice, or ongoing coaching.
- A marketplace or community.
- Claiming scientific/clinical validity of the assessment. We are a guide, not a diagnostic.

---

## 3. Target Users

| Segment | Description | Needs |
|---|---|---|
| **Escape-the-job** | Employed, burned out, wants out | Low-risk side-hustle path, realistic income expectations |
| **Aspiring but stuck** | Wants to start something, doesn't know what | Ideas and permission to commit |
| **Career changers / laid off** | Have skills, need a new direction | Skill-leveraging options, speed to revenue |
| **Students / young adults** | Little capital or experience | Cheap-to-start options, learning paths |
| **Retirees / side-income seekers** | Time, some capital, low ambition for scale | Lifestyle businesses |

Primary v1 audience: **escape-the-job + aspiring-but-stuck** (largest search volume, strongest purchase intent for courses/tools).

---

## 4. Product Decision: Personality vs. Skills Matching

You asked for my opinion on offering both modes. **Yes, but not as two separate products, and not as a toggle up front.**

**Recommendation: personality is the core engine; skills are a second-stage lens.**

- **Personality/temperament drives fit and satisfaction.** It determines whether you'll *enjoy* and *persist* in the business. This is the differentiator and the shareable "aha."
- **Skills determine time-to-first-dollar and learning cost.** They are a modifier, not the basis of a match.
- Everyone sees personality-based results first. After results, a **"Match mode" switch** on the results page lets users re-rank:
  - **Best fit for me (personality only)** — default, "out of the box"
  - **Fit + what I can already do** — boosts businesses where existing skills cut the learning curve
  - **Fit + willing to learn** — shows the personality-best options and labels the skill gaps with a learning plan (this is the affiliate-course sweet spot)

Why this ordering:
1. Asking for skills first adds friction and anchors people to their old career, which is exactly what "escape-the-job" users want to get away from.
2. The "willing to learn" mode turns skill gaps into a monetizable, honest next step instead of a disqualifier.
3. It lets us collect skills data *after* the user is invested, when completion rates are higher.

Each result shows two scores: **Fit** (personality) and **Readiness** (skills/resources). Showing them separately is more honest than one blended number.

---

## 5. User Flow

1. **Landing page** — value prop, social proof, "Start (free, ~8 min)" CTA. No signup required.
2. **Assessment** — progressive, one-question-per-screen (or small groups), progress bar, save-and-resume via local storage.
3. **Practical constraints** (short): starting budget, weekly hours, income timeline, risk tolerance, solo vs. team, location flexibility.
4. **Email gate (soft)** — "Where should we send your results?" shown *after* the profile is computed, with a teaser of the top match. Offer skip-with-limited-view vs. email-for-full-report. Do not gate before the quiz (kills completion).
5. **Results** — personality profile summary, top ~5 matches with fit scores and reasons, "also consider" and "avoid for now" lists.
6. **Match mode switch** (skills lens, see §4) with optional skills questionnaire.
7. **Business detail page** — what it is, a day in the life, startup cost, time to first revenue, income range with honest caveats, skills needed, first 5 steps, recommended resources (monetized).
8. **Follow-up** — emailed report, 3–5 email nurture sequence, ability to retake.

---

## 6. Assessment Design

This is the heart of the product; get it right and everything else follows.

### 6.1 Psychological foundation
- Base the model on **Big Five (OCEAN)**, ideally via the public-domain **IPIP** item pool (e.g. IPIP-NEO short forms). It is the best-validated trait model and free to use.
- **Do not use MBTI/16Personalities names or branding** (trademark, weak validity). We can still present friendly archetypes of our own.
- Add entrepreneurship-relevant dimensions that the Big Five misses (each 3–5 items, self-authored, validated against our own outcome data over time):
  - **Risk tolerance** (financial and social)
  - **Autonomy need**
  - **Preference for people vs. things vs. ideas** (Holland/RIASEC-style interest model, also public domain concepts)
  - **Structure vs. improvisation**
  - **Energy source** (solo deep work vs. social)
  - **Sales/promotion comfort**
  - **Delayed gratification / persistence**
  - **Motivation drivers** (freedom, money, impact, mastery, status, security)
  - **Work rhythm** (steady daily output vs. bursts vs. deadline-driven)

### 6.2 Question formats
- Likert (5-point) for traits — fast, reliable.
- **Scenario/forced-choice** questions ("A client emails at 9pm with an urgent request. You…") to reduce social-desirability bias, which is severe in self-assessment of entrepreneurial traits.
- A few **ranking/allocation** questions (e.g. "distribute 10 points across what you want from work").
- Mix in reverse-scored items and a small number of consistency checks.

### 6.3 Length
- Target **40–60 questions**, ~8–10 minutes. Anything beyond ~12 minutes sharply hurts completion.
- Consider an **adaptive** approach later: stop early on dimensions where the answer is already clear.

### 6.4 Skills & experience module (optional)
- Select from a structured taxonomy (e.g. ~60 skills across: writing, design, sales, technical, trades, teaching, finance, hospitality, physical/outdoor, analytical, etc.) with self-rated level (none / some / strong).
- Plus past-industry and "things people ask me for help with" free tags.
- Map to **O*NET** skill/work-activity data where useful (free US Dept. of Labor dataset) rather than inventing a taxonomy.

### 6.5 Quality & ethics
- Plain-language disclaimer: for self-reflection and entertainment, not professional advice.
- Avoid deterministic framing ("you ARE a…"). Use "you tend to…".
- Review wording for reading level (target ~8th grade) and cultural neutrality.

---

## 7. Business Catalog

A curated dataset, **maintained by us**, is the real IP. Start with **40–60 well-researched business types** rather than hundreds of thin ones.

### 7.1 Per-business attributes
| Group | Fields |
|---|---|
| Identity | name, slug, short description, category, example niches |
| Trait affinity | target vector across the same dimensions as the assessment (see §8), each 0–1 with a weight |
| Economics | startup cost range, time to first revenue, realistic income range at 12 months, scalability, recurring vs. one-off revenue |
| Operations | solo-friendly, hours flexibility, location dependence, physical vs. digital, client-facing level |
| Skills | required skills (with level), nice-to-have, learning time estimate |
| Content | day-in-the-life, pros/cons, common mistakes, first steps, FAQs |
| Monetization | linked resources (affiliate), with category + disclosure flag |
| Meta | sources, last-reviewed date, reviewer |

### 7.2 Example starter categories
Freelance services (writing, design, dev, VA, bookkeeping), agency/productized services, local services (cleaning, lawn, pressure washing, mobile detailing), trades, e-commerce (print-on-demand, dropshipping, niche stores), content/creator (newsletter, YouTube, podcast), digital products & courses, coaching/consulting, SaaS/micro-SaaS, real estate-adjacent (short-term-rental management), food (cottage food, catering), childcare/pet care, repair/refurbishing & resale. Excluded for now: franchises, MLM, crypto/trading, and anything else in the high-risk list in §9.4.

### 7.3 Data integrity
- Income and cost claims must be sourced and given as **ranges with caveats**. Overpromising income is both an ethical and a legal (FTC) problem, and destroys trust.
- Each record has an owner and a "last reviewed" date; flag anything older than 12 months.
- Store the catalog as structured data in the repo (JSON/YAML or DB seed) so it is versioned and reviewable.

---

## 8. Matching Algorithm

Keep it explainable and tunable. No ML in v1.

1. **Profile vector** `u`: normalized scores (0–1) per dimension from the assessment.
2. **Business target vector** `b` with per-dimension **importance weights** `w` (some dimensions matter a lot for some businesses, e.g. sales comfort for agency owner, little for newsletter writer).
3. **Fit score** = `1 − weighted_distance(u, b, w)`, scaled to 0–100. Weighted Euclidean or cosine similarity; start with weighted distance since it handles "a little too much of a good trait" better with optional penalty asymmetry.
4. **Hard constraints (filters, not scores):** budget below minimum, hours/week far below needed, no location flexibility for a location-bound business, etc. Filtered businesses move to an "not right now" list with the reason, which is useful feedback and honest.
5. **Readiness score** (second lens): skills coverage vs. required skills, minus learning-time penalty; incorporate budget and time headroom.
6. **Final ranking** depends on match mode (§4): `fit` only, `fit * (0.6 + 0.4 * readiness)`, or fit plus a learning-plan annotation.
7. **Explanations:** for each match, pick the top 2–3 dimensions contributing most to fit and the top 1–2 mismatches, and render them from templates ("You scored high on autonomy and low on need for structure, which suits freelance work where you set your own schedule.").
8. **Diversity pass:** avoid five near-identical results (e.g. three flavors of freelancing). Cluster by category and show the best of each cluster in the top list.

### Calibration plan
- Hand-author initial target vectors with domain reasoning, grounded in O*NET and published research. Real owner validation is deferred, so treat v1 vectors as hypotheses and say so internally.
- Sanity-test with friends/beta users: do the top results feel right to people who know them? Revisit owner validation once there's traffic (a post-result "I already run a business like this" opt-in question would collect it passively).
- After launch, collect "How well does this fit?" ratings per match; use them to adjust weights.
- Keep a regression test suite of persona profiles → expected top matches so tuning doesn't silently break things.

---

## 9. Monetization

### 9.1 Primary: affiliate and partner offers
- Placed on business detail pages and in the post-result email sequence, **aligned to the user's stated skill gaps and stage**.
- Categories: courses (Udemy, Skillshare, Coursera, niche creators), tools (Shopify, Wix, Squarespace, ConvertKit, QuickBooks, Canva), business formation (LegalZoom, Incfile), web hosting, equipment/starter kits (Amazon Associates), freelance platforms.
- Prefer programs with **recurring commissions and high payouts** (SaaS, hosting, email tools) over low-payout retail.
- Direct partnerships with course creators later (higher rev share, exclusivity, co-branded content).

### 9.2 Secondary: display ads
- Apply to a premium network (Mediavine / Raptive) once traffic thresholds are met (roughly 50k sessions/month for Mediavine; Raptive ~100k pageviews). Before that, ads yield little and hurt UX; skip them at launch.
- Keep ads off the assessment itself (distraction and trust).

### 9.3 Later options
- Email newsletter sponsorships.
- Lead-gen for franchises/lenders/accountants (regulated, high value; handle carefully).
- Premium cohort/coaching marketplace.

### 9.4 Guardrails
- **Disclose affiliate relationships clearly** (FTC Endorsement Guides). Put a disclosure near every affiliate link and on a dedicated page.
- Recommend only things we'd actually recommend. A single "get rich quick" or scammy course tanks the brand. Maintain a vetting checklist for partners.
- Business-opportunity / franchise offers have extra regulation (FTC Franchise Rule, state laws). Avoid in v1.
- **Partner policy (v1):** no MLM/direct-sales, crypto or trading, "guaranteed income" or get-rich-quick courses, gambling, or loans/high-interest financial products. Written down before signing any partner, and applied to ads too (use network category blocks).
- **The report is free.** No paywall on results or the emailed report.
- Recommendations should never be *determined* by payout; match logic is separate from monetization logic. Resources get attached to a business after matching.

---

## 10. Content & SEO Strategy

Organic search is the cheapest acquisition channel and the core of the business model.

- **One page per business type** ("How to start a [business]: is it right for you?") with a CTA into the quiz.
- **Programmatic personality pages:** "Best businesses for introverts / high-risk-takers / people who hate sales / people with a full-time job."
- **Comparison and listicle content** ("12 low-cost businesses you can start this weekend").
- **Shareable result cards** (OG images with archetype name + top match) to drive social/viral loops.
- Keep an editorial calendar; fresh, helpful, honest content is the long-term asset.
- Technical SEO: fast static rendering, structured data (FAQ, HowTo, Article), sitemap, clean URLs.

---

## 11. Functional Requirements

### Must have (MVP)
- Landing page, assessment engine, results page, business detail pages.
- Anonymous session with local-storage save/resume; no account required.
- Email capture with double opt-in and unsubscribe.
- Matching engine (§8) with explanations and hard-constraint filters.
- Personality-first results with match mode switch (§4).
- Affiliate link component with disclosure; click tracking.
- Admin/content tooling: edit catalog data (even if via files + PR in v1).
- Legal pages: privacy policy, terms, affiliate disclosure, cookie consent.
- Analytics (funnel events, see §14).
- Mobile-first responsive design; accessible (WCAG 2.1 AA).

### Should have
- Emailed link to revisit/retake results (stands in for accounts).
- Emailed PDF/HTML report.
- Social share cards.
- Per-match "rate this" feedback.
- A/B testing for question wording, CTAs, gate placement.

### Could have (later)
- Adaptive assessment, multi-language, A/B-tested archetype branding.
- AI-generated personalized "first 30 days" plan (guardrailed and grounded in catalog data).
- Community, partner dashboard, user accounts.

---

## 12. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Performance | LCP < 2.5s on mobile 4G; pages statically rendered where possible |
| Availability | 99.5%+; the quiz must work even if the backend is degraded (compute client-side) |
| Privacy | Minimal PII; personality data treated as sensitive; see §13 |
| Security | HTTPS, CSP, rate limiting, input validation, secrets management |
| Accessibility | WCAG 2.1 AA; keyboard navigable; no color-only signals |
| SEO | SSR/SSG, structured data, Core Web Vitals pass |
| Scalability | Traffic is spiky (viral/SEO); serve static + edge-cached, DB writes are light |
| Maintainability | Catalog and questions are data, not code; typed schemas validated in CI |

---

## 13. Privacy, Legal & Compliance

- **Data:** personality and financial-situation answers are sensitive. Store minimum necessary; separate email from answers where feasible; make deletion easy.
- **Regulations:** GDPR/UK GDPR (consent, access, deletion), CCPA/CPRA (opt-out of sale/sharing; affiliate and ad cookies count), CAN-SPAM, COPPA (set 18+ or 13+ policy explicitly).
- **Consent management:** cookie banner (CMP) required before ad/affiliate tracking for EU/UK traffic.
- **Claims:** no guaranteed outcomes, income ranges are illustrative, "not financial/legal advice" disclaimers.
- **Trademark:** avoid MBTI, DISC, StrengthsFinder, Enneagram branded names.
- **Third-party datasets:** verify licenses (IPIP is public domain; O*NET is CC-BY).
- **Terms of affiliate programs:** many ban certain placements, cookie stuffing, or require approval; review each program's terms.

---

## 14. Analytics & Success Metrics

**Funnel events:** landing view → quiz start → % complete by question (find drop-off) → results view → email submit → business page view → affiliate click → (affiliate conversion from partner dashboards).

| Metric | Initial target |
|---|---|
| Quiz start rate (landing visitors) | > 35% |
| Quiz completion rate | > 65% |
| Email capture (of completers) | > 30% |
| Results → business detail page | > 60% |
| Affiliate CTR from detail pages | > 5% |
| Match satisfaction ("this fits me") | > 4.0 / 5 |
| Revenue per completed quiz (RPQ) | track; the key unit-economics number |

Also track: email open/click rates, retake rate, share rate, top-matched businesses (informs content), and mismatch feedback.

---

## 15. Technical Approach

### 15.1 Recommended stack (optimized for SEO, low cost, small team)
- **Frontend/framework:** Next.js (App Router) + TypeScript + Tailwind. SSG/ISR for content and business pages, client-side quiz state.
- **Scoring engine:** pure TypeScript module, shared between client and server, fully unit-tested. Runs client-side so the quiz works instantly and offline-ish.
- **Data:** catalog and question bank as typed JSON/YAML (or MDX for long-form content) in the repo, validated with Zod in CI. Database only for dynamic data.
- **Database:** Postgres (Supabase or Neon) for sessions, results, emails, feedback, click events.
- **Auth:** none in v1. Results are retrieved via an unguessable result ID in the emailed link.
- **Email:** Resend/Postmark for transactional, ConvertKit/Beehiiv/Mailchimp for newsletter and sequences.
- **Hosting:** Vercel or Cloudflare Pages. CDN edge caching.
- **Analytics:** Plausible/PostHog (privacy-friendlier, funnels, A/B flags), plus affiliate network dashboards.
- **Affiliate link management:** internal redirect route (`/go/<partner>/<slug>`) that logs clicks, applies disclosure, lets us swap links without editing content.
- **CMS (optional):** start with MDX in repo; move to Sanity/Contentful if non-devs will author.

### 15.2 Architecture sketch
```
Browser ── Next.js (SSG pages + quiz SPA)
            │  scoring engine (TS, client-side)
            │
            ├── /api/results   → store anonymized result + optional email
            ├── /api/feedback  → match ratings
            ├── /go/*          → affiliate redirect + click log
            └── Postgres       → sessions, results, emails, clicks, feedback
Email provider  ←  webhook/subscribe
Analytics       ←  client events
```

### 15.3 Key data models (simplified)
- `Question { id, dimension, type, text, options, reverse, weight }`
- `Business { slug, name, targetVector, weights, constraints, skills[], economics, content, resources[] }`
- `Resource { id, partner, type, url, disclosure, tags[], skillTags[], priority }`
- `Result { id, createdAt, profileVector, answers?, constraints, topMatches[], mode }`
- `Subscriber { email, consent, source, resultId }`
- `ClickEvent { resultId?, resourceId, page, ts }`

### 15.4 AI usage (optional, deliberately limited)
- Use an LLM to **draft** catalog content and personalized explanation text, with human review before publishing.
- Possible later feature: a grounded "ask about this business" chat or a generated 30-day plan using only catalog facts. Keep it off the critical path; avoid hallucinated income or legal claims.

---

## 16. Rollout Plan

| Phase | Scope | Exit criteria |
|---|---|---|
| **0 — Research** (1–2 wks) | Finalize dimensions, draft 50 questions, pick 25 businesses, research economics, shortlist affiliate programs | Reviewed question bank + catalog v0 |
| **1 — MVP** (4–6 wks) | Quiz, scoring engine, results, 25 business pages, email capture, disclosure/legal pages, analytics | 30 beta users complete quiz, avg fit rating ≥ 3.8 |
| **2 — Launch & monetize** (3–4 wks) | Affiliate integrations, redirect tracking, email sequences, share cards, SEO content for top 25 businesses | First affiliate revenue; funnel metrics measured |
| **3 — Grow** (ongoing) | Expand to 50+ businesses, skills mode refinement, programmatic SEO pages, A/B tests, accounts | Sustained organic traffic growth; RPQ rising |
| **4 — Scale revenue** | Ads at traffic threshold, newsletter sponsorships | Revenue diversified |

*Solo build: treat the week estimates as optimistic. Phase 0 content work (questions, 25 catalog entries) is likely the longest pole, and scope should be cut before dates are pushed. Use an LLM to draft content, with your review.*

---

## 17. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Quiz feels generic / "horoscope-y" | Scenario questions, specific explanations, real calibration against actual business owners |
| Low completion | Short, progressive, mobile-first; test question count; delay email gate |
| Slow SEO ramp | Launch content early; pursue social/viral share cards, Reddit/communities, newsletters for initial traffic |
| Affiliate revenue too low | Focus on high-payout categories; track RPQ; direct partnerships; newsletter sponsorships |
| Trust damage from bad recommendations | Vetting checklist, honest income ranges, no payout-driven matching |
| Legal exposure (income claims, disclosure) | Conservative language, clear FTC disclosures, legal review of terms/privacy |
| Solo-builder bandwidth (content + code) | Narrow MVP to 25 businesses; LLM-drafted content with human review; data-as-files; no accounts |
| Unvalidated trait vectors | Beta feedback ratings; persona regression tests; passive owner opt-in later |
| Catalog goes stale | Owner + review date per record, CI warnings on staleness |
| Affiliate programs reject or ban us | Diversify partners; read each program's ToS; maintain own email list |
| Data privacy incident | Data minimization, encrypted storage, deletion tooling |
| Competition from free AI chat ("what business should I start?") | Differentiate on validated assessment, curated data, structured journey, and trusted content, not on generation |

---

## 18. Open Questions

Resolved questions are recorded in §0. Remaining:

1. **Brand name** and domain (playful tone chosen; name still needed).
2. **Archetype names:** how many (6–12 is typical) and what voice.
3. **Initial 25 businesses:** final list, balanced across online and local/trades.
4. **Traffic plan:** which channel first (SEO, Reddit, TikTok/short video, newsletters)?
5. **Email provider** choice and affiliate networks to apply to first (e.g. Impact, ShareASale/Awin, PartnerStack, direct SaaS programs).
6. **Age policy:** 18+ only is simplest for a business-starting audience.

---

## 19. Suggested Next Steps

1. Pick the brand name/domain and resolve the open questions above.
2. Draft the dimension list and first-pass question bank (§6).
3. Pick the first 25 businesses and fill out the catalog schema (§7) for 3 as a pilot.
4. Prototype the scoring engine and persona regression tests in TypeScript before building any UI. It's the riskiest piece and cheap to validate.
5. Scaffold the Next.js project and wire up the quiz → results flow with the pilot data.
