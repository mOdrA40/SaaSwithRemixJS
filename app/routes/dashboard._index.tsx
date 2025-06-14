import type { MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData, Link } from "@remix-run/react"

import {
    ChartBarIcon,
    UsersIcon,
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    DocumentTextIcon,
    PlusIcon,
    ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { COMPANY_INFO } from "~/data/constants"
import { formatCurrency } from "~/lib/utils"

export const meta: MetaFunction = () => {
    return [
        { title: `Dashboard - ${COMPANY_INFO.name}` },
        { name: "description", content: "Dashboard overview dan statistics untuk mengelola bisnis Anda" },
    ]
}

export async function loader() {
    // TODO: Get actual user data from session/database
    // For now, return mock data
    const stats = {
        totalRevenue: 125000,
        totalUsers: 1250,
        activeProjects: 23,
        conversionRate: 12.5,
        revenueGrowth: 23.1,
        userGrowth: 15.3,
        projectGrowth: 8.7,
    }

    const recentActivity = [
        {
            id: 1,
            type: "user_joined",
            message: "John Doe bergabung ke tim Anda",
            time: "2 menit lalu",
            icon: "👤"
        },
        {
            id: 2,
            type: "project_completed",
            message: "Project 'Website Redesign' telah selesai",
            time: "1 jam lalu",
            icon: "✅"
        },
        {
            id: 3,
            type: "payment_received",
            message: "Pembayaran $299 diterima dari klien",
            time: "3 jam lalu",
            icon: "💰"
        },
        {
            id: 4,
            type: "milestone_reached",
            message: "Mencapai target 1000 pengguna aktif",
            time: "1 hari lalu",
            icon: "🎯"
        }
    ]

    return json({ stats, recentActivity })
}

export default function Dashboard() {
    const { stats, recentActivity } = useLoaderData<typeof loader>()

    const statCards = [
        {
            title: "Total Revenue",
            value: formatCurrency(stats.totalRevenue),
            description: `+${stats.revenueGrowth}% dari bulan lalu`,
            icon: CurrencyDollarIcon,
            color: "text-green-600",
            bgColor: "bg-green-100"
        },
        {
            title: "Total Users",
            value: stats.totalUsers.toLocaleString(),
            description: `+${stats.userGrowth}% dari bulan lalu`,
            icon: UsersIcon,
            color: "text-blue-600",
            bgColor: "bg-blue-100"
        },
        {
            title: "Active Projects",
            value: stats.activeProjects,
            description: `+${stats.projectGrowth}% dari bulan lalu`,
            icon: DocumentTextIcon,
            color: "text-purple-600",
            bgColor: "bg-purple-100"
        },
        {
            title: "Conversion Rate",
            value: `${stats.conversionRate}%`,
            description: "Dari total visitors",
            icon: ArrowTrendingUpIcon,
            color: "text-orange-600",
            bgColor: "bg-orange-100"
        }
    ]

    return (
        <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Selamat Datang di Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Berikut adalah ringkasan aktivitas bisnis Anda hari ini
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-3">
                    <Button variant="outline" size="sm">
                        <ChartBarIcon className="h-4 w-4 mr-2" />
                        View Analytics
                    </Button>
                    <Button variant="gradient" size="sm">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        New Project
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <Card key={stat.title} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Aktivitas Terbaru</CardTitle>
                        <CardDescription>
                            Update terbaru dari tim dan project Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div className="text-lg">{activity.icon}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {activity.message}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t">
                            <Link to="/dashboard/activity">
                                <Button variant="ghost" size="sm" className="w-full">
                                    Lihat Semua Aktivitas
                                    <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Akses cepat ke fitur-fitur utama
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Link to="/dashboard/projects/new">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Buat Project Baru
                            </Button>
                        </Link>

                        <Link to="/dashboard/users/invite">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                                <UsersIcon className="h-4 w-4 mr-2" />
                                Undang Tim Member
                            </Button>
                        </Link>

                        <Link to="/dashboard/analytics">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                                <ChartBarIcon className="h-4 w-4 mr-2" />
                                Lihat Analytics
                            </Button>
                        </Link>

                        <Link to="/dashboard/billing">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                                <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                                Kelola Billing
                            </Button>
                        </Link>

                        <div className="pt-3 border-t">
                            <Link to="/help">
                                <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600">
                                    Butuh bantuan?
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                        <CardDescription>
                            Tren pendapatan dalam 6 bulan terakhir
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                            <div className="text-center">
                                <ChartBarIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">Chart akan ditampilkan di sini</p>
                                <p className="text-xs text-gray-400 mt-1">Integration dengan Chart.js atau D3.js</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>User Growth</CardTitle>
                        <CardDescription>
                            Pertumbuhan pengguna aktif bulanan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg">
                            <div className="text-center">
                                <ArrowTrendingUpIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">Chart akan ditampilkan di sini</p>
                                <p className="text-xs text-gray-400 mt-1">Growth metrics dan analytics</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 