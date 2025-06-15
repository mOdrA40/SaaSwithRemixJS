import React, { type ErrorInfo } from 'react'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { motion } from 'framer-motion'
import {
    ExclamationTriangleIcon,
    ArrowPathIcon,
    HomeIcon,
    BugAntIcon
} from '@heroicons/react/24/outline'
import { Button } from './Button'
import { Card, CardContent, CardHeader, CardTitle } from './Card'

interface ErrorFallbackProps {
    error: Error
    resetErrorBoundary: () => void
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
    const isNetworkError = error.message.includes('fetch') || error.message.includes('network')
    const isTimeoutError = error.message.includes('timeout')
    const isServerError = error.message.includes('500') || error.message.includes('server')

    const getErrorType = () => {
        if (isNetworkError) return 'Network Error'
        if (isTimeoutError) return 'Timeout Error'
        if (isServerError) return 'Server Error'
        return 'Application Error'
    }

    const getErrorMessage = () => {
        if (isNetworkError) return 'Unable to connect to the server. Please check your internet connection.'
        if (isTimeoutError) return 'The request took too long to complete. Please try again.'
        if (isServerError) return 'The server is experiencing issues. Please try again later.'
        return 'Something went wrong. Please try again or contact support if the problem persists.'
    }

    const getErrorIcon = () => {
        if (isNetworkError || isTimeoutError) return ExclamationTriangleIcon
        if (isServerError) return BugAntIcon
        return ExclamationTriangleIcon
    }

    const ErrorIcon = getErrorIcon()

    return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md"
            >
                <Card className="border-red-200 dark:border-red-800">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                            <ErrorIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
                        </div>
                        <CardTitle className="text-red-900 dark:text-red-100">
                            {getErrorType()}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-center text-gray-600 dark:text-gray-400">
                            {getErrorMessage()}
                        </p>

                        {/* Error Details (Development Only) */}
                        {process.env.NODE_ENV === 'development' && (
                            <details className="mt-4">
                                <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                                    Technical Details
                                </summary>
                                <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                                    <pre className="text-xs text-red-600 dark:text-red-400 whitespace-pre-wrap">
                                        {error.message}
                                    </pre>
                                    {error.stack && (
                                        <pre className="text-xs text-gray-500 dark:text-gray-400 mt-2 whitespace-pre-wrap">
                                            {error.stack}
                                        </pre>
                                    )}
                                </div>
                            </details>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                                onClick={resetErrorBoundary}
                                variant="default"
                                className="flex-1"
                            >
                                <ArrowPathIcon className="h-4 w-4 mr-2" />
                                Try Again
                            </Button>
                            <Button
                                onClick={() => window.location.href = '/'}
                                variant="outline"
                                className="flex-1"
                            >
                                <HomeIcon className="h-4 w-4 mr-2" />
                                Go Home
                            </Button>
                        </div>

                        {/* Additional Actions */}
                        <div className="text-center pt-2">
                            <button
                                onClick={() => window.location.reload()}
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline"
                            >
                                Reload Page
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

interface QueryErrorBoundaryProps {
    children: React.ReactNode
    fallback?: React.ComponentType<ErrorFallbackProps>
}

export function QueryErrorBoundary({ children, fallback }: QueryErrorBoundaryProps) {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary
                    FallbackComponent={fallback || ErrorFallback}
                    onReset={reset}
                    onError={(error: Error, errorInfo: ErrorInfo) => {
                        // Log error to monitoring service
                        console.error('Query Error Boundary caught an error:', error, errorInfo)

                        // In production, you might want to send this to an error tracking service
                        if (process.env.NODE_ENV === 'production') {
                            // Example: Sentry.captureException(error, { extra: errorInfo })
                        }
                    }}
                >
                    {children}
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    )
}

// Smaller error boundary for individual components
export function ComponentErrorBoundary({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary
            FallbackComponent={({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
                <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/10">
                    <div className="flex items-center space-x-2 text-red-800 dark:text-red-200 mb-2">
                        <ExclamationTriangleIcon className="h-5 w-5" />
                        <span className="font-medium">Component Error</span>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                        This component encountered an error and couldn&apos;t render properly.
                    </p>
                    <Button
                        onClick={resetErrorBoundary}
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-600 dark:text-red-300 dark:hover:bg-red-900/20"
                    >
                        <ArrowPathIcon className="h-4 w-4 mr-1" />
                        Retry
                    </Button>
                    
                    {process.env.NODE_ENV === 'development' && (
                        <details className="mt-3">
                            <summary className="cursor-pointer text-xs text-red-600 dark:text-red-400">
                                Error Details
                            </summary>
                            <pre className="text-xs text-red-600 dark:text-red-400 mt-1 whitespace-pre-wrap">
                                {error.message}
                            </pre>
                        </details>
                    )}
                </div>
            )}
            onError={(error: Error) => {
                console.error('Component Error Boundary caught an error:', error)
            }}
        >
            {children}
        </ErrorBoundary>
    )
}

export default QueryErrorBoundary
