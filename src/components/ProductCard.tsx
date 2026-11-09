import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import type { Product } from '../data/products';
import { buildProductWhatsAppUrl } from '../utils/catalogueLogic';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const detailPath = `/product/${product.slug}`;
  const whatsappUrl = buildProductWhatsAppUrl(product);

  const handleOpenDetail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(detailPath);
  };

  return (
    <article className="group flex flex-col bg-white border border-[#141413]/10 transition-transform duration-200 hover:-translate-y-0.5">
      <a
        href={detailPath}
        onClick={handleOpenDetail}
        className="block relative overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141413]"
      >
        <ResilientImage
          src={product.mainImage}
          alt={`${product.name} (${product.code}) — ${product.category} by Yasir Apparel`}
          aspectClass="aspect-[3/4]"
          fallbackTitle={product.name}
          className="transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </a>

      <div className="flex flex-col flex-1 p-5 justify-between gap-4">
        <div className="space-y-1.5">
          {/* Clean unboxed metadata with typographic separator — Zero-Pill Discipline */}
          <div className="flex items-center gap-2 text-xs text-[#6B675E]">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-[#8C6D3F]">{product.code}</span>
          </div>

          <h3 className="font-display text-xl font-semibold text-[#141413] leading-snug">
            <a
              href={detailPath}
              onClick={handleOpenDetail}
              className="hover:text-[#8C6D3F] transition-colors"
            >
              {product.name}
            </a>
          </h3>

          <p className="text-xs text-[#6B675E] line-clamp-2 leading-relaxed pt-0.5">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#141413]/8 flex items-center justify-between gap-3">
          <a
            href={detailPath}
            onClick={handleOpenDetail}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#141413] hover:text-[#8C6D3F] transition-colors whitespace-nowrap"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Inquire on WhatsApp about ${product.name} (${product.code})`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#EFECE6] text-[#141413] hover:bg-[#141413] hover:text-[#FAF8F5] transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Inquire Price</span>
          </a>
        </div>
      </div>
    </article>
  );
};
