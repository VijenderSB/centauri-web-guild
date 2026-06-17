import {
  Code2,
  Wrench,
  Layers,
  ShoppingCart,
  TrendingUp,
  Gauge,
  Users2,
  Siren,
  type LucideIcon,
} from "lucide-react";

export type ServiceEntry = {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  desc: string;
  items: string[];
  outcomes: string[];
  industries: string[];
  metaTitle: string;
  metaDesc: string;
};

export const SERVICES: ServiceEntry[] = [
  {
    slug: "web-development",
    icon: Code2,
    title: "Website Development",
    short: "Custom sites & web apps built to scale.",
    desc: "Custom websites, corporate sites, web applications, redesigns, and migrations engineered for performance, security, and long-term scale.",
    items: ["Custom Websites", "Corporate Websites", "Business Websites", "Website Redesign", "Website Migration", "Custom Web Applications"],
    outcomes: ["2–4× faster page loads vs. previous build", "SEO-preserving migrations with zero traffic loss", "Accessibility (WCAG 2.2 AA) baked in"],
    industries: ["Healthcare", "Legal", "Finance", "Manufacturing"],
    metaTitle: "Website Development USA & Canada | WebCentauri",
    metaDesc: "Custom websites, corporate sites, and web applications built for performance, SEO, and long-term scale across USA & Canada.",
  },
  {
    slug: "website-care-plans",
    icon: Wrench,
    title: "Website Maintenance & Care Plans",
    short: "Stay secure, fast, and online — every month.",
    desc: "Monthly care plans with security updates, daily backups, uptime monitoring, performance tuning, and dedicated developer hours.",
    items: ["Security Updates", "Daily Backups", "Uptime Monitoring", "Bug Fixes", "Performance Optimization", "Monthly Reporting"],
    outcomes: ["99.95% average uptime across managed sites", "Same-day SLA on business plan tickets", "Zero successful breaches across managed portfolio in 2025"],
    industries: ["Healthcare", "Professional Services", "eCommerce", "Real Estate"],
    metaTitle: "Website Care Plans & Maintenance | WebCentauri",
    metaDesc: "Monthly website care plans: security, backups, uptime, performance, and dev hours. SLAs from same-day to 1-hour.",
  },
  {
    slug: "wordpress",
    icon: Layers,
    title: "WordPress Services",
    short: "Senior WordPress & WooCommerce specialists.",
    desc: "Senior WordPress engineers for WooCommerce builds, custom plugins, theme customization, hardening, and serious speed work.",
    items: ["WooCommerce", "Custom Plugins", "Theme Customization", "WordPress Support", "Speed Optimization", "Security Hardening"],
    outcomes: ["Sub-1.5s LCP on optimized builds", "Hardened against OWASP Top 10", "Zero-downtime plugin and core updates"],
    industries: ["eCommerce", "Nonprofits", "Professional Services", "Home Services"],
    metaTitle: "WordPress Development & Support | WebCentauri",
    metaDesc: "Senior WordPress & WooCommerce engineers for plugins, themes, performance, and hardening.",
  },
  {
    slug: "ecommerce",
    icon: ShoppingCart,
    title: "eCommerce Solutions",
    short: "Launch, optimize, and scale online stores.",
    desc: "Shopify, WooCommerce, and Magento stores designed for conversion. From checkout fixes to full replatforms.",
    items: ["Shopify", "WooCommerce", "Magento", "Store Optimization", "Checkout Improvements", "Conversion Optimization"],
    outcomes: ["+18–42% conversion lift after CRO sprints", "Headless storefront speed without sacrificing merchandising", "Subscription, B2B, and multi-currency ready"],
    industries: ["eCommerce", "Manufacturing", "Healthcare"],
    metaTitle: "eCommerce Development — Shopify & WooCommerce | WebCentauri",
    metaDesc: "Shopify, WooCommerce, and Magento builds and CRO programs that grow revenue, not just traffic.",
  },
  {
    slug: "seo",
    icon: TrendingUp,
    title: "SEO & Growth Marketing",
    short: "Technical, local & content SEO that compounds.",
    desc: "Technical, local, and content SEO paired with paid acquisition — designed around your real revenue goals, not vanity metrics.",
    items: ["Technical SEO", "Local SEO", "Content SEO", "Google Ads", "Meta Ads", "Landing Page Optimization"],
    outcomes: ["3× organic traffic in 9 months (typical mid-market)", "Top-3 local pack rankings for serviced cities", "ROAS-tracked paid programs with clean attribution"],
    industries: ["Legal", "Healthcare", "Home Services", "Real Estate"],
    metaTitle: "SEO & Growth Marketing USA & Canada | WebCentauri",
    metaDesc: "Technical, local, and content SEO plus Google & Meta Ads — built around revenue, not vanity metrics.",
  },
  {
    slug: "performance-security",
    icon: Gauge,
    title: "Performance & Security",
    short: "Core Web Vitals, Cloudflare, and incident recovery.",
    desc: "Page-speed engineering, Core Web Vitals work, Cloudflare configuration, malware removal, audits, and post-incident recovery.",
    items: ["Website Speed Optimization", "Core Web Vitals", "Cloudflare Setup", "Malware Removal", "Security Audits", "Website Recovery"],
    outcomes: ["Green Core Web Vitals across mobile & desktop", "Average malware cleanup under 6 hours", "WAF + bot protection tuned to your traffic"],
    industries: ["Finance", "Healthcare", "eCommerce", "Legal"],
    metaTitle: "Website Performance & Security | WebCentauri",
    metaDesc: "Core Web Vitals, Cloudflare, malware removal, and security audits for business-critical websites.",
  },
  {
    slug: "dedicated-teams",
    icon: Users2,
    title: "Dedicated Development Teams",
    short: "Embedded senior engineers, on your stack.",
    desc: "Scale engineering capacity without the hiring lift. Senior developers and full pods embedded into your roadmap.",
    items: ["Dedicated Developer", "Dedicated Senior Developer", "Dedicated Project Team", "Ongoing Technical Support"],
    outcomes: ["Ramp in 5 business days, not 90", "Direct Slack + standup access", "Month-to-month — no long contracts"],
    industries: ["SaaS", "Finance", "Manufacturing", "Professional Services"],
    metaTitle: "Dedicated Developers & Teams | WebCentauri",
    metaDesc: "Embed senior developers or full pods into your roadmap. Month-to-month, fast ramp, USA & Canada time zones.",
  },
  {
    slug: "emergency-support",
    icon: Siren,
    title: "Emergency Website Support",
    short: "Under-60-minute response, 24/7.",
    desc: "24/7 emergency response for outages, malware, broken deploys, and critical issues — with senior engineers on first contact.",
    items: ["Broken Website Recovery", "Website Down Support", "Malware Removal", "Critical Issue Resolution", "Emergency Technical Assistance"],
    outcomes: ["First response in under 60 minutes", "Senior engineer — no triage runaround", "Post-incident report and prevention plan"],
    industries: ["eCommerce", "Healthcare", "Finance", "Legal"],
    metaTitle: "Emergency Website Support 24/7 | WebCentauri",
    metaDesc: "Under-60-minute emergency response for outages, malware, and critical issues. 24/7 across USA & Canada.",
  },
];