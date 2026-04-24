export type AppLocale = 'ar' | 'en'

export function isArabic(locale: string): locale is AppLocale {
  return locale === 'ar'
}

export function pick(locale: AppLocale, arabic: string, english: string) {
  return locale === 'ar' ? arabic : english
}

export interface NavItem {
  label: string
  href: string
}

export interface StatItem {
  label: string
  value: string
}

export interface ActionItem {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export interface ModuleSummary {
  key: string
  name: string
  href: string
  tone: 'teal' | 'blue' | 'green' | 'amber' | 'purple'
  phase: string
  description: string
}

export interface DashboardCard {
  title: string
  value: string
  caption: string
  tone?: 'teal' | 'blue' | 'green' | 'amber' | 'purple'
}

export interface DetailCard {
  title: string
  body: string
  href?: string
}

export interface JourneyStep {
  title: string
  body: string
}

export interface ExperienceCopy {
  brandArabic: string
  brandEnglish: string
  languageLabel: string
  themeLabel: string
  requestDemo: string
  nav: NavItem[]
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    body: string
    primaryCta: ActionItem
    secondaryCta: ActionItem
    stats: StatItem[]
  }
  reality: {
    title: string
    items: DetailCard[]
  }
  modules: {
    title: string
    items: ModuleSummary[]
  }
  howItWorks: {
    title: string
    steps: JourneyStep[]
  }
  trust: {
    title: string
    items: DetailCard[]
  }
  socialProof: {
    title: string
    stats: StatItem[]
  }
  cta: {
    title: string
    body: string
    primary: ActionItem
    secondary: ActionItem
    waitlist: string
  }
  footer: {
    mission: string
    columns: Array<{ title: string; links: NavItem[] }>
    copyright: string
  }
  auth: {
    loginTitle: string
    loginBody: string
    registerTitle: string
    registerBody: string
    resetTitle: string
    resetBody: string
    email: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    phone: string
    accountType: string
    rememberMe: string
    forgotPassword: string
    loginButton: string
    registerButton: string
    resetButton: string
    accountTypes: { pharmacy: string; distributor: string; admin: string }
  }
}

