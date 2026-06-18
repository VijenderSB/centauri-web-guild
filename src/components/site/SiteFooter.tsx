import { Link } from "@tanstack/react-router";
import { Zap, Mail, Phone, MapPin, ShieldCheck, Lock, Award, Clock, Star, Users, Linkedin, Twitter, Facebook, Github } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="text-slate-300" style={{ background: "var(--navy-deep)" }}>
      {/* Trust ribbon */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: ShieldCheck, title: "SOC 2-aligned process", desc: "Security-first delivery" },
            { icon: Lock, title: "NDA & MSA ready", desc: "Enterprise contracts" },
            { icon: Award, title: "15+ years experience", desc: "500+ US & Canada projects" },
            { icon: Clock, title: "<60 min response", desc: "24/7 emergency support" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 shrink-0">
                <Icon className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
                <Zap className="h-5 w-5" />
              </span>
              WebCentauri Technologies
            </div>
            <p className="mt-4 text-sm text-slate-400 max-w-sm">
              A US-focused technology partner trusted by founders, marketing leaders, and
              IT teams across all 50 states and Canada to build, secure, and grow
              business-critical websites.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a href="mailto:hello@webcentauri.com" className="flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4 text-cyan-300" /> hello@webcentauri.com</a>
              <a href="tel:+18885550123" className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4 text-cyan-300" /> +1 (888) 555-0123 · Mon–Fri 8am–8pm ET</a>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-300" /> Headquartered in the US · Serving USA & Canada</div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-300 text-sm">
                {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="h-4 w-4 fill-amber-300" />))}
              </div>
              <span className="text-xs text-slate-400">4.9/5 — verified client reviews</span>
            </div>
            <div className="mt-5 flex items-center gap-2">
              {[Linkedin, Twitter, Facebook, Github].map((I, i) => (
                <a key={i} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-md bg-white/5 hover:bg-white/10 transition">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="Services" links={[
            ["/services/website-development", "Website Development"],
            ["/services/emergency-website-support", "Emergency Support"],
            ["/services/wordpress-support", "WordPress Support"],
            ["/services/hacked-website-recovery", "Hacked Site Recovery"],
            ["/services/database-server-recovery", "Database & Server"],
            ["/services/business-email-support", "Business Email"],
            ["/services/api-development", "API Development"],
            ["/services/odoo-erp-crm", "Odoo ERP & CRM"],
            ["/services/no-code-platforms", "No-Code Platforms"],
          ]} />
          <FooterCol title="Industries" links={[
            ["/industries/healthcare", "Healthcare"],
            ["/industries/legal", "Legal"],
            ["/industries/finance", "Finance"],
            ["/industries/ecommerce", "eCommerce"],
            ["/industries/real-estate", "Real Estate"],
            ["/industries/manufacturing", "Manufacturing"],
            ["/industries", "All industries"],
          ]} />
          <FooterCol title="Company" links={[
            ["/about", "About"],
            ["/case-studies", "Case Studies"],
            ["/resources", "Resources"],
            ["/pricing", "Pricing"],
            ["/resources/website-maintenance-checklist", "Maintenance Checklist"],
          ]} />
          <FooterCol title="Get Started" links={[
            ["/contact", "Book Consultation"],
            ["/contact", "Free Website Audit"],
            ["/contact", "Emergency Support"],
            ["/contact", "Contact Us"],
          ]} />
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 grid gap-4 md:grid-cols-2 items-center text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5 text-cyan-300" /> 500+ US & Canada clients</span>
            <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-cyan-300" /> GDPR · CCPA · HIPAA-aware</span>
            <span className="inline-flex items-center gap-1"><Lock className="h-3.5 w-3.5 text-cyan-300" /> SSL · WAF · Daily backups</span>
          </div>
          <div className="flex flex-wrap md:justify-end gap-x-4 gap-y-2">
            <Link to="/contact" className="hover:text-white">Privacy</Link>
            <Link to="/contact" className="hover:text-white">Terms</Link>
            <Link to="/contact" className="hover:text-white">Accessibility</Link>
            <Link to="/contact" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-500 text-center md:text-left">
          © {new Date().getFullYear()} WebCentauri Technologies. All rights reserved. WebCentauri is a US-focused
          digital technology and growth partner serving businesses across the United States and Canada.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map(([to, label], i) => (
          <li key={i}>
            <Link to={to} className="text-slate-400 hover:text-white transition">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}