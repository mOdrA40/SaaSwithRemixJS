import { Plan, NavItem } from "~/types"
import {
    HomeIcon,
    UserGroupIcon,
    ChartBarIcon,
    CogIcon,
    CreditCardIcon,
    DocumentTextIcon,
    QuestionMarkCircleIcon,
    UsersIcon,
    FolderIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline"

// Pricing plans
export const PLANS: Plan[] = [
    {
        id: "basic",
        name: "Basic",
        description: "Cocok untuk individu yang baru memulai",
        monthlyPrice: 9,
        yearlyPrice: 99,
        buttonText: "Mulai Gratis",
        features: [
            "1 pengguna",
            "5 proyek",
            "10GB penyimpanan",
            "Email support",
            "Dashboard dasar",
            "API akses"
        ],
        limitations: {
            users: 1,
            projects: 5,
            storage: "10GB",
            support: "Email"
        }
    },
    {
        id: "pro",
        name: "Pro",
        description: "Ideal untuk tim kecil dan bisnis berkembang",
        monthlyPrice: 29,
        yearlyPrice: 299,
        popular: true,
        buttonText: "Pilih Pro",
        features: [
            "5 pengguna",
            "25 proyek",
            "100GB penyimpanan",
            "Priority support",
            "Advanced analytics",
            "API akses",
            "Custom integrations",
            "Team collaboration"
        ],
        limitations: {
            users: 5,
            projects: 25,
            storage: "100GB",
            support: "Priority"
        }
    },
    {
        id: "enterprise",
        name: "Enterprise",
        description: "Untuk organisasi besar dengan kebutuhan khusus",
        monthlyPrice: 99,
        yearlyPrice: 999,
        buttonText: "Hubungi Sales",
        features: [
            "Pengguna unlimited",
            "Proyek unlimited",
            "1TB penyimpanan",
            "24/7 phone support",
            "Custom analytics",
            "API akses unlimited",
            "Custom integrations",
            "Advanced security",
            "Dedicated account manager",
            "SLA 99.9%"
        ],
        limitations: {
            users: undefined,
            projects: undefined,
            storage: "1TB",
            support: "24/7 Phone"
        }
    }
]

// Main navigation items
export const MAIN_NAV: NavItem[] = [
    {
        title: "Features",
        href: "/#features"
    },
    {
        title: "Pricing",
        href: "/#pricing"
    },
    {
        title: "About",
        href: "/about"
    },
    {
        title: "Demos",
        href: "/demo/auth"
    },
    {
        title: "Contact",
        href: "/contact"
    }
]

// Dashboard navigation items
export const DASHBOARD_NAV: NavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: HomeIcon
    },
    {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: ChartBarIcon
    },
    {
        title: "Users",
        href: "/dashboard/users",
        icon: UsersIcon
    },
    {
        title: "Files",
        href: "/dashboard/files",
        icon: FolderIcon
    },
    {
        title: "Projects",
        href: "/dashboard/projects",
        icon: DocumentTextIcon
    },
    {
        title: "Audit Logs",
        href: "/dashboard/audit-logs",
        icon: ClipboardDocumentListIcon
    },
    {
        title: "Billing",
        href: "/dashboard/billing",
        icon: CreditCardIcon
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: CogIcon
    },
    {
        title: "Help",
        href: "/dashboard/help",
        icon: QuestionMarkCircleIcon
    }
]

// Admin navigation items
export const ADMIN_NAV: NavItem[] = [
    {
        title: "Overview",
        href: "/admin",
        icon: HomeIcon
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: UserGroupIcon
    },
    {
        title: "Analytics",
        href: "/admin/analytics",
        icon: ChartBarIcon
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: CogIcon
    }
]

// Landing page features
export const FEATURES = [
    {
        id: "analytics",
        title: "Analytics Mendalam",
        description: "Dapatkan insights yang actionable dengan dashboard analytics yang powerful",
        icon: "📊"
    },
    {
        id: "collaboration",
        title: "Kolaborasi Tim",
        description: "Bekerja bersama tim dengan tools kolaborasi real-time yang mudah digunakan",
        icon: "👥"
    },
    {
        id: "security",
        title: "Keamanan Enterprise",
        description: "Data Anda aman dengan enkripsi end-to-end dan compliance standar industri",
        icon: "🔒"
    },
    {
        id: "integration",
        title: "Integrasi Mudah",
        description: "Hubungkan dengan tools favorit Anda melalui API yang robust dan dokumentasi lengkap",
        icon: "🔗"
    },
    {
        id: "automation",
        title: "Otomatisasi Cerdas",
        description: "Hemat waktu dengan workflow otomatis yang dapat dikustomisasi sesuai kebutuhan",
        icon: "⚡"
    },
    {
        id: "support",
        title: "Support 24/7",
        description: "Tim support expert kami siap membantu Anda kapan saja dengan respon time cepat",
        icon: "🚀"
    }
]

// Company information
export const COMPANY_INFO = {
    name: "SaaS Pro",
    description: "Platform SaaS modern untuk mengelola bisnis Anda dengan lebih efisien",
    tagline: "Transformasi Digital untuk Semua",
    email: "hello@saaspro.com",
    phone: "+62 21 1234 5678",
    address: "Jakarta, Indonesia",
    social: {
        twitter: "https://twitter.com/saaspro",
        linkedin: "https://linkedin.com/company/saaspro",
        github: "https://github.com/saaspro"
    }
}

// Default values
export const DEFAULT_AVATAR = "/images/default-avatar.png"
export const DEFAULT_LIMIT = 10
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"]

// Status colors
export const STATUS_COLORS = {
    active: "text-green-600 bg-green-100",
    inactive: "text-red-600 bg-red-100",
    pending: "text-yellow-600 bg-yellow-100",
    cancelled: "text-gray-600 bg-gray-100"
}

// Animation durations
export const ANIMATION_DURATION = {
    fast: 150,
    normal: 300,
    slow: 500
}

// Blog categories
export const BLOG_CATEGORIES = [
    { id: "all", name: "Semua", slug: "all" },
    { id: "product", name: "Product Updates", slug: "product" },
    { id: "tutorial", name: "Tutorial", slug: "tutorial" },
    { id: "company", name: "Company News", slug: "company" },
    { id: "tech", name: "Technology", slug: "tech" }
]

// Job departments
export const JOB_DEPARTMENTS = [
    { id: "all", name: "Semua Departemen", slug: "all" },
    { id: "engineering", name: "Engineering", slug: "engineering" },
    { id: "design", name: "Design", slug: "design" },
    { id: "marketing", name: "Marketing", slug: "marketing" },
    { id: "sales", name: "Sales", slug: "sales" },
    { id: "hr", name: "Human Resources", slug: "hr" }
]

// Job types
export const JOB_TYPES = [
    { id: "all", name: "Semua Tipe", slug: "all" },
    { id: "full-time", name: "Full Time", slug: "full-time" },
    { id: "part-time", name: "Part Time", slug: "part-time" },
    { id: "contract", name: "Contract", slug: "contract" },
    { id: "internship", name: "Internship", slug: "internship" }
]

// Help categories
export const HELP_CATEGORIES = [
    { id: "getting-started", name: "Getting Started", icon: "🚀" },
    { id: "account", name: "Account & Billing", icon: "💳" },
    { id: "features", name: "Features", icon: "⚡" },
    { id: "integrations", name: "Integrations", icon: "🔗" },
    { id: "troubleshooting", name: "Troubleshooting", icon: "🔧" },
    { id: "api", name: "API Documentation", icon: "📚" }
]