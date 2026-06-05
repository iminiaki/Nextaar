import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight, CheckCircle2, HelpCircle, Layers3, Sparkles, Target } from "lucide-react"
import { getDictionary, isRTL, type Locale } from "@/lib/i18n"
import { services } from "@/lib/content"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { Button } from "@/components/ui/button"
import { PlanContactDialog } from "@/components/plan-contact-dialog"

type Params = { params: { locale: Locale; slug: string } }
type Localized = Record<Locale, string>

const labels: Record<
  Locale,
  {
    overview: string
    deliverables: string
    process: string
    pricing: string
    faq: string
    faqSubtitle: string
    included: string
    popular: string
    oneTime: string
    monthly: string
    rentDivider: string
    monthlyNote: string
    viewDetails: string
    contact: string
    back: string
  }
> = {
  en: {
    overview: "Overview",
    deliverables: "What you get",
    process: "How we work",
    pricing: "Pricing plans",
    faq: "Frequently asked questions",
    faqSubtitle: "Clear answers before you choose the right plan.",
    included: "Included",
    popular: "Popular",
    oneTime: "One-time payment",
    monthly: "Monthly",
    rentDivider: "or rent",
    monthlyNote: "Monthly plan, including support",
    viewDetails: "View details",
    contact: "Start a project",
    back: "Back to services",
  },
  fa: {
    overview: "مرور کلی",
    deliverables: "آنچه دریافت می‌کنید",
    process: "روش همکاری",
    pricing: "پلن‌های قیمت‌گذاری",
    faq: "سوالات متداول",
    faqSubtitle: "پاسخ‌های شفاف پیش از انتخاب پلن مناسب.",
    included: "شامل",
    popular: "محبوب",
    oneTime: "پرداخت یک‌باره",
    monthly: "ماهانه",
    rentDivider: "یا اجاره",
    monthlyNote: "پلن ماهانه، شامل پشتیبانی",
    viewDetails: "مشاهده جزئیات",
    contact: "شروع پروژه",
    back: "بازگشت به خدمات",
  },
  ar: {
    overview: "نظرة عامة",
    deliverables: "ما الذي تحصل عليه",
    process: "طريقة العمل",
    pricing: "خطط الأسعار",
    faq: "الأسئلة الشائعة",
    faqSubtitle: "إجابات واضحة قبل اختيار الخطة المناسبة.",
    included: "يشمل",
    popular: "الأكثر طلبا",
    oneTime: "دفعة واحدة",
    monthly: "شهريا",
    rentDivider: "أو إيجار",
    monthlyNote: "خطة شهرية تشمل الدعم",
    viewDetails: "عرض التفاصيل",
    contact: "ابدأ مشروعا",
    back: "العودة إلى الخدمات",
  },
}

const details: Record<
  string,
  {
    eyebrow: Localized
    description: Localized
    highlights: Record<Locale, string[]>
    process: Record<Locale, string[]>
    pricing: {
      name: Localized
      price: Localized
      monthlyPrice: Localized
      description: Localized
      features: Record<Locale, string[]>
      featured?: boolean
    }[]
    faqs: { question: Localized; answer: Localized }[]
    cta: { title: Localized; body: Localized }
  }
