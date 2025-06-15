import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    ClockIcon,
    DocumentCheckIcon
} from "@heroicons/react/24/outline"
import { Button } from "~/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { cn } from "~/lib/utils"

interface FormStep {
    id: string
    title: string
    description?: string
    component: React.ReactNode
    validation?: () => boolean | Promise<boolean>
    optional?: boolean
}

interface MultiStepFormProps {
    steps: FormStep[]
    onComplete?: (data: Record<string, unknown>) => void
    onStepChange?: (currentStep: number, direction: 'next' | 'prev') => void
    autoSave?: boolean
    autoSaveInterval?: number
    className?: string
    showProgress?: boolean
    allowSkip?: boolean
}

const MultiStepForm = ({
    steps,
    onComplete,
    onStepChange,
    autoSave = true,
    autoSaveInterval = 30000, // 30 seconds
    className,
    showProgress = true,
    allowSkip = false
}: MultiStepFormProps) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
    const [isValidating, setIsValidating] = useState(false)
    const [validationErrors, setValidationErrors] = useState<Record<number, string>>({})
    const [formData] = useState<Record<string, unknown>>({})
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    const [isAutoSaving, setIsAutoSaving] = useState(false)

    // Auto-save functionality
    useEffect(() => {
        if (!autoSave) return

        const interval = setInterval(async () => {
            setIsAutoSaving(true)
            // Simulate auto-save
            await new Promise(resolve => setTimeout(resolve, 1000))
            setLastSaved(new Date())
            setIsAutoSaving(false)
        }, autoSaveInterval)

        return () => clearInterval(interval)
    }, [autoSave, autoSaveInterval])

    const validateStep = async (stepIndex: number): Promise<boolean> => {
        const step = steps[stepIndex]
        if (!step.validation) return true

        setIsValidating(true)
        try {
            const isValid = await step.validation()
            if (isValid) {
                setValidationErrors(prev => {
                    const newErrors = { ...prev }
                    delete newErrors[stepIndex]
                    return newErrors
                })
                setCompletedSteps(prev => new Set([...prev, stepIndex]))
            } else {
                setValidationErrors(prev => ({
                    ...prev,
                    [stepIndex]: 'Please complete all required fields correctly'
                }))
            }
            return isValid
        } catch (error) {
            setValidationErrors(prev => ({
                ...prev,
                [stepIndex]: 'Validation failed. Please try again.'
            }))
            return false
        } finally {
            setIsValidating(false)
        }
    }

    const goToStep = async (stepIndex: number, direction: 'next' | 'prev' = 'next') => {
        if (direction === 'next' && stepIndex > currentStep) {
            // Validate current step before proceeding
            const isValid = await validateStep(currentStep)
            if (!isValid && !allowSkip) return
        }

        setCurrentStep(stepIndex)
        onStepChange?.(stepIndex, direction)
    }

    const nextStep = async () => {
        if (currentStep < steps.length - 1) {
            await goToStep(currentStep + 1, 'next')
        } else {
            // Final step - complete form
            const isValid = await validateStep(currentStep)
            if (isValid) {
                onComplete?.(formData)
            }
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            goToStep(currentStep - 1, 'prev')
        }
    }

    const skipStep = () => {
        if (allowSkip && currentStep < steps.length - 1) {
            goToStep(currentStep + 1, 'next')
        }
    }

    const getStepStatus = (stepIndex: number) => {
        if (completedSteps.has(stepIndex)) return 'completed'
        if (stepIndex === currentStep) return 'current'
        if (stepIndex < currentStep) return 'visited'
        return 'upcoming'
    }

    const progressPercentage = ((currentStep + 1) / steps.length) * 100

    const stepVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    }

    const progressVariants = {
        initial: { width: 0 },
        animate: { width: `${progressPercentage}%` }
    }

    return (
        <div className={cn("w-full max-w-4xl mx-auto", className)}>
            {/* Progress Bar */}
            {showProgress && (
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {steps[currentStep].title}
                        </h2>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>Step {currentStep + 1} of {steps.length}</span>
                            {autoSave && lastSaved && (
                                <div className="flex items-center space-x-1">
                                    <ClockIcon className="h-4 w-4" />
                                    <span>Saved {lastSaved.toLocaleTimeString()}</span>
                                    {isAutoSaving && (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-3 h-3 border border-blue-600 border-t-transparent rounded-full"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center space-x-4 mb-4">
                        {steps.map((step, index) => {
                            const status = getStepStatus(index)
                            return (
                                <div key={step.id} className="flex items-center">
                                    <motion.button
                                        onClick={() => goToStep(index)}
                                        disabled={index > currentStep && !completedSteps.has(index)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200",
                                            status === 'completed' && "bg-green-500 text-white",
                                            status === 'current' && "bg-blue-500 text-white ring-4 ring-blue-200",
                                            status === 'visited' && "bg-gray-300 text-gray-700 hover:bg-gray-400",
                                            status === 'upcoming' && "bg-gray-200 text-gray-500"
                                        )}
                                    >
                                        {status === 'completed' ? (
                                            <CheckCircleIcon className="h-5 w-5" />
                                        ) : (
                                            index + 1
                                        )}
                                    </motion.button>
                                    
                                    {index < steps.length - 1 && (
                                        <div className="w-12 h-1 mx-2 bg-gray-200 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ 
                                                    width: index < currentStep ? '100%' : '0%' 
                                                }}
                                                transition={{ duration: 0.5 }}
                                                className="h-full bg-blue-500"
                                            />
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Overall Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                            variants={progressVariants}
                            initial="initial"
                            animate="animate"
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        />
                    </div>
                </div>
            )}

            {/* Step Content */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        {steps[currentStep].title}
                    </CardTitle>
                    {steps[currentStep].description && (
                        <CardDescription>
                            {steps[currentStep].description}
                        </CardDescription>
                    )}
                </CardHeader>
                
                <CardContent>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            variants={stepVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                        >
                            {steps[currentStep].component}
                        </motion.div>
                    </AnimatePresence>

                    {/* Validation Error */}
                    <AnimatePresence>
                        {validationErrors[currentStep] && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-4 flex items-center space-x-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
                            >
                                <ExclamationTriangleIcon className="h-5 w-5" />
                                <span>{validationErrors[currentStep]}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
                <Button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    variant="outline"
                    className="flex items-center space-x-2"
                >
                    <ChevronLeftIcon className="h-4 w-4" />
                    <span>Previous</span>
                </Button>

                <div className="flex items-center space-x-3">
                    {allowSkip && steps[currentStep].optional && currentStep < steps.length - 1 && (
                        <Button
                            onClick={skipStep}
                            variant="ghost"
                            className="text-gray-600 hover:text-gray-800"
                        >
                            Skip this step
                        </Button>
                    )}

                    <Button
                        onClick={nextStep}
                        disabled={isValidating}
                        variant={currentStep === steps.length - 1 ? "gradient" : "default"}
                        className="flex items-center space-x-2"
                    >
                        {isValidating ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                        ) : currentStep === steps.length - 1 ? (
                            <>
                                <DocumentCheckIcon className="h-4 w-4" />
                                <span>Complete</span>
                            </>
                        ) : (
                            <>
                                <span>Next</span>
                                <ChevronRightIcon className="h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default MultiStepForm
