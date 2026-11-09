import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { IMAGE_ASSETS, type Product } from '../data/products';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { buildGeneralWhatsAppUrl } from '../utils/catalogueLogic';
import { SEOHead } from '../components/SEOHead';
import { ProductCard } from '../components/ProductCard';
import { ResilientImage } from '../components/ResilientImage';

interface HomePageProps {
  products: Product[];
  onNavigate: (path: string) => void;
}

const FEATURED_COLLECTIONS = [
  {
    title: 'Plain & Everyday Core Abayas',
    category: 'Plain Abayas',
    subtitle: 'Architectural cuts in matte crepe & smooth weaves',
    image: IMAGE_ASSETS.plainBlack,
  },
  {
    title: 'Double-Tone & Ombre Abayas',
    category: 'Double-Tone and Ombre Abayas',
    subtitle: 'Pleated gradients and contrast panel silhouettes',
    image: IMAGE_ASSETS.ombrePleated,
  },
  {
    title: 'Embroidered & Couture Abayas',
    category: 'Embroidered Abayas',
    subtitle: 'Botanical threadwork and festive bell-sleeve craft',
    image: IMAGE_ASSETS.embroideredGold,
  },
  {
    title: 'Lace, Net & Contrast Abayas',
    category: 'Lace and Net Abayas',
    subtitle: 'Delicate scalloped lace cuffs and ivory bindings',
    image: IMAGE_ASSETS.laceTrim,
  },
  {
    title: 'Front-Open & Layered Sets',
    category: 'Front-Open Abayas',
    subtitle: 'Modern lapel coats paired with coordinated inner slips',
    image: IMAGE_ASSETS.frontOpenIvory,
  },
  {
    title: 'Luxury Occasion Abayas',
    category: 'Luxury Occasion Abayas',
    subtitle: 'Hand-beaded shoulder capes and formal modest wear',
    image: IMAGE_ASSETS.luxuryOccasionCape,
  },
];

