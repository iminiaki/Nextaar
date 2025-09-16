import { getDictionary, type Locale } from "@/lib/i18n"
import { ContactForm } from "@/components/contact-form"
import { MapPinHouse, Phone, MailCheck } from "lucide-react"
import Link from "next/link"

export default async function ContactPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)
  const enDict = await getDictionary("en")
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Locations */}
      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-semibold">{dict.contact.locationsTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(() => {
            const orderPhones = ["+14792792424", "+97145842838", "021-22954114"]
            const shorthandByPhone: Record<string, string> = {
              "+14792792424": "SFO",
              "+97145842838": "MCT",
              "021-22954114": "THR",
            }
            const ordered = [...dict.contact.locations].sort(
              (a, b) => orderPhones.indexOf(a.phone) - orderPhones.indexOf(b.phone)
            )
            return ordered.map((loc, idx) => {
              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`
              const tel = loc.phone.replace(/[^+0-9]/g, "")
              const enMatch = enDict.contact.locations.find((l) => l.phone === loc.phone)
              const imageBase = enMatch?.city || loc.city
              const fileBase = imageBase.split(",")[0].trim()
              const encoded = encodeURI(fileBase)
              const backgroundImageUrl = `/${encoded}.jpg`
              const email = dict.footer.office.email
              const shorthand = shorthandByPhone[loc.phone] || ""
              return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-xl border p-4 aspect-[4/3] flex items-end transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 ring-1 ring-transparent group-hover:ring-primary/20"
              >
                
                <div aria-hidden className="absolute inset-0 -z-10">
                  <div
                    className="h-full w-full bg-center bg-cover transform-gpu transition-all grayscale duration-1000 ease-out group-hover:scale-110  group-hover:grayscale-0 filter brightness-100 saturate-110 group-hover:brightness-110 group-hover:saturate-125"
                    style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
                  />
                </div>
                {/* Masked colorful heading using the original image, rest stays grayscale */}
                <h2
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-2 font-extrabold text-[150px] leading-none tracking-tight bg-clip-text text-transparent drop-shadow-sm transform-gpu transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:grayscale"
                  style={{ backgroundImage: `url('${backgroundImageUrl}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  {shorthand}
                </h2>
                <div aria-hidden className="absolute inset-0 z-0 pointer-events-none opacity-10 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)] bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:16px_16px] group-hover:opacity-20 transition-opacity" />
                <div aria-hidden className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-black/60 via-black/35 to-black/20 transition-colors group-hover:from-black/50 group-hover:via-black/25 group-hover:to-black/10" />
                <div className="relative z-10 text-white translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  
                  <h3 className="mb-2 font-medium">{loc.city}</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <MapPinHouse className="mt-0.5 h-4 w-4" />
                      <a href={mapsUrl} target="_blank" rel="noreferrer" className="hover:opacity-90">
                        {loc.address}
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <MailCheck className="h-4 w-4" />
                      <a href={`mailto:${email}`} className="hover:opacity-90">
                        {email}
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <Link href={`tel:${tel}`} className="hover:opacity-90">
                        {loc.phone}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              )
            })
          })()}
        </div>
      </section>

      <ContactForm
        title={dict.contact.title}
        subtitle={dict.contact.subtitle}
        nameLabel={dict.contact.nameLabel}
        companyLabel={dict.contact.companyLabel}
        emailLabel={dict.contact.emailLabel}
        phoneLabel={dict.contact.phoneLabel}
        messageLabel={dict.contact.messageLabel}
        send={dict.contact.send}
        success={dict.contact.success}
      />
    </div>
  )
}
