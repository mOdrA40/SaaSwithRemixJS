import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDownIcon, ChevronUpIcon, ClockIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card"
import { Button } from "~/components/ui/Button"
import { SEVERITY_COLORS } from "~/data/StatusData"

interface IncidentItemProps {
    incident: {
        id: string
        title: string
        description: string
        status: "investigating" | "identified" | "monitoring" | "resolved"
        severity: "low" | "medium" | "high" | "critical"
        startTime: string
        endTime?: string
        updates: Array<{
            id: string
            timestamp: string
            status: "investigating" | "identified" | "monitoring" | "resolved"
            message: string
            author: string
        }>
        affectedServices: string[]
    }
    index: number
}

export function IncidentItem({ incident, index }: IncidentItemProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            investigating: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
            identified: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
            monitoring: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            resolved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
        }
        return colors[status] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }

    const getStatusIcon = (status: string) => {
        const icons: Record<string, string> = {
            investigating: "🔍",
            identified: "⚠️",
            monitoring: "👁️",
            resolved: "✅"
        }
        return icons[status] || "❓"
    }

    const getSeverityIcon = (severity: string) => {
        const icons: Record<string, string> = {
            low: "🟢",
            medium: "🟡",
            high: "🟠",
            critical: "🔴"
        }
        return icons[severity] || "⚪"
    }

    const formatDuration = (startTime: string, endTime?: string) => {
        const start = new Date(startTime)
        const end = endTime ? new Date(endTime) : new Date()
        const duration = end.getTime() - start.getTime()
        
        const hours = Math.floor(duration / (1000 * 60 * 60))
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`
        }
        return `${minutes}m`
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                                <span className="text-lg">{getStatusIcon(incident.status)}</span>
                                <CardTitle className="text-lg">{incident.title}</CardTitle>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                                {incident.description}
                            </p>
                            
                            {/* Status and Severity Badges */}
                            <div className="flex items-center space-x-2 mb-3">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                                    {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                                </span>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${SEVERITY_COLORS[incident.severity]}`}>
                                    {getSeverityIcon(incident.severity)} {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                                </span>
                            </div>

                            {/* Affected Services */}
                            {incident.affectedServices.length > 0 && (
                                <div className="mb-3">
                                    <span className="text-xs text-gray-500 dark:text-gray-500 mb-1 block">
                                        Affected Services:
                                    </span>
                                    <div className="flex flex-wrap gap-1">
                                        {incident.affectedServices.map((service) => (
                                            <span
                                                key={service}
                                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                            >
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Time Information */}
                            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <ClockIcon className="h-3 w-3" />
                                    <span>Started: {new Date(incident.startTime).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <ExclamationTriangleIcon className="h-3 w-3" />
                                    <span>Duration: {formatDuration(incident.startTime, incident.endTime)}</span>
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="ml-4"
                        >
                            {isExpanded ? (
                                <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                                <ChevronDownIcon className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </CardHeader>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CardContent className="pt-0">
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                                        Incident Updates
                                    </h4>
                                    
                                    <div className="space-y-4">
                                        {incident.updates
                                            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                                            .map((update, updateIndex) => (
                                                <motion.div
                                                    key={update.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: updateIndex * 0.1 }}
                                                    className="flex space-x-3"
                                                >
                                                    <div className="flex-shrink-0">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${getStatusColor(update.status)}`}>
                                                            {getStatusIcon(update.status)}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(update.status)}`}>
                                                                {update.status.charAt(0).toUpperCase() + update.status.slice(1)}
                                                            </span>
                                                            <span className="text-xs text-gray-500 dark:text-gray-500">
                                                                {new Date(update.timestamp).toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                                            {update.message}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                                            by {update.author}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                    </div>
                                </div>
                            </CardContent>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </motion.div>
    )
}
