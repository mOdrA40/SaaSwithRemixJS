import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    ShieldCheckIcon, 
    DevicePhoneMobileIcon,
    ClockIcon,
    ArrowPathIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon
} from "@heroicons/react/24/outline"
import { Button } from "~/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { cn } from "~/lib/utils"

interface TwoFactorAuthProps {
    onVerify?: (code: string) => void
    onResend?: () => void
    isLoading?: boolean
    error?: string
    phoneNumber?: string
    email?: string
    method?: 'sms' | 'email' | 'app'
    className?: string
}

const TwoFactorAuth = ({ 
    onVerify, 
    onResend, 
    isLoading = false, 
    error, 
    phoneNumber,
    email,
    method = 'sms',
    className 
}: TwoFactorAuthProps) => {
    const [code, setCode] = useState(['', '', '', '', '', ''])
    const [timeLeft, setTimeLeft] = useState(60)
    const [canResend, setCanResend] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    // Countdown timer
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            setCanResend(true)
        }
    }, [timeLeft])

    const handleInputChange = (index: number, value: string) => {
        if (value.length > 1) return // Prevent multiple characters
        
        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }

        // Auto-submit when all fields are filled
        if (newCode.every(digit => digit !== '') && !isVerifying) {
            handleVerify(newCode.join(''))
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
        const newCode = [...code]
        
        for (let i = 0; i < pastedData.length; i++) {
            newCode[i] = pastedData[i]
        }
        
        setCode(newCode)
        
        if (pastedData.length === 6) {
            handleVerify(pastedData)
        }
    }

    const handleVerify = async (verificationCode: string) => {
        setIsVerifying(true)
        await onVerify?.(verificationCode)
        setIsVerifying(false)
    }

    const handleResend = () => {
        setTimeLeft(60)
        setCanResend(false)
        setCode(['', '', '', '', '', ''])
        onResend?.()
        inputRefs.current[0]?.focus()
    }

    const getMethodInfo = () => {
        switch (method) {
            case 'sms':
                return {
                    icon: DevicePhoneMobileIcon,
                    title: 'SMS Verification',
                    description: `We&apos;ve sent a 6-digit code to ${phoneNumber || 'your phone'}`,
                    color: 'from-green-500 to-emerald-500'
                }
            case 'email':
                return {
                    icon: ShieldCheckIcon,
                    title: 'Email Verification',
                    description: `We&apos;ve sent a 6-digit code to ${email || 'your email'}`,
                    color: 'from-blue-500 to-cyan-500'
                }
            case 'app':
                return {
                    icon: ShieldCheckIcon,
                    title: 'Authenticator App',
                    description: 'Enter the 6-digit code from your authenticator app',
                    color: 'from-purple-500 to-indigo-500'
                }
        }
    }

    const methodInfo = getMethodInfo()

    const inputVariants = {
        initial: { scale: 1, borderColor: '#e5e7eb' },
        focus: { scale: 1.05, borderColor: '#3b82f6' },
        filled: { scale: 1, borderColor: '#10b981' },
        error: { scale: 1, borderColor: '#ef4444' }
    }

    const containerVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn("w-full max-w-md mx-auto", className)}
        >
            <Card className="shadow-2xl border-0">
                <CardHeader className="text-center pb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className={`mx-auto w-16 h-16 bg-gradient-to-r ${methodInfo.color} rounded-full flex items-center justify-center mb-4`}
                    >
                        <methodInfo.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        {methodInfo.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                        {methodInfo.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Code Input */}
                    <div className="space-y-4">
                        <div className="flex justify-center space-x-3" onPaste={handlePaste}>
                            {code.map((digit, index) => (
                                <motion.input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    variants={inputVariants}
                                    animate={
                                        error ? 'error' : 
                                        digit ? 'filled' : 
                                        'initial'
                                    }
                                    whileFocus="focus"
                                    className={cn(
                                        "w-12 h-12 text-center text-xl font-bold rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
                                        error 
                                            ? "border-red-500 bg-red-50 dark:bg-red-900/20" 
                                            : digit 
                                                ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                                                : "border-gray-300 bg-white dark:bg-gray-800"
                                    )}
                                    disabled={isLoading || isVerifying}
                                />
                            ))}
                        </div>

                        {/* Error Message */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center justify-center space-x-2 text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
                                >
                                    <ExclamationTriangleIcon className="h-4 w-4" />
                                    <span>{error}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Success State */}
                        <AnimatePresence>
                            {code.every(digit => digit !== '') && !error && !isVerifying && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex items-center justify-center space-x-2 text-green-600 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
                                >
                                    <CheckCircleIcon className="h-4 w-4" />
                                    <span>Code entered successfully</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Manual Verify Button */}
                    {code.every(digit => digit !== '') && (
                        <Button
                            onClick={() => handleVerify(code.join(''))}
                            variant="gradient"
                            size="lg"
                            className="w-full"
                            disabled={isLoading || isVerifying}
                        >
                            {isVerifying ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                            ) : (
                                <>
                                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                                    Verify Code
                                </>
                            )}
                        </Button>
                    )}

                    {/* Resend Section */}
                    <div className="text-center space-y-3">
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <ClockIcon className="h-4 w-4" />
                            <span>
                                {canResend ? 'Code expired' : `Resend code in ${timeLeft}s`}
                            </span>
                        </div>

                        <Button
                            onClick={handleResend}
                            variant="ghost"
                            size="sm"
                            disabled={!canResend || isLoading}
                            className="text-blue-600 hover:text-blue-700"
                        >
                            <ArrowPathIcon className="h-4 w-4 mr-2" />
                            Resend Code
                        </Button>
                    </div>

                    {/* Help Text */}
                    <div className="text-center text-xs text-gray-500 dark:text-gray-400 space-y-1">
                        <p>Didn&apos;t receive the code? Check your spam folder</p>
                        <p>or try a different verification method</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default TwoFactorAuth
