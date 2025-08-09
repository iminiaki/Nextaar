export const locales = ["en", "fa", "ar"] as const
export type Locale = (typeof locales)[number]

export function isLocale(input: string): input is Locale {
  return (locales as readonly string[]).includes(input)
}

export const rtlLocales = new Set<Locale>(["fa", "ar"])
export function isRTL(locale: Locale) {
  return rtlLocales.has(locale)
}

type Dict = {
  brand: { name: string }
  nav: {
    home: string
    about: string
    services: string
    portfolio: string
    blog: string
    contact: string
    enLangName: string
    faLangName: string
    arLangName: string
  }
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
  }
  home: {
    servicesFeatures: {
      title: string
      subtitle: string
      items: { title: string; desc: string; cta: string; href: string }[]
    }
    cta: { title: string; subtitle: string; button: { label: string } }
    portfolio: { title: string; subtitle: string; viewAll: string }
    why: { title: string; bullets: string[] }
    aboutTeaser: { title: string; body: string; button: string }
    latestPosts: { title: string; subtitle: string }
    partners: { title: string }
  }
  pages: {
    about: { title: string; subtitle: string; body: string }
    services: { title: string; subtitle: string }
    blog: { title: string; subtitle: string; readMore: string }
  }
  contact: {
    title: string
    subtitle: string
    emailLabel: string
    messageLabel: string
    send: string
    success: string
  }
  footer: {
    rights: string
    office: { title: string; address: string[]; email: string; phone: string; mobile: string }
    quickLinks: { title: string; links: { label: string; href: string }[] }
    latest: { title: string }
    newsletter: { title: string; placeholder: string; button: string; success: string }
  }
}

