import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_PRODUCTS } from '../data/products';
import {
  buildGeneralWhatsAppUrl,
  buildProductWhatsAppUrl,
  filterProducts,
  paginateProducts,
  validateInquiryForm,
  slugifyProduct,
} from './catalogueLogic';

test('buildProductWhatsAppUrl formats exact prefilled WhatsApp message with encoded parameters', () => {
  const url = buildProductWhatsAppUrl({
    name: 'Minimalist Stand-Collar Plain Abaya',
    code: 'YA-101',
  });

  assert.ok(url.startsWith('https://wa.me/923007428175?text='));
  const decoded = decodeURIComponent(url.replace('https://wa.me/923007428175?text=', ''));
  assert.equal(
    decoded,
    'Hello Yasir Apparel, I am interested in your Minimalist Stand-Collar Plain Abaya, Product Code YA-101. Please share wholesale pricing, available colors, sizes, and minimum order requirements.'
  );
});

test('buildGeneralWhatsAppUrl uses +923007428175 without plus symbol in wa.me path', () => {
  const url = buildGeneralWhatsAppUrl();
  assert.ok(url.startsWith('https://wa.me/923007428175?text='));
  assert.ok(decodeURIComponent(url).includes('Hello Yasir Apparel'));
});

test('filterProducts filters accurately by category, color, style, occasion, and search query', () => {
  const plainOnly = filterProducts(INITIAL_PRODUCTS, { category: 'Plain Abayas' });
  assert.equal(plainOnly.length, 2);
  assert.ok(plainOnly.every((p) => p.category === 'Plain Abayas'));

  const byCode = filterProducts(INITIAL_PRODUCTS, { searchQuery: 'YA-104' });
  assert.equal(byCode.length, 1);
  assert.equal(byCode[0].code, 'YA-104');

  const bridalOccasion = filterProducts(INITIAL_PRODUCTS, { occasion: 'Bridal & Festive' });
  assert.ok(bridalOccasion.length >= 2);
  assert.ok(bridalOccasion.every((p) => p.occasion === 'Bridal & Festive'));

  const ivoryColor = filterProducts(INITIAL_PRODUCTS, { colorQuery: 'Ivory' });
  assert.ok(ivoryColor.length >= 3);
});

test('paginateProducts supports 100+ items cleanly with load-more paging', () => {
  const mockHundred = Array.from({ length: 105 }, (_, i) => ({ id: i + 1 }));
  const page1 = paginateProducts(mockHundred, 9, 1);
  assert.equal(page1.visibleItems.length, 9);
  assert.equal(page1.hasMore, true);
  assert.equal(page1.totalCount, 105);

  const page12 = paginateProducts(mockHundred, 9, 12);
  assert.equal(page12.visibleItems.length, 105);
  assert.equal(page12.hasMore, false);
});

test('validateInquiryForm enforces email/WhatsApp format, required fields, and honeypot spam protection', () => {
  const invalidEmpty = validateInquiryForm({ name: '', contact: '', message: '' }, true);
  assert.equal(invalidEmpty.valid, false);
  assert.ok(invalidEmpty.errors.name);
  assert.ok(invalidEmpty.errors.contact);
  assert.ok(invalidEmpty.errors.country);
  assert.ok(invalidEmpty.errors.message);

  const validEmail = validateInquiryForm(
    {
      name: 'Amina Al-Mansoor',
      contact: 'sourcing@modestboutique.ae',
      country: 'United Arab Emirates',
      message: 'Looking for wholesale pricing on 150 embroidered abayas.',
    },
    true
  );
  assert.equal(validEmail.valid, true);

  const validPhone = validateInquiryForm({
    name: 'Tariq Mahmood',
    contact: '+44 7700 900123',
    message: 'Interested in private label plain crepe abayas for London store.',
  });
  assert.equal(validPhone.valid, true);

  const spamBlocked = validateInquiryForm({
    name: 'Bot',
    contact: 'bot@spam.com',
    message: 'Valid length message here',
    honeypot: 'http://spam-link.example',
  });
  assert.equal(spamBlocked.valid, false);
  assert.ok(spamBlocked.errors.spam);
});

test('slugifyProduct generates clean SEO-friendly URLs', () => {
  assert.equal(
    slugifyProduct('Royal Pearl Lace Abaya', 'YA-205'),
    'royal-pearl-lace-abaya-ya-205'
  );
});
