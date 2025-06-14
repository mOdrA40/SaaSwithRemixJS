import type { MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useState } from "react"
import {
    UserCircleIcon,
    ShieldCheckIcon,
    BellIcon,
    EyeIcon,
    EyeSlashIcon,
    GlobeAltIcon
} from "@heroicons/react/24/outline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `Settings - ${COMPANY_INFO.name}` },
        { name: "description", content: "Kelola profile, security, dan preferensi akun Anda" },
    ]
}

export async function loader() {
    // TODO: Get actual user data from session/database
    const mockUser = {
        id: "user_123",
        name: "John Doe",
        email: "john@example.com",
        bio: "Full Stack Developer passionate about building amazing web applications",
        website: "https://johndoe.com",
        company: "Tech Startup Inc.",
        avatar: null,
        createdAt: new Date("2023-01-15"),
        settings: {
            emailNotifications: true,
            pushNotifications: false,
            marketingEmails: true,
            securityAlerts: true,
            language: "id",
            timezone: "Asia/Jakarta",
            theme: "light"
        }
    }

    return json({ user: mockUser })
}

export default function Settings() {
    const { user } = useLoaderData<typeof loader>()
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Account Settings
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Kelola profile, security, dan preferensi akun Anda
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Settings Navigation */}
                <div className="lg:col-span-1">
                    <nav className="space-y-2">
                        <a href="#profile" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                            <UserCircleIcon className="h-5 w-5 mr-3" />
                            Profile
                        </a>
                        <a href="#security" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
                            <ShieldCheckIcon className="h-5 w-5 mr-3" />
                            Security
                        </a>
                        <a href="#notifications" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
                            <BellIcon className="h-5 w-5 mr-3" />
                            Notifications
                        </a>
                        <a href="#preferences" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
                            <GlobeAltIcon className="h-5 w-5 mr-3" />
                            Preferences
                        </a>
                    </nav>
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Section */}
                    <Card id="profile">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <UserCircleIcon className="h-5 w-5 mr-2" />
                                Profile Information
                            </CardTitle>
                            <CardDescription>
                                Update informasi profile dan detail kontak Anda
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Avatar */}
                            <div className="flex items-center space-x-6">
                                <div className="flex-shrink-0">
                                    {user.avatar ? (
                                        <img className="h-16 w-16 rounded-full object-cover" src={user.avatar} alt={user.name} />
                                    ) : (
                                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                            <span className="text-white text-xl font-bold">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Button variant="outline" size="sm">
                                        Change Avatar
                                    </Button>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        JPG, PNG atau GIF. Max 5MB.
                                    </p>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Full Name"
                                    defaultValue={user.name}
                                    placeholder="Enter your full name"
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    defaultValue={user.email}
                                    placeholder="Enter your email"
                                />
                                <Input
                                    label="Website"
                                    defaultValue={user.website}
                                    placeholder="https://yourwebsite.com"
                                />
                                <Input
                                    label="Company"
                                    defaultValue={user.company}
                                    placeholder="Your company name"
                                />
                            </div>

                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium mb-2">Bio</label>
                                <textarea
                                    id="bio"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                    rows={4}
                                    defaultValue={user.bio}
                                    placeholder="Tell us about yourself..."
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button variant="gradient">
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Section */}
                    <Card id="security">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <ShieldCheckIcon className="h-5 w-5 mr-2" />
                                Security
                            </CardTitle>
                            <CardDescription>
                                Kelola password dan security settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Change Password */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    Change Password
                                </h3>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Input
                                            label="Current Password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter current password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeSlashIcon className="h-5 w-5" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <Input
                                            label="New Password"
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="Enter new password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                        >
                                            {showNewPassword ? (
                                                <EyeSlashIcon className="h-5 w-5" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>

                                    <Input
                                        label="Confirm New Password"
                                        type="password"
                                        placeholder="Confirm your new password"
                                    />
                                </div>
                            </div>

                            {/* Two Factor Authentication */}
                            <div className="border-t pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                            Two-Factor Authentication
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Add an extra layer of security to your account
                                        </p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Enable 2FA
                                    </Button>
                                </div>
                            </div>

                            {/* Active Sessions */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    Active Sessions
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                Current Session
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Chrome on Windows • Jakarta, Indonesia
                                            </p>
                                        </div>
                                        <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20 rounded-full">
                                            Active
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                Mobile App
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                iPhone • Last active 2 hours ago
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Revoke
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button variant="gradient">
                                    Update Password
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notifications Section */}
                    <Card id="notifications">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <BellIcon className="h-5 w-5 mr-2" />
                                Notification Preferences
                            </CardTitle>
                            <CardDescription>
                                Customize how you receive notifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                            Email Notifications
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Receive notifications via email
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        defaultChecked={user.settings.emailNotifications}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                            Push Notifications
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Receive push notifications in browser
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        defaultChecked={user.settings.pushNotifications}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                            Marketing Emails
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Receive updates about new features and offers
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        defaultChecked={user.settings.marketingEmails}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                            Security Alerts
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Get notified about security-related activities
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        defaultChecked={user.settings.securityAlerts}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button variant="gradient">
                                    Save Preferences
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Preferences Section */}
                    <Card id="preferences">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <GlobeAltIcon className="h-5 w-5 mr-2" />
                                Preferences
                            </CardTitle>
                            <CardDescription>
                                Customize your account preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="language" className="block text-sm font-medium mb-2">Language</label>
                                    <select
                                        id="language"
                                        defaultValue={user.settings.language}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="id">Bahasa Indonesia</option>
                                        <option value="en">English</option>
                                        <option value="es">Español</option>
                                        <option value="fr">Français</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="timezone" className="block text-sm font-medium mb-2">Timezone</label>
                                    <select
                                        id="timezone"
                                        defaultValue={user.settings.timezone}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                                        <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                                        <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                                        <option value="UTC">UTC</option>
                                    </select>
                                </div>
                            </div>

                            <fieldset>
                                <legend className="block text-sm font-medium mb-2">Theme</legend>
                                <div className="grid grid-cols-3 gap-3">
                                    <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <input
                                            type="radio"
                                            name="theme"
                                            value="light"
                                            defaultChecked={user.settings.theme === "light"}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium">Light</span>
                                    </label>
                                    <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <input
                                            type="radio"
                                            name="theme"
                                            value="dark"
                                            defaultChecked={user.settings.theme === "dark"}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium">Dark</span>
                                    </label>
                                    <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <input
                                            type="radio"
                                            name="theme"
                                            value="system"
                                            defaultChecked={user.settings.theme === "system"}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium">System</span>
                                    </label>
                                </div>
                            </fieldset>

                            <div className="flex justify-end">
                                <Button variant="gradient">
                                    Save Preferences
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Danger Zone */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-red-600 dark:text-red-400">
                                Danger Zone
                            </CardTitle>
                            <CardDescription>
                                Actions that cannot be undone
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                        Delete Account
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Permanently delete your account and all data
                                    </p>
                                </div>
                                <Button variant="destructive" size="sm">
                                    Delete Account
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 