export function getExperienceCopy(locale: AppLocale): ExperienceCopy {
  const ar = locale === 'ar'

  return {
    brandArabic: 'فارمابريدج',
    brandEnglish: 'PharmaBridge',
    languageLabel: ar ? 'الإنجليزية' : 'Arabic',
    themeLabel: ar ? 'تبديل المظهر' : 'Toggle theme',
    requestDemo: pick(locale, 'اطلب عرضًا تجريبيًا', 'Request Demo'),
    nav: [
      { label: pick(locale, 'النظام', 'Ecosystem'), href: `/${locale}#ecosystem` },
      { label: pick(locale, 'للصيدليات', 'For Pharmacies'), href: `/${locale}/pharmacy/dashboard` },
      { label: pick(locale, 'للموزعين', 'For Distributors'), href: `/${locale}/distributor/dashboard` },
      { label: pick(locale, 'الذكاء', 'Intelligence'), href: `/${locale}/pharmacy/analytics` },
      { label: pick(locale, 'التمكين', 'Enablement'), href: `/${locale}/distributor/enablement` },
      { label: pick(locale, 'الأسعار', 'Pricing'), href: `/${locale}#waitlist` },
    ],
    hero: {
      eyebrow: pick(locale, 'منصة سورية موحدة للبنية الدوائية', 'Syria’s unified pharmaceutical infrastructure'),
      title: pick(locale, 'مستقبل الصيدليات متصل الآن', 'Syria’s pharmaceutical future is connected.'),
      subtitle: pick(locale, 'نظام رقمي يربط المخزون والشراء والبيع والتحليل والتنبؤ في رحلة واحدة.', 'One connected platform for inventory, sourcing, commerce, analytics, and prediction.'),
      body: pick(locale, 'فارمابريدج تربط الصيدليات والموزعين والمرضى بوضوح تشغيلي كامل، من أول تنبيه نقص وحتى آخر قرار توريد وتحليل.', 'PharmaBridge connects pharmacies, distributors, and patients through one operational journey, from stock alerts to sourcing decisions and live analytics.'),
      primaryCta: { label: pick(locale, 'ابدأ مع إدارة مخزون الصيدلية', 'Enter PIMS'), href: `/${locale}/pharmacy/dashboard`, variant: 'primary' },
      secondaryCta: { label: pick(locale, 'استكشف ربط الموزعين', 'Explore DistributorLink'), href: `/${locale}/distributor/dashboard`, variant: 'secondary' },
      stats: [
        { label: pick(locale, 'صيدلية مستهدفة', 'Pharmacies targeted'), value: '2,000+' },
        { label: pick(locale, 'موزع متصل', 'Connected distributors'), value: '80+' },
        { label: pick(locale, 'اتصالات هاتفية', 'Cold calls removed'), value: pick(locale, 'صفر', 'Zero') },
        { label: pick(locale, 'مرحلة الإطلاق', 'Phase 1 go-live'), value: 'Q3 2026' },
      ],
    },
    reality: {
      title: pick(locale, 'الواقع الحالي الذي تعالجه المنصة', 'The current reality PharmaBridge fixes'),
      items: [
        { title: pick(locale, 'مخزون غير مرئي', 'Invisible inventory'), body: pick(locale, 'الدواء موجود لكن القرار بطيء ومجزأ.', 'Stock exists, but decision-making is fragmented and slow.') },
        { title: pick(locale, 'توريد يعتمد على الهاتف', 'Phone-call sourcing'), body: pick(locale, 'الموزعون والصيدليات يعملون بدون نافذة موحدة للعرض والطلب.', 'Distributors and pharmacies still operate without one shared demand-and-supply window.') },
        { title: pick(locale, 'رحلة مريض منفصلة', 'Disconnected patient journey'), body: pick(locale, 'المريض لا يرى السعر والتوفر والالتزام في تجربة واحدة.', 'Patients do not get availability, pricing, and fulfillment in one experience.') },
        { title: pick(locale, 'تحليلات متأخرة', 'Delayed analytics'), body: pick(locale, 'القرار التجاري يأتي بعد الحدث بدل أن يقوده.', 'Commercial insight arrives after the event instead of guiding it.') },
      ],
    },
    modules: {
      title: pick(locale, 'وحدات المنصة المترابطة', 'The connected platform modules'),
      items: [
        { key: 'pims', name: pick(locale, 'إدارة مخزون الصيدلية', 'PIMS'), href: `/${locale}/pharmacy/dashboard`, tone: 'amber', phase: pick(locale, 'وحدة تشغيل', 'Operations core'), description: pick(locale, 'إدارة المخزون والتنبيهات والامتثال اليومي للصيدلية.', 'Inventory, alerts, and daily pharmacy operations.') },
        { key: 'distributor-link', name: pick(locale, 'ربط الموزعين', 'DistributorLink'), href: `/${locale}/distributor/dashboard`, tone: 'teal', phase: pick(locale, 'طبقة الربط التجاري', 'B2B layer'), description: pick(locale, 'عرض لحظي لمخزون الموزعين وأسعارهم وزمن التوريد.', 'Live distributor stock, pricing, and delivery visibility.') },
        { key: 'pharma-market', name: pick(locale, 'سوق الدواء', 'PharmaMarket'), href: `/${locale}/marketplace`, tone: 'blue', phase: pick(locale, 'واجهة المرضى', 'Patient layer'), description: pick(locale, 'بحث دوائي، طلبات، ووصول المريض إلى صيدليات موثوقة.', 'Medicine discovery, ordering, and trusted pharmacy access.') },
        { key: 'bridge-intel', name: pick(locale, 'جسر التحليلات', 'BridgeIntel'), href: `/${locale}/pharmacy/analytics`, tone: 'purple', phase: pick(locale, 'رؤى تنفيذية', 'Insight suite'), description: pick(locale, 'تحويل بيانات التشغيل إلى قرارات نمو وتسعير ومخزون.', 'Turning operations data into growth, pricing, and stock decisions.') },
        { key: 'pharmai', name: pick(locale, 'محرك الصيدلة الذكي', 'PharmAI'), href: `/${locale}/pharmai`, tone: 'green', phase: pick(locale, 'ذكاء تنبؤي', 'Predictive engine'), description: pick(locale, 'توقع الطلب، اقتراح الشراء، وإنذار المخاطر قبل وقوعها.', 'Demand forecasting, buy recommendations, and preemptive risk alerts.') },
        { key: 'enablement', name: pick(locale, 'تمكين الموزعين', 'Distributor Enablement'), href: `/${locale}/distributor/enablement`, tone: 'blue', phase: pick(locale, 'خطة انطلاق', 'Activation plan'), description: pick(locale, 'تشغيل الموزع الجديد بسرعة عبر بيانات وتجهيز ومسار تبني واضح.', 'Fast distributor onboarding with data prep, launch readiness, and adoption support.') },
      ],
    },
    howItWorks: {
      title: pick(locale, 'كيف تسير الرحلة داخل المنصة', 'How the journey flows through the platform'),
      steps: [
        { title: pick(locale, 'الصيدلية تضبط مخزونها', 'Pharmacy stabilizes inventory'), body: pick(locale, 'تنبيهات النقص والانتهاء تبدأ من إدارة مخزون الصيدلية وتنتقل إلى مسار اتخاذ القرار.', 'Low-stock and expiry alerts originate in PIMS and trigger the next decision.') },
        { title: pick(locale, 'الموزع يلتقط الطلب', 'Distributor captures demand'), body: pick(locale, 'ربط الموزعين يحول الحاجة إلى عروض وأسعار وزمن تنفيذ قابل للمقارنة.', 'DistributorLink converts demand into comparable offers, pricing, and delivery windows.') },
        { title: pick(locale, 'المنصة تولد ذكاءً وتنفيذًا', 'The platform turns it into execution and intelligence'), body: pick(locale, 'سوق الدواء وجسر التحليلات ومحرك الصيدلة الذكي يغلقون الحلقة بين الطلب والوفاء والتحليل والتنبؤ.', 'PharmaMarket, BridgeIntel, and PharmAI close the loop between demand, fulfillment, insight, and prediction.') },
      ],
    },
    trust: {
      title: pick(locale, 'مرتكزات الثقة غير القابلة للتفاوض', 'Non-negotiable trust pillars'),
      items: [
        { title: pick(locale, 'تشغيل دون اتصال', 'Offline-first operations'), body: pick(locale, 'المنصة تحتفظ بالقراءات الأساسية وتطابق التغييرات عند عودة الاتصال.', 'Core reads remain available and queued updates sync when connectivity returns.') },
        { title: pick(locale, 'عربي أصيل', 'Arabic-native experience'), body: pick(locale, 'الواجهة مبنية لاتجاه RTL ولغة عربية أصلية لا كطبقة ترجمة لاحقة.', 'The experience is built natively for RTL and Arabic, not translated after the fact.') },
        { title: pick(locale, 'تكامل شامل بين الوحدات', 'Interconnected platform modules'), body: pick(locale, 'كل وحدة تقود إلى التالية ضمن رحلة تشغيلية واضحة بلا نهايات ميتة.', 'Every module leads into the next as part of one connected operating journey.') },
        { title: pick(locale, 'جاهزية للامتثال والتوسع', 'Compliance-ready growth'), body: pick(locale, 'الامتثال والتتبّع والتحليل بنيت لتخدم التوسع لا لتعطله.', 'Compliance, traceability, and analytics are built to enable scale instead of blocking it.') },
      ],
    },
    socialProof: {
      title: pick(locale, 'أثر تشغيلي متوقع من يوم الإطلاق', 'Expected operating impact from day one'),
      stats: [
        { label: pick(locale, 'ساعة تشغيل موفرة أسبوعيًا', 'Hours saved weekly'), value: '4,000+' },
        { label: pick(locale, 'مكالمات توريد يدوي', 'Manual sourcing calls'), value: pick(locale, 'صفر', 'Zero') },
        { label: pick(locale, 'نسبة تغطية الرحلة', 'Journey coverage'), value: '6/6' },
        { label: pick(locale, 'جاهزية العرض', 'Demo readiness'), value: pick(locale, 'مكتملة', 'Ready') },
      ],
    },
    cta: {
      title: pick(locale, 'ادخل المنصة قبل المنافسة', 'Enter the platform before your competition does'),
      body: pick(locale, 'استكشف الوحدة المناسبة لك ثم أكمل الرحلة بين المخزون والتوريد والتحليل والتنبؤ داخل نفس الواجهة.', 'Start from the module that matches your role, then move seamlessly through inventory, sourcing, analytics, and predictive workflows.'),
      primary: { label: pick(locale, 'سجل كصيدلية', 'Register as a pharmacy'), href: `/${locale}/auth/register`, variant: 'primary' },
      secondary: { label: pick(locale, 'ابدأ تمكين الموزع', 'Start distributor enablement'), href: `/${locale}/distributor/enablement`, variant: 'secondary' },
      waitlist: pick(locale, 'أكثر من 50 جهة مهتمة بالانطلاق الأولي.', '50+ organizations are already positioned for the first launch wave.'),
    },
    footer: {
      mission: pick(locale, 'منصة تشغيل دوائي موحدة تربط الصيدلية والموزع والمريض والذكاء التجاري في مسار واحد.', 'One pharmaceutical operating system connecting pharmacies, distributors, patients, and intelligence in a single journey.'),
      columns: [
        {
          title: pick(locale, 'المنصة', 'Platform'),
          links: [
            { label: pick(locale, 'إدارة مخزون الصيدلية', 'PIMS'), href: `/${locale}/pharmacy/dashboard` },
            { label: pick(locale, 'ربط الموزعين', 'DistributorLink'), href: `/${locale}/distributor/dashboard` },
            { label: pick(locale, 'سوق الدواء', 'PharmaMarket'), href: `/${locale}/marketplace` },
          ],
        },
        {
          title: pick(locale, 'الذكاء', 'Intelligence'),
          links: [
            { label: pick(locale, 'جسر التحليلات', 'BridgeIntel'), href: `/${locale}/pharmacy/analytics` },
            { label: pick(locale, 'محرك الصيدلة الذكي', 'PharmAI'), href: `/${locale}/pharmai` },
            { label: pick(locale, 'التمكين', 'Enablement'), href: `/${locale}/distributor/enablement` },
          ],
        },
        {
          title: pick(locale, 'الدخول', 'Access'),
          links: [
            { label: pick(locale, 'تسجيل الدخول', 'Login'), href: `/${locale}/auth/login` },
            { label: pick(locale, 'إنشاء حساب', 'Register'), href: `/${locale}/auth/register` },
            { label: pick(locale, 'إعادة التعيين', 'Reset password'), href: `/${locale}/auth/reset-password` },
          ],
        },
      ],
      copyright: pick(locale, '© 2026 فارمابريدج. جميع الحقوق محفوظة.', '© 2026 PharmaBridge. All rights reserved.'),
    },
    auth: {
      loginTitle: pick(locale, 'دخول آمن إلى المنصة', 'Secure platform access'),
      loginBody: pick(locale, 'ادخل إلى المسار التشغيلي المناسب لدورك داخل النظام.', 'Enter the operating journey that matches your role in the platform.'),
      registerTitle: pick(locale, 'إنشاء حساب تشغيل جديد', 'Create a new operating account'),
      registerBody: pick(locale, 'ابدأ تجهيز الصيدلية أو الموزع أو فريق الإدارة على نفس البنية الموحدة.', 'Onboard a pharmacy, distributor, or admin team into the same connected operating layer.'),
      resetTitle: pick(locale, 'استعادة الوصول', 'Restore account access'),
      resetBody: pick(locale, 'أدخل بريدك لتلقي رابط استعادة آمن ومباشر.', 'Enter your email to receive a direct secure recovery link.'),
      email: pick(locale, 'البريد الإلكتروني', 'Email'),
      password: pick(locale, 'كلمة المرور', 'Password'),
      confirmPassword: pick(locale, 'تأكيد كلمة المرور', 'Confirm password'),
      firstName: pick(locale, 'الاسم الأول', 'First name'),
      lastName: pick(locale, 'اسم العائلة', 'Last name'),
      phone: pick(locale, 'الهاتف', 'Phone'),
      accountType: pick(locale, 'نوع الحساب', 'Account type'),
      rememberMe: pick(locale, 'تذكرني', 'Remember me'),
      forgotPassword: pick(locale, 'نسيت كلمة المرور؟', 'Forgot password?'),
      loginButton: pick(locale, 'ادخل إلى المنصة', 'Enter platform'),
      registerButton: pick(locale, 'أنشئ الحساب', 'Create account'),
      resetButton: pick(locale, 'أرسل رابط الاستعادة', 'Send recovery link'),
      accountTypes: {
        pharmacy: pick(locale, 'صيدلية', 'Pharmacy'),
        distributor: pick(locale, 'موزع', 'Distributor'),
        admin: pick(locale, 'إدارة', 'Admin'),
      },
    },
  }
}