> = {
  "web-development": {
    eyebrow: { en: "Fast, scalable engineering", fa: "مهندسی سریع و مقیاس‌پذیر", ar: "هندسة سريعة وقابلة للتوسع" },
    description: {
      en: "From conversion-focused websites to custom web apps, we build production-ready platforms with clean architecture, performance, accessibility, and SEO foundations from day one.",
      fa: "از وب‌سایت‌های متمرکز بر تبدیل تا وب‌اپ‌های اختصاصی، پلتفرم‌هایی آماده تولید می‌سازیم که از روز اول معماری تمیز، عملکرد، دسترس‌پذیری و پایه سئو دارند.",
      ar: "من المواقع المركزة على التحويل إلى تطبيقات الويب المخصصة، نبني منصات جاهزة للإنتاج بمعمارية نظيفة وأداء وإمكانية وصول وأساس SEO منذ اليوم الأول.",
    },
    highlights: {
      en: ["Next.js and modern TypeScript stack", "Responsive, accessible UI implementation", "CMS, forms, auth, dashboards, and integrations", "Performance, SEO, analytics, and deployment setup"],
      fa: ["استک مدرن Next.js و TypeScript", "پیاده‌سازی واکنش‌گرا و دسترس‌پذیر", "CMS، فرم، احراز هویت، داشبورد و اتصال سرویس‌ها", "تنظیم عملکرد، سئو، آنالیتیکس و دیپلوی"],
      ar: ["Next.js وTypeScript حديث", "تنفيذ واجهات متجاوبة وسهلة الوصول", "CMS ونماذج وتسجيل دخول ولوحات وتكاملات", "إعداد الأداء وSEO والتحليلات والنشر"],
    },
    process: {
      en: ["Scope the product and technical requirements", "Design the architecture and user flows", "Build, test, optimize, and launch", "Support iteration after launch"],
      fa: ["تعریف دامنه محصول و نیازهای فنی", "طراحی معماری و مسیرهای کاربر", "ساخت، تست، بهینه‌سازی و لانچ", "پشتیبانی از بهبود پس از لانچ"],
      ar: ["تحديد نطاق المنتج والمتطلبات التقنية", "تصميم المعمارية ومسارات المستخدم", "البناء والاختبار والتحسين والإطلاق", "دعم التحسين بعد الإطلاق"],
    },
    pricing: [
      {
        name: { en: "Launch Site", fa: "سایت لانچ", ar: "موقع إطلاق" },
        price: { en: "From $1,500", fa: "شروع از 135M تومان", ar: "ابتداء من AED 5,500" },
        monthlyPrice: { en: "From $149", fa: "شروع از 13.5M تومان", ar: "ابتداء من AED 550" },
        description: { en: "For polished company websites and landing pages.", fa: "برای سایت شرکتی و لندینگ حرفه‌ای.", ar: "للمواقع التعريفية وصفحات الهبوط الاحترافية." },
        features: {
          en: ["Up to 5 core pages", "Responsive implementation", "Basic SEO setup", "Contact form"],
          fa: ["تا ۵ صفحه اصلی", "پیاده‌سازی واکنش‌گرا", "تنظیم پایه سئو", "فرم تماس"],
          ar: ["حتى 5 صفحات أساسية", "تنفيذ متجاوب", "إعداد SEO أساسي", "نموذج تواصل"],
        },
      },
      {
        name: { en: "Growth Website", fa: "وب‌سایت رشد", ar: "موقع نمو" },
        price: { en: "From $3,500", fa: "شروع از 315M تومان", ar: "ابتداء من AED 12,900" },
        monthlyPrice: { en: "From $299", fa: "شروع از 27M تومان", ar: "ابتداء من AED 1,100" },
        description: { en: "For content-rich websites with CMS and integrations.", fa: "برای سایت‌های محتوایی با CMS و اتصال سرویس‌ها.", ar: "للمواقع الغنية بالمحتوى مع CMS وتكاملات." },
        features: {
          en: ["CMS integration", "Blog or portfolio system", "Advanced SEO structure", "Analytics and deployment"],
          fa: ["اتصال CMS", "سیستم بلاگ یا نمونه‌کار", "ساختار پیشرفته سئو", "آنالیتیکس و دیپلوی"],
          ar: ["تكامل CMS", "نظام مدونة أو أعمال", "بنية SEO متقدمة", "تحليلات ونشر"],
        },
        featured: true,
      },
      {
        name: { en: "Custom Web App", fa: "وب‌اپ اختصاصی", ar: "تطبيق ويب مخصص" },
        price: { en: "Custom quote", fa: "برآورد اختصاصی", ar: "تسعير مخصص" },
        monthlyPrice: { en: "Custom", fa: "اختصاصی", ar: "مخصص" },
        description: { en: "For dashboards, portals, workflows, and custom products.", fa: "برای داشبورد، پرتال، فرایند و محصول اختصاصی.", ar: "للوحات والبوابات وسير العمل والمنتجات المخصصة." },
        features: {
          en: ["Product discovery", "Auth and roles", "APIs and integrations", "QA and launch support"],
          fa: ["دیسکاوری محصول", "احراز هویت و نقش‌ها", "API و یکپارچه‌سازی", "تست و پشتیبانی لانچ"],
          ar: ["استكشاف المنتج", "تسجيل دخول وصلاحيات", "APIs وتكاملات", "اختبار ودعم إطلاق"],
        },
      },
    ],
    cta: {
      title: { en: "Ready to build a faster web experience?", fa: "آماده ساخت یک تجربه وب سریع‌تر هستید؟", ar: "هل أنت جاهز لبناء تجربة ويب أسرع؟" },
      body: { en: "Tell us what you want to launch and we will map the best technical path.", fa: "هدف لانچ خود را بگویید تا بهترین مسیر فنی را پیشنهاد کنیم.", ar: "أخبرنا بما تريد إطلاقه وسنرسم أفضل مسار تقني." },
    },
    faqs: [
      {
        question: { en: "How long does a web development project take?", fa: "یک پروژه توسعه وب چقدر زمان می‌برد؟", ar: "كم يستغرق مشروع تطوير الويب؟" },
        answer: { en: "A focused landing page usually takes 2-3 weeks. A full website or web app depends on integrations, content, and approval speed, but most projects land between 4-10 weeks.", fa: "یک لندینگ متمرکز معمولا ۲ تا ۳ هفته زمان می‌برد. وب‌سایت کامل یا وب‌اپ به اتصال‌ها، محتوا و سرعت تایید بستگی دارد و اغلب بین ۴ تا ۱۰ هفته انجام می‌شود.", ar: "صفحة هبوط مركزة تستغرق عادة 2-3 أسابيع. الموقع الكامل أو تطبيق الويب يعتمد على التكاملات والمحتوى وسرعة الموافقات، وغالبا بين 4-10 أسابيع." },
      },
      {
        question: { en: "Can you connect the site to a CMS?", fa: "می‌توانید سایت را به CMS وصل کنید؟", ar: "هل يمكن ربط الموقع بنظام CMS؟" },
        answer: { en: "Yes. We can integrate Payload, headless CMS tools, custom admin panels, or lightweight content editing depending on your workflow.", fa: "بله. بسته به فرایند شما می‌توانیم Payload، CMS هدلس، پنل اختصاصی یا ویرایش محتوای سبک را پیاده‌سازی کنیم.", ar: "نعم. يمكننا دمج Payload أو CMS بدون واجهة أو لوحة مخصصة أو تحرير محتوى خفيف حسب طريقة عملك." },
      },
      {
        question: { en: "Is SEO included in development?", fa: "آیا سئو در توسعه وب شامل می‌شود؟", ar: "هل يشمل التطوير SEO؟" },
        answer: { en: "Every build includes technical SEO basics like metadata structure, semantic markup, speed, accessibility, and indexable pages. Deeper SEO strategy can be added as a dedicated plan.", fa: "هر پروژه شامل پایه‌های سئوی فنی مثل ساختار متادیتا، مارکاپ معنایی، سرعت، دسترس‌پذیری و صفحات قابل ایندکس است. استراتژی عمیق‌تر سئو به صورت پلن جدا اضافه می‌شود.", ar: "كل مشروع يتضمن أساسيات SEO التقنية مثل البيانات الوصفية والبنية الدلالية والسرعة وإمكانية الوصول وصفحات قابلة للفهرسة. ويمكن إضافة استراتيجية SEO أعمق كخطة منفصلة." },
      },
      {
        question: { en: "Do you support the project after launch?", fa: "بعد از لانچ پشتیبانی دارید؟", ar: "هل تقدمون دعما بعد الإطلاق؟" },
        answer: { en: "Yes. We can provide maintenance, monitoring, content updates, performance improvements, and feature iterations after launch.", fa: "بله. پس از لانچ می‌توانیم نگهداری، مانیتورینگ، به‌روزرسانی محتوا، بهبود عملکرد و توسعه قابلیت‌های جدید را انجام دهیم.", ar: "نعم. يمكننا تقديم صيانة ومراقبة وتحديثات محتوى وتحسينات أداء وتطوير ميزات بعد الإطلاق." },
      },
    ],
  },
  design: {
    eyebrow: { en: "Brand clarity and product polish", fa: "شفافیت برند و پرداخت محصول", ar: "وضوح العلامة وصقل المنتج" },
    description: {
      en: "We create identities, interfaces, graphics, and motion assets that make your digital presence memorable, usable, and consistent across every touchpoint.",
      fa: "هویت، رابط کاربری، گرافیک و موشن‌هایی می‌سازیم که حضور دیجیتال شما را ماندگار، قابل استفاده و یکپارچه می‌کند.",
      ar: "ننشئ هويات وواجهات ورسومات وموشن تجعل حضورك الرقمي مميزا وسهل الاستخدام ومتسقا.",
    },
    highlights: {
      en: ["UX research and wireframes", "UI design and design systems", "Brand identity and visual direction", "Graphics, social assets, and motion"],
      fa: ["تحقیق UX و وایرفریم", "طراحی UI و دیزاین سیستم", "هویت برند و مسیر بصری", "گرافیک، محتوای شبکه اجتماعی و موشن"],
      ar: ["بحث UX ووايرفريم", "تصميم UI وأنظمة تصميم", "هوية واتجاه بصري", "جرافيك وأصول اجتماعية وموشن"],
    },
    process: {
      en: ["Discover brand and audience", "Create moodboards and user flows", "Design high-fidelity screens and assets", "Prepare handoff-ready files"],
      fa: ["شناخت برند و مخاطب", "ساخت مودبرد و مسیر کاربر", "طراحی صفحات و دارایی‌های نهایی", "آماده‌سازی فایل‌های قابل تحویل"],
      ar: ["فهم العلامة والجمهور", "إنشاء لوحات مزاجية ومسارات مستخدم", "تصميم شاشات وأصول نهائية", "تجهيز ملفات التسليم"],
    },
    pricing: [
      {
        name: { en: "UI Starter", fa: "شروع UI", ar: "بداية UI" },
        price: { en: "From $900", fa: "شروع از 81M تومان", ar: "ابتداء من AED 3,300" },
        monthlyPrice: { en: "From $89", fa: "شروع از 8M تومان", ar: "ابتداء من AED 330" },
        description: { en: "For focused landing pages or small product flows.", fa: "برای لندینگ یا مسیرهای کوچک محصول.", ar: "لصفحات الهبوط أو مسارات منتج صغيرة." },
        features: { en: ["UX review", "Wireframe", "1 landing page design", "Developer handoff"], fa: ["بررسی UX", "وایرفریم", "طراحی ۱ لندینگ", "تحویل به توسعه‌دهنده"], ar: ["مراجعة UX", "وايرفريم", "تصميم صفحة هبوط", "تسليم للمطور"] },
      },
      {
        name: { en: "Brand + Website", fa: "برند + وب‌سایت", ar: "هوية + موقع" },
        price: { en: "From $2,400", fa: "شروع از 216M تومان", ar: "ابتداء من AED 8,800" },
        monthlyPrice: { en: "From $199", fa: "شروع از 18M تومان", ar: "ابتداء من AED 730" },
        description: { en: "For brands that need a complete visual foundation.", fa: "برای برندهایی که پایه بصری کامل می‌خواهند.", ar: "للعلامات التي تحتاج أساسا بصريا كاملا." },
        features: { en: ["Visual direction", "Core brand kit", "Up to 6 page designs", "Reusable components"], fa: ["مسیر بصری", "کیت پایه برند", "تا ۶ طراحی صفحه", "کامپوننت‌های قابل استفاده"], ar: ["اتجاه بصري", "عدة هوية أساسية", "حتى 6 صفحات", "مكونات قابلة لإعادة الاستخدام"] },
        featured: true,
      },
      {
        name: { en: "Design System", fa: "دیزاین سیستم", ar: "نظام تصميم" },
        price: { en: "Custom quote", fa: "برآورد اختصاصی", ar: "تسعير مخصص" },
        monthlyPrice: { en: "Custom", fa: "اختصاصی", ar: "مخصص" },
        description: { en: "For teams scaling consistent products.", fa: "برای تیم‌هایی که محصول یکپارچه را مقیاس می‌دهند.", ar: "للفرق التي توسع منتجات متسقة." },
        features: { en: ["Tokens and components", "Documentation", "Responsive states", "Team handoff"], fa: ["توکن و کامپوننت", "مستندسازی", "حالت‌های واکنش‌گرا", "تحویل به تیم"], ar: ["توكنات ومكونات", "توثيق", "حالات متجاوبة", "تسليم للفريق"] },
      },
    ],
    cta: {
      title: { en: "Need a stronger visual system?", fa: "به سیستم بصری قوی‌تر نیاز دارید؟", ar: "هل تحتاج نظاما بصريا أقوى؟" },
      body: { en: "We will shape a design direction that feels clear, modern, and useful.", fa: "یک مسیر طراحی شفاف، مدرن و کاربردی برای شما می‌سازیم.", ar: "سنصمم اتجاها واضحا وحديثا ومفيدا لعلامتك." },
    },
    faqs: [
      {
        question: { en: "Can you design only the UI without development?", fa: "آیا فقط طراحی UI بدون توسعه انجام می‌دهید؟", ar: "هل يمكن تصميم الواجهة فقط بدون تطوير؟" },
        answer: { en: "Yes. We can deliver Figma files, component specs, design tokens, and handoff notes for your internal or external development team.", fa: "بله. می‌توانیم فایل Figma، مشخصات کامپوننت‌ها، توکن‌های طراحی و نکات تحویل به تیم توسعه شما ارائه کنیم.", ar: "نعم. يمكننا تسليم ملفات Figma ومواصفات المكونات وتوكنات التصميم وملاحظات التسليم لفريق التطوير لديك." },
      },
      {
        question: { en: "Do you create brand identity too?", fa: "هویت برند هم طراحی می‌کنید؟", ar: "هل تصممون الهوية البصرية أيضا؟" },
        answer: { en: "Yes. We can create visual direction, logo refinement, color systems, typography, graphic assets, and brand usage rules.", fa: "بله. مسیر بصری، اصلاح لوگو، سیستم رنگ، تایپوگرافی، دارایی‌های گرافیکی و قوانین استفاده از برند را می‌توانیم طراحی کنیم.", ar: "نعم. نصمم الاتجاه البصري وتحسين الشعار ونظام الألوان والخطوط والأصول الرسومية وقواعد استخدام الهوية." },
      },
      {
        question: { en: "How many revisions are included?", fa: "چند مرحله اصلاح شامل می‌شود؟", ar: "كم جولة تعديلات تشمل الخطة؟" },
        answer: { en: "Each plan includes structured review rounds. The exact number depends on the plan, but we keep feedback cycles clear so the project stays fast and focused.", fa: "هر پلن شامل مراحل بازبینی مشخص است. تعداد دقیق به پلن بستگی دارد، اما چرخه بازخورد را شفاف نگه می‌داریم تا پروژه سریع و متمرکز بماند.", ar: "كل خطة تشمل جولات مراجعة منظمة. العدد الدقيق يعتمد على الخطة، لكننا نحافظ على دورة ملاحظات واضحة ليبقى المشروع سريعا ومركزا." },
      },
      {
        question: { en: "Can the design be expanded later?", fa: "آیا طراحی بعدا قابل گسترش است؟", ar: "هل يمكن توسيع التصميم لاحقا؟" },
        answer: { en: "Yes. We design with reusable components and scalable patterns so new pages, sections, or products can be added without starting over.", fa: "بله. با کامپوننت‌های قابل استفاده مجدد و الگوهای مقیاس‌پذیر طراحی می‌کنیم تا صفحات یا محصولات جدید بدون شروع دوباره اضافه شوند.", ar: "نعم. نصمم بمكونات قابلة لإعادة الاستخدام وأنماط قابلة للتوسع لإضافة صفحات أو منتجات لاحقا دون البدء من جديد." },
      },
    ],
  },
  "seo-aeo-geo": {
    eyebrow: { en: "Visibility for search and AI answers", fa: "دیده شدن در جستجو و پاسخ‌های هوش مصنوعی", ar: "ظهور في البحث وإجابات الذكاء الاصطناعي" },
    description: {
      en: "We improve technical foundations, content structure, schema, and topic authority so your brand can be found by people and answer engines.",
      fa: "پایه فنی، ساختار محتوا، اسکیما و اعتبار موضوعی را تقویت می‌کنیم تا برند شما در جستجو و پاسخ‌های هوش مصنوعی دیده شود.",
      ar: "نحسن الأساس التقني وبنية المحتوى والاسكيما والسلطة الموضوعية ليظهر اسمك في البحث ومحركات الإجابة.",
    },
    highlights: {
      en: ["Technical SEO audit", "Keyword and intent mapping", "Schema and metadata strategy", "Content briefs and reporting"],
      fa: ["ممیزی سئوی فنی", "نقشه کلمات کلیدی و نیت جستجو", "استراتژی اسکیما و متادیتا", "بریف محتوا و گزارش‌دهی"],
      ar: ["تدقيق SEO تقني", "خريطة كلمات ونوايا بحث", "استراتيجية اسكيما وبيانات وصفية", "ملخصات محتوى وتقارير"],
    },
    process: {
      en: ["Audit current visibility", "Map opportunities by business value", "Fix technical and content gaps", "Track ranking and conversion impact"],
      fa: ["ممیزی وضعیت دیده شدن", "اولویت‌بندی فرصت‌ها بر اساس ارزش تجاری", "رفع ضعف‌های فنی و محتوایی", "ردیابی رتبه و اثر تبدیل"],
      ar: ["تدقيق الظهور الحالي", "ترتيب الفرص حسب قيمة العمل", "سد الفجوات التقنية والمحتوى", "تتبع أثر الترتيب والتحويل"],
    },
    pricing: [
      {
        name: { en: "SEO Audit", fa: "ممیزی سئو", ar: "تدقيق SEO" },
        price: { en: "From $700", fa: "شروع از 63M تومان", ar: "ابتداء من AED 2,600" },
        monthlyPrice: { en: "From $79", fa: "شروع از 7M تومان", ar: "ابتداء من AED 290" },
        description: { en: "A clear roadmap for technical and content improvements.", fa: "نقشه راه روشن برای بهبود فنی و محتوایی.", ar: "خارطة طريق واضحة للتحسين التقني والمحتوى." },
        features: { en: ["Technical crawl", "Keyword snapshot", "Priority fixes", "Action report"], fa: ["خزش فنی", "نمای کلمات کلیدی", "اصلاحات اولویت‌دار", "گزارش اقدام"], ar: ["فحص تقني", "لقطة كلمات", "إصلاحات أولوية", "تقرير إجراءات"] },
      },
      {
        name: { en: "Growth SEO", fa: "سئوی رشد", ar: "SEO للنمو" },
        price: { en: "From $1,200/mo", fa: "شروع از 108M تومان ماهانه", ar: "ابتداء من AED 4,400 شهريا" },
        monthlyPrice: { en: "From $1,200", fa: "شروع از 108M تومان", ar: "ابتداء من AED 4,400" },
        description: { en: "Monthly optimization for brands ready to grow organic demand.", fa: "بهینه‌سازی ماهانه برای رشد تقاضای ارگانیک.", ar: "تحسين شهري لنمو الطلب العضوي." },
        features: { en: ["Technical fixes", "Content strategy", "Schema optimization", "Monthly reporting"], fa: ["اصلاحات فنی", "استراتژی محتوا", "بهینه‌سازی اسکیما", "گزارش ماهانه"], ar: ["إصلاحات تقنية", "استراتيجية محتوى", "تحسين اسكيما", "تقرير شهري"] },
        featured: true,
      },
      {
        name: { en: "Authority Program", fa: "برنامه اعتبار", ar: "برنامج السلطة" },
        price: { en: "Custom quote", fa: "برآورد اختصاصی", ar: "تسعير مخصص" },
        monthlyPrice: { en: "Custom", fa: "اختصاصی", ar: "مخصص" },
        description: { en: "For competitive topics and multi-market growth.", fa: "برای موضوعات رقابتی و رشد چندبازاره.", ar: "للمواضيع التنافسية والنمو متعدد الأسواق." },
        features: { en: ["Topic clusters", "AEO/GEO briefs", "Content calendar", "Executive dashboard"], fa: ["خوشه‌های موضوعی", "بریف AEO/GEO", "تقویم محتوا", "داشبورد مدیریتی"], ar: ["مجموعات موضوعية", "ملخصات AEO/GEO", "تقويم محتوى", "لوحة تنفيذية"] },
      },
    ],
    cta: {
      title: { en: "Want better qualified visibility?", fa: "دیده شدن باکیفیت‌تر می‌خواهید؟", ar: "هل تريد ظهورا مؤهلا أكثر؟" },
      body: { en: "We will show where your search demand is and how to capture it.", fa: "نشان می‌دهیم تقاضای جستجوی شما کجاست و چطور باید جذب شود.", ar: "سنوضح أين يوجد طلب البحث وكيف تلتقطه." },
    },
    faqs: [
      {
        question: { en: "What is the difference between SEO, AEO, and GEO?", fa: "تفاوت SEO، AEO و GEO چیست؟", ar: "ما الفرق بين SEO وAEO وGEO؟" },
        answer: { en: "SEO improves search engine visibility, AEO prepares content for answer engines and snippets, and GEO helps your brand appear in generative AI answers.", fa: "SEO دیده شدن در موتورهای جستجو را بهتر می‌کند، AEO محتوا را برای پاسخ‌های مستقیم و اسنیپت‌ها آماده می‌کند، و GEO به حضور برند در پاسخ‌های هوش مصنوعی مولد کمک می‌کند.", ar: "SEO يحسن الظهور في محركات البحث، وAEO يهيئ المحتوى لمحركات الإجابة والمقتطفات، وGEO يساعد العلامة على الظهور في إجابات الذكاء الاصطناعي التوليدي." },
      },
      {
        question: { en: "When will we see results?", fa: "چه زمانی نتیجه می‌گیریم؟", ar: "متى تظهر النتائج؟" },
        answer: { en: "Technical fixes can improve performance quickly, but organic growth usually needs 3-6 months of consistent optimization and content work.", fa: "اصلاحات فنی می‌تواند سریع اثر بگذارد، اما رشد ارگانیک معمولا به ۳ تا ۶ ماه بهینه‌سازی و تولید محتوای مداوم نیاز دارد.", ar: "الإصلاحات التقنية قد تظهر أثرا سريعا، لكن النمو العضوي عادة يحتاج 3-6 أشهر من تحسين ومحتوى مستمر." },
      },
      {
        question: { en: "Do you write the content too?", fa: "تولید محتوا هم انجام می‌دهید؟", ar: "هل تكتبون المحتوى أيضا؟" },
        answer: { en: "We can create content briefs, outlines, metadata, and optimized page copy. For larger content programs, we build a monthly editorial plan.", fa: "می‌توانیم بریف محتوا، ساختار مقاله، متادیتا و متن صفحات بهینه‌شده تولید کنیم. برای برنامه‌های بزرگ‌تر، تقویم محتوای ماهانه طراحی می‌کنیم.", ar: "يمكننا إعداد ملخصات محتوى ومخططات وبيانات وصفية ونصوص صفحات محسنة. وللبرامج الأكبر نبني خطة تحرير شهرية." },
      },
      {
        question: { en: "Will you track conversions, not just rankings?", fa: "آیا تبدیل‌ها را هم پیگیری می‌کنید نه فقط رتبه؟", ar: "هل تتابعون التحويلات وليس الترتيب فقط؟" },
        answer: { en: "Yes. We prefer tracking qualified leads, form submissions, calls, and revenue signals so SEO decisions stay tied to business impact.", fa: "بله. لیدهای باکیفیت، ارسال فرم، تماس و سیگنال‌های درآمدی را دنبال می‌کنیم تا تصمیم‌های سئو به اثر تجاری وصل بماند.", ar: "نعم. نفضل تتبع العملاء المؤهلين والنماذج والمكالمات وإشارات الإيراد حتى تبقى قرارات SEO مرتبطة بالأثر التجاري." },
      },
    ],
  },
  "ad-campaigns": {
    eyebrow: { en: "Campaigns that can be measured", fa: "کمپین‌هایی قابل اندازه‌گیری", ar: "حملات قابلة للقياس" },
    description: {
      en: "We plan and optimize paid campaigns across Google and Meta with clean tracking, strong creative direction, and practical reporting.",
      fa: "کمپین‌های پولی گوگل و متا را با ردیابی دقیق، جهت‌دهی خلاقه و گزارش‌دهی کاربردی برنامه‌ریزی و بهینه‌سازی می‌کنیم.",
      ar: "نخطط ونحسن الحملات المدفوعة على Google وMeta بتتبع دقيق واتجاه إبداعي وتقارير عملية.",
    },
    highlights: {
      en: ["Audience and offer strategy", "Google and Meta campaign setup", "Creative direction and ad copy", "Conversion tracking and optimization"],
      fa: ["استراتژی مخاطب و پیشنهاد", "راه‌اندازی کمپین گوگل و متا", "جهت‌دهی خلاقه و متن تبلیغ", "ردیابی تبدیل و بهینه‌سازی"],
      ar: ["استراتيجية الجمهور والعرض", "إعداد حملات Google وMeta", "توجيه إبداعي ونصوص إعلانية", "تتبع التحويل والتحسين"],
    },
    process: {
      en: ["Define audience, offer, and funnel", "Set up campaigns and tracking", "Launch controlled tests", "Optimize budget and creatives weekly"],
      fa: ["تعریف مخاطب، پیشنهاد و قیف", "راه‌اندازی کمپین و ردیابی", "اجرای تست‌های کنترل‌شده", "بهینه‌سازی هفتگی بودجه و خلاقه"],
      ar: ["تحديد الجمهور والعرض والقمع", "إعداد الحملات والتتبع", "إطلاق اختبارات منظمة", "تحسين الميزانية والإبداع أسبوعيا"],
    },
    pricing: [
      {
        name: { en: "Campaign Setup", fa: "راه‌اندازی کمپین", ar: "إعداد حملة" },
        price: { en: "From $600", fa: "شروع از 54M تومان", ar: "ابتداء من AED 2,200" },
        monthlyPrice: { en: "From $69", fa: "شروع از 6.2M تومان", ar: "ابتداء من AED 250" },
        description: { en: "For new campaigns that need a clean launch.", fa: "برای کمپین‌های جدید که لانچ تمیز می‌خواهند.", ar: "للحملات الجديدة التي تحتاج إطلاقا منظما." },
        features: { en: ["Account structure", "Tracking checklist", "Initial ads", "Launch support"], fa: ["ساختار اکانت", "چک‌لیست ردیابی", "تبلیغات اولیه", "پشتیبانی لانچ"], ar: ["هيكل الحساب", "قائمة تتبع", "إعلانات أولية", "دعم إطلاق"] },
      },
      {
        name: { en: "Monthly Management", fa: "مدیریت ماهانه", ar: "إدارة شهرية" },
        price: { en: "From $900/mo", fa: "شروع از 81M تومان ماهانه", ar: "ابتداء من AED 3,300 شهريا" },
        monthlyPrice: { en: "From $900", fa: "شروع از 81M تومان", ar: "ابتداء من AED 3,300" },
        description: { en: "For ongoing campaigns with weekly optimization.", fa: "برای کمپین‌های فعال با بهینه‌سازی هفتگی.", ar: "للحملات المستمرة مع تحسين أسبوعي." },
        features: { en: ["Weekly optimization", "Ad copy testing", "Budget pacing", "Performance report"], fa: ["بهینه‌سازی هفتگی", "تست متن تبلیغ", "کنترل بودجه", "گزارش عملکرد"], ar: ["تحسين أسبوعي", "اختبار نصوص", "ضبط الميزانية", "تقرير أداء"] },
        featured: true,
      },
      {
        name: { en: "Scale Program", fa: "برنامه مقیاس", ar: "برنامج التوسع" },
        price: { en: "Custom quote", fa: "برآورد اختصاصی", ar: "تسعير مخصص" },
        monthlyPrice: { en: "Custom", fa: "اختصاصی", ar: "مخصص" },
        description: { en: "For brands scaling multi-channel acquisition.", fa: "برای برندهایی که جذب چندکاناله را مقیاس می‌دهند.", ar: "للعلامات التي توسع الاكتساب متعدد القنوات." },
        features: { en: ["Funnel strategy", "Creative roadmap", "Advanced tracking", "Executive dashboard"], fa: ["استراتژی قیف", "نقشه راه خلاقه", "ردیابی پیشرفته", "داشبورد مدیریتی"], ar: ["استراتيجية قمع", "خارطة إبداعية", "تتبع متقدم", "لوحة تنفيذية"] },
      },
    ],
    cta: {
      title: { en: "Ready to make paid growth measurable?", fa: "آماده رشد پولی قابل اندازه‌گیری هستید؟", ar: "هل أنت جاهز لنمو مدفوع قابل للقياس؟" },
      body: { en: "We will connect campaign strategy, creative, tracking, and reporting.", fa: "استراتژی، خلاقه، ردیابی و گزارش‌دهی کمپین را یکپارچه می‌کنیم.", ar: "سنربط الاستراتيجية والإبداع والتتبع والتقارير." },
    },
    faqs: [
      {
        question: { en: "Which ad platforms do you manage?", fa: "کدام پلتفرم‌های تبلیغاتی را مدیریت می‌کنید؟", ar: "ما المنصات الإعلانية التي تديرونها؟" },
        answer: { en: "We primarily manage Google Ads and Meta campaigns, including search, display, remarketing, Facebook, and Instagram placements.", fa: "عمدتا کمپین‌های Google Ads و Meta را مدیریت می‌کنیم، شامل سرچ، دیسپلی، ریمارکتینگ، فیسبوک و اینستاگرام.", ar: "ندير أساسا حملات Google Ads وMeta، بما يشمل البحث والعرض وإعادة الاستهداف وفيسبوك وإنستغرام." },
      },
      {
        question: { en: "Do your prices include ad spend?", fa: "آیا قیمت‌ها شامل بودجه تبلیغاتی است؟", ar: "هل تشمل الأسعار ميزانية الإعلان؟" },
        answer: { en: "No. Our pricing covers strategy, setup, management, optimization, and reporting. Media spend is paid directly to the ad platforms by you.", fa: "خیر. قیمت ما شامل استراتژی، راه‌اندازی، مدیریت، بهینه‌سازی و گزارش‌دهی است. بودجه رسانه مستقیما توسط شما به پلتفرم‌ها پرداخت می‌شود.", ar: "لا. أسعارنا تشمل الاستراتيجية والإعداد والإدارة والتحسين والتقارير. ميزانية الإعلان تدفع مباشرة للمنصات من طرفك." },
      },
      {
        question: { en: "Can you set up conversion tracking?", fa: "می‌توانید ردیابی تبدیل را راه‌اندازی کنید؟", ar: "هل يمكن إعداد تتبع التحويل؟" },
        answer: { en: "Yes. We can set up forms, calls, button clicks, ecommerce events, pixels, tags, and analytics dashboards where platform access allows it.", fa: "بله. در صورت دسترسی لازم، فرم‌ها، تماس‌ها، کلیک دکمه‌ها، رویدادهای فروشگاهی، پیکسل‌ها، تگ‌ها و داشبورد آنالیتیکس را راه‌اندازی می‌کنیم.", ar: "نعم. يمكننا إعداد النماذج والمكالمات ونقرات الأزرار وأحداث التجارة والبكسلات والتاغات ولوحات التحليلات عند توفر الصلاحيات." },
      },
      {
        question: { en: "How often do you optimize campaigns?", fa: "چند وقت یک‌بار کمپین‌ها را بهینه می‌کنید؟", ar: "كم مرة يتم تحسين الحملات؟" },
        answer: { en: "For managed plans, we review performance weekly and adjust budgets, audiences, keywords, ads, and landing-page recommendations based on data.", fa: "در پلن‌های مدیریتی، عملکرد را هفتگی بررسی می‌کنیم و بودجه، مخاطب، کلمات، تبلیغات و پیشنهادهای لندینگ را بر اساس داده تنظیم می‌کنیم.", ar: "في خطط الإدارة نراجع الأداء أسبوعيا ونعدل الميزانية والجمهور والكلمات والإعلانات وتوصيات صفحات الهبوط حسب البيانات." },
      },
    ],
  },
}

