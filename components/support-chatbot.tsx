"use client"

import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Bot, MessageCircleMore, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { isRTL, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type ServiceItem = { title: string; desc: string; cta: string; href: string }
type Office = { email: string; phone: string; mobile: string }
type Message = { role: "bot" | "user"; text: string }

const copy: Record<
  Locale,
  {
    title: string
    subtitle: string
    placeholder: string
    open: string
    contact: string
    services: string
    starter: string
    quick: string[]
    answers: {
      greeting: string
      services: string
      pricing: string
      timing: string
      contact: string
      default: string
    }
  }
> = {
  en: {
    title: "Support Assistant",
    subtitle: "Ask about services, pricing, timelines, or how to start.",
    placeholder: "Type your question...",
    open: "Open support chat",
    contact: "Contact us",
    services: "View services",
    starter: "Hi. I can help you choose a service, understand pricing, or connect you with the team.",
    quick: ["What services do you offer?", "How much does a website cost?", "How do I start?"],
    answers: {
      greeting: "Hi. Tell me what you want to build and I will point you to the right next step.",
      services: "We help with web development, design, SEO/AEO/GEO, and ad campaigns. You can open Services to compare all options.",
      pricing: "Pricing depends on scope. Service pages include starting prices, and the fastest way to get an accurate quote is to send your project details through the contact form.",
      timing: "A focused landing page can take a few weeks. Larger websites, SEO programs, and campaigns depend on scope, content, and approval speed.",
      contact: "You can contact the team by form, email, or phone. Use the Contact button below and share your goals, timeline, and budget.",
      default: "I may not have enough detail for that. Please describe your project, or use the Contact button so the team can reply directly.",
    },
  },
  fa: {
    title: "دستیار پشتیبانی",
    subtitle: "درباره خدمات، قیمت، زمان‌بندی یا شروع همکاری بپرسید.",
    placeholder: "سوال خود را بنویسید...",
    open: "باز کردن چت پشتیبانی",
    contact: "تماس با ما",
    services: "مشاهده خدمات",
    starter: "سلام. می‌توانم برای انتخاب سرویس، بررسی قیمت یا ارتباط با تیم راهنمایی‌تان کنم.",
    quick: ["چه خدماتی دارید؟", "هزینه طراحی سایت چقدر است؟", "چطور شروع کنم؟"],
    answers: {
      greeting: "سلام. بگویید چه چیزی می‌خواهید بسازید تا مسیر مناسب را پیشنهاد کنم.",
      services: "ما در توسعه وب، طراحی، SEO/AEO/GEO و کمپین‌های تبلیغاتی کمک می‌کنیم. برای مقایسه کامل، صفحه خدمات را ببینید.",
      pricing: "قیمت به دامنه پروژه بستگی دارد. در صفحات خدمات قیمت‌های شروع درج شده و برای برآورد دقیق بهتر است جزئیات پروژه را از فرم تماس ارسال کنید.",
      timing: "یک لندینگ متمرکز معمولا چند هفته زمان می‌برد. پروژه‌های بزرگ‌تر به دامنه کار، محتوا و سرعت تاییدها بستگی دارند.",
      contact: "می‌توانید از طریق فرم، ایمیل یا تلفن با تیم در ارتباط باشید. از دکمه تماس استفاده کنید و هدف، زمان‌بندی و بودجه را بنویسید.",
      default: "برای پاسخ دقیق‌تر اطلاعات بیشتری لازم دارم. لطفا پروژه‌تان را توضیح دهید یا از دکمه تماس استفاده کنید تا تیم مستقیم پاسخ دهد.",
    },
  },
  ar: {
    title: "مساعد الدعم",
    subtitle: "اسأل عن الخدمات أو الأسعار أو المدة أو بدء التعاون.",
    placeholder: "اكتب سؤالك...",
    open: "فتح دردشة الدعم",
    contact: "تواصل معنا",
    services: "عرض الخدمات",
    starter: "مرحبا. يمكنني مساعدتك في اختيار الخدمة، فهم الأسعار، أو التواصل مع الفريق.",
    quick: ["ما الخدمات التي تقدمونها؟", "كم تكلفة الموقع؟", "كيف أبدأ؟"],
    answers: {
      greeting: "مرحبا. أخبرني بما تريد بناءه وسأقترح عليك الخطوة المناسبة.",
      services: "نساعد في تطوير الويب، التصميم، SEO/AEO/GEO، والحملات الإعلانية. يمكنك فتح صفحة الخدمات للمقارنة.",
      pricing: "تعتمد الأسعار على نطاق المشروع. صفحات الخدمات تعرض أسعار البداية، وللحصول على عرض أدق أرسل تفاصيل مشروعك عبر نموذج التواصل.",
      timing: "صفحة هبوط مركزة قد تستغرق بضعة أسابيع. المشاريع الأكبر تعتمد على النطاق والمحتوى وسرعة الموافقات.",
      contact: "يمكنك التواصل مع الفريق عبر النموذج أو البريد أو الهاتف. استخدم زر التواصل وأرسل الأهداف والمدة والميزانية.",
      default: "قد أحتاج إلى تفاصيل أكثر للإجابة بدقة. صف مشروعك أو استخدم زر التواصل ليرد الفريق مباشرة.",
    },
  },
}

function getAnswer(input: string, locale: Locale, services: ServiceItem[], office: Office) {
  const text = input.toLowerCase()
  const t = copy[locale].answers
  const serviceNames = services.map((item) => item.title).join("، ")

  if (/^(hi|hello|hey|سلام|مرحبا|اهلا)/i.test(text)) return t.greeting
  if (/(service|services|web|design|seo|aeo|geo|ads|campaign|خدمات|سرویس|طراحی|سئو|تبلیغ|خدمة|خدمات|تصميم|إعلانات)/i.test(text)) {
    return `${t.services}\n\n${serviceNames}`
  }
  if (/(price|pricing|cost|budget|quote|هزینه|قیمت|بودجه|تعرفه|سعر|تكلفة|ميزانية)/i.test(text)) return t.pricing
  if (/(time|timeline|long|duration|زمان|چقدر طول|مدت|مدة|وقت)/i.test(text)) return t.timing
  if (/(contact|call|email|phone|human|تماس|ایمیل|تلفن|انسان|تواصل|بريد|هاتف)/i.test(text)) {
    return `${t.contact}\n${office.email} · ${office.phone}`
  }

  return t.default
}

export function SupportChatbot({
  locale,
  services,
  office,
}: {
  locale: Locale
  services: ServiceItem[]
  office: Office
}) {
  const rtl = isRTL(locale)
  const t = copy[locale]
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: t.starter }])
  const messagesRef = useRef<HTMLDivElement | null>(null)
  const baseHref = `/${locale}`

  const quickPrompts = useMemo(() => t.quick, [t.quick])

  useEffect(() => {
    const el = messagesRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages, open])

  function ask(question: string) {
    const trimmed = question.trim()
    if (!trimmed) return
    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      { role: "bot", text: getAnswer(trimmed, locale, services, office) },
    ])
    setInput("")
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    ask(input)
  }

  return (
    <div className={cn("fixed bottom-5 z-40", rtl ? "left-5" : "right-5")} dir={rtl ? "rtl" : "ltr"}>
      {open ? (
        <div
          data-lenis-prevent-wheel=""
          data-lenis-prevent-touch=""
          className={cn(
            "absolute bottom-16 flex h-[min(34rem,calc(100vh-7rem))] w-[min(24rem,calc(100vw-2.5rem))] min-h-0 flex-col overflow-hidden rounded-3xl border bg-card/95 shadow-2xl shadow-black/25 backdrop-blur-xl",
            rtl ? "left-0" : "right-0"
          )}
        >
          <div className="shrink-0 flex items-start justify-between gap-3 border-b p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-500">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close support chat"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={messagesRef}
            data-lenis-prevent-wheel=""
            data-lenis-prevent-touch=""
            className="min-h-0 flex-1 overscroll-contain space-y-3 overflow-y-auto p-4"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={cn(
                  "max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6",
                  message.role === "user"
                    ? "ms-auto bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="shrink-0 space-y-3 border-t p-4">
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => ask(prompt)}
                  className="rounded-full border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-fuchsia-500/40 hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={t.placeholder}
                className="h-10 min-w-0 flex-1 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/40"
              />
              <Button type="submit" size="icon" aria-label={t.placeholder}>
                <Send className={cn("h-4 w-4", rtl && "rotate-270")} />
              </Button>
            </form>
            <div className="flex gap-2">
              <Button asChild size="sm" className="flex-1">
                <Link href={`${baseHref}/contact`}>{t.contact}</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="flex-1">
                <Link href={`${baseHref}/services`}>{t.services}</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <Button
        type="button"
        size="icon"
        aria-label={t.open}
        onClick={() => setOpen((current) => !current)}
        className="h-14 w-14 rounded-full shadow-2xl shadow-fuchsia-500/20"
      >
        <MessageCircleMore className="h-6 w-6" />
      </Button>
    </div>
  )
}
