import type { Locale } from "./i18n"

export type Service = {
  slug: string
  title: Record<Locale, string>
  excerpt: Record<Locale, string>
  body: Record<Locale, string>
  image: string
}

export type Post = {
  slug: string
  title: Record<Locale, string>
  excerpt: Record<Locale, string>
  body: Record<Locale, string>
  image: string
  date: string
}

export const services: Service[] = [
  {
    slug: "web-development",
    title: {
      en: "Web Development",
      fa: "توسعه وب",
      ar: "تطوير الويب",
    },
    excerpt: {
      en: "Modern websites, apps, and web apps built with reliable, scalable technology.",
      fa: "طراحی و توسعه وب‌سایت، اپلیکیشن و وب‌اپ با تکنولوژی‌های قابل اعتماد و مقیاس‌پذیر.",
      ar: "مواقع وتطبيقات وWeb Apps حديثة بتقنيات موثوقة وقابلة للتوسع.",
    },
    body: {
      en: "We design and build fast, maintainable digital products, from brand websites to custom dashboards and web applications. Every project is structured around performance, accessibility, security, and a clean user experience.",
      fa: "ما محصولات دیجیتال سریع و قابل نگهداری می‌سازیم؛ از وب‌سایت برند تا داشبورد اختصاصی و وب‌اپلیکیشن. هر پروژه با تمرکز بر عملکرد، دسترس‌پذیری، امنیت و تجربه کاربری تمیز اجرا می‌شود.",
      ar: "نصمم ونطور منتجات رقمية سريعة وقابلة للصيانة، من مواقع العلامات إلى لوحات التحكم والتطبيقات المخصصة. يركز كل مشروع على الأداء وإمكانية الوصول والأمان وتجربة استخدام واضحة.",
    },
    image: "/services/code.png",
  },
  {
    slug: "design",
    title: {
      en: "Design",
      fa: "طراحی",
      ar: "التصميم",
    },
    excerpt: {
      en: "UI/UX, graphic design, brand identity, and motion design for stronger digital presence.",
      fa: "طراحی UI/UX، گرافیک، هویت بصری و موشن برای حضور دیجیتال قوی‌تر.",
      ar: "تصميم UI/UX وجرافيك وهوية بصرية وموشن لحضور رقمي أقوى.",
    },
    body: {
      en: "We shape the visual and interaction layer of your product, from research and wireframes to polished interfaces, brand systems, graphics, and motion assets that keep your message consistent.",
      fa: "لایه بصری و تعاملی محصول شما را از تحقیق و وایرفریم تا رابط کاربری نهایی، سیستم برند، گرافیک و موشن طراحی می‌کنیم تا پیام برند یکپارچه بماند.",
      ar: "نصمم الطبقة البصرية والتفاعلية لمنتجك، من البحث والوايرفريم حتى الواجهات النهائية وأنظمة الهوية والجرافيك والموشن للحفاظ على رسالة متسقة.",
    },
    image: "/services/Design.png",
  },
  {
    slug: "seo-aeo-geo",
    title: {
      en: "SEO, AEO and GEO",
      fa: "خدمات SEO، AEO و GEO",
      ar: "خدمات SEO وAEO وGEO",
    },
    excerpt: {
      en: "Search and answer-engine optimization based on brand-fit keywords and content strategy.",
      fa: "بهینه‌سازی برای موتورهای جستجو و پاسخ بر اساس کلمات کلیدی متناسب با برند و استراتژی محتوا.",
      ar: "تحسين لمحركات البحث ومحركات الإجابة اعتمادا على كلمات مناسبة للعلامة واستراتيجية محتوى.",
    },
    body: {
      en: "We improve technical SEO, content structure, metadata, schema, and discoverability for both search engines and AI answer experiences. The goal is qualified visibility, not just traffic.",
      fa: "سئوی فنی، ساختار محتوا، متادیتا، اسکیما و قابلیت دیده شدن در موتورهای جستجو و تجربه‌های پاسخ هوش مصنوعی را بهبود می‌دهیم. هدف، دیده شدن باکیفیت است نه صرفا ترافیک.",
      ar: "نحسن SEO التقني وبنية المحتوى والبيانات الوصفية والاسكيما وقابلية الظهور في محركات البحث وتجارب الإجابة بالذكاء الاصطناعي. الهدف هو ظهور مؤهل، وليس مجرد زيارات.",
    },
    image: "/services/SEO.png",
  },
  {
    slug: "ad-campaigns",
    title: {
      en: "Ad Campaigns",
      fa: "کمپین تبلیغاتی",
      ar: "حملات إعلانية",
    },
    excerpt: {
      en: "Targeted Google and Meta campaigns designed around measurable business outcomes.",
      fa: "کمپین‌های هدفمند در گوگل و متا با تمرکز بر نتایج قابل اندازه‌گیری کسب‌وکار.",
      ar: "حملات مستهدفة على Google وMeta مبنية حول نتائج أعمال قابلة للقياس.",
    },
    body: {
      en: "We plan, launch, and optimize campaigns across Google, Facebook, and Instagram, from audience research and creative direction to conversion tracking and reporting.",
      fa: "کمپین‌ها را در گوگل، فیسبوک و اینستاگرام برنامه‌ریزی، اجرا و بهینه‌سازی می‌کنیم؛ از تحقیق مخاطب و جهت‌دهی خلاقه تا ردیابی تبدیل و گزارش‌دهی.",
      ar: "نخطط ونطلق ونحسن الحملات عبر Google وفيسبوك وإنستغرام، من بحث الجمهور والتوجيه الإبداعي إلى تتبع التحويلات والتقارير.",
    },
    image: "/services/ADs.png",
  },
]

