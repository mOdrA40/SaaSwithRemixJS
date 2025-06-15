// Status page data for system monitoring and uptime
export interface ServiceStatus {
    id: string
    name: string
    description: string
    status: "operational" | "degraded" | "partial_outage" | "major_outage" | "maintenance"
    uptime: number
    responseTime: number
    lastChecked: string
    icon: string
}

export interface Incident {
    id: string
    title: string
    description: string
    status: "investigating" | "identified" | "monitoring" | "resolved"
    severity: "low" | "medium" | "high" | "critical"
    startTime: string
    endTime?: string
    updates: IncidentUpdate[]
    affectedServices: string[]
}

export interface IncidentUpdate {
    id: string
    timestamp: string
    status: "investigating" | "identified" | "monitoring" | "resolved"
    message: string
    author: string
}

export interface UptimeData {
    date: string
    uptime: number
    incidents: number
}

export interface Metric {
    id: string
    name: string
    value: number
    unit: string
    trend: "up" | "down" | "stable"
    change: number
    description: string
}

// Service Status Data
export const SERVICES: ServiceStatus[] = [
    {
        id: "api",
        name: "API",
        description: "Core API services",
        status: "operational",
        uptime: 99.98,
        responseTime: 145,
        lastChecked: new Date().toISOString(),
        icon: "🔗"
    },
    {
        id: "web-app",
        name: "Web Application",
        description: "Main web application",
        status: "operational",
        uptime: 99.95,
        responseTime: 320,
        lastChecked: new Date().toISOString(),
        icon: "🌐"
    },
    {
        id: "database",
        name: "Database",
        description: "Primary database cluster",
        status: "operational",
        uptime: 99.99,
        responseTime: 12,
        lastChecked: new Date().toISOString(),
        icon: "🗄️"
    },
    {
        id: "cdn",
        name: "CDN",
        description: "Content delivery network",
        status: "operational",
        uptime: 99.97,
        responseTime: 89,
        lastChecked: new Date().toISOString(),
        icon: "🚀"
    },
    {
        id: "auth",
        name: "Authentication",
        description: "User authentication service",
        status: "operational",
        uptime: 99.96,
        responseTime: 78,
        lastChecked: new Date().toISOString(),
        icon: "🔐"
    },
    {
        id: "notifications",
        name: "Notifications",
        description: "Email and push notifications",
        status: "degraded",
        uptime: 98.5,
        responseTime: 450,
        lastChecked: new Date().toISOString(),
        icon: "📧"
    },
    {
        id: "analytics",
        name: "Analytics",
        description: "Analytics and reporting service",
        status: "operational",
        uptime: 99.94,
        responseTime: 234,
        lastChecked: new Date().toISOString(),
        icon: "📊"
    },
    {
        id: "file-storage",
        name: "File Storage",
        description: "File upload and storage service",
        status: "operational",
        uptime: 99.92,
        responseTime: 567,
        lastChecked: new Date().toISOString(),
        icon: "📁"
    }
]

// Recent Incidents
export const RECENT_INCIDENTS: Incident[] = [
    {
        id: "inc_001",
        title: "Notification Service Degradation",
        description: "Some users may experience delays in receiving email notifications",
        status: "monitoring",
        severity: "medium",
        startTime: "2024-06-14T14:30:00Z",
        affectedServices: ["notifications"],
        updates: [
            {
                id: "upd_001",
                timestamp: "2024-06-14T14:30:00Z",
                status: "investigating",
                message: "We are investigating reports of delayed email notifications.",
                author: "SaaS Pro Team"
            },
            {
                id: "upd_002",
                timestamp: "2024-06-14T15:15:00Z",
                status: "identified",
                message: "We have identified the issue with our email service provider and are working on a fix.",
                author: "SaaS Pro Team"
            },
            {
                id: "upd_003",
                timestamp: "2024-06-14T16:00:00Z",
                status: "monitoring",
                message: "A fix has been implemented. We are monitoring the service to ensure stability.",
                author: "SaaS Pro Team"
            }
        ]
    },
    {
        id: "inc_002",
        title: "Scheduled Maintenance - Database Upgrade",
        description: "Planned maintenance window for database performance improvements",
        status: "resolved",
        severity: "low",
        startTime: "2024-06-12T02:00:00Z",
        endTime: "2024-06-12T04:00:00Z",
        affectedServices: ["database", "api"],
        updates: [
            {
                id: "upd_004",
                timestamp: "2024-06-12T02:00:00Z",
                status: "investigating",
                message: "Scheduled maintenance has begun. Some services may be temporarily unavailable.",
                author: "SaaS Pro Team"
            },
            {
                id: "upd_005",
                timestamp: "2024-06-12T04:00:00Z",
                status: "resolved",
                message: "Maintenance completed successfully. All services are now operational.",
                author: "SaaS Pro Team"
            }
        ]
    }
]

// Uptime History (last 90 days)
export const UPTIME_HISTORY: UptimeData[] = Array.from({ length: 90 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (89 - i))
    
    // Simulate realistic uptime data
    const baseUptime = 99.5
    const randomVariation = (Math.random() - 0.5) * 2
    const uptime = Math.min(100, Math.max(95, baseUptime + randomVariation))
    
    return {
        date: date.toISOString().split('T')[0],
        uptime: Math.round(uptime * 100) / 100,
        incidents: Math.random() < 0.1 ? Math.floor(Math.random() * 3) + 1 : 0
    }
})

// Performance Metrics
export const PERFORMANCE_METRICS: Metric[] = [
    {
        id: "avg_response_time",
        name: "Average Response Time",
        value: 245,
        unit: "ms",
        trend: "down",
        change: -12,
        description: "Average API response time across all endpoints"
    },
    {
        id: "uptime",
        name: "Overall Uptime",
        value: 99.96,
        unit: "%",
        trend: "stable",
        change: 0.02,
        description: "System uptime over the last 30 days"
    },
    {
        id: "error_rate",
        name: "Error Rate",
        value: 0.04,
        unit: "%",
        trend: "down",
        change: -0.01,
        description: "Percentage of requests resulting in errors"
    },
    {
        id: "throughput",
        name: "Throughput",
        value: 1250,
        unit: "req/min",
        trend: "up",
        change: 8.5,
        description: "Average requests processed per minute"
    }
]

// Status Colors
export const STATUS_COLORS = {
    operational: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900",
    degraded: "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900",
    partial_outage: "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900",
    major_outage: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900",
    maintenance: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900"
}

export const SEVERITY_COLORS = {
    low: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900",
    medium: "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900",
    high: "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900",
    critical: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900"
}

// Helper functions
export function getOverallStatus(): "operational" | "degraded" | "partial_outage" | "major_outage" {
    const statuses = SERVICES.map(service => service.status)
    
    if (statuses.includes("major_outage")) return "major_outage"
    if (statuses.includes("partial_outage")) return "partial_outage"
    if (statuses.includes("degraded")) return "degraded"
    return "operational"
}

export function getAverageUptime(): number {
    const totalUptime = SERVICES.reduce((sum, service) => sum + service.uptime, 0)
    return Math.round((totalUptime / SERVICES.length) * 100) / 100
}

export function getActiveIncidents(): Incident[] {
    return RECENT_INCIDENTS.filter(incident => incident.status !== "resolved")
}
