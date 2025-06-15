import { useState } from "react"
import { motion } from "framer-motion"
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline"
import { Button } from "~/components/ui/Button"

interface CodeBlockProps {
    code: string
    language: string
    title?: string
    showCopy?: boolean
}

export function CodeBlock({ code, language, title, showCopy = true }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy code:', err)
        }
    }

    const getLanguageColor = (lang: string) => {
        const colors: Record<string, string> = {
            javascript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
            typescript: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            python: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            bash: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
            json: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
            curl: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
        }
        return colors[lang.toLowerCase()] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
        >
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                        {title && (
                            <span className="text-sm font-medium text-gray-200">
                                {title}
                            </span>
                        )}
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getLanguageColor(language)}`}>
                            {language}
                        </span>
                    </div>
                    
                    {showCopy && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyToClipboard}
                            className="text-gray-400 hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            {copied ? (
                                <>
                                    <CheckIcon className="h-4 w-4 mr-1" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <ClipboardIcon className="h-4 w-4 mr-1" />
                                    Copy
                                </>
                            )}
                        </Button>
                    )}
                </div>

                {/* Code Content */}
                <div className="p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-100 font-mono leading-relaxed">
                        <code className={`language-${language}`}>
                            {code}
                        </code>
                    </pre>
                </div>
            </div>
        </motion.div>
    )
}

interface APIEndpointProps {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
    path: string
    title: string
    description: string
    parameters?: Array<{
        name: string
        type: string
        required: boolean
        description: string
        example?: string
    }>
    requestBody?: {
        type: string
        description: string
        example: Record<string, unknown>
    }
    responses: Array<{
        status: number
        description: string
        example?: Record<string, unknown>
    }>
    examples: Array<{
        title: string
        description: string
        code: string
        language: string
    }>
}

export function APIEndpoint({ 
    method, 
    path, 
    title, 
    description, 
    parameters, 
    requestBody, 
    responses, 
    examples 
}: APIEndpointProps) {
    const [activeTab, setActiveTab] = useState("examples")

    const getMethodColor = (method: string) => {
        const colors: Record<string, string> = {
            GET: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            POST: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            PUT: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
            DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
            PATCH: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
        }
        return colors[method] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 mb-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${getMethodColor(method)}`}>
                        {method}
                    </span>
                    <code className="text-sm font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {path}
                    </code>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                    {description}
                </p>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Tab Navigation */}
                <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    {["examples", "parameters", "responses"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                activeTab === tab
                                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === "examples" && (
                    <div className="space-y-4">
                        {examples.map((example, index) => (
                            <div key={index}>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    {example.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    {example.description}
                                </p>
                                <CodeBlock
                                    code={example.code}
                                    language={example.language}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "parameters" && (
                    <div className="space-y-4">
                        {parameters && parameters.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Required
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Description
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        {parameters.map((param, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">
                                                    {param.name}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                    {param.type}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                        param.required 
                                                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                                                    }`}>
                                                        {param.required ? "Required" : "Optional"}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                    {param.description}
                                                    {param.example && (
                                                        <div className="mt-1">
                                                            <span className="text-xs text-gray-500 dark:text-gray-500">
                                                                Example: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">{param.example}</code>
                                                            </span>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">No parameters required for this endpoint.</p>
                        )}

                        {requestBody && (
                            <div className="mt-6">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    Request Body
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    {requestBody.description}
                                </p>
                                <CodeBlock
                                    code={JSON.stringify(requestBody.example, null, 2)}
                                    language="json"
                                    title="Example Request Body"
                                />
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "responses" && (
                    <div className="space-y-6">
                        {responses.map((response, index) => (
                            <div key={index}>
                                <div className="flex items-center space-x-2 mb-3">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                                        response.status >= 200 && response.status < 300
                                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                            : response.status >= 400
                                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                                    }`}>
                                        {response.status}
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {response.description}
                                    </span>
                                </div>
                                {response.example && (
                                    <CodeBlock
                                        code={JSON.stringify(response.example, null, 2)}
                                        language="json"
                                        title={`${response.status} Response`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    )
}
