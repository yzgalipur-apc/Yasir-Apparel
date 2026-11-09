import React from 'react';
import { MapPin, MessageCircle, Mail, Clock, ExternalLink } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { buildGeneralWhatsAppUrl } from '../utils/catalogueLogic';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InquiryForm } from '../components/InquiryForm';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const googleMapsExternalUrl = `https://www.google.com/maps/search/?api=1&query=${BUSINESS_CONFIG.location.coordinatesQuery}`;

  return (
    <>
      <SEOHead
        title="Contact Yasir Apparel — Abaya Manufacturer in Gujranwala, Pakistan"
        description="Contact Yasir Apparel via WhatsApp (+92 300 7428175) or email (info@yasirapparel.com). Factory & office located at Railway Road, Alipur Chatta, Gujranwala, Pakistan."
        path="/contact"
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Contact Us' },
          ]}
          onNavigate={onNavigate}
        />

        <div className="py-8 border-b border-[#141413]/10 space-y-2 max-w-2xl">
          <p className="text-xs text-[#8C6D3F] font-medium">Direct Factory &amp; Export Communication</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#141413]">
            Contact Yasir Apparel
          </h1>
          <p className="text-sm sm:text-base text-[#4A4740] leading-relaxed">
            Reach our wholesale and custom manufacturing desk directly via WhatsApp, email, or the inquiry form below.
          </p>
        </div>

        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Cards & Editable Business Hours + Map Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#141413]/12 p-6 space-y-5">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#8C6D3F] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h2 className="font-display text-lg font-semibold text-[#141413]">
                    Manufacturing &amp; Office Address
                  </h2>
                  <p className="text-sm text-[#4A4740] mt-0.5">
                    {BUSINESS_CONFIG.location.street}
                    <br />
                    {BUSINESS_CONFIG.location.city}, {BUSINESS_CONFIG.location.country}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#141413]/8 flex items-start gap-3.5">
                <MessageCircle className="w-5 h-5 text-[#8C6D3F] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h2 className="font-display text-lg font-semibold text-[#141413]">
                    WhatsApp Export Desk
                  </h2>
                  <a
                    href={buildGeneralWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-medium text-[#141413] hover:text-[#8C6D3F] underline underline-offset-4 mt-0.5 tabular-nums"
                  >
                    {BUSINESS_CONFIG.whatsappDisplay}
                  </a>
                  <p className="text-xs text-[#6B675E] mt-1">
                    Fastest response for wholesale pricing, catalogue codes, and sample inquiries.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#141413]/8 flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#8C6D3F] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h2 className="font-display text-lg font-semibold text-[#141413]">
                    Business Email
                  </h2>
                  <a
                    href={`mailto:${BUSINESS_CONFIG.email}`}
                    className="inline-block text-sm font-medium text-[#141413] hover:text-[#8C6D3F] underline underline-offset-4 mt-0.5"
                  >
                    {BUSINESS_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-[#141413]/8 flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#8C6D3F] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h2 className="font-display text-lg font-semibold text-[#141413]">
                    Business Hours (Editable)
                  </h2>
                  <p className="text-xs text-[#4A4740] mt-1">
                    {BUSINESS_CONFIG.editableBusinessHours.productionAndOffice}
                  </p>
                  <p className="text-xs text-[#6B675E] mt-0.5">
                    {BUSINESS_CONFIG.editableBusinessHours.closedDay}
                  </p>
                </div>
              </div>
            </div>

            {/* Clean Google Maps Embed Placeholder */}
            <div className="bg-[#EFECE6] border border-[#141413]/12 p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-display text-xl font-semibold text-[#141413]">
                  Location Map — Alipur Chatta, Gujranwala
                </h2>
              </div>
              <div className="aspect-[16/9] bg-[#E5E0D5] border border-[#141413]/10 flex flex-col items-center justify-center p-6 text-center">
                <MapPin className="w-7 h-7 text-[#8C6D3F] mb-2" aria-hidden="true" />
                <p className="text-sm font-medium text-[#141413]">
                  Railway Road, Alipur Chatta, Gujranwala, Pakistan
                </p>
                <p className="text-xs text-[#6B675E] mt-1 max-w-xs">
                  Google Maps Embed Placeholder — Replace with your verified Google Business Profile iframe embed or open directly in Google Maps below.
                </p>
                <a
                  href={googleMapsExternalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[#141413] text-[#FAF8F5] hover:bg-[#2B2A28] transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <InquiryForm
              mode="contact"
              heading="Send a Direct Business Inquiry"
              subheading="Have a question regarding wholesale orders, custom designs, or factory visits? Complete the form below."
            />
          </div>
        </div>
      </div>
    </>
  );
};
