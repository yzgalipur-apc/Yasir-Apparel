import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import { INITIAL_PRODUCTS, type Product } from './src/data/products';

const PORT = 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

interface StoredInquiry {
  id: string;
  type: 'wholesale' | 'custom_manufacturing' | 'contact';
  name: string;
  company?: string;
  country?: string;
  contact: string;
  productType?: string;
  estimatedQuantity?: string;
  message: string;
  referenceFileName?: string;
  createdAt: string;
}

function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(INITIAL_PRODUCTS, null, 2), 'utf-8');
  }
  if (!fs.existsSync(INQUIRIES_FILE)) {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

function readProducts(): Product[] {
  try {
    ensureDataFiles();
    const raw = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
}

function writeProducts(products: Product[]) {
  ensureDataFiles();
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

function readInquiries(): StoredInquiry[] {
  try {
    ensureDataFiles();
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeInquiries(inquiries: StoredInquiry[]) {
  ensureDataFiles();
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function startServer() {
  ensureDataFiles();
  const app = express();
  app.use(express.json({ limit: '5mb' }));

  const baseUrl = (process.env.APP_URL && process.env.APP_URL !== 'MY_APP_URL'
    ? process.env.APP_URL
    : 'https://www.yasirapparel.com'
  ).replace(/\/$/, '');

  // Robots.txt for Google indexing
  app.get('/robots.txt', (_req, res) => {
    res.type('text/plain').send(
      [
        'User-agent: *',
        'Allow: /',
        'Disallow: /manage-catalogue',
        'Disallow: /api/',
        `Sitemap: ${baseUrl}/sitemap.xml`,
      ].join('\n')
    );
  });

  // Dynamic XML Sitemap including all static pages and every product detail page
  app.get('/sitemap.xml', (_req, res) => {
    const products = readProducts();
    const staticRoutes = [
      { path: '/', priority: '1.0', changefreq: 'weekly' },
      { path: '/catalogue', priority: '0.9', changefreq: 'weekly' },
      { path: '/custom-manufacturing', priority: '0.9', changefreq: 'monthly' },
      { path: '/wholesale-export', priority: '0.9', changefreq: 'monthly' },
      { path: '/about', priority: '0.8', changefreq: 'monthly' },
      { path: '/contact', priority: '0.8', changefreq: 'monthly' },
    ];

    const today = new Date().toISOString().split('T')[0];

    const urlsXml = [
      ...staticRoutes.map(
        (route) => `  <url>
    <loc>${escapeXml(`${baseUrl}${route.path}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
      ),
      ...products.map(
        (product) => `  <url>
    <loc>${escapeXml(`${baseUrl}/product/${product.slug}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
      ),
    ].join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

    res.type('application/xml').send(xml);
  });

  // Catalogue API — supports 100+ products with CRUD operations
  app.get('/api/products', (_req, res) => {
    res.json({ products: readProducts() });
  });

  app.post('/api/products', (req, res) => {
    const incoming = req.body as Product;
    if (!incoming || !incoming.name || !incoming.code || !incoming.slug) {
      res.status(400).json({ error: 'Product name, code, and slug are required.' });
      return;
    }

    const products = readProducts();
    if (products.some((p) => p.code.toLowerCase() === incoming.code.toLowerCase() || p.slug === incoming.slug)) {
      res.status(409).json({ error: 'A product with this code or URL slug already exists.' });
      return;
    }

    const updated = [incoming, ...products];
    writeProducts(updated);
    res.status(201).json({ product: incoming, products: updated });
  });

  app.put('/api/products/:slug', (req, res) => {
    const { slug } = req.params;
    const incoming = req.body as Product;
    const products = readProducts();
    const index = products.findIndex((p) => p.slug === slug);

    if (index === -1) {
      res.status(404).json({ error: 'Product not found.' });
      return;
    }

    const updatedProduct: Product = { ...products[index], ...incoming };
    const updated = [...products];
    updated[index] = updatedProduct;
    writeProducts(updated);
    res.json({ product: updatedProduct, products: updated });
  });

  app.delete('/api/products/:slug', (req, res) => {
    const { slug } = req.params;
    const products = readProducts();
    const filtered = products.filter((p) => p.slug !== slug);

    if (filtered.length === products.length) {
      res.status(404).json({ error: 'Product not found.' });
      return;
    }

    writeProducts(filtered);
    res.json({ products: filtered });
  });

  app.post('/api/products/reset', (_req, res) => {
    writeProducts(INITIAL_PRODUCTS);
    res.json({ products: INITIAL_PRODUCTS });
  });

  // Inquiry submission endpoint with spam & input validation
  app.get('/api/inquiries', (_req, res) => {
    res.json({ inquiries: readInquiries() });
  });

  app.post('/api/inquiries', (req, res) => {
    const {
      type,
      name,
      company,
      country,
      contact,
      productType,
      estimatedQuantity,
      message,
      referenceFileName,
      honeypot,
    } = req.body || {};

    if (honeypot && String(honeypot).trim().length > 0) {
      res.status(400).json({ error: 'Spam check triggered.' });
      return;
    }

    if (!name || String(name).trim().length < 2) {
      res.status(400).json({ error: 'Valid customer name is required.' });
      return;
    }

    if (!contact || String(contact).trim().length < 5) {
      res.status(400).json({ error: 'Valid email or WhatsApp contact is required.' });
      return;
    }

    if (!message || String(message).trim().length < 10) {
      res.status(400).json({ error: 'Inquiry message must be at least 10 characters.' });
      return;
    }

    const newInquiry: StoredInquiry = {
      id: `INQ-${Date.now()}`,
      type: type || 'contact',
      name: String(name).trim(),
      company: company ? String(company).trim() : undefined,
      country: country ? String(country).trim() : undefined,
      contact: String(contact).trim(),
      productType: productType ? String(productType).trim() : undefined,
      estimatedQuantity: estimatedQuantity ? String(estimatedQuantity).trim() : undefined,
      message: String(message).trim(),
      referenceFileName: referenceFileName ? String(referenceFileName).trim() : undefined,
      createdAt: new Date().toISOString(),
    };

    const existing = readInquiries();
    const updated = [newInquiry, ...existing];
    writeInquiries(updated);

    res.status(201).json({ inquiry: newInquiry });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Yasir Apparel server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
