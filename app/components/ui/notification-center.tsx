import { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    BellIcon,
    XMarkIcon,
    CheckIcon,
    TrashIcon,
    InformationCircleIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    XCircleIcon,
    EllipsisVerticalIcon,
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import toast from 'react-hot-toast'
import { Button } from './button'
// import { useNotifications } from '~/lib/store'
import { queryKeys } from '~/lib/query-client'

interface NotificationItem {
    id: string
    title: string
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
    timestamp: Date
    read: boolean
    actionUrl?: string
    actionText?: string
    avatar?: string
    source?: string
}

interface NotificationCenterProps {
    isOpen: boolean
    onClose: () => void
}

// Mock API functions
const fetchNotifications = async (): Promise<NotificationItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return [
        {
            id: '1',
            title: 'Welcome to SaaS Pro!',
            message: 'Your account has been successfully created. Start exploring our features.',
            type: 'success',
            timestamp: new Date('2024-01-15T10:30:00'),
            read: false,
            actionUrl: '/dashboard/analytics',
            actionText: 'View Dashboard',
            source: 'System',
        },
        {
            id: '2',
            title: 'New team member added',
            message: 'Jane Smith has been added to your team.',
            type: 'info',
            timestamp: new Date('2024-01-14T15:45:00'),
            read: false,
            actionUrl: '/dashboard/users',
            actionText: 'View Team',
            source: 'Team Management',
            avatar: '/images/avatars/jane.jpg',
        },
        {
            id: '3',
            title: 'Storage almost full',
            message: 'You are using 95% of your storage quota. Consider upgrading your plan.',
            type: 'warning',
            timestamp: new Date('2024-01-14T09:15:00'),
            read: true,
            actionUrl: '/dashboard/billing',
            actionText: 'Upgrade Plan',
            source: 'System',
        },
        {
            id: '4',
            title: 'Backup completed',
            message: 'Your daily backup has been completed successfully.',
            type: 'success',
            timestamp: new Date('2024-01-13T02:00:00'),
            read: true,
            source: 'System',
        },
        {
            id: '5',
            title: 'API rate limit exceeded',
            message: 'Your application exceeded the API rate limit. Some requests may have failed.',
            type: 'error',
            timestamp: new Date('2024-01-12T14:20:00'),
            read: false,
            actionUrl: '/dashboard/api',
            actionText: 'View API Usage',
            source: 'API Monitor',
        },
    ]
}

const markNotificationRead = async (notificationId: string) => {
    console.log('Marking notification as read:', notificationId)
    await new Promise(resolve => setTimeout(resolve, 500))
    return { success: true }
}

const deleteNotification = async (notificationId: string) => {
    console.log('Deleting notification:', notificationId)
    await new Promise(resolve => setTimeout(resolve, 500))
    return { success: true }
}

const markAllNotificationsRead = async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    return { success: true }
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
    const panelRef = useRef<HTMLDivElement>(null)
    const queryClient = useQueryClient()

    // Queries
    const { data: notifications = [], isLoading } = useQuery({
        queryKey: queryKeys.notificationsList(),
        queryFn: fetchNotifications,
        refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
    })

    // Mutations
    const markReadMutation = useMutation({
        mutationFn: markNotificationRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.notificationsList() })
        },
        onError: () => {
            toast.error('Failed to mark notification as read')
        },
    })

    const deleteMutation = useMutation({
        mutationFn: deleteNotification,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.notificationsList() })
            toast.success('Notification deleted')
        },
        onError: () => {
            toast.error('Failed to delete notification')
        },
    })

    const markAllReadMutation = useMutation({
        mutationFn: markAllNotificationsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.notificationsList() })
            toast.success('All notifications marked as read')
        },
        onError: () => {
            toast.error('Failed to mark all notifications as read')
        },
    })

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, onClose])

    // Filter notifications
    const filteredNotifications = notifications.filter(notification => {
        switch (filter) {
            case 'unread':
                return !notification.read
            case 'read':
                return notification.read
            default:
                return true
        }
    })

    const unreadCount = notifications.filter(n => !n.read).length

    const getNotificationIcon = (type: NotificationItem['type']) => {
        const iconClass = "h-6 w-6"

        switch (type) {
            case 'success':
                return <CheckCircleIcon className={`${iconClass} text-green-500`} />
            case 'warning':
                return <ExclamationTriangleIcon className={`${iconClass} text-yellow-500`} />
            case 'error':
                return <XCircleIcon className={`${iconClass} text-red-500`} />
            default:
                return <InformationCircleIcon className={`${iconClass} text-blue-500`} />
        }
    }

    const handleNotificationClick = (notification: NotificationItem) => {
        if (!notification.read) {
            markReadMutation.mutate(notification.id)
        }

        if (notification.actionUrl) {
            window.location.href = notification.actionUrl
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    onClick={onClose}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            onClose()
                        }
                    }}
                    role="button"
                    tabIndex={0}
                />

                <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
                    <div className="relative w-screen max-w-md" ref={panelRef}>
                        <div className="h-full flex flex-col bg-white dark:bg-gray-900 shadow-xl">
                            {/* Header */}
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <BellIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                            Notifications
                                        </h2>
                                        {unreadCount > 0 && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                                                {unreadCount} new
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                {/* Filter tabs */}
                                <div className="mt-4 flex space-x-1">
                                    {[
                                        { key: 'all', label: 'All', count: notifications.length },
                                        { key: 'unread', label: 'Unread', count: unreadCount },
                                        { key: 'read', label: 'Read', count: notifications.length - unreadCount },
                                    ].map((tab) => (
                                        <button
                                            key={tab.key}
                                            onClick={() => setFilter(tab.key as 'all' | 'unread' | 'read')}
                                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === tab.key
                                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                                                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                                }`}
                                        >
                                            {tab.label} ({tab.count})
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions bar */}
                            {unreadCount > 0 && (
                                <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => markAllReadMutation.mutate()}
                                        disabled={markAllReadMutation.isPending}
                                        className="w-full"
                                    >
                                        <CheckIcon className="h-4 w-4 mr-2" />
                                        {markAllReadMutation.isPending ? 'Marking...' : 'Mark all as read'}
                                    </Button>
                                </div>
                            )}

                            {/* Notifications list */}
                            <div className="flex-1 overflow-y-auto">
                                {isLoading ? (
                                    <div className="p-6 space-y-4">
                                        {Array.from({ length: 3 }).map((_, i) => (
                                            <div key={i} className="flex space-x-3">
                                                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : filteredNotifications.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-64 text-center">
                                        <BellIcon className="h-12 w-12 text-gray-400 mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                            No notifications
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {filter === 'unread'
                                                ? "You're all caught up!"
                                                : filter === 'read'
                                                    ? "No read notifications"
                                                    : "You don't have any notifications yet"
                                            }
                                        </p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {filteredNotifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${!notification.read
                                                        ? 'bg-blue-50 dark:bg-blue-900/10 border-l-4 border-l-blue-500'
                                                        : ''
                                                    }`}
                                                onClick={() => handleNotificationClick(notification)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault()
                                                        handleNotificationClick(notification)
                                                    }
                                                }}
                                                role="button"
                                                tabIndex={0}
                                            >
                                                <div className="flex space-x-3">
                                                    {/* Icon or Avatar */}
                                                    <div className="flex-shrink-0">
                                                        {notification.avatar ? (
                                                            <img
                                                                className="h-8 w-8 rounded-full"
                                                                src={notification.avatar}
                                                                alt=""
                                                            />
                                                        ) : (
                                                            getNotificationIcon(notification.type)
                                                        )}
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between">
                                                            <p className={`text-sm font-medium ${!notification.read
                                                                    ? 'text-gray-900 dark:text-white'
                                                                    : 'text-gray-600 dark:text-gray-300'
                                                                }`}>
                                                                {notification.title}
                                                            </p>

                                                            <div className="flex items-center space-x-2">
                                                                {!notification.read && (
                                                                    <div className="h-2 w-2 bg-blue-500 rounded-full" />
                                                                )}

                                                                {/* Action menu */}
                                                                <div className="relative group">
                                                                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        <EllipsisVerticalIcon className="h-4 w-4" />
                                                                    </button>

                                                                    <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                                        {!notification.read && (
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation()
                                                                                    markReadMutation.mutate(notification.id)
                                                                                }}
                                                                                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                                                                            >
                                                                                <CheckIcon className="h-4 w-4" />
                                                                                <span>Mark read</span>
                                                                            </button>
                                                                        )}
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                deleteMutation.mutate(notification.id)
                                                                            }}
                                                                            className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                                                                        >
                                                                            <TrashIcon className="h-4 w-4" />
                                                                            <span>Delete</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                            {notification.message}
                                                        </p>

                                                        <div className="mt-2 flex items-center justify-between">
                                                            <div className="flex items-center space-x-2 text-xs text-gray-400">
                                                                <span>{format(notification.timestamp, 'dd MMM yyyy HH:mm', { locale: id })}</span>
                                                                {notification.source && (
                                                                    <>
                                                                        <span>•</span>
                                                                        <span>{notification.source}</span>
                                                                    </>
                                                                )}
                                                            </div>

                                                            {notification.actionText && (
                                                                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                                                    {notification.actionText} →
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex-shrink-0 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => {
                                        // Navigate to notification settings
                                        window.location.href = '/dashboard/settings#notifications'
                                        onClose()
                                    }}
                                >
                                    Notification Settings
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

// Hook for notification center
export function useNotificationCenter() {
    const [isOpen, setIsOpen] = useState(false)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)
    const toggle = () => setIsOpen(!isOpen)

    return { isOpen, open, close, toggle }
} 