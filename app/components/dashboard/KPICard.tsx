import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    InformationCircleIcon,
    SparklesIcon
} from "@heroicons/react/24/outline"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card"
import { cn } from "~/lib/utils"

interface KPICardProps {
    title: string
    value: number | string
    previousValue?: number
    unit?: string
    prefix?: string
    suffix?: string
    description?: string
    icon?: React.ReactNode
    color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo'
    trend?: 'up' | 'down' | 'neutral'
    trendValue?: number
    isLoading?: boolean
    animated?: boolean
    showComparison?: boolean
    onClick?: () => void
    className?: string
}

const colorVariants = {
    blue: {
        bg: 'from-blue-500 to-blue-600',
        text: 'text-blue-600',
        icon: 'bg-blue-100 text-blue-600',
        border: 'border-blue-200',
        hover: 'hover:border-blue-300'
    },
    green: {
        bg: 'from-green-500 to-green-600',
        text: 'text-green-600',
        icon: 'bg-green-100 text-green-600',
        border: 'border-green-200',
        hover: 'hover:border-green-300'
    },
    yellow: {
        bg: 'from-yellow-500 to-yellow-600',
        text: 'text-yellow-600',
        icon: 'bg-yellow-100 text-yellow-600',
        border: 'border-yellow-200',
        hover: 'hover:border-yellow-300'
    },
    red: {
        bg: 'from-red-500 to-red-600',
        text: 'text-red-600',
        icon: 'bg-red-100 text-red-600',
        border: 'border-red-200',
        hover: 'hover:border-red-300'
    },
    purple: {
        bg: 'from-purple-500 to-purple-600',
        text: 'text-purple-600',
        icon: 'bg-purple-100 text-purple-600',
        border: 'border-purple-200',
        hover: 'hover:border-purple-300'
    },
    indigo: {
        bg: 'from-indigo-500 to-indigo-600',
        text: 'text-indigo-600',
        icon: 'bg-indigo-100 text-indigo-600',
        border: 'border-indigo-200',
        hover: 'hover:border-indigo-300'
    }
}

// Counter animation hook
const useCounter = (end: number, duration: number = 2000, shouldAnimate: boolean = true) => {
    const [count, setCount] = useState(shouldAnimate ? 0 : end)
    
    useEffect(() => {
        if (!shouldAnimate) {
            setCount(end)
            return
        }
        
        let startTime: number
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            
            if (typeof end === 'number') {
                setCount(Math.floor(progress * end))
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }
        
        requestAnimationFrame(animate)
    }, [end, duration, shouldAnimate])
    
    return count
}

