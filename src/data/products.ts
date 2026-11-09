export type AbayaCategory =
  | 'Plain Abayas'
  | 'Double-Tone and Ombre Abayas'
  | 'Embroidered Abayas'
  | 'Lace and Net Abayas'
  | 'Front-Open Abayas'
  | 'Front-Closed Abayas'
  | 'Double-Layer Abayas'
  | 'TikTok Fabric Abayas'
  | 'Luxury Occasion Abayas'
  | 'Custom Design Abayas';

export type AbayaStyle =
  | 'Front-Closed Classic'
  | 'Front-Open Kimono'
  | 'A-Line Tailored'
  | 'Butterfly / Bisht Cut'
  | 'Double-Layer Draped'
  | 'Cape & Occasion Silhouette'
  | 'Custom Pattern / OEM';

export type AbayaOccasion =
  | 'Everyday Essentials'
  | 'Work & Formal Modesty'
  | 'Evening & Occasion'
  | 'Bridal & Festive'
  | 'Boutique Private Label';

export interface ProductGalleryItem {
  url: string;
  label: 'Front View' | 'Back Silhouette' | 'Fabric Drape' | 'Tailoring Detail';
  alt: string;
  objectPosition?: string;
}

export interface Product {
  slug: string;
  name: string;
  code: string;
  category: AbayaCategory;
  style: AbayaStyle;
  occasion: AbayaOccasion;
  mainImage: string;
  additionalImages: ProductGalleryItem[];
  description: string;
  fabric: string;
  fabricFilterGroup: string;
  availableColors: string[];
  availableSizes: string[];
  customizationInfo: string;
  wholesaleAvailability: string;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
}

export const ABAYA_CATEGORIES: AbayaCategory[] = [
  'Plain Abayas',
  'Double-Tone and Ombre Abayas',
  'Embroidered Abayas',
  'Lace and Net Abayas',
  'Front-Open Abayas',
  'Front-Closed Abayas',
  'Double-Layer Abayas',
  'TikTok Fabric Abayas',
  'Luxury Occasion Abayas',
  'Custom Design Abayas',
];

