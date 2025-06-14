import type { MetaFunction } from "react-router"
import { useState } from "react"
import { motion } from "framer-motion"
import {
    UsersIcon,
    CurrencyDollarIcon,
    ChartBarIcon,
    EyeIcon,
    ShoppingCartIcon,
    ArrowTrendingUpIcon
} from "@heroicons/react/24/outline"
import KPICard from "~/components/dashboard/KPICard"
import { Button } from "~/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `Dashboard Components Demo - ${COMPANY_INFO.name}` },
        { name: "description", content: "Demonstration of premium dashboard components with interactive KPI cards and analytics" },
    ]
}

export default function DashboardDemo() {
    const [selectedDemo, setSelectedDemo] = useState<'kpi' | 'charts' | 'widgets'>('kpi')
    const [isLoading, setIsLoading] = useState(false)

    const kpiData = [
        {
            title: "Total Users",
            value: 12543,
            previousValue: 11200,
            icon: <UsersIcon className="h-6 w-6" />,
            color: 'blue' as const,
            description: "Total registered users on the platform"
        },
        {
            title: "Revenue",
            value: 89750,
            previousValue: 76500,
            prefix: "$",
            icon: <CurrencyDollarIcon className="h-6 w-6" />,
            color: 'green' as const,
            description: "Monthly recurring revenue"
        },
        {
            title: "Page Views",
            value: 2456789,
            previousValue: 2100000,
            icon: <EyeIcon className="h-6 w-6" />,
            color: 'purple' as const,
            description: "Total page views this month"
        },
        {
            title: "Conversion Rate",
            value: "3.24",
            previousValue: 2.89,
            suffix: "%",
            icon: <ArrowTrendingUpIcon className="h-6 w-6" />,
            color: 'yellow' as const,
            description: "Visitor to customer conversion rate"
        },
        {
            title: "Orders",
            value: 1847,
            previousValue: 1623,
            icon: <ShoppingCartIcon className="h-6 w-6" />,
            color: 'indigo' as const,
            description: "Total orders processed"
        },
        {
            title: "Growth Rate",
            value: "12.5",
            previousValue: 8.3,
            suffix: "%",
            icon: <ChartBarIcon className="h-6 w-6" />,
            color: 'red' as const,
            description: "Month over month growth"
        }
    ]

    const handleKPIClick = (title: string) => {
        console.log(`Clicked on ${title} KPI`)
        alert(`Clicked on ${title} KPI! (Demo)`)
    }

    const handleRefreshData = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 2000)
    }

    const demos = [
        {
            id: 'kpi' as const,
            title: 'KPI Cards',
            description: 'Interactive KPI cards with animations and trend indicators'
        },
        {
            id: 'charts' as const,
            title: 'Analytics Charts',
            description: 'Beautiful charts with real-time data visualization'
        },
        {
            id: 'widgets' as const,
            title: 'Dashboard Widgets',
            description: 'Customizable widgets for comprehensive dashboards'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Dashboard Components
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Premium dashboard components with real-time analytics, interactive KPI cards,
                            and beautiful data visualizations for modern business applications.
                        </p>
                    </motion.div>

                    {/* Demo Selector */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4 mb-8"
                    >
                        {demos.map((demo) => (
                            <Button
                                key={demo.id}
                                onClick={() => setSelectedDemo(demo.id)}
                                variant={selectedDemo === demo.id ? "gradient" : "outline"}
                                size="lg"
                                className="px-6"
                            >
                                {demo.title}
                            </Button>
                        ))}
                        
                        <Button
                            onClick={handleRefreshData}
                            variant="outline"
                            size="lg"
                            disabled={isLoading}
                            className="px-6"
                        >
                            {isLoading ? "Refreshing..." : "Refresh Data"}
                        </Button>
                    </motion.div>
                </div>

                {/* Demo Content */}
                <motion.div
                    key={selectedDemo}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {selectedDemo === 'kpi' && (
                        <div className="space-y-8">
                            {/* KPI Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {kpiData.map((kpi, index) => (
                                    <motion.div
                                        key={kpi.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <KPICard
                                            title={kpi.title}
                                            value={kpi.value}
                                            previousValue={kpi.previousValue}
                                            prefix={kpi.prefix}
                                            suffix={kpi.suffix}
                                            icon={kpi.icon}
                                            color={kpi.color}
                                            description={kpi.description}
                                            isLoading={isLoading}
                                            onClick={() => handleKPIClick(kpi.title)}
                                            animated={true}
                                            showComparison={true}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Features Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <span>✨</span>
                                        <span>KPI Card Features</span>
                                    </CardTitle>
                                    <CardDescription>
                                        Interactive KPI cards with advanced features and animations
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                            <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">
                                                ✓ Animated Counters
                                            </h4>
                                            <p className="text-sm text-blue-600 dark:text-blue-300">
                                                Numbers count up smoothly when loaded
                                            </p>
                                        </div>
                                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                            <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">
                                                ✓ Trend Indicators
                                            </h4>
                                            <p className="text-sm text-green-600 dark:text-green-300">
                                                Visual indicators for up/down trends
                                            </p>
                                        </div>
                                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                            <h4 className="font-medium text-purple-800 dark:text-purple-400 mb-2">
                                                ✓ Interactive Hover
                                            </h4>
                                            <p className="text-sm text-purple-600 dark:text-purple-300">
                                                Hover effects with floating particles
                                            </p>
                                        </div>
                                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                            <h4 className="font-medium text-yellow-800 dark:text-yellow-400 mb-2">
                                                ✓ Loading States
                                            </h4>
                                            <p className="text-sm text-yellow-600 dark:text-yellow-300">
                                                Elegant loading animations
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {selectedDemo === 'charts' && (
                        <div className="space-y-8">
                            {/* Charts Placeholder */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <ChartBarIcon className="h-5 w-5 text-blue-600" />
                                            <span>Revenue Analytics</span>
                                        </CardTitle>
                                        <CardDescription>
                                            Interactive line chart with trend analysis
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-64 flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                                            <div className="text-center">
                                                <ChartBarIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                                                <p className="text-gray-600 dark:text-gray-400 mb-2">
                                                    Interactive Chart Component
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Install 'recharts' to see live charts
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <EyeIcon className="h-5 w-5 text-purple-600" />
                                            <span>User Engagement</span>
                                        </CardTitle>
                                        <CardDescription>
                                            Pie chart showing user activity breakdown
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-64 flex items-center justify-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg">
                                            <div className="text-center">
                                                <div className="grid grid-cols-3 gap-4 mb-4">
                                                    <div className="text-center">
                                                        <div className="w-12 h-12 rounded-full bg-blue-500 mx-auto mb-2" />
                                                        <p className="text-sm font-medium">Desktop</p>
                                                        <p className="text-xs text-gray-500">45%</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="w-12 h-12 rounded-full bg-purple-500 mx-auto mb-2" />
                                                        <p className="text-sm font-medium">Mobile</p>
                                                        <p className="text-xs text-gray-500">35%</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="w-12 h-12 rounded-full bg-green-500 mx-auto mb-2" />
                                                        <p className="text-sm font-medium">Tablet</p>
                                                        <p className="text-xs text-gray-500">20%</p>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    Interactive Pie Chart
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Chart Features */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Chart Component Features</CardTitle>
                                    <CardDescription>
                                        Advanced charting capabilities with Recharts integration
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                            <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">
                                                📊 Multiple Chart Types
                                            </h4>
                                            <p className="text-sm text-blue-600 dark:text-blue-300">
                                                Line, Bar, Area, Pie charts with customization
                                            </p>
                                        </div>
                                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                            <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">
                                                🎨 Custom Tooltips
                                            </h4>
                                            <p className="text-sm text-green-600 dark:text-green-300">
                                                Beautiful animated tooltips with rich content
                                            </p>
                                        </div>
                                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                            <h4 className="font-medium text-purple-800 dark:text-purple-400 mb-2">
                                                📱 Responsive Design
                                            </h4>
                                            <p className="text-sm text-purple-600 dark:text-purple-300">
                                                Automatically adapts to screen sizes
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {selectedDemo === 'widgets' && (
                        <div className="space-y-8">
                            {/* Widget Examples */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Activity Feed Widget */}
                                <Card className="lg:col-span-2">
                                    <CardHeader>
                                        <CardTitle>Recent Activity</CardTitle>
                                        <CardDescription>
                                            Real-time activity feed with user interactions
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {[
                                                {
                                                    title: "New user registration",
                                                    description: "John Doe signed up for the premium plan",
                                                    time: "2 minutes ago",
                                                    type: "user",
                                                    color: "bg-blue-500"
                                                },
                                                {
                                                    title: "Payment received",
                                                    description: "$299 payment processed successfully",
                                                    time: "15 minutes ago",
                                                    type: "payment",
                                                    color: "bg-green-500"
                                                },
                                                {
                                                    title: "System update",
                                                    description: "Dashboard performance improvements deployed",
                                                    time: "1 hour ago",
                                                    type: "system",
                                                    color: "bg-yellow-500"
                                                },
                                                {
                                                    title: "New feature released",
                                                    description: "Advanced analytics module is now available",
                                                    time: "3 hours ago",
                                                    type: "feature",
                                                    color: "bg-purple-500"
                                                }
                                            ].map((activity, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`} />
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {activity.title}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {activity.description}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {activity.time}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Quick Stats Widget */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Quick Stats</CardTitle>
                                        <CardDescription>
                                            Key metrics at a glance
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {[
                                            { label: "Active Users", value: "2,543", change: "+12%" },
                                            { label: "Revenue", value: "$45,678", change: "+8%" },
                                            { label: "Conversion", value: "3.2%", change: "+0.5%" },
                                            { label: "Bounce Rate", value: "24.5%", change: "-2.1%" }
                                        ].map((stat, index) => (
                                            <motion.div
                                                key={stat.label}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                            >
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {stat.label}
                                                    </p>
                                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                        {stat.value}
                                                    </p>
                                                </div>
                                                <div className={`text-sm font-medium ${
                                                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                    {stat.change}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Widget Features */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Dashboard Widget Features</CardTitle>
                                    <CardDescription>
                                        Modular widgets for comprehensive dashboard layouts
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                            <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">
                                                🔄 Real-time Updates
                                            </h4>
                                            <p className="text-sm text-blue-600 dark:text-blue-300">
                                                Live data updates with WebSocket support
                                            </p>
                                        </div>
                                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                            <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">
                                                📱 Responsive Grid
                                            </h4>
                                            <p className="text-sm text-green-600 dark:text-green-300">
                                                Adaptive layouts for all screen sizes
                                            </p>
                                        </div>
                                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                            <h4 className="font-medium text-purple-800 dark:text-purple-400 mb-2">
                                                🎛️ Customizable
                                            </h4>
                                            <p className="text-sm text-purple-600 dark:text-purple-300">
                                                Drag & drop widget arrangement
                                            </p>
                                        </div>
                                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                            <h4 className="font-medium text-yellow-800 dark:text-yellow-400 mb-2">
                                                💾 State Persistence
                                            </h4>
                                            <p className="text-sm text-yellow-600 dark:text-yellow-300">
                                                Remember user preferences
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}
