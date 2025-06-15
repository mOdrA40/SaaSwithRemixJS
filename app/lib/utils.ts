import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "USD") {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(amount)
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions) {
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    }

    return new Intl.DateTimeFormat("en-US", { ...defaultOptions, ...options }).format(
        typeof date === "string" ? new Date(date) : date
    )
}

export function generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-")
}

export function truncate(text: string, length: number) {
    if (text.length <= length) return text
    return text.slice(0, length) + "..."
}

export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}

export function formatSalary(salary: { min: number; max: number; currency: string }): string {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: salary.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })

    return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`
}