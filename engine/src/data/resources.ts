import type { Resource } from "../types";
import { SKILLS } from "./dimensions";

// Starter-kit resources v0. Every link is a plain, non-affiliate URL for now.
// When a program approves us, replace `url` and set `affiliate: true`; pages
// link through /go/[id], so nothing else changes.
//
// Picks are well-known defaults, chosen without regard to payout. Vet each one
// against the partner policy (SPEC §9.4) before switching it to an affiliate link.

const STACK: Resource[] = [
  // ---------- Everyone ----------
  { id: "sba-guide", name: "SBA business guide", description: "Free, official step-by-step guide to planning, launching and managing a small business.", url: "https://www.sba.gov/business-guide", need: "guidance", stage: "validate", priority: 1, free: true, affiliate: false },
  { id: "score-mentor", name: "SCORE free mentoring", description: "Get matched with a volunteer mentor who has run a business. Free.", url: "https://www.score.org/how-mentoring-works/", need: "mentoring", stage: "validate", priority: 1, free: true, affiliate: false },
  { id: "register-business", name: "Register your business", description: "Choose a structure (sole prop, LLC…) and register with your state. The SBA explains every option.", url: "https://www.sba.gov/business-guide/launch-your-business/register-your-business", need: "registration", stage: "launch", priority: 1, free: true, affiliate: false },
  { id: "irs-ein", name: "Get an EIN from the IRS", description: "Your business tax ID. Free and takes about 10 minutes online. Never pay a third party for this.", url: "https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number", need: "tax-id", stage: "launch", priority: 1, free: true, affiliate: false },
  { id: "licenses-permits", name: "Licenses & permits", description: "Find out which local, state and federal licenses your business needs.", url: "https://www.sba.gov/business-guide/launch-your-business/apply-licenses-permits", need: "licensing", stage: "launch", priority: 1, free: true, affiliate: false },
  { id: "business-insurance", name: "Business insurance basics", description: "What coverage small businesses typically need, and how to shop for it.", url: "https://www.sba.gov/business-guide/launch-your-business/get-business-insurance", need: "insurance", stage: "launch", priority: 1, free: true, affiliate: false },
  { id: "business-bank", name: "Open a business bank account", description: "Keep business money separate from day one. The SBA covers what to look for.", url: "https://www.sba.gov/business-guide/launch-your-business/open-business-bank-account", need: "banking", stage: "launch", priority: 1, free: true, affiliate: false },
  { id: "wave", name: "Wave", description: "Free accounting and invoicing for small businesses.", url: "https://www.waveapps.com", need: "bookkeeping", stage: "launch", priority: 1, free: true, affiliate: false },
  { id: "quickbooks", name: "QuickBooks", description: "The most widely used small-business accounting software.", url: "https://quickbooks.intuit.com", need: "bookkeeping", stage: "grow", priority: 2, free: false, affiliate: false },
  { id: "canva", name: "Canva", description: "Make a logo, flyers, social posts and business cards without hiring a designer.", url: "https://www.canva.com", need: "design", stage: "launch", priority: 1, free: true, affiliate: false },
  { id: "kit", name: "Kit", description: "Email list and newsletter tool, free for your first subscribers.", url: "https://kit.com", need: "email", stage: "grow", priority: 1, free: true, affiliate: false },

  // ---------- Online businesses ----------
  { id: "squarespace", name: "Squarespace", description: "Polished website builder for portfolios and service businesses.", url: "https://www.squarespace.com", need: "website", stage: "launch", appliesTo: { modes: ["online", "hybrid"] }, priority: 1, free: false, affiliate: false },
  { id: "google-business-profile", name: "Google Business Profile", description: "Free listing so local customers find you on Google Search and Maps. The single best free marketing for a local business.", url: "https://www.google.com/business/", need: "website", stage: "launch", appliesTo: { modes: ["local"] }, priority: 1, free: true, affiliate: false },
  { id: "stripe", name: "Stripe", description: "Take card payments online and send invoices.", url: "https://stripe.com", need: "payments", stage: "launch", appliesTo: { modes: ["online"] }, priority: 1, free: false, affiliate: false },
  { id: "square", name: "Square", description: "Take card payments in person with a phone, plus invoices and simple booking.", url: "https://squareup.com", need: "payments", stage: "launch", appliesTo: { modes: ["local", "hybrid"] }, priority: 1, free: false, affiliate: false },
  { id: "calendly", name: "Calendly", description: "Let clients book calls and appointments without the back-and-forth.", url: "https://calendly.com", need: "scheduling", stage: "launch", appliesTo: { categories: ["Teaching & coaching", "Business services", "Marketing", "Tech & data", "Design & creative", "Writing & content"] }, priority: 1, free: true, affiliate: false },

  // ---------- Category-specific ----------
  { id: "jobber", name: "Jobber", description: "Quotes, scheduling, invoicing and payments for home-service businesses.", url: "https://www.getjobber.com", need: "field-service", stage: "grow", appliesTo: { categories: ["Home & property services", "Trades & repair"] }, priority: 1, free: false, affiliate: false },
  { id: "shopify", name: "Shopify", description: "The standard platform for running your own online store.", url: "https://www.shopify.com", need: "store", stage: "launch", appliesTo: { categories: ["E-commerce & products"] }, priority: 1, free: false, affiliate: false },
  { id: "etsy-sell", name: "Sell on Etsy", description: "The easiest place to start selling handmade and vintage goods.", url: "https://www.etsy.com/sell", need: "marketplace", stage: "validate", appliesTo: { businesses: ["etsy-handmade", "candle-soap-maker", "woodworker", "digital-downloads", "print-on-demand", "furniture-flipping", "tailoring"] }, priority: 1, free: false, affiliate: false },
  { id: "printful", name: "Printful", description: "Print-on-demand: they print and ship your designs, so you hold no inventory.", url: "https://www.printful.com", need: "production", stage: "launch", appliesTo: { businesses: ["print-on-demand"] }, priority: 1, free: true, affiliate: false },
  { id: "upwork", name: "Upwork", description: "Find your first freelance clients while you build a portfolio.", url: "https://www.upwork.com", need: "marketplace", stage: "validate", appliesTo: { categories: ["Writing & content", "Design & creative", "Tech & data", "Marketing"], businesses: ["virtual-assistant", "bookkeeper"] }, priority: 1, free: true, affiliate: false },
  { id: "rover", name: "Rover", description: "Find pet-sitting and dog-walking clients. Rover handles booking and payments.", url: "https://www.rover.com", need: "marketplace", stage: "validate", appliesTo: { businesses: ["pet-sitter"] }, priority: 1, free: true, affiliate: false },
  { id: "teachable", name: "Teachable", description: "Host and sell online courses and coaching.", url: "https://teachable.com", need: "course-platform", stage: "launch", appliesTo: { businesses: ["course-creator", "life-coach", "paid-community", "language-teacher", "test-prep-coach"] }, priority: 1, free: true, affiliate: false },
  { id: "descript", name: "Descript", description: "Edit video and podcasts by editing the transcript, like a doc.", url: "https://www.descript.com", need: "production", stage: "launch", appliesTo: { categories: ["Creator & media"], businesses: ["podcast-producer", "video-editor", "course-creator"] }, priority: 1, free: true, affiliate: false },
  { id: "nna-notary", name: "National Notary Association", description: "Notary and loan signing agent training, certification and supplies.", url: "https://www.nationalnotary.org", need: "certification", stage: "launch", appliesTo: { businesses: ["mobile-notary"] }, priority: 1, free: false, affiliate: false },
  { id: "nasm", name: "NASM personal trainer certification", description: "One of the most recognized personal training certifications.", url: "https://www.nasm.org", need: "certification", stage: "launch", appliesTo: { businesses: ["personal-trainer"] }, priority: 1, free: false, affiliate: false },
  { id: "cottage-food", name: "Cottage food & food permits", description: "What you can legally sell from a home kitchen depends on your state. Start with the licensing guide, then your state health department.", url: "https://www.sba.gov/business-guide/launch-your-business/apply-licenses-permits", need: "licensing", stage: "validate", appliesTo: { businesses: ["cottage-bakery", "specialty-food", "personal-chef", "caterer", "food-truck", "coffee-cart"] }, priority: 0, free: true, affiliate: false },
];

/** One course search per skill, used for skill gaps in "willing to learn" mode. */
const COURSES: Resource[] = SKILLS.map((s) => ({
  id: `learn-${s.id}`,
  name: `${s.name} courses`,
  description: `Beginner-friendly ${s.name.toLowerCase()} courses, many free to audit.`,
  url: `https://www.coursera.org/search?query=${encodeURIComponent(s.name)}`,
  need: "learning",
  stage: "validate",
  appliesTo: { skills: [s.id] },
  priority: 1,
  free: true,
  affiliate: false,
}));

export const RESOURCES: Resource[] = [...STACK, ...COURSES];
