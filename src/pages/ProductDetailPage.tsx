import React, { useState, useEffect, useMemo } from 'react';
import { MessageCircle, Mail, ArrowLeft } from 'lucide-react';
import type { Product } from '../data/products';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { buildProductWhatsAppUrl } from '../utils/catalogueLogic';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResilientImage } from '../components/ResilientImage';
import { ProductCard } from '../components/ProductCard';
import { InquiryForm } from '../components/InquiryForm';

interface ProductDetailPageProps {
  slug: string;
  products: Product[];
  onNavigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  products,
  onNavigate,
}) => {
  const product = useMemo(() => products.find((p) => p.slug === slug), [products, slug]);

  const gallery = useMemo(() => {
    if (!product) return [];
    if (product.additionalImages && product.additionalImages.length > 0) {
      return product.additionalImages;
    }
    return [
      {
        url: product.mainImage,
        label: 'Front View' as const,
        alt: `${product.name} (${product.code})`,
      },
    ];
  }, [product]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showCustomForm, setShowCustomForm] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColor(product?.availableColors?.[0] || '');
    setSelectedSize(product?.availableSizes?.[0] || '');
    setShowCustomForm(false);
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-20 text-center space-y-4">
        <SEOHead
          title="Product Not Found | Yasir Apparel Abaya Catalogue"
          description="Browse Yasir Apparel's wholesale abaya catalogue."
          path={`/product/${slug}`}
        />
        <h1 className="font-display text-3xl font-semibold text-[#141413]">
          Product Design Not Found
        </h1>
        <p className="text-sm text-[#6B675E]">
          The requested product code or URL may have been updated in our catalogue.
        </p>
        <a
          href="/catalogue"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/catalogue');
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium bg-[#141413] text-[#FAF8F5]"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Return to Abaya Catalogue</span>
        </a>
      </div>
    );
  }

  const activeImage = gallery[activeImageIndex] || gallery[0];
  const whatsappUrl = buildProductWhatsAppUrl(product, selectedColor, selectedSize);

  const emailSubject = encodeURIComponent(
    `Wholesale Price Inquiry: ${product.name} (Product Code ${product.code})`
  );
  const emailBody = encodeURIComponent(
    `Hello Yasir Apparel,\n\nI am interested in your ${product.name}, Product Code ${product.code}.\nSelected Color Reference: ${selectedColor || 'Standard'}\nSelected Size Run: ${selectedSize || 'Standard'}\n\nPlease share wholesale pricing, available fabric options, colors, sizes, and minimum order requirements.\n\nThank you.`
  );

  // Accurate B2B Product & Breadcrumb JSON-LD without fabricated prices or fake stock counts
  const productJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      sku: product.code,
      mpn: product.code,
      category: product.category,
      description: product.description,
      brand: {
        '@type': 'Brand',
        name: BUSINESS_CONFIG.name,
      },
      manufacturer: {
        '@type': 'Organization',
        name: BUSINESS_CONFIG.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Gujranwala',
          addressCountry: 'PK',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${BUSINESS_CONFIG.website}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Abaya Catalogue',
          item: `${BUSINESS_CONFIG.website}/catalogue`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: product.name,
          item: `${BUSINESS_CONFIG.website}/product/${product.slug}`,
        },
      ],
    },
  ];

  const relatedProducts = products
    .filter((p) => p.slug !== product.slug && (p.category === product.category || p.featured))
    .slice(0, 3);

  return (
    <>
      <SEOHead
        title={product.seoTitle}
        description={product.seoDescription}
        path={`/product/${product.slug}`}
        jsonLd={productJsonLd}
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Abaya Catalogue', href: '/catalogue' },
            {
              label: product.category,
              href: `/catalogue?category=${encodeURIComponent(product.category)}`,
            },
            { label: `${product.name} (${product.code})` },
          ]}
          onNavigate={onNavigate}
        />

        {/* Contiguous PDP Split: Gallery Left, Wholesale Inquiry Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-4">
          {/* Left: Large Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-[#141413]/10">
              <ResilientImage
                src={activeImage.url}
                alt={activeImage.alt}
                aspectClass="aspect-[3/4]"
                loading="eager"
                fallbackTitle={product.name}
              />
              <div className="px-4 py-2.5 border-t border-[#141413]/8 flex items-center justify-between text-xs text-[#6B675E]">
                <span>{activeImage.label}</span>
                <span className="font-mono tabular-nums">Code: {product.code}</span>
              </div>
            </div>

            {gallery.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3" role="group" aria-label="Product views">
                {gallery.map((item, idx) => (
                  <button
                    key={`${item.label}-${idx}`}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View ${item.label}`}
                    className={`text-left bg-white border transition-colors cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#141413] ring-1 ring-[#141413]'
                        : 'border-[#141413]/12 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <ResilientImage
                      src={item.url}
                      alt={item.alt}
                      aspectClass="aspect-[3/4]"
                      fallbackTitle={item.label}
                    />
                    <span className="block px-2 py-1.5 text-[11px] text-[#141413] truncate">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Contiguous Wholesale Specifications & Inquiry Module */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 bg-white border border-[#141413]/12 p-6 sm:p-8 space-y-6">
              <div className="space-y-2 border-b border-[#141413]/10 pb-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B675E]">
                  <span>{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.style}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums text-[#8C6D3F] font-medium">
                    Code {product.code}
                  </span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#141413] leading-tight">
                  {product.name}
                </h1>

                <p className="text-sm text-[#4A4740] leading-relaxed pt-1">
                  {product.description}
                </p>
              </div>

              {/* Specifications Table (Editable / Honest fields — zero invented stock/MOQ numbers) */}
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs font-medium text-[#6B675E]">Fabric Information</dt>
                  <dd className="text-[#141413] mt-0.5">{product.fabric}</dd>
                </div>

                <div>
                  <dt className="text-xs font-medium text-[#6B675E] mb-1.5">
                    Available Color Options (Select preference for inquiry)
                  </dt>
                  <dd className="flex flex-wrap gap-2">
                    {product.availableColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                          selectedColor === color
                            ? 'bg-[#141413] text-[#FAF8F5] font-medium'
                            : 'bg-[#FAF8F5] border border-[#141413]/15 text-[#4A4740] hover:border-[#141413]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-medium text-[#6B675E] mb-1.5">
                    Available Sizes (Standard Abaya Length / Custom Grading)
                  </dt>
                  <dd className="flex flex-wrap gap-2">
                    {product.availableSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs tabular-nums transition-colors cursor-pointer ${
                          selectedSize === size
                            ? 'bg-[#141413] text-[#FAF8F5] font-medium'
                            : 'bg-[#FAF8F5] border border-[#141413]/15 text-[#4A4740] hover:border-[#141413]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </dd>
                </div>

                <div className="pt-2 border-t border-[#141413]/8">
                  <dt className="text-xs font-medium text-[#6B675E]">Customization &amp; Private Label</dt>
                  <dd className="text-[#4A4740] text-xs leading-relaxed mt-0.5">
                    {product.customizationInfo}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-medium text-[#6B675E]">Wholesale &amp; Bulk-Order Availability</dt>
                  <dd className="text-[#141413] text-xs font-medium mt-0.5">
                    {product.wholesaleAvailability}
                  </dd>
                </div>
              </dl>

              {/* Primary WhatsApp & Custom Design Inquiry Actions */}
              <div className="pt-4 border-t border-[#141413]/10 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium bg-[#141413] text-[#FAF8F5] hover:bg-[#2B2A28] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#D4BC8B]" aria-hidden="true" />
                  <span>Inquire Wholesale Price on WhatsApp</span>
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomForm((prev) => !prev);
                      setTimeout(() => {
                        document.getElementById('pdp-custom-inquiry')?.scrollIntoView({ behavior: 'smooth' });
                      }, 60);
                    }}
                    className="px-4 py-2.5 text-xs font-medium border border-[#141413]/25 text-[#141413] hover:bg-[#EFECE6] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {showCustomForm ? 'Hide Custom Inquiry Form' : 'Custom Design / Bulk Form'}
                  </button>

                  <a
                    href={`mailto:${BUSINESS_CONFIG.email}?subject=${emailSubject}&body=${emailBody}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium border border-[#141413]/25 text-[#141413] hover:bg-[#EFECE6] transition-colors whitespace-nowrap"
                  >
                    <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Inquire via Email</span>
                  </a>
                </div>

                <p className="text-[11px] text-[#6B675E] leading-normal">
                  Prefilled WhatsApp message automatically includes <strong>{product.name}</strong> and Product Code <strong>{product.code}</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Custom Design & Bulk Quotation Form for this Product */}
        {showCustomForm && (
          <div id="pdp-custom-inquiry" className="pt-12">
            <InquiryForm
              mode="custom_manufacturing"
              defaultProductCode={`${product.name} (${product.code})`}
              heading={`Request Custom Modifications or Bulk Pricing for ${product.code}`}
              subheading="Specify your required fabric grade, color breakdown, size chart, or private-label tag requirements."
            />
          </div>
        )}

        {/* Related Catalogue Styles */}
        {relatedProducts.length > 0 && (
          <section className="pt-16 mt-16 border-t border-[#141413]/10 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#141413]">
                Related Wholesale Designs
              </h2>
              <a
                href="/catalogue"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/catalogue');
                }}
                className="text-xs font-medium text-[#141413] underline underline-offset-4 hover:text-[#8C6D3F]"
              >
                View All Catalogue
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.slug} product={rel} onNavigate={onNavigate} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};
