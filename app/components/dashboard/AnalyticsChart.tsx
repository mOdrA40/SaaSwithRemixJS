import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts"
import {
    ChartBarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    CalendarDaysIcon
} from "@heroicons/react/24/outline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { cn } from "~/lib/utils"

interface ChartData {
    name: string
    value: number
    previousValue?: number
    date?: string
    category?: string
}

interface TooltipPayload {
    name: string
    value: number
    color: string
    payload?: {
        map?: (fn: (item: TooltipPayload, index: number) => React.ReactNode) => React.ReactNode[]
    }
}

interface TooltipProps {
    active?: boolean
    payload?: TooltipPayload[]
    label?: string
}

interface AnalyticsChartProps {
    title: string
    description?: string
    data: ChartData[]
    type?: 'line' | 'area' | 'bar' | 'pie'
    color?: string
    height?: number
    showComparison?: boolean
    showTrend?: boolean
    timeRange?: '7d' | '30d' | '90d' | '1y'
    onTimeRangeChange?: (range: string) => void
    className?: string
}

const COLORS = {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#06b6d4'
}

const PIE_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4']

const AnalyticsChart = ({
    title,
    description,
    data,
    type = 'line',
    color = COLORS.primary,
    height = 300,
    showComparison = false,
    showTrend = true,
    timeRange = '30d',
    onTimeRangeChange,
    className
}: AnalyticsChartProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    // Calculate trend
    const trend = useMemo(() => {
        if (data.length < 2) return null
        
        const current = data[data.length - 1]?.value || 0
        const previous = data[data.length - 2]?.value || 0
        const change = current - previous
        const percentage = previous !== 0 ? (change / previous) * 100 : 0
        
        return {
            value: change,
            percentage: percentage,
            isPositive: change >= 0
        }
    }, [data])

    // Calculate total for pie charts
    const total = useMemo(() => {
        return data.reduce((sum, item) => sum + item.value, 0)
    }, [data])

    const timeRanges = [
        { value: '7d', label: '7 Days' },
        { value: '30d', label: '30 Days' },
        { value: '90d', label: '90 Days' },
        { value: '1y', label: '1 Year' }
    ]

    const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
        if (active && payload && payload.length) {
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
                >
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
                    {/* eslint-disable-next-line react/prop-types */}
                    {payload.map((entry: TooltipPayload, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {entry.name}: <span className="font-semibold">{entry.value.toLocaleString()}</span>
                            </span>
                        </div>
                    ))}
                </motion.div>
            )
        }
        return null
    }

    const CustomPieTooltip = ({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) => {
        if (active && payload && payload.length) {
            const data = payload[0]
            const percentage = ((data.value / total) * 100).toFixed(1)

            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
                >
                    <p className="font-semibold text-gray-900 dark:text-white">{data.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Value: <span className="font-semibold">{data.value.toLocaleString()}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Percentage: <span className="font-semibold">{percentage}%</span>
                    </p>
                </motion.div>
            )
        }
        return null
    }

    const renderChart = () => {
        const commonProps = {
            data,
            height,
            margin: { top: 5, right: 30, left: 20, bottom: 5 }
        }

        switch (type) {
            case 'area':
                return (
                    <ResponsiveContainer width="100%" height={height}>
                        <AreaChart {...commonProps}>
                            <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor={color} stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                                dataKey="name" 
                                stroke="#6b7280"
                                fontSize={12}
                            />
                            <YAxis 
                                stroke="#6b7280"
                                fontSize={12}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={color}
                                strokeWidth={2}
                                fill="url(#colorGradient)"
                                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )

            case 'bar':
                return (
                    <ResponsiveContainer width="100%" height={height}>
                        <BarChart {...commonProps}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                                dataKey="name" 
                                stroke="#6b7280"
                                fontSize={12}
                            />
                            <YAxis 
                                stroke="#6b7280"
                                fontSize={12}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar 
                                dataKey="value" 
                                fill={color}
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )

            case 'pie':
                return (
                    <ResponsiveContainer width="100%" height={height}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                onMouseEnter={(_, index) => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                {/* eslint-disable-next-line react/prop-types */}
                                {data.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                                        stroke={activeIndex === index ? "#fff" : "none"}
                                        strokeWidth={activeIndex === index ? 2 : 0}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomPieTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                )

            default: // line
                return (
                    <ResponsiveContainer width="100%" height={height}>
                        <LineChart {...commonProps}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                                dataKey="name" 
                                stroke="#6b7280"
                                fontSize={12}
                            />
                            <YAxis 
                                stroke="#6b7280"
                                fontSize={12}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={color}
                                strokeWidth={3}
                                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
                            />
                            {showComparison && (
                                <Line
                                    type="monotone"
                                    dataKey="previousValue"
                                    stroke="#9ca3af"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={{ fill: "#9ca3af", strokeWidth: 2, r: 3 }}
                                />
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                )
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={className}
        >
            <Card className={cn(
                "transition-all duration-300",
                isHovered && "shadow-lg scale-[1.02]"
            )}>
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <motion.div
                                animate={{ rotate: isHovered ? 360 : 0 }}
                                transition={{ duration: 0.5 }}
                                className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500"
                            >
                                <ChartBarIcon className="h-5 w-5 text-white" />
                            </motion.div>
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {title}
                                </CardTitle>
                                {description && (
                                    <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                                        {description}
                                    </CardDescription>
                                )}
                            </div>
                        </div>

                        {/* Time Range Selector */}
                        {onTimeRangeChange && (
                            <div className="flex items-center space-x-1">
                                <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
                                <select
                                    value={timeRange}
                                    onChange={(e) => onTimeRangeChange(e.target.value)}
                                    className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white dark:bg-gray-800 dark:border-gray-600"
                                >
                                    {timeRanges.map(range => (
                                        <option key={range.value} value={range.value}>
                                            {range.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Trend Indicator */}
                    {showTrend && trend && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-2 mt-2"
                        >
                            {trend.isPositive ? (
                                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                            ) : (
                                <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
                            )}
                            <span className={cn(
                                "text-sm font-medium",
                                trend.isPositive ? "text-green-600" : "text-red-600"
                            )}>
                                {trend.isPositive ? '+' : ''}{trend.percentage.toFixed(1)}%
                            </span>
                            <span className="text-sm text-gray-500">vs previous period</span>
                        </motion.div>
                    )}
                </CardHeader>

                <CardContent>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {renderChart()}
                    </motion.div>

                    {/* Pie Chart Legend */}
                    {type === 'pie' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-4 grid grid-cols-2 gap-2"
                        >
                            {/* eslint-disable-next-line react/prop-types */}
                            {data.map((entry, index) => (
                                <div key={entry.name} className="flex items-center space-x-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {entry.name}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default AnalyticsChart