export const IMAGE_ASSETS = {
  heroEditorial: '/src/assets/images/hero_luxury_abaya_1792905034152.jpg',
  plainBlack: '/src/assets/images/cat_plain_abaya_1792905035680.jpg',
  ombrePleated: '/src/assets/images/cat_ombre_abaya_1792905037266.jpg',
  embroideredGold: '/src/assets/images/cat_embroidered_abaya_1792905038882.jpg',
  laceTrim: '/src/assets/images/cat_lace_net_abaya_1792905040461.jpg',
  frontOpenIvory: '/src/assets/images/cat_front_open_abaya_1792905042249.jpg',
  doubleLayerMocha: '/src/assets/images/cat_double_layer_abaya_1792905043608.jpg',
  luxuryOccasionCape: '/src/assets/images/cat_luxury_occasion_abaya_1792905045563.jpg',
  atelierCraft: '/src/assets/images/atelier_craftsmanship_1792905045749.jpg',
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    slug: 'minimalist-stand-collar-plain-abaya-ya-101',
    name: 'Minimalist Stand-Collar Plain Abaya',
    code: 'YA-101',
    category: 'Plain Abayas',
    style: 'Front-Closed Classic',
    occasion: 'Everyday Essentials',
    mainImage: IMAGE_ASSETS.plainBlack,
    additionalImages: [
      {
        url: IMAGE_ASSETS.plainBlack,
        label: 'Front View',
        alt: 'Minimalist Stand-Collar Plain Abaya YA-101 front full length view',
      },
      {
        url: IMAGE_ASSETS.atelierCraft,
        label: 'Tailoring Detail',
        alt: 'Close-up cuff stitching and fabric swatch options for YA-101',
      },
      {
        url: IMAGE_ASSETS.heroEditorial,
        label: 'Fabric Drape',
        alt: 'Matte crepe fabric drape silhouette reference for Yasir Apparel abayas',
      },
    ],
    description:
      'Clean architectural stand-collar plain abaya engineered for boutique everyday collections. Features concealed front placket construction, neat structured cuffs, and balanced A-line movement suitable for year-round wholesale programs.',
    fabric: 'Available in Matte Crepe, Nida-style weave, or buyer-specified fabric options — Contact us for details',
    fabricFilterGroup: 'Matte Crepe Options',
    availableColors: ['Jet Black', 'Deep Navy', 'Espresso Brown', 'Taupe', 'Custom Shade Dyeing'],
    availableSizes: ['50', '52', '54', '56', '58', '60', 'Custom Grading'],
    customizationInfo:
      'Custom sleeve width, pocket placement, snap or concealed zip closure, matching shayla inclusion, and private-label woven neck tags.',
    wholesaleAvailability: 'Made-to-order bulk production — Contact us for factory pricing and MOQ details.',
    featured: true,
    seoTitle: 'Minimalist Stand-Collar Plain Abaya YA-101 | Wholesale Plain Abaya Manufacturer',
    seoDescription:
      'Request factory wholesale pricing for Minimalist Stand-Collar Plain Abaya (YA-101) manufactured in Pakistan by Yasir Apparel. Custom sizes, fabrics, and private labeling.',
  },
  {
    slug: 'desert-sand-charcoal-pleated-ombre-abaya-ya-102',
    name: 'Desert Sand to Charcoal Pleated Ombre Abaya',
    code: 'YA-102',
    category: 'Double-Tone and Ombre Abayas',
    style: 'Front-Open Kimono',
    occasion: 'Evening & Occasion',
    mainImage: IMAGE_ASSETS.ombrePleated,
    additionalImages: [
      {
        url: IMAGE_ASSETS.ombrePleated,
        label: 'Front View',
        alt: 'Desert Sand to Charcoal Pleated Ombre Abaya YA-102 full view',
      },
      {
        url: IMAGE_ASSETS.doubleLayerMocha,
        label: 'Fabric Drape',
        alt: 'Soft flowing tonal drape detail for ombre modest collection',
      },
      {
        url: IMAGE_ASSETS.atelierCraft,
        label: 'Tailoring Detail',
        alt: 'Atelier swatch matching and hemline finish detail',
      },
    ],
    description:
      'Fine accordion-pleated ombre abaya transitioning smoothly from warm desert beige at the shoulder to deep charcoal at the hem. Designed with relaxed kimono sleeves for effortless layering over inner slip dresses.',
    fabric: 'Pleated Chiffon / Flowing Georgette or custom ombre-dyed base — Contact us for fabric swatch details',
    fabricFilterGroup: 'Chiffon & Layered Weaves',
    availableColors: ['Sand / Charcoal Ombre', 'Ivory / Mocha Ombre', 'Pearl Grey / Black Ombre', 'Custom Gradient'],
    availableSizes: ['52', '54', '56', '58', '60', 'Custom Grading'],
    customizationInfo:
      'Custom dual-tone color pairings, optional inner slip dress matching, belt tie inclusion, and boutique brand packaging.',
    wholesaleAvailability: 'Available for international wholesale orders — Contact us for details.',
    featured: true,
    seoTitle: 'Pleated Ombre Abaya YA-102 | Double-Tone Abaya Manufacturer Pakistan',
    seoDescription:
      'Wholesale Desert Sand to Charcoal Pleated Ombre Abaya (YA-102) by Yasir Apparel. Custom gradient dyeing and private-label abaya manufacturing.',
  },
  {
    slug: 'champagne-botanical-embroidered-bell-sleeve-abaya-ya-103',
    name: 'Champagne Botanical Embroidered Bell-Sleeve Abaya',
    code: 'YA-103',
    category: 'Embroidered Abayas',
    style: 'Front-Open Kimono',
    occasion: 'Bridal & Festive',
    mainImage: IMAGE_ASSETS.embroideredGold,
    additionalImages: [
      {
        url: IMAGE_ASSETS.embroideredGold,
        label: 'Front View',
        alt: 'Champagne Botanical Embroidered Bell-Sleeve Abaya YA-103 front detail',
      },
      {
        url: IMAGE_ASSETS.atelierCraft,
        label: 'Tailoring Detail',
        alt: 'Precision embroidery border and thread selection at Yasir Apparel',
      },
    ],
    description:
      'Statement modest silhouette crafted in deep black with dense champagne-gold botanical embroidery framing the front neckline placket and wide bell sleeves. Tailored for Eid, festive, and luxury boutique edits.',
    fabric: 'Premium Matte Crepe / Korean-style Nida option — Contact us for fabric weight options',
    fabricFilterGroup: 'Nida & Smooth Drape Options',
    availableColors: ['Black with Champagne Gold', 'Black with Tone-on-Tone Black Thread', 'Ivory with Gold Thread', 'Custom Thread Palette'],
    availableSizes: ['50', '52', '54', '56', '58', '60', 'Custom Grading'],
    customizationInfo:
      'Custom embroidery density, digitized buyer motif patterns, front-closed or front-open conversion, and matching embroidered shayla.',
    wholesaleAvailability: 'Custom & wholesale bulk production — Contact us for quotation.',
    featured: true,
    seoTitle: 'Champagne Embroidered Abaya YA-103 | Wholesale Embroidered Abayas',
    seoDescription:
      'Explore YA-103 Champagne Botanical Embroidered Bell-Sleeve Abaya manufactured by Yasir Apparel in Pakistan. Custom embroidery motifs for fashion brands.',
  },
  {
    slug: 'ivory-contrast-french-lace-cuff-abaya-ya-104',
    name: 'Ivory-Contrast French Lace Cuff & Hem Abaya',
    code: 'YA-104',
    category: 'Lace and Net Abayas',
    style: 'A-Line Tailored',
    occasion: 'Evening & Occasion',
    mainImage: IMAGE_ASSETS.laceTrim,
    additionalImages: [
      {
        url: IMAGE_ASSETS.laceTrim,
        label: 'Front View',
        alt: 'Ivory-Contrast French Lace Cuff and Hem Abaya YA-104 on studio form',
      },
      {
        url: IMAGE_ASSETS.atelierCraft,
        label: 'Tailoring Detail',
        alt: 'Clean contrast binding and cuff stitching craftsmanship',
      },
    ],
    description:
      'Refined A-line abaya combining a crisp ivory center placket and collar trim with delicate scalloped black floral lace across the lower sleeves and sweeping hemline.',
    fabric: 'Soft Crepe body with fine scalloped lace trim — Contact us for lace pattern catalogue',
    fabricFilterGroup: 'Lace & Textured Trim Options',
    availableColors: ['Black & Ivory Contrast', 'All-Black Lace', 'Soft Beige & Ivory', 'Custom Trim Combination'],
    availableSizes: ['50', '52', '54', '56', '58', '60', 'Custom Grading'],
    customizationInfo:
      'Selectable lace width and floral motif, contrast binding color options, front snap closures, and custom brand hangtags.',
    wholesaleAvailability: 'Wholesale export lots available — Contact us for details.',
    featured: true,
    seoTitle: 'French Lace Cuff & Hem Abaya YA-104 | Lace Abaya Exporter Pakistan',
    seoDescription:
      'Wholesale Ivory-Contrast French Lace Abaya (YA-104) crafted by Yasir Apparel. Request factory pricing and custom lace options for your boutique.',
  },
  {
    slug: 'pearl-taupe-shawl-lapel-front-open-abaya-ya-105',
    name: 'Pearl & Taupe Shawl-Lapel Front-Open Set',
    code: 'YA-105',
    category: 'Front-Open Abayas',
    style: 'Front-Open Kimono',
    occasion: 'Work & Formal Modesty',
    mainImage: IMAGE_ASSETS.frontOpenIvory,
    additionalImages: [
      {
        url: IMAGE_ASSETS.frontOpenIvory,
        label: 'Front View',
        alt: 'Pearl and Taupe Shawl-Lapel Front-Open Abaya YA-105 with inner slip',
      },
      {
        url: IMAGE_ASSETS.heroEditorial,
        label: 'Back Silhouette',
        alt: 'Structured panel tailoring reference for Yasir Apparel two-tone abayas',
      },
    ],
    description:
      'Contemporary structured front-open abaya featuring vertical taupe and pearl-ivory paneling, a smooth shawl lapel, turned contrast cuffs, and a single metallic accent button. Available as an outer coat or complete 3-piece set with inner dress.',
    fabric: 'Structured Linen-Look Crepe or Soft Twill Weave — Contact us for seasonal fabric options',
    fabricFilterGroup: 'Matte Crepe Options',
    availableColors: ['Pearl Ivory & Taupe', 'Jet Black & Champagne', 'Sand & Olive', 'Custom Panel Colorway'],
    availableSizes: ['50', '52', '54', '56', '58', '60', 'Custom Grading'],
    customizationInfo:
      'Available as coat-only or with sleeveless/long-sleeve inner slip dress, custom button hardware, and private-label sizing labels.',
    wholesaleAvailability: 'Available for boutique & distributor orders — Contact us for details.',
    featured: true,
    seoTitle: 'Shawl-Lapel Front-Open Abaya YA-105 | Contemporary Modest Wear Supplier',
    seoDescription:
      'Discover YA-105 Pearl & Taupe Shawl-Lapel Front-Open Abaya Set from Yasir Apparel. Tailored B2B manufacturing for international modest fashion retailers.',
  },
  {
    slug: 'architectural-panel-front-closed-abaya-ya-106',
    name: 'Architectural Asymmetric Panel Front-Closed Abaya',
    code: 'YA-106',
    category: 'Front-Closed Abayas',
    style: 'Front-Closed Classic',
    occasion: 'Work & Formal Modesty',
    mainImage: IMAGE_ASSETS.heroEditorial,
    additionalImages: [
      {
        url: IMAGE_ASSETS.heroEditorial,
        label: 'Front View',
        alt: 'Architectural Asymmetric Panel Front-Closed Abaya YA-106 in black and champagne beige',
      },
      {
        url: IMAGE_ASSETS.plainBlack,
        label: 'Back Silhouette',
        alt: 'Clean full-length tailored back drape reference',
      },
    ],
    description:
      'Signature front-closed abaya combining jet-black central tailoring with asymmetric champagne-beige vertical panels and a contrast left sleeve. Clean round neckline with concealed interior closures.',
    fabric: 'Medium-weight Matte Crepe / Nida-finish polyester blend — Contact us for fabric samples',
    fabricFilterGroup: 'Nida & Smooth Drape Options',
    availableColors: ['Black & Champagne Beige', 'Black & Pearl White', 'Charcoal & Stone', 'Custom Colorway'],
    availableSizes: ['50', '52', '54', '56', '58', '60', 'Custom Grading'],
    customizationInfo:
      'Custom neckline shape, hidden nursing-friendly zip option, side seam pockets, and custom brand woven labels.',
    wholesaleAvailability: 'Factory wholesale production — Contact us for quotation.',
    featured: true,
    seoTitle: 'Asymmetric Panel Front-Closed Abaya YA-106 | Abaya Manufacturer Pakistan',
    seoDescription:
      'Wholesale Architectural Asymmetric Panel Front-Closed Abaya (YA-106) by Yasir Apparel. Precision stitching and custom private-label manufacturing.',
  },
  {
    slug: 'mocha-chiffon-cascade-double-layer-abaya-ya-107',
    name: 'Mocha Chiffon Cascade Double-Layer Abaya',
    code: 'YA-107',
    category: 'Double-Layer Abayas',
    style: 'Double-Layer Draped',
    occasion: 'Evening & Occasion',
    mainImage: IMAGE_ASSETS.doubleLayerMocha,
    additionalImages: [
      {
        url: IMAGE_ASSETS.doubleLayerMocha,
        label: 'Front View',
        alt: 'Mocha Chiffon Cascade Double-Layer Abaya YA-107 over ivory inner dress',
      },
      {
        url: IMAGE_ASSETS.ombrePleated,
        label: 'Fabric Drape',
        alt: 'Flowing multi-layer chiffon movement detail',
      },
    ],
    description:
      'Graceful multi-tier outer chiffon cape abaya in soft mocha-taupe paired over an opaque warm-ivory inner column dress. Engineered for fluid drape without excess bulk.',
    fabric: 'Multi-layer Chiffon outer with opaque Crepe inner dress — Contact us for details',
    fabricFilterGroup: 'Chiffon & Layered Weaves',
    availableColors: ['Mocha & Warm Ivory', 'Jet Black Monochrome', 'Dusty Rose & Cream', 'Custom Dual-Layer Shades'],
    availableSizes: ['50', '52', '54', '56', '58', '60', 'Custom Grading'],
    customizationInfo:
      'Stitched-together 1-piece or detachable 2-piece construction, custom sleeve lining opacity, and coordinated hijab scarf.',
    wholesaleAvailability: 'Bulk wholesale manufacturing — Contact us for pricing.',
    featured: false,
    seoTitle: 'Mocha Chiffon Double-Layer Abaya YA-107 | Wholesale Modest Fashion',
    seoDescription:
      'Order wholesale Mocha Chiffon Cascade Double-Layer Abayas (YA-107) directly from Yasir Apparel factory in Gujranwala, Pakistan.',
  },
  {
    slug: 'ribbed-shimmer-tiktok-fabric-flowing-abaya-ya-108',
    name: 'Soft-Drape TikTok Fabric Everyday Kimono Abaya',
    code: 'YA-108',
    category: 'TikTok Fabric Abayas',
    style: 'Butterfly / Bisht Cut',
    occasion: 'Everyday Essentials',
    mainImage: IMAGE_ASSETS.ombrePleated,
    additionalImages: [
      {
        url: IMAGE_ASSETS.ombrePleated,
        label: 'Front View',
        alt: 'Soft-Drape TikTok Fabric Abaya YA-108 textured silhouette',
      },
      {
        url: IMAGE_ASSETS.atelierCraft,
        label: 'Tailoring Detail',
        alt: 'Textured fabric swatch inspection and neat cuff stitching',
      },
    ],
    description:
      'Designed specifically for high-demand retail trends using popular textured TikTok abaya fabric prized for crease resistance, subtle sheen, and fluid fall. Cut in a generous relaxed silhouette with wide cuffs.',
    fabric: 'Textured TikTok Fabric (crease-resistant flowing weave) — Contact us for current shade card',
    fabricFilterGroup: 'TikTok Textured Weaves',
    availableColors: ['Sand Taupe', 'Jet Black', 'Mink Beige', 'Olive Mist', 'Slate Grey', 'Custom Shade'],
    availableSizes: ['52', '54', '56', '58', '60', 'Free-Size Bisht'],
    customizationInfo:
      'Available in open kimono, closed A-line, or butterfly cut; matching fabric belt and hijab scarf options.',
    wholesaleAvailability: 'High-volume wholesale dispatch — Contact us for details.',
    featured: false,
    seoTitle: 'TikTok Fabric Abaya Wholesale YA-108 | Trending Abaya Supplier Pakistan',
    seoDescription:
      'Source wholesale TikTok Fabric Abayas (YA-108) directly from Yasir Apparel in Pakistan. Crease-resistant drape, multiple colors, and custom branding.',
  },
  {
    slug: 'obsidian-hand-beaded-cape-occasion-abaya-ya-109',
    name: 'Obsidian Hand-Beaded Shoulder Cape Occasion Abaya',
    code: 'YA-109',
    category: 'Luxury Occasion Abayas',
    style: 'Cape & Occasion Silhouette',
    occasion: 'Bridal & Festive',
    mainImage: IMAGE_ASSETS.luxuryOccasionCape,
    additionalImages: [
      {
        url: IMAGE_ASSETS.luxuryOccasionCape,
        label: 'Front View',
        alt: 'Obsidian Hand-Beaded Shoulder Cape Occasion Abaya YA-109 on couture mannequin',
      },
      {
        url: IMAGE_ASSETS.embroideredGold,
        label: 'Tailoring Detail',
        alt: 'Intricate metallic embellishment and couture sleeve craft',
      },
    ],
    description:
      'Couture-inspired evening cape abaya featuring structured champagne-gold beadwork along the shoulders and cascading cape borders, complemented by subtle tone-on-tone black handwork down the front panels.',
    fabric: 'Heavy Luxury Crepe / Formal Nida option with hand-applied embellishment — Contact us for details',
    fabricFilterGroup: 'Nida & Smooth Drape Options',
    availableColors: ['Obsidian Black & Champagne', 'All-Black Onyx Beadwork', 'Ivory Bridal Edition', 'Custom Couture Palette'],
    availableSizes: ['50', '52', '54', '56', '58', '60', 'Made-to-Measure'],
    customizationInfo:
      'Custom beadwork density to match target retail price points, boutique garment bag options, and private couture woven labels.',
    wholesaleAvailability: 'Boutique & occasion collection orders — Contact us for lead times.',
    featured: true,
    seoTitle: 'Luxury Hand-Beaded Cape Occasion Abaya YA-109 | Couture Abaya Manufacturer',
    seoDescription:
      'Wholesale Obsidian Hand-Beaded Shoulder Cape Occasion Abaya (YA-109) crafted by Yasir Apparel for luxury modest boutiques and bridal collections.',
  },
  {
    slug: 'bespoke-private-label-oem-abaya-program-ya-110',
    name: 'Custom Tech-Pack & Reference Sample Abaya Program',
    code: 'YA-110',
    category: 'Custom Design Abayas',
    style: 'Custom Pattern / OEM',
    occasion: 'Boutique Private Label',
    mainImage: IMAGE_ASSETS.atelierCraft,
    additionalImages: [
      {
        url: IMAGE_ASSETS.atelierCraft,
        label: 'Tailoring Detail',
        alt: 'Custom fabric swatches, tailoring shears, and private-label neck tag development',
      },
      {
        url: IMAGE_ASSETS.frontOpenIvory,
        label: 'Front View',
        alt: 'Example bespoke private-label abaya silhouette developed from client specification',
      },
      {
        url: IMAGE_ASSETS.laceTrim,
        label: 'Fabric Drape',
        alt: 'Example custom lace and contrast trim execution',
      },
    ],
    description:
      'Dedicated OEM and private-label manufacturing service where we draft patterns and produce bulk collections strictly from your sketches, reference photographs, physical garments, or technical packs.',
    fabric: 'Full access to Plain Crepe, Nida-style weaves, Chiffon, Lace, Net, and TikTok fabrics — Contact us for details',
    fabricFilterGroup: 'Custom / Buyer Specified',
    availableColors: ['Buyer Shade Card Selection', 'Custom Dye Lot Matching'],
    availableSizes: ['GCC Standard (50–60)', 'UK/EU/US Modest Sizing', 'Custom Brand Size Chart'],
    customizationInfo:
      'Complete pattern drafting, pre-production prototype sampling, custom woven brand labels, care tags, hangtags, and export carton packing.',
    wholesaleAvailability: 'Tailored to brand seasonal drops — Submit tech pack or reference photos for quotation.',
    featured: false,
    seoTitle: 'Custom Design & Private Label Abaya Manufacturing YA-110 | Yasir Apparel',
    seoDescription:
      'Manufacture your own abaya designs in Pakistan with Yasir Apparel. Send reference photos or tech packs for custom pattern making, sampling, and bulk export.',
  },
  {
    slug: 'classic-butterfly-bisht-closed-abaya-ya-111',
    name: 'Fluid Butterfly-Cut Closed Modest Abaya',
    code: 'YA-111',
    category: 'Plain Abayas',
    style: 'Butterfly / Bisht Cut',
    occasion: 'Everyday Essentials',
    mainImage: IMAGE_ASSETS.plainBlack,
    additionalImages: [
      {
        url: IMAGE_ASSETS.plainBlack,
        label: 'Front View',
        alt: 'Fluid Butterfly-Cut Closed Modest Abaya YA-111 in jet black',
      },
      {
        url: IMAGE_ASSETS.atelierCraft,
        label: 'Tailoring Detail',
        alt: 'Fitted cuff stitching detail for butterfly cut abaya',
      },
    ],
    description:
      'Generously draped butterfly-cut closed abaya offering maximum modesty and airflow, finished with fitted wrist cuffs that stay comfortably in place during daily wear and travel.',
    fabric: 'Lightweight Breathable Crepe or Soft Nida option — Contact us for details',
    fabricFilterGroup: 'Matte Crepe Options',
    availableColors: ['Jet Black', 'Warm Sand', 'Charcoal', 'Deep Olive', 'Custom Shades'],
    availableSizes: ['52', '54', '56', '58', '60', 'One-Size Draped'],
    customizationInfo:
      'Optional concealed nursing zipper, cuff elasticity or snap button cuff, and coordinated chiffon or jersey hijab.',
    wholesaleAvailability: 'Year-round core wholesale line — Contact us for factory pricing.',
    featured: false,
    seoTitle: 'Butterfly-Cut Closed Abaya YA-111 | Wholesale Muslim Apparel Pakistan',
    seoDescription:
      'Wholesale Fluid Butterfly-Cut Closed Abaya (YA-111) manufactured by Yasir Apparel. Ideal core staple for international modest wear distributors.',
  },
  {
    slug: 'two-piece-modest-prayer-garment-set-ya-112',
    name: 'Two-Piece Khimar & Skirt Modest Prayer Set',
    code: 'YA-112',
    category: 'Front-Closed Abayas',
    style: 'Front-Closed Classic',
    occasion: 'Everyday Essentials',
    mainImage: IMAGE_ASSETS.doubleLayerMocha,
    additionalImages: [
      {
        url: IMAGE_ASSETS.doubleLayerMocha,
        label: 'Front View',
        alt: 'Two-Piece Modest Prayer Garment Set YA-112 in soft neutral tones',
      },
      {
        url: IMAGE_ASSETS.atelierCraft,
        label: 'Tailoring Detail',
        alt: 'Neat hemline and soft breathable fabric swatches for prayer clothes',
      },
    ],
    description:
      'Full-coverage two-piece prayer garment set comprising a generous tie-back khimar cape with integrated chin comfort panel and a relaxed elasticated maxi skirt. Also available in one-piece travel pouch editions.',
    fabric: 'Soft Breathable Cotton-Touch Crepe or Cooling Rayon-Blend — Contact us for details',
    fabricFilterGroup: 'Chiffon & Layered Weaves',
    availableColors: ['Warm Ivory', 'Soft Mocha', 'Jet Black', 'Sage Grey', 'Dusty Mauve'],
    availableSizes: ['Standard Relaxed Fit', 'Tall Length', 'Custom Bulk Sizing'],
    customizationInfo:
      'Optional lace trim around khimar edge, matching zippered travel pouch, and custom brand embroidery.',
    wholesaleAvailability: 'Available for Ramadan, Hajj/Umrah, and retail wholesale — Contact us for details.',
    featured: false,
    seoTitle: 'Wholesale Modest Prayer Clothes Set YA-112 | Muslim Apparel Manufacturer',
    seoDescription:
      'Source wholesale two-piece and one-piece Muslim prayer clothes (YA-112) from Yasir Apparel in Pakistan. Custom colors, lace trims, and private labeling.',
  },
];
