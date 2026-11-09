import React from 'react';
import { IMAGE_ASSETS } from '../data/products';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResilientImage } from '../components/ResilientImage';
import { InquiryForm } from '../components/InquiryForm';

interface CustomManufacturingPageProps {
  onNavigate: (path: string) => void;
}

const OEM_STEPS = [
  {
    step: '01',
    title: 'Design Brief & Reference Submission',
    detail:
      'Share your design sketches, reference photographs, tech packs, or ship a physical garment sample to our Gujranwala facility.',
  },
  {
    step: '02',
    title: 'Fabric & Trim Selection',
    detail:
      'Choose from matte crepe, Nida-style weaves, chiffon, French lace, net overlays, embroidered borders, or TikTok textured fabrics in your desired shades.',
  },
  {
    step: '03',
    title: 'Pattern Drafting & Prototype Sampling',
    detail:
      'Our master tailors draft custom paper patterns according to your regional size chart (GCC 50–60 or UK/EU/US grading) and prepare a pre-production sample for approval.',
  },
  {
    step: '04',
    title: 'Bulk Stitching, Private Labeling & Export',
    detail:
      'Approved designs move into dedicated stitching lines with custom woven neck labels, care instructions, hangtags, and neat export packaging.',
  },
];

export const CustomManufacturingPage: React.FC<CustomManufacturingPageProps> = ({ onNavigate }) => {
  return (
    <>
      <SEOHead
        title="Custom Abaya Manufacturer & Private Label OEM Modest Wear | Yasir Apparel"
        description="Manufacture custom-designed abayas and private-label modest fashion in Pakistan with Yasir Apparel. Send reference photos or tech packs for pattern drafting and bulk production."
        path="/custom-manufacturing"
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Custom Manufacturing' },
          ]}
          onNavigate={onNavigate}
        />

        {/* Hero Split */}
        <div className="py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-[#141413]/10">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs text-[#8C6D3F] font-medium">OEM &amp; Private-Label Production</p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#141413] leading-tight">
              Custom Abaya Manufacturing Tailored to Your Brand Vision
            </h1>
            <p className="text-base text-[#4A4740] leading-relaxed max-w-2xl">
              Since 2000, Yasir Apparel has specialized in manufacturing abayas, hijabs, prayer garments, and modest dresses strictly according to our clients&apos; own designs, reference photographs, fabric preferences, custom size charts, and private-label branding.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-[#141413]/10 bg-white">
              <ResilientImage
                src={IMAGE_ASSETS.atelierCraft}
                alt="Custom abaya pattern making, fabric swatches, and woven brand labels at Yasir Apparel"
                aspectClass="aspect-[4/3]"
                loading="eager"
                fallbackTitle="Bespoke Pattern & Label Atelier"
              />
            </div>
          </div>
        </div>

        {/* 4-Step Process */}
        <section className="py-14 border-b border-[#141413]/10 space-y-8">
          <div className="max-w-xl space-y-2">
            <h2 className="font-display text-3xl font-semibold text-[#141413]">
              How Our Custom Manufacturing Process Works
            </h2>
            <p className="text-sm text-[#4A4740]">
              Structured communication from initial sketch or reference image through to international cargo dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OEM_STEPS.map((item) => (
              <div key={item.step} className="bg-white border border-[#141413]/10 p-6 space-y-3">
                <span className="font-mono text-xs text-[#8C6D3F] tabular-nums">{item.step}.</span>
                <h3 className="font-display text-xl font-semibold text-[#141413] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#4A4740] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Customization Capabilities + Inquiry Form */}
        <section className="pt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl font-semibold text-[#141413]">
                What You Can Customize
              </h2>
              <p className="text-sm text-[#4A4740] leading-relaxed">
                Every detail of your collection is configurable to align with your boutique positioning and customer demographics:
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="pb-4 border-b border-[#141413]/10">
                <h3 className="font-display text-lg font-semibold text-[#141413]">Silhouettes &amp; Construction</h3>
                <p className="text-xs text-[#4A4740] mt-1 leading-relaxed">
                  Front-open kimonos, front-closed classics, double-layer chiffon drapes, butterfly/bisht cuts, nursing-friendly concealed zippers, and coordinated inner slip dresses.
                </p>
              </div>
              <div className="pb-4 border-b border-[#141413]/10">
                <h3 className="font-display text-lg font-semibold text-[#141413]">Embroidery, Lace &amp; Handwork</h3>
                <p className="text-xs text-[#4A4740] mt-1 leading-relaxed">
                  Computerized multi-head thread embroidery from your artwork, scalloped French lace trims, net sleeve panels, pleated ombre gradients, and occasion beadwork.
                </p>
              </div>
              <div className="pb-4 border-b border-[#141413]/10">
                <h3 className="font-display text-lg font-semibold text-[#141413]">Private-Label Branding</h3>
                <p className="text-xs text-[#4A4740] mt-1 leading-relaxed">
                  Custom woven main neck labels, satin care/composition labels, size tabs, branded hangtags, and individual polybag or boutique box presentation.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <InquiryForm
              mode="custom_manufacturing"
              heading="Submit Custom Manufacturing & Tech-Pack Inquiry"
              subheading="Provide your design requirements below. You can attach a reference photograph or PDF tech pack and follow up immediately on WhatsApp."
            />
          </div>
        </section>
      </div>
    </>
  );
};
