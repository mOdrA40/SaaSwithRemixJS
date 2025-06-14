import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Stale time - 5 minutes
            staleTime: 1000 * 60 * 5,
            // Garbage collection time - 10 minutes
            gcTime: 1000 * 60 * 10,
            // Retry configuration
            retry: (failureCount, error: unknown) => {
                // Don't retry for 4xx errors
                const errorWithStatus = error as { status?: number }
                if (errorWithStatus?.status && errorWithStatus.status >= 400 && errorWithStatus.status < 500) {
                    return false
                }
                // Retry up to 3 times for other errors
                return failureCount < 3
            },
            // Refetch on window focus
            refetchOnWindowFocus: false,
            // Refetch on reconnect
            refetchOnReconnect: true,
        },
        mutations: {
            // Retry once for mutations
            retry: 1,
        },
    },
})

// API Base URL
export const API_BASE_URL = 'http://localhost:3000/api'

// Common fetch function with error handling
export const fetchWithError = async (url: string, options?: RequestInit) => {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Network error' }))
        throw {
            status: response.status,
            message: error.message || 'Something went wrong',
            ...error,
        }
    }

    return response.json()
}

// Query keys factory
export const queryKeys = {
    // Users
    users: ['users'] as const,
    user: (id: string) => ['users', id] as const,
    userProfile: () => ['user', 'profile'] as const,

    // Analytics
    analytics: ['analytics'] as const,
    analyticsOverview: () => ['analytics', 'overview'] as const,
    analyticsRevenue: (period: string) => ['analytics', 'revenue', period] as const,
    analyticsUsers: (period: string) => ['analytics', 'users', period] as const,

    // Files
    files: ['files'] as const,
    filesList: (folderId?: string) => ['files', 'list', folderId] as const,
    fileContent: (fileId: string) => ['files', 'content', fileId] as const,

    // Team
    team: ['team'] as const,
    teamMembers: () => ['team', 'members'] as const,
    teamInvitations: () => ['team', 'invitations'] as const,

    // Notifications
    notifications: ['notifications'] as const,
    notificationsList: () => ['notifications', 'list'] as const,
    notificationsUnread: () => ['notifications', 'unread'] as const,

    // Audit Logs
    auditLogs: ['audit-logs'] as const,
    auditLogsList: (page: number, filters?: Record<string, unknown>) => ['audit-logs', 'list', page, filters] as const,

    // API Monitoring
    apiMonitoring: ['api-monitoring'] as const,
    apiStats: () => ['api-monitoring', 'stats'] as const,
    apiEndpoints: () => ['api-monitoring', 'endpoints'] as const,
} 