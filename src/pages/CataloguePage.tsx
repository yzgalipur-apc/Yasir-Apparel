import React, { useMemo, useState, useEffect } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { ABAYA_CATEGORIES, type AbayaCategory, type Product } from '../data/products';
import { filterProducts, paginateProducts } from '../utils/catalogueLogic';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';

interface CataloguePageProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  initialCategoryFromUrl?: string;
  onNavigate: (path: string) => void;
}

const COLOR_FILTERS = ['All', 'Black', 'Ivory', 'Champagne', 'Taupe', 'Mocha', 'Sand', 'Custom'];
const PAGE_SIZE = 9;

export const CataloguePage: React.FC<CataloguePageProps> = ({
  products,
  loading,
  error,
  initialCategoryFromUrl,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AbayaCategory | 'All'>('All');
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [visiblePages, setVisiblePages] = useState(1);

  useEffect(() => {
    if (
      initialCategoryFromUrl &&
      ABAYA_CATEGORIES.includes(initialCategoryFromUrl as AbayaCategory)
    ) {
      setSelectedCategory(initialCategoryFromUrl as AbayaCategory);
    } else if (!initialCategoryFromUrl) {
      setSelectedCategory('All');
    }
    setVisiblePages(1);
  }, [initialCategoryFromUrl]);

  const fabricGroups = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.fabricFilterGroup)));
    return ['All', ...unique];
  }, [products]);

  const styles = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.style)));
    return ['All', ...unique];
  }, [products]);

  const occasions = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.occasion)));
    return ['All', ...unique];
  }, [products]);

  const filtered = useMemo(
    () =>
      filterProducts(products, {
        searchQuery,
        category: selectedCategory,
        fabricGroup: selectedFabric,
        colorQuery: selectedColor,
        style: selectedStyle,
        occasion: selectedOccasion,
      }),
    [products, searchQuery, selectedCategory, selectedFabric, selectedColor, selectedStyle, selectedOccasion]
  );

  const { visibleItems, hasMore, totalCount } = useMemo(
    () => paginateProducts(filtered, PAGE_SIZE, visiblePages),
    [filtered, visiblePages]
  );

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedFabric('All');
    setSelectedColor('All');
    setSelectedStyle('All');
    setSelectedOccasion('All');
    setVisiblePages(1);
    onNavigate('/catalogue');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedFabric !== 'All' ||
    selectedColor !== 'All' ||
    selectedStyle !== 'All' ||
    selectedOccasion !== 'All';

  return (
    <>
      <SEOHead
        title="Abaya Catalogue — Wholesale Plain, Embroidered, Ombre & Occasion Abayas | Yasir Apparel"
        description="Browse Yasir Apparel's B2B wholesale abaya catalogue: Plain Abayas, Double-Tone & Ombre, Embroidered, Lace & Net, Front-Open, TikTok Fabric, and Custom Design Abayas."
        path="/catalogue"
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Abaya Catalogue' },
          ]}
          onNavigate={onNavigate}
        />

        {/* Header Banner */}
        <div className="py-6 sm:py-8 border-b border-[#141413]/10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs text-[#8C6D3F] font-medium">B2B Wholesale &amp; Export Lookbook</p>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#141413]">
              Abaya &amp; Modest Apparel Catalogue
            </h1>
            <p className="text-sm text-[#4A4740] leading-relaxed">
              Filter by category, fabric type, color palette, silhouette style, or occasion. Select any piece to view tailoring details and send a prefilled WhatsApp wholesale inquiry.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#6B675E] shrink-0">
            <span className="tabular-nums font-medium text-[#141413]">
              Showing {visibleItems.length} of {totalCount} designs
            </span>
            <span aria-hidden="true">·</span>
            <a
              href="/manage-catalogue"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/manage-catalogue');
              }}
              className="underline underline-offset-4 hover:text-[#141413] transition-colors whitespace-nowrap"
            >
              Add / Edit Products
            </a>
          </div>
        </div>

        {/* Category Filter Tabs (Interactive Functional Buttons) */}
        <div className="py-5 border-b border-[#141413]/10 space-y-4">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by product category">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setVisiblePages(1);
              }}
              className={`px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#141413] text-[#FAF8F5]'
                  : 'bg-[#EFECE6] text-[#4A4740] hover:text-[#141413]'
              }`}
            >
              All Categories
            </button>
            {ABAYA_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setVisiblePages(1);
                }}
                className={`px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#141413] text-[#FAF8F5]'
                    : 'bg-[#EFECE6] text-[#4A4740] hover:text-[#141413]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Multi-Dimension Filter Controls: Search, Fabric Type, Color, Style, Occasion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-2">
            <div className="lg:col-span-4 relative">
              <label htmlFor="catalogue-search" className="sr-only">
                Search by product name, code, or keyword
              </label>
              <Search className="w-4 h-4 text-[#6B675E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
              <input
                id="catalogue-search"
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisiblePages(1);
                }}
                placeholder="Search name, code (e.g. YA-103), lace..."
                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-[#141413]/20 focus:border-[#141413] focus:outline-none"
              />
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="filter-fabric" className="sr-only">
                Filter by Fabric Type
              </label>
              <select
                id="filter-fabric"
                aria-label="Fabric Type"
                value={selectedFabric}
                onChange={(e) => {
                  setSelectedFabric(e.target.value);
                  setVisiblePages(1);
                }}
                className="w-full px-3 py-2.5 text-xs bg-white border border-[#141413]/20 focus:border-[#141413] focus:outline-none"
              >
                {fabricGroups.map((f) => (
                  <option key={f} value={f}>
                    {f === 'All' ? 'Fabric: All Options' : f}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="filter-color" className="sr-only">
                Filter by Color
              </label>
              <select
                id="filter-color"
                aria-label="Color"
                value={selectedColor}
                onChange={(e) => {
                  setSelectedColor(e.target.value);
                  setVisiblePages(1);
                }}
                className="w-full px-3 py-2.5 text-xs bg-white border border-[#141413]/20 focus:border-[#141413] focus:outline-none"
              >
                {COLOR_FILTERS.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'Color: All Shades' : c}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="filter-style" className="sr-only">
                Filter by Style
              </label>
              <select
                id="filter-style"
                aria-label="Style"
                value={selectedStyle}
                onChange={(e) => {
                  setSelectedStyle(e.target.value);
                  setVisiblePages(1);
                }}
                className="w-full px-3 py-2.5 text-xs bg-white border border-[#141413]/20 focus:border-[#141413] focus:outline-none"
              >
                {styles.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'Style: All Cuts' : s}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="filter-occasion" className="sr-only">
                Filter by Occasion
              </label>
              <select
                id="filter-occasion"
                aria-label="Occasion"
                value={selectedOccasion}
                onChange={(e) => {
                  setSelectedOccasion(e.target.value);
                  setVisiblePages(1);
                }}
                className="w-full px-3 py-2.5 text-xs bg-white border border-[#141413]/20 focus:border-[#141413] focus:outline-none"
              >
                {occasions.map((o) => (
                  <option key={o} value={o}>
                    {o === 'All' ? 'Occasion: All' : o}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-[#6B675E]">
                Active filters applied · {totalCount} matching {totalCount === 1 ? 'design' : 'designs'}
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#141413] hover:text-[#8C6D3F] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Loading, Error, Empty, and Product Grid States */}
        <div className="pt-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" aria-busy="true">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="bg-white border border-[#141413]/10 p-4 space-y-4 animate-pulse">
                  <div className="aspect-[3/4] bg-[#EFECE6]" />
                  <div className="h-4 bg-[#EFECE6] w-1/2" />
                  <div className="h-6 bg-[#EFECE6] w-3/4" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div role="alert" className="bg-white border border-[#9B2C2C]/30 p-8 text-center space-y-3">
              <h2 className="font-display text-2xl font-semibold text-[#141413]">
                Unable to Load Catalogue Data
              </h2>
              <p className="text-sm text-[#6B675E]">{error}</p>
            </div>
          ) : visibleItems.length === 0 ? (
            <div className="bg-white border border-[#141413]/12 p-12 text-center space-y-4">
              <h2 className="font-display text-2xl font-semibold text-[#141413]">
                No Catalogue Designs Match Your Selected Filters
              </h2>
              <p className="text-sm text-[#6B675E] max-w-md mx-auto">
                Try clearing one of your filter criteria, or contact our custom manufacturing desk—we manufacture bespoke abaya designs according to buyer reference photos.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-5 py-2.5 text-xs font-medium bg-[#141413] text-[#FAF8F5] hover:bg-[#2B2A28] cursor-pointer"
                >
                  Clear All Filters
                </button>
                <a
                  href="/custom-manufacturing"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/custom-manufacturing');
                  }}
                  className="px-5 py-2.5 text-xs font-medium border border-[#141413]/25 text-[#141413] hover:bg-[#EFECE6]"
                >
                  Request Custom Design
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {visibleItems.map((product) => (
                  <ProductCard key={product.slug} product={product} onNavigate={onNavigate} />
                ))}
              </div>

              {/* Load More Pagination supporting 100+ items cleanly */}
              {hasMore && (
                <div className="pt-12 text-center space-y-2">
                  <p className="text-xs text-[#6B675E] tabular-nums">
                    Viewing {visibleItems.length} of {totalCount} designs
                  </p>
                  <button
                    type="button"
                    onClick={() => setVisiblePages((prev) => prev + 1)}
                    className="px-7 py-3 text-xs font-medium bg-[#141413] text-[#FAF8F5] hover:bg-[#2B2A28] transition-colors cursor-pointer"
                  >
                    Load More Designs
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
