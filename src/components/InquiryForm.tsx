import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, MessageCircle, Upload } from 'lucide-react';
import { validateInquiryForm, buildCustomInquiryWhatsAppUrl, buildGeneralWhatsAppUrl } from '../utils/catalogueLogic';
import { BUSINESS_CONFIG } from '../data/businessConfig';

interface InquiryFormProps {
  mode: 'custom_manufacturing' | 'wholesale' | 'contact';
  defaultProductCode?: string;
  heading?: string;
  subheading?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  mode,
  defaultProductCode = '',
  heading,
  subheading,
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [contact, setContact] = useState('');
  const [productType, setProductType] = useState(
    defaultProductCode ? `Product Inquiry (${defaultProductCode})` : 'Custom Abaya Collection'
  );
  const [estimatedQuantity, setEstimatedQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [referenceFileName, setReferenceFileName] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState<{
    id: string;
    whatsappFollowUpUrl: string;
    mailtoUrl: string;
  } | null>(null);

  const requireCountry = mode === 'custom_manufacturing' || mode === 'wholesale';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReferenceFileName(`${file.name} (${Math.round(file.size / 1024)} KB)`);
    } else {
      setReferenceFileName('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const validation = validateInquiryForm(
      {
        name,
        contact,
        country,
        message,
        honeypot,
      },
      requireCountry
    );

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: mode,
          name,
          company,
          country,
          contact,
          productType: mode !== 'contact' ? productType : undefined,
          estimatedQuantity: mode !== 'contact' ? estimatedQuantity || 'To be discussed' : undefined,
          message,
          referenceFileName: referenceFileName || undefined,
          honeypot,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit inquiry right now.');
      }

      const whatsappFollowUpUrl =
        mode === 'custom_manufacturing' || mode === 'wholesale'
          ? buildCustomInquiryWhatsAppUrl({
              name,
              company,
              country: country || 'International Buyer',
              productType: productType || 'Wholesale Abayas',
              estimatedQuantity: estimatedQuantity || 'To be discussed',
            })
          : buildGeneralWhatsAppUrl(
              `Hello Yasir Apparel, my name is ${name}. Inquiry Reference ${data.inquiry.id}: ${message}`
            );

      const subject = encodeURIComponent(
        `[${data.inquiry.id}] ${mode === 'custom_manufacturing' ? 'Custom OEM Inquiry' : 'Wholesale Inquiry'} — ${name}`
      );
      const body = encodeURIComponent(
        `Name: ${name}\nCompany: ${company || 'N/A'}\nCountry: ${country || 'N/A'}\nContact: ${contact}\nProduct Type: ${productType}\nEstimated Quantity: ${estimatedQuantity || 'Contact for details'}\nReference File: ${referenceFileName || 'None attached'}\n\nRequirements:\n${message}`
      );

