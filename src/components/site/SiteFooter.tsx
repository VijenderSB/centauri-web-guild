import { Link } from "@tanstack/react-router";
import { Zap, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="text-slate-300" style={{ background: "var(--navy-deep)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
                <Zap className="h-5 w-5" />
              </span>
              WebCentauri Technologies
            </div>
            <p className="mt-4 text-sm text-slate-400 max-w-sm">
              Your reliable technology and digital growth partner — helping USA & Canada
              businesses build, maintain, secure, optimize, and scale their digital presence.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@webcentauri.com</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (000) 000-0000</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Serving USA & Canada</div>
            </div>
          </div>
          <FooterCol title="Services" links={[
            ["/services", "Website Development"],
            ["/services", "Website Maintenance"],
            ["/services", "WordPress Services"],
            ["/services", "SEO & Growth"],
            ["/services", "eCommerce"],
            ["/services", "Dedicated Developers"],
          ]} />
          <FooterCol title="Company" links={[
            ["/about", "About"],
            ["/industries", "Industries"],
            ["/case-studies", "Case Studies"],
            ["/resources", "Resources"],
            ["/pricing", "Pricing"],
          ]} />
          <FooterCol title="Get Started" links={[
            ["/contact", "Book Consultation"],
            ["/contact", "Request Audit"],
            ["/contact", "Emergency Support"],
            ["/contact", "Contact Us"],
          ]} />
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} WebCentauri Technologies. All rights reserved.</p>
          <p>USA & Canada · Long-Term Technology Partnerships</p>
        </div>
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