import { Link, useLocation } from "react-router"
import { useState } from "react"
import {
    Bars3Icon,
    XMarkIcon,
    MoonIcon,
    SunIcon
} from "@heroicons/react/24/outline"
import { Button } from "~/components/ui/Button"
import { MAIN_NAV, COMPANY_INFO } from "~/data/constants"
import { cn } from "~/lib/utils"

interface HeaderProps {
    isAuthenticated?: boolean
    user?: {
        name: string
        avatar?: string
    }
}

export function Header({ isAuthenticated, user }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const location = useLocation()

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        // Toggle dark class on document element
        document.documentElement.classList.toggle('dark')
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                                <span className="text-white font-bold">S</span>
                            </div>
                            <span className="hidden font-bold sm:inline-block text-xl">
                                {COMPANY_INFO.name}
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {MAIN_NAV.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    location.pathname === item.href
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleDarkMode}
                            className="hidden sm:inline-flex"
                        >
                            {darkMode ? (
                                <SunIcon className="h-5 w-5" />
                            ) : (
                                <MoonIcon className="h-5 w-5" />
                            )}
                        </Button>

                        {/* Auth Buttons or User Menu */}
                        {isAuthenticated && user ? (
                            <div className="flex items-center space-x-3">
                                <span className="hidden sm:inline-block text-sm font-medium">
                                    {user.name}
                                </span>
                                <Link to="/dashboard">
                                    <Button variant="default" size="sm">
                                        Dashboard
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center space-x-2">
                                <Link to="/auth/signin">
                                    <Button variant="ghost" size="sm">
                                        Masuk
                                    </Button>
                                </Link>
                                <Link to="/auth/signup">
                                    <Button variant="gradient" size="sm">
                                        Daftar Gratis
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {MAIN_NAV.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className={cn(
                                        "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                                        location.pathname === item.href
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    )}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            ))}

                            {/* Mobile Auth Buttons */}
                            {!isAuthenticated && (
                                <div className="flex flex-col space-y-2 pt-4 border-t">
                                    <Link to="/auth/signin">
                                        <Button variant="ghost" className="w-full justify-start">
                                            Masuk
                                        </Button>
                                    </Link>
                                    <Link to="/auth/signup">
                                        <Button variant="gradient" className="w-full justify-start">
                                            Daftar Gratis
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
} 