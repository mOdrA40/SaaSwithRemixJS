import { motion } from "framer-motion"
import { CheckIcon } from "@heroicons/react/24/outline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"

interface SecurityFeatureProps {
    feature: {
        id: string
        title: string
        description: string
        icon: string
        details: string[]
        category: "encryption" | "access" | "monitoring" | "compliance" | "infrastructure"
    }
    index: number
}

export function SecurityFeature({ feature, index }: SecurityFeatureProps) {
    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            encryption: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            access: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            monitoring: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
            compliance: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
            infrastructure: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
        }
        return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
        >
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl">{feature.icon}</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(feature.category)}`}>
                            {feature.category.charAt(0).toUpperCase() + feature.category.slice(1)}
                        </span>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                        {feature.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Key Features:
                        </h4>
                        <ul className="space-y-2">
                            {feature.details.map((detail, detailIndex) => (
                                <motion.li
                                    key={detailIndex}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: (index * 0.1) + (detailIndex * 0.05) }}
                                    className="flex items-start space-x-2"
                                >
                                    <CheckIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        {detail}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

interface ComplianceCardProps {
    compliance: {
        id: string
        name: string
        description: string
        status: "certified" | "in_progress" | "planned"
        certificationDate?: string
        validUntil?: string
        logo: string
        details: string[]
    }
    index: number
}

export function ComplianceCard({ compliance, index }: ComplianceCardProps) {
    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            certified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            in_progress: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
            planned: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
        }
        return colors[status] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }

    const getStatusIcon = (status: string) => {
        const icons: Record<string, string> = {
            certified: "✅",
            in_progress: "🔄",
            planned: "📅"
        }
        return icons[status] || "❓"
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
        >
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                                    {compliance.name.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <CardTitle className="text-lg">{compliance.name}</CardTitle>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-lg">{getStatusIcon(compliance.status)}</span>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(compliance.status)}`}>
                                        {compliance.status.charAt(0).toUpperCase() + compliance.status.slice(1).replace('_', ' ')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CardDescription className="text-sm">
                        {compliance.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Certification Details */}
                        {compliance.status === "certified" && compliance.certificationDate && (
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-green-800 dark:text-green-200">
                                        Certified
                                    </span>
                                    <span className="text-green-600 dark:text-green-400">
                                        {new Date(compliance.certificationDate).toLocaleDateString()}
                                    </span>
                                </div>
                                {compliance.validUntil && (
                                    <div className="flex items-center justify-between text-sm mt-1">
                                        <span className="text-green-700 dark:text-green-300">
                                            Valid until
                                        </span>
                                        <span className="text-green-600 dark:text-green-400">
                                            {new Date(compliance.validUntil).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Compliance Details */}
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                Coverage:
                            </h4>
                            <ul className="space-y-1">
                                {compliance.details.slice(0, 3).map((detail, detailIndex) => (
                                    <motion.li
                                        key={detailIndex}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (index * 0.1) + (detailIndex * 0.05) }}
                                        className="flex items-start space-x-2"
                                    >
                                        <CheckIcon className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-xs text-gray-600 dark:text-gray-300">
                                            {detail}
                                        </span>
                                    </motion.li>
                                ))}
                                {compliance.details.length > 3 && (
                                    <li className="text-xs text-gray-500 dark:text-gray-500 ml-5">
                                        +{compliance.details.length - 3} more areas covered
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

interface SecurityMetricProps {
    metric: {
        id: string
        name: string
        value: string
        description: string
        icon: string
        trend: "up" | "down" | "stable"
    }
    index: number
}

export function SecurityMetric({ metric, index }: SecurityMetricProps) {
    const getTrendColor = (trend: string) => {
        const colors: Record<string, string> = {
            up: "text-green-600 dark:text-green-400",
            down: "text-red-600 dark:text-red-400",
            stable: "text-gray-600 dark:text-gray-400"
        }
        return colors[trend] || "text-gray-600 dark:text-gray-400"
    }

    const getTrendIcon = (trend: string) => {
        const icons: Record<string, string> = {
            up: "📈",
            down: "📉",
            stable: "➡️"
        }
        return icons[trend] || "➡️"
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
        >
            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-3">
                        <span className="text-3xl">{metric.icon}</span>
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
                    <div className={`flex items-center justify-center space-x-1 text-xs ${getTrendColor(metric.trend)}`}>
                        <span>{getTrendIcon(metric.trend)}</span>
                        <span className="capitalize">{metric.trend}</span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