const KPICard = ({
    title,
    value,
    previousValue,
    unit = '',
    prefix = '',
    suffix = '',
    description,
    icon,
    color = 'blue',
    trend,
    trendValue,
    isLoading = false,
    animated = true,
    showComparison = true,
    onClick,
    className
}: KPICardProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    
    const colorScheme = colorVariants[color]
    const numericValue = typeof value === 'number' ? value : parseFloat(value.toString()) || 0
    const animatedValue = useCounter(numericValue, 2000, animated && !isLoading)
    
    // Calculate trend if not provided
    const calculatedTrend = trend || (previousValue !== undefined ? 
        (numericValue > previousValue ? 'up' : numericValue < previousValue ? 'down' : 'neutral') : 
        'neutral'
    )
    
    const calculatedTrendValue = trendValue || (previousValue !== undefined ? 
        ((numericValue - previousValue) / previousValue) * 100 : 0
    )

    const formatValue = (val: number) => {
        if (val >= 1000000) {
            return (val / 1000000).toFixed(1) + 'M'
        } else if (val >= 1000) {
            return (val / 1000).toFixed(1) + 'K'
        }
        return val.toLocaleString()
    }

    const displayValue = typeof value === 'string' ? value : formatValue(animated ? animatedValue : numericValue)

    const cardVariants = {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        hover: { y: -5, scale: 1.02 },
        tap: { scale: 0.98 }
    }

    const iconVariants = {
        initial: { scale: 1, rotate: 0 },
        hover: { scale: 1.1, rotate: 5 },
        tap: { scale: 0.95 }
    }

    const valueVariants = {
        initial: { scale: 1 },
        pulse: { scale: [1, 1.05, 1] }
    }

    return (
        <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            transition={{ duration: 0.3, ease: "easeOut" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
            className={cn("cursor-pointer", className)}
        >
            <Card className={cn(
                "relative overflow-hidden transition-all duration-300 border-2",
                colorScheme.border,
                colorScheme.hover,
                isHovered && "shadow-xl",
                onClick && "cursor-pointer"
            )}>
                {/* Gradient Background */}
                <div className={cn(
                    "absolute top-0 left-0 w-full h-1 bg-gradient-to-r",
                    colorScheme.bg
                )} />
                
                {/* Floating Particles Effect */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 pointer-events-none"
                        >
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ 
                                        x: Math.random() * 100 + '%', 
                                        y: '100%', 
                                        opacity: 0 
                                    }}
                                    animate={{ 
                                        y: '-10%', 
                                        opacity: [0, 1, 0] 
                                    }}
                                    transition={{ 
                                        duration: 2, 
                                        delay: i * 0.2,
                                        repeat: Infinity 
                                    }}
                                    className="absolute w-1 h-1 bg-blue-400 rounded-full"
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {icon && (
                                <motion.div
                                    variants={iconVariants}
                                    className={cn(
                                        "p-2 rounded-lg",
                                        colorScheme.icon
                                    )}
                                >
                                    {icon}
                                </motion.div>
                            )}
                            <div>
                                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    {title}
                                </CardTitle>
                                {description && (
                                    <div className="relative">
                                        <button
                                            onMouseEnter={() => setShowTooltip(true)}
                                            onMouseLeave={() => setShowTooltip(false)}
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <InformationCircleIcon className="h-4 w-4" />
                                        </button>
                                        
                                        <AnimatePresence>
                                            {showTooltip && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                                    className="absolute bottom-full left-0 mb-2 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10"
                                                >
                                                    {description}
                                                    <div className="absolute top-full left-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Trend Indicator */}
                        {showComparison && calculatedTrend !== 'neutral' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className={cn(
                                    "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
                                    calculatedTrend === 'up' 
                                        ? "bg-green-100 text-green-700" 
                                        : "bg-red-100 text-red-700"
                                )}
                            >
                                {calculatedTrend === 'up' ? (
                                    <ArrowTrendingUpIcon className="h-3 w-3" />
                                ) : (
                                    <ArrowTrendingDownIcon className="h-3 w-3" />
                                )}
                                <span>{Math.abs(calculatedTrendValue).toFixed(1)}%</span>
                            </motion.div>
                        )}
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="space-y-2">
                        {/* Main Value */}
                        <motion.div
                            variants={valueVariants}
                            animate={isLoading ? "pulse" : "initial"}
                            transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
                            className="flex items-baseline space-x-1"
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"
                                    />
                                    <span className="text-gray-400">Loading...</span>
                                </div>
                            ) : (
                                <>
                                    {prefix && (
                                        <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
                                            {prefix}
                                        </span>
                                    )}
                                    <span className={cn(
                                        "text-3xl font-bold",
                                        colorScheme.text
                                    )}>
                                        {displayValue}
                                    </span>
                                    {unit && (
                                        <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
                                            {unit}
                                        </span>
                                    )}
                                    {suffix && (
                                        <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
                                            {suffix}
                                        </span>
                                    )}
                                </>
                            )}
                        </motion.div>

                        {/* Previous Value Comparison */}
                        {showComparison && previousValue !== undefined && !isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-sm text-gray-500 dark:text-gray-400"
                            >
                                Previous: {formatValue(previousValue)}{unit}
                            </motion.div>
                        )}
                    </div>
                </CardContent>

                {/* Hover Effect Overlay */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-2 right-2"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <SparklesIcon className="h-4 w-4 text-yellow-400" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </motion.div>
    )
}

export default KPICard
