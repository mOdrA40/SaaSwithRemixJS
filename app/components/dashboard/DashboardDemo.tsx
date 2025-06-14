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
import KPICard from "./KPICard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { Button } from "~/components/ui/Button"

// Mock data for demonstration
const kpiData = [
    {
        title: "Total Users",
        value: 12543,
        previousValue: 11200,
        unit: "",
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

// Mock chart data
const chartData = [
    { name: 'Jan', value: 4000, previousValue: 3500 },
    { name: 'Feb', value: 3000, previousValue: 2800 },
    { name: 'Mar', value: 5000, previousValue: 4200 },
    { name: 'Apr', value: 4500, previousValue: 4000 },
    { name: 'May', value: 6000, previousValue: 5200 },
    { name: 'Jun', value: 5500, previousValue: 5000 },
    { name: 'Jul', value: 7000, previousValue: 6200 }
]

const pieData = [
    { name: 'Desktop', value: 45 },
    { name: 'Mobile', value: 35 },
    { name: 'Tablet', value: 20 }
]

const DashboardDemo = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState('30d')
    const [isLoading, setIsLoading] = useState(false)

    const handleKPIClick = (title: string) => {
        console.log(`Clicked on ${title} KPI`)
    }

    const handleTimeRangeChange = (range: string) => {
        setSelectedTimeRange(range)
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => setIsLoading(false), 1000)
    }

    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="space-y-8"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Welcome back! Here's what's happening with your business today.
                    </p>
                </div>
                
                <div className="flex items-center space-x-3">
                    <select
                        value={selectedTimeRange}
                        onChange={(e) => handleTimeRangeChange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 text-sm"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                        <option value="1y">Last year</option>
                    </select>
                    
                    <Button variant="outline" size="sm">
                        Export Data
                    </Button>
                </div>
            </motion.div>

            {/* KPI Cards Grid */}
            <motion.div variants={itemVariants}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {kpiData.map((kpi, index) => (
                        <motion.div
                            key={kpi.title}
                            variants={itemVariants}
                            transition={{ delay: index * 0.1 }}
                        >
                            <KPICard
                                title={kpi.title}
                                value={kpi.value}
                                previousValue={kpi.previousValue}
                                unit={kpi.unit}
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
            </motion.div>

            {/* Charts Section */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart Placeholder */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <ChartBarIcon className="h-5 w-5 text-blue-600" />
                            <span>Revenue Trend</span>
                        </CardTitle>
                        <CardDescription>
                            Monthly revenue comparison with previous period
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="text-center">
                                <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 dark:text-gray-400">
                                    Chart component will be rendered here
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Install 'recharts' to see interactive charts
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Traffic Sources Placeholder */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <EyeIcon className="h-5 w-5 text-purple-600" />
                            <span>Traffic Sources</span>
                        </CardTitle>
                        <CardDescription>
                            Breakdown of traffic by device type
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="text-center">
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    {pieData.map((item, index) => (
                                        <div key={item.name} className="text-center">
                                            <div className={`w-12 h-12 rounded-full mx-auto mb-2 ${
                                                index === 0 ? 'bg-blue-500' :
                                                index === 1 ? 'bg-purple-500' : 'bg-green-500'
                                            }`} />
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                {item.value}%
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Pie chart component placeholder
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            Latest updates and notifications from your dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                {
                                    title: "New user registration",
                                    description: "John Doe signed up for the premium plan",
                                    time: "2 minutes ago",
                                    type: "user"
                                },
                                {
                                    title: "Payment received",
                                    description: "$299 payment processed successfully",
                                    time: "15 minutes ago",
                                    type: "payment"
                                },
                                {
                                    title: "System update",
                                    description: "Dashboard performance improvements deployed",
                                    time: "1 hour ago",
                                    type: "system"
                                },
                                {
                                    title: "New feature released",
                                    description: "Advanced analytics module is now available",
                                    time: "3 hours ago",
                                    type: "feature"
                                }
                            ].map((activity, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <div className={`w-2 h-2 rounded-full mt-2 ${
                                        activity.type === 'user' ? 'bg-blue-500' :
                                        activity.type === 'payment' ? 'bg-green-500' :
                                        activity.type === 'system' ? 'bg-yellow-500' : 'bg-purple-500'
                                    }`} />
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
            </motion.div>
        </motion.div>
    )
}

export default DashboardDemo
