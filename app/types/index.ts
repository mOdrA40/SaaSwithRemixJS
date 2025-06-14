// User types
export interface User {
    id: string
    name: string
    email: string
    avatar?: string
    role: "user" | "admin"
    plan: "basic" | "pro" | "enterprise"
    isActive: boolean
    bio?: string
    website?: string
    company?: string
    createdAt: Date
    updatedAt: Date
}

// Subscription types
export interface Subscription {
    id: string
    userId: string
    plan: "basic" | "pro" | "enterprise"
    interval: "monthly" | "yearly"
    status: "active" | "cancelled" | "past_due" | "incomplete"
    currentPeriodStart: Date
    currentPeriodEnd: Date
    cancelAtPeriodEnd: boolean
    createdAt: Date
    updatedAt: Date
}

// Plan types
export interface Plan {
    id: string
    name: string
    description: string
    features: string[]
    monthlyPrice: number
    yearlyPrice: number
    popular?: boolean
    buttonText: string
    limitations: {
        users?: number
        projects?: number
        storage?: string
        support?: string
    }
}

// Dashboard stats
export interface DashboardStats {
    totalUsers: number
    activeSubscriptions: number
    monthlyRevenue: number
    conversionRate: number
    growth: {
        users: number
        revenue: number
        subscriptions: number
    }
}

// Navigation types
export interface NavItem {
    title: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    disabled?: boolean
    external?: boolean
    children?: NavItem[]
}

// API Response types
export interface ApiResponse<T = unknown> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

// Form states
export interface FormState {
    isLoading: boolean
    error?: string
    success?: string
}

// Theme types
export type Theme = "light" | "dark" | "system"

// Notification types
export interface Notification {
    id: string
    type: "success" | "error" | "warning" | "info"
    title: string
    description?: string
    duration?: number
}

// Modal types
export interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    description?: string
    children: React.ReactNode
}

// Table types
export interface TableColumn<T = Record<string, unknown>> {
    key: keyof T | string
    title: string
    sortable?: boolean
    render?: (value: unknown, record: T) => React.ReactNode
}

export interface TableProps<T = Record<string, unknown>> {
    data: T[]
    columns: TableColumn<T>[]
    loading?: boolean
    pagination?: {
        page: number
        limit: number
        total: number
        onPageChange: (page: number) => void
    }
}

// Contact/Support types
export interface ContactMessage {
    id: string
    name: string
    email: string
    subject: string
    message: string
    status: "open" | "in_progress" | "resolved" | "closed"
    createdAt: Date
    updatedAt: Date
}

// Analytics types
export interface AnalyticsData {
    period: string
    users: number
    revenue: number
    subscriptions: number
    conversionRate: number
}

// Session types
export interface Session {
    user: User
    subscription?: Subscription
}

// Error types
export interface ErrorBoundaryState {
    hasError: boolean
    error?: Error
} 