// Deterministic per-page content generator.
// Same (keyword, city) input always returns the same output, but each
// combination gets distinct intros, testimonials, and FAQ items so no two
// programmatic pages read identically.

import type { Keyword } from "@/content/keywords";
import type { City } from "@/content/locations";

// --- Seeded PRNG ------------------------------------------------------------
function hashString(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)]!;
}
function pickN<T>(rng: () => number, arr: T[], n: number): T[] {
  const copy = arr.slice();
  const out: T[] = [];
  for (let i = 0; i < n && copy.length; i++) {
    const idx = Math.floor(rng() * copy.length);
    out.push(copy.splice(idx, 1)[0]!);
  }
  return out;
}

// --- Pools ------------------------------------------------------------------
const INTRO_OPENERS = [
  (city: string, kw: string) => `${city} businesses don't have time for slow tickets or junior triage when ${kw} is on the line.`,
  (city: string, kw: string) => `In ${city}, ${kw} isn't a nice-to-have — it's a direct line between revenue and the next outage.`,
  (city: string, kw: string) => `Companies across ${city} call us for ${kw} because the cost of getting it wrong shows up the same week.`,
  (city: string, kw: string) => `${city} operators reach for senior help with ${kw} after one too many promises from a generalist agency.`,
  (city: string, kw: string) => `Across ${city}, the businesses serious about uptime treat ${kw} the way they treat any other production system.`,
  (city: string, kw: string) => `When ${city} teams need ${kw} that actually moves the needle, they want a senior engineer on the call, not a coordinator.`,
  (city: string, kw: string) => `${city} buyers expect ${kw} to be handled with the same rigour they apply to their own customers.`,
  (city: string, kw: string) => `In ${city}'s market, ${kw} is one of those services you only notice when it's done badly — we make sure that never happens.`,
];

const INTRO_CLOSERS = [
  (city: string, region: string) => `We've worked with ${city} and broader ${region} teams long enough to know what local buyers expect.`,
  (city: string) => `Every engagement in ${city} is led by a senior — no junior bait-and-switch.`,
  (city: string, region: string) => `From single-location operators to ${region}-wide brands headquartered in ${city}, we ship the same standard of work.`,
  (city: string) => `Pricing and timelines are quoted up front, in plain English, before a single line of code is touched in your ${city} environment.`,
  (city: string) => `Communication is fast and direct: a real human in ${city}'s working hours, not a ticket queue.`,
  (city: string) => `We document everything we touch so your ${city} team is never locked out of its own stack.`,
];

const REASON_LINES = [
  (city: string, ind: string) => `${city}'s ${ind.toLowerCase()} sector means buyers expect technical accuracy and zero downtime — both default expectations on our side.`,
  (city: string, ind: string) => `Working with ${ind.toLowerCase()} clients in ${city} has taught us how to speak to technical reviewers without watering down what we do.`,
  (city: string, ind: string) => `${ind} businesses across ${city} repeatedly tell us they switched after their previous provider ghosted them mid-incident.`,
  (city: string, ind: string) => `In ${city}, the ${ind.toLowerCase()} space rewards providers who actually pick up the phone — and penalises the ones who don't.`,
];

// --- Testimonials -----------------------------------------------------------
const FIRST_NAMES = [
  "Sarah", "Marcus", "Priya", "Daniel", "Hannah", "Omar", "Isabella", "Liam",
  "Chen", "Aisha", "Diego", "Emily", "Noah", "Fatima", "Jordan", "Maya",
  "Anthony", "Rachel", "Hugo", "Layla", "Ethan", "Sofia", "Caleb", "Nina",
  "Vikram", "Olivia", "Mateo", "Zara", "Logan", "Amara", "Felix", "Yara",
  "Henry", "Camila", "Owen", "Aaliyah", "Lucas", "Mira", "Eli", "Anika",
];
const LAST_INITIALS = ["A.", "B.", "C.", "D.", "F.", "G.", "H.", "J.", "K.", "L.", "M.", "N.", "P.", "R.", "S.", "T.", "V.", "W."];

