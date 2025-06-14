import { cn } from "~/lib/utils"

interface LoadingProps {
    className?: string
    size?: "sm" | "md" | "lg"
    text?: string
}

const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
}

export function Loading({ className, size = "md", text }: LoadingProps) {
    return (
        <div className={cn("flex items-center justify-center space-x-2", className)}>
            <div
                className={cn(
                    "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
                    sizeClasses[size]
                )}
            />
            {text && (
                <span className="text-sm text-gray-600">{text}</span>
            )}
        </div>
    )
}

export function LoadingPage({ text = "Loading..." }: { text?: string }) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Loading size="lg" text={text} />
        </div>
    )
}

export function LoadingButton({ children, isLoading, ...props }:
    React.ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }
) {
    return (
        <button {...props} disabled={isLoading || props.disabled}>
            {isLoading ? (
                <div className="flex items-center space-x-2">
                    <Loading size="sm" />
                    <span>Loading...</span>
                </div>
            ) : (
                children
            )}
        </button>
    )
} 