      setSubmittedRecord({
        id: data.inquiry.id,
        whatsappFollowUpUrl,
        mailtoUrl: `mailto:${BUSINESS_CONFIG.email}?subject=${subject}&body=${body}`,
      });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Network error occurred while submitting.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedRecord) {
    return (
      <div className="bg-white border border-[#141413]/15 p-6 sm:p-8 space-y-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-[#2D6A4F] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <p className="text-xs text-[#6B675E] font-mono tabular-nums">
              Reference ID: {submittedRecord.id}
            </p>
            <h3 className="font-display text-2xl font-semibold text-[#141413]">
              Inquiry Logged for Export Review
            </h3>
            <p className="text-sm text-[#4A4740] leading-relaxed">
              Thank you, {name}. Your wholesale specifications have been recorded. For immediate priority response or to share tech-pack attachments directly with our production desk in Gujranwala, connect via WhatsApp or email below.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={submittedRecord.whatsappFollowUpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium bg-[#141413] text-[#FAF8F5] hover:bg-[#2B2A28] transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-[#D4BC8B]" aria-hidden="true" />
            <span>Send Directly on WhatsApp</span>
          </a>

          <a
            href={submittedRecord.mailtoUrl}
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-medium border border-[#141413]/25 text-[#141413] hover:bg-[#EFECE6] transition-colors whitespace-nowrap"
          >
            Send Copy via Email Client
          </a>

          <button
            type="button"
            onClick={() => {
              setSubmittedRecord(null);
              setMessage('');
              setReferenceFileName('');
            }}
            className="px-4 py-2.5 text-xs text-[#6B675E] hover:text-[#141413] underline underline-offset-4"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white border border-[#141413]/12 p-6 sm:p-8 space-y-5">
      {(heading || subheading) && (
        <div className="space-y-1.5 pb-2 border-b border-[#141413]/8">
          {heading && <h3 className="font-display text-2xl font-semibold text-[#141413]">{heading}</h3>}
          {subheading && <p className="text-sm text-[#6B675E]">{subheading}</p>}
        </div>
      )}

      {/* Honeypot anti-spam field (visually hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`website-url-${mode}`}>Leave this field blank</label>
        <input
          id={`website-url-${mode}`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {serverError && (
        <div role="alert" className="flex items-center gap-2 p-3 bg-[#FDF2F2] border border-[#9B2C2C]/30 text-xs text-[#9B2C2C]">
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${mode}-name`} className="block text-xs font-medium text-[#141413] mb-1.5">
            Customer Name *
          </label>
          <input
            id={`${mode}-name`}
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sarah Al-Harbi"
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#141413]/20 focus:border-[#141413] focus:outline-none"
          />
          {errors.name && <p className="mt-1 text-xs text-[#9B2C2C]">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor={`${mode}-company`} className="block text-xs font-medium text-[#141413] mb-1.5">
            Company / Boutique Name
          </label>
          <input
            id={`${mode}-company`}
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Noor Modest Boutique"
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#141413]/20 focus:border-[#141413] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${mode}-country`} className="block text-xs font-medium text-[#141413] mb-1.5">
            Country {requireCountry ? '*' : ''}
          </label>
          <input
            id={`${mode}-country`}
            type="text"
            required={requireCountry}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g. United Kingdom, UAE, Saudi Arabia"
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#141413]/20 focus:border-[#141413] focus:outline-none"
          />
          {errors.country && <p className="mt-1 text-xs text-[#9B2C2C]">{errors.country}</p>}
        </div>

        <div>
          <label htmlFor={`${mode}-contact`} className="block text-xs font-medium text-[#141413] mb-1.5">
            Email or WhatsApp Number *
          </label>
          <input
            id={`${mode}-contact`}
            type="text"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="buyer@boutique.com or +44 7700 900123"
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#141413]/20 focus:border-[#141413] focus:outline-none"
          />
          {errors.contact && <p className="mt-1 text-xs text-[#9B2C2C]">{errors.contact}</p>}
        </div>
      </div>

      {mode !== 'contact' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${mode}-product-type`} className="block text-xs font-medium text-[#141413] mb-1.5">
              Product Category / Type
            </label>
            <select
              id={`${mode}-product-type`}
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#141413]/20 focus:border-[#141413] focus:outline-none"
            >
              <option value="Custom Abaya Collection">Custom-Designed Abayas (OEM / Private Label)</option>
              <option value="Plain & Everyday Abayas">Plain &amp; Core Wholesale Abayas</option>
              <option value="Embroidered & Occasion Abayas">Embroidered &amp; Luxury Occasion Abayas</option>
              <option value="Double-Tone & Ombre Abayas">Double-Tone &amp; Ombre Abayas</option>
              <option value="TikTok Fabric Abayas">TikTok Fabric Abayas</option>
              <option value="Hijabs & Prayer Garments">Hijabs, Scarves &amp; Prayer Clothes</option>
              <option value="Mixed Wholesale Assortment">Mixed Boutique Assortment</option>
            </select>
          </div>

          <div>
            <label htmlFor={`${mode}-quantity`} className="block text-xs font-medium text-[#141413] mb-1.5">
              Estimated Order Quantity
            </label>
            <input
              id={`${mode}-quantity`}
              type="text"
              value={estimatedQuantity}
              onChange={(e) => setEstimatedQuantity(e.target.value)}
              placeholder="e.g. Sample run / 50 pcs / 200+ pcs"
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#141413]/20 focus:border-[#141413] focus:outline-none"
            />
          </div>
        </div>
      )}

      {mode === 'custom_manufacturing' && (
        <div>
          <label htmlFor="custom-techpack-file" className="block text-xs font-medium text-[#141413] mb-1.5">
            Reference Photograph or Tech Pack (Optional — PDF, JPG, PNG)
          </label>
          <div className="flex items-center gap-3">
            <label
              htmlFor="custom-techpack-file"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-[#EFECE6] text-[#141413] hover:bg-[#E4DFD5] cursor-pointer transition-colors"
            >
              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Select Reference File</span>
            </label>
            <input
              id="custom-techpack-file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              className="sr-only"
            />
            <span className="text-xs text-[#6B675E] truncate">
              {referenceFileName || 'No file selected'}
            </span>
          </div>
        </div>
      )}

      <div>
        <label htmlFor={`${mode}-message`} className="block text-xs font-medium text-[#141413] mb-1.5">
          {mode === 'custom_manufacturing'
            ? 'Design Requirements, Preferred Fabrics, Sizing & Branding *'
            : 'Inquiry Details & Specifications *'}
        </label>
        <textarea
          id={`${mode}-message`}
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share preferred silhouettes, fabric feel, colorways, size breakdown, private-label tags, or destination port..."
          className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#141413]/20 focus:border-[#141413] focus:outline-none"
        />
        {errors.message && <p className="mt-1 text-xs text-[#9B2C2C]">{errors.message}</p>}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 text-xs font-medium bg-[#141413] text-[#FAF8F5] hover:bg-[#2B2A28] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start"
        >
          {submitting ? 'Submitting Inquiry...' : 'Submit Wholesale Inquiry'}
        </button>
        <p className="text-xs text-[#6B675E]">
          Direct export inquiries answered via WhatsApp or email from our Gujranwala office.
        </p>
      </div>
    </form>
  );
};