function roleForIndustry(ind: string): string {
  const map: Record<string, string[]> = {
    Finance: ["Director of Digital", "VP Marketing", "Head of Operations"],
    Tech: ["CTO", "Head of Engineering", "VP Product"],
    SaaS: ["CTO", "Head of Growth", "Founder"],
    Healthcare: ["Practice Manager", "Director of Patient Experience", "IT Director"],
    Manufacturing: ["Operations Director", "Plant Manager", "IT Lead"],
    Retail: ["Ecommerce Manager", "Director of Stores", "Head of Digital"],
    Energy: ["Director of IT", "Operations Manager", "VP Commercial"],
    Logistics: ["Operations Director", "Head of Customer Success", "IT Manager"],
    Real: ["Brokerage Owner", "Director of Marketing", "Operations Lead"],
    Hospitality: ["GM", "Director of Sales", "Marketing Director"],
    Education: ["Director of Communications", "Head of Admissions", "IT Director"],
    Government: ["Communications Lead", "Digital Services Manager"],
    Legal: ["Managing Partner", "Director of Marketing", "Practice Administrator"],
    Insurance: ["Director of Digital", "VP Operations"],
    Media: ["Director of Audience", "Head of Product"],
    Aerospace: ["Program Manager", "Director of IT"],
    Defense: ["Program Director", "IT Manager"],
    Biotech: ["Director of Operations", "IT Lead"],
    Tourism: ["Marketing Director", "GM"],
    Mining: ["Operations Director", "IT Manager"],
    Agriculture: ["Operations Manager", "Director of Sales"],
    Construction: ["Project Director", "Marketing Lead"],
    Automotive: ["Dealer Principal", "Marketing Director"],
    Music: ["Studio Director", "Marketing Manager"],
    Film: ["Production Manager", "Studio Operations Lead"],
    Fashion: ["Ecommerce Director", "Head of Brand"],
    Pharma: ["Director of Digital", "IT Lead"],
    Banking: ["VP Digital", "Director of Marketing"],
    Cybersecurity: ["VP Engineering", "Director of Operations"],
    Robotics: ["Director of Engineering", "VP Product"],
    Sports: ["Marketing Director", "Director of Fan Experience"],
    Cannabis: ["Director of Ecommerce", "Marketing Lead"],
    Outdoor: ["Marketing Director", "Ecommerce Manager"],
    Sustainability: ["Director of Marketing", "Operations Lead"],
    Coffee: ["Director of Ecommerce", "Marketing Lead"],
    Conventions: ["Director of Events", "Marketing Manager"],
    Gaming: ["Producer", "Director of Marketing"],
    AI: ["Head of Engineering", "VP Product"],
    Fintech: ["VP Engineering", "Head of Growth"],
    Hardware: ["Director of Product", "VP Engineering"],
    Venture: ["Operations Partner", "Platform Lead"],
    Marine: ["Operations Director", "Marketing Lead"],
    Fisheries: ["Operations Manager", "Marketing Lead"],
    Ocean: ["Operations Director", "Marketing Manager"],
    Nonprofit: ["Executive Director", "Communications Lead"],
    Transport: ["Operations Director", "IT Lead"],
    Military: ["Program Manager", "Director of IT"],
    LatAm: ["VP International", "Director of Marketing"],
  };
  // match longest key contained in industry word
  for (const key of Object.keys(map)) {
    if (ind.toLowerCase().includes(key.toLowerCase())) return map[key]![0]!;
  }
  return "Director of Operations";
}
function companyForIndustry(ind: string, city: string, rng: () => number): string {
  const suffix = pick(rng, ["Group", "Partners", "& Co.", "Holdings", "Studio", "Labs", "Works", "Collective", "Trading", "Industries"]);
  const root = ind.split(" ")[0]!.replace(/[^A-Za-z]/g, "");
  return `${city.split(" ")[0]} ${root} ${suffix}`;
}

const TESTIMONIAL_QUOTES = [
  (kw: string, city: string) => `We tried two other providers before WebCentauri and neither understood ${kw.toLowerCase()} the way our ${city} team needed. Night-and-day difference.`,
  (kw: string) => `When our site went sideways at 11pm on a Friday, they answered. The fix was clean and the post-mortem was honest.`,
  (kw: string, city: string) => `Senior people from the first call. That's rare. Worth every dollar — especially for ${kw.toLowerCase()} work where one missed detail costs us thousands.`,
  (kw: string) => `They explained what went wrong in plain English, not jargon. Leadership actually understood the report.`,
  (kw: string, city: string) => `We compared three quotes for ${kw.toLowerCase()} in ${city}. WebCentauri was the only one who diagnosed the real issue before quoting.`,
  (kw: string) => `Engagement felt like a true partnership, not a billable hours game. We've stayed on retainer.`,
  (kw: string) => `Migration went off without a single hour of downtime. That's what I'm paying for.`,
  (kw: string, city: string) => `They knew ${city}'s market — local buyers, local compliance quirks, local hosting providers — and it showed in every recommendation.`,
  (kw: string) => `Documentation alone is worth the engagement. Our internal team isn't guessing anymore.`,
  (kw: string) => `We've been burned by agencies that disappeared after launch. This team picks up the phone two years in.`,
  (kw: string, city: string) => `The fastest ${kw.toLowerCase()} response we've ever had. Two other providers didn't even reply that day.`,
  (kw: string) => `Senior-only delivery is real, not a sales line. Every meeting had a decision-maker engineer in it.`,
];

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
};

