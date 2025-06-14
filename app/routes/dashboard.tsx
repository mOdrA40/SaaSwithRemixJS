import { Outlet, Link, useLocation, Form } from "react-router"
import { useState, useEffect } from "react"
import {
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    ChevronDownIcon,
    ArrowRightOnRectangleIcon,
    UserCircleIcon,
    BellIcon,
    CommandLineIcon,
} from "@heroicons/react/24/outline"
import { Button } from "~/components/ui/button"
import { CommandPalette, useCommandPalette } from "~/components/ui/command-palette"
import { DASHBOARD_NAV, COMPANY_INFO } from "~/data/constants"
import { cn } from "~/lib/utils"

// Mock user data - in real app, this would come from session/loader
const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
    plan: "Pro"
}

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const location = useLocation()
    const { isOpen, open, close } = useCommandPalette()

    // Global keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd/Ctrl + K to open command palette
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                open()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open])

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 flex z-40 md:hidden">
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75"
                        onClick={() => setSidebarOpen(false)}
                        onKeyDown={(e) => e.key === 'Escape' && setSidebarOpen(false)}
                        role="button"
                        tabIndex={0}
                    />
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <XMarkIcon className="h-6 w-6 text-white" />
                            </button>
                        </div>
                        <SidebarContent />
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <SidebarContent />
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                {/* Top bar */}
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
                    <button
                        className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>

                    <div className="flex-1 px-4 flex justify-between">
                        <div className="flex-1 flex items-center">
                            {/* Breadcrumb or search could go here */}
                            <nav className="flex" aria-label="Breadcrumb">
                                <ol className="flex items-center space-x-4">
                                    <li>
                                        <div>
                                            <Link to="/dashboard" className="text-gray-400 hover:text-gray-500">
                                                <HomeIcon className="flex-shrink-0 h-5 w-5" />
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <span className="text-gray-400">/</span>
                                            <span className="ml-4 text-sm font-medium text-gray-500 capitalize">
                                                {location.pathname.split('/')[2] || 'Dashboard'}
                                            </span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        <div className="ml-4 flex items-center md:ml-6">
                            {/* Command Palette */}
                            <button
                                className="bg-white dark:bg-gray-800 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                                onClick={open}
                                title="Open command palette (⌘K)"
                            >
                                <CommandLineIcon className="h-6 w-6" />
                            </button>

                            {/* Notifications */}
                            <button className="bg-white dark:bg-gray-800 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <BellIcon className="h-6 w-6" />
                            </button>

                            {/* Profile dropdown */}
                            <div className="ml-3 relative">
                                <div>
                                    <button
                                        className="max-w-xs bg-white dark:bg-gray-800 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    >
                                        <div className="flex items-center space-x-3 px-3 py-2">
                                            <div className="flex-shrink-0">
                                                {mockUser.avatar ? (
                                                    <img className="h-8 w-8 rounded-full" src={mockUser.avatar} alt="" />
                                                ) : (
                                                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                    {mockUser.name}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {mockUser.plan} Plan
                                                </div>
                                            </div>
                                            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                                        </div>
                                    </button>
                                </div>

                                {userMenuOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
                                        <Link
                                            to="/dashboard/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            Profile Settings
                                        </Link>
                                        <Link
                                            to="/dashboard/billing"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            Billing
                                        </Link>
                                        <Form method="post" action="/auth/logout" className="block">
                                            <button
                                                type="submit"
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                            >
                                                <ArrowRightOnRectangleIcon className="inline h-4 w-4 mr-2" />
                                                Sign out
                                            </button>
                                        </Form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50 dark:bg-gray-900">
                    <Outlet />
                </main>
            </div>

            {/* Command Palette */}
            <CommandPalette isOpen={isOpen} onClose={close} />
        </div>
    )
}

function SidebarContent() {
    const location = useLocation()

    return (
        <div className="flex flex-col h-full pt-5 pb-4 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 px-4">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                        <span className="text-white font-bold">S</span>
                    </div>
                    <span className="font-bold text-xl text-gray-900 dark:text-white">
                        {COMPANY_INFO.name}
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="mt-8 flex-1 px-2 space-y-1">
                {DASHBOARD_NAV.map((item) => {
                    const isActive = location.pathname === item.href ||
                        (item.href !== '/dashboard' && location.pathname.startsWith(item.href))

                    return (
                        <Link
                            key={item.title}
                            to={item.href}
                            className={cn(
                                "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                            )}
                        >
                            {item.icon && (
                                <item.icon
                                    className={cn(
                                        "mr-3 flex-shrink-0 h-5 w-5",
                                        isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"
                                    )}
                                />
                            )}
                            {item.title}
                        </Link>
                    )
                })}
            </nav>

            {/* Upgrade prompt */}
            <div className="flex-shrink-0 px-4 pb-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Upgrade to Pro
                    </h3>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                        Unlock advanced features and unlimited projects
                    </p>
                    <Link to="/dashboard/billing">
                        <Button variant="gradient" size="sm" className="mt-3 w-full">
                            Upgrade Now
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
} 