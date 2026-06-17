export type City = {
  slug: string;
  city: string;
  region: string; // state or province
  regionCode: string;
  country: "USA" | "Canada";
  metro?: string;
  industries: string[]; // top local industries
  blurb: string;
};

const us = (
  slug: string, city: string, regionCode: string, region: string,
  metro: string, industries: string[], blurb: string
): City => ({ slug, city, regionCode, region, country: "USA", metro, industries, blurb });

const ca = (
  slug: string, city: string, regionCode: string, region: string,
  metro: string, industries: string[], blurb: string
): City => ({ slug, city, regionCode, region, country: "Canada", metro, industries, blurb });

export const LOCATIONS: City[] = [
  // ===== USA =====
  us("new-york-ny", "New York", "NY", "New York", "NYC Metro", ["Finance", "Media", "Legal", "Real Estate", "Fashion"], "From Wall Street firms to Brooklyn DTC brands, New York businesses demand always-on websites that perform under pressure."),
  us("los-angeles-ca", "Los Angeles", "CA", "California", "Greater LA", ["Entertainment", "E-commerce", "Real Estate", "Hospitality"], "LA brands move fast and visually — we build sites that match the city's pace, polish, and search competition."),
  us("chicago-il", "Chicago", "IL", "Illinois", "Chicagoland", ["Finance", "Manufacturing", "Healthcare", "Logistics"], "Chicago's mix of enterprise and SMB needs websites that are conversion-tuned and built to scale across Midwest markets."),
  us("houston-tx", "Houston", "TX", "Texas", "Greater Houston", ["Energy", "Healthcare", "Aerospace", "Logistics"], "Houston companies serve technical buyers — we build credible, technical sites that win RFPs and inbound leads."),
  us("phoenix-az", "Phoenix", "AZ", "Arizona", "Valley of the Sun", ["Real Estate", "Healthcare", "Construction", "Tourism"], "Phoenix's booming market rewards local SEO and fast-loading sites — both are our specialty."),
  us("philadelphia-pa", "Philadelphia", "PA", "Pennsylvania", "Greater Philadelphia", ["Healthcare", "Education", "Finance", "Pharma"], "From Center City firms to Main Line professionals, Philly clients trust us for steady, long-term web partnership."),
  us("san-antonio-tx", "San Antonio", "TX", "Texas", "San Antonio Metro", ["Healthcare", "Military", "Tourism", "Cybersecurity"], "San Antonio businesses need bilingual-friendly, security-conscious websites — and that's exactly what we deliver."),
  us("san-diego-ca", "San Diego", "CA", "California", "San Diego County", ["Biotech", "Defense", "Tourism", "Healthcare"], "San Diego's biotech and defense ecosystem demands compliant, professional websites with rock-solid uptime."),
  us("dallas-tx", "Dallas", "TX", "Texas", "DFW Metroplex", ["Finance", "Tech", "Real Estate", "Healthcare"], "DFW is fiercely competitive — we help Dallas businesses outrank and outconvert through technical SEO and CRO."),
  us("austin-tx", "Austin", "TX", "Texas", "Austin Metro", ["Tech", "SaaS", "Music", "Real Estate"], "Austin's SaaS and creative scene expects modern, fast, beautifully engineered sites — that's our default."),
  us("san-jose-ca", "San Jose", "CA", "California", "Silicon Valley", ["Tech", "Hardware", "Venture", "Robotics"], "Silicon Valley clients hold us to the highest engineering bar — we deliver enterprise-grade websites end to end."),
  us("jacksonville-fl", "Jacksonville", "FL", "Florida", "First Coast", ["Logistics", "Finance", "Healthcare", "Military"], "Jacksonville's port-driven economy needs websites that close enterprise deals and serve mobile-first local buyers."),
  us("fort-worth-tx", "Fort Worth", "TX", "Texas", "DFW Metroplex", ["Energy", "Logistics", "Manufacturing", "Healthcare"], "We help Fort Worth firms compete in the DFW market with sharper messaging and faster, more credible websites."),
  us("columbus-oh", "Columbus", "OH", "Ohio", "Central Ohio", ["Insurance", "Retail", "Logistics", "Tech"], "Columbus is a quiet powerhouse — our sites help local brands punch above their weight in Midwest search."),
  us("charlotte-nc", "Charlotte", "NC", "North Carolina", "Charlotte Metro", ["Banking", "Energy", "Healthcare", "Real Estate"], "Charlotte's banking and energy clients trust us for compliant, polished, conversion-focused digital."),
  us("indianapolis-in", "Indianapolis", "IN", "Indiana", "Indy Metro", ["Healthcare", "Manufacturing", "Sports", "Logistics"], "Indy businesses get a steady, responsive partner — not a vendor that disappears after launch."),
  us("seattle-wa", "Seattle", "WA", "Washington", "Puget Sound", ["Tech", "Aerospace", "Coffee", "Healthcare"], "Seattle expects refined design and serious engineering — we deliver both, from Pioneer Square to Bellevue."),
  us("denver-co", "Denver", "CO", "Colorado", "Front Range", ["Energy", "Outdoor", "Tech", "Cannabis"], "Denver brands win on authenticity — we build websites that feel local, rank locally, and convert nationally."),
  us("washington-dc", "Washington", "DC", "District of Columbia", "DC Metro", ["Government", "Legal", "Nonprofit", "Defense"], "DC clients need security-aware, accessibility-compliant sites that work with federal and enterprise procurement."),
  us("boston-ma", "Boston", "MA", "Massachusetts", "Greater Boston", ["Education", "Biotech", "Finance", "Healthcare"], "Boston's universities, hospitals, and biotechs trust us for accessible, accurate, scholarly websites."),
  us("nashville-tn", "Nashville", "TN", "Tennessee", "Middle Tennessee", ["Music", "Healthcare", "Hospitality", "Real Estate"], "Nashville's growth is relentless — our local SEO and CRO work helps your brand stay above the noise."),
  us("oklahoma-city-ok", "Oklahoma City", "OK", "Oklahoma", "OKC Metro", ["Energy", "Aerospace", "Agriculture", "Healthcare"], "OKC clients get a partner who picks up the phone and ships work on time, every time."),
  us("las-vegas-nv", "Las Vegas", "NV", "Nevada", "Las Vegas Valley", ["Hospitality", "Gaming", "Conventions", "Real Estate"], "Vegas is a 24/7 economy — we build websites that book, sell, and never go down on a Saturday night."),
  us("portland-or", "Portland", "OR", "Oregon", "Portland Metro", ["Sportswear", "Tech", "Food & Bev", "Sustainability"], "Portland brands lean independent and design-forward — our work fits right in."),
  us("miami-fl", "Miami", "FL", "Florida", "South Florida", ["Real Estate", "Hospitality", "Finance", "LatAm Trade"], "Miami clients need bilingual, mobile-first sites that perform across LatAm markets — we deliver."),
  us("atlanta-ga", "Atlanta", "GA", "Georgia", "Metro Atlanta", ["Media", "Logistics", "Fintech", "Film"], "Atlanta's diverse business base demands flexible, scalable websites — we build them and maintain them long-term."),
  us("minneapolis-mn", "Minneapolis", "MN", "Minnesota", "Twin Cities", ["Retail", "Healthcare", "Manufacturing", "Finance"], "Twin Cities clients get Midwest-honest pricing and senior-only delivery — no junior bait and switch."),
  us("detroit-mi", "Detroit", "MI", "Michigan", "Metro Detroit", ["Automotive", "Manufacturing", "Healthcare", "Logistics"], "Detroit's manufacturing and automotive heritage demands websites that are built as solid as the products they sell — we deliver."),
  us("tampa-fl", "Tampa", "FL", "Florida", "Tampa Bay", ["Finance", "Healthcare", "Tourism", "Real Estate"], "Tampa Bay's growth wave rewards strong local SEO and fast websites — both are our daily work."),
  us("pittsburgh-pa", "Pittsburgh", "PA", "Pennsylvania", "Greater Pittsburgh", ["Robotics", "Healthcare", "Education", "Manufacturing"], "Pittsburgh's robotics and healthcare scenes get engineering-grade websites from a partner that understands them."),
  us("salt-lake-city-ut", "Salt Lake City", "UT", "Utah", "Wasatch Front", ["Tech", "Outdoor", "Finance", "Tourism"], "SLC's tech corridor expects fast, accessible, well-built websites — we ship exactly that."),

  // ===== Canada =====
  ca("toronto-on", "Toronto", "ON", "Ontario", "Greater Toronto Area", ["Finance", "Tech", "Real Estate", "Media"], "Toronto is Canada's most competitive market — we help GTA businesses dominate local search and convert traffic."),
  ca("montreal-qc", "Montreal", "QC", "Quebec", "Greater Montreal", ["AI", "Aerospace", "Gaming", "Tourism"], "We build bilingual (EN/FR) websites that respect Quebec's regulatory environment and creative culture."),
  ca("vancouver-bc", "Vancouver", "BC", "British Columbia", "Metro Vancouver", ["Tech", "Film", "Real Estate", "Sustainability"], "Vancouver expects clean, sustainable, design-led websites — and we deliver them on West Coast timelines."),
  ca("calgary-ab", "Calgary", "AB", "Alberta", "Calgary Metro", ["Energy", "Agriculture", "Finance", "Logistics"], "Calgary's energy sector demands credible, technical websites — we build them with the right tone for the audience."),
  ca("edmonton-ab", "Edmonton", "AB", "Alberta", "Edmonton Metro", ["Energy", "Healthcare", "Education", "Manufacturing"], "Edmonton businesses get steady, long-term web support from a partner that picks up on the first ring."),
  ca("ottawa-on", "Ottawa", "ON", "Ontario", "National Capital Region", ["Government", "Tech", "Defense", "Education"], "Ottawa clients need accessibility-compliant, bilingual, security-aware sites — three of our core competencies."),
  ca("winnipeg-mb", "Winnipeg", "MB", "Manitoba", "Winnipeg Metro", ["Agriculture", "Manufacturing", "Insurance", "Transport"], "Winnipeg businesses get straightforward pricing, reliable delivery, and no-nonsense web partnership."),
  ca("quebec-city-qc", "Quebec City", "QC", "Quebec", "Quebec City Metro", ["Tourism", "Government", "Insurance", "Tech"], "Quebec City clients get fully bilingual (EN/FR), culturally fluent web experiences."),
  ca("hamilton-on", "Hamilton", "ON", "Ontario", "Hamilton-Niagara", ["Manufacturing", "Healthcare", "Education", "Logistics"], "Hamilton's industrial heritage meets modern web — we bridge them with credible, conversion-focused sites."),
  ca("kitchener-on", "Kitchener-Waterloo", "ON", "Ontario", "Waterloo Region", ["Tech", "Insurance", "Manufacturing", "Education"], "Waterloo Region's tech scene expects engineering-grade websites — we deliver them with senior teams."),
  ca("london-on", "London", "ON", "Ontario", "London Metro", ["Healthcare", "Education", "Insurance", "Manufacturing"], "London businesses get a responsive web partner that treats every client like the flagship account."),
  ca("halifax-ns", "Halifax", "NS", "Nova Scotia", "Halifax Regional", ["Ocean Tech", "Defense", "Tourism", "Education"], "Halifax's ocean economy gets a web partner that understands East Coast pace and Atlantic-grade reliability."),
  ca("victoria-bc", "Victoria", "BC", "British Columbia", "Greater Victoria", ["Government", "Tech", "Tourism", "Marine"], "Victoria clients get refined, accessible, well-supported websites — built to last."),
  ca("saskatoon-sk", "Saskatoon", "SK", "Saskatchewan", "Saskatoon Metro", ["Agriculture", "Mining", "Biotech", "Education"], "Saskatoon businesses get steady support, transparent pricing, and senior-only delivery."),
  ca("regina-sk", "Regina", "SK", "Saskatchewan", "Regina Metro", ["Agriculture", "Energy", "Government", "Insurance"], "Regina clients trust us for dependable, long-term web partnership — not one-off launches."),
  ca("st-johns-nl", "St. John's", "NL", "Newfoundland and Labrador", "St. John's Metro", ["Ocean Tech", "Energy", "Tourism", "Fisheries"], "St. John's businesses get web partners who answer on Atlantic time and ship on schedule."),
];

export const US_CITIES = LOCATIONS.filter((c) => c.country === "USA");
export const CA_CITIES = LOCATIONS.filter((c) => c.country === "Canada");

export function findCity(slug: string) {
  return LOCATIONS.find((c) => c.slug === slug);
}