export function generateTestimonials(kw: Keyword, city: City, count = 3): Testimonial[] {
  const rng = mulberry32(hashString(`t:${kw.slug}:${city.slug}`));
  const inds = pickN(rng, city.industries, Math.min(count, city.industries.length));
  while (inds.length < count) inds.push(pick(rng, city.industries));
  const quotes = pickN(rng, TESTIMONIAL_QUOTES, count);
  return inds.map((ind, i) => {
    const first = pick(rng, FIRST_NAMES);
    const last = pick(rng, LAST_INITIALS);
    return {
      name: `${first} ${last}`,
      role: roleForIndustry(ind),
      company: companyForIndustry(ind, city.city, rng),
      quote: quotes[i]!(kw.title, city.city),
    };
  });
}

// --- City-specific FAQs -----------------------------------------------------
const FAQ_TEMPLATES: Array<{ q: (kw: Keyword, c: City) => string; a: (kw: Keyword, c: City) => string }> = [
  {
    q: (kw, c) => `Do you actually work with ${c.city}, ${c.regionCode} businesses or is this just a landing page?`,
    a: (kw, c) => `Real engagements. Our ${kw.title.toLowerCase()} team has delivered for ${c.city} and broader ${c.region} clients across industries including ${c.industries.slice(0, 3).join(", ")}. We can share references in your sector on request.`,
  },
  {
    q: (kw, c) => `What time zone does the ${kw.title.toLowerCase()} team work in for ${c.city} clients?`,
    a: (kw, c) => `We staff coverage that overlaps ${c.city}'s working hours, and our emergency channel runs 24/7. You won't be waiting for an offshore handover when something is on fire.`,
  },
  {
    q: (kw, c) => `Can you support our existing vendors and hosting in ${c.city}?`,
    a: (kw, c) => `Yes. We coordinate directly with local ${c.city}-area hosts, DNS providers, and incumbent agencies. No politics, no finger-pointing — just getting the work done.`,
  },
  {
    q: (kw, c) => `How is ${kw.title.toLowerCase()} pricing structured for ${c.city} businesses?`,
    a: (kw, c) => `Fixed-scope where possible, hourly with caps where the work is investigative. We send a written quote before starting, and there are no surprise change orders.`,
  },
  {
    q: (kw, c) => `Are you familiar with the regulatory or compliance context for ${c.region}?`,
    a: (kw, c) => `Yes — including the privacy, accessibility, and industry-specific rules that apply to ${c.country === "USA" ? "US" : "Canadian"} businesses in ${c.region}. We bake compliance into the build, not bolt it on later.`,
  },
  {
    q: (kw, c) => `What if our ${c.city} team needs to talk to a senior engineer urgently?`,
    a: (kw, c) => `Clients on a care plan get a direct line to the senior on their account. One-off engagements get response within the SLA we agree at quoting time.`,
  },
  {
    q: (kw, c) => `Have you worked with ${c.industries[0]?.toLowerCase() ?? "businesses"} clients in ${c.city} before?`,
    a: (kw, c) => `Yes. ${c.industries[0] ?? "Local"} is one of the sectors we see most often in ${c.city}, and our standard ${kw.title.toLowerCase()} playbook is informed by that experience.`,
  },
  {
    q: (kw, c) => `Can you take over from another ${kw.title.toLowerCase()} provider in ${c.city}?`,
    a: (kw, c) => `Yes — handovers from other agencies and freelancers are common. We run a structured audit, inherit cleanly, and document everything as we go so you're never locked in.`,
  },
  {
    q: (kw, c) => `Will you train our in-house ${c.city} team or only deliver the work?`,
    a: (kw, c) => `Both. Many ${c.city} clients want us to upskill internal staff alongside delivery. Training, runbooks, and documentation are explicit deliverables when you ask for them.`,
  },
  {
    q: (kw, c) => `Do you offer onsite visits in ${c.city}?`,
    a: (kw, c) => `Most work runs remotely — it's faster and more cost-effective. For high-stakes engagements we'll travel to ${c.city} when it materially helps the outcome.`,
  },
];

