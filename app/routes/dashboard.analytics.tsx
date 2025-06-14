import type { MetaFunction } from "@remix-run/node"
import { useState } from "react"
import { useQuery } from '@tanstack/react-query'
import {
    ChartBarIcon,
    CurrencyDollarIcon,
    UsersIcon,
    ArrowTrendingUpIcon,
    CalendarIcon,
    EyeIcon,
    GlobeAltIcon,
    DevicePhoneMobileIcon,
    ComputerDesktopIcon,
} from "@heroicons/react/24/outline"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,

    PieChart,
    Pie,
    Cell,

} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
// import { Button } from "~/components/ui/button"
// import { useAnalytics } from "~/lib/store"
import { queryKeys } from "~/lib/query-client"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `Analytics - ${COMPANY_INFO.name}` },
        { name: "description", content: "Real-time analytics dan insights untuk bisnis Anda" },
    ]
}

// Mock API functions
const fetchAnalyticsOverview = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate loading
    return {
        totalRevenue: 245780,
        revenueGrowth: 12.5,
        totalUsers: 8924,
        userGrowth: 8.3,
        totalSessions: 34567,
        sessionGrowth: 15.2,
        conversionRate: 3.8,
        conversionGrowth: -2.1,
        avgSessionDuration: 245, // seconds
        bounceRate: 42.5,
        pageViews: 156789,
        uniqueVisitors: 12345,
    }
}

const fetchRevenueData = async (period: string) => {
    console.log('Fetching revenue data for period:', period)
    await new Promise(resolve => setTimeout(resolve, 800))
    const data = [
        { date: '2024-01-01', revenue: 12000, target: 15000 },
        { date: '2024-01-02', revenue: 15000, target: 15000 },
        { date: '2024-01-03', revenue: 18000, target: 15000 },
        { date: '2024-01-04', revenue: 14000, target: 15000 },
        { date: '2024-01-05', revenue: 22000, target: 15000 },
        { date: '2024-01-06', revenue: 25000, target: 15000 },
        { date: '2024-01-07', revenue: 28000, target: 15000 },
    ]
    return data
}

const fetchTrafficSources = async () => {
    await new Promise(resolve => setTimeout(resolve, 600))
    return [
        { name: 'Organic Search', value: 45, color: '#3B82F6' },
        { name: 'Direct', value: 25, color: '#10B981' },
        { name: 'Social Media', value: 15, color: '#F59E0B' },
        { name: 'Email', value: 10, color: '#EF4444' },
        { name: 'Referral', value: 5, color: '#8B5CF6' },
    ]
}

const fetchDeviceStats = async () => {
    await new Promise(resolve => setTimeout(resolve, 700))
    return [
        { device: 'Desktop', sessions: 15234, percentage: 58 },
        { device: 'Mobile', sessions: 9876, percentage: 37 },
        { device: 'Tablet', sessions: 1345, percentage: 5 },
    ]
}

const fetchTopPages = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return [
        { page: '/', views: 45678, uniqueViews: 34567 },
        { page: '/dashboard', views: 23456, uniqueViews: 18765 },
        { page: '/pricing', views: 12345, uniqueViews: 9876 },
        { page: '/features', views: 9876, uniqueViews: 7654 },
        { page: '/contact', views: 5432, uniqueViews: 4321 },
    ]
}

