import type { AppLocale } from '@/lib/platform-content'

export interface PharmaMarketProduct {
  id: string
  slug: string
  name: { ar: string; en: string }
  description: { ar: string; en: string }
  category: { ar: string; en: string }
  pharmacy: { ar: string; en: string }
  city: { ar: string; en: string }
  image: string
  price: number
  originalPrice?: number
  requiresPrescription?: boolean
  inStock: boolean
  featured?: boolean
  deal?: boolean
  tags: { ar: string[]; en: string[] }
}

export const pharmamarketProducts: PharmaMarketProduct[] = [
  {
    id: 'pm-001',
    slug: 'panadol-extra',
    name: { ar: 'بانادول إكسترا', en: 'Panadol Extra' },
    description: {
      ar: 'مسكن سريع للصداع وآلام الجسم مع توصيل أو استلام قريب.',
      en: 'Fast relief for headaches and body pain with nearby pickup or delivery.',
    },
    category: { ar: 'الألم والحمى', en: 'Pain and fever' },
    pharmacy: { ar: 'صيدلية الراشد', en: 'Al-Rashid Pharmacy' },
    city: { ar: 'دمشق', en: 'Damascus' },
    image: '/images/pharmamarket/panadol.png',
    price: 9000,
    originalPrice: 11000,
    inStock: true,
    featured: true,
    deal: true,
    tags: { ar: ['توصيل مجاني', 'الأكثر طلبًا'], en: ['Free delivery', 'Popular'] },
  },
  {
    id: 'pm-002',
    slug: 'augmentin-1g',
    name: { ar: 'أوغمنتين 1غ', en: 'Augmentin 1G' },
    description: {
      ar: 'مضاد حيوي يتطلب وصفة مع مسار مراجعة سريع للصيدلي.',
      en: 'Prescription antibiotic with pharmacist review built into checkout.',
    },
    category: { ar: 'مضادات حيوية', en: 'Antibiotics' },
    pharmacy: { ar: 'صيدلية الشام', en: 'AlSham Pharmacy' },
    city: { ar: 'حلب', en: 'Aleppo' },
    image: '/images/pharmamarket/augmentin.png',
    price: 26000,
    requiresPrescription: true,
    inStock: true,
    featured: true,
    tags: { ar: ['وصفة مطلوبة', 'تأكيد صيدلي'], en: ['Rx required', 'Pharmacist verified'] },
  },
  {
    id: 'pm-003',
    slug: 'omega-3-gummies',
    name: { ar: 'أوميغا 3 جاميز', en: 'Omega 3 Gummies' },
    description: {
      ar: 'مكمل يومي ضمن قسم العروض والعناية الوقائية.',
      en: 'Daily supplement featured in the preventive care offers lane.',
    },
    category: { ar: 'فيتامينات ومكملات', en: 'Vitamins and supplements' },
    pharmacy: { ar: 'صيدلية المدينة', en: 'City Pharmacy' },
    city: { ar: 'حمص', en: 'Homs' },
    image: '/images/pharmamarket/omega3.png',
    price: 18500,
    originalPrice: 21000,
    inStock: true,
    deal: true,
    tags: { ar: ['عرض اليوم'], en: ['Deal of the day'] },
  },
  {
    id: 'pm-004',
    slug: 'ventolin-inhaler',
    name: { ar: 'بخاخ فنتولين', en: 'Ventolin Inhaler' },
    description: {
      ar: 'متاح ضمن دمشق فقط حاليًا. يمكن تفعيل تنبيه واتساب أو SMS عند توفره في مدينتك.',
      en: 'Currently available in Damascus only. Customers can request WhatsApp or SMS alerts for their city.',
    },
    category: { ar: 'الجهاز التنفسي', en: 'Respiratory' },
    pharmacy: { ar: 'صيدلية الميدان', en: 'Al-Midan Pharmacy' },
    city: { ar: 'دمشق', en: 'Damascus' },
    image: '/images/pharmamarket/ventolin.png',
    price: 32000,
    inStock: false,
    featured: true,
    tags: { ar: ['تنبيه عند التوفر'], en: ['Notify me'] },
  },
  {
    id: 'pm-005',
    slug: 'nexium-40',
    name: { ar: 'نيكسيوم 40', en: 'Nexium 40' },
    description: {
      ar: 'دواء للمعدة مرتبط بإعادة الطلب من الطلبات السابقة.',
      en: 'Digestive care item designed for quick reorders from order history.',
    },
    category: { ar: 'الهضم والمعدة', en: 'Digestive health' },
    pharmacy: { ar: 'صيدلية باب توما', en: 'Bab Touma Pharmacy' },
    city: { ar: 'دمشق', en: 'Damascus' },
    image: '/images/pharmamarket/nexium.png',
    price: 22000,
    inStock: true,
    tags: { ar: ['إعادة طلب سريعة'], en: ['Quick reorder'] },
  },
  {
    id: 'pm-006',
    slug: 'cetirizine-10',
    name: { ar: 'سيتريزين 10', en: 'Cetirizine 10' },
    description: {
      ar: 'دواء للحساسية ضمن سلة الشراء السريعة والطلبات المتكررة.',
      en: 'Allergy relief item suited for favorites and repeat checkout.',
    },
    category: { ar: 'الحساسية', en: 'Allergy care' },
    pharmacy: { ar: 'صيدلية الياسمين', en: 'Yasmin Pharmacy' },
    city: { ar: 'اللاذقية', en: 'Latakia' },
    image: '/images/pharmamarket/cetirizine.png',
    price: 7800,
    inStock: true,
    tags: { ar: ['سريع', 'سهل الطلب'], en: ['Fast', 'Easy order'] },
  },
]

export function getPharmaMarketProduct(idOrSlug: string) {
  return pharmamarketProducts.find((product) => product.id === idOrSlug || product.slug === idOrSlug)
}

export function productText(product: PharmaMarketProduct, locale: AppLocale) {
  return {
    name: product.name[locale],
    description: product.description[locale],
    category: product.category[locale],
    pharmacy: product.pharmacy[locale],
    city: product.city[locale],
    tags: product.tags[locale],
  }
}

export const pharmamarketCategories = [
  {
    key: 'pain',
    title: { ar: 'الألم والحمى', en: 'Pain and Fever' },
    href: '/catalog?category=pain',
  },
  {
    key: 'antibiotics',
    title: { ar: 'مضادات حيوية', en: 'Antibiotics' },
    href: '/catalog?category=antibiotics',
  },
  {
    key: 'vitamins',
    title: { ar: 'فيتامينات', en: 'Vitamins' },
    href: '/catalog?category=vitamins',
  },
  {
    key: 'respiratory',
    title: { ar: 'تنفسي', en: 'Respiratory' },
    href: '/catalog?category=respiratory',
  },
]

export function formatCurrency(locale: AppLocale, amount: number) {
  if (locale === 'ar') {
    return `${amount.toLocaleString('ar-SY')} ل.س`
  }

  return `${amount.toLocaleString('en-US')} SYP`
}
