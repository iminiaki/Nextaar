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
    slug: "brand-websites",
    title: { en: "Brand Websites", fa: "وب‌سایت‌های برند", ar: "مواقع العلامات التجارية" },
    excerpt: {
      en: "Pixel-perfect marketing sites optimized for conversions.",
      fa: "سایت‌های مارکتینگ پیکسل‌پرفکت با تمرکز بر تبدیل.",
      ar: "مواقع تسويقية مُحكمة التصميم ومحسّنة للتحويل.",
    },
    body: {
      en: "We design and build fast brand websites with robust SEO and delightful micro‑interactions.",
      fa: "ما وب‌سایت‌های برند سریع با سئوی قوی و ریزتعامل‌های جذاب طراحی و پیاده‌سازی می‌کنیم.",
      ar: "نُصمّم ونُطوّر مواقع علامات سريعة مع SEO قوي وتفاعلات دقيقة ممتعة.",
    },
    image: "/brand-website-preview-purple.png",
  },
  {
    slug: "web-apps",
    title: { en: "Web Applications", fa: "اپلیکیشن‌های وب", ar: "تطبيقات الويب" },
    excerpt: {
      en: "Accessible, robust apps with modern stacks.",
      fa: "اپلیکیشن‌های دسترس‌پذیر و قدرتمند با پشته‌های مدرن.",
      ar: "تطبيقات متاحة وقوية باستخدام تقنيات حديثة.",
    },
    body: {
      en: "From dashboards to complex workflows, we ship scalable apps with excellent UX.",
      fa: "از داشبورد تا فرایندهای پیچیده؛ اپلیکیشن‌هایی مقیاس‌پذیر با تجربه کاربری عالی ارائه می‌دهیم.",
      ar: "من لوحات التحكم إلى التدفقات المعقدة — نبني تطبيقات قابلة للتوسع بتجربة مستخدم ممتازة.",
    },
    image: "/purple-web-app-dashboard.png",
  },
  {
    slug: "design-systems",
    title: { en: "Design Systems", fa: "سیستم‌های طراحی", ar: "أنظمة التصميم" },
    excerpt: {
      en: "Token-based systems and component libraries.",
      fa: "سیستم‌های مبتنی بر توکن و کتابخانه‌های کامپوننت.",
      ar: "أنظمة تعتمد على التوكنات ومكتبات المكوّنات.",
    },
    body: {
      en: "We craft scalable design systems that power consistent interfaces across products.",
      fa: "سیستم‌های طراحی مقیاس‌پذیر برای رابط‌های یکپارچه در سراسر محصولات می‌سازیم.",
      ar: "نُنشئ أنظمة تصميم قابلة للتوسع لواجهات متسقة عبر المنتجات.",
    },
    image: "/design-system-tokens-library.png",
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
      en: "Supporting RTL involves more than flipping layouts...",
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
