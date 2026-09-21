import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { siteMeta } from "@/data/site";
import { Button } from "@/components/ui/button";

export const navItems = [
  { label: "About", to: "/about" },
  { label: "Art", to: "/art" },
  { label: "Author", to: "/author" },
  { label: "Poet", to: "/poet" },
  { label: "Social Worker", to: "/social-worker" },
  { label: "Connect", to: "/connect" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-md transition-all shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8 sm:py-4">
        {/* Logo Image */}
        <Link 
          to="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center transition-transform hover:scale-[1.02]"
        >
          <img
            src="/logo.jpg"
            alt="Poonam Oswal Logo"
            className="h-10 w-auto object-contain sm:h-12 lg:h-14"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 lg:flex lg:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative px-3.5 py-2 text-[14px] font-medium text-black/80 transition-colors hover:text-[#9333ea]"
              activeProps={{
                className:
                  "font-bold text-[#9333ea] hover:text-[#9333ea] after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-[2.5px] after:rounded-full after:bg-[#9333ea]",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden items-center sm:flex">
          <Button
            asChild
            size="sm"
            className="rounded-full bg-[#9333ea] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#7c3aed] hover:shadow-lg hover:shadow-purple-500/20 active:scale-95"
          >
            <Link to="/connect">Get In Touch</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex size-11 items-center justify-center rounded-xl text-black/90 hover:bg-black/5 active:bg-black/10 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-black/10 bg-white px-6 py-5 shadow-xl lg:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[46px] items-center rounded-xl px-4 py-2.5 text-[15px] font-medium text-black/80 transition-colors hover:bg-purple-50 hover:text-[#9333ea]"
                activeProps={{
                  className:
                    "bg-purple-50 font-bold text-[#9333ea] border-l-4 border-[#9333ea]",
                }}
              >
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="mt-4 pt-4 border-t border-black/10">
              <Button
                asChild
                className="w-full rounded-xl bg-[#9333ea] py-6 text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#7c3aed]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/connect">Get In Touch</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}