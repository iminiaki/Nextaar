import { getDictionary, type Locale } from "@/lib/i18n"
import { ContactForm } from "@/components/contact-form"

export default async function ContactPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <ContactForm
        title={dict.contact.title}
        subtitle={dict.contact.subtitle}
        emailLabel={dict.contact.emailLabel}
        messageLabel={dict.contact.messageLabel}
        send={dict.contact.send}
        success={dict.contact.success}
      />
    </div>
  )
}
