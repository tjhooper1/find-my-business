# Matching engine

Pure TypeScript, no runtime dependencies. Runs client-side in the app (SPEC §15).

```
src/
  types.ts            dimension ids and all shared types
  data/dimensions.ts  16 dimensions + skills taxonomy
  data/questions.ts   48 Likert + 12 scenario questions, constraint questions
  data/businesses.ts  business catalog with trait targets
  profile.ts          answers → 0–1 score per dimension
  match.ts            profile + constraints → ranked, explained matches
tests/
  personas.ts         archetype profiles with expected/forbidden matches
```

```sh
npm test            # data validation, scoring, persona regression suite
npm run typecheck
npm run personas    # print every persona's top matches with reasons
```

## How matching works

- **Profile:** each Likert answer (normalized, reverse-keyed where needed) and each scenario signal counts as evidence for a dimension. A dimension's score is the mean of its evidence, defaulting to 0.5.
- **Fit (0–100):** weighted RMS distance between the profile and the business's `[target, weight]` traits, mapped linearly to 0–100 (0.6 distance = 0).
  - *Asymmetric:* overshooting a capacity trait (grit, steadiness, hustle) costs less than falling short. Each dimension's `overFactor` controls this.
  - *Implicit neutral:* dimensions a business doesn't list are compared to 0.5 at weight 0.4. Otherwise sparsely specified businesses would fit everyone.
- **Hard constraints** (budget, hours, in-person, physical) move a business to `notRightNow` with reasons. A slow time-to-revenue gives a warning and a 0.85× rank penalty.
- **Modes:** `fit` (default), `fit+skills` (rank × (0.6 + 0.4 × readiness)), `fit+learn` (fit order, with skill gaps listed).
- **Diversity:** at most 2 top-5 slots per category.

## Tuning workflow

1. Change trait targets in `businesses.ts` or constants in `match.ts`.
2. Run `npm run personas` and read the results as a user would.
3. Run `npm test`. When a result is clearly right or wrong, add it to `tests/personas.ts`.