export function generateCityFaqs(kw: Keyword, city: City, count = 3) {
  const rng = mulberry32(hashString(`f:${kw.slug}:${city.slug}`));
  return pickN(rng, FAQ_TEMPLATES, count).map((t) => ({
    q: t.q(kw, city),
    a: t.a(kw, city),
  }));
}

// --- Distinct intro paragraphs ---------------------------------------------
export function generateIntro(kw: Keyword, city: City): { opener: string; reason: string; closer: string } {
  const rng = mulberry32(hashString(`i:${kw.slug}:${city.slug}`));
  const opener = pick(rng, INTRO_OPENERS)(city.city, kw.label);
  const ind = pick(rng, city.industries);
  const reason = pick(rng, REASON_LINES)(city.city, ind);
  const closer = pick(rng, INTRO_CLOSERS)(city.city, city.region);
  return { opener, reason, closer };
}

// --- Distinct metadata description -----------------------------------------
const META_TEMPLATES = [
  (kw: Keyword, c: City) => `${kw.title} in ${c.city}, ${c.regionCode}. Senior-led ${kw.label} for ${c.industries.slice(0, 2).join(" and ").toLowerCase()} businesses across ${c.metro ?? c.region}. Free 30-minute scoping call.`,
  (kw: Keyword, c: City) => `Need ${kw.label} in ${c.city}? WebCentauri's senior team delivers ${kw.title.toLowerCase()} for ${c.region} businesses with documented results and no junior triage.`,
  (kw: Keyword, c: City) => `${c.city}'s trusted ${kw.label} partner. ${kw.short} Serving ${c.industries[0]?.toLowerCase() ?? "local"} and other ${c.region} sectors.`,
  (kw: Keyword, c: City) => `Get ${kw.label} in ${c.city}, ${c.regionCode} from a senior team that responds fast and writes everything down. Trusted across ${c.metro ?? c.region}.`,
  (kw: Keyword, c: City) => `${kw.title} for ${c.city} businesses. Direct senior engagement, transparent pricing, and ongoing care across ${c.region}.`,
];
export function generateMetaDesc(kw: Keyword, city: City): string {
  const rng = mulberry32(hashString(`m:${kw.slug}:${city.slug}`));
  return pick(rng, META_TEMPLATES)(kw, city);
}

// --- City-only helpers (used by /locations/$slug) ---------------------------
const CITY_QUOTES = [
  (c: string) => `We needed a web partner who actually understood ${c}'s market. WebCentauri's recommendations were sharper than the three local agencies we interviewed first.`,
  (c: string) => `Two redesigns ago we lost half our search traffic. This team rebuilt the site in ${c} without losing a single ranking.`,
  (c: string) => `Senior people on every call, written follow-ups after every meeting. That's not normal in ${c}, and it's why we stayed.`,
  (c: string) => `Our ${c} team can finally edit the site without breaking it. That alone paid for the engagement.`,
  (c: string) => `When our store crashed during a launch, they were on it before our own team finished triaging. We're in ${c}; they answered like they were down the street.`,
  (c: string) => `Pricing was transparent from day one. No surprise change orders, no ${c}-tax — just honest scoping.`,
  (c: string) => `The build felt custom, not templated. Visitors in ${c} actually comment on the site, which is a first.`,
  (c: string) => `We've worked with bigger agencies and felt like a small account. With WebCentauri, our ${c} business gets senior attention every week.`,
];

export function generateCityTestimonials(city: City, count = 3): Testimonial[] {
  const rng = mulberry32(hashString(`ct:${city.slug}`));
  const inds = pickN(rng, city.industries, Math.min(count, city.industries.length));
  while (inds.length < count) inds.push(pick(rng, city.industries));
  const quotes = pickN(rng, CITY_QUOTES, count);
  return inds.map((ind, i) => {
    const first = pick(rng, FIRST_NAMES);
    const last = pick(rng, LAST_INITIALS);
    return {
      name: `${first} ${last}`,
      role: roleForIndustry(ind),
      company: companyForIndustry(ind, city.city, rng),
      quote: quotes[i]!(city.city),
    };
  });
}

