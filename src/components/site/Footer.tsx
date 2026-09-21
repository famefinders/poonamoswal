import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { siteMeta } from "@/data/site";
import { navItems } from "./Header";

export function Footer() {
  return (
    <footer className="bg-[#1e0728] text-white selection:bg-[#fbbf24] selection:text-[#1e0728]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20">
        {/* Top Center Brand Section */}
        <div className="text-center max-w-2xl mx-auto">
          <Link to="/" className="inline-block group">
            <h2 className="font-display text-4xl font-bold tracking-tight text-white transition-colors group-hover:text-[#fbbf24] sm:text-5xl">
              Poonam <span className="text-[#fbbf24]">Oswal</span>
            </h2>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-purple-200/80">
            Author, poet, mentor and social contributor — dedicated to uplifting lives through art, literature, and profound spiritual wisdom.
          </p>
        </div>

        {/* Horizontal Navigation Links Bar */}
        <div className="mt-12 border-y border-purple-300/15 py-6">
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-purple-100/90 transition-colors hover:text-[#fbbf24]"
                activeProps={{
                  className: "text-[#fbbf24] font-semibold",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Middle Info Row: Contact Details & Social Media */}
        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between border-b border-purple-300/15 pb-12">
          {/* Left: Contact Details */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-4">
              Contact Details
            </h3>
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm text-purple-200/90">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-[#fbbf24]" />
                <span>Patparganj, East Delhi</span>
              </div>
              <a
                href="mailto:info@poonamoswal.com"
                className="flex items-center gap-2 transition-colors hover:text-[#fbbf24]"
              >
                <Mail className="size-4 text-[#fbbf24]" />
                <span>info@poonamoswal.com</span>
              </a>
              <a
                href="tel:+918743969027"
                className="flex items-center gap-2 transition-colors hover:text-[#fbbf24]"
              >
                <Phone className="size-4 text-[#fbbf24]" />
                <span>+91 87439 69027</span>
              </a>
            </div>
          </div>

          {/* Right: White Circular Social Media Badges */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-4 lg:text-right">
              Our Social Media :
            </h3>
            <div className="flex items-center gap-3 lg:justify-end">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-white text-[#1e0728] shadow-md transition-all hover:bg-[#fbbf24] hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="size-4.5 fill-current" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-white text-[#1e0728] shadow-md transition-all hover:bg-[#fbbf24] hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="size-4.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-white text-[#1e0728] shadow-md transition-all hover:bg-[#fbbf24] hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="size-4.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-purple-300/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Poonam Oswal · {siteMeta.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/connect" className="hover:text-white transition-colors">Terms &amp; Services</Link>
            <Link to="/author" className="hover:text-white transition-colors">Credits</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}