import type { MetaFunction } from "react-router"
import { useState } from "react"
import { motion } from "framer-motion"
import LoginForm from "~/components/auth/LoginForm"
import TwoFactorAuth from "~/components/auth/TwoFactorAuth"
import OAuthProviders from "~/components/auth/OAuthProviders"
import { Button } from "~/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `Auth Components Demo - ${COMPANY_INFO.name}` },
        { name: "description", content: "Demonstration of premium authentication components with advanced features" },
    ]
}

export default function AuthDemo() {
    const [currentDemo, setCurrentDemo] = useState<'login' | '2fa' | 'oauth'>('login')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | undefined>(undefined)

    const handleLoginSubmit = (data: any) => {
        console.log("Login data:", data)
        setIsLoading(true)
        setError(undefined)
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            if (data.email === "error@test.com") {
                setError("Invalid credentials. Please try again.")
            } else {
                alert("Login successful! (Demo)")
            }
        }, 2000)
    }

    const handle2FAVerify = (code: string) => {
        console.log("2FA code:", code)
        setIsLoading(true)
        setError(undefined)
        
        // Simulate verification
        setTimeout(() => {
            setIsLoading(false)
            if (code === "000000") {
                setError("Invalid code. Please try again.")
            } else {
                alert("2FA verification successful! (Demo)")
            }
        }, 1500)
    }

    const handle2FAResend = () => {
        console.log("Resending 2FA code...")
        alert("2FA code resent! (Demo)")
    }

    const handleOAuthProvider = (providerId: string) => {
        console.log("OAuth provider:", providerId)
        setIsLoading(true)
        
        // Simulate OAuth flow
        setTimeout(() => {
            setIsLoading(false)
            alert(`${providerId} authentication successful! (Demo)`)
        }, 2000)
    }

    const demos = [
        {
            id: 'login' as const,
            title: 'Login Form',
            description: 'Advanced login form with real-time validation and animations'
        },
        {
            id: '2fa' as const,
            title: 'Two-Factor Auth',
            description: 'Secure 2FA component with SMS, email, and app support'
        },
        {
            id: 'oauth' as const,
            title: 'OAuth Providers',
            description: 'Social login with multiple providers and variants'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Authentication Components
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Premium authentication components with enterprise-grade security features,
                            beautiful animations, and seamless user experience.
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
                                onClick={() => setCurrentDemo(demo.id)}
                                variant={currentDemo === demo.id ? "gradient" : "outline"}
                                size="lg"
                                className="px-6"
                            >
                                {demo.title}
                            </Button>
                        ))}
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Demo Component */}
                    <motion.div
                        key={currentDemo}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center"
                    >
                        {currentDemo === 'login' && (
                            <LoginForm
                                onSubmit={handleLoginSubmit}
                                isLoading={isLoading}
                                error={error}
                                className="w-full max-w-md"
                            />
                        )}

                        {currentDemo === '2fa' && (
                            <TwoFactorAuth
                                onVerify={handle2FAVerify}
                                onResend={handle2FAResend}
                                isLoading={isLoading}
                                error={error}
                                method="sms"
                                phoneNumber="+62 ***-***-1234"
                                className="w-full max-w-md"
                            />
                        )}

                        {currentDemo === 'oauth' && (
                            <Card className="w-full max-w-md shadow-2xl border-0">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl font-bold">
                                        Social Authentication
                                    </CardTitle>
                                    <CardDescription>
                                        Choose your preferred sign-in method
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            Default Style
                                        </h4>
                                        <OAuthProviders
                                            onProviderClick={handleOAuthProvider}
                                            isLoading={isLoading}
                                            variant="default"
                                        />
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            Compact Style
                                        </h4>
                                        <OAuthProviders
                                            onProviderClick={handleOAuthProvider}
                                            isLoading={isLoading}
                                            variant="compact"
                                        />
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            Icons Only
                                        </h4>
                                        <OAuthProviders
                                            onProviderClick={handleOAuthProvider}
                                            isLoading={isLoading}
                                            variant="icons-only"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </motion.div>

                    {/* Features & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>✨</span>
                                    <span>{demos.find(d => d.id === currentDemo)?.title}</span>
                                </CardTitle>
                                <CardDescription>
                                    {demos.find(d => d.id === currentDemo)?.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {currentDemo === 'login' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                <h4 className="font-medium text-green-800 dark:text-green-400">
                                                    ✓ Real-time Validation
                                                </h4>
                                                <p className="text-sm text-green-600 dark:text-green-300">
                                                    Instant feedback as you type
                                                </p>
                                            </div>
                                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                <h4 className="font-medium text-blue-800 dark:text-blue-400">
                                                    ✓ Password Toggle
                                                </h4>
                                                <p className="text-sm text-blue-600 dark:text-blue-300">
                                                    Show/hide password securely
                                                </p>
                                            </div>
                                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                                <h4 className="font-medium text-purple-800 dark:text-purple-400">
                                                    ✓ Smooth Animations
                                                </h4>
                                                <p className="text-sm text-purple-600 dark:text-purple-300">
                                                    Framer Motion powered
                                                </p>
                                            </div>
                                            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                                <h4 className="font-medium text-yellow-800 dark:text-yellow-400">
                                                    ✓ Error Handling
                                                </h4>
                                                <p className="text-sm text-yellow-600 dark:text-yellow-300">
                                                    Graceful error states
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                                Test Credentials:
                                            </h4>
                                            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                                <p><strong>Valid:</strong> any email + password (8+ chars)</p>
                                                <p><strong>Error:</strong> error@test.com + any password</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentDemo === '2fa' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                <h4 className="font-medium text-green-800 dark:text-green-400">
                                                    ✓ Multiple Methods
                                                </h4>
                                                <p className="text-sm text-green-600 dark:text-green-300">
                                                    SMS, Email, Authenticator App
                                                </p>
                                            </div>
                                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                <h4 className="font-medium text-blue-800 dark:text-blue-400">
                                                    ✓ Auto-Submit
                                                </h4>
                                                <p className="text-sm text-blue-600 dark:text-blue-300">
                                                    Submits when all digits entered
                                                </p>
                                            </div>
                                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                                <h4 className="font-medium text-purple-800 dark:text-purple-400">
                                                    ✓ Paste Support
                                                </h4>
                                                <p className="text-sm text-purple-600 dark:text-purple-300">
                                                    Paste 6-digit codes directly
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                                Test Codes:
                                            </h4>
                                            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                                <p><strong>Valid:</strong> Any 6-digit code except 000000</p>
                                                <p><strong>Error:</strong> 000000</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentDemo === 'oauth' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                <h4 className="font-medium text-green-800 dark:text-green-400">
                                                    ✓ 6 Providers
                                                </h4>
                                                <p className="text-sm text-green-600 dark:text-green-300">
                                                    Google, GitHub, Microsoft, Apple, Discord, LinkedIn
                                                </p>
                                            </div>
                                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                <h4 className="font-medium text-blue-800 dark:text-blue-400">
                                                    ✓ 3 Variants
                                                </h4>
                                                <p className="text-sm text-blue-600 dark:text-blue-300">
                                                    Default, Compact, Icons Only
                                                </p>
                                            </div>
                                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                                <h4 className="font-medium text-purple-800 dark:text-purple-400">
                                                    ✓ Loading States
                                                </h4>
                                                <p className="text-sm text-purple-600 dark:text-purple-300">
                                                    Individual provider loading
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Code Example */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>💻</span>
                                    <span>Usage Example</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                    <pre className="text-sm text-gray-300">
                                        <code>
{currentDemo === 'login' && `import LoginForm from "~/components/auth/LoginForm"

<LoginForm
  onSubmit={handleSubmit}
  isLoading={isLoading}
  error={error}
/>`}

{currentDemo === '2fa' && `import TwoFactorAuth from "~/components/auth/TwoFactorAuth"

<TwoFactorAuth
  onVerify={handleVerify}
  onResend={handleResend}
  method="sms"
  phoneNumber="+1234567890"
/>`}

{currentDemo === 'oauth' && `import OAuthProviders from "~/components/auth/OAuthProviders"

<OAuthProviders
  onProviderClick={handleProvider}
  variant="compact"
  isLoading={isLoading}
/>`}
                                        </code>
                                    </pre>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
