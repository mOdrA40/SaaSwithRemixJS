import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    EyeIcon, 
    EyeSlashIcon, 
    LockClosedIcon, 
    UserIcon,
    ShieldCheckIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon
} from "@heroicons/react/24/outline"
import { Button } from "~/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { Input } from "~/components/ui/Input"
import { Label } from "~/components/ui/Label"
import { cn } from "~/lib/utils"

interface LoginFormProps {
    onSubmit?: (data: LoginFormData) => void
    isLoading?: boolean
    error?: string
    className?: string
}

interface LoginFormData {
    email: string
    password: string
    rememberMe: boolean
}

interface FormErrors {
    email?: string
    password?: string
    general?: string
}

const LoginForm = ({ onSubmit, isLoading = false, error, className }: LoginFormProps) => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
        rememberMe: false
    })
    
    const [errors, setErrors] = useState<FormErrors>({})
    const [showPassword, setShowPassword] = useState(false)
    const [isValidating, setIsValidating] = useState(false)

    // Real-time validation
    const validateField = (name: string, value: string) => {
        const newErrors = { ...errors }
        
        switch (name) {
            case 'email':
                if (!value) {
                    newErrors.email = 'Email is required'
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    newErrors.email = 'Please enter a valid email address'
                } else {
                    delete newErrors.email
                }
                break
                
            case 'password':
                if (!value) {
                    newErrors.password = 'Password is required'
                } else if (value.length < 8) {
                    newErrors.password = 'Password must be at least 8 characters'
                } else {
                    delete newErrors.password
                }
                break
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        const newValue = type === 'checkbox' ? checked : value
        
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }))
        
        // Real-time validation for text inputs
        if (type !== 'checkbox') {
            validateField(name, value)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsValidating(true)
        
        // Validate all fields
        const emailValid = validateField('email', formData.email)
        const passwordValid = validateField('password', formData.password)
        
        if (emailValid && passwordValid) {
            onSubmit?.(formData)
        }
        
        setIsValidating(false)
    }

    const inputVariants = {
        focus: { scale: 1.02, transition: { duration: 0.2 } },
        blur: { scale: 1, transition: { duration: 0.2 } }
    }

    const errorVariants = {
        initial: { opacity: 0, y: -10, height: 0 },
        animate: { opacity: 1, y: 0, height: 'auto' },
        exit: { opacity: 0, y: -10, height: 0 }
    }

    return (
        <Card className={cn("w-full max-w-md mx-auto shadow-2xl border-0", className)}>
            <CardHeader className="space-y-1 text-center pb-8">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4"
                >
                    <LockClosedIcon className="h-8 w-8 text-white" />
                </motion.div>
                
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    Welcome Back
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                    Sign in to your account to continue
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                        </Label>
                        <div className="relative">
                            <motion.div
                                variants={inputVariants}
                                whileFocus="focus"
                                className="relative"
                            >
                                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={cn(
                                        "pl-10 pr-4 py-3 text-base transition-all duration-200",
                                        errors.email 
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    )}
                                    placeholder="Enter your email"
                                    disabled={isLoading}
                                />
                                {formData.email && !errors.email && (
                                    <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                                )}
                            </motion.div>
                        </div>
                        
                        <AnimatePresence>
                            {errors.email && (
                                <motion.div
                                    variants={errorVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="flex items-center space-x-2 text-red-600 text-sm"
                                >
                                    <ExclamationTriangleIcon className="h-4 w-4" />
                                    <span>{errors.email}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </Label>
                        <div className="relative">
                            <motion.div
                                variants={inputVariants}
                                whileFocus="focus"
                                className="relative"
                            >
                                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={cn(
                                        "pl-10 pr-12 py-3 text-base transition-all duration-200",
                                        errors.password 
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    )}
                                    placeholder="Enter your password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </motion.div>
                        </div>
                        
                        <AnimatePresence>
                            {errors.password && (
                                <motion.div
                                    variants={errorVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="flex items-center space-x-2 text-red-600 text-sm"
                                >
                                    <ExclamationTriangleIcon className="h-4 w-4" />
                                    <span>{errors.password}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                disabled={isLoading}
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                        </label>
                        
                        <a 
                            href="/auth/forgot-password" 
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* General Error */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                variants={errorVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
                            >
                                <ExclamationTriangleIcon className="h-5 w-5" />
                                <span>{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="gradient"
                        size="lg"
                        className="w-full py-3 text-base font-semibold"
                        disabled={isLoading || isValidating || Object.keys(errors).length > 0}
                    >
                        {isLoading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                        ) : (
                            <>
                                <ShieldCheckIcon className="h-5 w-5 mr-2" />
                                Sign In Securely
                            </>
                        )}
                    </Button>
                </form>

                {/* Divider */}
                <div className="mt-8 mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
                        </div>
                    </div>
                </div>

                {/* OAuth Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="py-3" disabled={isLoading}>
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                    </Button>
                    
                    <Button variant="outline" className="py-3" disabled={isLoading}>
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginForm
