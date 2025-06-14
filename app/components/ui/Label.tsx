import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "~/lib/utils"

const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    {
        variants: {
            variant: {
                default: "text-gray-700 dark:text-gray-300",
                error: "text-red-600 dark:text-red-400",
                success: "text-green-600 dark:text-green-400",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface LabelProps
    extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> { }

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, variant, ...props }, ref) => {
        return (
            <label
                className={cn(labelVariants({ variant, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)

Label.displayName = "Label"

export { Label, labelVariants }
