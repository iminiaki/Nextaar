import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative isolate overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0 before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-gradient-to-b before:from-primary-foreground/15 before:to-transparent before:opacity-60 before:animate-[btn-breathe_4s_ease-in-out_infinite] before:pointer-events-none after:content-[''] after:absolute after:inset-y-0 after:-left-[60%] after:-z-10 after:w-1/2 after:skew-x-12 after:bg-primary-foreground/25 after:blur-md after:animate-[btn-shine_4.5s_ease-in-out_infinite] hover:after:animate-[btn-shine_1.5s_ease-in-out_infinite] after:pointer-events-none",
        destructive:
          "bg-destructive text-white shadow-sm shadow-destructive/25 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-destructive/35 active:translate-y-0 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-60 before:animate-[btn-breathe_4s_ease-in-out_infinite] before:pointer-events-none after:content-[''] after:absolute after:inset-y-0 after:-left-[60%] after:-z-10 after:w-1/2 after:skew-x-12 after:bg-white/30 after:blur-md after:animate-[btn-shine_4.5s_ease-in-out_infinite] hover:after:animate-[btn-shine_1.5s_ease-in-out_infinite] after:pointer-events-none",
        outline:
          "border bg-background shadow-xs hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground hover:shadow-md hover:border-foreground/20 active:translate-y-0 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 after:content-[''] after:absolute after:inset-y-0 after:-left-[60%] after:-z-10 after:w-1/2 after:skew-x-12 after:bg-foreground/10 after:blur-md after:animate-[btn-shine_5s_ease-in-out_infinite] after:pointer-events-none",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:-translate-y-0.5 hover:bg-secondary/80 hover:shadow-md active:translate-y-0 before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-gradient-to-b before:from-foreground/5 before:to-transparent before:pointer-events-none after:content-[''] after:absolute after:inset-y-0 after:-left-[60%] after:-z-10 after:w-1/2 after:skew-x-12 after:bg-foreground/10 after:blur-md after:animate-[btn-shine_5s_ease-in-out_infinite] after:pointer-events-none",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
