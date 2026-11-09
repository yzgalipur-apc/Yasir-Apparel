import React, { useEffect, useState, useCallback } from 'react';
import { INITIAL_PRODUCTS, type Product } from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomePage } from './pages/HomePage';
import { CataloguePage } from './pages/CataloguePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CustomManufacturingPage } from './pages/CustomManufacturingPage';
import { AboutPage } from './pages/AboutPage';
import { WholesaleExportPage } from './pages/WholesaleExportPage';
import { ContactPage } from './pages/ContactPage';
import { CatalogueAdminPage } from './pages/CatalogueAdminPage';

export default function App() {
  const [route, setRoute] = useState(() => ({
    pathname: window.location.pathname || '/',
    search: window.location.search || '',
  }));

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [productsError, setProductsError] = useState<string | null>(null);

  useEffect(() => {
    const onPopState = () => {
      setRoute({
        pathname: window.location.pathname || '/',
        search: window.location.search || '',
      });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    let active = true;
    setLoadingProducts(true);
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Unable to fetch catalogue.');
        return res.json();
      })
      .then((data) => {
        if (active && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
          setProductsError(null);
        }
      })
      .catch(() => {
        if (active) {
          // Gracefully retain deterministic seed products if offline
          setProductsError(null);
        }
      })
      .finally(() => {
        if (active) setLoadingProducts(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const navigate = useCallback((targetUrl: string) => {
    const parsed = new URL(targetUrl, window.location.origin);
    window.history.pushState({}, '', `${parsed.pathname}${parsed.search}${parsed.hash}`);
    setRoute({
      pathname: parsed.pathname,
      search: parsed.search,
    });
    if (!parsed.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, []);

  const renderPage = () => {
    const { pathname, search } = route;
    const searchParams = new URLSearchParams(search);

    if (pathname === '/' || pathname === '') {
      return <HomePage products={products} onNavigate={navigate} />;
    }

    if (pathname === '/catalogue') {
      const categoryParam = searchParams.get('category') || undefined;
      return (
        <CataloguePage
          products={products}
          loading={loadingProducts}
          error={productsError}
          initialCategoryFromUrl={categoryParam}
          onNavigate={navigate}
        />
      );
    }

    if (pathname.startsWith('/product/')) {
      const slug = decodeURIComponent(pathname.replace('/product/', '').replace(/\/$/, ''));
      return <ProductDetailPage slug={slug} products={products} onNavigate={navigate} />;
    }

    if (pathname === '/custom-manufacturing') {
      return <CustomManufacturingPage onNavigate={navigate} />;
    }

    if (pathname === '/wholesale-export') {
      return <WholesaleExportPage onNavigate={navigate} />;
    }

    if (pathname === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (pathname === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    if (pathname === '/manage-catalogue') {
      return (
        <CatalogueAdminPage
          products={products}
          onProductsUpdated={setProducts}
          onNavigate={navigate}
        />
      );
    }

    // Fallback to Home for unknown paths
    return <HomePage products={products} onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#141413]">
      <Header currentPath={route.pathname} onNavigate={navigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={navigate} />
      <FloatingWhatsApp />
    </div>
  );
}
