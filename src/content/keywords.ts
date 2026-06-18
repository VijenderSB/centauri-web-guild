// 25 priority commercial keywords for programmatic SEO across all cities.
// Each entry powers /{slug} (keyword hub) and /{slug}/{city} (keyword + city) pages.

export type Keyword = {
  slug: string;
  label: string;        // human-friendly keyword phrase (used as H1 token)
  title: string;        // capitalised service title
  category:
    | "Emergency"
    | "Recovery"
    | "WordPress"
    | "Shopify"
    | "Website"
    | "Maintenance"
    | "Database"
    | "Server"
    | "Email"
    | "Microsoft"
    | "Google"
    | "Odoo"
    | "API"
    | "Framer"
    | "Webflow"
    | "Ecommerce"
    | "Security";
  short: string;        // 1-sentence value prop used in lists
  intro: string;        // 2-sentence intro template (no city token yet)
  problems: string[];
  deliverables: string[];
  outcomes: string[];
  faqs: { q: string; a: string }[];
  relatedServiceHub?: string;   // slug of parent service hub for cross-link
  relatedServiceChild?: string; // slug of sub-service (under hub)
  responseSLA?: string;         // e.g. "Senior engineer online in under 30 minutes"
};

export const KEYWORDS: Keyword[] = [
  {
    slug: "emergency-website-support",
    label: "emergency website support",
    title: "Emergency Website Support",
    category: "Emergency",
    short: "24/7 emergency response for downed, broken, or unstable websites.",
    intro:
      "When your website is down, slow, or throwing errors, every minute costs revenue and trust. Our senior emergency response team gets you back online fast — no junior triage, no ticket queues.",
    problems: [
      "Site is completely down or returning 5xx errors",
      "White screen of death after a plugin or theme update",
      "Hosting suspended for resource overuse or abuse complaints",
      "DNS, SSL, or domain issues blocking access",
      "Database connection errors or corrupted tables",
      "Traffic spike crashing the server",
    ],
    deliverables: [
      "Senior engineer assigned within minutes, not hours",
      "Root-cause diagnosis with a written incident report",
      "Immediate restoration to a known-good state",
      "Rollback, hotfix, or hosting failover as needed",
      "Post-incident hardening to prevent repeats",
      "Optional 24/7 monitoring after recovery",
    ],
    outcomes: [
      "Site back online in the shortest time technically possible",
      "Clear written explanation of what failed and why",
      "Reduced risk of the same outage repeating",
      "Documented incident timeline for your records",
    ],
    faqs: [
      { q: "How fast can you respond?", a: "Our emergency channel pages a senior engineer immediately. In most cases triage starts in under 30 minutes." },
      { q: "Do you work nights and weekends?", a: "Yes. Emergencies don't keep business hours, and neither do we." },
      { q: "What if you can't fix it?", a: "If we can't restore service, you don't pay for the recovery work — only honest diagnosis." },
    ],
    relatedServiceHub: "emergency-website-support",
    responseSLA: "Senior engineer paged in under 30 minutes, 24/7",
  },
  {
    slug: "hacked-website-recovery",
    label: "hacked website recovery",
    title: "Hacked Website Recovery",
    category: "Recovery",
    short: "Full malware cleanup, blacklist removal, and security hardening for compromised sites.",
    intro:
      "A hacked website damages revenue, SEO, and customer trust within hours. We remove malware, restore clean code, get you off Google's blacklist, and harden the site so it doesn't happen again.",
    problems: [
      "Google flagging the site as deceptive or harmful",
      "Browser warnings scaring visitors away",
      "Spam pages, pharma keywords, or redirects injected into the site",
      "Admin account locked out or credentials changed",
      "Hosting suspended for malware or abuse",
      "Backdoors and reinfections after previous cleanups",
    ],
    deliverables: [
      "Full malware scan of files and database",
      "Removal of injected code, backdoors, and rogue admin users",
      "Google Search Console blacklist removal request",
      "Password, salt, and key rotation across the stack",
      "Security hardening: firewall, 2FA, file integrity monitoring",
      "Written incident report with attack vector analysis",
    ],
    outcomes: [
      "Clean, verified site free of malware and spam",
      "Removed from Google and major blacklists",
      "Backdoors and reinfection vectors closed",
      "Reduced ongoing risk through hardening",
    ],
    faqs: [
      { q: "Will you guarantee no reinfection?", a: "We close the entry point and harden the site. With our optional monitoring plan we guarantee free re-cleanup if reinfection occurs." },
      { q: "How long does cleanup take?", a: "Most cleanups complete within 24 hours. Severe compromises may take 2–3 days." },
      { q: "Do you work with hosts to lift suspensions?", a: "Yes — we coordinate directly with your host's abuse team to get the site restored." },
    ],
    relatedServiceHub: "hacked-website-recovery",
    responseSLA: "Cleanup typically completes within 24 hours",
  },
  {
    slug: "website-malware-removal",
    label: "website malware removal",
    title: "Website Malware Removal",
    category: "Security",
    short: "Surgical removal of malware, injected spam, and backdoors from any CMS.",
    intro:
      "Malware spreads fast — once it's in your files or database it can inject SEO spam, steal customer data, and get your domain blacklisted. We clean it surgically and lock the doors behind us.",
    problems: [
      "Injected JavaScript redirecting visitors",
      "Spam links inserted into posts and pages",
      "Cryptocurrency mining scripts running in the browser",
      "Suspicious files in /uploads or /wp-content",
      "Unknown admin or FTP accounts",
    ],
    deliverables: [
      "Deep file system + database scan",
      "Manual review of suspicious code (not just auto-clean)",
      "Removal of injected ads, redirects, and SEO spam",
      "File integrity baseline + ongoing change alerts",
      "Documentation of every file modified",
    ],
    outcomes: [
      "Site verified clean by independent scanners",
      "Spam and redirects fully removed",
      "Lower risk of reinfection",
    ],
    faqs: [
      { q: "Do you use automated scanners only?", a: "No. Automated scans miss obfuscated payloads. A senior engineer manually reviews flagged files." },
      { q: "Will my site go offline during cleanup?", a: "We clean on a staged copy when possible to keep downtime near zero." },
    ],
    relatedServiceHub: "hacked-website-recovery",
    relatedServiceChild: "malware-removal",
  },
  {
    slug: "wordpress-support",
    label: "wordpress support",
    title: "WordPress Support",
    category: "WordPress",
    short: "Senior WordPress engineers on call for fixes, updates, and growth work.",
    intro:
      "WordPress runs over 40% of the web, but most agencies treat it like a side project. Our WordPress specialists handle everything from emergency fixes to long-term performance and security ownership.",
    problems: [
      "Plugin conflicts breaking the front end or admin",
      "Slow load times hurting SEO and conversions",
      "Failed updates leaving the site in a half-broken state",
      "Elementor, WPBakery, or Gutenberg quirks",
      "WooCommerce checkout errors losing sales",
    ],
    deliverables: [
      "Same-day fixes for critical issues",
      "Monthly core, theme, and plugin updates with rollback testing",
      "Performance tuning — caching, image, query optimisation",
      "Security hardening and login protection",
      "Custom plugin or theme development as needed",
    ],
    outcomes: [
      "A WordPress site that's fast, secure, and predictable",
      "Issues fixed before users notice them",
      "Confidence that updates won't break the site",
    ],
    faqs: [
      { q: "Do you support custom themes and plugins?", a: "Yes — including legacy code you didn't write. We document as we go." },
      { q: "Can you take over from another agency?", a: "Yes, we run a structured handover audit and inherit the codebase cleanly." },
    ],
    relatedServiceHub: "wordpress-development",
  },
  {
    slug: "wordpress-maintenance",
    label: "wordpress maintenance",
    title: "WordPress Maintenance",
    category: "WordPress",
    short: "Proactive WordPress care: updates, backups, security, and performance.",
    intro:
      "A WordPress site without ongoing maintenance breaks — it's a question of when, not if. Our maintenance plans keep your site fast, secure, and updated without surprises.",
    problems: [
      "Outdated plugins exposing security holes",
      "Untested updates breaking the live site",
      "No backups or unreliable backups",
      "Slow page speeds dragging down SEO",
      "Spam comments, fake users, and brute-force logins",
    ],
    deliverables: [
      "Monthly core, theme, and plugin updates on staging first",
      "Daily off-site encrypted backups with one-click restore",
      "Uptime + security monitoring with incident alerts",
      "Quarterly performance and security audit",
      "Up to X hours of small fixes included monthly",
    ],
    outcomes: [
      "Predictable WordPress uptime and performance",
      "Lower risk of being hacked or going down",
      "One bill, one team, no surprises",
    ],
    faqs: [
      { q: "Do you test updates before pushing to live?", a: "Yes. Every update runs through staging with visual regression checks first." },
      { q: "Where are backups stored?", a: "Encrypted, off-site, with at least 30 days of retention." },
    ],
    relatedServiceHub: "wordpress-development",
  },
  {
    slug: "wordpress-emergency-support",
    label: "wordpress emergency support",
    title: "WordPress Emergency Support",
    category: "WordPress",
    short: "Pager-duty WordPress fixes when the site is down, hacked, or breaking.",
    intro:
      "WordPress emergencies — white screens, fatal errors, plugin meltdowns, hacked admin — need a senior responder, not a help desk. We page a WordPress expert immediately when you call.",
    problems: [
      "White screen of death after a plugin or PHP update",
      "Critical error blocking wp-admin access",
      "WooCommerce checkout suddenly failing",
      "Hacked admin accounts and spam pages indexed",
      "Database connection or memory limit crashes",
    ],
    deliverables: [
      "Immediate senior engineer response",
      "Rollback to last working state",
      "Root-cause fix, not just a patch",
      "Post-incident report and prevention plan",
    ],
    outcomes: [
      "Site restored to working order in the shortest time possible",
      "Clear answer on what caused the failure",
      "Reduced repeat risk through hardening",
    ],
    faqs: [
      { q: "How quickly do you start?", a: "Triage begins within 30 minutes of your emergency request, 24/7." },
      { q: "What if it's a host issue?", a: "We coordinate with your host directly while keeping you informed." },
    ],
    relatedServiceHub: "emergency-website-support",
    responseSLA: "Senior WordPress engineer engaged in under 30 minutes",
  },
  {
    slug: "shopify-developer",
    label: "shopify developer",
    title: "Shopify Developer",
    category: "Shopify",
    short: "Senior Shopify developers for theme, app, and storefront customisation.",
    intro:
      "Shopify is easy to launch and hard to master. Our senior Shopify developers handle the deep work — custom themes, Liquid templates, checkout extensions, headless storefronts, and app integrations.",
    problems: [
      "Theme limitations blocking the design you want",
      "Slow Shopify storefronts losing conversions",
      "Need for custom Liquid logic or sections",
      "App stack bloat dragging the site down",
      "Headless or hybrid Shopify storefront builds",
    ],
    deliverables: [
      "Custom Shopify theme and section development",
      "Liquid, JavaScript, and Shopify Functions expertise",
      "App integration and configuration",
      "Performance tuning for Core Web Vitals",
      "Headless storefront builds (Hydrogen / Next.js)",
    ],
    outcomes: [
      "A Shopify store that converts, not just launches",
      "Cleaner, faster theme code you can grow with",
      "A senior partner who understands ecom",
    ],
    faqs: [
      { q: "Do you work on Shopify Plus?", a: "Yes — including scripts, Functions, and B2B catalog work." },
      { q: "Can you migrate from another platform?", a: "Yes — we've migrated from WooCommerce, Magento, BigCommerce, and custom builds." },
    ],
    relatedServiceHub: "shopify-development",
  },
  {
    slug: "shopify-customization",
    label: "shopify customization",
    title: "Shopify Customization",
    category: "Shopify",
    short: "Theme tweaks, section builds, and storefront customisation done right.",
    intro:
      "Off-the-shelf Shopify themes only take you so far. We customise themes, build new sections, and refactor messy Liquid code so your store looks and behaves exactly how you need.",
    problems: [
      "Theme settings don't expose the option you need",
      "Mobile experience feels generic",
      "Need custom product pages, bundles, or upsells",
      "Checkout customisation (Shopify Plus or extensions)",
      "Brand consistency missing across templates",
    ],
    deliverables: [
      "Custom theme sections and blocks",
      "Liquid + JavaScript customisation",
      "Custom product page templates",
      "Cart and checkout improvements",
      "Performance-conscious implementation",
    ],
    outcomes: [
      "A storefront that feels custom-built, not bought",
      "Higher conversion through tailored UX",
      "Maintainable code your next developer will thank you for",
    ],
    faqs: [
      { q: "Will customisations survive theme updates?", a: "Yes — we structure changes so they're upgrade-safe and versioned in Git." },
      { q: "Do you build new themes from scratch?", a: "Yes, when a custom theme is the right call we deliver one." },
    ],
    relatedServiceHub: "shopify-development",
    relatedServiceChild: "shopify-theme-customization",
  },
  {
    slug: "website-development-company",
    label: "website development company",
    title: "Website Development",
    category: "Website",
    short: "Senior-led custom website design and development for serious businesses.",
    intro:
      "Most agencies template their work. We build websites custom — designed for your buyers, engineered for performance, and tuned for SEO from day one.",
    problems: [
      "Outdated website not reflecting the current brand",
      "Slow site hurting SEO and conversion",
      "No clear conversion path for visitors",
      "Difficult to update content without a developer",
      "Generic agency template that doesn't differentiate",
    ],
    deliverables: [
      "Discovery, sitemap, and content strategy",
      "Custom design system aligned to your brand",
      "Responsive, accessible, fast front-end build",
      "Headless CMS or WordPress / Shopify back end",
      "Launch QA, redirects, analytics, and handover",
    ],
    outcomes: [
      "A website that wins trust and converts buyers",
      "Strong technical SEO foundation",
      "Editor-friendly CMS your team can own",
    ],
    faqs: [
      { q: "How long does a build take?", a: "Typically 6–12 weeks depending on scope, content, and integrations." },
      { q: "Do you offer ongoing support after launch?", a: "Yes — every project includes care plans so you're never stranded." },
    ],
    relatedServiceHub: "website-development",
  },
  {
    slug: "website-redesign-services",
    label: "website redesign services",
    title: "Website Redesign Services",
    category: "Website",
    short: "Modernise tired websites without losing your SEO or content.",
    intro:
      "A redesign should improve conversion, SEO, and brand — not just look new. We rebuild from research, preserve your search equity, and ship a site engineered for the next five years.",
    problems: [
      "Site looks dated next to competitors",
      "Mobile experience is broken or clunky",
      "Conversion rates are flat or falling",
      "CMS is hard to use or insecure",
      "Previous redesign destroyed SEO rankings",
    ],
    deliverables: [
      "UX audit + competitor benchmarking",
      "New design system and component library",
      "SEO-preserving information architecture + redirects",
      "Front-end rebuild with Core Web Vitals targets",
      "Content migration and editorial QA",
    ],
    outcomes: [
      "A modern, fast, conversion-tuned website",
      "SEO rankings preserved or improved",
      "Editor-friendly tooling for your team",
    ],
    faqs: [
      { q: "Will I lose my Google rankings?", a: "No — we plan URL redirects and on-page SEO before launch to preserve equity." },
      { q: "Can we keep our existing CMS?", a: "Yes, where it makes sense. If not, we recommend a better-fit option." },
    ],
    relatedServiceHub: "website-development",
    relatedServiceChild: "website-redesign-modernization",
  },
  {
    slug: "website-maintenance-services",
    label: "website maintenance services",
    title: "Website Maintenance Services",
    category: "Maintenance",
    short: "Monthly care plans that keep your site fast, secure, and updated.",
    intro:
      "Websites are software — they need ongoing care to stay fast, secure, and aligned with your business. Our maintenance plans replace the cycle of emergencies with steady, predictable ownership.",
    problems: [
      "Plugins and CMS falling out of date",
      "No reliable backups or restore process",
      "Slow degrading page speed over time",
      "Broken links, images, and forms going unnoticed",
      "Security issues found only after a breach",
    ],
    deliverables: [
      "Scheduled updates with staging tests",
      "Daily encrypted backups + restore tests",
      "Uptime + performance monitoring",
      "Monthly small-fix hours included",
      "Quarterly performance and security review",
    ],
    outcomes: [
      "Predictable uptime and performance",
      "Fewer surprises, lower long-term cost",
      "A documented, accountable web partner",
    ],
    faqs: [
      { q: "What CMSes do you maintain?", a: "WordPress, Shopify, Webflow, Framer, and most custom stacks." },
      { q: "Are emergencies extra?", a: "Most plans include emergency response within the included hours." },
    ],
    relatedServiceHub: "website-development",
    relatedServiceChild: "website-maintenance-support",
  },
  {
    slug: "database-recovery-services",
    label: "database recovery services",
    title: "Database Recovery Services",
    category: "Database",
    short: "MySQL, Postgres, and SQL Server recovery, repair, and migration.",
    intro:
      "When a database goes corrupt or a query goes wrong, the right move is calm, methodical recovery — not panic restores. We've recovered data others wrote off.",
    problems: [
      "Corrupted MySQL or InnoDB tables",
      "Dropped tables or accidental DELETE / UPDATE",
      "Backups that won't restore cleanly",
      "Slow queries grinding the app to a halt",
      "Migration between providers without downtime",
    ],
    deliverables: [
      "Forensic assessment of the database state",
      "Point-in-time recovery where possible",
      "Table repair, schema reconciliation, integrity checks",
      "Performance tuning and index review",
      "Migration playbook and execution",
    ],
    outcomes: [
      "Maximum recoverable data restored",
      "Documented recovery and prevention plan",
      "Faster queries and a healthier database",
    ],
    faqs: [
      { q: "What if there are no backups?", a: "We work directly with the binary logs and data files where possible. Recovery is case-by-case." },
      { q: "Do you support cloud databases?", a: "Yes — AWS RDS, Aurora, Cloud SQL, Azure SQL, Supabase, and self-hosted." },
    ],
    relatedServiceHub: "database-server-recovery",
  },
  {
    slug: "server-recovery-services",
    label: "server recovery services",
    title: "Server Recovery Services",
    category: "Server",
    short: "Linux and Windows server recovery, hardening, and 24/7 support.",
    intro:
      "A crashed server takes everything down — site, email, apps. Our sysadmins recover servers, root-cause the failure, and harden the stack so it doesn't happen again.",
    problems: [
      "Server unresponsive or kernel panic",
      "Disk full or filesystem corruption",
      "Failed updates blocking boot",
      "DDoS or brute-force attacks overwhelming resources",
      "Misconfigured firewall locking you out",
    ],
    deliverables: [
      "Out-of-band rescue and diagnosis",
      "Filesystem and service restoration",
      "Security hardening and firewall review",
      "Monitoring + alerting setup",
      "Documented runbooks for your team",
    ],
    outcomes: [
      "Server back online and stable",
      "Clear cause + prevention plan",
      "Hardened, monitored infrastructure",
    ],
    faqs: [
      { q: "Do you support cloud providers?", a: "Yes — AWS, GCP, Azure, DigitalOcean, Linode, Hetzner, OVH, and bare metal." },
      { q: "Can you take over an existing server?", a: "Yes — we run a structured handover audit and document everything." },
    ],
    relatedServiceHub: "database-server-recovery",
  },
  {
    slug: "business-email-support",
    label: "business email support",
    title: "Business Email Support",
    category: "Email",
    short: "Email deliverability, migration, and troubleshooting for business inboxes.",
    intro:
      "Email is mission-critical and silently fragile. We fix deliverability, migrate mailboxes, and configure DNS so your team's email actually reaches the inbox.",
    problems: [
      "Outbound email landing in spam",
      "Mailbox blacklisted by major providers",
      "Migration to Microsoft 365 or Google Workspace",
      "SPF, DKIM, DMARC misconfiguration",
      "Lost mailbox access or password recovery",
    ],
    deliverables: [
      "DNS audit: SPF, DKIM, DMARC, MX",
      "Deliverability and reputation analysis",
      "Blacklist delisting requests",
      "Mailbox + calendar migrations with zero data loss",
      "Ongoing email administration",
    ],
    outcomes: [
      "Email reliably delivered to the inbox",
      "Clean sender reputation",
      "Smooth, audited migration to your new platform",
    ],
    faqs: [
      { q: "Do you support both Microsoft 365 and Google Workspace?", a: "Yes — including hybrid setups and cross-platform migrations." },
      { q: "Can you stop our domain being spoofed?", a: "Yes — DMARC enforcement and BIMI setup are part of our deliverability work." },
    ],
    relatedServiceHub: "business-email-support",
  },
  {
    slug: "microsoft-365-support",
    label: "microsoft 365 support",
    title: "Microsoft 365 Support",
    category: "Microsoft",
    short: "Setup, migration, and admin support for Microsoft 365 tenants.",
    intro:
      "Microsoft 365 is powerful — and complicated. We administer tenants, migrate mailboxes, secure identities, and unblock day-to-day issues so your team stays productive.",
    problems: [
      "Tenant setup and licence allocation",
      "Exchange Online + Outlook configuration",
      "Teams, SharePoint, OneDrive governance",
      "Conditional Access and MFA rollout",
      "Migration from Google Workspace or on-prem Exchange",
    ],
    deliverables: [
      "Tenant provisioning, DNS, and licence setup",
      "Mailbox + data migration",
      "Security baseline: MFA, Conditional Access, DLP",
      "Ongoing administration and helpdesk escalation",
      "Training for internal admins",
    ],
    outcomes: [
      "Secure, well-administered Microsoft 365 tenant",
      "Smooth migration with no data loss",
      "Team productive and supported day to day",
    ],
    faqs: [
      { q: "Do you handle Intune and device management?", a: "Yes — Intune, Autopilot, and conditional device policies are in scope." },
      { q: "Can you support hybrid Exchange?", a: "Yes, including phased migrations and coexistence." },
    ],
    relatedServiceHub: "business-email-support",
    relatedServiceChild: "microsoft-365-support",
  },
  {
    slug: "google-workspace-support",
    label: "google workspace support",
    title: "Google Workspace Support",
    category: "Google",
    short: "Setup, migration, and ongoing admin for Google Workspace.",
    intro:
      "Google Workspace is fast to start with and easy to misconfigure at scale. We administer your domain, migrate from other platforms, and lock down security without breaking workflows.",
    problems: [
      "Domain and DNS setup for Gmail",
      "Migration from Microsoft 365 or POP/IMAP",
      "Shared drive structure and permissions",
      "MFA, 2SV, and security key rollout",
      "Gmail deliverability and spam complaints",
    ],
    deliverables: [
      "Domain, DNS, and tenant provisioning",
      "Mailbox + drive migration",
      "Security baseline and 2SV enforcement",
      "Group, alias, and shared drive design",
      "Ongoing admin and user support",
    ],
    outcomes: [
      "Reliable, secure Google Workspace deployment",
      "Smooth migration without lost data",
      "Confident internal admins or full-managed support",
    ],
    faqs: [
      { q: "Do you migrate calendar and contacts too?", a: "Yes — including shared calendars, resources, and contact groups." },
      { q: "Can you take over from another partner?", a: "Yes, we audit the tenant and inherit cleanly." },
    ],
    relatedServiceHub: "business-email-support",
    relatedServiceChild: "google-workspace-support",
  },
  {
    slug: "api-development-services",
    label: "api development services",
    title: "API Development Services",
    category: "API",
    short: "REST and webhook APIs designed to scale and integrate cleanly.",
    intro:
      "APIs power modern business — and bad APIs leak data, drop events, and slow your roadmap. We design, build, and integrate APIs that your partners will actually enjoy using.",
    problems: [
      "No documented public API for partners",
      "Internal APIs that are slow or unstable",
      "Webhook delivery dropping events",
      "Third-party integration breaking after vendor changes",
      "Payment, CRM, or ERP integration needed urgently",
    ],
    deliverables: [
      "API design (REST / GraphQL / Webhooks)",
      "Authentication: OAuth2, API keys, JWT",
      "Rate limiting, retries, and observability",
      "OpenAPI documentation and SDK generation",
      "Third-party integration builds (Stripe, HubSpot, Salesforce, etc.)",
    ],
    outcomes: [
      "Documented, secure, scalable APIs",
      "Reliable integrations with partners and platforms",
      "Faster product velocity for your engineering team",
    ],
    faqs: [
      { q: "Do you work with our existing backend?", a: "Yes — Node, Python, Ruby, Go, .NET, Java, PHP. We adapt to your stack." },
      { q: "Can you maintain APIs long term?", a: "Yes — versioning, deprecation, and SLA monitoring are part of our care plans." },
    ],
    relatedServiceHub: "api-integration-development",
  },
  {
    slug: "odoo-development",
    label: "odoo development",
    title: "Odoo Development",
    category: "Odoo",
    short: "Odoo implementation, customisation, and ongoing ERP/CRM support.",
    intro:
      "Odoo is powerful out of the box and brilliant when configured right. Our Odoo team implements, customises, and supports Odoo so it actually fits how your business works.",
    problems: [
      "Odoo implementation stuck or over-scoped",
      "Modules that don't match real workflows",
      "Custom reports and dashboards needed",
      "Integration with accounting, ecommerce, or shipping providers",
      "Migration between Odoo versions",
    ],
    deliverables: [
      "Discovery, fit-gap analysis, and roadmap",
      "Module configuration and custom development",
      "Data migration from legacy systems",
      "Reports, dashboards, and KPIs",
      "Training and ongoing support",
    ],
    outcomes: [
      "Odoo that mirrors how your business actually operates",
      "Cleaner data, better reporting",
      "Reduced manual work across teams",
    ],
    faqs: [
      { q: "Do you work on Odoo.sh and Enterprise?", a: "Yes — and self-hosted Community editions too." },
      { q: "Can you fix a failed Odoo implementation?", a: "Yes — rescue projects are a regular engagement for us." },
    ],
    relatedServiceHub: "odoo-erp-crm",
  },
  {
    slug: "framer-website-development",
    label: "framer website development",
    title: "Framer Website Development",
    category: "Framer",
    short: "Pixel-perfect, fast-loading Framer sites that designers and SEO both love.",
    intro:
      "Framer makes beautiful sites possible without sacrificing performance — when it's built right. Our Framer specialists ship sites that are gorgeous, fast, and CMS-driven.",
    problems: [
      "Designs that don't translate cleanly into Framer",
      "Slow Framer sites with heavy components",
      "CMS structure that's awkward to update",
      "SEO basics missing (meta, OG, sitemap)",
      "Migration from Webflow or WordPress",
    ],
    deliverables: [
      "Custom component and layout builds",
      "Framer CMS modelling for editor friendliness",
      "Performance and Core Web Vitals tuning",
      "On-page SEO setup",
      "Migrations from other platforms",
    ],
    outcomes: [
      "A Framer site that looks designer-built and ranks",
      "Editors who can update without a developer",
      "Performance scores that don't embarrass you",
    ],
    faqs: [
      { q: "Do you handle the design too?", a: "Yes — or we partner with your design team or Figma source." },
      { q: "Can Framer handle a 100-page site?", a: "Yes, with the right CMS architecture and content strategy." },
    ],
    relatedServiceHub: "nocode-platform-development",
  },
  {
    slug: "webflow-development",
    label: "webflow development",
    title: "Webflow Development",
    category: "Webflow",
    short: "Custom Webflow builds, CMS-driven and engineered for SEO.",
    intro:
      "Webflow lets marketing move fast — when the foundation is right. We build Webflow sites with proper CMS structure, performance budgets, and SEO from day one.",
    problems: [
      "Webflow site bloated with symbols and one-off styles",
      "CMS structure painful for editors",
      "Slow load times hurting Core Web Vitals",
      "Missing SEO meta, schema, and sitemap config",
      "Migration from WordPress or Squarespace",
    ],
    deliverables: [
      "Reusable style + symbol system",
      "CMS modelling tuned for editor speed",
      "Custom interactions and code embeds",
      "Performance and SEO setup",
      "Migration and content import scripts",
    ],
    outcomes: [
      "A Webflow build your team actually enjoys editing",
      "Strong technical SEO foundation",
      "Faster pages and better Core Web Vitals",
    ],
    faqs: [
      { q: "Do you support Webflow Ecommerce?", a: "Yes — including custom checkout flows where supported." },
      { q: "Can you maintain a Webflow site long-term?", a: "Yes — our care plans cover Webflow, content updates, and CMS work." },
    ],
    relatedServiceHub: "nocode-platform-development",
  },
  {
    slug: "ecommerce-website-development",
    label: "ecommerce website development",
    title: "Ecommerce Website Development",
    category: "Ecommerce",
    short: "Conversion-tuned Shopify, WooCommerce, and headless ecommerce builds.",
    intro:
      "Ecommerce is engineering, design, and conversion psychology in one project. We build stores that load fast, convert well, and scale without rebuilding every two years.",
    problems: [
      "Storefront not converting browser traffic",
      "Checkout abandonment higher than industry norm",
      "Inventory and shipping integrations missing",
      "Slow product pages and Core Web Vitals failures",
      "Need for headless or hybrid architecture",
    ],
    deliverables: [
      "Conversion-focused information architecture",
      "Custom Shopify / WooCommerce / headless build",
      "Payment, tax, shipping, and ERP integrations",
      "Performance budgets and CWV targets",
      "Analytics and CRO instrumentation",
    ],
    outcomes: [
      "Higher conversion, lower abandonment",
      "Reliable integrations across your operations",
      "Storefront ready to scale with your catalog",
    ],
    faqs: [
      { q: "Which ecommerce platform should we use?", a: "Depends on catalog size, customisation, and team capacity. We make a clear recommendation." },
      { q: "Do you handle B2B ecommerce?", a: "Yes — including custom pricing, net terms, and approval workflows." },
    ],
    relatedServiceHub: "shopify-development",
  },
  {
    slug: "website-security-services",
    label: "website security services",
    title: "Website Security Services",
    category: "Security",
    short: "Hardening, monitoring, and incident response for business websites.",
    intro:
      "Most sites are one outdated plugin away from a breach. We harden, monitor, and respond — so a security incident is a non-event, not a crisis.",
    problems: [
      "Outdated CMS, themes, or plugins",
      "Weak admin passwords and no MFA",
      "No firewall or rate limiting",
      "No file integrity monitoring",
      "Unclear incident response plan",
    ],
    deliverables: [
      "Full security audit and remediation plan",
      "WAF, rate limiting, and bot protection",
      "MFA, SSO, and access hardening",
      "File integrity + login monitoring",
      "Incident response runbook",
    ],
    outcomes: [
      "Smaller attack surface",
      "Faster detection of compromise",
      "A documented, repeatable response plan",
    ],
    faqs: [
      { q: "Do you guarantee no hacks?", a: "No serious provider can. We dramatically reduce risk and ensure fast recovery if anything does happen." },
      { q: "Do you cover PCI / SOC2 controls?", a: "Yes — at the web infrastructure layer." },
    ],
    relatedServiceHub: "hacked-website-recovery",
    relatedServiceChild: "security-hardening",
  },
  {
    slug: "website-outage-support",
    label: "website outage support",
    title: "Website Outage Support",
    category: "Emergency",
    short: "Fast diagnosis and restoration when your site is unreachable.",
    intro:
      "An outage isn't always the host's fault — DNS, SSL, CDN, application, or database failures can all knock a site offline. We diagnose fast and restore service.",
    problems: [
      "Site unreachable across all networks",
      "DNS resolution failures",
      "SSL certificate expired or misconfigured",
      "Origin server returning 5xx errors",
      "CDN or WAF blocking legitimate traffic",
    ],
    deliverables: [
      "Multi-layer outage diagnosis",
      "Host, DNS, SSL, and application checks",
      "Restoration to working state",
      "Post-mortem and prevention plan",
    ],
    outcomes: [
      "Shortest possible time-to-recovery",
      "Clear, written explanation of root cause",
      "Fewer repeat outages",
    ],
    faqs: [
      { q: "Do you work with my host?", a: "Yes — we coordinate directly with your hosting and DNS providers." },
      { q: "Can you take over hosting long-term?", a: "Yes — we offer managed hosting on enterprise-grade infrastructure." },
    ],
    relatedServiceHub: "emergency-website-support",
    relatedServiceChild: "website-outage-resolution",
    responseSLA: "Outage triage starts in under 30 minutes",
  },
  {
    slug: "website-crash-recovery",
    label: "website crash recovery",
    title: "Website Crash Recovery",
    category: "Emergency",
    short: "Restore a crashed website fast, then prevent it happening again.",
    intro:
      "Crashes happen — from traffic spikes, runaway plugins, bad deploys, or database failures. We restore service first, then engineer the fixes that stop it recurring.",
    problems: [
      "Site crashed after a deploy or update",
      "Traffic spike overwhelming the server",
      "Memory or CPU limits hitting ceiling",
      "Database connection pool exhausted",
      "Cascading plugin or service failure",
    ],
    deliverables: [
      "Immediate restore from backup or rollback",
      "Root-cause analysis of the crash",
      "Capacity, caching, and scaling recommendations",
      "Monitoring + alerting to catch it earlier next time",
    ],
    outcomes: [
      "Site restored and stable",
      "Documented cause and prevention plan",
      "Better-prepared infrastructure for next spike",
    ],
    faqs: [
      { q: "What if there's no recent backup?", a: "We rebuild from the last available state and recover live data where possible." },
      { q: "Can you handle Black Friday-scale traffic prep?", a: "Yes — load testing, scaling, and caching are core services." },
    ],
    relatedServiceHub: "emergency-website-support",
    relatedServiceChild: "website-crash-recovery",
  },
  {
    slug: "urgent-website-fixes",
    label: "urgent website fixes",
    title: "Urgent Website Fixes",
    category: "Emergency",
    short: "Same-day fixes for urgent (but not catastrophic) website problems.",
    intro:
      "Not every problem is a full outage — broken checkout, missing images, form failures, or a busted landing page on a campaign day. We fix urgent issues fast, no ticket queues.",
    problems: [
      "Checkout broken on a launch day",
      "Forms silently failing",
      "Landing page broken during a campaign",
      "Images or assets failing to load",
      "Mobile layout broken after a recent change",
    ],
    deliverables: [
      "Same-day senior engineer engagement",
      "Diagnosis and fix with documented change",
      "Regression check on related areas",
      "Recommendations to prevent repeats",
    ],
    outcomes: [
      "Issue fixed before it costs more revenue",
      "Clear record of what changed and why",
      "Stronger site after the fix, not weaker",
    ],
    faqs: [
      { q: "Do I need an ongoing plan?", a: "No — one-off urgent fixes are welcome, though plans get faster response." },
      { q: "Can you fix issues on platforms other than WordPress?", a: "Yes — Shopify, Webflow, Framer, custom stacks, and more." },
    ],
    relatedServiceHub: "emergency-website-support",
  },
];

export function findKeyword(slug: string) {
  return KEYWORDS.find((k) => k.slug === slug);
}