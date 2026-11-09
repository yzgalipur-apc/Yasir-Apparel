import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../utils/catalogueLogic';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = buildGeneralWhatsAppUrl();

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat with Yasir Apparel on WhatsApp (+92 300 7428175)"
      aria-label="Chat with Yasir Apparel on WhatsApp (+92 300 7428175)"
      className="fixed bottom-4 right-4 z-40 w-12 h-12 rounded-full inline-flex items-center justify-center bg-[#141413] text-[#FAF8F5] shadow-md border border-[#C5A46D]/60 hover:bg-[#262523] transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141413]"
    >
      <MessageCircle className="w-5 h-5 text-[#D4BC8B]" aria-hidden="true" />
    </a>
  );
};
