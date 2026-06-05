import Link from "next/link"
import { ExternalLink, Quote, Star } from "lucide-react"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { isRTL, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const googleMapsUrl =
  "https://www.google.com/maps/place/Lastaar+%7C+%D9%84%D8%B3%D8%AA%D8%A7%D8%B1%E2%80%AD/@35.7659198,51.4769061,17z/data=!3m1!4b1!4m6!3m5!1s0x3f8e05ee0654343b:0x652d02d8db699746!8m2!3d35.7659155!4d51.479481!16s%2Fg%2F11tsp59ygr?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D"

const labels: Record<
  Locale,
  {
    eyebrow: string
    title: string
    subtitle: string
    rating: string
    source: string
    viewAll: string
    previous: string
    next: string
    readFull: string
    fullReview: string
    yearAgo: string
    sevenMonthsAgo: string
    recently: string
    fiveYearsAgo: string
    threeYearsAgo: string
    fourYearsAgo: string
  }
> = {
  en: {
    eyebrow: "Google Reviews",
    title: "Trusted by clients who build seriously",
    subtitle: "Real feedback from teams and founders who worked with Lastaar on websites, SEO, and digital growth.",
    rating: "5.0 average rating",
    source: "Verified on Google Maps",
    viewAll: "View reviews on Google",
    previous: "Previous reviews",
    next: "Next reviews",
    readFull: "Read full review",
    fullReview: "Full Google review",
    yearAgo: "a year ago",
    sevenMonthsAgo: "7 months ago",
    recently: "Recently",
    fiveYearsAgo: "5 years ago",
    threeYearsAgo: "3 years ago",
    fourYearsAgo: "4 years ago",
  },
  fa: {
    eyebrow: "نظرات گوگل",
    title: "مورد اعتماد مشتریانی که جدی رشد می‌کنند",
    subtitle: "بازخورد واقعی از تیم‌ها و بنیان‌گذارانی که با لستار روی وب‌سایت، سئو و رشد دیجیتال همکاری کرده‌اند.",
    rating: "میانگین امتیاز ۵.۰",
    source: "تایید شده در Google Maps",
    viewAll: "مشاهده نظرات در گوگل",
    previous: "نظرات قبلی",
    next: "نظرات بعدی",
    readFull: "خواندن نظر کامل",
    fullReview: "نظر کامل گوگل",
    yearAgo: "یک سال پیش",
    sevenMonthsAgo: "۷ ماه پیش",
    recently: "به‌تازگی",
    fiveYearsAgo: "۵ سال پیش",
    threeYearsAgo: "۳ سال پیش",
    fourYearsAgo: "۴ سال پیش",
  },
  ar: {
    eyebrow: "مراجعات Google",
    title: "موثوق بنا من عملاء يبنون بجدية",
    subtitle: "آراء حقيقية من فرق ومؤسسين عملوا مع لستار على المواقع وSEO والنمو الرقمي.",
    rating: "متوسط تقييم 5.0",
    source: "موثق على Google Maps",
    viewAll: "عرض المراجعات على Google",
    previous: "المراجعات السابقة",
    next: "المراجعات التالية",
    readFull: "قراءة المراجعة كاملة",
    fullReview: "مراجعة Google كاملة",
    yearAgo: "قبل سنة",
    sevenMonthsAgo: "قبل 7 أشهر",
    recently: "مؤخرا",
    fiveYearsAgo: "قبل 5 سنوات",
    threeYearsAgo: "قبل 3 سنوات",
    fourYearsAgo: "قبل 4 سنوات",
  },
}

const reviews = [
  {
    name: { en: "Mahtab Kheiri", fa: "مهتاب خیری", ar: "مهتاب خيري" },
    meta: {
      en: "CEO, DanaTrips",
      fa: "مدیر عامل داناتریپس",
      ar: "الرئيس التنفيذي، DanaTrips",
    },
    timeKey: "fiveYearsAgo",
    text: {
      en: "I am always satisfied with your services! I have known you for many years and greatly appreciate your professionalism, punctuality, and attention to detail. They truly make a difference!",
      fa: "همیشه از خدمات شما راضی هستم! سال‌هاست شما را می‌شناسم و حرفه‌ای بودن، وقت‌شناسی و توجه شما به جزئیات را عمیقاً قدر می‌کنم. واقعاً فرق می‌گذارند!",
      ar: "أنا راض دائما عن خدماتكم! أعرفكم منذ سنوات عديدة وأقدّر كثيرا احترافكم والتزامكم بالمواعيد واهتمامكم بالتفاصيل. إنها تصنع الفرق حقا!",
    },
  },
  {
    name: { en: "Dr Ramin Ajami", fa: "دکتر رامین عجمی", ar: "د. رامين عجمي" },
    meta: {
      en: "CEO, Omid Genetics",
      fa: "مدیر عامل امید ژنتیک",
      ar: "الرئيس التنفيذي، Omid Genetics",
    },
    timeKey: "yearAgo",
    text: {
      en: "I had an excellent experience working with Mr. Akrami on the design of my company's website. His professionalism, creativity, and attention to detail were evident throughout the project. He delivered high-quality work on schedule, demonstrating strong time management and reliability. Mr. Akrami understood our vision perfectly and translated it into a modern, functional, and visually impressive website. I highly recommend him for any professional web design projects.",
      fa: "تجربه بسیار خوبی از همکاری با آقای اکرمی برای طراحی وب‌سایت شرکت خود داشتم. حرفه‌ای بودن، خلاقیت و توجه ایشان به جزئیات در تمام مراحل پروژه کاملا مشخص بود. کار باکیفیت را طبق زمان‌بندی تحویل دادند و مدیریت زمان و قابل‌اعتماد بودن بالایی نشان دادند. آقای اکرمی چشم‌انداز ما را به‌خوبی درک کرد و آن را به وب‌سایتی مدرن، کاربردی و از نظر بصری چشمگیر تبدیل کرد. ایشان را برای هر پروژه حرفه‌ای طراحی وب شدیدا توصیه می‌کنم.",
      ar: "كانت لدي تجربة ممتازة في العمل مع السيد أكرمي على تصميم موقع شركتي. ظهرت احترافيته وإبداعه واهتمامه بالتفاصيل طوال المشروع. سلّم عملا عالي الجودة في الموعد المحدد، مع إدارة وقت قوية وموثوقية واضحة. فهم السيد أكرمي رؤيتنا تماما وحولها إلى موقع حديث وعملي ومبهر بصريا. أوصي به بشدة لأي مشروع تصميم ويب احترافي.",
    },
  },
  {
    name: { en: "Dr. Lahouti", fa: "دکتر لاهوتی", ar: "د. لاهوتي" },
    meta: {
      en: "Surgeon & OB-GYN specialist",
      fa: "جراح و متخصص زنان و زایمان",
      ar: "جراح وأخصائي أمراض النساء والتوليد",
    },
    timeKey: "threeYearsAgo",
    text: {
      en: "The Lastaar team is young, goal-driven, fair, receptive to feedback, growing, and delivers high-quality work. I am very happy to collaborate with this group.",
      fa: "تیم لستار یک تیم جوان، هدفمند، منصف، انتقاد پذیر رو به رشد و با کیفیت کاری خوب هستند و از همکاری با این گروه بسیار خرسندم.",
      ar: "فريق لستار شاب وموجه للأهداف وعادل ومنفتح على النقد وفي نمو وجودة عمل جيدة، وسعيد جدا بالتعاون مع هذه المجموعة.",
    },
  },
  {
    name: { en: "Sepehr Rajabi", fa: "سپهر رجبی", ar: "سپهر رجبي" },
    meta: {
      en: "CEO, Arantouch",
      fa: "مدیر عامل آران‌تاچ",
      ar: "الرئيس التنفيذي، آرانتوتش",
    },
    timeKey: "fourYearsAgo",
    text: {
      en: "Thank you very much for the care and attention you invested in the website; this project is—and will remain—indebted to the Lastaar team’s effort and dedication.",
      fa: "بسیار از توجه و دقت‌نظری که در وب‌سایت به کار بردید سپاسگزارم؛ این پروژه قطعاً مدیون تلاش‌ها و توجه تیم لستار است.",
      ar: "شكرا جزيلا على العناية والاهتمام الذي بذلتموه في الموقع؛ هذا المشروع مدين بلا شك لجهود فريق لستار واهتمامه.",
    },
  },
  {
    name: { en: "Farzad Forouhi", fa: "فرزاد فروهی", ar: "فرزاد فروهي" },
    meta: {
      en: "CEO, Penohyd",
      fa: "مدیر عامل پنو هید",
      ar: "الرئيس التنفيذي، Penohyd",
    },
    timeKey: "sevenMonthsAgo",
    text: {
      en: "This is the best team i have ever work. They work basicly and structural on your site. I am truly satisfied.",
      fa: "این بهترین تیمی است که تا حالا با آن کار کرده‌ام. آن‌ها روی سایت شما اصولی و ساختارمند کار می‌کنند. من واقعا راضی هستم.",
      ar: "هذا أفضل فريق عملت معه على الإطلاق. يعملون على موقعك بطريقة أساسية ومنظمة. أنا راض جدا.",
    },
  },
  {
    name: { en: "Saman Nooraei", fa: "سامان نورایی", ar: "سامان نورائي" },
    meta: {
      en: "Senior Graphic Designer",
      fa: "طراح گرافیک ارشد",
      ar: "مصمم جرافيك كبير",
    },
    timeKey: "yearAgo",
    text: {
      en: "I have known Iman for years and had an excellent, seamless experience working with him on my personal website development few years ago. He and his team in Lastaar are highly professional and skilled in their work.",
      fa: "سال‌هاست ایمان را می‌شناسم و چند سال پیش تجربه‌ای عالی و بدون دردسر در همکاری با او برای توسعه وب‌سایت شخصی‌ام داشتم. او و تیمش در لستار بسیار حرفه‌ای و در کار خود ماهر هستند.",
      ar: "أعرف إيمان منذ سنوات، وكانت لدي تجربة ممتازة وسلسة في العمل معه على تطوير موقعي الشخصي قبل عدة سنوات. هو وفريقه في لستار محترفون جدا ومهرة في عملهم.",
    },
  },
  {
    name: { en: "Salar Azmoon", fa: "سالار آزمون", ar: "سالار آزمون" },
    meta: {
      en: "Architecture Engineer",
      fa: "مهندس معمار",
      ar: "مهندس معماري",
    },
    timeKey: "yearAgo",
    text: {
      en: "We worked with many companies, but the difference with the Lestar team was that they manage and engineer the project, and I didn't see this discipline and principles in any of the previous companies. Thanks to dear engineer Akrami and their efforts",
      fa: "ما با شرکت‌های زیادی کار کرده‌ایم، اما تفاوت تیم لستار این بود که پروژه را مدیریت و مهندسی می‌کنند؛ این نظم و اصول را در هیچ‌کدام از شرکت‌های قبلی ندیده بودم. با تشکر از مهندس عزیز آقای اکرمی و تلاش‌هایشان.",
      ar: "عملنا مع شركات كثيرة، لكن الفرق مع فريق لستار أنهم يديرون المشروع ويهندسونه، ولم أر هذا الانضباط وهذه المبادئ في أي شركة سابقة. شكرا للمهندس العزيز أكرمي ولجهودهم.",
    },
  },
  {
    name: { en: "Mohammad Javad Moslehi", fa: "محمدجواد مصلحی", ar: "محمد جواد مصلحي" },
    meta: {
      en: "CEO, Sanat Palayesh",
      fa: "مدیر عامل صنعت پالایش",
      ar: "الرئيس التنفيذي، Sanat Palayesh",
    },
    timeKey: "yearAgo",
    text: {
      en: "The knowledgeable team is fully aware of the world of web and SEO. They are attentive and work together to get the job done in the best way. We have been in contact with this team for more than 4 years and are completely satisfied. Goodluck",
      fa: "تیم آگاه و متخصصی هستند و کاملا به دنیای وب و سئو مسلط‌اند. دقیق و همراه هستند و برای انجام کار به بهترین شکل با هم تلاش می‌کنند. بیش از ۴ سال است با این تیم در ارتباط هستیم و کاملا راضی‌ایم. موفق باشید.",
      ar: "فريق knowledgeable ومتمكن وواع تماما بعالم الويب وSEO. يهتمون بالتفاصيل ويعملون معا لإنجاز العمل بأفضل طريقة. نحن على تواصل مع هذا الفريق منذ أكثر من 4 سنوات وراضون تماما. بالتوفيق.",
    },
  },
  {
    name: { en: "Sam Ravanbakhsh", fa: "سام روان‌بخش", ar: "سام روان‌بخش" },
    meta: {
      en: "CEO, CocoFamily",
      fa: "مدیر عامل CocoFamily",
      ar: "الرئيس التنفيذي، CocoFamily",
    },
    timeKey: "yearAgo",
    text: {
      en: "Professional team and excellent support. I have been working with them for almost 3 years and I am very satisfied.",
      fa: "تیم حرفه‌ای و پشتیبانی عالی. نزدیک به ۳ سال است با آن‌ها کار می‌کنم و بسیار راضی هستم.",
      ar: "فريق محترف ودعم ممتاز. أعمل معهم منذ ما يقارب 3 سنوات وأنا راض جدا.",
    },
  },
  {
    name: { en: "Reza Mehrabian", fa: "رضا مهرابیان", ar: "رضا مهرابيان" },
    meta: {
      en: "Senior Sound Engineer",
      fa: "مهندس صدای ارشد",
      ar: "مهندس صوت أول",
    },
    timeKey: "yearAgo",
    text: {
      en: "How different and fascinating everything is. I really wish this was my website. Thank you so much.",
      fa: "همه چیز چقدر متفاوت و جذاب است. واقعا آرزو داشتم این وب‌سایت برای من بود. بسیار ممنونم.",
      ar: "كم أن كل شيء مختلف ومبهر. تمنيت حقا لو كان هذا موقعي. شكرا جزيلا.",
    },
  },
  {
    name: { en: "Hamidreza Bahrami", fa: "حمیدرضا بهرامی", ar: "حميدرضا بهرامي" },
    meta: {
      en: "CEO, Arka Ceramic",
      fa: "مدیر عامل آرکا سرامیک",
      ar: "الرئيس التنفيذي، أركا سيراميك",
    },
    timeKey: "yearAgo",
    text: {
      en: "It was great working with you, thank you for your great team.",
      fa: "همکاری با شما عالی بود، از تیم فوق‌العاده‌تان ممنونم.",
      ar: "كان العمل معكم رائعا، شكرا لفريقكم الرائع.",
    },
  },
] as const

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

export function GoogleReviews({ locale }: { locale: Locale }) {
  const rtl = isRTL(locale)
  const t = labels[locale]

  return (
    <section className="py-16 md:py-24" dir={rtl ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <RevealOnScroll start="top 88%" end="bottom 16%">
          <div className="relative overflow-hidden rounded-3xl border bg-card/60 p-6 shadow-sm backdrop-blur md:p-8">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-primary">{t.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h2>
                <p className="mt-3 text-muted-foreground">{t.subtitle}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="rounded-2xl border bg-background/70 px-4 py-3">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-1 text-sm font-medium">{t.rating}</p>
                  <p className="text-xs text-muted-foreground">{t.source}</p>
                </div>
                <Link
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                  {t.viewAll}
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-8" start="top 88%" end="bottom 16%">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              direction: rtl ? "rtl" : "ltr",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 items-stretch">
              {reviews.map((review, index) => (
                <CarouselItem key={`${review.name.en}-${index}`} className="basis-full pl-4 md:basis-1/2 xl:basis-1/3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="group relative flex h-full min-h-[260px] w-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-background/70 p-5 text-start shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                      >
                        <div aria-hidden className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
                        <div className="relative flex items-start gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary ring-1 ring-primary/20">
                            {initials(review.name[locale])}
                          </div>
                          <div className="min-w-0">
                            <h3 className="truncate text-base font-semibold">{review.name[locale]}</h3>
                            <p className="truncate text-xs text-muted-foreground">{review.meta[locale]}</p>
                          </div>
                          <Quote className={cn("ms-auto h-5 w-5 shrink-0 text-primary/50", rtl && "scale-x-[-1]")} />
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                          <div className="flex items-center gap-0.5 text-yellow-500">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <Star key={starIndex} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{t[review.timeKey]}</span>
                        </div>
                        <p className="mt-4 line-clamp-4 text-sm leading-7 text-muted-foreground">{review.text[locale]}</p>
                        <span className="mt-auto pt-4 text-sm font-medium text-primary">{t.readFull}</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent
                      className="max-h-[min(760px,calc(100vh-2rem))] overflow-y-auto border-0 bg-transparent p-0 shadow-none sm:max-w-2xl"
                      dir={rtl ? "rtl" : "ltr"}
                    >
                      <div className="relative rounded-3xl border bg-card p-6 shadow-sm backdrop-blur md:p-8">
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
                        >
                          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />
                          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
                        </div>
                        <div className="relative flex flex-col gap-6">
                          <DialogHeader className={cn("text-start", rtl && "sm:text-right")}>
                            <DialogTitle>{review.name[locale]}</DialogTitle>
                            <DialogDescription>{t.fullReview}</DialogDescription>
                          </DialogHeader>
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary ring-1 ring-primary/20">
                              {initials(review.name[locale])}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm text-muted-foreground">{review.meta[locale]}</p>
                              <div className={cn("mt-1 flex items-center gap-2", rtl && "flex-row-reverse justify-end")}>
                                <div className="flex items-center gap-0.5 text-yellow-500">
                                  {Array.from({ length: 5 }).map((_, starIndex) => (
                                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">{t[review.timeKey]}</span>
                              </div>
                            </div>
                          </div>
                          <p className={cn("text-sm leading-8 text-muted-foreground", rtl && "text-right")}>
                            {review.text[locale]}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-5 flex items-center justify-center gap-3">
              <CarouselPrevious
                aria-label={t.previous}
                className="static size-9 translate-x-0 translate-y-0 border-primary/30 bg-background/80 hover:bg-primary hover:text-primary-foreground"
              />
              <CarouselNext
                aria-label={t.next}
                className="static size-9 translate-x-0 translate-y-0 border-primary/30 bg-background/80 hover:bg-primary hover:text-primary-foreground"
              />
            </div>
          </Carousel>
        </RevealOnScroll>
      </div>
    </section>
  )
}
