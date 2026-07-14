import { getPayload } from "payload"
import payloadConfig from "../payload.config"

type Locale = "en" | "fa" | "ar"

type PortfolioCopy = {
  title: string
  slug: string
  client: string
  excerpt: string
  body: string[]
}

type PortfolioEntry = Record<Locale, PortfolioCopy>

function lexicalDoc(paragraphs: string[], direction: "ltr" | "rtl") {
  return {
    root: {
      children: paragraphs.map((text) => ({
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text,
            type: "text",
            version: 1,
          },
        ],
        direction,
        format: "",
        indent: 0,
        textFormat: 0,
        textStyle: "",
        type: "paragraph",
        version: 1,
      })),
      direction,
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  }
}

const portfolioContent: Record<string, PortfolioEntry> = {
  arantouch: {
    en: {
      title: "Arantouch",
      slug: "arantouch",
      client: "AranTouch",
      excerpt:
        "A modern product website for Iran's first touch-system manufacturer, showcasing digital kiosks, touch stands, and interactive hardware.",
      body: [
        "AranTouch is a pioneer in designing and producing touch kiosks, stands, and tables for banks, retail, healthcare, and public spaces. Lastaar designed and developed a website that presents this technical product catalog clearly and professionally.",
        "We started with UX research to map how buyers, partners, and technical teams search for product information. The UI was built around AranTouch's brand identity, with structured product pages, technical specifications, galleries, and clear conversion paths for consultation requests.",
        "The frontend was developed for fast performance, responsive layouts, and SEO-ready structure. We also prepared the site for future multilingual expansion so the brand can reach broader markets.",
        "What we delivered: UX strategy, UI design, responsive web development, product information architecture, SEO foundations, and a scalable frontend ready for growth.",
      ],
    },
    fa: {
      title: "آران‌تاچ",
      slug: "arantouch",
      client: "آران‌تاچ",
      excerpt:
        "وب‌سایت محصول‌محور برای اولین تولیدکننده سیستم‌های لمسی ایران؛ معرفی کیوسک، استند و میز تاچ با ساختار حرفه‌ای.",
      body: [
        "آران‌تاچ پیشگام طراحی و تولید کیوسک‌های دیجیتال، استند و میز لمسی برای بانک‌ها، فروشگاه‌ها، مراکز درمانی و فضاهای عمومی است. لستار وب‌سایتی طراحی و توسعه داد که کاتالوگ فنی محصولات را شفاف و حرفه‌ای نمایش می‌دهد.",
        "کار را با تحلیل UX و شناخت مسیر جستجوی خریداران، نمایندگان و تیم‌های فنی آغاز کردیم. رابط کاربری بر پایه هویت بصری برند ساخته شد؛ با صفحات محصول ساختارمند، مشخصات فنی، گالری و مسیرهای مشاوره شفاف.",
        "فرانت‌اند برای عملکرد سریع، واکنش‌گرایی و ساختار مناسب سئو توسعه یافت. زیرساخت چندزبانه نیز برای گسترش آینده برند آماده شد.",
        "خدمات ارائه‌شده: استراتژی UX، طراحی UI، توسعه وب واکنش‌گرا، معماری اطلاعات محصولات، پایه سئو و فرانت‌اند مقیاس‌پذیر.",
      ],
    },
    ar: {
      title: "آران توش",
      slug: "arantouch",
      client: "آران توش",
      excerpt:
        "موقع منتجات حديث لأول مصنع لأنظمة اللمس في إيران، يعرض الكشك الرقمي والستاند والطاولات التفاعلية.",
      body: [
        "آران توش رائدة في تصميم وإنتاج كشكات اللمس والستاندات والطاولات للبنوك والتجزئة والرعاية الصحية والأماكن العامة. صممنا وطورنا موقعا يعرض الكتالوج التقني بوضوح واحتراف.",
        "بدأنا ببحث UX لفهم كيف يبحث المشترون والشركاء والفرق التقنية عن معلومات المنتجات. بُنيت الواجهة حول هوية العلامة، مع صفحات منتجات منظمة ومواصفات تقنية ومعارض ومسارات استشارة واضحة.",
        "طُور الواجهة الأمامية لأداء سريع وتخطيط متجاوب وبنية جاهزة لSEO، مع إعداد البنية للتوسع متعدد اللغات مستقبلا.",
        "ما قدمناه: استراتيجية UX، تصميم UI، تطوير ويب متجاوب، هندسة معلومات المنتجات، أساس SEO، وواجهة قابلة للتوسع.",
      ],
    },
  },
  techauto: {
    en: {
      title: "TecAuto",
      slug: "techauto",
      client: "TecAuto",
      excerpt:
        "A product-focused automotive technology website for smart vehicle systems, GPS trackers, and nationwide dealer support.",
      body: [
        "TecAuto needed a website that could explain complex automotive products simply, build trust with buyers, and help users find installation and support across Iran.",
        "Lastaar designed a clear UI for product categories such as smart clutch systems, GPS trackers, alarms, and multi-function vehicle devices. Each product page highlights benefits, technical details, FAQs, and practical use cases.",
        "We structured the site around lead generation: dealer locator, warranty information, support content, and news updates that answer common customer questions before purchase.",
        "What we delivered: UX planning, UI design, responsive frontend development, product page structure, and a scalable website foundation for an automotive technology brand.",
      ],
    },
    fa: {
      title: "تک‌اتو",
      slug: "techauto",
      client: "تک‌اتو",
      excerpt:
        "وب‌سایت فناوری خودرو برای معرفی محصولات هوشمند، ردیاب GPS و شبکه نمایندگی در سراسر کشور.",
      body: [
        "تک‌اتو به وب‌سایتی نیاز داشت که محصولات پیچیده خودرویی را ساده توضیح دهد، اعتماد بسازد و مسیر نصب و پشتیبانی را برای کاربران در سراسر ایران شفاف کند.",
        "لستار رابط کاربری روشنی برای دسته‌بندی محصولاتی مثل کلاچ هوشمند، ردیاب خودرو، دزدگیر و دستگاه‌های چندکاره طراحی کرد. هر صفحه محصول مزایا، جزئیات فنی، سوالات متداول و کاربردهای واقعی را برجسته می‌کند.",
        "ساختار سایت حول جذب لید طراحی شد: پیدا کردن نمایندگی، اطلاعات گارانتی، محتوای پشتیبانی و اخبار آموزشی برای پاسخ به سوالات قبل از خرید.",
        "خدمات ارائه‌شده: برنامه‌ریزی UX، طراحی UI، توسعه فرانت‌اند واکنش‌گرا، ساختار صفحات محصول و زیرساخت مقیاس‌پذیر برای برند فناوری خودرو.",
      ],
    },
    ar: {
      title: "تك أوتو",
      slug: "techauto",
      client: "تك أوتو",
      excerpt:
        "موقع تقنية سيارات يركز على الأنظمة الذكية وأجهزة التتبع وشبكة الوكلاء في أنحاء البلاد.",
      body: [
        "احتاج تك أوتو إلى موقع يشرح منتجات السيارات المعقدة ببساطة ويبني الثقة ويوضح مسار التركيب والدعم في جميع أنحاء إيران.",
        "صممنا واجهة واضحة لفئات مثل الكلاتش الذكي وأجهزة التتبع والإنذار والأجهزة متعددة الوظائف. كل صفحة منتج تبرز الفوائد والتفاصيل التقنية والأسئلة الشائعة وحالات الاستخدام.",
        "بُني الموقع حول توليد العملاء المحتملين: تحديد الوكلاء ومعلومات الضمان ومحتوى الدعم والأخبار التعليمية.",
        "ما قدمناه: تخطيط UX، تصميم UI، تطوير واجهة متجاوبة، هيكلة صفحات المنتجات، وبنية قابلة للتوسع لعلامة تقنية سيارات.",
      ],
    },
  },
  "dr-lahooti": {
    en: {
      title: "Dr Lahooti",
      slug: "dr-lahooti",
      client: "Dr. Ameneh Lahooti Eshkevari",
      excerpt:
        "A medical website for an infertility and IVF specialist with service pages, patient education, and online appointment support.",
      body: [
        "DrLahooti.com is the official website of Dr. Ameneh Lahooti Eshkevari, a gynecologist and infertility/IVF fellowship specialist. The goal was to help patients understand complex treatments and reach the right service faster.",
        "Lastaar designed a calm, trustworthy medical UI aligned with the doctor's brand. We structured the site around core services such as infertility diagnosis, IVF failure evaluation, PGS/PGD, fertility counseling, and couple consultations.",
        "The website includes educational articles, clear service landing pages, and appointment-focused user flows that reduce friction for new patients.",
        "What we delivered: UX research, UI design, responsive development, SEO optimization, content structure for medical services, and a patient-friendly website experience.",
      ],
    },
    fa: {
      title: "دکتر لاهوتی",
      slug: "dr-lahooti",
      client: "دکتر آمنه لاهوتی اشکوری",
      excerpt:
        "وب‌سایت پزشکی برای متخصص ناباروری و IVF با معرفی خدمات، محتوای آموزشی و مسیر نوبت‌دهی آنلاین.",
      body: [
        "DrLahooti.com وب‌سایت رسمی دکتر آمنه لاهوتی اشکوری، جراح و متخصص زنان و زایمان و فلوشیپ ناباروری و IVF است. هدف، کمک به بیماران برای درک درمان‌های تخصصی و دسترسی سریع‌تر به خدمات درست بود.",
        "لستار رابط کاربری آرام و قابل اعتماد متناسب با برند پزشکی طراحی کرد. ساختار سایت حول خدمات اصلی مانند تشخیص ناباروری، بررسی شکست IVF، PGS/PGD، مشاوره باروری و ویزیت زوج‌های نابارور شکل گرفت.",
        "سایت شامل مقالات آموزشی، صفحات خدمت شفاف و مسیرهای نوبت‌دهی است که اصطکاک بیماران تازه‌وارد را کاهش می‌دهد.",
        "خدمات ارائه‌شده: تحقیق UX، طراحی UI، توسعه واکنش‌گرا، بهینه‌سازی سئو، ساختار محتوای پزشکی و تجربه کاربری مناسب بیماران.",
      ],
    },
    ar: {
      title: "د. لاهوتي",
      slug: "dr-lahooti",
      client: "د. آمنه لاهوتي إشكوري",
      excerpt:
        "موقع طبي لأخصائية العقم وIVF مع صفحات خدمات ومحتوى تعليمي ومسار حجز مواعيد.",
      body: [
        "DrLahooti.com هو الموقع الرسمي للدكتورة آمنه لاهوتي إشكوري، جراحة وأخصائية نساء وتوليد وزمالة العقم وIVF. الهدف مساعدة المرضى على فهم العلاجات المعقدة والوصول للخدمة المناسبة بسرعة.",
        "صممنا واجهة طبية هادئة وموثوقة متوافقة مع هوية الطبيبة. بُني الموقع حول خدمات مثل تشخيص العقم وتقييم فشل IVF وPGS/PGD والاستشارات وزيارات الأزواج.",
        "يتضمن الموقع مقالات تعليمية وصفحات خدمات واضحة ومسارات حجز تقلل الاحتكاك للمرضى الجدد.",
        "ما قدمناه: بحث UX، تصميم UI، تطوير متجاوب، تحسين SEO، هيكلة محتوى طبي وتجربة مناسبة للمرضى.",
      ],
    },
  },
  "gilan-amlak": {
    en: {
      title: "Gilan Amlak",
      slug: "gilan-amlak",
      client: "Gilan Amlak",
      excerpt:
        "A real estate platform for buying, selling, and renting properties across Gilan with advanced search, listings, and VIP ads.",
      body: [
        "Gilan Amlak is one of the most complete property listing platforms in Gilan province. The business needed a website that could handle large inventory, city-based search, and both free and premium listing workflows.",
        "Lastaar designed a practical real estate UX with filters for city, neighborhood, property type, size, and transaction type. Users can browse featured VIP listings, explore high-traffic Rasht districts, and publish their own ads.",
        "We built a scalable property architecture covering apartments, villas, land, commercial units, and pre-sale projects across dozens of cities in Gilan.",
        "What we delivered: UX design, UI design, responsive frontend development, listing and search structure, VIP showcase sections, and a platform ready for ongoing property growth.",
      ],
    },
    fa: {
      title: "املاک گیلان",
      slug: "gilan-amlak",
      client: "گیلان املاک",
      excerpt:
        "پلتفرم املاک برای خرید، فروش و اجاره در استان گیلان با جستجوی پیشرفته، ثبت آگهی و ویترین VIP.",
      body: [
        "گیلان املاک یکی از کامل‌ترین پلتفرم‌های ثبت آگهی ملک در استان گیلان است. کسب‌وکار به وب‌سایتی نیاز داشت که موجودی گسترده، جستجوی شهری و فرایند آگهی رایگان و VIP را پوشش دهد.",
        "لستار UX کاربردی املاک طراحی کرد با فیلترهای شهر، منطقه، نوع ملک، متراژ و نوع معامله. کاربران می‌توانند آگهی‌های VIP را ببینند، مناطق پربازدید رشت را مرور کنند و آگهی خود را ثبت کنند.",
        "معماری املاک مقیاس‌پذیری ساختیم که آپارتمان، ویلا، زمین، واحد تجاری و پروژه‌های پیش‌فروش را در ده‌ها شهر گیلان پوشش می‌دهد.",
        "خدمات ارائه‌شده: طراحی UX، طراحی UI، توسعه فرانت‌اند واکنش‌گرا، ساختار جستجو و آگهی، بخش VIP و پلتفرمی آماده برای رشد مداوم فایل‌های ملکی.",
      ],
    },
    ar: {
      title: "جيلان أملاك",
      slug: "gilan-amlak",
      client: "جيلان أملاك",
      excerpt:
        "منصة عقارية للشراء والبيع والإيجار في جيلان مع بحث متقدم وإعلانات وقسم VIP.",
      body: [
        "جيلان أملاك من أكثر منصات العقارات اكتمالا في محافظة جيلان. احتاج العمل إلى موقع يدير مخزونا كبيرا وبحثا حسب المدينة ومسارات إعلانات مجانية وVIP.",
        "صممنا UX عمليا مع فلاتر للمدينة والمنطقة ونوع العقار والمساحة ونوع المعاملة. يمكن للمستخدمين تصفح إعلانات VIP واستكشاف مناطق رشت المزدحمة ونشر إعلاناتهم.",
        "بنينا بنية عقارية قابلة للتوسع تغطي الشقق والفيلات والأراضي والوحدات التجارية ومشاريع البيع المسبق في عشرات مدن جيلان.",
        "ما قدمناه: تصميم UX وUI، تطوير واجهة متجاوبة، هيكلة البحث والإعلانات، قسم VIP، ومنصة جاهزة لنمو العقارات.",
      ],
    },
  },
  diakoo: {
    en: {
      title: "Diakoo Shop",
      slug: "diakoo",
      client: "Diakoo Shop",
      excerpt:
        "An e-commerce website for a specialized gaming store selling consoles, games, and accessories with fast checkout and real support.",
      body: [
        "Diakoo Shop is a specialized store for video games, consoles, and gaming accessories. Lastaar designed and developed an online shop that helps gamers discover products quickly and buy with confidence.",
        "We structured the storefront around product categories such as games, consoles, and accessories, with featured sections for bestsellers, daily discounts, coming-soon products, and editorial content.",
        "The UX focuses on conversion: clear pricing, stock status, warranty labels, and purchase flows optimized for mobile shoppers.",
        "What we delivered: e-commerce UX, UI design, responsive frontend development, product catalog structure, promotional sections, and a blog area for gaming guides.",
      ],
    },
    fa: {
      title: "فروشگاه دیاکو",
      slug: "diakoo",
      client: "فروشگاه دیاکو",
      excerpt:
        "فروشگاه آنلاین تخصصی بازی و کنسول با دسته‌بندی محصولات، تخفیف‌ها و تجربه خرید سریع برای گیمرها.",
      body: [
        "فروشگاه دیاکو یک فروشگاه تخصصی بازی‌های ویدیویی، کنسول و لوازم جانبی است. لستار فروشگاه آنلاینی طراحی و توسعه داد که به گیمرها کمک می‌کند سریع‌تر محصول مناسب را پیدا و با اطمینان خرید کنند.",
        "ساختار فروشگاه حول دسته‌بندی بازی‌ها، کنسول‌ها و لوازم جانبی شکل گرفت؛ با بخش‌های پرفروش، تخفیف روزانه، به‌زودی و مجله محتوایی.",
        "تجربه کاربری روی تبدیل متمرکز است: قیمت شفاف، وضعیت موجودی، برچسب گارانتی و مسیر خرید بهینه برای موبایل.",
        "خدمات ارائه‌شده: UX فروشگاهی، طراحی UI، توسعه فرانت‌اند واکنش‌گرا، ساختار کاتالوگ محصولات، بخش‌های پروموشن و بلاگ راهنمای خرید.",
      ],
    },
    ar: {
      title: "متجر دياكو",
      slug: "diakoo",
      client: "متجر دياكو",
      excerpt:
        "متجر إلكتروني متخصص في الألعاب وأجهزة الألعاب والإكسسوارات مع تجربة شراء سريعة ودعم حقيقي.",
      body: [
        "متجر دياكو متجر متخصص في ألعاب الفيديو وأجهزة الألعاب وملحقات الألعاب. صممنا وطورنا متجرا يساعد اللاعبين على اكتشاف المنتجات والشراء بثقة.",
        "بُني المتجر حول فئات الألعاب والأجهزة والإكسسوارات، مع أقسام للأكثر مبيعا والخصومات والمحتوى التحريري.",
        "يركز UX على التحويل: أسعار واضحة وحالة المخزون ومسارات شراء محسنة للجوال.",
        "ما قدمناه: UX تجارة إلكترونية، تصميم UI، تطوير واجهة متجاوبة، هيكلة كتالوج المنتجات، وأقسام ترويجية ومدونة.",
      ],
    },
  },
  steelchi: {
    en: {
      title: "Steelchi",
      slug: "steelchi",
      client: "Steelchi Company",
      excerpt:
        "A corporate website for a steel industry brand focused on products, capabilities, and B2B trust.",
      body: [
        "Steelchi needed a professional digital presence that could present its steel products, industrial capabilities, and company credibility to business buyers.",
        "Lastaar designed a clean industrial UI with structured sections for products, services, projects, and company information, making technical content easier to scan.",
        "The website was built with responsive layouts, strong typography, and a content structure suitable for B2B lead generation and long-term brand positioning.",
        "What we delivered: corporate UX, UI design, responsive web development, industrial content structure, and a scalable website foundation for a steel brand.",
      ],
    },
    fa: {
      title: "استیل‌چی",
      slug: "steelchi",
      client: "شرکت استیل‌چی",
      excerpt:
        "وب‌سایت شرکتی برای برند صنعت فولاد با تمرکز بر محصولات، توانمندی‌ها و اعتماد B2B.",
      body: [
        "استیل‌چی به حضور دیجیتال حرفه‌ای نیاز داشت که محصولات فولادی، توانمندی‌های صنعتی و اعتبار شرکت را برای خریداران تجاری به‌خوبی نمایش دهد.",
        "لستار رابط کاربری صنعتی تمیزی طراحی کرد با بخش‌های ساختارمند محصولات، خدمات، پروژه‌ها و معرفی شرکت تا محتوای فنی راحت‌تر خوانده شود.",
        "وب‌سایت با چیدمان واکنش‌گرا، تایپوگرافی قوی و ساختار محتوایی مناسب جذب لید B2B و جایگاه‌سازی بلندمدت برند توسعه یافت.",
        "خدمات ارائه‌شده: UX شرکتی، طراحی UI، توسعه وب واکنش‌گرا، ساختار محتوای صنعتی و زیرساخت مقیاس‌پذیر برای برند فولاد.",
      ],
    },
    ar: {
      title: "ستيل تشي",
      slug: "steelchi",
      client: "شركة ستيل تشي",
      excerpt:
        "موقع مؤسسي لعلامة صناعية في قطاع الحديد يركز على المنتجات والقدرات وثقة B2B.",
      body: [
        "احتاجت ستيل تشي إلى حضور رقمي احترافي يعرض منتجات الحديد والقدرات الصناعية ومصداقية الشركة للمشترين التجاريين.",
        "صممنا واجهة صناعية نظيفة بأقسام منظمة للمنتجات والخدمات والمشاريع ومعلومات الشركة.",
        "طُور الموقع بتخطيط متجاوب وبنية محتوى مناسبة لتوليد العملاء وموقع العلامة على المدى الطويل.",
        "ما قدمناه: UX مؤسسي، تصميم UI، تطوير ويب متجاوب، هيكلة محتوى صناعي، وبنية قابلة للتوسع.",
      ],
    },
  },
  partix: {
    en: {
      title: "Partix",
      slug: "partix",
      client: "Partix",
      excerpt:
        "A kids party and celebration platform combining themed events, toys, treats, and online shopping in Oman.",
      body: [
        "Partix brings together children's celebrations, party themes, toys, cookies, balloons, and premium event services in one experience-led platform.",
        "Lastaar designed a playful but polished e-commerce UI with themed party collections, product categories, bestsellers, and content for parents planning memorable events.",
        "The website supports both shopping and inspiration: users can explore party themes, browse products, and move smoothly from discovery to purchase.",
        "What we delivered: experience-led UX, UI design, responsive storefront development, themed product structure, and a family-friendly brand presentation.",
      ],
    },
    fa: {
      title: "پارتیکس",
      slug: "partix",
      client: "برگزارکننده مراسم",
      excerpt:
        "پلتفرم جشن و مراسم کودک با تم‌های پارتى، اسباب‌بازی، خوراکی و فروش آنلاین در عمان.",
      body: [
        "پارتیکس جشن‌های کودک، تم‌های مراسم، اسباب‌بازی، شیرینی، بادکنک و خدمات پریمیوم رویداد را در یک پلتفرم تجربه‌محور کنار هم آورده است.",
        "لستار رابط کاربری فروشگاهی شاد اما حرفه‌ای طراحی کرد با مجموعه تم‌های پارتى، دسته‌بندی محصولات، پرفروش‌ها و محتوا برای والدین.",
        "وب‌سایت هم خرید و هم الهام‌بخشی را پوشش می‌دهد: کاربران تم‌ها را می‌بینند، محصولات را مرور می‌کنند و از کشف تا خرید مسیر روانی دارند.",
        "خدمات ارائه‌شده: UX تجربه‌محور، طراحی UI، توسعه فروشگاه واکنش‌گرا، ساختار محصولات تم‌دار و ارائه برند دوستدار خانواده.",
      ],
    },
    ar: {
      title: "بارتيكس",
      slug: "partix",
      client: "منظم فعاليات",
      excerpt:
        "منصة احتفالات وأعياد للأطفال تجمع الثيمات والألعاب والحلويات والتسوق الإلكتروني في عمان.",
      body: [
        "تجمع بارتيكس احتفالات الأطفال وثيمات الحفلات والألعاب والحلويات والبالونات وخدمات الفعاليات المميزة في منصة واحدة.",
        "صممنا واجهة تجارة إلكترونية مرحة واحترافية مع مجموعات ثيمات وأقسام منتجات وأكثر المنتجات مبيعا ومحتوى للآباء.",
        "يدعم الموقع التسوق والإلهام معا: استكشاف الثيمات وتصفح المنتجات والانتقال بسلاسة إلى الشراء.",
        "ما قدمناه: UX قائم على التجربة، تصميم UI، تطوير متجر متجاوب، هيكلة منتجات موضوعية، وعرض علامة مناسبة للعائلات.",
      ],
    },
  },
  nvco: {
    en: {
      title: "NVCo",
      slug: "nvco",
      client: "Noor Vijeh Company",
      excerpt:
        "A corporate website for Iran's pioneering private reverse osmosis desalination company and its nationwide water projects.",
      body: [
        "Noor Vijeh Company (NVCo) is a pioneer in Iran's reverse osmosis desalination industry, with major plants across Qom, Asaluyeh, Bushehr, Chabahar, Kangan, and more.",
        "Lastaar designed a corporate website that communicates engineering credibility, project scale, consultancy services, certifications, and the company's national infrastructure role.",
        "The information architecture highlights major desalination projects, multimedia content, contact points, and the company's long track record in water treatment and distribution.",
        "What we delivered: corporate UX, UI design, responsive development, project showcase structure, and a professional digital presence for an infrastructure brand.",
      ],
    },
    fa: {
      title: "نور ویژه",
      slug: "nvco",
      client: "شرکت نور ویژه",
      excerpt:
        "وب‌سایت شرکتی برای پیشگام شیرین‌سازی آب با RO در ایران و معرفی پروژه‌های ملی آب در سراسر کشور.",
      body: [
        "شرکت نور ویژه (NVCo) پیشگام صنعت شیرین‌سازی آب با اسمز معکوس در ایران است و پروژه‌های بزرگی در قم، عسلویه، بوشهر، چابهار، کنگان و دیگر نقاط دارد.",
        "لستار وب‌سایت شرکتی طراحی کرد که اعتبار مهندسی، مقیاس پروژه‌ها، خدمات مشاوره، گواهی‌نامه‌ها و نقش زیرساختی شرکت را شفاف منتقل کند.",
        "معماری اطلاعات بر پروژه‌های شیرین‌سازی، چندرسانه‌ای، اطلاعات تماس و سابقه بلند شرکت در تصفیه و توزیع آب متمرکز است.",
        "خدمات ارائه‌شده: UX شرکتی، طراحی UI، توسعه واکنش‌گرا، ساختار نمایش پروژه‌ها و حضور دیجیتال حرفه‌ای برای برند زیرساختی.",
      ],
    },
    ar: {
      title: "نور فيجه",
      slug: "nvco",
      client: "شركة نور فيجه",
      excerpt:
        "موقع مؤسسي لشركة رائدة في تحلية المياه بتقنية RO في إيران ومشاريعها الوطنية.",
      body: [
        "شركة نور فيجه (NVCo) رائدة في صناعة تحلية المياح بالانجذاب العكسي في إيران، ولديها محطات كبرى في قم وعسلويه وبوشهر وغيرها.",
        "صممنا موقعا مؤسسيا يوضح المصداقية الهندسية ونطاق المشاريع والخدمات الاستشارية والشهادات والدور البنيوي للشركة.",
        "تركز هندسة المعلومات على عرض مشاريع التحلية والوسائط ونقاط التواصل وتاريخ الشركة في معالجة وتوزيع المياه.",
        "ما قدمناه: UX مؤسسي، تصميم UI، تطوير متجاوب، هيكلة عرض المشاريع، وحضور رقمي احترافي لعلامة بنية تحتية.",
      ],
    },
  },
}

async function main() {
  const payload = await getPayload({ config: payloadConfig })
  const { docs } = await payload.find({
    collection: "portfolio" as any,
    limit: 100,
    depth: 0,
    overrideAccess: true,
  })

  for (const item of docs) {
    const slug = item.slug as string
    const content = portfolioContent[slug]
    if (!content) {
      console.log(`Skipping unknown portfolio slug: ${slug}`)
      continue
    }

    for (const locale of ["en", "fa", "ar"] as const) {
      const copy = content[locale]
      const direction = locale === "en" ? "ltr" : "rtl"

      await payload.update({
        id: item.id,
        collection: "portfolio" as any,
        locale,
        data: {
          title: copy.title,
          slug: copy.slug,
          client: copy.client,
          excerpt: copy.excerpt,
          body: lexicalDoc(copy.body, direction),
        },
        overrideAccess: true,
      })

      console.log(`Updated ${slug} (${locale})`)
    }
  }

  console.log("Portfolio content update complete.")
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
