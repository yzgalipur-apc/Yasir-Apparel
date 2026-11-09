import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  ABAYA_CATEGORIES,
  IMAGE_ASSETS,
  type AbayaCategory,
  type AbayaOccasion,
  type AbayaStyle,
  type Product,
} from '../data/products';
import { slugifyProduct } from '../utils/catalogueLogic';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface CatalogueAdminPageProps {
  products: Product[];
  onProductsUpdated: (nextProducts: Product[]) => void;
  onNavigate: (path: string) => void;
}

const PRESET_IMAGES = [
  { label: 'Plain Black Abaya (Studio)', url: IMAGE_ASSETS.plainBlack },
  { label: 'Pleated Ombre Abaya', url: IMAGE_ASSETS.ombrePleated },
  { label: 'Champagne Embroidered Abaya', url: IMAGE_ASSETS.embroideredGold },
  { label: 'French Lace Cuff Abaya', url: IMAGE_ASSETS.laceTrim },
  { label: 'Pearl & Taupe Front-Open Set', url: IMAGE_ASSETS.frontOpenIvory },
  { label: 'Two-Tone Asymmetric Panel Abaya', url: IMAGE_ASSETS.heroEditorial },
  { label: 'Mocha Double-Layer Chiffon Abaya', url: IMAGE_ASSETS.doubleLayerMocha },
  { label: 'Obsidian Hand-Beaded Occasion Abaya', url: IMAGE_ASSETS.luxuryOccasionCape },
  { label: 'Atelier Swatches & Craftsmanship', url: IMAGE_ASSETS.atelierCraft },
];

