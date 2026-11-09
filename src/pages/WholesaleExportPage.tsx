import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../utils/catalogueLogic';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InquiryForm } from '../components/InquiryForm';

interface WholesaleExportPageProps {
  onNavigate: (path: string) => void;
}

const BUYER_PROFILES = [
  {
    title: 'Modest Fashion Boutiques',
    detail:
      'Curate cohesive seasonal abaya capsules in assorted sizes (50–60) with option for boutique woven neck labels.',
  },
  {
    title: 'Regional Wholesalers & Importers',
    detail:
      'Source competitive factory-direct bulk cartons of plain, TikTok fabric, embroidered, and prayer garments.',
  },
  {
    title: 'Online Modest Wear Brands',
    detail:
      'Develop proprietary D2C designs from tech packs or reference photos with repeatable replenishment runs.',
  },
  {
    title: 'Department & Occasion Retailers',
    detail:
      'Order structured Ramadan, Eid, and bridal modest wear collections tailored to regional color and length preferences.',
  },
];

export const WholesaleExportPage: React.FC<WholesaleExportPageProps> = ({ onNavigate }) => {
  return (
    <>
      <SEOHead
        title="Wholesale Abaya Supplier & Exporter from Pakistan | Yasir Apparel"
        description="Partner with Yasir Apparel for wholesale abayas, bulk modest apparel production, private-label branding, and worldwide export from Pakistan."
        path="/wholesale-export"
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Wholesale & Export' },
          ]}
          onNavigate={onNavigate}
        />

        <div className="py-8 lg:py-12 border-b border-[#141413]/10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <p className="text-xs text-[#8C6D3F] font-medium">International B2B Supply &amp; Export</p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#141413] leading-tight">
              Wholesale Abaya Supply &amp; Worldwide Export Partnerships
            </h1>
            <p className="text-base text-[#4A4740] leading-relaxed">
              Yasir Apparel supplies international wholesalers, retail boutiques, importers, and private-label fashion brands with factory-direct abayas and Muslim apparel manufactured in Pakistan.
            </p>
          </div>

          <a
            href={buildGeneralWhatsAppUrl(
              'Hello Yasir Apparel, I am an international wholesale buyer interested in requesting your wholesale price list and export terms.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-medium bg-[#141413] text-[#FAF8F5] hover:bg-[#2B2A28] transition-colors whitespace-nowrap self-start lg:self-auto"
          >
            <MessageCircle className="w-4 h-4 text-[#D4BC8B]" aria-hidden="true" />
            <span>Direct WhatsApp Wholesale Desk</span>
          </a>
        </div>

        {/* Who We Serve */}
        <section className="py-14 border-b border-[#141413]/10 space-y-8">
          <h2 className="font-display text-3xl font-semibold text-[#141413]">
            Tailored for Global B2B Buyers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUYER_PROFILES.map((profile, idx) => (
              <div key={profile.title} className="bg-white border border-[#141413]/10 p-6 space-y-2.5">
                <span className="font-mono text-xs text-[#8C6D3F] tabular-nums">0{idx + 1}.</span>
                <h3 className="font-display text-xl font-semibold text-[#141413]">{profile.title}</h3>
                <p className="text-xs text-[#4A4740] leading-relaxed">{profile.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Export Services & Quotation Form */}
        <section id="quote-form" className="pt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-3xl font-semibold text-[#141413]">
              Quotation, Sampling &amp; Export Logistics
            </h2>
            <div className="space-y-4 text-sm text-[#4A4740] leading-relaxed">
              <p>
                Because fabric selection, embroidery complexity, order volume, and destination shipping vary by buyer, we prepare accurate custom quotations rather than publishing one-size-fits-all retail prices.
              </p>
              <div className="bg-white border border-[#141413]/10 p-5 space-y-3 text-xs">
                <div>
                  <p className="font-semibold text-[#141413]">Minimum Order Quantities (MOQ)</p>
                  <p className="text-[#6B675E] mt-0.5">
                    Flexible per style depending on stocked fabric vs. custom dye/embroidery runs — Contact us for details.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#141413]/8">
                  <p className="font-semibold text-[#141413]">Pre-Production Sampling</p>
                  <p className="text-[#6B675E] mt-0.5">
                    Sample pieces can be dispatched via international courier so you can verify stitching, drape, and sizing prior to bulk confirmation.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#141413]/8">
                  <p className="font-semibold text-[#141413]">Global Freight Options</p>
                  <p className="text-[#6B675E] mt-0.5">
                    Door-to-door air express courier for boutique parcels, as well as air cargo and sea freight coordination for volume wholesale shipments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <InquiryForm
              mode="wholesale"
              heading="Request Wholesale Quotation & Export Terms"
              subheading="List the catalogue codes or product categories you are interested in, along with your destination country."
            />
          </div>
        </section>
      </div>
    </>
  );
};
