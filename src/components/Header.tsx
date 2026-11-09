import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const NAV_LINKS = [
  { label: 'Catalogue', href: '/catalogue' },
  { label: 'Custom OEM', href: '/custom-manufacturing' },
  { label: 'Wholesale', href: '/wholesale-export' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#141413]/10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Clean single-element text brand wordmark */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="font-display text-2xl font-semibold tracking-[0.06em] text-[#141413] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#141413]"
        >
          YASIR APPAREL
        </a>

        {/* Zone 2: 5 concise single-line text links */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7 text-sm text-[#4A4740]">
          {NAV_LINKS.map((link) => {
            const isActive =
              currentPath === link.href ||
              (link.href === '/catalogue' && currentPath.startsWith('/product/'));
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b ${
                  isActive
                    ? 'text-[#141413] font-medium border-[#141413]'
                    : 'border-transparent hover:text-[#141413] hover:border-[#141413]/40'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action (plus mobile menu toggle on small screens) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/wholesale-export#quote-form"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onNavigate('/wholesale-export');
              setTimeout(() => {
                document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
              }, 80);
            }}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-medium bg-[#141413] text-[#FAF8F5] hover:bg-[#2B2A28] transition-colors whitespace-nowrap shrink-0"
          >
            Request Wholesale Quote
          </a>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2.5 -mr-2 text-[#141413] hover:bg-[#EFECE6] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden bg-[#FAF8F5] border-b border-[#141413]/15 px-5 py-5 space-y-3"
        >
          {NAV_LINKS.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`block py-2 text-base border-b border-[#141413]/8 ${
                  isActive ? 'text-[#141413] font-semibold' : 'text-[#4A4740]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-2">
            <a
              href="/wholesale-export"
              onClick={(e) => handleLinkClick(e, '/wholesale-export')}
              className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-medium bg-[#141413] text-[#FAF8F5]"
            >
              Request Wholesale Pricing
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