export default function AnalyticsDashboard() {
    // const { dateRange, metric, setDateRange, setMetric } = useAnalytics()
    const [selectedPeriod, setSelectedPeriod] = useState('7d')

    // Queries
    const { data: overview, isLoading: overviewLoading } = useQuery({
        queryKey: queryKeys.analyticsOverview(),
        queryFn: fetchAnalyticsOverview,
        refetchInterval: 30000, // Refetch every 30 seconds for real-time data
    })

    const { data: revenueData, isLoading: revenueLoading } = useQuery({
        queryKey: queryKeys.analyticsRevenue(selectedPeriod),
        queryFn: () => fetchRevenueData(selectedPeriod),
        refetchInterval: 60000, // Refetch every minute
    })

    const { data: trafficSources, isLoading: trafficLoading } = useQuery({
        queryKey: ['analytics', 'traffic-sources'],
        queryFn: fetchTrafficSources,
        refetchInterval: 120000, // Refetch every 2 minutes
    })

    const { data: deviceStats, isLoading: deviceLoading } = useQuery({
        queryKey: ['analytics', 'device-stats'],
        queryFn: fetchDeviceStats,
        refetchInterval: 120000,
    })

    const { data: topPages, isLoading: pagesLoading } = useQuery({
        queryKey: ['analytics', 'top-pages'],
        queryFn: fetchTopPages,
        refetchInterval: 180000, // Refetch every 3 minutes
    })

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value)
    }

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('id-ID').format(value)
    }

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}m ${remainingSeconds}s`
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        📊 Real-time Analytics
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Monitor performa bisnis Anda secara real-time
                    </p>
                </div>

                <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                    {/* Time Period Selector */}
                    <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4 text-gray-500" />
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        >
                            <option value="1d">Hari Ini</option>
                            <option value="7d">7 Hari Terakhir</option>
                            <option value="30d">30 Hari Terakhir</option>
                            <option value="90d">90 Hari Terakhir</option>
                        </select>
                    </div>

                    {/* Auto Refresh Indicator */}
                    <div className="flex items-center space-x-1 text-xs text-green-600 dark:text-green-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Live</span>
                    </div>
                </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Total Revenue
                        </CardTitle>
                        <CurrencyDollarIcon className="h-5 w-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        {overviewLoading ? (
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        ) : (
                            <>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(overview?.totalRevenue || 0)}
                                </div>
                                <div className="flex items-center mt-1 text-sm">
                                    <ArrowTrendingUpIcon className="h-3 w-3 text-green-500 mr-1" />
                                    <span className="text-green-600 dark:text-green-400">
                                        +{overview?.revenueGrowth}%
                                    </span>
                                    <span className="text-gray-500 ml-1">vs bulan lalu</span>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Total Users
                        </CardTitle>
                        <UsersIcon className="h-5 w-5 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        {overviewLoading ? (
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        ) : (
                            <>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatNumber(overview?.totalUsers || 0)}
                                </div>
                                <div className="flex items-center mt-1 text-sm">
                                    <ArrowTrendingUpIcon className="h-3 w-3 text-green-500 mr-1" />
                                    <span className="text-green-600 dark:text-green-400">
                                        +{overview?.userGrowth}%
                                    </span>
                                    <span className="text-gray-500 ml-1">vs bulan lalu</span>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-yellow-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Conversion Rate
                        </CardTitle>
                        <ChartBarIcon className="h-5 w-5 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        {overviewLoading ? (
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        ) : (
                            <>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {overview?.conversionRate}%
                                </div>
                                <div className="flex items-center mt-1 text-sm">
                                    <span className={`${overview?.conversionGrowth && overview.conversionGrowth < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                        {overview?.conversionGrowth && overview.conversionGrowth > 0 ? '+' : ''}{overview?.conversionGrowth}%
                                    </span>
                                    <span className="text-gray-500 ml-1">vs bulan lalu</span>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Avg. Session Duration
                        </CardTitle>
                        <EyeIcon className="h-5 w-5 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        {overviewLoading ? (
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        ) : (
                            <>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatDuration(overview?.avgSessionDuration || 0)}
                                </div>
                                <div className="flex items-center mt-1 text-sm">
                                    <span className="text-gray-500">
                                        Bounce Rate: {overview?.bounceRate}%
                                    </span>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <ChartBarIcon className="h-5 w-5 mr-2" />
                            Revenue Trend
                        </CardTitle>
                        <CardDescription>
                            Revenue vs target dalam periode {selectedPeriod}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {revenueLoading ? (
                            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        ) : (
                            <ResponsiveContainer width="100%" height={320}>
                                <AreaChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={(value) => new Date(value).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                    />
                                    <YAxis
                                        tickFormatter={(value) => `${value / 1000}K`}
                                    />
                                    <Tooltip
                                        formatter={(value, name) => [formatCurrency(value as number), name === 'revenue' ? 'Revenue' : 'Target']}
                                        labelFormatter={(value) => new Date(value).toLocaleDateString('id-ID')}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#3B82F6"
                                        fill="#3B82F6"
                                        fillOpacity={0.3}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="target"
                                        stroke="#EF4444"
                                        strokeDasharray="5 5"
                                        fill="transparent"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                {/* Traffic Sources */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <GlobeAltIcon className="h-5 w-5 mr-2" />
                            Traffic Sources
                        </CardTitle>
                        <CardDescription>
                            Sumber traffic website Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {trafficLoading ? (
                            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        ) : (
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={trafficSources}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        dataKey="value"
                                        label={({ name, value }) => `${name}: ${value}%`}
                                    >
                                        {trafficSources?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                {/* Device Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <DevicePhoneMobileIcon className="h-5 w-5 mr-2" />
                            Device Statistics
                        </CardTitle>
                        <CardDescription>
                            Distribusi penggunaan device
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {deviceLoading ? (
                            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        ) : (
                            <div className="space-y-4">
                                {deviceStats?.map((device) => (
                                    <div key={device.device} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            {device.device === 'Desktop' && <ComputerDesktopIcon className="h-5 w-5 text-blue-500" />}
                                            {device.device === 'Mobile' && <DevicePhoneMobileIcon className="h-5 w-5 text-green-500" />}
                                            {device.device === 'Tablet' && <DevicePhoneMobileIcon className="h-5 w-5 text-yellow-500" />}
                                            <span className="font-medium">{device.device}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold">{formatNumber(device.sessions)}</div>
                                            <div className="text-sm text-gray-500">{device.percentage}%</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Top Pages */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <EyeIcon className="h-5 w-5 mr-2" />
                        Top Pages
                    </CardTitle>
                    <CardDescription>
                        Halaman dengan traffic tertinggi
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {pagesLoading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 font-medium text-gray-600 dark:text-gray-400">Page</th>
                                        <th className="text-right py-2 font-medium text-gray-600 dark:text-gray-400">Page Views</th>
                                        <th className="text-right py-2 font-medium text-gray-600 dark:text-gray-400">Unique Views</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topPages?.map((page) => (
                                        <tr key={page.page} className="border-b last:border-0">
                                            <td className="py-3 font-mono text-sm">{page.page}</td>
                                            <td className="py-3 text-right font-semibold">{formatNumber(page.views)}</td>
                                            <td className="py-3 text-right text-gray-600 dark:text-gray-400">{formatNumber(page.uniqueViews)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
} 