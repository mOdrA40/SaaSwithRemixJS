import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Types
interface User {
    id: string
    name: string
    email: string
    avatar?: string
    role: 'admin' | 'user' | 'moderator'
    subscription: 'basic' | 'pro' | 'enterprise'
}

interface Notification {
    id: string
    title: string
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
    timestamp: Date
    read: boolean
    actionUrl?: string
}

interface GlobalState {
    // User state
    user: User | null
    isAuthenticated: boolean

    // UI state
    theme: 'light' | 'dark' | 'system'
    sidebarOpen: boolean
    commandPaletteOpen: boolean

    // Notifications
    notifications: Notification[]
    unreadCount: number

    // File management
    currentFolder: string | null
    selectedFiles: string[]
    uploadProgress: Record<string, number>

    // Analytics filters
    analyticsDateRange: { start: Date; end: Date }
    analyticsMetric: 'revenue' | 'users' | 'growth' | 'conversion'
}

interface GlobalActions {
    // User actions
    setUser: (user: User | null) => void
    login: (user: User) => void
    logout: () => void
    updateUserProfile: (updates: Partial<User>) => void

    // UI actions
    setTheme: (theme: 'light' | 'dark' | 'system') => void
    toggleSidebar: () => void
    setSidebarOpen: (open: boolean) => void
    toggleCommandPalette: () => void
    setCommandPaletteOpen: (open: boolean) => void

    // Notification actions
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
    markNotificationRead: (id: string) => void
    markAllNotificationsRead: () => void
    removeNotification: (id: string) => void
    clearNotifications: () => void

    // File management actions
    setCurrentFolder: (folderId: string | null) => void
    selectFile: (fileId: string) => void
    unselectFile: (fileId: string) => void
    selectAllFiles: (fileIds: string[]) => void
    clearSelectedFiles: () => void
    setUploadProgress: (fileId: string, progress: number) => void
    clearUploadProgress: (fileId: string) => void

    // Analytics actions
    setAnalyticsDateRange: (start: Date, end: Date) => void
    setAnalyticsMetric: (metric: 'revenue' | 'users' | 'growth' | 'conversion') => void
}

type GlobalStore = GlobalState & GlobalActions

// Store
export const useStore = create<GlobalStore>()(
    devtools(
        persist(
            (set) => ({
                // Initial state
                user: null,
                isAuthenticated: false,
                theme: 'system',
                sidebarOpen: true,
                commandPaletteOpen: false,
                notifications: [],
                unreadCount: 0,
                currentFolder: null,
                selectedFiles: [],
                uploadProgress: {},
                analyticsDateRange: {
                    start: new Date(new Date().setDate(new Date().getDate() - 30)),
                    end: new Date(),
                },
                analyticsMetric: 'revenue',

                // User actions
                setUser: (user) => set({ user, isAuthenticated: !!user }),

                login: (user) => set({
                    user,
                    isAuthenticated: true
                }),

                logout: () => set({
                    user: null,
                    isAuthenticated: false,
                    notifications: [],
                    unreadCount: 0,
                    currentFolder: null,
                    selectedFiles: [],
                    uploadProgress: {},
                }),

                updateUserProfile: (updates) => set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null
                })),

                // UI actions
                setTheme: (theme) => set({ theme }),

                toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

                setSidebarOpen: (open) => set({ sidebarOpen: open }),

                toggleCommandPalette: () => set((state) => ({
                    commandPaletteOpen: !state.commandPaletteOpen
                })),

                setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

                // Notification actions
                addNotification: (notification) => {
                    const newNotification: Notification = {
                        ...notification,
                        id: crypto.randomUUID(),
                        timestamp: new Date(),
                        read: false,
                    }

                    set((state) => ({
                        notifications: [newNotification, ...state.notifications],
                        unreadCount: state.unreadCount + 1,
                    }))
                },

                markNotificationRead: (id) => set((state) => ({
                    notifications: state.notifications.map(n =>
                        n.id === id ? { ...n, read: true } : n
                    ),
                    unreadCount: Math.max(0, state.unreadCount - 1),
                })),

                markAllNotificationsRead: () => set((state) => ({
                    notifications: state.notifications.map(n => ({ ...n, read: true })),
                    unreadCount: 0,
                })),

                removeNotification: (id) => set((state) => {
                    const notification = state.notifications.find(n => n.id === id)
                    return {
                        notifications: state.notifications.filter(n => n.id !== id),
                        unreadCount: notification && !notification.read
                            ? Math.max(0, state.unreadCount - 1)
                            : state.unreadCount,
                    }
                }),

                clearNotifications: () => set({ notifications: [], unreadCount: 0 }),

                // File management actions
                setCurrentFolder: (folderId) => set({
                    currentFolder: folderId,
                    selectedFiles: [],
                }),

                selectFile: (fileId) => set((state) => ({
                    selectedFiles: state.selectedFiles.includes(fileId)
                        ? state.selectedFiles
                        : [...state.selectedFiles, fileId]
                })),

                unselectFile: (fileId) => set((state) => ({
                    selectedFiles: state.selectedFiles.filter(id => id !== fileId)
                })),

                selectAllFiles: (fileIds) => set({ selectedFiles: fileIds }),

                clearSelectedFiles: () => set({ selectedFiles: [] }),

                setUploadProgress: (fileId, progress) => set((state) => ({
                    uploadProgress: { ...state.uploadProgress, [fileId]: progress }
                })),

                clearUploadProgress: (fileId) => set((state) => {
                    const newProgress = { ...state.uploadProgress }
                    delete newProgress[fileId]
                    return { uploadProgress: newProgress }
                }),

                // Analytics actions
                setAnalyticsDateRange: (start, end) => set({
                    analyticsDateRange: { start, end }
                }),

                setAnalyticsMetric: (metric) => set({ analyticsMetric: metric }),
            }),
            {
                name: 'saas-pro-store',
                partialize: (state) => ({
                    theme: state.theme,
                    sidebarOpen: state.sidebarOpen,
                    analyticsDateRange: state.analyticsDateRange,
                    analyticsMetric: state.analyticsMetric,
                }),
            }
        ),
        { name: 'SaaS Pro Store' }
    )
)

// Selectors for better performance
export const useUser = () => useStore((state) => state.user)
export const useAuth = () => useStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated
}))
export const useTheme = () => useStore((state) => state.theme)
export const useSidebar = () => useStore((state) => ({
    isOpen: state.sidebarOpen,
    toggle: state.toggleSidebar,
    setOpen: state.setSidebarOpen,
}))
export const useNotifications = () => useStore((state) => ({
    notifications: state.notifications,
    unreadCount: state.unreadCount,
    addNotification: state.addNotification,
    markRead: state.markNotificationRead,
    markAllRead: state.markAllNotificationsRead,
    remove: state.removeNotification,
    clear: state.clearNotifications,
}))
export const useFileManager = () => useStore((state) => ({
    currentFolder: state.currentFolder,
    selectedFiles: state.selectedFiles,
    uploadProgress: state.uploadProgress,
    setCurrentFolder: state.setCurrentFolder,
    selectFile: state.selectFile,
    unselectFile: state.unselectFile,
    selectAllFiles: state.selectAllFiles,
    clearSelectedFiles: state.clearSelectedFiles,
    setUploadProgress: state.setUploadProgress,
    clearUploadProgress: state.clearUploadProgress,
}))
export const useAnalytics = () => useStore((state) => ({
    dateRange: state.analyticsDateRange,
    metric: state.analyticsMetric,
    setDateRange: state.setAnalyticsDateRange,
    setMetric: state.setAnalyticsMetric,
})) 