export async function generateStaticParams() {
  return ["en", "fa", "ar"].flatMap((loc) => services.map((s) => ({ locale: loc, slug: s.slug })))
}

export default async function ServiceDetail({ params }: Params) {
  const svc = services.find((s) => s.slug === params.slug)
  const detail = svc ? details[svc.slug] : undefined
  if (!svc) return notFound()
  if (!detail) return notFound()
  const locale = params.locale
  const rtl = isRTL(locale)
  const t = labels[locale]
  const dict = await getDictionary(locale)

  return (
    <main className="container mx-auto px-4 py-16 md:py-24" dir={rtl ? "rtl" : "ltr"}>
      <RevealOnScroll>
        <section className="relative overflow-hidden rounded-3xl border bg-card/60 p-6 shadow-sm backdrop-blur md:p-10">
          <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Link href={`/${locale}/services`} className="mb-6 inline-flex text-sm text-muted-foreground hover:text-foreground">
                {t.back}
              </Link>
              <p className="mb-3 text-sm font-medium text-primary">{detail.eyebrow[locale]}</p>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{svc.title[locale]}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">{detail.description[locale]}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={`/${locale}/contact`}>
                    {t.contact}
                    <ArrowRight className={`h-4 w-4 ${rtl ? "rotate-180" : ""}`} />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="#pricing">{t.pricing}</a>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border bg-background/80 p-6">
                <img src={svc.image || "/placeholder.svg"} alt={svc.title[locale]} className="mx-auto h-40 w-40 object-contain" />
                <div className="mt-6 rounded-2xl border bg-card/70 p-4">
                  <p className="text-sm font-semibold">{t.overview}</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{svc.body[locale]}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <RevealOnScroll>
          <div className="h-full rounded-2xl border bg-card/60 p-6 shadow-sm backdrop-blur">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background text-primary">
                <Layers3 className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-semibold">{t.deliverables}</h2>
            </div>
            <ul className="grid gap-3 text-sm text-muted-foreground">
              {detail.highlights[locale].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="h-full rounded-2xl border bg-card/60 p-6 shadow-sm backdrop-blur">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background text-primary">
                <Target className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-semibold">{t.process}</h2>
            </div>
            <ol className="grid gap-3 text-sm text-muted-foreground">
              {detail.process[locale].map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </RevealOnScroll>
      </section>

      <section id="pricing" className="mt-10">
        <RevealOnScroll>
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background text-primary">
              <Sparkles className="h-5 w-5" />
            </span>
            <h2 className="text-2xl font-semibold">{t.pricing}</h2>
          </div>
        </RevealOnScroll>
        <RevealOnScroll staggerChildren>
          <div className="grid gap-6 lg:grid-cols-3">
            {detail.pricing.map((plan, index) => (
              <div
                key={plan.name[locale]}
                className={`group relative flex min-h-[520px] flex-col overflow-hidden rounded-[1.75rem] border p-7 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${
                  plan.featured
                    ? "border-primary/40 bg-[radial-gradient(circle_at_20%_0%,hsl(var(--primary)/0.30),transparent_35%),linear-gradient(145deg,hsl(var(--primary)/0.22),hsl(var(--background))_46%,hsl(var(--background)))] shadow-primary/20"
                    : "border-white/10 bg-[linear-gradient(145deg,hsl(var(--card)),hsl(var(--background)))] shadow-black/20"
                }`}
                data-animate
              >
                <div
                  aria-hidden
                  className={`absolute inset-0 opacity-70 ${
                    index === 0
                      ? "bg-[radial-gradient(circle_at_15%_5%,hsl(var(--primary)/0.26),transparent_38%)]"
                      : index === 1
                        ? "bg-[radial-gradient(circle_at_80%_0%,hsl(var(--primary)/0.32),transparent_40%)]"
                        : "bg-[radial-gradient(circle_at_100%_0%,hsl(var(--primary)/0.18),transparent_36%)]"
                  }`}
                />
                {plan.featured ? (
                  <span className={`absolute top-5 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/30 ${rtl ? "left-5" : "right-5"}`}>
                    {t.popular}
                  </span>
                ) : null}
                <div className="relative z-10 flex h-full flex-col">
                  <h3 className="max-w-[80%] text-3xl font-semibold tracking-tight">{plan.name[locale]}</h3>
                  <p className="mt-4 min-h-14 text-sm leading-6 text-muted-foreground">{plan.description[locale]}</p>

                  <div className="mt-7">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t.oneTime}</p>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">{plan.price[locale]}</p>
                  </div>

                  <div className="my-6 flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="h-px flex-1 bg-border/70" />
                    <span>{t.rentDivider}</span>
                    <span className="h-px flex-1 bg-border/70" />
                  </div>

                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t.monthly}</p>
                    <p className="mt-2 text-2xl font-bold text-primary">
                      {plan.monthlyPrice[locale]}
                      <span className="text-sm font-normal text-muted-foreground"> / {t.monthly}</span>
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">{t.monthlyNote}</p>
                  </div>

                  <ul className="mb-5 mt-5 grid gap-2 text-sm text-muted-foreground">
                    {plan.features[locale].map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <PlanContactDialog
                    id={`plan-contact-${index}`}
                    triggerLabel={t.viewDetails}
                    featured={plan.featured}
                    rtl={rtl}
                    contact={dict.contact}
                  />
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      <section className="mt-10">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-3xl border bg-card/60 p-6 shadow-sm backdrop-blur md:p-8">
            <div aria-hidden className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <HelpCircle className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight md:text-3xl">{t.faq}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{t.faqSubtitle}</p>
              </div>

              <div className="grid gap-3 lg:col-span-8">
                {detail.faqs.map((faq, index) => (
                  <details
                    key={faq.question[locale]}
                    className="group rounded-2xl border border-border/70 bg-background/70 p-4 transition-colors open:border-primary/35 open:bg-background/90"
                    open={index === 0}
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                      <span>{faq.question[locale]}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-card text-primary transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{faq.answer[locale]}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <RevealOnScroll className="mt-10">
        <section className="relative overflow-hidden rounded-3xl border bg-primary p-6 text-primary-foreground shadow-lg md:p-8">
          <div aria-hidden className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{detail.cta.title[locale]}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-primary-foreground/80">{detail.cta.body[locale]}</p>
            </div>
            <Button asChild variant="secondary" className="shrink-0">
              <Link href={`/${locale}/contact`}>{t.contact}</Link>
            </Button>
          </div>
        </section>
      </RevealOnScroll>
    </main>
  )
}