export function getModuleOverview(locale: AppLocale) {
  return {
    pims: {
      title: pick(locale, 'إدارة مخزون الصيدلية', 'PIMS - Pharmacy Inventory Management'),
      summary: pick(locale, 'لوحة تشغيل موحدة لمخزون الصيدلية، التنبيهات، الشراء، والتتبع اليومي.', 'A unified operating board for stock, alerts, sourcing, and day-to-day pharmacy execution.'),
      stats: [
        { title: pick(locale, 'أصناف فعالة', 'Active SKUs'), value: '1,248', caption: pick(locale, 'متابعة فورية للمخزون', 'Tracked live across inventory'), tone: 'amber' as const },
        { title: pick(locale, 'تنبيهات عاجلة', 'Urgent alerts'), value: '12', caption: pick(locale, 'نقص أو قرب انتهاء', 'Low stock or near expiry'), tone: 'blue' as const },
        { title: pick(locale, 'طلبات توريد', 'Sourcing requests'), value: '8', caption: pick(locale, 'مرتبطة بربط الموزعين', 'Already routed into DistributorLink'), tone: 'teal' as const },
      ],
      actions: [
        { label: pick(locale, 'إدارة المخزون', 'Manage inventory'), href: `/${locale}/pharmacy/inventory`, variant: 'primary' as const },
        { label: pick(locale, 'فتح التوريد', 'Open sourcing'), href: `/${locale}/pharmacy/sourcing`, variant: 'secondary' as const },
        { label: pick(locale, 'تحليل الأداء', 'Review analytics'), href: `/${locale}/pharmacy/analytics`, variant: 'ghost' as const },
      ],
      details: [
        { title: pick(locale, 'رحلة النقص', 'Shortage journey'), body: pick(locale, 'كل صنف منخفض يربط مباشرة بمسار طلب أو مقارنة موردين.', 'Every low-stock item links directly into a sourcing and supplier comparison flow.'), href: `/${locale}/pharmacy/sourcing` },
        { title: pick(locale, 'التكامل مع السوق', 'Marketplace integration'), body: pick(locale, 'توفر الصيدلية في السوق العام يتحدث مباشرة مع حالة المخزون.', 'Marketplace availability reflects pharmacy stock position directly.'), href: `/${locale}/marketplace` },
        { title: pick(locale, 'الذكاء التنبؤي', 'Predictive intelligence'), body: pick(locale, 'التوصيات القادمة من محرك الصيدلة الذكي تغذي قرار الشراء الاستباقي.', 'Upcoming PharmAI recommendations feed proactive purchasing decisions.'), href: `/${locale}/pharmai` },
      ],
    },
    distributorLink: {
      title: pick(locale, 'ربط الموزعين - مركز الربط التجاري', 'DistributorLink - B2B Connectivity Hub'),
      summary: pick(locale, 'تجربة واحدة لالتقاط الطلب، عرض الموردين، وتأكيد التوريد دون مكالمات متفرقة.', 'A single experience for capturing demand, comparing suppliers, and confirming fulfillment without fragmented phone calls.'),
      stats: [
        { title: pick(locale, 'موردون نشطون', 'Active suppliers'), value: '23', caption: pick(locale, 'مع تحقق وتمييز سرعة التوريد', 'With verification and fulfillment speed signals'), tone: 'teal' as const },
        { title: pick(locale, 'عروض مطابقة', 'Matched offers'), value: '41', caption: pick(locale, 'مرتبطة بطلبات الصيدليات', 'Connected to pharmacy demand in real time'), tone: 'blue' as const },
        { title: pick(locale, 'مسارات تمكين', 'Enablement tracks'), value: '6', caption: pick(locale, 'للموزعين الجدد قبل التفعيل', 'For new distributors before launch'), tone: 'green' as const },
      ],
      actions: [
        { label: pick(locale, 'فتح لوحة الموزع', 'Open distributor board'), href: `/${locale}/distributor/dashboard`, variant: 'primary' as const },
        { label: pick(locale, 'بدء التمكين', 'Start enablement'), href: `/${locale}/distributor/enablement`, variant: 'secondary' as const },
        { label: pick(locale, 'عرض تحليلات الموزع', 'View distributor analytics'), href: `/${locale}/distributor/analytics`, variant: 'ghost' as const },
      ],
      details: [
        { title: pick(locale, 'التقاط الطلب من إدارة المخزون', 'Demand handoff from PIMS'), body: pick(locale, 'كل حاجة دوائية تنتقل مباشرة من الصيدلية إلى قنوات العرض المناسبة.', 'Every pharmacy need moves directly into the right supply channels.'), href: `/${locale}/pharmacy/dashboard` },
        { title: pick(locale, 'واجهات أسعار قابلة للمقارنة', 'Comparable price windows'), body: pick(locale, 'السعر والكمية وزمن التوصيل معروضة في طبقة موحدة لاتخاذ القرار.', 'Price, quantity, and delivery time are presented in one comparable decision layer.'), href: `/${locale}/pharmacy/sourcing` },
        { title: pick(locale, 'تمكين انطلاق جديد', 'New distributor activation'), body: pick(locale, 'الموزع الجديد يحصل على مسار تجهيز واضح حتى يصبح جزءًا من الشبكة.', 'New distributors receive a clear ramp-up path into the network.'), href: `/${locale}/distributor/enablement` },
      ],
    },
    market: {
      title: pick(locale, 'سوق الدواء للمريض', 'PharmaMarket - The patient marketplace'),
      summary: pick(locale, 'واجهة بحث وطلب تربط المرضى بصيدليات موثوقة مع ظهور واضح للتوفر والسعر والتنفيذ.', 'A searchable ordering surface that connects patients with trusted pharmacies and clear availability, pricing, and fulfillment.'),
      stats: [
        { title: pick(locale, 'نتائج مطابقة', 'Matched pharmacies'), value: '3', caption: pick(locale, 'من شبكة موثقة وقابلة للطلب', 'Returned from the connected verified network'), tone: 'blue' as const },
        { title: pick(locale, 'وقت الالتقاط', 'Pickup readiness'), value: '30m', caption: pick(locale, 'يتأثر مباشرة بمخزون الصيدلية الحي', 'Driven directly by live PIMS inventory'), tone: 'teal' as const },
        { title: pick(locale, 'طلبات المرضى', 'Patient orders'), value: '18', caption: pick(locale, 'مرئية للصيدلية والتحليلات', 'Visible to pharmacies and analytics'), tone: 'purple' as const },
      ],
      actions: [
        { label: pick(locale, 'البحث عن دواء', 'Search medicine'), href: `/${locale}/marketplace`, variant: 'primary' as const },
        { label: pick(locale, 'لوحة المريض', 'Open patient dashboard'), href: `/${locale}/patient/dashboard`, variant: 'secondary' as const },
        { label: pick(locale, 'عرض الصيدلية', 'Open storefront'), href: `/${locale}/pharmacy/1`, variant: 'ghost' as const },
      ],
      details: [
        { title: pick(locale, 'توافر حي', 'Live availability'), body: pick(locale, 'المريض يرى ما تعلنه الصيدلية من مخزون وسعر في لحظة واحدة.', 'Patients see current stock and price exactly as the pharmacy publishes it.'), href: `/${locale}/pharmacy/1` },
        { title: pick(locale, 'الطلبات تغذي التحليلات', 'Orders feed intelligence'), body: pick(locale, 'كل طلب جديد يعود إلى جسر التحليلات ومحرك الصيدلة الذكي لتحسين القرار التالي.', 'Every new order flows back into BridgeIntel and PharmAI to improve the next decision.'), href: `/${locale}/pharmacy/analytics` },
        { title: pick(locale, 'رفع الوصفة', 'Prescription upload'), body: pick(locale, 'رفع الوصفة جزء من رحلة تنفيذ حقيقية لا واجهة ميتة.', 'Prescription upload is part of a real fulfillment path, not a dead-end interaction.'), href: `/${locale}/marketplace` },
      ],
    },
    intel: {
      title: pick(locale, 'جسر التحليلات والذكاء التجاري', 'BridgeIntel - Business intelligence and analytics'),
      summary: pick(locale, 'طبقة تحليل موحدة تجمع الأداء التشغيلي والتجاري لتقود التسعير والمخزون والتمكين.', 'A unified analytics layer that combines operational and commercial performance to drive pricing, inventory, and enablement.'),
      stats: [
        { title: pick(locale, 'نمو الطلب', 'Demand growth'), value: '+18%', caption: pick(locale, 'آخر 30 يومًا', 'Last 30 days'), tone: 'purple' as const },
        { title: pick(locale, 'أصناف معرضة', 'At-risk items'), value: '14', caption: pick(locale, 'مرتبطة بتنبيهات محرك الصيدلة الذكي', 'Linked to PharmAI alerts'), tone: 'amber' as const },
        { title: pick(locale, 'عرض تنفيذي', 'Executive snapshots'), value: '6', caption: pick(locale, 'لصيدليات وموزعين وإدارة', 'Across pharmacy, distributor, and admin views'), tone: 'blue' as const },
      ],
      actions: [
        { label: pick(locale, 'لوحة تحليلات الصيدلية', 'Pharmacy analytics'), href: `/${locale}/pharmacy/analytics`, variant: 'primary' as const },
        { label: pick(locale, 'لوحة تحليلات الموزع', 'Distributor analytics'), href: `/${locale}/distributor/analytics`, variant: 'secondary' as const },
        { label: pick(locale, 'افتح محرك الصيدلة الذكي', 'Open PharmAI'), href: `/${locale}/pharmai`, variant: 'ghost' as const },
      ],
      details: [
        { title: pick(locale, 'تحليل متعدد الوحدات', 'Cross-module visibility'), body: pick(locale, 'التحليلات تجمع إدارة المخزون وربط الموزعين وسوق الدواء في لوحة تنفيذية واحدة.', 'Analytics blends PIMS, DistributorLink, and PharmaMarket into one executive view.'), href: `/${locale}/admin/dashboard` },
        { title: pick(locale, 'تصدير جاهز للاجتماع', 'Export-ready reporting'), body: pick(locale, 'كل شاشة تحليلية تقود إلى قرار أو تصدير أو متابعة تنفيذ.', 'Every analytics screen leads into a decision, export, or next action.'), href: `/${locale}/distributor/analytics` },
        { title: pick(locale, 'صلة مباشرة بالتنبؤ', 'Direct line to prediction'), body: pick(locale, 'الرؤى التاريخية تغذي توقعات محرك الصيدلة الذكي وتفسرها للمستخدم.', 'Historic insight feeds PharmAI forecasting and makes it explainable.'), href: `/${locale}/pharmai` },
      ],
    },
    ai: {
      title: pick(locale, 'محرك الذكاء التنبؤي', 'PharmAI - Predictive intelligence engine'),
      summary: pick(locale, 'طبقة تنبؤ وتشغيل تستبق النقص والطلب والانحرافات قبل أن تتحول إلى أزمة.', 'A predictive and operational layer that anticipates shortages, demand spikes, and risk before they become crises.'),
      stats: [
        { title: pick(locale, 'توقعات فعالة', 'Active forecasts'), value: '27', caption: pick(locale, 'مبنية على بيانات المبيعات والمخزون', 'Built from live sales and stock signals'), tone: 'green' as const },
        { title: pick(locale, 'توصيات شراء', 'Buy recommendations'), value: '9', caption: pick(locale, 'مرسلة مباشرة إلى مسارات إدارة المخزون', 'Sent directly into PIMS workflows'), tone: 'teal' as const },
        { title: pick(locale, 'إشارات مخاطر', 'Risk alerts'), value: '5', caption: pick(locale, 'مرتبطة بالموزعين والسوق', 'Connected to distributors and market demand'), tone: 'purple' as const },
      ],
      actions: [
        { label: pick(locale, 'تفعيل التنبؤات', 'Activate forecasting'), href: `/${locale}/pharmai`, variant: 'primary' as const },
        { label: pick(locale, 'افتح التحليلات', 'Open BridgeIntel'), href: `/${locale}/pharmacy/analytics`, variant: 'secondary' as const },
        { label: pick(locale, 'العودة إلى إدارة المخزون', 'Return to PIMS'), href: `/${locale}/pharmacy/dashboard`, variant: 'ghost' as const },
      ],
      details: [
        { title: pick(locale, 'تنبؤ الطلب', 'Demand forecasting'), body: pick(locale, 'يتوقع الأصناف والكمية وفترة الذروة لكل صيدلية أو منطقة.', 'Forecasts the item, volume, and timing of demand by pharmacy or geography.'), href: `/${locale}/pharmacy/dashboard` },
        { title: pick(locale, 'اقتراحات شراء قابلة للتنفيذ', 'Actionable buy guidance'), body: pick(locale, 'التوصية لا تتوقف عند الرسم البياني بل تتحول إلى مسار شراء مباشر.', 'Recommendations move beyond charts and become direct sourcing actions.'), href: `/${locale}/pharmacy/sourcing` },
        { title: pick(locale, 'قراءة شبكة المنصة', 'Network-wide intelligence'), body: pick(locale, 'محرك الصيدلة الذكي يقرأ الصيدلية والموزع والسوق معًا ضمن نموذج واحد.', 'PharmAI reads pharmacy, distributor, and marketplace signals together.'), href: `/${locale}/marketplace` },
      ],
    },
    enablement: {
      title: pick(locale, 'استراتيجية تمكين الموزعين والانطلاق', 'Distributor cold start and enablement'),
      summary: pick(locale, 'مسار واضح لتحويل الموزع الجديد من بيانات خام إلى عقدة نشطة داخل شبكة فارمابريدج.', 'A clear path that converts a new distributor from raw data readiness into an active PharmaBridge network node.'),
      stats: [
        { title: pick(locale, 'مراحل التفعيل', 'Activation phases'), value: '4', caption: pick(locale, 'بيانات، كتالوج، فريق، قياس', 'Data, catalog, team, and performance readiness'), tone: 'blue' as const },
        { title: pick(locale, 'أيام للوصول', 'Days to readiness'), value: '14', caption: pick(locale, 'ضمن نموذج تمكين منظم', 'Inside a structured enablement motion'), tone: 'teal' as const },
        { title: pick(locale, 'مؤشرات نجاح', 'Success checkpoints'), value: '12', caption: pick(locale, 'مرتبطة بالتبني والطلب والتنفيذ', 'Connected to adoption, demand, and fulfillment'), tone: 'green' as const },
      ],
      actions: [
        { label: pick(locale, 'ابدأ التمكين', 'Start enablement'), href: `/${locale}/distributor/enablement`, variant: 'primary' as const },
        { label: pick(locale, 'لوحة الموزع', 'Distributor dashboard'), href: `/${locale}/distributor/dashboard`, variant: 'secondary' as const },
        { label: pick(locale, 'تحليلات الأداء', 'Performance analytics'), href: `/${locale}/distributor/analytics`, variant: 'ghost' as const },
      ],
      details: [
        { title: pick(locale, 'تهيئة البيانات', 'Data readiness'), body: pick(locale, 'رفع الكتالوج والتسعير وأوقات التوصيل قبل أي تفعيل تجاري.', 'Catalog, pricing, and delivery setup happen before commercial activation.'), href: `/${locale}/distributor/dashboard` },
        { title: pick(locale, 'تمكين الفريق', 'Team enablement'), body: pick(locale, 'أدوار المبيعات والعمليات وخدمة العملاء تعمل ضمن مسار واحد قابل للقياس.', 'Sales, operations, and service teams work in one measurable operating flow.'), href: `/${locale}/admin/dashboard` },
        { title: pick(locale, 'حلقات تغذية راجعة', 'Closed-loop feedback'), body: pick(locale, 'الطلب الفعلي من الصيدليات يغذي خطة التمكين والتحسين المستمر.', 'Real pharmacy demand feeds the enablement plan and continuous improvement.'), href: `/${locale}/pharmacy/dashboard` },
      ],
    },
  }
}