const dictionaries: Record<Locale, Dict> = {
  en: {
    brand: { name: "Lastaar" },
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      portfolio: "Portfolio",
      blog: "Blog",
      contact: "Contact",
      enLangName: "English",
      faLangName: "Persian",
      arLangName: "Arabic",
    },
    hero: {
      eyebrow: "Web Design • Development",
      title: "Lastaar crafts fast, beautiful websites",
      subtitle:
        "A trilingual site built with Next.js, Tailwind, and shadcn/ui. Clean, accessible, and RTL‑ready — with light and dark modes.",
      ctaPrimary: "Start a Project",
      ctaSecondary: "View Services",
    },
    home: {
      servicesFeatures: {
        title: "Services",
        subtitle: "Design, engineering, SEO, and campaigns — built for results.",
        items: [
          {
            title: "Design & Development (Websites, Apps, Web Apps)",
            desc: "Modern websites and apps using the latest tech.",
            cta: "Learn more",
            href: "/en/services",
          },
          {
            title: "Design (UI/UX, Graphic, Brand Identity, Motion)",
            desc: "A thoughtful, research‑driven foundation for your brand presence.",
            cta: "Learn more",
            href: "/en/services",
          },
          {
            title: "SEO Services",
            desc: "Strategic optimization based on brand‑fit keywords.",
            cta: "Learn more",
            href: "/en/services",
          },
          {
            title: "Ad Campaigns (Google & Meta)",
            desc: "Targeted campaigns across Google, Facebook, and Instagram.",
            cta: "Learn more",
            href: "/en/services",
          },
        ],
      },
      cta: {
        title: "Ready to build with Lastaar?",
        subtitle: "Tell us about your goals.",
        button: { label: "Contact us" },
      },
      portfolio: { title: "Portfolio", subtitle: "Selected client work and case studies.", viewAll: "View all" },
      why: {
        title: "Why choose Lastaar",
        bullets: [
          "Design‑driven engineering",
          "Performance and accessibility first",
          "Clean TypeScript codebase",
          "Scalable design systems",
        ],
      },
      aboutTeaser: {
        title: "About Lastaar",
        body: "We’re a design and engineering studio delivering world‑class web experiences.",
        button: "More about us",
      },
      latestPosts: { title: "Latest posts", subtitle: "Thoughts on design, code, and product." },
      partners: { title: "Trusted by forward‑thinking brands" },
    },
    pages: {
      about: {
        title: "About Lastaar",
        subtitle: "Design‑driven engineering for modern brands.",
        body: "We focus on speed, accessibility, and delightful experiences.",
      },
      services: {
        title: "Services",
        subtitle: "Strategy, design, and development under one roof.",
      },
      blog: {
        title: "Blog",
        subtitle: "Insights from our craft.",
        readMore: "Read more",
      },
    },
    contact: {
      title: "Contact",
      subtitle: "We’ll get back within 1–2 business days.",
      emailLabel: "Email",
      messageLabel: "Message",
      send: "Send",
      success: "Thanks! We received your message.",
    },
    footer: {
      rights: "All rights reserved.",
      office: {
        title: "Lastaar HQ",
        address: ["Tehran, Heravi, Mousavi, No. 50"],
        email: "info@lastaar.com",
        phone: "021-22954114",
        mobile: "0919-9274196",
      },
      quickLinks: {
        title: "Quick links",
        links: [
          { label: "Website design", href: "/en/services" },
          { label: "SEO services", href: "/en/services" },
          { label: "Google Ads", href: "/en/services" },
          { label: "Portfolio", href: "/en/portfolio" },
          { label: "Latest posts", href: "/en/blog" },
        ],
      },
      latest: { title: "Latest posts" },
      newsletter: {
        title: "Subscribe",
        placeholder: "Your email",
        button: "Subscribe",
        success: "You’re subscribed!",
      },
    },
  },
  fa: {
    brand: { name: "لستار" },
    nav: {
      home: "خانه",
      about: "درباره",
      services: "خدمات",
      portfolio: "نمونه کارها",
      blog: "بلاگ",
      contact: "تماس",
      enLangName: "انگلیسی",
      faLangName: "فارسی",
      arLangName: "عربی",
    },
    hero: {
      eyebrow: "طراحی وب • توسعه",
      title: "لستار وب‌سایت‌های سریع و زیبا می‌سازد",
      subtitle:
        "سایتی سه‌زبانه با Next.js، Tailwind و shadcn/ui — تمیز، دسترس‌پذیر و سازگار با راست‌به‌چپ، همراه با حالت تیره و روشن.",
      ctaPrimary: "شروع پروژه",
      ctaSecondary: "مشاهده خدمات",
    },
    home: {
      servicesFeatures: {
        title: "ویژگی‌ها و خدمات",
        subtitle: "طراحی و برنامه‌نویسی، طراحی هویت بصری، سئو و کمپین‌های تبلیغاتی — نتیجه‌محور.",
        items: [
          {
            title: "طراحی و برنامه نویسی (وب‌سایت‌، اپلیکیشن، وب‌اَپ)",
            desc: "طراحی و برنامه‌نویسی وب‌سایت‌ و اَپ با استفاده از جدید‌ترین تکنولوژی‌ها",
            cta: "اطلاعات بیشتر",
            href: "/fa/services",
          },
          {
            title: "طراحی (UI/UX، گرافیک، هویت بصری، موشن‌گرافیک)",
            desc: "آغازی اصولی و دانش‌محور برای یکپارچه‌سازی نمای برند در نگاه مخاطب",
            cta: "اطلاعات بیشتر",
            href: "/fa/services",
          },
          {
            title: "خدمات سئو (سئو و بهینه سازی وب‌سایت)",
            desc: "بهینه‌سازی و سئوی استراتژیک وب‌سایت بر اساس کلمات کلیدی متناسب با برند",
            cta: "اطلاعات بیشتر",
            href: "/fa/services",
          },
          {
            title: "کمپین تبلیغاتی (کمپین در گوگل و متا)",
            desc: "طراحی و اجرای کمپین‌های تبلیغاتی هدفمند در گوگل، فیسبوک و اینستاگرام",
            cta: "اطلاعات بیشتر",
            href: "/fa/services",
          },
        ],
      },
      cta: {
        title: "آماده‌اید با لستار بسازید؟",
        subtitle: "از اهداف خود بگویید.",
        button: { label: "تماس با ما" },
      },
      portfolio: { title: "نمونه کارها", subtitle: "گزیده‌ای از پروژه‌ها و مطالعات موردی.", viewAll: "مشاهده همه" },
      why: {
        title: "چرا لستار",
        bullets: [
          "مهندسی مبتنی بر طراحی",
          "تمرکز بر عملکرد و دسترس‌پذیری",
          "کد TypeScript تمیز",
          "سیستم‌های طراحی مقیاس‌پذیر",
        ],
      },
      aboutTeaser: {
        title: "درباره لستار",
        body: "استودیو طراحی و مهندسی برای ساخت تجربه‌های وب در سطح جهانی.",
        button: "بیشتر بدانید",
      },
      latestPosts: { title: "آخرین پست‌ها", subtitle: "نگاهی از طراحی، کدنویسی و محصول." },
      partners: { title: "مورد اعتماد برندهای پیشرو" },
    },
    pages: {
      about: {
        title: "درباره لستار",
        subtitle: "مهندسی مبتنی بر طراحی برای برندهای مدرن.",
        body: "تمرکز ما سرعت، دسترس‌پذیری و تجربه‌های دلنشین است.",
      },
      services: {
        title: "خدمات",
        subtitle: "استراتژی، طراحی و توسعه در یک‌جا.",
      },
      blog: {
        title: "بلاگ",
        subtitle: "اندیشه‌هایی از کار روزمره ما.",
        readMore: "ادامه مطلب",
      },
    },
    contact: {
      title: "تماس",
      subtitle: "۱ تا ۲ روز کاری بعد پاسخ می‌دهیم.",
      emailLabel: "ایمیل",
      messageLabel: "پیام",
      send: "ارسال",
      success: "متشکریم! پیام شما دریافت شد.",
    },
    footer: {
      rights: "کلیه حقوق محفوظ است.",
      office: {
        title: "دفتر مرکزی لستار",
        address: ["تهران، هروی، موسوی، پ 50"],
        email: "info@lastaar.com",
        phone: "021-22954114",
        mobile: "0919-9274196",
      },
      quickLinks: {
        title: "دسترسی سریع",
        links: [
          { label: "طراحی وب‌سایت", href: "/fa/services" },
          { label: "خدمات سئو", href: "/fa/services" },
          { label: "گوگل ادز", href: "/fa/services" },
          { label: "نمونه کارها", href: "/fa/portfolio" },
          { label: "آخرین پست‌ها", href: "/fa/blog" },
        ],
      },
      latest: { title: "آخرین پست‌ها" },
      newsletter: {
        title: "اشتراک خبرنامه",
        placeholder: "ایمیل شما",
        button: "اشتراک",
        success: "با موفقیت عضو شدید!",
      },
    },
  },
  ar: {
    brand: { name: "لستار" },
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "الخدمات",
      portfolio: "الأعمال",
      blog: "المدونة",
      contact: "اتصل",
      enLangName: "إنجليزي",
      faLangName: "الفارسية",
      arLangName: "عربي",
    },
    hero: {
      eyebrow: "تصميم الويب • التطوير",
      title: "لستار تُنشئ مواقع سريعة وجميلة",
      subtitle:
        "موقع بثلاث لغات باستخدام Next.js وTailwind وshadcn/ui — نظيف وسهل الوصول ويدعم RTL مع الوضعين الداكن والفاتح.",
      ctaPrimary: "ابدأ مشروعك",
      ctaSecondary: "استعرض الخدمات",
    },
    home: {
      servicesFeatures: {
        title: "الخدمات",
        subtitle: "تصميم وتطوير، هوية بصرية، SEO وحملات إعلانية — لتحقيق النتائج.",
        items: [
          {
            title: "التصميم والتطوير (مواقع، تطبيقات، Web Apps)",
            desc: "مواقع وتطبيقات حديثة بأحدث التقنيات.",
            cta: "المزيد",
            href: "/ar/services",
          },
          {
            title: "التصميم (UI/UX، جرافيك، هوية، موشن)",
            desc: "بداية منهجية قائمة على البحث لتوحيد حضور العلامة.",
            cta: "المزيد",
            href: "/ar/services",
          },
          {
            title: "خدمات SEO",
            desc: "تحسين استراتيجي يعتمد على كلمات مفتاحية مناسبة للعلامة.",
            cta: "المزيد",
            href: "/ar/services",
          },
          {
            title: "حملات إعلانية (Google & Meta)",
            desc: "تصميم وتنفيذ حملات مستهدفة في جوجل وفيسبوك وإنستغرام.",
            cta: "المزيد",
            href: "/ar/services",
          },
        ],
      },
      cta: { title: "جاهز للبناء مع لستار؟", subtitle: "أخبرنا بأهدافك.", button: { label: "اتصل بنا" } },
      portfolio: { title: "الأعمال", subtitle: "مختارات من المشاريع ودراسات الحالة.", viewAll: "اعرض الكل" },
      why: {
        title: "لماذا تختار لستار",
        bullets: [
          "هندسة مدفوعة بالتصميم",
          "الأداء وإمكانية الوصول أولاً",
          "كود TypeScript نظيف",
          "أنظمة تصميم قابلة للتوسع",
        ],
      },
      aboutTeaser: { title: "عن لستار", body: "استوديو تصميم وهندسة لتجارب ويب عالمية.", button: "المزيد عنا" },
      latestPosts: { title: "أحدث المقالات", subtitle: "أفكار حول التصميم والبرمجة والمنتج." },
      partners: { title: "موثوق به من علامات طموحة" },
    },
    pages: {
      about: {
        title: "من نحن",
        subtitle: "هندسة مدفوعة بالتصميم للعلامات الحديثة.",
        body: "نركز على السرعة وإمكانية الوصول وتجارب ممتعة.",
      },
      services: { title: "الخدمات", subtitle: "الاستراتيجية والتصميم والتطوير تحت سقف واحد." },
      blog: { title: "المدونة", subtitle: "أفكار من حرفتنا.", readMore: "اقرأ المزيد" },
    },
    contact: {
      title: "اتصل بنا",
      subtitle: "سنرد خلال 1–2 يوم عمل.",
      emailLabel: "البريد الإلكتروني",
      messageLabel: "الرسالة",
      send: "إرسال",
      success: "شكرًا لك! استلمنا رسالتك.",
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
      office: {
        title: "المكتب الرئيسي لستار",
        address: ["طهران، هروي، موسوي، رقم 50"],
        email: "info@lastaar.com",
        phone: "021-22954114",
        mobile: "0919-9274196",
      },
      quickLinks: {
        title: "روابط سريعة",
        links: [
          { label: "تصميم المواقع", href: "/ar/services" },
          { label: "خدمات SEO", href: "/ar/services" },
          { label: "إعلانات Google", href: "/ar/services" },
          { label: "الأعمال", href: "/ar/portfolio" },
          { label: "أحدث المقالات", href: "/ar/blog" },
        ],
      },
      latest: { title: "أحدث المقالات" },
      newsletter: { title: "اشترك", placeholder: "بريدك الإلكتروني", button: "اشترك", success: "تم الاشتراك!" },
    },
  },
}

export async function getDictionary(locale: Locale): Promise<Dict> {
  return dictionaries[locale]
}
