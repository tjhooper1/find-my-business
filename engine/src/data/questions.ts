import type { Constraints, LikertQuestion, Question, ScenarioQuestion } from "../types";

// Likert items: 1 = strongly disagree … 5 = strongly agree.
// Three per dimension, at least one reverse-keyed, written in-house around the
// constructs (Big Five items are modeled on IPIP concepts, not copied).
export const LIKERT: LikertQuestion[] = [
  // Curiosity
  { id: "open1", kind: "likert", dimension: "open", text: "I get a little thrill from trying something I've never done before." },
  { id: "open2", kind: "likert", dimension: "open", text: "I'm always reading, watching or tinkering with some new idea." },
  { id: "open3", kind: "likert", dimension: "open", reverse: true, text: "If it isn't broken, I don't see the point in doing it differently." },
  // Follow-through
  { id: "consc1", kind: "likert", dimension: "consc", text: "When I say I'll do something, it gets done, usually early." },
  { id: "consc2", kind: "likert", dimension: "consc", text: "I keep lists, calendars or systems so nothing slips through the cracks." },
  { id: "consc3", kind: "likert", dimension: "consc", reverse: true, text: "I have a graveyard of half-finished projects." },
  // Social energy
  { id: "extra1", kind: "likert", dimension: "extra", text: "A day full of conversations leaves me buzzing, not drained." },
  { id: "extra2", kind: "likert", dimension: "extra", text: "I'll happily strike up a chat with a stranger." },
  { id: "extra3", kind: "likert", dimension: "extra", reverse: true, text: "My ideal workday is headphones on, door closed, nobody needing me." },
  // Warmth
  { id: "agree1", kind: "likert", dimension: "agree", text: "I'd rather keep the peace than win an argument." },
  { id: "agree2", kind: "likert", dimension: "agree", text: "People tend to tell me their problems." },
  { id: "agree3", kind: "likert", dimension: "agree", reverse: true, text: "I have no trouble telling someone their idea is bad." },
  // Steadiness
  { id: "stab1", kind: "likert", dimension: "stab", text: "When plans fall apart, I'm usually the calm one in the room." },
  { id: "stab2", kind: "likert", dimension: "stab", text: "A bad review or harsh comment rolls off me pretty quickly." },
  { id: "stab3", kind: "likert", dimension: "stab", reverse: true, text: "Uncertainty about money keeps me up at night." },
  // Risk appetite
  { id: "risk1", kind: "likert", dimension: "risk", text: "I'd bet on myself even if it meant giving up a steady paycheck." },
  { id: "risk2", kind: "likert", dimension: "risk", text: "Putting real money into an unproven idea sounds exciting, not scary." },
  { id: "risk3", kind: "likert", dimension: "risk", reverse: true, text: "I like to have a safety net before I try anything big." },
  // Independence
  { id: "auton1", kind: "likert", dimension: "auton", text: "Being told how to do my job is one of my least favorite things." },
  { id: "auton2", kind: "likert", dimension: "auton", text: "I want my name on it. My vision, my rules." },
  { id: "auton3", kind: "likert", dimension: "auton", reverse: true, text: "I'm happiest when someone else sets the goal and I execute it well." },
  // Love of routine
  { id: "struct1", kind: "likert", dimension: "struct", text: "I love a good checklist and a predictable week." },
  { id: "struct2", kind: "likert", dimension: "struct", text: "Doing the same task well, over and over, is satisfying to me." },
  { id: "struct3", kind: "likert", dimension: "struct", reverse: true, text: "If every day looked the same, I'd go stir-crazy." },
  // Hustle
  { id: "sales1", kind: "likert", dimension: "sales", text: "I could pitch something I believe in to a room full of strangers." },
  { id: "sales2", kind: "likert", dimension: "sales", text: "Asking someone for money in exchange for my work feels natural." },
  { id: "sales3", kind: "likert", dimension: "sales", reverse: true, text: "Self-promotion makes me want to crawl under a rock." },
  // Grit
  { id: "persist1", kind: "likert", dimension: "persist", text: "I can stick with something for a year before it pays off." },
  { id: "persist2", kind: "likert", dimension: "persist", text: "Rejection makes me more determined, not less." },
  { id: "persist3", kind: "likert", dimension: "persist", reverse: true, text: "If I don't see results in a few weeks, I lose interest." },
  // Hands-on
  { id: "hands1", kind: "likert", dimension: "hands", text: "I'd rather fix, build or make something than write about it." },
  { id: "hands2", kind: "likert", dimension: "hands", text: "Getting dirty or sweaty at work doesn't bother me." },
  { id: "hands3", kind: "likert", dimension: "hands", reverse: true, text: "Give me a laptop and a coffee shop over a workshop any day." },
  // Puzzle-solving
  { id: "analyt1", kind: "likert", dimension: "analyt", text: "I enjoy figuring out why something works, or why it doesn't." },
  { id: "analyt2", kind: "likert", dimension: "analyt", text: "Spreadsheets, numbers and systems are oddly fun for me." },
  { id: "analyt3", kind: "likert", dimension: "analyt", reverse: true, text: "Overthinking is a waste of time. I'd rather just start." },
  // Creative streak
  { id: "creat1", kind: "likert", dimension: "creat", text: "I need a creative outlet or I get restless." },
  { id: "creat2", kind: "likert", dimension: "creat", text: "People compliment my taste in design, style or aesthetics." },
  { id: "creat3", kind: "likert", dimension: "creat", reverse: true, text: "I care more about whether something works than how it looks." },
  // Helper
  { id: "help1", kind: "likert", dimension: "help", text: "Watching someone 'get it' because I helped them is the best feeling." },
  { id: "help2", kind: "likert", dimension: "help", text: "I'm the friend people call when they need advice or a hand." },
  { id: "help3", kind: "likert", dimension: "help", reverse: true, text: "I'd rather solve a technical problem than a people problem." },
  // Ambition
  { id: "scale1", kind: "likert", dimension: "scale", text: "I want to build something that could one day employ lots of people." },
  { id: "scale2", kind: "likert", dimension: "scale", text: "I'd trade a few years of chaos for a shot at something huge." },
  { id: "scale3", kind: "likert", dimension: "scale", reverse: true, text: "Enough income and plenty of free time beats an empire." },
  // Spotlight
  { id: "visib1", kind: "likert", dimension: "visib", text: "Being on camera or on stage sounds fun to me." },
  { id: "visib2", kind: "likert", dimension: "visib", text: "I'd be fine with strangers on the internet knowing my face and name." },
  { id: "visib3", kind: "likert", dimension: "visib", reverse: true, text: "I'd much rather be the person behind the curtain." },
];

