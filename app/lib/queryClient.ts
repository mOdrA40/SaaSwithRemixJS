import { QueryClient } from '@tanstack/react-query'

// Enhanced retry function with exponential backoff
const retryFunction = (failureCount: number, error: unknown) => {
    const errorWithStatus = error as { status?: number; message?: string }

    // Don't retry for client errors (4xx)
    if (errorWithStatus?.status && errorWithStatus.status >= 400 && errorWithStatus.status < 500) {
        console.warn(`Client error ${errorWithStatus.status}, not retrying:`, errorWithStatus.message)
        return false
    }

    // Don't retry for authentication errors
    if (errorWithStatus?.status === 401 || errorWithStatus?.status === 403) {
        console.warn('Authentication error, not retrying:', errorWithStatus.message)
        return false
    }

    // Don't retry for validation errors
    if (errorWithStatus?.status === 422) {
        console.warn('Validation error, not retrying:', errorWithStatus.message)
        return false
    }

    // Retry for network errors, timeouts, and server errors
    const shouldRetry = failureCount < 3

    if (shouldRetry) {
        console.log(`Retrying request (attempt ${failureCount + 1}/3):`, errorWithStatus.message)
    } else {
        console.error('Max retries reached, giving up:', errorWithStatus.message)
    }

    return shouldRetry
}

// Enhanced retry delay with exponential backoff
const retryDelay = (attemptIndex: number) => {
    // Exponential backoff: 1s, 2s, 4s
    const baseDelay = 1000
    const delay = Math.min(baseDelay * Math.pow(2, attemptIndex), 10000) // Max 10s

    // Add jitter to prevent thundering herd
    const jitter = Math.random() * 0.1 * delay

    console.log(`Retry delay: ${delay + jitter}ms for attempt ${attemptIndex + 1}`)
    return delay + jitter
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Stale time - 5 minutes
            staleTime: 1000 * 60 * 5,
            // Garbage collection time - 10 minutes
            gcTime: 1000 * 60 * 10,
            // Enhanced retry configuration
            retry: retryFunction,
            retryDelay,
            // Refetch on window focus
            refetchOnWindowFocus: false,
            // Refetch on reconnect
            refetchOnReconnect: true,
            // Network mode for better offline handling
            networkMode: 'online',
            // Throw errors to error boundaries
            throwOnError: (error: unknown) => {
                const errorWithStatus = error as { status?: number }
                // Throw critical errors to error boundary
                return !errorWithStatus?.status || errorWithStatus.status >= 500
            },
        },
        mutations: {
            // Enhanced retry for mutations
            retry: (failureCount: number, error: unknown) => {
                const errorWithStatus = error as { status?: number }
                // Only retry mutations for network errors and server errors
                if (!errorWithStatus?.status || errorWithStatus.status >= 500) {
                    return failureCount < 2 // Max 2 retries for mutations
                }
                return false
            },
            retryDelay,
            // Network mode for mutations
            networkMode: 'online',
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
