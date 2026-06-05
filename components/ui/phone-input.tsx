"use client"

import { PhoneInput as InternationalPhoneInput } from "react-international-phone"
import type { PhoneInputProps as InternationalPhoneInputProps } from "react-international-phone"

import { cn } from "@/lib/utils"

import "react-international-phone/style.css"

export type PhoneInputProps = Omit<
  InternationalPhoneInputProps,
  "className" | "inputClassName" | "countrySelectorStyleProps"
> & {
  className?: string
}

/**
 * International phone field styled like shadcn `Input`, including light/dark
 * theme tokens and country dropdown.
 */
function PhoneInput({ className, inputProps, ...props }: PhoneInputProps) {
  const { className: inputClassFromProps, ...restInputProps } = inputProps ?? {}

  return (
    <div
      dir="ltr"
      data-lenis-prevent-wheel=""
      data-lenis-prevent-touch=""
      className={cn(
        "phone-input-shadcn relative w-full min-w-0 rounded-md border border-input bg-transparent text-left shadow-xs transition-[color,box-shadow]",
        "dark:bg-input/30",
        "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
        className
      )}
    >
      <InternationalPhoneInput
        {...props}
        inputProps={restInputProps}
        className={cn(
          "w-full min-w-0 border-0 bg-transparent shadow-none",
          "[&_.react-international-phone-input-container]:flex [&_.react-international-phone-input-container]:w-full [&_.react-international-phone-input-container]:min-w-0",
          "[&_.react-international-phone-input-container]:divide-x [&_.react-international-phone-input-container]:divide-input",
          "[&_.react-international-phone-country-selector]:shrink-0",
          "[&_.react-international-phone-country-selector-dropdown]:z-[70]",
          "[&_.react-international-phone-country-selector-dropdown]:max-h-[min(18rem,calc(100vh-8rem))]",
          "[&_.react-international-phone-input]:min-w-0 [&_.react-international-phone-input]:flex-1 [&_.react-international-phone-input]:w-auto"
        )}
        inputClassName={cn(
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 min-h-9 w-full min-w-0 rounded-none border-0 bg-transparent text-left text-base text-foreground shadow-none md:text-sm",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
          inputClassFromProps
        )}
        countrySelectorStyleProps={{
          buttonClassName:
            "h-9 min-h-9 rounded-none px-4 border-0 bg-transparent hover:bg-accent/60",
          dropdownArrowClassName: "border-t-muted-foreground",
          dropdownStyleProps: {
            listItemClassName: "rounded-sm text-sm hover:bg-accent hover:text-accent-foreground",
            listItemSelectedClassName: "bg-accent text-accent-foreground",
            listItemFocusedClassName: "bg-accent text-accent-foreground",
            listItemDialCodeClassName: "text-muted-foreground text-xs",
          },
        }}
      />
    </div>
  )
}

export { PhoneInput }