// Scenario items reduce "I'm a hardworking risk-taker!" self-flattery by
// making every option sound reasonable.
export const SCENARIOS: ScenarioQuestion[] = [
  {
    id: "sc_saturday",
    kind: "scenario",
    text: "You have a free Saturday with nothing planned. You're most likely to…",
    options: [
      { id: "a", text: "Build, fix or garden something", signals: { hands: 0.9, creat: 0.5, extra: 0.35 } },
      { id: "b", text: "Go deep on a new hobby or rabbit hole online", signals: { open: 0.85, analyt: 0.75, extra: 0.2 } },
      { id: "c", text: "Get a group together and do something social", signals: { extra: 0.9, help: 0.6 } },
      { id: "d", text: "Make something: art, music, a recipe, a video", signals: { creat: 0.9, open: 0.7 } },
    ],
  },
  {
    id: "sc_client",
    kind: "scenario",
    text: "A client emails at 9pm: \"Urgent! Can you fix this tonight?\" You…",
    options: [
      { id: "a", text: "Jump on it. Happy clients are everything.", signals: { agree: 0.85, help: 0.75, struct: 0.35 } },
      { id: "b", text: "Reply kindly that you'll handle it first thing tomorrow.", signals: { consc: 0.7, struct: 0.75, agree: 0.5 } },
      { id: "c", text: "Fix it, then send a quote for rush work next time.", signals: { sales: 0.8, agree: 0.3, scale: 0.65 } },
      { id: "d", text: "Wonder how to set things up so it never comes to you at all.", signals: { analyt: 0.8, scale: 0.8, auton: 0.8 } },
    ],
  },
  {
    id: "sc_windfall",
    kind: "scenario",
    text: "You get a surprise $20,000. You…",
    options: [
      { id: "a", text: "Put it all into launching an idea you've been sitting on", signals: { risk: 0.95, scale: 0.75, persist: 0.6 } },
      { id: "b", text: "Invest some in a side project, save the rest", signals: { risk: 0.55, consc: 0.7 } },
      { id: "c", text: "Save it. That's a cushion, not play money.", signals: { risk: 0.1, struct: 0.7 } },
      { id: "d", text: "Spend it on courses, travel and experiences", signals: { open: 0.85, risk: 0.45 } },
    ],
  },
  {
    id: "sc_party",
    kind: "scenario",
    text: "At a party where you know almost no one, you…",
    options: [
      { id: "a", text: "Work the room. New friends by midnight.", signals: { extra: 0.95, sales: 0.8, visib: 0.7 } },
      { id: "b", text: "Find one or two people and have a real conversation", signals: { extra: 0.5, help: 0.7, agree: 0.7 } },
      { id: "c", text: "Help the host with food and drinks", signals: { help: 0.75, hands: 0.6, extra: 0.35, visib: 0.2 } },
      { id: "d", text: "Make a polite appearance and slip out early", signals: { extra: 0.1, visib: 0.15 } },
    ],
  },
  {
    id: "sc_project",
    kind: "scenario",
    text: "Your boss hands you a project with zero instructions. Your reaction:",
    options: [
      { id: "a", text: "Finally! Freedom to do it my way.", signals: { auton: 0.95, struct: 0.2, open: 0.7 } },
      { id: "b", text: "Fine, but I'll write myself a plan before touching anything.", signals: { consc: 0.85, struct: 0.75, analyt: 0.65 } },
      { id: "c", text: "I'll ask a few questions so I know what 'good' looks like.", signals: { auton: 0.35, agree: 0.65, struct: 0.6 } },
      { id: "d", text: "Dive in and figure it out as I go.", signals: { struct: 0.1, risk: 0.7, stab: 0.75 } },
    ],
  },
  {
    id: "sc_failure",
    kind: "scenario",
    text: "Your first attempt at selling something flops: zero sales in a month. You…",
    options: [
      { id: "a", text: "Dig into what went wrong and try again", signals: { persist: 0.85, analyt: 0.75, stab: 0.7 } },
      { id: "b", text: "Start asking people directly what they'd buy", signals: { sales: 0.75, extra: 0.7, persist: 0.7 } },
      { id: "c", text: "Feel crushed for a bit, then slowly regroup", signals: { stab: 0.3, persist: 0.55 } },
      { id: "d", text: "Move on to a different idea. Life's short.", signals: { persist: 0.15, open: 0.7, risk: 0.6 } },
    ],
  },
  {
    id: "sc_compliment",
    kind: "scenario",
    text: "Which compliment would mean the most to you?",
    options: [
      { id: "a", text: "\"You changed my life.\"", signals: { help: 0.95, agree: 0.7 } },
      { id: "b", text: "\"That's beautiful. You made that?\"", signals: { creat: 0.95, open: 0.7 } },
      { id: "c", text: "\"How did you even figure that out?\"", signals: { analyt: 0.95, open: 0.65 } },
      { id: "d", text: "\"You built all of this?\"", signals: { scale: 0.9, auton: 0.8, risk: 0.7 } },
    ],
  },
  {
    id: "sc_week",
    kind: "scenario",
    text: "Pick the work week that sounds best:",
    options: [
      { id: "a", text: "Same schedule, clear tasks, done by 5", signals: { struct: 0.95, scale: 0.2, risk: 0.2 } },
      { id: "b", text: "Different place and different people every day", signals: { struct: 0.15, extra: 0.8, open: 0.75 } },
      { id: "c", text: "Long focused stretches on one big project", signals: { extra: 0.2, persist: 0.8, analyt: 0.65 } },
      { id: "d", text: "Short bursts of intense work, then lots of freedom", signals: { struct: 0.25, auton: 0.85, scale: 0.35 } },
    ],
  },
  {
    id: "sc_spotlight",
    kind: "scenario",
    text: "Your business could grow faster if you posted videos of yourself every week. You…",
    options: [
      { id: "a", text: "Love it. Already picturing the thumbnails.", signals: { visib: 0.95, sales: 0.75, creat: 0.65 } },
      { id: "b", text: "Would do it, awkwardly, because it works", signals: { visib: 0.55, persist: 0.75 } },
      { id: "c", text: "Would rather hire someone or grow slower", signals: { visib: 0.15, scale: 0.4 } },
      { id: "d", text: "Would post, but never show my face", signals: { visib: 0.3, creat: 0.65 } },
    ],
  },
  {
    id: "sc_money",
    kind: "scenario",
    text: "A customer says your price is too high. You…",
    options: [
      { id: "a", text: "Explain the value and hold your price", signals: { sales: 0.85, stab: 0.75, agree: 0.3 } },
      { id: "b", text: "Offer a discount. Keeping them happy matters.", signals: { agree: 0.85, sales: 0.35 } },
      { id: "c", text: "Wish you didn't have to talk about money at all", signals: { sales: 0.1, stab: 0.35 } },
      { id: "d", text: "Offer a smaller package at a lower price", signals: { analyt: 0.7, sales: 0.65, help: 0.6 } },
    ],
  },
  {
    id: "sc_dream",
    kind: "scenario",
    text: "Five years from now, success looks like…",
    options: [
      { id: "a", text: "A company with a team, an office and big plans", signals: { scale: 0.95, risk: 0.75, extra: 0.6 } },
      { id: "b", text: "Great money from home, mornings free", signals: { scale: 0.35, auton: 0.85, extra: 0.3 } },
      { id: "c", text: "A loved local spot everybody in town knows", signals: { scale: 0.5, help: 0.75, extra: 0.75, hands: 0.6 } },
      { id: "d", text: "Known as the best at my craft", signals: { creat: 0.7, persist: 0.8, consc: 0.75, scale: 0.4 } },
    ],
  },
  {
    id: "sc_problem",
    kind: "scenario",
    text: "Your car makes a weird noise. Your first move:",
    options: [
      { id: "a", text: "Pop the hood and poke around", signals: { hands: 0.95, analyt: 0.65, risk: 0.55 } },
      { id: "b", text: "Search the symptoms and diagnose it online", signals: { analyt: 0.85, hands: 0.4 } },
      { id: "c", text: "Call the mechanic I trust", signals: { hands: 0.15, struct: 0.6 } },
      { id: "d", text: "Turn the music up", signals: { stab: 0.8, consc: 0.2 } },
    ],
  },
];

