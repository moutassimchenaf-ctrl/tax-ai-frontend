import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default: "bg-primary-teal text-secondary-50 hover:bg-primary-teal/90",
        destructive:
          "bg-accent-error text-secondary-50 hover:bg-accent-error/90",
        outline:
          "border border-secondary-200 bg-white text-primary-darker-teal hover:bg-secondary-100 hover:text-secondary-900 dark:border-secondary-800 dark:bg-secondary-950 dark:hover:bg-secondary-800 dark:hover:text-secondary-50",
        secondary:
          "bg-secondary-100 text-secondary-900 hover:bg-secondary-100/80 dark:bg-secondary-800 dark:text-secondary-50 dark:hover:bg-secondary-800/80",
        ghost: "hover:bg-secondary-100 hover:text-secondary-900 dark:hover:bg-secondary-800 dark:hover:text-secondary-50",
        link: "text-secondary-900 underline-offset-4 hover:underline dark:text-secondary-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }