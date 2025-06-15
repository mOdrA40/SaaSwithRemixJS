import { useState, useEffect, createContext, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XCircleIcon,
    XMarkIcon
} from "@heroicons/react/24/outline"
import { Button } from "~/components/ui/Button"
import { cn } from "~/lib/utils"

interface Notification {
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message?: string
    duration?: number
    persistent?: boolean
    action?: {
        label: string
        onClick: () => void
    }
    timestamp: Date
}

interface NotificationContextType {
    notifications: Notification[]
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
    removeNotification: (id: string) => void
    clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider')
    }
    return context
}

interface NotificationProviderProps {
    children: React.ReactNode
    maxNotifications?: number
    defaultDuration?: number
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

export const NotificationProvider = ({ 
    children, 
    maxNotifications = 5,
    defaultDuration = 5000,
    position = 'top-right'
}: NotificationProviderProps) => {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
        const id = Math.random().toString(36).substring(2, 11)
        const newNotification: Notification = {
            ...notification,
            id,
            timestamp: new Date(),
            duration: notification.duration ?? defaultDuration
        }

        setNotifications(prev => {
            const updated = [newNotification, ...prev]
            return updated.slice(0, maxNotifications)
        })

        // Auto-remove notification
        if (!notification.persistent && newNotification.duration && newNotification.duration > 0) {
            setTimeout(() => {
                removeNotification(id)
            }, newNotification.duration)
        }
    }

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
    }

    const clearAll = () => {
        setNotifications([])
    }

    const getPositionClasses = () => {
        switch (position) {
            case 'top-left':
                return 'top-4 left-4'
            case 'top-center':
                return 'top-4 left-1/2 transform -translate-x-1/2'
            case 'top-right':
                return 'top-4 right-4'
            case 'bottom-left':
                return 'bottom-4 left-4'
            case 'bottom-center':
                return 'bottom-4 left-1/2 transform -translate-x-1/2'
            case 'bottom-right':
                return 'bottom-4 right-4'
            default:
                return 'top-4 right-4'
        }
    }

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
            {children}
            
            {/* Notification Container */}
            <div className={cn(
                "fixed z-50 flex flex-col space-y-3 pointer-events-none",
                getPositionClasses()
            )}>
                <AnimatePresence>
                    {notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onRemove={removeNotification}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </NotificationContext.Provider>
    )
}

interface NotificationItemProps {
    notification: Notification
    onRemove: (id: string) => void
}

const NotificationItem = ({ notification, onRemove }: NotificationItemProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [progress, setProgress] = useState(100)

    useEffect(() => {
        if (notification.persistent || notification.duration === 0) return

        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev - (100 / (notification.duration! / 100))
                if (newProgress <= 0) {
                    clearInterval(interval)
                    return 0
                }
                return newProgress
            })
        }, 100)

        return () => clearInterval(interval)
    }, [notification.duration, notification.persistent])

    const getIcon = () => {
        switch (notification.type) {
            case 'success':
                return <CheckCircleIcon className="h-6 w-6 text-green-500" />
            case 'error':
                return <XCircleIcon className="h-6 w-6 text-red-500" />
            case 'warning':
                return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
            case 'info':
                return <InformationCircleIcon className="h-6 w-6 text-blue-500" />
        }
    }

    const getColorClasses = () => {
        switch (notification.type) {
            case 'success':
                return {
                    bg: 'bg-white dark:bg-gray-800 border-green-200 dark:border-green-800',
                    progress: 'bg-green-500'
                }
            case 'error':
                return {
                    bg: 'bg-white dark:bg-gray-800 border-red-200 dark:border-red-800',
                    progress: 'bg-red-500'
                }
            case 'warning':
                return {
                    bg: 'bg-white dark:bg-gray-800 border-yellow-200 dark:border-yellow-800',
                    progress: 'bg-yellow-500'
                }
            case 'info':
                return {
                    bg: 'bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800',
                    progress: 'bg-blue-500'
                }
        }
    }

    const colors = getColorClasses()

    const itemVariants = {
        initial: {
            opacity: 0,
            y: -50,
            scale: 0.8,
            rotateX: -90
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.8,
            transition: {
                duration: 0.2
            }
        }
    }

    return (
        <motion.div
            variants={itemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="pointer-events-auto"
        >
            <div className={cn(
                "relative w-96 max-w-sm rounded-lg border shadow-lg overflow-hidden",
                colors.bg
            )}>
                {/* Progress Bar */}
                {!notification.persistent && notification.duration && notification.duration > 0 && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700">
                        <motion.div
                            initial={{ width: '100%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                            className={cn("h-full", colors.progress)}
                        />
                    </div>
                )}

                <div className="p-4">
                    <div className="flex items-start space-x-3">
                        {/* Icon */}
                        <motion.div
                            animate={{ 
                                scale: isHovered ? 1.1 : 1,
                                rotate: isHovered ? 5 : 0
                            }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0 mt-0.5"
                        >
                            {getIcon()}
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                {notification.title}
                            </h4>
                            {notification.message && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {notification.message}
                                </p>
                            )}
                            
                            {/* Action Button */}
                            {notification.action && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-3"
                                >
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={notification.action.onClick}
                                        className="text-xs"
                                    >
                                        {notification.action.label}
                                    </Button>
                                </motion.div>
                            )}

                            {/* Timestamp */}
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                {notification.timestamp.toLocaleTimeString()}
                            </p>
                        </div>

                        {/* Close Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onRemove(notification.id)}
                            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </motion.button>
                    </div>
                </div>

                {/* Hover Effect */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                        />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

// Utility functions for easy notification creation
export const createNotification = {
    success: (title: string, message?: string, options?: Partial<Notification>) => ({
        type: 'success' as const,
        title,
        message,
        ...options
    }),
    
    error: (title: string, message?: string, options?: Partial<Notification>) => ({
        type: 'error' as const,
        title,
        message,
        persistent: true, // Errors should be persistent by default
        ...options
    }),
    
    warning: (title: string, message?: string, options?: Partial<Notification>) => ({
        type: 'warning' as const,
        title,
        message,
        ...options
    }),
    
    info: (title: string, message?: string, options?: Partial<Notification>) => ({
        type: 'info' as const,
        title,
        message,
        ...options
    })
}

// Hook for easy notification usage
export const useNotify = () => {
    const { addNotification } = useNotifications()
    
    return {
        success: (title: string, message?: string, options?: Partial<Notification>) => 
            addNotification(createNotification.success(title, message, options)),
            
        error: (title: string, message?: string, options?: Partial<Notification>) => 
            addNotification(createNotification.error(title, message, options)),
            
        warning: (title: string, message?: string, options?: Partial<Notification>) => 
            addNotification(createNotification.warning(title, message, options)),
            
        info: (title: string, message?: string, options?: Partial<Notification>) => 
            addNotification(createNotification.info(title, message, options))
    }
}