export const posts: Post[] = [
  {
    slug: "designing-for-rtl",
    title: {
      en: "Designing for RTL: Practical Tips",
      fa: "طراحی برای RTL: نکات کاربردی",
      ar: "التصميم لـ RTL: نصائح عملية",
    },
    excerpt: {
      en: "Improve usability and polish for right-to-left languages.",
      fa: "بهبود کاربری و ظرافت برای زبان‌های راست‌به‌چپ.",
      ar: "تحسين سهولة الاستخدام والدقة للغات RTL.",
    },
    body: {
      en: "Supporting RTL involves more than flipping layouts Supporting RTL involves more than flipping layouts Supporting RTL involves more than flipping layouts ...",
      fa: "پشتیبانی از RTL فقط وارونه‌کردن چیدمان نیست...",
      ar: "دعم RTL يتجاوز قلب التخطيط...",
    },
    image: "/rtl-design-article-cover.png",
    date: "2025-06-01",
  },
  {
    slug: "nextjs-performance",
    title: { en: "Next.js Performance Essentials", fa: "اصول عملکرد در Next.js", ar: "أساسيات الأداء في Next.js" },
    excerpt: {
      en: "Ship fast sites with modern Next.js features.",
      fa: "سایت‌های سریع با قابلیت‌های مدرن Next.js بسازید.",
      ar: "بناء مواقع سريعة بميزات Next.js الحديثة.",
    },
    body: {
      en: "Leverage server components, streaming, and caching...",
      fa: "از کامپوننت‌های سروری، استریم و کش استفاده کنید...",
      ar: "استفد من المكونات الخادمية والبث والتخزين المؤقت...",
    },
    image: "/nextjs-performance-guide-cover.png",
    date: "2025-05-10",
  },
  // Added posts to match footer examples
  {
    slug: "wp-vs-coded-site",
    title: {
      en: "WordPress vs. Coded Website",
      fa: "تفاوت سایت وردپرسی با سایت کدنویسی‌شده",
      ar: "الفرق بين موقع ووردبريس والموقع المبرمج",
    },
    excerpt: {
      en: "Which is right for your brand?",
      fa: "کدام برای برند شما مناسب‌تر است؟",
      ar: "أيّهما الأنسب لعلامتك؟",
    },
    body: {
      en: "We compare pros and cons across cost, speed, and control.",
      fa: "مزایا و معایب از نظر هزینه، سرعت و کنترل را بررسی می‌کنیم.",
      ar: "نُقارن المزايا والعيوب من حيث التكلفة والسرعة والتحكم.",
    },
    image: "/wordpress-vs-coded-site.png",
    date: "2025-04-18",
  },
  {
    slug: "website-vs-webapp",
    title: { en: "Website vs Web App", fa: "تفاوت وب‌سایت و وب‌اپ", ar: "الفرق بين الموقع وتطبيق الويب" },
    excerpt: {
      en: "Understand the use‑cases and tradeoffs.",
      fa: "کاربردها و تفاوت‌ها را بشناسید.",
      ar: "افهم الحالات والفروقات.",
    },
    body: {
      en: "Use a website for content, a web app for interactions and data.",
      fa: "وب‌سایت برای محتوا؛ وب‌اپ برای تعامل و داده.",
      ar: "الموقع للمحتوى؛ وتطبيق الويب للتفاعل والبيانات.",
    },
    image: "/placeholder-trqz9.png",
    date: "2025-04-05",
  },
  {
    slug: "what-is-telegram-proxy",
    title: { en: "What is Telegram Proxy?", fa: "پروکسی تلگرام چیست؟", ar: "ما هو بروكسي تيليجرام؟" },
    excerpt: { en: "A quick explainer.", fa: "توضیح کوتاه.", ar: "شرح سريع." },
    body: {
      en: "Proxies route traffic via intermediary servers.",
      fa: "پروکسی‌ها ترافیک را از طریق سرورهای واسط هدایت می‌کنند.",
      ar: "البروكسي يمرر الحركة عبر خوادم وسيطة.",
    },
    image: "/telegram-proxy-explained.png",
    date: "2025-03-22",
  },
  {
    slug: "tailwind-new-update",
    title: { en: "Tailwind’s New Update", fa: "آپدیت جدید tailwind", ar: "تحديث تايلويند الجديد" },
    excerpt: {
      en: "What’s new and how to adopt it.",
      fa: "چه خبر و چگونه از آن استفاده کنیم.",
      ar: "ما الجديد وكيف نعتمده.",
    },
    body: {
      en: "Highlights of the release and migration tips.",
      fa: "نکات برجسته انتشار و راهنمای مهاجرت.",
      ar: "أهم ما جاء في الإصدار ونصائح الانتقال.",
    },
    image: "/placeholder.svg?height=360&width=640",
    date: "2025-03-10",
  },
]
