import type { MetaFunction } from "react-router"
import { motion } from "framer-motion"
import { 
    CheckCircleIcon,
    ExclamationTriangleIcon,
    ClockIcon,

    ShieldCheckIcon,
    BoltIcon
} from "@heroicons/react/24/outline"
import { Card, CardContent } from "~/components/ui/Card"
import { StatusCard, UptimeChart } from "~/components/status/StatusCard"
import { IncidentItem } from "~/components/status/IncidentItem"
import { 
    SERVICES, 
    RECENT_INCIDENTS, 
    UPTIME_HISTORY, 
    PERFORMANCE_METRICS,
    getOverallStatus,
    getAverageUptime,
    getActiveIncidents
} from "~/data/StatusData"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `System Status - ${COMPANY_INFO.name}` },
        { name: "description", content: "Real-time system status, uptime monitoring, and incident reports for SaaS Pro services. Check current service health and performance metrics." },
        { name: "keywords", content: "system status, uptime, monitoring, incidents, service health, performance" },
        { property: "og:title", content: `System Status - ${COMPANY_INFO.name}` },
        { property: "og:description", content: "Real-time system status and uptime monitoring for SaaS Pro" },
        { property: "og:type", content: "website" },
    ]
}

export default function Status() {
    const overallStatus = getOverallStatus()
    const averageUptime = getAverageUptime()
    const activeIncidents = getActiveIncidents()

    const getOverallStatusText = (status: string) => {
        const statusMap: Record<string, string> = {
            operational: "All Systems Operational",
            degraded: "Degraded Performance",
            partial_outage: "Partial System Outage",
            major_outage: "Major System Outage"
        }
        return statusMap[status] || status
    }

    const getOverallStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            operational: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900",
            degraded: "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900",
            partial_outage: "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900",
            major_outage: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900"
        }
        return colors[status] || "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900"
    }

    const getOverallStatusIcon = (status: string) => {
        const icons: Record<string, JSX.Element> = {
            operational: <CheckCircleIcon className="h-8 w-8 text-green-500" />,
            degraded: <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />,
            partial_outage: <ExclamationTriangleIcon className="h-8 w-8 text-orange-500" />,
            major_outage: <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
        }
        return icons[status] || <ClockIcon className="h-8 w-8 text-gray-500" />
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                                <ShieldCheckIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                    System Status
                                </span>
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            System 
                            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                {" "}Status
                            </span>
                            <br />& Uptime
                        </h1>
                        
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Real-time monitoring of all SaaS Pro services. Check current system health, 
                            uptime statistics, and incident reports.
                        </p>

                        {/* Overall Status Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="max-w-2xl mx-auto"
                        >
                            <Card className="border-0 shadow-xl">
                                <CardContent className="p-8">
                                    <div className="flex items-center justify-center space-x-4 mb-4">
                                        {getOverallStatusIcon(overallStatus)}
                                        <div className="text-center">
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {getOverallStatusText(overallStatus)}
                                            </h2>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getOverallStatusColor(overallStatus)}`}>
                                                {overallStatus === "operational" ? "🟢" : "🟡"} {getOverallStatusText(overallStatus)}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                                {averageUptime}%
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Average Uptime
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                                {SERVICES.length}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Services Monitored
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                                {activeIncidents.length}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Active Incidents
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Performance Metrics */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Performance Metrics
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Key performance indicators for our services
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {PERFORMANCE_METRICS.map((metric) => (
                            <motion.div
                                key={metric.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                            >
                                <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-center mb-3">
                                            <BoltIcon className="h-8 w-8 text-blue-500" />
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                            {metric.value}
                                        </div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            {metric.name}
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                                            {metric.description}
                                        </div>
                                        <div className={`flex items-center justify-center space-x-1 text-xs ${
                                            metric.trend === "up" 
                                                ? "text-green-600 dark:text-green-400"
                                                : metric.trend === "down"
                                                ? "text-red-600 dark:text-red-400"
                                                : "text-gray-600 dark:text-gray-400"
                                        }`}>
                                            <span>
                                                {metric.trend === "up" ? "📈" : metric.trend === "down" ? "📉" : "➡️"}
                                            </span>
                                            <span>
                                                {metric.change > 0 ? "+" : ""}{metric.change}
                                                {metric.unit === "%" ? "%" : metric.unit === "ms" ? "ms" : ""}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Services Status */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Service Status
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Current status of all SaaS Pro services
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {SERVICES.map((service, index) => (
                            <StatusCard
                                key={service.id}
                                service={service}
                                index={index}
                            />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Uptime History */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Uptime History
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Historical uptime data and performance trends
                        </p>
                    </motion.div>

                    <UptimeChart data={UPTIME_HISTORY} />
                </div>
            </section>

            {/* Recent Incidents */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Recent Incidents
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Latest incident reports and status updates
                        </p>
                    </motion.div>

                    {RECENT_INCIDENTS.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-6 max-w-4xl mx-auto"
                        >
                            {RECENT_INCIDENTS.map((incident, index) => (
                                <IncidentItem
                                    key={incident.id}
                                    incident={incident}
                                    index={index}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-center py-16"
                        >
                            <div className="text-6xl mb-4">✅</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No Recent Incidents
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                All systems are running smoothly with no reported incidents.
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Subscribe to Updates */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Stay Updated
                        </h2>
                        <p className="text-green-100 mb-8 text-lg">
                            Subscribe to status updates and get notified about incidents and maintenance windows
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 focus:outline-none"
                            />
                            <button className="px-6 py-3 bg-white text-green-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
