import type { Archetype } from "../types";

// Founder types. Each is a prototype profile in the same [target, weight]
// format as businesses; a user's archetype is the one they fit best, plus the
// runner-up as "with a dash of…".

export const ARCHETYPES: Archetype[] = [
  {
    id: "tinkerer",
    name: "The Tinkerer",
    emoji: "🔧",
    tagline: "If it's broken, you're already curious.",
    description: "You learn by taking things apart and you trust what you can test with your own hands. Give you a stubborn problem and a free afternoon and you're happy. Customers love you because you actually fix things.",
    traits: { hands: [0.9, 3], analyt: [0.75, 2], extra: [0.3, 1], auton: [0.75, 1], creat: [0.4, 1], visib: [0.2, 1] },
  },
  {
    id: "maker",
    name: "The Maker",
    emoji: "🪵",
    tagline: "You'd rather make it than buy it.",
    description: "You have good taste and good hands, and you're happiest when the two meet. You'd take a quiet workshop and a finished piece over a crowded room any day. People buy from you because there's a bit of you in everything you make.",
    traits: { creat: [0.85, 3], hands: [0.85, 2.5], extra: [0.3, 1], visib: [0.25, 1], scale: [0.35, 1] },
  },
  {
    id: "creative",
    name: "The Creative",
    emoji: "🎨",
    tagline: "Taste is your superpower.",
    description: "You see what looks off before anyone else does, and you can't help fixing it. Give you a laptop and a brief and you'll turn it into something people remember. Your edge is an eye that's hard to teach.",
    traits: { creat: [0.9, 3], hands: [0.15, 2], open: [0.75, 1], extra: [0.4, 1], analyt: [0.45, 0.5] },
  },
  {
    id: "showrunner",
    name: "The Showrunner",
    emoji: "🎤",
    tagline: "Give you a mic and you'll give them a show.",
    description: "Attention energizes you instead of scaring you. You've got ideas, opinions and the nerve to share them with strangers. Building an audience is a long game, and it's your natural one.",
    traits: { visib: [0.9, 3], extra: [0.8, 2], creat: [0.75, 2], open: [0.75, 1] },
  },
  {
    id: "dealmaker",
    name: "The Dealmaker",
    emoji: "🤝",
    tagline: "You could sell sand at the beach (ethically).",
    description: "Conversations are where you shine, and \"no\" just means \"not yet.\" You read people quickly, you're comfortable talking money, and you'd rather eat what you kill than wait for a paycheck.",
    traits: { sales: [0.9, 3], extra: [0.8, 2], risk: [0.7, 1.5], persist: [0.75, 1], stab: [0.7, 1] },
  },
  {
    id: "empire-builder",
    name: "The Empire Builder",
    emoji: "🏰",
    tagline: "Why have one when you could have fifty?",
    description: "You think in systems and scale. You're the one asking how to make a thing run without you. Risk doesn't scare you off and you're willing to grind for years. A side hustle is just step one.",
    traits: { scale: [0.9, 3], risk: [0.85, 2], auton: [0.85, 1.5], persist: [0.85, 1.5] },
  },
  {
    id: "puzzle-master",
    name: "The Puzzle Master",
    emoji: "🧩",
    tagline: "Give you a hard problem and some quiet.",
    description: "You're happiest deep in a problem other people find boring or scary: data, code, systems, numbers. You'd rather solve it than talk about it. Clients pay you for answers they couldn't find themselves.",
    traits: { analyt: [0.9, 3], extra: [0.2, 2], hands: [0.2, 1], consc: [0.65, 1] },
  },
  {
    id: "steady-hand",
    name: "The Steady Hand",
    emoji: "📋",
    tagline: "Reliable is underrated, and you know it.",
    description: "You like a clear process, a predictable week and a job done right the first time. Flashy isn't your thing, dependable is. That's exactly why clients stick with you for years.",
    traits: { struct: [0.85, 2.5], consc: [0.85, 2.5], risk: [0.2, 1.5], scale: [0.3, 1], creat: [0.3, 0.5] },
  },
  {
    id: "caretaker",
    name: "The Caretaker",
    emoji: "💛",
    tagline: "People (and pets) feel safe with you.",
    description: "You're patient, warm and calm when others are stressed. Looking after people, kids or animals doesn't drain you, it fills you up. Families trust you with what matters most to them.",
    traits: { help: [0.9, 3], agree: [0.85, 2], stab: [0.75, 1.5], visib: [0.3, 1], sales: [0.3, 0.5] },
  },
  {
    id: "guide",
    name: "The Guide",
    emoji: "🧭",
    tagline: "You make hard things click for people.",
    description: "You love the moment someone finally gets it. You can explain things and push people a little, and you don't mind being in front of a group. People don't just learn from you, they change because of you.",
    traits: { help: [0.85, 2.5], extra: [0.7, 2], visib: [0.65, 1.5], agree: [0.55, 0.5], analyt: [0.55, 0.5] },
  },
  {
    id: "host",
    name: "The Host",
    emoji: "🍳",
    tagline: "Your happy place is a full room.",
    description: "Feeding people, running the party, keeping the energy up: that's your thing. You're on your feet, good with people and calm when it gets busy. Customers come back for the experience as much as the product.",
    traits: { extra: [0.85, 2.5], hands: [0.7, 2], help: [0.7, 1.5], stab: [0.7, 1], creat: [0.55, 0.5] },
  },
  {
    id: "wildcard",
    name: "The Wildcard",
    emoji: "🃏",
    tagline: "Routine? Never heard of her.",
    description: "You're curious, adaptable and allergic to doing the same thing twice. You spot opportunities other people walk past and you're happy to improvise. The right business for you has lots of variety, and you're the one who gets to choose it.",
    traits: { open: [0.85, 2.5], struct: [0.15, 2.5], auton: [0.8, 1.5], risk: [0.65, 1], consc: [0.4, 0.5] },
  },
];
