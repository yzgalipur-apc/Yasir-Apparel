import { BUSINESS_CONFIG } from '../data/businessConfig';
import type { Product, AbayaCategory } from '../data/products';

export function buildGeneralWhatsAppUrl(customGreeting?: string): string {
  const message =
    customGreeting?.trim() ||
    'Hello Yasir Apparel, I am visiting your website and would like to inquire about wholesale abaya collections, custom manufacturing, and export details.';
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildProductWhatsAppUrl(
  product: Pick<Product, 'name' | 'code'>,
  selectedColor?: string,
  selectedSize?: string
): string {
  const variantClause =
    selectedColor || selectedSize
      ? ` (Preferred options: ${[selectedColor, selectedSize ? `Size ${selectedSize}` : ''].filter(Boolean).join(', ')})`
      : '';
  const message = `Hello Yasir Apparel, I am interested in your ${product.name}, Product Code ${product.code}${variantClause}. Please share wholesale pricing, available colors, sizes, and minimum order requirements.`;
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildCustomInquiryWhatsAppUrl(payload: {
  name: string;
  company?: string;
  country: string;
  productType: string;
  estimatedQuantity: string;
}): string {
  const companyPart = payload.company ? ` (${payload.company})` : '';
  const message = `Hello Yasir Apparel, my name is ${payload.name}${companyPart} from ${payload.country}. I would like to discuss custom manufacturing for ${payload.productType} (Estimated quantity: ${payload.estimatedQuantity}).`;
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export interface CatalogueFilterCriteria {
  searchQuery?: string;
  category?: AbayaCategory | 'All';
  fabricGroup?: string | 'All';
  colorQuery?: string | 'All';
  style?: string | 'All';
  occasion?: string | 'All';
}

export function filterProducts(products: Product[], criteria: CatalogueFilterCriteria): Product[] {
  const q = (criteria.searchQuery || '').trim().toLowerCase();

  return products.filter((product) => {
    if (criteria.category && criteria.category !== 'All' && product.category !== criteria.category) {
      return false;
    }

    if (
      criteria.fabricGroup &&
      criteria.fabricGroup !== 'All' &&
      product.fabricFilterGroup !== criteria.fabricGroup
    ) {
      return false;
    }

    if (criteria.style && criteria.style !== 'All' && product.style !== criteria.style) {
      return false;
    }

    if (criteria.occasion && criteria.occasion !== 'All' && product.occasion !== criteria.occasion) {
      return false;
    }

    if (criteria.colorQuery && criteria.colorQuery !== 'All') {
      const targetColor = criteria.colorQuery.toLowerCase();
      const matchesColor = product.availableColors.some((c) => c.toLowerCase().includes(targetColor));
      if (!matchesColor) {
        return false;
      }
    }

    if (q) {
      const searchable = [
        product.name,
        product.code,
        product.category,
        product.description,
        product.fabric,
        product.style,
        product.occasion,
        ...product.availableColors,
      ]
        .join(' ')
        .toLowerCase();

      if (!searchable.includes(q)) {
        return false;
      }
    }

    return true;
  });
}

export function paginateProducts<T>(items: T[], pageSize: number, visiblePages: number): {
  visibleItems: T[];
  hasMore: boolean;
  totalCount: number;
} {
  const safeSize = Math.max(1, pageSize);
  const safePages = Math.max(1, visiblePages);
  const limit = safeSize * safePages;
  return {
    visibleItems: items.slice(0, limit),
    hasMore: items.length > limit,
    totalCount: items.length,
  };
}

export interface InquiryValidationInput {
  name: string;
  contact: string;
  country?: string;
  message: string;
  honeypot?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+\d][\d\s\-()]{6,22}$/;

export function validateInquiryForm(input: InquiryValidationInput, requireCountry = false): ValidationResult {
  const errors: Record<string, string> = {};

  if (input.honeypot && input.honeypot.trim().length > 0) {
    errors.spam = 'Automated submission blocked.';
    return { valid: false, errors };
  }

  const trimmedName = (input.name || '').trim();
  if (trimmedName.length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }

  const trimmedContact = (input.contact || '').trim();
  if (!trimmedContact) {
    errors.contact = 'Please provide a business email address or WhatsApp number.';
  } else if (!EMAIL_REGEX.test(trimmedContact) && !PHONE_REGEX.test(trimmedContact)) {
    errors.contact = 'Enter a valid email (e.g. buyer@company.com) or phone number with country code.';
  }

  if (requireCountry) {
    const trimmedCountry = (input.country || '').trim();
    if (trimmedCountry.length < 2) {
      errors.country = 'Please specify your destination country.';
    }
  }

  const trimmedMessage = (input.message || '').trim();
  if (trimmedMessage.length < 10) {
    errors.message = 'Please include brief details about your inquiry (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function slugifyProduct(name: string, code: string): string {
  const raw = `${name}-${code}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return raw || `product-${Date.now()}`;
}