export const CatalogueAdminPage: React.FC<CatalogueAdminPageProps> = ({
  products,
  onProductsUpdated,
  onNavigate,
}) => {
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState<AbayaCategory>('Plain Abayas');
  const [style, setStyle] = useState<AbayaStyle>('Front-Closed Classic');
  const [occasion, setOccasion] = useState<AbayaOccasion>('Everyday Essentials');
  const [mainImage, setMainImage] = useState<string>(IMAGE_ASSETS.plainBlack);
  const [description, setDescription] = useState('');
  const [fabric, setFabric] = useState('Contact us for fabric options and shade cards');
  const [fabricFilterGroup, setFabricFilterGroup] = useState('Matte Crepe Options');
  const [colorsText, setColorsText] = useState('Jet Black, Ivory, Champagne Beige, Custom Shades');
  const [sizesText, setSizesText] = useState('50, 52, 54, 56, 58, 60, Custom Grading');
  const [customizationInfo, setCustomizationInfo] = useState(
    'Custom sizing, fabric selection, embroidery colors, and private-label woven neck tags available.'
  );
  const [wholesaleAvailability, setWholesaleAvailability] = useState(
    'Made-to-order wholesale production — Contact us for details.'
  );
  const [featured, setFeatured] = useState(false);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setEditingSlug(null);
    setName('');
    setCode('');
    setCategory('Plain Abayas');
    setStyle('Front-Closed Classic');
    setOccasion('Everyday Essentials');
    setMainImage(IMAGE_ASSETS.plainBlack);
    setDescription('');
    setFabric('Contact us for fabric options and shade cards');
    setFabricFilterGroup('Matte Crepe Options');
    setColorsText('Jet Black, Ivory, Champagne Beige, Custom Shades');
    setSizesText('50, 52, 54, 56, 58, 60, Custom Grading');
    setCustomizationInfo(
      'Custom sizing, fabric selection, embroidery colors, and private-label woven neck tags available.'
    );
    setWholesaleAvailability('Made-to-order wholesale production — Contact us for details.');
    setFeatured(false);
    setSeoTitle('');
    setSeoDescription('');
  };

  const startEdit = (p: Product) => {
    setEditingSlug(p.slug);
    setName(p.name);
    setCode(p.code);
    setCategory(p.category);
    setStyle(p.style);
    setOccasion(p.occasion);
    setMainImage(p.mainImage);
    setDescription(p.description);
    setFabric(p.fabric);
    setFabricFilterGroup(p.fabricFilterGroup);
    setColorsText(p.availableColors.join(', '));
    setSizesText(p.availableSizes.join(', '));
    setCustomizationInfo(p.customizationInfo);
    setWholesaleAvailability(p.wholesaleAvailability);
    setFeatured(p.featured);
    setSeoTitle(p.seoTitle);
    setSeoDescription(p.seoDescription);
    setStatusMessage(null);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setErrorMessage(null);

    if (!name.trim() || !code.trim() || !description.trim()) {
      setErrorMessage('Product Name, Product Code, and Description are required.');
      return;
    }

    const computedSlug = editingSlug || slugifyProduct(name.trim(), code.trim());
    const colors = colorsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const sizes = sizesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: Product = {
      slug: computedSlug,
      name: name.trim(),
      code: code.trim().toUpperCase(),
      category,
      style,
      occasion,
      mainImage: mainImage.trim() || IMAGE_ASSETS.plainBlack,
      additionalImages: [
        {
          url: mainImage.trim() || IMAGE_ASSETS.plainBlack,
          label: 'Front View',
          alt: `${name.trim()} (${code.trim().toUpperCase()}) front view`,
        },
        {
          url: IMAGE_ASSETS.atelierCraft,
          label: 'Tailoring Detail',
          alt: `${name.trim()} tailoring and fabric swatch detail`,
        },
      ],
      description: description.trim(),
      fabric: fabric.trim() || 'Contact us for details',
      fabricFilterGroup,
      availableColors: colors.length > 0 ? colors : ['Contact us for shade card'],
      availableSizes: sizes.length > 0 ? sizes : ['50', '52', '54', '56', '58', '60'],
      customizationInfo: customizationInfo.trim() || 'Contact us for customization details',
      wholesaleAvailability: wholesaleAvailability.trim() || 'Contact us for wholesale details',
      featured,
      seoTitle:
        seoTitle.trim() || `${name.trim()} ${code.trim().toUpperCase()} | Yasir Apparel Wholesale`,
      seoDescription:
        seoDescription.trim() ||
        `Request wholesale pricing for ${name.trim()} (${code.trim().toUpperCase()}) manufactured in Pakistan by Yasir Apparel.`,
    };

    setSaving(true);
    try {
      const endpoint = editingSlug ? `/api/products/${editingSlug}` : '/api/products';
      const method = editingSlug ? 'PUT' : 'POST';
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save product.');
      }
      onProductsUpdated(data.products);
      setStatusMessage(
        editingSlug
          ? `Updated "${payload.name}" (${payload.code}) in catalogue.`
          : `Added "${payload.name}" (${payload.code}) to catalogue.`
      );
      resetForm();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Unable to save product.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: Product) => {
    setStatusMessage(null);
    setErrorMessage(null);
    try {
      const res = await fetch(`/api/products/${product.slug}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Unable to delete product.');
      }
      onProductsUpdated(data.products);
      setStatusMessage(`Removed "${product.name}" (${product.code}) from catalogue.`);
      if (editingSlug === product.slug) {
        resetForm();
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to remove product.');
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'yasir-apparel-catalogue.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEOHead
        title="Catalogue Management & Owner Setup Guide | Yasir Apparel"
        description="Add, edit, or remove abaya catalogue products and review deployment, CMS, and Google Search Console setup instructions."
        path="/manage-catalogue"
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-20 space-y-14">
        <div>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Catalogue Management & Setup Guide' },
            ]}
            onNavigate={onNavigate}
          />

          <div className="py-6 border-b border-[#141413]/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-xs text-[#8C6D3F] font-medium">Product Management System</p>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#141413]">
                Catalogue Manager &amp; Owner Operations Guide
              </h1>
              <p className="text-sm text-[#4A4740]">
                Add, update, or remove products without touching page layout code. Supports 100+ items with automatic XML sitemap and SEO metadata updates.
              </p>
            </div>

            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium border border-[#141413]/25 text-[#141413] hover:bg-[#EFECE6] cursor-pointer whitespace-nowrap self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Export Catalogue JSON ({products.length})</span>
            </button>
          </div>
        </div>

        {/* Add / Edit Product Form */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <form
            onSubmit={handleSaveProduct}
            className="lg:col-span-6 bg-white border border-[#141413]/12 p-6 sm:p-8 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#141413]/10 pb-3">
              <h2 className="font-display text-2xl font-semibold text-[#141413]">
                {editingSlug ? `Edit Product (${code})` : 'Add New Abaya Design'}
              </h2>
              {editingSlug && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-[#6B675E] underline hover:text-[#141413] cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {statusMessage && (
              <div className="flex items-center gap-2 p-3 bg-[#EDF7F1] border border-[#2D6A4F]/30 text-xs text-[#1B4332]">
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{statusMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div role="alert" className="flex items-center gap-2 p-3 bg-[#FDF2F2] border border-[#9B2C2C]/30 text-xs text-[#9B2C2C]">
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="prod-name" className="block text-xs font-medium text-[#141413] mb-1">
                  Product Name *
                </label>
                <input
                  id="prod-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Royal Velvet Trim Occasion Abaya"
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#141413]/20"
                />
              </div>

              <div>
                <label htmlFor="prod-code" className="block text-xs font-medium text-[#141413] mb-1">
                  Product Code *
                </label>
                <input
                  id="prod-code"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. YA-113"
                  className="w-full px-3 py-2 text-xs font-mono bg-[#FAF8F5] border border-[#141413]/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="prod-category" className="block text-xs font-medium text-[#141413] mb-1">
                  Category
                </label>
                <select
                  id="prod-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as AbayaCategory)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#141413]/20"
                >
                  {ABAYA_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="prod-style" className="block text-xs font-medium text-[#141413] mb-1">
                  Style Silhouette
                </label>
                <select
                  id="prod-style"
                  value={style}
                  onChange={(e) => setStyle(e.target.value as AbayaStyle)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#141413]/20"
                >
                  <option value="Front-Closed Classic">Front-Closed Classic</option>
                  <option value="Front-Open Kimono">Front-Open Kimono</option>
                  <option value="A-Line Tailored">A-Line Tailored</option>
                  <option value="Butterfly / Bisht Cut">Butterfly / Bisht Cut</option>
                  <option value="Double-Layer Draped">Double-Layer Draped</option>
                  <option value="Cape & Occasion Silhouette">Cape &amp; Occasion Silhouette</option>
                  <option value="Custom Pattern / OEM">Custom Pattern / OEM</option>
                </select>
              </div>

              <div>
                <label htmlFor="prod-occasion" className="block text-xs font-medium text-[#141413] mb-1">
                  Occasion
                </label>
                <select
                  id="prod-occasion"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value as AbayaOccasion)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#141413]/20"
                >
                  <option value="Everyday Essentials">Everyday Essentials</option>
                  <option value="Work & Formal Modesty">Work &amp; Formal Modesty</option>
                  <option value="Evening & Occasion">Evening &amp; Occasion</option>
                  <option value="Bridal & Festive">Bridal &amp; Festive</option>
                  <option value="Boutique Private Label">Boutique Private Label</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="prod-preset-img" className="block text-xs font-medium text-[#141413] mb-1">
                  Select Studio Image Preset
                </label>
                <select
                  id="prod-preset-img"
                  value={mainImage}
                  onChange={(e) => setMainImage(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#141413]/20"
                >
                  {PRESET_IMAGES.map((img) => (
                    <option key={img.label} value={img.url}>
                      {img.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="prod-img-url" className="block text-xs font-medium text-[#141413] mb-1">
                  Or Custom Image Path / URL
                </label>
                <input
                  id="prod-img-url"
                  type="text"
                  value={mainImage}
                  onChange={(e) => setMainImage(e.target.value)}
                  placeholder="/images/ya-113-front.jpg"
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#141413]/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="prod-desc" className="block text-xs font-medium text-[#141413] mb-1">
                Product Description *
              </label>
              <textarea
                id="prod-desc"
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe cut, sleeve construction, closure type, and target wholesale appeal..."
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#141413]/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="prod-fabric" className="block text-xs font-medium text-[#141413] mb-1">
                  Fabric Details
                </label>
                <input
                  id="prod-fabric"
                  type="text"
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#141413]/20"
                />
              </div>
              <div>
                <label htmlFor="prod-fabric-group" className="block text-xs font-medium text-[#141413] mb-1">
                  Fabric Filter Group
                </label>
                <select
                  id="prod-fabric-group"
                  value={fabricFilterGroup}
                  onChange={(e) => setFabricFilterGroup(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#141413]/20"
                >
                  <option value="Matte Crepe Options">Matte Crepe Options</option>
                  <option value="Nida & Smooth Drape Options">Nida &amp; Smooth Drape Options</option>
                  <option value="Chiffon & Layered Weaves">Chiffon &amp; Layered Weaves</option>
                  <option value="Lace & Textured Trim Options">Lace &amp; Textured Trim Options</option>
                  <option value="TikTok Textured Weaves">TikTok Textured Weaves</option>
                  <option value="Custom / Buyer Specified">Custom / Buyer Specified</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="prod-colors" className="block text-xs font-medium text-[#141413] mb-1">
                  Available Colors (comma-separated)
                </label>
                <input
                  id="prod-colors"
                  type="text"
                  value={colorsText}
                  onChange={(e) => setColorsText(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#141413]/20"
                />
              </div>
              <div>
                <label htmlFor="prod-sizes" className="block text-xs font-medium text-[#141413] mb-1">
                  Available Sizes (comma-separated)
                </label>
                <input
                  id="prod-sizes"
                  type="text"
                  value={sizesText}
                  onChange={(e) => setSizesText(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#141413]/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="prod-custom" className="block text-xs font-medium text-[#141413] mb-1">
                Customization Information
              </label>
              <input
                id="prod-custom"
                type="text"
                value={customizationInfo}
                onChange={(e) => setCustomizationInfo(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#141413]/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="prod-seo-title" className="block text-xs font-medium text-[#141413] mb-1">
                  SEO Title (Optional auto-generated)
                </label>
                <input
                  id="prod-seo-title"
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Custom SEO Page Title"
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#141413]/20"
                />
              </div>
              <div>
                <label htmlFor="prod-seo-desc" className="block text-xs font-medium text-[#141413] mb-1">
                  SEO Meta Description (Optional)
                </label>
                <input
                  id="prod-seo-desc"
                  type="text"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Custom Search Snippet Description"
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#141413]/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="inline-flex items-center gap-2 text-xs text-[#141413] cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="accent-[#141413]"
                />
                <span>Feature on Home Page</span>
              </label>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium bg-[#141413] text-[#FAF8F5] hover:bg-[#2B2A28] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{saving ? 'Saving...' : editingSlug ? 'Save Product Changes' : 'Add Product to Catalogue'}</span>
              </button>
            </div>
          </form>

          {/* Existing Catalogue Items List */}
          <div className="lg:col-span-6 bg-white border border-[#141413]/12 p-6 sm:p-8 space-y-4">
            <h2 className="font-display text-2xl font-semibold text-[#141413] border-b border-[#141413]/10 pb-3">
              Current Catalogue Inventory ({products.length} Designs)
            </h2>

            <div className="divide-y divide-[#141413]/10 max-h-[640px] overflow-y-auto pr-1">
              {products.map((p) => (
                <div key={p.slug} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-[#6B675E]">
                      <span className="font-mono font-medium text-[#8C6D3F] tabular-nums">{p.code}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{p.category}</span>
                      {p.featured && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#141413] font-medium">Featured</span>
                        </>
                      )}
                    </div>
                    <a
                      href={`/product/${p.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/product/${p.slug}`);
                      }}
                      className="font-display text-lg font-semibold text-[#141413] hover:text-[#8C6D3F] block truncate"
                    >
                      {p.name}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEdit(p)}
                      aria-label={`Edit ${p.name}`}
                      className="p-2 text-[#4A4740] hover:text-[#141413] hover:bg-[#EFECE6] transition-colors cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p)}
                      aria-label={`Delete ${p.name}`}
                      className="p-2 text-[#9B2C2C] hover:bg-[#FDF2F2] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clear Owner Instructions: Images, CMS/Database Options, Deployment & Domain Connection, Google Search Console */}
        <section className="bg-white border border-[#141413]/12 p-6 sm:p-10 space-y-8">
          <div className="border-b border-[#141413]/10 pb-4">
            <p className="text-xs text-[#8C6D3F] font-medium">Technical Documentation &amp; Handover</p>
            <h2 className="font-display text-3xl font-semibold text-[#141413] mt-1">
              Owner Guide: Managing Products, Connecting CMS, Domain &amp; Google Search Console
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#4A4740] leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-display text-xl font-semibold text-[#141413]">
                1. Adding Products &amp; Replacing Photographs
              </h3>
              <p>
                <strong>Via UI Manager:</strong> Use the form above to add, edit, or delete products immediately. Changes persist to <code className="font-mono text-[#141413]">data/products.json</code> on the server and automatically appear in <code className="font-mono text-[#141413]">/sitemap.xml</code>.
              </p>
              <p>
                <strong>Replacing Demo Photos:</strong> Place your studio abaya photographs (3:4 portrait ratio recommended, e.g. 1200×1600px WebP/JPG) inside <code className="font-mono text-[#141413]">public/images/</code> and reference them as <code className="font-mono text-[#141413]">/images/ya-101.jpg</code>, or update default seed records in <code className="font-mono text-[#141413]">src/data/products.ts</code>. Update business hours or phone numbers in <code className="font-mono text-[#141413]">src/data/businessConfig.ts</code>.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-xl font-semibold text-[#141413]">
                2. Recommended Headless CMS / Cloud Database Option
              </h3>
              <p>
                For multi-admin cloud editing across 100–1,000+ SKUs with cloud image hosting, we recommend <strong>Sanity.io</strong> (Free generous tier) or <strong>Supabase / Firebase Firestore</strong>:
              </p>
              <p>
                Because all product components consume the typed <code className="font-mono text-[#141413]">Product</code> interface via <code className="font-mono text-[#141413]">GET /api/products</code> in <code className="font-mono text-[#141413]">server.ts</code>, you only need to swap <code className="font-mono text-[#141413]">readProducts()</code> in <code className="font-mono text-[#141413]">server.ts</code> to fetch from Sanity GROQ or Firestore—zero frontend redesign required.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-xl font-semibold text-[#141413]">
                3. Deploying &amp; Connecting www.yasirapparel.com
              </h3>
              <p>
                1. Build production assets with <code className="font-mono text-[#141413]">npm run build</code> and run the server via <code className="font-mono text-[#141413]">npm start</code> (Cloud Run, Railway, Render, or VPS). Set environment variable <code className="font-mono text-[#141413]">APP_URL=https://www.yasirapparel.com</code>.
              </p>
              <p>
                2. In your domain registrar DNS panel for <strong>yasirapparel.com</strong>, add a <code className="font-mono text-[#141413]">CNAME</code> record for <code className="font-mono text-[#141413]">www</code> pointing to your hosting target, and configure an <code className="font-mono text-[#141413]">A</code> record (or root redirect) from <code className="font-mono text-[#141413]">yasirapparel.com</code> to <code className="font-mono text-[#141413]">https://www.yasirapparel.com</code> with automatic SSL enabled.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-xl font-semibold text-[#141413]">
                4. Google Search Console Indexing Setup
              </h3>
              <p>
                1. Open <strong>search.google.com/search-console</strong> and add a Domain property for <code className="font-mono text-[#141413]">yasirapparel.com</code>. Verify ownership by adding the provided Google TXT record in your domain DNS settings.
              </p>
              <p>
                2. Navigate to <strong>Sitemaps</strong> in Search Console and submit <code className="font-mono text-[#141413]">https://www.yasirapparel.com/sitemap.xml</code>. Use URL Inspection on key pages (<code className="font-mono text-[#141413]">/catalogue</code>, <code className="font-mono text-[#141413]">/custom-manufacturing</code>, <code className="font-mono text-[#141413]">/wholesale-export</code>) to request priority crawling.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
