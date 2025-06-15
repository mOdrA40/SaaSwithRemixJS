import { motion } from "framer-motion"
import { ClockIcon } from "@heroicons/react/24/outline"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card"
import { STATUS_COLORS } from "~/data/StatusData"

interface StatusCardProps {
    service: {
        id: string
        name: string
        description: string
        status: "operational" | "degraded" | "partial_outage" | "major_outage" | "maintenance"
        uptime: number
        responseTime: number
        lastChecked: string
        icon: string
    }
    index: number
}

export function StatusCard({ service, index }: StatusCardProps) {
    const getStatusText = (status: string) => {
        const statusMap: Record<string, string> = {
            operational: "Operational",
            degraded: "Degraded Performance",
            partial_outage: "Partial Outage",
            major_outage: "Major Outage",
            maintenance: "Under Maintenance"
        }
        return statusMap[status] || status
    }

    const getStatusIcon = (status: string) => {
        const iconMap: Record<string, string> = {
            operational: "🟢",
            degraded: "🟡",
            partial_outage: "🟠",
            major_outage: "🔴",
            maintenance: "🔵"
        }
        return iconMap[status] || "⚪"
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
        >
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">{service.icon}</span>
                            <div>
                                <CardTitle className="text-lg">{service.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">{getStatusIcon(service.status)}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Status Badge */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Status
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[service.status]}`}>
                                {getStatusText(service.status)}
                            </span>
                        </div>

                        {/* Uptime */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Uptime (30 days)
                            </span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {service.uptime}%
                            </span>
                        </div>

                        {/* Response Time */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Response Time
                            </span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {service.responseTime}ms
                            </span>
                        </div>

                        {/* Last Checked */}
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-1">
                                <ClockIcon className="h-3 w-3" />
                                <span>Last checked</span>
                            </div>
                            <span>
                                {new Date(service.lastChecked).toLocaleTimeString()}
                            </span>
                        </div>

                        {/* Uptime Bar */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500 dark:text-gray-500">Uptime</span>
                                <span className="text-gray-500 dark:text-gray-500">{service.uptime}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        service.uptime >= 99.5
                                            ? "bg-green-500"
                                            : service.uptime >= 95
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                    }`}
                                    style={{ width: `${service.uptime}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

interface UptimeChartProps {
    data: Array<{
        date: string
        uptime: number
        incidents: number
    }>
}

export function UptimeChart({ data }: UptimeChartProps) {
    const maxUptime = Math.max(...data.map(d => d.uptime))
    const minUptime = Math.min(...data.map(d => d.uptime))
    const range = maxUptime - minUptime || 1

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    90-Day Uptime History
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Overall system uptime over the last 90 days
                </p>
            </div>

            <div className="space-y-4">
                {/* Chart */}
                <div className="relative h-32 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-end justify-between h-full space-x-1">
                        {data.slice(-30).map((point, index) => {
                            const height = ((point.uptime - minUptime) / range) * 100
                            const hasIncident = point.incidents > 0
                            
                            return (
                                <motion.div
                                    key={point.date}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${Math.max(height, 5)}%` }}
                                    transition={{ delay: index * 0.02 }}
                                    className={`flex-1 rounded-sm transition-colors duration-200 hover:opacity-80 ${
                                        hasIncident
                                            ? "bg-red-400"
                                            : point.uptime >= 99.5
                                            ? "bg-green-400"
                                            : point.uptime >= 95
                                            ? "bg-yellow-400"
                                            : "bg-red-400"
                                    }`}
                                    title={`${point.date}: ${point.uptime}% uptime${hasIncident ? `, ${point.incidents} incident(s)` : ""}`}
                                />
                            )
                        })}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                    <span>30 days ago</span>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-green-400 rounded-sm" />
                            <span>Good</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-yellow-400 rounded-sm" />
                            <span>Degraded</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-red-400 rounded-sm" />
                            <span>Outage</span>
                        </div>
                    </div>
                    <span>Today</span>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {(data.reduce((sum, d) => sum + d.uptime, 0) / data.length).toFixed(2)}%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                            Average Uptime
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {data.reduce((sum, d) => sum + d.incidents, 0)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                            Total Incidents
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {data.filter(d => d.uptime >= 99.9).length}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                            Perfect Days
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
