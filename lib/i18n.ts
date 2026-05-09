import { portfolio } from "./portfolio"

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
  common?: {
    authorAlt: string
  }
  brand: { name: string }
  nav: {
    home: string
    about: string
    services: string
    portfolio: string
    blog: string
    contact: string
    nextaar: string
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
    stats: { value: string; label: string }[]
    scroll: string
  }
  home: {
    servicesFeatures: {
      title: string
      subtitle: string
      items: { title: string; desc: string; cta: string; href: string }[]
    }
    cta: { badge: string; title: string; subtitle: string; button: { label: string } }
    portfolio: { title: string; subtitle: string; viewAll: string }
    why: { title: string; bullets: string[] }
    aboutTeaser: { title: string; body: string; button: string }
    process: {
      eyebrow: string
      title: string
      subtitle: string
      steps: { title: string; body: string }[]
      primaryCta: string
      secondaryCta: string
    }
    latestPosts: { title: string; subtitle: string }
    partners: { title: string }
  }
  pages: {
    about: {
      title: string
      subtitle: string
      body: string
      mission: { title: string; body: string[] }
      vision: { title: string; body: string[] }
      team: { title: string; members: { name: string; role: string; photo?: string; socials?: { github?: string; linkedin?: string; instagram?: string; twitter?: string } }[] }
      aboutDescription: { title: string; body: string[] }
    }
    portfolio: {title: string; subtitle:string}
    services: { title: string; subtitle: string }
    blog: {
      title: string
      subtitle: string
      readMore: string
      categories: string
      allPosts: string
      search: string
      searchPlaceholder: string
      noPosts: string
    }
    terms: {
      title: string
      subtitle: string
      lastUpdated: string
      intro: string
      sections: { title: string; body: string[]; bullets?: string[] }[]
      contactCta: { title: string; body: string; button: string }
    }
    dataProtection: {
      title: string
      subtitle: string
      lastUpdated: string
      intro: string
      sections: { title: string; body: string[]; bullets?: string[] }[]
      contactCta: { title: string; body: string; button: string }
    }
  }
  contact: {
    title: string
    subtitle: string
    nameLabel: string
    companyLabel: string
    emailLabel: string
    phoneLabel: string
    messageLabel: string
    send: string
    success: string
    locationsTitle: string
    locations: { city: string; address: string; phone: string }[]
  }
  blogDetail: {
    tocTitle: string
    noHeadings: string
    readTimeSuffix: string
    share: {
      title: string
      linkedin: string
      instagram: string
      telegram: string
      facebook: string
      email: string
      x: string
      copy: string
      close: string
    }
    subscribe: { title: string; help: string; placeholder: string; success: string; buttonAria: string }
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
    common: { authorAlt: "Author" },
    brand: { name: "Lastaar" },
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      portfolio: "Portfolio",
      blog: "Blog",
      contact: "Contact",
      nextaar: "Nextaar",
      enLangName: "English",
      faLangName: "Persian",
      arLangName: "Arabic",
    },
    hero: {
      eyebrow: "Strategy • Design • Development",
      title: "We build websites that grow your business",
      subtitle:
        "Lastaar combines branding, UX, and modern engineering to launch high-performing websites and web apps for ambitious brands.",
      ctaPrimary: "Book a Free Consultation",
      ctaSecondary: "Explore Our Services",
      stats: [
        { value: "50+", label: "Successful Launches" },
        { value: "8+",  label: "Years Experience" },
        { value: "98%", label: "Client Satisfaction" },
      ],
      scroll: "Discover",
    },
    home: {
      servicesFeatures: {
        title: "What We Can Build",
        subtitle: "From brand websites to scalable platforms, we create digital products focused on conversion and growth.",
        items: [
          {
            title: "Web Development (Websites, Apps, Web Apps)",
            desc: "Modern websites and apps using the latest tech.",
            cta: "Learn more",
            href: "/en/services/web-development",
          },
          {
            title: "Design (UI/UX, Graphic, Brand Identity, Motion)",
            desc: "A thoughtful, research‑driven foundation for your brand presence.",
            cta: "Learn more",
            href: "/en/services/design",
          },
          {
            title: "SEO, AEO and GEO Services",
            desc: "Strategic optimization based on brand‑fit keywords.",
            cta: "Learn more",
            href: "/en/services/seo-aeo-geo",
          },
          {
            title: "Ad Campaigns (Google & Meta)",
            desc: "Targeted campaigns across Google, Facebook, and Instagram.",
            cta: "Learn more",
            href: "/en/services/ad-campaigns",
          },
        ],
      },
      cta: {
        badge: "Let's build your next growth engine",
        title: "Have a project in mind?",
        subtitle: "Share your goals and get a tailored roadmap from our team.",
        button: { label: "Talk to Lastaar" },
      },
      portfolio: { title: "Featured Work", subtitle: "Real projects built for performance, clarity, and measurable results.", viewAll: "View Full Portfolio" },
      why: {
        title: "Why Brands Choose Lastaar",
        bullets: [
          "Strategy, design, and development in one integrated team",
          "Fast delivery with production-grade code quality",
          "SEO, accessibility, and performance from day one",
          "Long-term support to scale after launch",
          "Transparent process with clear milestones and reporting",
          "Business-focused decisions, not just beautiful interfaces",
        ],
      },
      aboutTeaser: {
        title: "Meet Lastaar",
        body: "We are a design and engineering studio helping brands launch faster, communicate better, and convert more. Every project is crafted to balance aesthetics, speed, and business impact.",
        button: "Learn About Us",
      },
      process: {
        eyebrow: "From idea to launch",
        title: "A clear process before a single line of code",
        subtitle:
          "The homepage already explains what we build and why teams choose us. This is the missing part: how your project moves safely from first conversation to measurable launch.",
        steps: [
          {
            title: "1. Discover the real goal",
            body: "We clarify your audience, offer, business model, content, and success metrics so the project starts with a useful brief.",
          },
          {
            title: "2. Map the roadmap",
            body: "We define pages, user flows, technical needs, SEO priorities, milestones, and what should be built first.",
          },
          {
            title: "3. Design, build, and review",
            body: "Design and development move together with structured reviews, so decisions stay fast and quality stays visible.",
          },
          {
            title: "4. Launch, measure, improve",
            body: "We deploy, check performance, monitor the first signals, and help you plan the next growth iteration.",
          },
        ],
        primaryCta: "Start with a roadmap",
        secondaryCta: "Explore services",
      },
      latestPosts: { title: "Insights & Articles", subtitle: "Practical ideas on web strategy, design systems, and product growth." },
      partners: { title: "Trusted by growing teams and modern tech stacks" },
    },
    pages: {
      portfolio: {
        title: "portfolio",
        subtitle: "Check what we created",
      },
      about: {
        title: "About Lastaar",
        subtitle: "Design‑driven engineering for modern brands.",
        body: "We focus on speed, accessibility, and delightful experiences.",
        mission: {
          title: "Mission",
          body: [
            "Deliver world‑class digital products that are fast, accessible, and beautiful.",
            "Blend design and engineering to create measurable business outcomes.",
          ],
        },
        vision: {
          title: "Vision",
          body: [
            "Shape the future of the web with craftsmanship and empathy.",
            "Build lasting partnerships through transparency and reliability.",
          ],
        },
        team: {
          title: "Team",
          members: [
            { name: "Ari A.", role: "Design Lead", photo: "/placeholder-user.jpg", socials: { linkedin: "#", instagram: "#" } },
            { name: "Iman K.", role: "Engineering Lead", photo: "/assi.jpg", socials: { github: "#", linkedin: "#" } },
            { name: "Sara M.", role: "Product Designer", photo: "/sara.jpg", socials: { instagram: "#" } },
            { name: "Amir R.", role: "Frontend Engineer", photo: "/media/emile-perron-xrVDYZRGdw4-unsplash.jpg", socials: { github: "#" } },
          ],
        },
        aboutDescription: {
          title: "About Lastaar",
          body: [
            "Lastaar is a design and engineering studio focused on building delightful web experiences.",
            "We practice performance‑first development, scalable design systems, and clean TypeScript.",
          ],
        },
      },
      services: {
        title: "Services",
        subtitle: "Strategy, design, and development under one roof.",
      },
      blog: {
        title: "Blog",
        subtitle: "Insights from our craft.",
        readMore: "Read more",
        categories: "Categories",
        allPosts: "All posts",
        search: "Search",
        searchPlaceholder: "Search articles...",
        noPosts: "No posts found in this category.",
      },
      terms: {
        title: "Terms and Conditions",
        subtitle: "The rules for working with Lastaar on web design, development, software, and digital services.",
        lastUpdated: "Last updated: May 2026",
        intro:
          "These Terms and Conditions govern every project, consultation, subscription, and digital service provided by Lastaar unless a signed project agreement says otherwise.",
        sections: [
          {
            title: "1. Scope and Contracting Parties",
            body: [
              "These terms apply to all contracts between Lastaar and the client for web design, web development, software development, SEO, advertising, consulting, and related digital services.",
              "Different, conflicting, or additional client terms only apply if Lastaar confirms them in writing.",
            ],
          },
          {
            title: "2. Subject of the Contract",
            body: [
              "Lastaar provides individually planned digital services based on the client's goals, briefing, materials, and project requirements.",
              "The exact scope of work is defined by the written proposal, order confirmation, statement of work, or project agreement.",
            ],
            bullets: [
              "Website and web app design and development",
              "Brand, UX/UI, content, SEO, AEO, GEO, and advertising services",
              "Custom software, automation, integrations, and technical consulting",
            ],
          },
          {
            title: "3. Contract Formation",
            body: [
              "Website content and service descriptions are non-binding invitations to request an offer.",
              "A contract is formed when Lastaar confirms the project in writing, starts work after agreement, or receives the agreed payment.",
            ],
          },
          {
            title: "4. Prices and Payment",
            body: [
              "Prices are based on the approved proposal or project agreement. Unless otherwise agreed, invoices must be paid before work begins or according to the agreed payment schedule.",
              "Late payment may pause delivery timelines, access to deliverables, support, and publication of the project.",
            ],
          },
          {
            title: "5. Client Responsibilities",
            body: [
              "The client must provide all required information, content, access credentials, feedback, and approvals on time.",
              "Delays caused by missing input, late feedback, or unavailable access are not the responsibility of Lastaar and may extend delivery dates or create additional costs.",
            ],
          },
          {
            title: "6. Delivery, Review, and Acceptance",
            body: [
              "Project timelines begin after receipt of the required payment, briefing, and materials.",
              "The client must review delivered work within the agreed review period. If no specific defects are reported within a reasonable time, the work may be considered accepted.",
            ],
          },
          {
            title: "7. Revisions and Scope Changes",
            body: [
              "Included revisions are limited to the agreed project scope. New features, changed requirements, extra pages, integrations, or strategic changes may require a separate quote.",
              "Lastaar may pause work until additional scope, timelines, and fees are confirmed.",
            ],
          },
          {
            title: "8. Cancellation and Refunds",
            body: [
              "Because digital projects require reserved capacity, planning, design, and custom implementation, paid fees are generally non-refundable once work has started.",
              "If a project is cancelled before work begins, Lastaar may offer a partial refund after deducting administrative and reserved-capacity costs.",
            ],
          },
          {
            title: "9. Intellectual Property and Usage Rights",
            body: [
              "After full payment, the client receives the agreed usage rights for the delivered project for its intended business purpose.",
              "Until full payment is received, all designs, code, concepts, source files, and deliverables remain the property of Lastaar. Third-party assets, fonts, plugins, and services remain subject to their own licenses.",
            ],
          },
          {
            title: "10. Warranty and Defects",
            body: [
              "Lastaar will correct confirmed defects that materially deviate from the agreed scope and are reported with clear details within the applicable review or warranty period.",
              "Issues caused by third-party changes, client edits, hosting problems, unsupported browsers, or incorrect use are not considered defects in Lastaar's work.",
            ],
          },
          {
            title: "11. Liability",
            body: [
              "Lastaar is not liable for indirect damages, lost profits, business interruption, data loss, or third-party service outages unless required by applicable law.",
              "The client is responsible for maintaining backups, access security, legal compliance of provided content, and approvals from stakeholders.",
            ],
          },
          {
            title: "12. Confidentiality and Data Protection",
            body: [
              "Both parties must keep confidential business, technical, and project information private unless disclosure is required to deliver the service or by law.",
              "Personal data is handled according to applicable privacy laws and the website privacy policy.",
            ],
          },
          {
            title: "13. Final Provisions",
            body: [
              "If any provision of these terms is invalid, the remaining provisions stay effective.",
              "The project agreement and these terms are interpreted according to the applicable law agreed between the parties or, if not specified, the law of the service provider's principal place of business.",
            ],
          },
        ],
        contactCta: {
          title: "Questions about these terms?",
          body: "Contact us before starting a project and we will clarify the terms that apply to your case.",
          button: "Contact Lastaar",
        },
      },
      dataProtection: {
        title: "Data Protection",
        subtitle: "How Lastaar collects, uses, protects, and stores personal data when you use our website or services.",
        lastUpdated: "Last updated: May 2026",
        intro:
          "This page explains how we handle personal data in connection with our website, contact forms, newsletters, analytics, marketing, and client projects.",
        sections: [
          {
            title: "1. Responsible Party",
            body: [
              "Lastaar is responsible for processing personal data collected through this website and our digital services, unless another controller is named in a separate project agreement.",
              "You can contact us about privacy or data protection requests using the contact details published on this website.",
            ],
          },
          {
            title: "2. Data We Collect",
            body: [
              "We only collect data that is necessary to operate the website, respond to requests, provide services, improve performance, and comply with legal obligations.",
            ],
            bullets: [
              "Contact details such as name, company, email address, phone number, and message content",
              "Project information, briefs, files, links, access details, and communication history",
              "Technical data such as IP address, browser, device, pages visited, referrer, date, and time",
              "Newsletter subscription data and cookie consent preferences",
            ],
          },
          {
            title: "3. Purposes of Processing",
            body: [
              "We process personal data to communicate with users and clients, prepare offers, deliver projects, manage support, improve the website, send requested updates, and protect our systems.",
              "We do not sell personal data.",
            ],
          },
          {
            title: "4. Cookies and Consent",
            body: [
              "Our website uses necessary cookies for basic functionality. Optional cookies for preferences, analytics, or marketing are only used according to the choices saved in the cookie settings.",
              "You can change your cookie choices at any time using the cookie settings button on the website.",
            ],
          },
          {
            title: "5. Analytics and Marketing",
            body: [
              "If analytics or marketing tools are enabled, they may help us understand website usage, measure campaigns, and improve content. These tools are only loaded when the relevant consent category is allowed.",
              "Analytics and marketing providers may process data according to their own privacy terms.",
            ],
          },
          {
            title: "6. Legal Basis",
            body: [
              "Depending on the situation, processing may be based on consent, performance of a contract, pre-contractual communication, legitimate interest, or legal obligation.",
              "Where processing is based on consent, you can withdraw consent at any time without affecting processing that happened before withdrawal.",
            ],
          },
          {
            title: "7. Sharing and Service Providers",
            body: [
              "We may share data with trusted service providers such as hosting, email, analytics, CRM, payment, project management, or technical support providers when this is necessary to operate our services.",
              "We require service providers to handle data securely and only for the agreed purpose.",
            ],
          },
          {
            title: "8. Retention",
            body: [
              "We keep personal data only as long as needed for the purpose it was collected, for contract performance, legitimate business needs, or legal retention obligations.",
              "When data is no longer needed, it is deleted or anonymized where reasonably possible.",
            ],
          },
          {
            title: "9. Your Rights",
            body: [
              "Depending on applicable law, you may have the right to access, correct, delete, restrict, object to processing, request portability, or withdraw consent.",
              "To exercise these rights, contact us with enough information to identify your request.",
            ],
          },
          {
            title: "10. Security",
            body: [
              "We use technical and organizational measures to protect personal data against unauthorized access, loss, misuse, or disclosure.",
              "No online service can be guaranteed completely secure, so users should also protect their own devices, passwords, and access credentials.",
            ],
          },
          {
            title: "11. International Transfers",
            body: [
              "Some service providers may process data outside your country. Where required, we use appropriate safeguards or rely on legally recognized transfer mechanisms.",
            ],
          },
          {
            title: "12. Updates to This Page",
            body: [
              "We may update this Data Protection page when our services, tools, laws, or internal processes change. The latest version is always available on this page.",
            ],
          },
        ],
        contactCta: {
          title: "Privacy request or question?",
          body: "Contact us and we will help you understand or manage your data protection rights.",
          button: "Contact Lastaar",
        },
      },
    },
    contact: {
      title: "Contact",
      subtitle: "We’ll get back within 1–2 business days.",
      nameLabel: "Name",
      companyLabel: "Company Name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      messageLabel: "Message",
      send: "Send",
      success: "Thanks! We received your message.",
      locationsTitle: "Our locations",
      locations: [
        { city: "Tehran, Iran", address: "No. 50, Mousavi, Heravi, Tehran", phone: "021-22954114" },
        { city: "Menlo Park, USA", address: "1374 Willow Rd, Menlo Park, CA 94025, USA", phone: "+14792792424" },
        {
          city: "Muscat, Oman",
          address: "Office No. 20, Bin Hayl-1, Musqat 133, Oman",
          phone: "+97145842838",
        },
      ],
    },
    blogDetail: {
      tocTitle: "Table of contents",
      noHeadings: "No headings",
      readTimeSuffix: "min read",
      share: {
        title: "Share",
        linkedin: "LinkedIn",
        instagram: "Instagram",
        telegram: "Telegram",
        facebook: "Facebook",
        email: "Email",
        x: "X",
        copy: "Copy link",
        close: "Close",
      },
      subscribe: {
        title: "Subscribe",
        help: "Get our latest posts in your inbox.",
        placeholder: "you@example.com",
        success: "You’re subscribed!",
        buttonAria: "Subscribe",
      },
    },
    footer: {
      rights: "All rights reserved.",
      office: {
        title: "Lastaar HQ",
        address: ["No. 50, Mousavi, Heravi, Tehran"],
        email: "info@lastaar.com",
        phone: "021-22954114",
        mobile: "0919-9274196",
      },
      quickLinks: {
        title: "Quick links",
        links: [
          { label: "Website design", href: "/en/services/web-development" },
          { label: "SEO services", href: "/en/services/seo-aeo-geo" },
          { label: "Google Ads", href: "/en/services/ad-campaigns" },
          { label: "Portfolio", href: "/en/portfolio" },
          { label: "Latest posts", href: "/en/blog" },
          { label: "Terms & Conditions", href: "/en/terms" },
          { label: "Data Protection", href: "/en/data-protection" },
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
    common: { authorAlt: "نویسنده" },
    brand: { name: "لستار" },
    nav: {
      home: "خانه",
      about: "درباره",
      services: "خدمات",
      portfolio: "نمونه کارها",
      blog: "بلاگ",
      contact: "تماس",
      nextaar: "نکستار",
      enLangName: "انگلیسی",
      faLangName: "فارسی",
      arLangName: "عربی",
    },
    hero: {
      eyebrow: "استراتژی • طراحی • توسعه",
      title: "وب‌سایت‌هایی می‌سازیم که کسب‌وکار شما را رشد می‌دهند",
      subtitle:
        "لستار با ترکیب برندینگ، تجربه کاربری و مهندسی مدرن، وب‌سایت‌ و وب‌اپ‌های سریع و نتیجه‌محور برای برندهای بلندپرواز می‌سازد.",
      ctaPrimary: "رزرو مشاوره رایگان",
      ctaSecondary: "مشاهده خدمات ما",
      stats: [
        { value: "۵۰+", label: "راه‌اندازی موفق" },
        { value: "۸+",  label: "سال تجربه" },
        { value: "۹۸٪", label: "رضایت مشتری" },
      ],
      scroll: "کشف کنید",
    },
    home: {
      servicesFeatures: {
        title: "آنچه برای شما می‌سازیم",
        subtitle: "از وب‌سایت برند تا پلتفرم‌های مقیاس‌پذیر؛ محصولاتی می‌سازیم که روی رشد و تبدیل تمرکز دارند.",
        items: [
          {
            title: "توسعه وب (وب‌سایت‌، اپلیکیشن، وب‌اَپ)",
            desc: "طراحی و برنامه‌نویسی وب‌سایت‌ و اَپ با استفاده از جدید‌ترین تکنولوژی‌ها",
            cta: "اطلاعات بیشتر",
            href: "/fa/services/web-development",
          },
          {
            title: "طراحی (UI/UX، گرافیک، هویت بصری، موشن‌گرافیک)",
            desc: "آغازی اصولی و دانش‌محور برای یکپارچه‌سازی نمای برند در نگاه مخاطب",
            cta: "اطلاعات بیشتر",
            href: "/fa/services/design",
          },
          {
            title: "خدمات SEO, AEO و GEO (سئو و بهینه سازی وب‌سایت)",
            desc: "بهینه‌سازی و سئوی استراتژیک وب‌سایت بر اساس کلمات کلیدی متناسب با برند",
            cta: "اطلاعات بیشتر",
            href: "/fa/services/seo-aeo-geo",
          },
          {
            title: "کمپین تبلیغاتی (کمپین در گوگل و متا)",
            desc: "طراحی و اجرای کمپین‌های تبلیغاتی هدفمند در گوگل، فیسبوک و اینستاگرام",
            cta: "اطلاعات بیشتر",
            href: "/fa/services/ad-campaigns",
          },
        ],
      },
      cta: {
        badge: "با هم موتور رشد بعدی شما را بسازیم",
        title: "پروژه‌ای در ذهن دارید؟",
        subtitle: "اهدافتان را بگویید تا نقشه راه متناسب با کسب‌وکارتان را دریافت کنید.",
        button: { label: "گفتگو با لستار" },
      },
      portfolio: { title: "پروژه‌های منتخب", subtitle: "نمونه‌هایی واقعی با تمرکز بر عملکرد، وضوح پیام و نتیجه‌پذیری.", viewAll: "مشاهده کامل نمونه‌کارها" },
      why: {
        title: "چرا لستار",
        bullets: [
          "استراتژی، طراحی و توسعه در یک تیم یکپارچه",
          "تحویل سریع با کیفیت فنی در سطح Production",
          "سئو، دسترس‌پذیری و کارایی از روز اول",
          "همراهی بلندمدت برای توسعه پس از لانچ",
          "فرایند شفاف با مراحل مشخص و گزارش‌دهی روشن",
          "تصمیم‌های متمرکز بر کسب‌وکار، نه فقط رابط‌های زیبا",
        ],
      },
      aboutTeaser: {
        title: "لستار را بهتر بشناسید",
        body: "ما یک استودیوی طراحی و مهندسی هستیم که به برندها کمک می‌کنیم سریع‌تر لانچ کنند، بهتر دیده شوند و نرخ تبدیل بالاتری بگیرند. در هر پروژه، زیبایی، سرعت و اثر تجاری را هم‌زمان می‌سازیم.",
        button: "درباره ما",
      },
      process: {
        eyebrow: "از ایده تا لانچ",
        title: "یک مسیر شفاف، قبل از حتی یک خط کد",
        subtitle:
          "صفحه اصلی حالا می‌گوید چه می‌سازیم و چرا برندها ما را انتخاب می‌کنند. بخش مهم بعدی این است: پروژه شما چطور امن و قابل اندازه‌گیری از گفت‌وگوی اول به لانچ می‌رسد.",
        steps: [
          {
            title: "1. کشف هدف واقعی",
            body: "مخاطب، پیشنهاد، مدل کسب‌وکار، محتوا و معیارهای موفقیت را شفاف می‌کنیم تا پروژه با بریف کاربردی شروع شود.",
          },
          {
            title: "2. طراحی نقشه راه",
            body: "صفحات، مسیرهای کاربر، نیازهای فنی، اولویت‌های سئو، مراحل تحویل و نسخه اول محصول را مشخص می‌کنیم.",
          },
          {
            title: "3. طراحی، توسعه و بازبینی",
            body: "طراحی و توسعه با بازبینی‌های ساختارمند جلو می‌روند تا تصمیم‌ها سریع و کیفیت کار قابل مشاهده بماند.",
          },
          {
            title: "4. لانچ، اندازه‌گیری، بهبود",
            body: "پروژه را منتشر می‌کنیم، عملکرد را بررسی می‌کنیم، سیگنال‌های اولیه را می‌سنجیم و قدم بعدی رشد را برنامه‌ریزی می‌کنیم.",
          },
        ],
        primaryCta: "شروع با نقشه راه",
        secondaryCta: "مشاهده خدمات",
      },
      latestPosts: { title: "بینش‌ها و مقالات", subtitle: "ایده‌های کاربردی درباره استراتژی وب، دیزاین سیستم و رشد محصول." },
      partners: { title: "مورد اعتماد تیم‌های در حال رشد و تکنولوژی‌های مدرن" },
    },
    pages: {
      portfolio: { title: "نمونه کارها", subtitle: "گزیده‌ای از پروژه‌ها"},
      about: {
        title: "درباره لستار",
        subtitle: "مهندسی مبتنی بر طراحی برای برندهای مدرن.",
        body: "تمرکز ما سرعت، دسترس‌پذیری و تجربه‌های دلنشین است.",
        mission: {
          title: "ماموریت",
          body: [
            "ساخت محصولات دیجیتال در سطح جهانی؛ سریع، دسترس‌پذیر و زیبا.",
            "ترکیب طراحی و مهندسی برای خلق نتایج قابل اندازه‌گیری.",
          ],
        },
        vision: {
          title: "چشم‌انداز",
          body: [
            "شکل‌دادن آینده وب با دقت و همدلی.",
            "ایجاد همکاری‌های ماندگار با شفافیت و قابل‌اعتمادی.",
          ],
        },
        team: {
          title: "تیم",
          members: [
            { name: "آری", role: "رهبر طراحی", photo: "/placeholder-user.jpg", socials: { linkedin: "#", instagram: "#" } },
            { name: "ایمان", role: "رهبر مهندسی", photo: "/assi.jpg", socials: { github: "#", linkedin: "#" } },
            { name: "سارا", role: "طراح محصول", photo: "/sara.jpg", socials: { instagram: "#" } },
            { name: "امیر", role: "مهندس فرانت‌اند", photo: "/media/emile-perron-xrVDYZRGdw4-unsplash.jpg", socials: { github: "#" } },
          ],
        },
        aboutDescription: {
          title: "درباره لستار",
          body: [
            "لستار استودیو طراحی و مهندسی برای ساخت تجربه‌های لذت‌بخش وب است.",
            "رویکرد ما: توسعه مبتنی بر کارایی، سیستم‌های طراحی مقیاس‌پذیر و TypeScript تمیز.",
          ],
        },
      },
      services: {
        title: "خدمات",
        subtitle: "استراتژی، طراحی و توسعه در یک‌جا.",
      },
      blog: {
        title: "بلاگ",
        subtitle: "اندیشه‌هایی از کار روزمره ما.",
        readMore: "ادامه مطلب",
        categories: "دسته بندی ها",
        allPosts: "همه پست ها",
        search: "جستجو",
        searchPlaceholder: "جستجو در مقالات...",
        noPosts: "پستی در این دسته بندی پیدا نشد.",
      },
      terms: {
        title: "شرایط و قوانین",
        subtitle: "قوانین همکاری با لستار برای طراحی سایت، توسعه وب، نرم افزار و خدمات دیجیتال.",
        lastUpdated: "آخرین به روزرسانی: مه 2026",
        intro:
          "این شرایط و قوانین برای همه پروژه ها، مشاوره ها، اشتراک ها و خدمات دیجیتال ارائه شده توسط لستار اعمال می شود؛ مگر اینکه در قرارداد کتبی پروژه توافق دیگری ثبت شده باشد.",
        sections: [
          {
            title: "1. دامنه کاربرد و طرفین قرارداد",
            body: [
              "این قوانین برای همه قراردادهای میان لستار و مشتری در زمینه طراحی وب سایت، توسعه وب، توسعه نرم افزار، سئو، تبلیغات، مشاوره و خدمات دیجیتال مرتبط معتبر است.",
              "شرایط متفاوت، متعارض یا تکمیلی مشتری فقط زمانی معتبر است که لستار آن را به صورت کتبی تایید کند.",
            ],
          },
          {
            title: "2. موضوع قرارداد",
            body: [
              "لستار خدمات دیجیتال اختصاصی را بر اساس اهداف، بریف، محتوا، دسترسی ها و نیازهای پروژه مشتری برنامه ریزی و اجرا می کند.",
              "دامنه دقیق کار در پیشنهاد کتبی، تایید سفارش، شرح خدمات یا قرارداد پروژه مشخص می شود.",
            ],
            bullets: [
              "طراحی و توسعه وب سایت و وب اپلیکیشن",
              "خدمات برند، تجربه کاربری، رابط کاربری، محتوا، SEO، AEO، GEO و تبلیغات",
              "نرم افزار اختصاصی، اتوماسیون، یکپارچه سازی و مشاوره فنی",
            ],
          },
          {
            title: "3. شکل گیری قرارداد",
            body: [
              "محتوای وب سایت و توضیحات خدمات، پیشنهاد الزام آور محسوب نمی شود و صرفا دعوت به دریافت پیشنهاد است.",
              "قرارداد زمانی شکل می گیرد که لستار پروژه را به صورت کتبی تایید کند، پس از توافق کار را آغاز کند، یا پرداخت توافق شده را دریافت کند.",
            ],
          },
          {
            title: "4. قیمت ها و پرداخت",
            body: [
              "قیمت ها بر اساس پیشنهاد یا قرارداد تایید شده تعیین می شوند. مگر اینکه توافق دیگری شده باشد، پرداخت باید پیش از شروع کار یا طبق برنامه پرداخت توافق شده انجام شود.",
              "تاخیر در پرداخت می تواند باعث توقف زمان بندی، دسترسی به خروجی ها، پشتیبانی و انتشار پروژه شود.",
            ],
          },
          {
            title: "5. تعهدات مشتری",
            body: [
              "مشتری باید همه اطلاعات، محتوا، دسترسی ها، بازخوردها و تاییدیه های لازم را به موقع ارائه کند.",
              "تاخیرهای ناشی از نبود اطلاعات، بازخورد دیرهنگام یا دسترسی ناموجود، مسئولیت لستار نیست و می تواند تاریخ تحویل را تغییر دهد یا هزینه اضافی ایجاد کند.",
            ],
          },
          {
            title: "6. تحویل، بررسی و پذیرش",
            body: [
              "زمان بندی پروژه پس از دریافت پرداخت لازم، بریف و مواد مورد نیاز آغاز می شود.",
              "مشتری باید خروجی های تحویل شده را در بازه بررسی توافق شده بررسی کند. اگر ایراد مشخصی در زمان معقول اعلام نشود، کار می تواند پذیرفته شده تلقی شود.",
            ],
          },
          {
            title: "7. اصلاحات و تغییر دامنه کار",
            body: [
              "اصلاحات شامل شده، محدود به دامنه توافق شده پروژه است. امکانات جدید، تغییر نیازمندی ها، صفحات اضافه، یکپارچه سازی ها یا تغییرات استراتژیک می تواند نیازمند برآورد جداگانه باشد.",
              "لستار می تواند تا زمان تایید دامنه، زمان بندی و هزینه های اضافه، ادامه کار را متوقف کند.",
            ],
          },
          {
            title: "8. لغو پروژه و بازپرداخت",
            body: [
              "از آنجا که پروژه های دیجیتال نیازمند رزرو ظرفیت، برنامه ریزی، طراحی و اجرای اختصاصی هستند، مبالغ پرداخت شده پس از شروع کار عموما غیرقابل بازپرداخت هستند.",
              "اگر پروژه پیش از شروع کار لغو شود، لستار می تواند پس از کسر هزینه های اداری و ظرفیت رزرو شده، بازپرداخت جزئی ارائه کند.",
            ],
          },
          {
            title: "9. مالکیت فکری و حقوق استفاده",
            body: [
              "پس از پرداخت کامل، مشتری حقوق استفاده توافق شده از خروجی پروژه را برای هدف تجاری مشخص شده دریافت می کند.",
              "تا پیش از پرداخت کامل، همه طرح ها، کدها، ایده ها، فایل های منبع و خروجی ها متعلق به لستار باقی می مانند. دارایی ها، فونت ها، افزونه ها و سرویس های شخص ثالث تابع مجوزهای خود هستند.",
            ],
          },
          {
            title: "10. ضمانت و ایرادات",
            body: [
              "لستار ایرادات تایید شده ای را که به شکل مهمی با دامنه توافق شده تفاوت دارند و با جزئیات روشن در بازه بررسی یا ضمانت اعلام شده اند، اصلاح می کند.",
              "مشکلات ناشی از تغییرات شخص ثالث، ویرایش مشتری، هاستینگ، مرورگرهای پشتیبانی نشده یا استفاده نادرست، ایراد در کار لستار محسوب نمی شود.",
            ],
          },
          {
            title: "11. مسئولیت",
            body: [
              "لستار مسئول خسارت های غیرمستقیم، سود از دست رفته، توقف کسب و کار، از دست رفتن داده یا اختلال سرویس های شخص ثالث نیست؛ مگر در مواردی که قانون لازم بداند.",
              "مشتری مسئول نگهداری نسخه پشتیبان، امنیت دسترسی ها، تطابق قانونی محتوای ارائه شده و دریافت تاییدیه های داخلی است.",
            ],
          },
          {
            title: "12. محرمانگی و حفاظت از داده",
            body: [
              "هر دو طرف باید اطلاعات محرمانه تجاری، فنی و پروژه را خصوصی نگه دارند؛ مگر اینکه افشا برای ارائه خدمت یا به حکم قانون لازم باشد.",
              "داده های شخصی مطابق قوانین حریم خصوصی قابل اجرا و سیاست حریم خصوصی وب سایت پردازش می شوند.",
            ],
          },
          {
            title: "13. مقررات پایانی",
            body: [
              "اگر هر بخش از این شرایط نامعتبر شود، سایر بخش ها همچنان معتبر خواهند بود.",
              "قرارداد پروژه و این شرایط بر اساس قانون مورد توافق طرفین تفسیر می شود؛ و در صورت نبود توافق، قانون محل اصلی فعالیت ارائه دهنده خدمت ملاک است.",
            ],
          },
        ],
        contactCta: {
          title: "درباره این قوانین سوال دارید؟",
          body: "پیش از شروع پروژه با ما تماس بگیرید تا شرایط مربوط به پروژه شما را شفاف کنیم.",
          button: "تماس با لستار",
        },
      },
      dataProtection: {
        title: "حفاظت از داده ها",
        subtitle: "نحوه جمع آوری، استفاده، محافظت و نگهداری داده های شخصی هنگام استفاده از وب سایت یا خدمات لستار.",
        lastUpdated: "آخرین به روزرسانی: مه 2026",
        intro:
          "این صفحه توضیح می دهد که ما داده های شخصی را در ارتباط با وب سایت، فرم های تماس، خبرنامه، تحلیل ها، بازاریابی و پروژه های مشتریان چگونه پردازش می کنیم.",
        sections: [
          {
            title: "1. مسئول پردازش داده",
            body: [
              "لستار مسئول پردازش داده های شخصی جمع آوری شده از طریق این وب سایت و خدمات دیجیتال ما است؛ مگر اینکه در قرارداد پروژه، مسئول دیگری مشخص شده باشد.",
              "برای درخواست های مرتبط با حریم خصوصی یا حفاظت از داده می توانید از طریق اطلاعات تماس منتشر شده در وب سایت با ما ارتباط بگیرید.",
            ],
          },
          {
            title: "2. داده هایی که جمع آوری می کنیم",
            body: [
              "ما فقط داده هایی را جمع آوری می کنیم که برای راه اندازی وب سایت، پاسخ به درخواست ها، ارائه خدمات، بهبود عملکرد و انجام تعهدات قانونی لازم است.",
            ],
            bullets: [
              "اطلاعات تماس مانند نام، شرکت، ایمیل، شماره تلفن و متن پیام",
              "اطلاعات پروژه، بریف، فایل ها، لینک ها، دسترسی ها و تاریخچه مکاتبات",
              "داده های فنی مانند IP، مرورگر، دستگاه، صفحات بازدید شده، ارجاع دهنده، تاریخ و زمان",
              "اطلاعات عضویت خبرنامه و ترجیحات رضایت کوکی",
            ],
          },
          {
            title: "3. اهداف پردازش",
            body: [
              "ما داده های شخصی را برای ارتباط با کاربران و مشتریان، آماده سازی پیشنهاد، اجرای پروژه، مدیریت پشتیبانی، بهبود وب سایت، ارسال به روزرسانی های درخواستی و محافظت از سیستم ها پردازش می کنیم.",
              "ما داده های شخصی را نمی فروشیم.",
            ],
          },
          {
            title: "4. کوکی ها و رضایت",
            body: [
              "وب سایت ما از کوکی های ضروری برای عملکرد پایه استفاده می کند. کوکی های اختیاری برای ترجیحات، تحلیل یا بازاریابی فقط طبق انتخاب ذخیره شده در تنظیمات کوکی استفاده می شوند.",
              "شما می توانید در هر زمان از طریق دکمه تنظیمات کوکی در وب سایت، انتخاب های خود را تغییر دهید.",
            ],
          },
          {
            title: "5. تحلیل و بازاریابی",
            body: [
              "اگر ابزارهای تحلیل یا بازاریابی فعال باشند، می توانند به ما در درک استفاده از وب سایت، سنجش کمپین ها و بهبود محتوا کمک کنند. این ابزارها فقط زمانی بارگذاری می شوند که دسته رضایت مربوطه مجاز باشد.",
              "ارائه دهندگان تحلیل و بازاریابی ممکن است داده ها را طبق سیاست های حریم خصوصی خود پردازش کنند.",
            ],
          },
          {
            title: "6. مبنای قانونی",
            body: [
              "بسته به شرایط، پردازش می تواند بر اساس رضایت، اجرای قرارداد، ارتباطات پیش قراردادی، منفعت مشروع یا الزام قانونی انجام شود.",
              "در مواردی که پردازش بر اساس رضایت است، می توانید هر زمان رضایت خود را پس بگیرید؛ بدون اینکه پردازش پیش از آن تحت تاثیر قرار گیرد.",
            ],
          },
          {
            title: "7. اشتراک گذاری و ارائه دهندگان خدمات",
            body: [
              "در صورت نیاز برای اجرای خدمات، ممکن است داده ها را با ارائه دهندگان مورد اعتماد مانند هاستینگ، ایمیل، تحلیل، CRM، پرداخت، مدیریت پروژه یا پشتیبانی فنی به اشتراک بگذاریم.",
              "از ارائه دهندگان خدمات می خواهیم داده ها را امن و فقط برای هدف توافق شده پردازش کنند.",
            ],
          },
          {
            title: "8. مدت نگهداری",
            body: [
              "داده های شخصی فقط تا زمانی نگهداری می شوند که برای هدف جمع آوری، اجرای قرارداد، نیازهای تجاری مشروع یا الزامات قانونی لازم باشد.",
              "وقتی داده دیگر لازم نباشد، تا حد امکان حذف یا ناشناس سازی می شود.",
            ],
          },
          {
            title: "9. حقوق شما",
            body: [
              "بسته به قانون قابل اجرا، ممکن است حق دسترسی، اصلاح، حذف، محدودسازی، اعتراض به پردازش، دریافت نسخه قابل انتقال یا پس گرفتن رضایت را داشته باشید.",
              "برای استفاده از این حقوق، با اطلاعات کافی برای شناسایی درخواست خود با ما تماس بگیرید.",
            ],
          },
          {
            title: "10. امنیت",
            body: [
              "ما از اقدامات فنی و سازمانی برای محافظت از داده های شخصی در برابر دسترسی غیرمجاز، از بین رفتن، سوءاستفاده یا افشا استفاده می کنیم.",
              "هیچ سرویس آنلاین کاملا تضمین شده نیست؛ بنابراین کاربران نیز باید از دستگاه ها، رمزها و دسترسی های خود محافظت کنند.",
            ],
          },
          {
            title: "11. انتقال بین المللی",
            body: [
              "برخی ارائه دهندگان خدمات ممکن است داده ها را خارج از کشور شما پردازش کنند. در صورت نیاز قانونی، از تدابیر مناسب یا سازوکارهای انتقال شناخته شده استفاده می کنیم.",
            ],
          },
          {
            title: "12. به روزرسانی این صفحه",
            body: [
              "ممکن است این صفحه حفاظت از داده ها را هنگام تغییر خدمات، ابزارها، قوانین یا فرایندهای داخلی به روز کنیم. آخرین نسخه همیشه در همین صفحه در دسترس است.",
            ],
          },
        ],
        contactCta: {
          title: "درخواست یا سوال حریم خصوصی دارید؟",
          body: "با ما تماس بگیرید تا در درک یا مدیریت حقوق حفاظت از داده به شما کمک کنیم.",
          button: "تماس با لستار",
        },
      },
    },
    contact: {
      title: "تماس",
      subtitle: "۱ تا ۲ روز کاری بعد پاسخ می‌دهیم.",
      nameLabel: "نام",
      companyLabel: "نام شرکت",
      emailLabel: "ایمیل",
      phoneLabel: "تلفن",
      messageLabel: "پیام",
      send: "ارسال",
      success: "متشکریم! پیام شما دریافت شد.",
      locationsTitle: "دفاتر ما",
      locations: [
        { city: "تهران، ایران", address: "تهران، هروی، موسوی، پ 50", phone: "021-22954114" },
        { city: "منلو پارک، آمریکا", address: "1374 Willow Rd, Menlo Park, CA 94025, USA", phone: "+14792792424" },
        {
          city: "مسقط، عمان",
          address: "2nd Floor, Office No. 20, Bin Hayl-1, Musqat 133, Oman",
          phone: "+97145842838",
        },
      ],
    },
    blogDetail: {
      tocTitle: "فهرست مطالب",
      noHeadings: "بدون سرفصل",
      readTimeSuffix: "دقیقه",
      share: {
        title: "اشتراک‌گذاری",
        linkedin: "لینکدین",
        instagram: "اینستاگرام",
        telegram: "تلگرام",
        facebook: "فیسبوک",
        email: "ایمیل",
        x: "ایکس",
        copy: "کپی لینک",
        close: "بستن",
      },
      subscribe: {
        title: "عضویت",
        help: "آخرین مقالات را در ایمیل خود دریافت کنید.",
        placeholder: "ایمیل شما",
        success: "با موفقیت عضو شدید!",
        buttonAria: "اشتراک",
      },
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
          { label: "طراحی وب‌سایت", href: "/fa/services/web-development" },
          { label: "خدمات سئو", href: "/fa/services/seo-aeo-geo" },
          { label: "گوگل ادز", href: "/fa/services/ad-campaigns" },
          { label: "نمونه کارها", href: "/fa/portfolio" },
          { label: "آخرین پست‌ها", href: "/fa/blog" },
          { label: "شرایط و قوانین", href: "/fa/terms" },
          { label: "حفاظت از داده ها", href: "/fa/data-protection" },
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
    common: { authorAlt: "الكاتب" },
    brand: { name: "لستار" },
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "الخدمات",
      portfolio: "الأعمال",
      blog: "المدونة",
      contact: "اتصل",
      nextaar: "نـکستار",
      enLangName: "إنجليزي",
      faLangName: "الفارسية",
      arLangName: "عربي",
    },
    hero: {
      eyebrow: "استراتيجية • تصميم • تطوير",
      title: "نبني مواقع تنمّي أعمالك",
      subtitle:
        "تجمع لستار بين الهوية البصرية وتجربة المستخدم والهندسة الحديثة لإطلاق مواقع وتطبيقات ويب عالية الأداء للعلامات الطموحة.",
      ctaPrimary: "احجز استشارة مجانية",
      ctaSecondary: "استعرض خدماتنا",
      stats: [
        { value: "٥٠+", label: "إطلاق ناجح" },
        { value: "٨+",  label: "سنوات خبرة" },
        { value: "٩٨٪", label: "رضا العملاء" },
      ],
      scroll: "اكتشف",
    },
    home: {
      servicesFeatures: {
        title: "ما الذي يمكننا بناؤه",
        subtitle: "من مواقع العلامة إلى المنصات القابلة للتوسع؛ نبني منتجات رقمية تركّز على النمو والتحويل.",
        items: [
          {
            title: "تطوير الويب (مواقع، تطبيقات، Web Apps)",
            desc: "مواقع وتطبيقات حديثة بأحدث التقنيات.",
            cta: "المزيد",
            href: "/ar/services/web-development",
          },
          {
            title: "التصميم (UI/UX، جرافيك، هوية، موشن)",
            desc: "بداية منهجية قائمة على البحث لتوحيد حضور العلامة.",
            cta: "المزيد",
            href: "/ar/services/design",
          },
          {
            title: "خدمات SEO, AEO و GEO",
            desc: "تحسين استراتيجي يعتمد على كلمات مفتاحية مناسبة للعلامة.",
            cta: "المزيد",
            href: "/ar/services/seo-aeo-geo",
          },
          {
            title: "حملات إعلانية (Google & Meta)",
            desc: "تصميم وتنفيذ حملات مستهدفة في جوجل وفيسبوك وإنستغرام.",
            cta: "المزيد",
            href: "/ar/services/ad-campaigns",
          },
        ],
      },
      cta: { badge: "لنصنع محرك نموك القادم", title: "هل لديك مشروع في ذهنك؟", subtitle: "شاركنا أهدافك لتحصل على خارطة طريق مناسبة لعملك.", button: { label: "تحدث مع لستار" } },
      portfolio: { title: "أعمال مختارة", subtitle: "مشاريع حقيقية مبنية للأداء ووضوح الرسالة والنتائج القابلة للقياس.", viewAll: "عرض جميع الأعمال" },
      why: {
        title: "لماذا تختار لستار",
        bullets: [
          "الاستراتيجية والتصميم والتطوير ضمن فريق واحد متكامل",
          "تنفيذ سريع بجودة تقنية جاهزة للإنتاج",
          "الأداء وإمكانية الوصول وSEO منذ اليوم الأول",
          "دعم مستمر للتوسع بعد الإطلاق",
          "عملية شفافة بمراحل واضحة وتقارير مفهومة",
          "قرارات تركز على العمل، وليس فقط واجهات جميلة",
        ],
      },
      aboutTeaser: { title: "تعرّف على لستار", body: "نحن استوديو تصميم وهندسة نساعد العلامات على الإطلاق أسرع، والتواصل أوضح، وتحقيق تحويل أعلى. في كل مشروع نوازن بين الجمال والسرعة والأثر التجاري.", button: "عنّا" },
      process: {
        eyebrow: "من الفكرة إلى الإطلاق",
        title: "مسار واضح قبل كتابة أي سطر كود",
        subtitle:
          "الصفحة الرئيسية تشرح ما نبنيه ولماذا تختارنا الفرق. الجزء الأهم التالي هو كيف ينتقل مشروعك بأمان من أول محادثة إلى إطلاق قابل للقياس.",
        steps: [
          {
            title: "1. اكتشاف الهدف الحقيقي",
            body: "نوضح الجمهور والعرض ونموذج العمل والمحتوى ومؤشرات النجاح حتى يبدأ المشروع بملخص مفيد.",
          },
          {
            title: "2. رسم خارطة الطريق",
            body: "نحدد الصفحات ومسارات المستخدم والاحتياجات التقنية وأولويات SEO والمراحل وما يجب بناؤه أولا.",
          },
          {
            title: "3. التصميم والتطوير والمراجعة",
            body: "يتقدم التصميم والتطوير معا مع مراجعات منظمة حتى تبقى القرارات سريعة والجودة واضحة.",
          },
          {
            title: "4. الإطلاق والقياس والتحسين",
            body: "ننشر المشروع ونفحص الأداء ونراقب الإشارات الأولى ونساعدك في تخطيط خطوة النمو التالية.",
          },
        ],
        primaryCta: "ابدأ بخارطة طريق",
        secondaryCta: "استعرض الخدمات",
      },
      latestPosts: { title: "رؤى ومقالات", subtitle: "أفكار عملية حول استراتيجية الويب وأنظمة التصميم ونمو المنتجات." },
      partners: { title: "موثوق به من فرق تنمو بسرعة وتقنيات حديثة" },
    },
    pages: {
      portfolio: { title: "نمونه کارها", subtitle: "گزیده‌ای از پروژه‌ها."},
      about: {
        title: "من نحن",
        subtitle: "هندسة مدفوعة بالتصميم للعلامات الحديثة.",
        body: "نركز على السرعة وإمكانية الوصول وتجارب ممتعة.",
        mission: {
          title: "المهمة",
          body: [
            "تقديم منتجات رقمية عالمية المستوى: سريعة وسهلة الوصول وجميلة.",
            "دمج التصميم والهندسة لتحقيق نتائج ملموسة.",
          ],
        },
        vision: {
          title: "الرؤية",
          body: [
            "تشكيل مستقبل الويب بحرفية وتعاطف.",
            "بناء شراكات دائمة من خلال الشفافية والموثوقية.",
          ],
        },
        team: {
          title: "الفريق",
          members: [
            { name: "آري", role: "قائد التصميم", photo: "/placeholder-user.jpg", socials: { linkedin: "#", instagram: "#" } },
            { name: "إيمان", role: "قائد الهندسة", photo: "/assi.jpg", socials: { github: "#", linkedin: "#" } },
            { name: "سارة", role: "مصممة منتج", photo: "/media/sara.jpg", socials: { instagram: "#" } },
            { name: "أمير", role: "مهندس واجهات أمامية", photo: "/media/emile-perron-xrVDYZRGdw4-unsplash.jpg", socials: { github: "#" } },
          ],
        },
        aboutDescription: {
          title: "عن لستار",
          body: [
            "لستار استوديو تصميم وهندسة يركز على تجارب ويب ممتعة.",
            "نمارس الأداء أولًا، وأنظمة تصميم قابلة للتوسع، وTypeScript نظيف.",
          ],
        },
      },
      services: { title: "الخدمات", subtitle: "الاستراتيجية والتصميم والتطوير تحت سقف واحد." },
      blog: {
        title: "المدونة",
        subtitle: "أفكار من حرفتنا.",
        readMore: "اقرأ المزيد",
        categories: "التصنيفات",
        allPosts: "كل المقالات",
        search: "بحث",
        searchPlaceholder: "ابحث في المقالات...",
        noPosts: "لم يتم العثور على مقالات في هذا التصنيف.",
      },
      terms: {
        title: "الشروط والأحكام",
        subtitle: "قواعد العمل مع لستار في تصميم المواقع، تطوير الويب، البرمجيات والخدمات الرقمية.",
        lastUpdated: "آخر تحديث: مايو 2026",
        intro:
          "تنطبق هذه الشروط والأحكام على كل مشروع واستشارة واشتراك وخدمة رقمية تقدمها لستار، ما لم ينص اتفاق مشروع مكتوب على خلاف ذلك.",
        sections: [
          {
            title: "1. النطاق وأطراف العقد",
            body: [
              "تنطبق هذه الشروط على جميع العقود بين لستار والعميل في خدمات تصميم المواقع، تطوير الويب، تطوير البرمجيات، SEO، الإعلانات، الاستشارات والخدمات الرقمية ذات الصلة.",
              "لا تسري أي شروط مختلفة أو متعارضة أو إضافية من العميل إلا إذا وافقت عليها لستار كتابيا.",
            ],
          },
          {
            title: "2. موضوع العقد",
            body: [
              "تقدم لستار خدمات رقمية مخصصة بناء على أهداف العميل، الملخص، المواد، بيانات الوصول ومتطلبات المشروع.",
              "يتم تحديد نطاق العمل بدقة في العرض المكتوب أو تأكيد الطلب أو بيان العمل أو اتفاق المشروع.",
            ],
            bullets: [
              "تصميم وتطوير المواقع وتطبيقات الويب",
              "خدمات الهوية، UX/UI، المحتوى، SEO، AEO، GEO والإعلانات",
              "برمجيات مخصصة، أتمتة، تكاملات واستشارات تقنية",
            ],
          },
          {
            title: "3. إبرام العقد",
            body: [
              "محتوى الموقع ووصف الخدمات لا يمثلان عرضا ملزما، بل دعوة لطلب عرض.",
              "ينعقد العقد عندما تؤكد لستار المشروع كتابيا، أو تبدأ العمل بعد الاتفاق، أو تستلم الدفعة المتفق عليها.",
            ],
          },
          {
            title: "4. الأسعار والدفع",
            body: [
              "تعتمد الأسعار على العرض أو اتفاق المشروع المعتمد. ما لم يتم الاتفاق على خلاف ذلك، يجب دفع الفواتير قبل بدء العمل أو وفق جدول الدفع المتفق عليه.",
              "قد يؤدي التأخر في الدفع إلى إيقاف الجداول الزمنية، الوصول إلى المخرجات، الدعم ونشر المشروع.",
            ],
          },
          {
            title: "5. مسؤوليات العميل",
            body: [
              "يجب على العميل تقديم كل المعلومات والمحتوى وبيانات الوصول والملاحظات والموافقات المطلوبة في الوقت المناسب.",
              "التأخيرات الناتجة عن نقص المدخلات أو تأخر الملاحظات أو عدم توفر الوصول ليست مسؤولية لستار وقد تمدد مواعيد التسليم أو تنشئ تكاليف إضافية.",
            ],
          },
          {
            title: "6. التسليم والمراجعة والقبول",
            body: [
              "تبدأ الجداول الزمنية للمشروع بعد استلام الدفعة المطلوبة والملخص والمواد اللازمة.",
              "يجب على العميل مراجعة العمل المسلم خلال فترة المراجعة المتفق عليها. إذا لم يتم الإبلاغ عن عيوب محددة خلال مدة معقولة، فقد يعتبر العمل مقبولا.",
            ],
          },
          {
            title: "7. التعديلات وتغيير النطاق",
            body: [
              "تقتصر التعديلات المشمولة على نطاق المشروع المتفق عليه. الميزات الجديدة أو تغيير المتطلبات أو الصفحات الإضافية أو التكاملات أو التغييرات الاستراتيجية قد تتطلب عرضا منفصلا.",
              "يجوز للستار إيقاف العمل حتى يتم تأكيد النطاق والجداول الزمنية والرسوم الإضافية.",
            ],
          },
          {
            title: "8. الإلغاء والاسترداد",
            body: [
              "نظرا لأن المشاريع الرقمية تتطلب حجز قدرة عمل وتخطيطا وتصميما وتنفيذا مخصصا، فإن الرسوم المدفوعة عموما غير قابلة للاسترداد بعد بدء العمل.",
              "إذا تم إلغاء المشروع قبل بدء العمل، فقد تقدم لستار استردادا جزئيا بعد خصم التكاليف الإدارية وتكاليف القدرة المحجوزة.",
            ],
          },
          {
            title: "9. الملكية الفكرية وحقوق الاستخدام",
            body: [
              "بعد الدفع الكامل، يحصل العميل على حقوق الاستخدام المتفق عليها للمشروع المسلم لغرضه التجاري المقصود.",
              "حتى استلام الدفع الكامل، تبقى جميع التصاميم والأكواد والمفاهيم وملفات المصدر والمخرجات ملكا للستار. وتبقى أصول وأدوات وخطوط وإضافات وخدمات الأطراف الثالثة خاضعة لتراخيصها الخاصة.",
            ],
          },
          {
            title: "10. الضمان والعيوب",
            body: [
              "ستصحح لستار العيوب المؤكدة التي تختلف بشكل جوهري عن النطاق المتفق عليه ويتم الإبلاغ عنها بتفاصيل واضحة خلال فترة المراجعة أو الضمان المعمول بها.",
              "المشكلات الناتجة عن تغييرات طرف ثالث أو تعديلات العميل أو الاستضافة أو المتصفحات غير المدعومة أو الاستخدام غير الصحيح لا تعتبر عيوبا في عمل لستار.",
            ],
          },
          {
            title: "11. المسؤولية",
            body: [
              "لا تتحمل لستار مسؤولية الأضرار غير المباشرة أو الأرباح الفائتة أو توقف الأعمال أو فقدان البيانات أو أعطال خدمات الأطراف الثالثة إلا إذا تطلب القانون ذلك.",
              "يتحمل العميل مسؤولية النسخ الاحتياطي، أمان بيانات الوصول، الامتثال القانوني للمحتوى المقدم، والحصول على موافقات أصحاب المصلحة.",
            ],
          },
          {
            title: "12. السرية وحماية البيانات",
            body: [
              "يجب على الطرفين الحفاظ على سرية المعلومات التجارية والتقنية ومعلومات المشروع، ما لم يكن الإفصاح مطلوبا لتقديم الخدمة أو بموجب القانون.",
              "تتم معالجة البيانات الشخصية وفقا لقوانين الخصوصية المعمول بها وسياسة الخصوصية الخاصة بالموقع.",
            ],
          },
          {
            title: "13. أحكام ختامية",
            body: [
              "إذا أصبح أي بند من هذه الشروط غير صالح، تبقى البنود الأخرى نافذة.",
              "يفسر اتفاق المشروع وهذه الشروط وفقا للقانون المتفق عليه بين الطرفين، وإذا لم يحدد، فوفقا لقانون المقر الرئيسي لمقدم الخدمة.",
            ],
          },
        ],
        contactCta: {
          title: "هل لديك أسئلة حول هذه الشروط؟",
          body: "تواصل معنا قبل بدء المشروع وسنوضح الشروط التي تنطبق على حالتك.",
          button: "تواصل مع لستار",
        },
      },
      dataProtection: {
        title: "حماية البيانات",
        subtitle: "كيف تجمع لستار البيانات الشخصية وتستخدمها وتحميها وتخزنها عند استخدام موقعنا أو خدماتنا.",
        lastUpdated: "آخر تحديث: مايو 2026",
        intro:
          "توضح هذه الصفحة كيفية تعاملنا مع البيانات الشخصية المرتبطة بالموقع ونماذج التواصل والنشرات والتحليلات والتسويق ومشاريع العملاء.",
        sections: [
          {
            title: "1. الجهة المسؤولة",
            body: [
              "لستار مسؤولة عن معالجة البيانات الشخصية التي يتم جمعها عبر هذا الموقع وخدماتنا الرقمية، ما لم يتم تحديد جهة أخرى في اتفاق مشروع منفصل.",
              "يمكنك التواصل معنا بشأن طلبات الخصوصية أو حماية البيانات من خلال بيانات الاتصال المنشورة على الموقع.",
            ],
          },
          {
            title: "2. البيانات التي نجمعها",
            body: [
              "نجمع فقط البيانات اللازمة لتشغيل الموقع والرد على الطلبات وتقديم الخدمات وتحسين الأداء والامتثال للالتزامات القانونية.",
            ],
            bullets: [
              "بيانات الاتصال مثل الاسم والشركة والبريد الإلكتروني ورقم الهاتف ومحتوى الرسالة",
              "معلومات المشروع والملخصات والملفات والروابط وبيانات الوصول وسجل التواصل",
              "البيانات التقنية مثل عنوان IP والمتصفح والجهاز والصفحات التي تمت زيارتها والمصدر والتاريخ والوقت",
              "بيانات الاشتراك في النشرة وتفضيلات الموافقة على ملفات تعريف الارتباط",
            ],
          },
          {
            title: "3. أغراض المعالجة",
            body: [
              "نعالج البيانات الشخصية للتواصل مع المستخدمين والعملاء، إعداد العروض، تنفيذ المشاريع، إدارة الدعم، تحسين الموقع، إرسال التحديثات المطلوبة وحماية أنظمتنا.",
              "نحن لا نبيع البيانات الشخصية.",
            ],
          },
          {
            title: "4. ملفات تعريف الارتباط والموافقة",
            body: [
              "يستخدم موقعنا ملفات تعريف ارتباط ضرورية للوظائف الأساسية. ولا تستخدم الملفات الاختيارية للتفضيلات أو التحليلات أو التسويق إلا وفقا للاختيارات المحفوظة في إعدادات ملفات الارتباط.",
              "يمكنك تغيير اختيارات ملفات الارتباط في أي وقت من خلال زر إعدادات ملفات الارتباط على الموقع.",
            ],
          },
          {
            title: "5. التحليلات والتسويق",
            body: [
              "إذا تم تفعيل أدوات التحليلات أو التسويق، فقد تساعدنا في فهم استخدام الموقع وقياس الحملات وتحسين المحتوى. لا يتم تحميل هذه الأدوات إلا عند السماح بفئة الموافقة المناسبة.",
              "قد يعالج مزودو التحليلات والتسويق البيانات وفقا لشروط الخصوصية الخاصة بهم.",
            ],
          },
          {
            title: "6. الأساس القانوني",
            body: [
              "بحسب الحالة، قد تستند المعالجة إلى الموافقة أو تنفيذ عقد أو التواصل قبل التعاقد أو المصلحة المشروعة أو الالتزام القانوني.",
              "عندما تستند المعالجة إلى الموافقة، يمكنك سحب موافقتك في أي وقت دون التأثير على المعالجة التي تمت قبل السحب.",
            ],
          },
          {
            title: "7. المشاركة ومقدمو الخدمات",
            body: [
              "قد نشارك البيانات مع مقدمي خدمات موثوقين مثل الاستضافة والبريد الإلكتروني والتحليلات وCRM والدفع وإدارة المشاريع أو الدعم التقني عند الحاجة لتشغيل خدماتنا.",
              "نطلب من مقدمي الخدمات التعامل مع البيانات بأمان وللغرض المتفق عليه فقط.",
            ],
          },
          {
            title: "8. مدة الاحتفاظ",
            body: [
              "نحتفظ بالبيانات الشخصية فقط طوال المدة اللازمة للغرض الذي جمعت من أجله أو لتنفيذ العقد أو احتياجات العمل المشروعة أو الالتزامات القانونية.",
              "عندما لا تعود البيانات مطلوبة، يتم حذفها أو إخفاء هويتها حيثما كان ذلك ممكنا بشكل معقول.",
            ],
          },
          {
            title: "9. حقوقك",
            body: [
              "بحسب القانون المعمول به، قد يكون لك الحق في الوصول أو التصحيح أو الحذف أو التقييد أو الاعتراض على المعالجة أو طلب نقل البيانات أو سحب الموافقة.",
              "لممارسة هذه الحقوق، تواصل معنا مع معلومات كافية لتحديد طلبك.",
            ],
          },
          {
            title: "10. الأمان",
            body: [
              "نستخدم تدابير تقنية وتنظيمية لحماية البيانات الشخصية من الوصول غير المصرح به أو الفقدان أو سوء الاستخدام أو الإفصاح.",
              "لا يمكن ضمان أي خدمة عبر الإنترنت بشكل كامل، لذلك يجب على المستخدمين أيضا حماية أجهزتهم وكلمات المرور وبيانات الوصول.",
            ],
          },
          {
            title: "11. النقل الدولي",
            body: [
              "قد يعالج بعض مقدمي الخدمات البيانات خارج بلدك. وعند الحاجة، نستخدم ضمانات مناسبة أو آليات نقل معترف بها قانونيا.",
            ],
          },
          {
            title: "12. تحديث هذه الصفحة",
            body: [
              "قد نقوم بتحديث صفحة حماية البيانات هذه عندما تتغير خدماتنا أو أدواتنا أو القوانين أو عملياتنا الداخلية. أحدث نسخة متاحة دائما على هذه الصفحة.",
            ],
          },
        ],
        contactCta: {
          title: "طلب أو سؤال متعلق بالخصوصية؟",
          body: "تواصل معنا وسنساعدك في فهم أو إدارة حقوقك المتعلقة بحماية البيانات.",
          button: "تواصل مع لستار",
        },
      },
    },
    contact: {
      title: "اتصل بنا",
      subtitle: "سنرد خلال 1–2 يوم عمل.",
      nameLabel: "الاسم",
      companyLabel: "اسم الشركة",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "الهاتف",
      messageLabel: "الرسالة",
      send: "إرسال",
      success: "شكرًا لك! استلمنا رسالتك.",
      locationsTitle: "مواقعنا",
      locations: [
        { city: "طهران، إيران", address: "طهران، هروي، موسوي، رقم 50", phone: "021-22954114" },
        { city: "مينلو بارك، الولايات المتحدة", address: "1374 Willow Rd, Menlo Park, CA 94025, USA", phone: "+14792792424" },
        {
          city: "مسقط، عُمان",
          address: "2nd Floor, Office No. 20, Bin Hayl-1, Musqat 133, Oman",
          phone: "+97145842838",
        },
      ],
    },
    blogDetail: {
      tocTitle: "جدول المحتويات",
      noHeadings: "لا عناوين",
      readTimeSuffix: "دقيقة",
      share: {
        title: "مشاركة",
        linkedin: "لينكدإن",
        instagram: "إنستغرام",
        telegram: "تلغرام",
        facebook: "فيسبوك",
        email: "البريد",
        x: "X",
        copy: "نسخ الرابط",
        close: "إغلاق",
      },
      subscribe: {
        title: "اشترك",
        help: "احصل على أحدث المقالات في بريدك.",
        placeholder: "بريدك الإلكتروني",
        success: "تم الاشتراك!",
        buttonAria: "اشترك",
      },
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
          { label: "تصميم المواقع", href: "/ar/services/web-development" },
          { label: "خدمات SEO", href: "/ar/services/seo-aeo-geo" },
          { label: "إعلانات Google", href: "/ar/services/ad-campaigns" },
          { label: "الأعمال", href: "/ar/portfolio" },
          { label: "أحدث المقالات", href: "/ar/blog" },
          { label: "الشروط والأحكام", href: "/ar/terms" },
          { label: "حماية البيانات", href: "/ar/data-protection" },
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