const WHY_CHOOSE_ITEMS = [
  {
    num: '01',
    title: 'Precision Tailoring & Stitching',
    description:
      'Clean seam allowances, balanced hems, and multi-stage garment inspection overseen at our Alipur Chatta production unit.',
  },
  {
    num: '02',
    title: 'Manufacturing to Your Designs',
    description:
      'Send reference photographs, physical samples, or technical packs—we draft patterns to match your exact brand silhouette.',
  },
  {
    num: '03',
    title: 'Diverse Fabric & Color Options',
    description:
      'Access matte crepe, Nida-style smooth weaves, chiffon, French lace, net overlays, and trending TikTok textured fabrics.',
  },
  {
    num: '04',
    title: 'Custom Grading & Private Labels',
    description:
      'Full GCC sizing (50–60), UK/EU/US modest grading, plus custom woven neck labels, care tags, and boutique packaging.',
  },
  {
    num: '05',
    title: 'Direct Factory Export Pricing',
    description:
      'Work directly with an established Pakistani manufacturer—eliminating middlemen markups for boutiques, wholesalers, and distributors.',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ products, onNavigate }) => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 6);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <>
      <SEOHead
        title="Yasir Apparel — Abaya Manufacturer, Wholesaler & Custom Modest Fashion Exporter"
        description="Pakistan-based abaya manufacturer and Muslim apparel exporter established in 2000. Explore wholesale abayas, custom private-label manufacturing, hijabs, and prayer garments."
        path="/"
      />

      {/* 1. Hero Section — Split Editorial Layout */}
      <section className="border-b border-[#141413]/10 bg-[#FAF8F5]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B675E]">
                <span>Established {BUSINESS_CONFIG.establishedYear}</span>
                <span aria-hidden="true">·</span>
                <span>Gujranwala, Pakistan</span>
                <span aria-hidden="true">·</span>
                <span>Global B2B Export</span>
              </div>

              <h1 className="font-display text-[clamp(2.35rem,4.4vw,4rem)] font-semibold text-[#141413] leading-[1.08] max-w-2xl">
                Premium Abaya Manufacturing &amp; Custom Modest Fashion
              </h1>

              <p className="text-base sm:text-lg text-[#4A4740] leading-relaxed max-w-xl">
                Your Trusted Manufacturing Partner for Abayas and Muslim Apparel Since 2000. We craft custom-designed abayas, hijabs, and prayer garments for international boutiques, distributors, and private-label fashion houses.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="/catalogue"
                  onClick={(e) => go(e, '/catalogue')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium bg-[#141413] text-[#FAF8F5] hover:bg-[#2B2A28] transition-colors whitespace-nowrap"
                >
                  <span>Explore Our Collection</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href="/wholesale-export"
                  onClick={(e) => go(e, '/wholesale-export')}
                  className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium border border-[#141413]/30 text-[#141413] hover:bg-[#EFECE6] transition-colors whitespace-nowrap"
                >
                  Request Wholesale Pricing
                </a>
              </div>

              <div className="pt-6 border-t border-[#141413]/10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-lg">
                <div>
                  <p className="font-display text-xl sm:text-2xl font-semibold text-[#141413] tabular-nums whitespace-nowrap">Since 2000</p>
                  <p className="text-xs text-[#6B675E] mt-0.5">Manufacturing Heritage</p>
                </div>
                <div>
                  <p className="font-display text-xl sm:text-2xl font-semibold text-[#141413] whitespace-nowrap">OEM &amp; ODM</p>
                  <p className="text-xs text-[#6B675E] mt-0.5">Custom Pattern &amp; Labels</p>
                </div>
                <div>
                  <p className="font-display text-xl sm:text-2xl font-semibold text-[#141413] whitespace-nowrap">Factory Direct</p>
                  <p className="text-xs text-[#6B675E] mt-0.5">Wholesale Export Pricing</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex">
              <div className="w-full relative border border-[#141413]/10 bg-[#EFECE6]">
                <ResilientImage
                  src={IMAGE_ASSETS.heroEditorial}
                  alt="Signature two-tone black and champagne tailored abaya crafted by Yasir Apparel"
                  aspectClass="aspect-[4/5] lg:aspect-auto lg:h-full"
                  loading="eager"
                  fallbackTitle="Yasir Apparel Couture Abaya"
                />
                <div className="p-4 bg-white border-t border-[#141413]/10 flex items-center justify-between text-xs">
                  <span className="text-[#4A4740]">Architectural Two-Tone Collection · Code YA-106</span>
                  <a
                    href="/product/architectural-panel-front-closed-abaya-ya-106"
                    onClick={(e) => go(e, '/product/architectural-panel-front-closed-abaya-ya-106')}
                    className="font-medium text-[#141413] hover:text-[#8C6D3F] underline underline-offset-4 whitespace-nowrap"
                  >
                    Inspect Piece
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Abaya Collections */}
      <section className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-[#141413]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs text-[#8C6D3F] font-medium">Curated Category Lines</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#141413]">
                Featured Abaya Collections
              </h2>
            </div>
            <a
              href="/catalogue"
              onClick={(e) => go(e, '/catalogue')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#141413] hover:text-[#8C6D3F] transition-colors whitespace-nowrap"
            >
              <span>Browse Full 10-Category Catalogue</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {FEATURED_COLLECTIONS.map((col) => {
              const href = `/catalogue?category=${encodeURIComponent(col.category)}`;
              return (
                <a
                  key={col.category}
                  href={href}
                  onClick={(e) => go(e, href)}
                  className="group block bg-white border border-[#141413]/10 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <ResilientImage
                    src={col.image}
                    alt={`${col.title} wholesale collection by Yasir Apparel`}
                    aspectClass="aspect-[4/5]"
                    fallbackTitle={col.title}
                    className="transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="p-5 space-y-1">
                    <h3 className="font-display text-xl font-semibold text-[#141413] group-hover:text-[#8C6D3F] transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-xs text-[#6B675E]">{col.subtitle}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Featured Products & Latest Designs */}
      <section className="py-16 lg:py-24 bg-[#F3EFE8] border-b border-[#141413]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <p className="text-xs text-[#8C6D3F] font-medium">Wholesale Lookbook Selection</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#141413]">
                Featured Products &amp; Latest Designs
              </h2>
              <p className="text-sm text-[#4A4740]">
                Every design can be ordered in standard boutique size runs or customized in your preferred fabric, shade card, and private brand label.
              </p>
            </div>
            <a
              href="/catalogue"
              onClick={(e) => go(e, '/catalogue')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium bg-[#141413] text-[#FAF8F5] hover:bg-[#2B2A28] transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <span>View All Catalogue Styles</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayProducts.map((product) => (
              <ProductCard key={product.slug} product={product} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Yasir Apparel & Craftsmanship / Custom Private Label */}
      <section className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-[#141413]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-xs text-[#8C6D3F] font-medium">Atelier &amp; Private-Label Capabilities</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#141413]">
                Custom Design &amp; Private-Label Manufacturing Since 2000
              </h2>
              <p className="text-sm sm:text-base text-[#4A4740] leading-relaxed">
                Operating from Alipur Chatta, Gujranwala, Yasir Apparel partners with international modest fashion brands, retail chains, and independent boutiques to turn creative concepts into export-ready collections.
              </p>
              <p className="text-sm text-[#4A4740] leading-relaxed">
                Whether you are sourcing core plain black abayas, embroidered occasion silhouettes, two-piece prayer sets, or developing a proprietary collection from reference photographs, our team manages pattern grading, fabric sourcing, custom embroidery, and woven brand labeling under one roof.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="/custom-manufacturing"
                  onClick={(e) => go(e, '/custom-manufacturing')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-medium bg-[#141413] text-[#FAF8F5] hover:bg-[#2B2A28] transition-colors whitespace-nowrap"
                >
                  <span>Start a Custom Design Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a
                  href="/about"
                  onClick={(e) => go(e, '/about')}
                  className="text-xs font-medium text-[#141413] underline underline-offset-4 hover:text-[#8C6D3F] transition-colors whitespace-nowrap"
                >
                  Read Our Manufacturing Story
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-[#141413]/10 bg-white">
                <ResilientImage
                  src={IMAGE_ASSETS.atelierCraft}
                  alt="Yasir Apparel tailoring table with black, ivory, and champagne abaya fabrics, shears, and cuff stitch detail"
                  aspectClass="aspect-[4/3]"
                  fallbackTitle="Precision Stitching & Private Labeling"
                />
              </div>
            </div>
          </div>

          {/* Editorial numbered Why Choose list — no mechanical slashes */}
          <div className="pt-12 border-t border-[#141413]/10 space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#141413]">
              Why International Buyers Choose Yasir Apparel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {WHY_CHOOSE_ITEMS.map((item) => (
                <div key={item.num} className="space-y-2 pt-4 border-t border-[#141413]/15">
                  <span className="font-mono text-xs text-[#8C6D3F] tabular-nums">{item.num}.</span>
                  <h3 className="font-display text-xl font-semibold text-[#141413] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4A4740] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Wholesale & Export Inquiry Call to Action */}
      <section className="py-16 lg:py-20 bg-[#141413] text-[#FAF8F5]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs text-[#D4BC8B] font-medium">Direct Factory Export Desk · Pakistan</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#FAF8F5]">
              Ready to Source Wholesale Abayas or Launch Your Private-Label Line?
            </h2>
            <p className="text-sm text-[#CFC9BE] leading-relaxed">
              Share product codes from our catalogue or send your own design references on WhatsApp or email to receive tailored wholesale quotations, fabric options, and production timelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium bg-[#D4BC8B] text-[#141413] hover:bg-[#E2CCA0] transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>WhatsApp +92 300 7428175</span>
            </a>

            <a
              href="/wholesale-export"
              onClick={(e) => go(e, '/wholesale-export')}
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium border border-[#FAF8F5]/30 text-[#FAF8F5] hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              Submit Quotation Form
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
