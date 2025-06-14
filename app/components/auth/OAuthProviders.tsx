import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "~/components/ui/Button"
import { cn } from "~/lib/utils"

interface OAuthProvider {
    id: string
    name: string
    icon: React.ReactNode
    color: string
    hoverColor: string
    textColor: string
}

interface OAuthProvidersProps {
    onProviderClick?: (providerId: string) => void
    isLoading?: boolean
    loadingProvider?: string
    className?: string
    variant?: 'default' | 'compact' | 'icons-only'
}

const providers: OAuthProvider[] = [
    {
        id: 'google',
        name: 'Google',
        color: 'bg-white border-gray-300 hover:bg-gray-50',
        hoverColor: 'hover:border-gray-400',
        textColor: 'text-gray-700',
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
        )
    },
    {
        id: 'github',
        name: 'GitHub',
        color: 'bg-gray-900 hover:bg-gray-800',
        hoverColor: 'hover:bg-gray-800',
        textColor: 'text-white',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        )
    },
    {
        id: 'microsoft',
        name: 'Microsoft',
        color: 'bg-blue-600 hover:bg-blue-700',
        hoverColor: 'hover:bg-blue-700',
        textColor: 'text-white',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
            </svg>
        )
    },
    {
        id: 'apple',
        name: 'Apple',
        color: 'bg-black hover:bg-gray-800',
        hoverColor: 'hover:bg-gray-800',
        textColor: 'text-white',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
        )
    },
    {
        id: 'discord',
        name: 'Discord',
        color: 'bg-indigo-600 hover:bg-indigo-700',
        hoverColor: 'hover:bg-indigo-700',
        textColor: 'text-white',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
        )
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        color: 'bg-blue-700 hover:bg-blue-800',
        hoverColor: 'hover:bg-blue-800',
        textColor: 'text-white',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        )
    }
]

const OAuthProviders = ({ 
    onProviderClick, 
    isLoading = false, 
    loadingProvider,
    className,
    variant = 'default'
}: OAuthProvidersProps) => {
    const [hoveredProvider, setHoveredProvider] = useState<string | null>(null)

    const handleProviderClick = (providerId: string) => {
        if (!isLoading) {
            onProviderClick?.(providerId)
        }
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

    const getButtonContent = (provider: OAuthProvider) => {
        const isCurrentlyLoading = isLoading && loadingProvider === provider.id
        
        if (variant === 'icons-only') {
            return (
                <div className="flex items-center justify-center">
                    {isCurrentlyLoading ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                        />
                    ) : (
                        provider.icon
                    )}
                </div>
            )
        }

        return (
            <div className="flex items-center justify-center space-x-3">
                {isCurrentlyLoading ? (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                    />
                ) : (
                    provider.icon
                )}
                {variant !== 'compact' && (
                    <span className="font-medium">
                        Continue with {provider.name}
                    </span>
                )}
                {variant === 'compact' && (
                    <span className="font-medium">{provider.name}</span>
                )}
            </div>
        )
    }

    const getGridCols = () => {
        switch (variant) {
            case 'icons-only':
                return 'grid-cols-3 sm:grid-cols-6'
            case 'compact':
                return 'grid-cols-2 sm:grid-cols-3'
            default:
                return 'grid-cols-1 sm:grid-cols-2'
        }
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className={cn("w-full", className)}
        >
            <div className={cn("grid gap-3", getGridCols())}>
                {providers.map((provider) => (
                    <motion.div
                        key={provider.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onHoverStart={() => setHoveredProvider(provider.id)}
                        onHoverEnd={() => setHoveredProvider(null)}
                    >
                        <Button
                            onClick={() => handleProviderClick(provider.id)}
                            disabled={isLoading}
                            className={cn(
                                "w-full transition-all duration-200 border",
                                provider.color,
                                provider.hoverColor,
                                provider.textColor,
                                variant === 'icons-only' ? "p-3 aspect-square" : "py-3",
                                hoveredProvider === provider.id && "shadow-lg transform scale-105"
                            )}
                            variant="outline"
                        >
                            {getButtonContent(provider)}
                        </Button>
                    </motion.div>
                ))}
            </div>

            {/* Loading Overlay */}
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-center"
                >
                    <div className="inline-flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"
                        />
                        <span>Connecting to {providers.find(p => p.id === loadingProvider)?.name}...</span>
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}

export default OAuthProviders