export const QUESTIONS: Question[] = interleave(LIKERT, SCENARIOS);

/** Spread scenarios through the Likert items so the quiz has variety. */
function interleave(likert: LikertQuestion[], scenarios: ScenarioQuestion[]): Question[] {
  const out: Question[] = [];
  const every = Math.ceil(likert.length / scenarios.length);
  let s = 0;
  likert.forEach((q, i) => {
    out.push(q);
    if ((i + 1) % every === 0 && s < scenarios.length) out.push(scenarios[s++]!);
  });
  while (s < scenarios.length) out.push(scenarios[s++]!);
  return out;
}

// ---------- Practical constraints (asked after the personality section) ----------

export interface ConstraintQuestion<K extends keyof Constraints> {
  id: K;
  text: string;
  options: { label: string; value: Constraints[K] }[];
}

export const CONSTRAINT_QUESTIONS = [
  {
    id: "budget",
    text: "How much could you put into starting a business?",
    options: [
      { label: "Under $500", value: 500 },
      { label: "$500 – $2,000", value: 2000 },
      { label: "$2,000 – $10,000", value: 10000 },
      { label: "$10,000 – $50,000", value: 50000 },
      { label: "More than $50,000", value: 250000 },
    ],
  },
  {
    id: "hoursPerWeek",
    text: "How many hours a week can you realistically give it?",
    options: [
      { label: "Under 5", value: 4 },
      { label: "5 – 10", value: 10 },
      { label: "10 – 20", value: 20 },
      { label: "20 – 40", value: 40 },
      { label: "Full-time and then some", value: 60 },
    ],
  },
  {
    id: "monthsUntilIncomeNeeded",
    text: "How soon does it need to start making money?",
    options: [
      { label: "ASAP, within a month", value: 1 },
      { label: "Within 3 months", value: 3 },
      { label: "Within 6 months", value: 6 },
      { label: "Within a year", value: 12 },
      { label: "I can wait longer", value: 36 },
    ],
  },
  {
    id: "inPersonOk",
    text: "Are you open to working face-to-face with local customers?",
    options: [
      { label: "Yes", value: true },
      { label: "I'd rather keep it online", value: false },
    ],
  },
  {
    id: "physicalOk",
    text: "Are you up for physically demanding work?",
    options: [
      { label: "Bring it on", value: true },
      { label: "I'd rather not", value: false },
    ],
  },
] as const satisfies readonly ConstraintQuestion<keyof Constraints>[];