const CITY_FAQ_TEMPLATES: Array<{ q: (c: City) => string; a: (c: City) => string }> = [
  {
    q: (c) => `Do you have a physical office in ${c.city}?`,
    a: (c) => `Our delivery team works remotely across North America. Most ${c.city} clients prefer it — faster response than driving to an office, and we'll travel in for high-stakes meetings when it helps.`,
  },
  {
    q: (c) => `Which ${c.city} industries do you work with most?`,
    a: (c) => `Across ${c.city} and ${c.metro ?? c.region} we see a lot of ${c.industries.slice(0, 3).join(", ")} work. Our senior team adapts the playbook to your sector — we don't force a template.`,
  },
  {
    q: (c) => `Can you take over an existing ${c.city} website?`,
    a: (c) => `Yes — handovers from local ${c.city} agencies and freelancers are routine. We run a structured audit, document everything, and inherit cleanly so your team is never locked out.`,
  },
  {
    q: (c) => `How quickly can you start on a ${c.city} project?`,
    a: (c) => `Emergencies trigger same-day senior response. New build engagements typically kick off within 1–2 weeks of scoping in ${c.city}, depending on team availability and discovery scope.`,
  },
  {
    q: (c) => `Do you handle ${c.country === "USA" ? "US" : "Canadian"} accessibility and privacy requirements?`,
    a: (c) => `Yes. We build to ${c.country === "USA" ? "ADA / WCAG 2.2 AA standards and respect US state privacy laws (CCPA and the rest)" : "WCAG 2.2 AA, AODA, and PIPEDA / Quebec Law 25 where applicable"} as a default, not an upsell.`,
  },
  {
    q: (c) => `What does pricing look like for ${c.city} clients?`,
    a: (c) => `Fixed-scope for clearly defined work, hourly-with-cap for investigative work. Every quote is written, every change order is approved before work continues. No ${c.city}-specific markup.`,
  },
  {
    q: (c) => `Will the same team stay on our ${c.city} account long-term?`,
    a: (c) => `Yes. The senior who scopes your project is one of the people delivering it, and they stay on the account for ongoing support. That continuity is a core reason ${c.city} clients renew.`,
  },
];

export function generateCityOnlyFaqs(city: City, count = 4) {
  const rng = mulberry32(hashString(`cf:${city.slug}`));
  return pickN(rng, CITY_FAQ_TEMPLATES, count).map((t) => ({
    q: t.q(city),
    a: t.a(city),
  }));
}

// --- Keyword-only helpers (used by /$keyword hub) --------------------------
const KW_QUOTES = [
  (kw: string) => `We compared four providers for ${kw.toLowerCase()}. WebCentauri was the only one who diagnosed the root cause before quoting.`,
  (kw: string) => `Senior-only delivery is real here. Every ${kw.toLowerCase()} engagement has a decision-maker engineer on the call.`,
  (kw: string) => `The fastest ${kw.toLowerCase()} response we've ever had. Documented, billed honestly, and resolved cleanly.`,
  (kw: string) => `We've stayed on retainer because the work keeps paying for itself. ${kw} is just one of the engagements we've expanded into.`,
  (kw: string) => `Their ${kw.toLowerCase()} playbook saved us a rebuild. Two other vendors recommended starting over from scratch.`,
  (kw: string) => `Communication is the differentiator. Written summaries after every call, no surprises on the invoice.`,
];

export function generateKeywordTestimonials(kw: Keyword, count = 3): Testimonial[] {
  const rng = mulberry32(hashString(`kt:${kw.slug}`));
  const inds = ["Tech", "Healthcare", "Ecommerce", "Manufacturing", "Finance", "Real Estate", "Hospitality"];
  const picked = pickN(rng, inds, count);
  const quotes = pickN(rng, KW_QUOTES, count);
  const cityNames = ["Austin", "Toronto", "Boston", "Denver", "Vancouver", "Atlanta", "Calgary", "Chicago"];
  return picked.map((ind, i) => {
    const first = pick(rng, FIRST_NAMES);
    const last = pick(rng, LAST_INITIALS);
    const city = pick(rng, cityNames);
    return {
      name: `${first} ${last}`,
      role: roleForIndustry(ind),
      company: companyForIndustry(ind, city, rng),
      quote: quotes[i]!(kw.title),
    };
  });
}