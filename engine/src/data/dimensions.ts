import type { Dimension, DimensionId, Skill } from "../types";

export const DIMENSIONS: Dimension[] = [
  { id: "open", name: "Curiosity", description: "Openness to new ideas, experiences and ways of doing things.", overFactor: 0.7, high: "love trying new ideas", low: "prefer proven, familiar approaches" },
  { id: "consc", name: "Follow-through", description: "Organized, reliable, finishes what they start.", overFactor: 0.4, high: "are organized and follow through", low: "work best loose and flexible" },
  { id: "extra", name: "Social energy", description: "Energized by people versus by focused solo time.", overFactor: 1, high: "get energy from being around people", low: "recharge with focused solo time" },
  { id: "agree", name: "Warmth", description: "Accommodating and cooperative versus direct and challenging.", overFactor: 0.7, high: "are warm and easy to work with", low: "are direct and comfortable pushing back" },
  { id: "stab", name: "Steadiness", description: "Stays calm under pressure and uncertainty.", overFactor: 0.3, high: "stay calm when things get messy", low: "do best in calmer, lower-stress settings" },
  { id: "risk", name: "Risk appetite", description: "Comfort with financial and social risk.", overFactor: 0.8, high: "are comfortable taking big swings", low: "prefer to play it safe" },
  { id: "auton", name: "Independence", description: "Need to set your own direction.", overFactor: 0.8, high: "want to call the shots", low: "are happy working to someone else's brief" },
  { id: "struct", name: "Love of routine", description: "Preference for structure and repeatable process versus variety and improvising.", overFactor: 1, high: "like routines and clear processes", low: "thrive on variety and improvising" },
  { id: "sales", name: "Hustle", description: "Comfort selling, pitching and self-promotion.", overFactor: 0.4, high: "are comfortable selling and self-promoting", low: "would rather the work speak for itself" },
  { id: "persist", name: "Grit", description: "Willingness to grind for a delayed payoff.", overFactor: 0.3, high: "can grind for a long payoff", low: "like to see results quickly" },
  { id: "hands", name: "Hands-on", description: "Interest in practical, physical, tangible work.", overFactor: 0.8, high: "like working with your hands", low: "prefer working at a desk" },
  { id: "analyt", name: "Puzzle-solving", description: "Interest in data, systems and solving problems.", overFactor: 0.6, high: "enjoy digging into data and puzzles", low: "prefer action over analysis" },
  { id: "creat", name: "Creative streak", description: "Interest in making things that are original or beautiful.", overFactor: 0.7, high: "have a strong creative streak", low: "prefer practical over artistic work" },
  { id: "help", name: "Helper", description: "Interest in teaching, caring for and helping people.", overFactor: 0.7, high: "light up when helping people", low: "prefer working on things more than with people" },
  { id: "scale", name: "Ambition", description: "Wants to build something big versus a business that fits their life.", overFactor: 0.8, high: "want to build something big", low: "want a business that leaves room for a life" },
  { id: "visib", name: "Spotlight", description: "Comfort being the public face: camera, stage, audience.", overFactor: 0.5, high: "don't mind being in the spotlight", low: "would rather stay behind the scenes" },
];

export const DIMENSION_BY_ID = Object.fromEntries(DIMENSIONS.map((d) => [d.id, d])) as Record<DimensionId, Dimension>;

export const SKILLS: Skill[] = [
  { id: "writing", name: "Writing" },
  { id: "design", name: "Graphic & visual design" },
  { id: "video", name: "Video production & editing" },
  { id: "photo", name: "Photography" },
  { id: "marketing", name: "Marketing" },
  { id: "sales", name: "Sales" },
  { id: "social", name: "Social media" },
  { id: "coding", name: "Software development" },
  { id: "data", name: "Data & spreadsheets" },
  { id: "finance", name: "Bookkeeping & finance" },
  { id: "admin", name: "Admin & organization" },
  { id: "pm", name: "Project management" },
  { id: "teaching", name: "Teaching & tutoring" },
  { id: "coaching", name: "Coaching & counseling" },
  { id: "service", name: "Customer service" },
  { id: "cooking", name: "Cooking & baking" },
  { id: "construction", name: "Construction & home repair" },
  { id: "mechanical", name: "Mechanical & electronics repair" },
  { id: "cleaning", name: "Cleaning & detailing" },
  { id: "driving", name: "Driving & logistics" },
  { id: "fitness", name: "Fitness & wellness" },
  { id: "animals", name: "Animal care" },
  { id: "kids", name: "Childcare" },
  { id: "crafts", name: "Crafts & making" },
  { id: "ecommerce", name: "E-commerce & product sourcing" },
  { id: "realestate", name: "Real estate & property" },
  { id: "music", name: "Music & audio" },
  { id: "languages", name: "Foreign languages" },
  { id: "beauty", name: "Hair, makeup & beauty" },
  { id: "events", name: "Event planning" },
  { id: "gardening", name: "Gardening & landscaping" },
];

export const SKILL_IDS = new Set(SKILLS.map((s) => s.id));
