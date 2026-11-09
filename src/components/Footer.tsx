import React from 'react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { buildGeneralWhatsAppUrl } from '../utils/catalogueLogic';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const go = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-[#141413] text-[#E6E2DA] border-t border-[#141413]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Factory Profile */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="/"
              onClick={(e) => go(e, '/')}
              className="inline-block font-display text-2xl font-semibold tracking-[0.06em] text-[#FAF8F5]"
            >
              YASIR APPAREL
            </a>
            <p className="text-sm text-[#B8B2A6] leading-relaxed max-w-sm">
              Abaya Manufacturer, Wholesaler, and Modest Apparel Exporter established in{' '}
              {BUSINESS_CONFIG.establishedYear}. Crafting custom designs, hijabs, and prayer garments for international boutiques and fashion brands.
            </p>
            <p className="text-xs text-[#9E978A]">
              {BUSINESS_CONFIG.location.fullAddress}
            </p>
          </div>

          {/* Collections */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-lg font-semibold text-[#FAF8F5] tracking-wide">
              Abaya Collections
            </h3>
            <ul className="space-y-2 text-sm text-[#B8B2A6]">
              <li>
                <a href="/catalogue?category=Plain+Abayas" onClick={(e) => go(e, '/catalogue?category=Plain+Abayas')} className="hover:text-[#FAF8F5] transition-colors">
                  Plain &amp; Core Abayas
                </a>
              </li>
              <li>
                <a href="/catalogue?category=Embroidered+Abayas" onClick={(e) => go(e, '/catalogue?category=Embroidered+Abayas')} className="hover:text-[#FAF8F5] transition-colors">
                  Embroidered Abayas
                </a>
              </li>
              <li>
                <a href="/catalogue?category=Double-Tone+and+Ombre+Abayas" onClick={(e) => go(e, '/catalogue?category=Double-Tone+and+Ombre+Abayas')} className="hover:text-[#FAF8F5] transition-colors">
                  Double-Tone &amp; Ombre Abayas
                </a>
              </li>
              <li>
                <a href="/catalogue?category=Luxury+Occasion+Abayas" onClick={(e) => go(e, '/catalogue?category=Luxury+Occasion+Abayas')} className="hover:text-[#FAF8F5] transition-colors">
                  Luxury Occasion Abayas
                </a>
              </li>
              <li>
                <a href="/catalogue?category=TikTok+Fabric+Abayas" onClick={(e) => go(e, '/catalogue?category=TikTok+Fabric+Abayas')} className="hover:text-[#FAF8F5] transition-colors">
                  TikTok Fabric Abayas
                </a>
              </li>
            </ul>
          </div>

          {/* Buyer Resources */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display text-lg font-semibold text-[#FAF8F5] tracking-wide">
              B2B &amp; Export
            </h3>
            <ul className="space-y-2 text-sm text-[#B8B2A6]">
              <li>
                <a href="/custom-manufacturing" onClick={(e) => go(e, '/custom-manufacturing')} className="hover:text-[#FAF8F5] transition-colors">
                  Custom Manufacturing
                </a>
              </li>
              <li>
                <a href="/wholesale-export" onClick={(e) => go(e, '/wholesale-export')} className="hover:text-[#FAF8F5] transition-colors">
                  Wholesale &amp; Export
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => go(e, '/about')} className="hover:text-[#FAF8F5] transition-colors">
                  About Our Atelier
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => go(e, '/contact')} className="hover:text-[#FAF8F5] transition-colors">
                  Contact &amp; Location
                </a>
              </li>
              <li>
                <a href="/manage-catalogue" onClick={(e) => go(e, '/manage-catalogue')} className="hover:text-[#FAF8F5] transition-colors">
                  Catalogue Admin &amp; Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Export Desk */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-lg font-semibold text-[#FAF8F5] tracking-wide">
              Direct Export Desk
            </h3>
            <div className="space-y-2 text-sm text-[#B8B2A6]">
              <p>
                <span className="text-[#9E978A] block text-xs">WhatsApp (Mobile &amp; Desktop)</span>
                <a
                  href={buildGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FAF8F5] hover:text-[#D4BC8B] transition-colors tabular-nums"
                >
                  {BUSINESS_CONFIG.whatsappDisplay}
                </a>
              </p>
              <p>
                <span className="text-[#9E978A] block text-xs">Export Inquiries Email</span>
                <a
                  href={`mailto:${BUSINESS_CONFIG.email}`}
                  className="text-[#FAF8F5] hover:text-[#D4BC8B] transition-colors"
                >
                  {BUSINESS_CONFIG.email}
                </a>
              </p>
              <p className="pt-1 text-xs text-[#9E978A]">
                {BUSINESS_CONFIG.editableBusinessHours.productionAndOffice}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9E978A]">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS_CONFIG.name}. Established {BUSINESS_CONFIG.establishedYear} in Gujranwala, Pakistan.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FAF8F5] transition-colors"
            >
              WhatsApp Export Desk
            </a>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-[#FAF8F5] transition-colors">
              Email Us
            </a>
            <span aria-hidden="true">·</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[#FAF8F5] transition-colors">
              XML Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
