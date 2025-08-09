import type { Locale } from "./i18n"

export type PortfolioItem = {
  slug: string
  title: Record<Locale, string>
  excerpt: Record<Locale, string>
  body: Record<Locale, string>
  image: string
}

export const portfolio: PortfolioItem[] = [
  {
    slug: "fintech-dashboard",
    title: { en: "Fintech Dashboard", fa: "داشبورد فین‌تک", ar: "لوحة تحكم فِن تِك" },
    excerpt: {
      en: "Real-time analytics with sleek UI.",
      fa: "آنالیتیکس لحظه‌ای با رابط کاربری شکیل.",
      ar: "تحليلات فورية مع واجهة أنيقة.",
    },
    body: {
      en: "We built a performant dashboard with crisp charts and role-based access.",
      fa: "داشبوردی پرکارایی با نمودارهای دقیق و دسترسی مبتنی بر نقش ساختیم.",
      ar: "أنشأنا لوحة أداء مع مخططات دقيقة وصلاحيات مبنية على الأدوار.",
    },
    image: "/fintech-dashboard-ui.png",
  },
  {
    slug: "ecommerce-experience",
    title: { en: "E‑commerce Experience", fa: "تجربه فروشگاهی", ar: "تجربة تجارة إلكترونية" },
    excerpt: {
      en: "Conversion‑focused storefront with fast checkout.",
      fa: "فروشگاهی با تمرکز بر تبدیل و پرداخت سریع.",
      ar: "متجر يركز على التحويل بخطوات دفع سريعة.",
    },
    body: {
      en: "Optimized product discovery, cart UX, and SEO.",
      fa: "بهینه‌سازی کشف محصول، تجربه سبد خرید و سئو.",
      ar: "تحسين اكتشاف المنتجات وتجربة السلة وSEO.",
    },
    image: "/ecommerce-ui.png",
  },
  {
    slug: "saas-marketing-site",
    title: { en: "SaaS Marketing Site", fa: "وب‌سایت مارکتینگ SaaS", ar: "موقع تسويق SaaS" },
    excerpt: {
      en: "Brand system and high‑performance landing pages.",
      fa: "سیستم برند و لندینگ‌های پرسرعت.",
      ar: "نظام هوية وصفحات هبوط عالية الأداء.",
    },
    body: {
      en: "Modular sections, robust analytics, and A/B testing.",
      fa: "بخش‌های ماژولار، آنالیتیکس قوی و تست A/B.",
      ar: "أقسام معيارية وتحليلات قوية واختبارات A/B.",
    },
    image: "/saas-marketing-site.png",
  },
]
