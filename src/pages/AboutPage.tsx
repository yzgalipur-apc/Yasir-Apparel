import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { IMAGE_ASSETS } from '../data/products';
import { buildGeneralWhatsAppUrl } from '../utils/catalogueLogic';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResilientImage } from '../components/ResilientImage';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <>
      <SEOHead
        title="About Yasir Apparel — Pakistani Abaya Manufacturer & Exporter Since 2000"
        description="Established in 2000 in Alipur Chatta, Gujranwala, Pakistan, Yasir Apparel is a family-led manufacturer and exporter of wholesale abayas, hijabs, and custom modest wear."
        path="/about"
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'About Us' },
          ]}
          onNavigate={onNavigate}
        />

        <div className="py-8 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center border-b border-[#141413]/10">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs text-[#8C6D3F] font-medium">
              <span>Established {BUSINESS_CONFIG.establishedYear}</span>
              <span aria-hidden="true">·</span>
              <span>Alipur Chatta, Gujranwala, Pakistan</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#141413] leading-tight">
              Over Two Decades of Modest Fashion Craftsmanship &amp; Export Reliability
            </h1>

            <p className="text-base text-[#4A4740] leading-relaxed">
              Founded in {BUSINESS_CONFIG.establishedYear}, <strong>{BUSINESS_CONFIG.name}</strong> has grown into a dedicated Pakistani manufacturer, wholesaler, and exporter of abayas, hijabs, prayer clothes, and modest Muslim apparel.
            </p>

            <p className="text-sm text-[#4A4740] leading-relaxed">
              Located on Railway Road in Alipur Chatta, District Gujranwala—within Pakistan&apos;s renowned textile and garment corridor—we combine traditional tailoring skill with organized bulk production workflows designed specifically for international fashion buyers, boutiques, wholesalers, and private-label brands.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white border border-[#141413]/10">
              <ResilientImage
                src={IMAGE_ASSETS.laceTrim}
                alt="Precision tailored contrast lace abaya on dress form at Yasir Apparel"
                aspectClass="aspect-[3/4]"
                loading="eager"
                fallbackTitle="Yasir Apparel Heritage Since 2000"
              />
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <section className="py-14 border-b border-[#141413]/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#8C6D3F]">01.</span>
              <h2 className="font-display text-2xl font-semibold text-[#141413]">
                Quality Stitching &amp; Finish
              </h2>
              <p className="text-sm text-[#4A4740] leading-relaxed">
                Modest garments rely on drape, clean plackets, and balanced hemlines. Every piece undergoes careful cutting, neat interior finishing, pressing, and pre-dispatch inspection so your retail customers experience consistent boutique quality.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs text-[#8C6D3F]">02.</span>
              <h2 className="font-display text-2xl font-semibold text-[#141413]">
                Flexible Customization
              </h2>
              <p className="text-sm text-[#4A4740] leading-relaxed">
                We understand that modest wear preferences differ across the GCC, Europe, North America, and Southeast Asia. We adapt sleeve styles, closures, lengths, fabrics, and embroidery details according to each buyer&apos;s market.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs text-[#8C6D3F]">03.</span>
              <h2 className="font-display text-2xl font-semibold text-[#141413]">
                Transparent B2B Communication
              </h2>
              <p className="text-sm text-[#4A4740] leading-relaxed">
                International sourcing requires responsive updates. Buyers communicate directly with our export desk via WhatsApp and email for fabric videos, sample confirmations, and clear dispatch coordination.
              </p>
            </div>
          </div>
        </section>

        {/* Product Scope & Direct Contact CTA */}
        <section className="pt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-display text-3xl font-semibold text-[#141413]">
              Our Manufacturing Scope
            </h2>
            <p className="text-sm text-[#4A4740] leading-relaxed">
              Beyond our signature abaya collections, we manufacture a complete range of modest apparel for year-round and Ramadan/Eid retail seasons:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-[#141413] pt-2">
              {BUSINESS_CONFIG.coreProducts.map((item) => (
                <li key={item} className="py-2 px-3.5 bg-white border border-[#141413]/10">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 bg-[#141413] text-[#FAF8F5] p-8 space-y-4">
            <p className="text-xs text-[#D4BC8B]">Partner With Us</p>
            <h3 className="font-display text-2xl font-semibold">
              Discuss Your Next Collection With Our Team
            </h3>
            <p className="text-xs text-[#CFC9BE] leading-relaxed">
              Reach out directly on WhatsApp or visit our Wholesale &amp; Export page to request pricing for your boutique or distribution company.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium bg-[#D4BC8B] text-[#141413] hover:bg-[#E2CCA0] transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="/catalogue"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/catalogue');
                }}
                className="inline-flex items-center px-5 py-2.5 text-xs font-medium border border-white/25 text-[#FAF8F5] hover:bg-white/10 transition-colors"
              >
                View Catalogue
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
