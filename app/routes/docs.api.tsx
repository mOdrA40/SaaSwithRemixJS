import type { MetaFunction } from "react-router"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    CodeBracketIcon,
    DocumentTextIcon,
    KeyIcon,
    ShieldCheckIcon,
    ClipboardDocumentIcon,
    CheckIcon,
    ChevronRightIcon,
    PlayIcon,
    CubeIcon,
    GlobeAltIcon,
    BoltIcon,
    SparklesIcon
} from "@heroicons/react/24/outline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { Button } from "~/components/ui/Button"
import { COMPANY_INFO } from "~/data/constants"
import { cn } from "~/lib/utils"

export const meta: MetaFunction = () => {
    return [
        { title: `API Documentation - ${COMPANY_INFO.name}` },
        { name: "description", content: "Comprehensive API documentation with interactive examples and authentication guides" },
        { name: "keywords", content: "API, documentation, REST, GraphQL, authentication, webhooks" }
    ]
}

interface APIEndpoint {
    id: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    path: string
    title: string
    description: string
    parameters?: Array<{
        name: string
        type: string
        required: boolean
        description: string
    }>
    response: {
        status: number
        example: string
    }
    codeExample: {
        curl: string
        javascript: string
        python: string
    }
}

const apiEndpoints: APIEndpoint[] = [
    {
        id: 'get-user',
        method: 'GET',
        path: '/api/v1/user',
        title: 'Get User Profile',
        description: 'Retrieve the authenticated user\'s profile information',
        response: {
            status: 200,
            example: `{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "plan": "pro",
  "created_at": "2024-01-01T00:00:00Z"
}`
        },
        codeExample: {
            curl: `curl -X GET "https://api.saaspro.com/v1/user" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
            javascript: `const response = await fetch('https://api.saaspro.com/v1/user', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
const user = await response.json();`,
            python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.saaspro.com/v1/user', headers=headers)
user = response.json()`
        }
    },
    {
        id: 'create-project',
        method: 'POST',
        path: '/api/v1/projects',
        title: 'Create Project',
        description: 'Create a new project in your workspace',
        parameters: [
            { name: 'name', type: 'string', required: true, description: 'Project name' },
            { name: 'description', type: 'string', required: false, description: 'Project description' },
            { name: 'settings', type: 'object', required: false, description: 'Project configuration' }
        ],
        response: {
            status: 201,
            example: `{
  "id": "proj_456",
  "name": "My New Project",
  "description": "A sample project",
  "status": "active",
  "created_at": "2024-01-01T00:00:00Z"
}`
        },
        codeExample: {
            curl: `curl -X POST "https://api.saaspro.com/v1/projects" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My New Project",
    "description": "A sample project"
  }'`,
            javascript: `const response = await fetch('https://api.saaspro.com/v1/projects', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'My New Project',
    description: 'A sample project'
  })
});
const project = await response.json();`,
            python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

data = {
    'name': 'My New Project',
    'description': 'A sample project'
}

response = requests.post('https://api.saaspro.com/v1/projects', 
                        headers=headers, json=data)
project = response.json()`
        }
    }
]

const quickStartSteps = [
    {
        id: 1,
        title: 'Get Your API Key',
        description: 'Generate your API key from the dashboard settings',
        icon: KeyIcon,
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: 2,
        title: 'Make Your First Request',
        description: 'Test the API with a simple GET request to /api/v1/user',
        icon: PlayIcon,
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: 3,
        title: 'Explore Endpoints',
        description: 'Browse all available endpoints and their documentation',
        icon: CubeIcon,
        color: 'from-green-500 to-emerald-500'
    },
    {
        id: 4,
        title: 'Build Your Integration',
        description: 'Start building your application with our comprehensive API',
        icon: BoltIcon,
        color: 'from-orange-500 to-red-500'
    }
]

export default function APIDocumentation() {
    const [selectedEndpoint, setSelectedEndpoint] = useState<string>(apiEndpoints[0].id)
    const [selectedLanguage, setSelectedLanguage] = useState<'curl' | 'javascript' | 'python'>('javascript')
    const [copiedCode, setCopiedCode] = useState<string | null>(null)

    const currentEndpoint = apiEndpoints.find(ep => ep.id === selectedEndpoint)

    const copyToClipboard = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedCode(id)
            setTimeout(() => setCopiedCode(null), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }



    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 }
    }

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative py-20 px-4 sm:px-6 lg:px-8"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
                <div className="relative max-w-7xl mx-auto text-center">
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        className="flex justify-center mb-6"
                    >
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600">
                            <CodeBracketIcon className="h-12 w-12 text-white" />
                        </div>
                    </motion.div>
                    
                    <motion.h1
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6"
                    >
                        API Documentation
                    </motion.h1>
                    
                    <motion.p
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
                    >
                        Powerful, flexible, and easy-to-use API for building amazing applications. 
                        Get started in minutes with our comprehensive documentation and interactive examples.
                    </motion.p>

                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button variant="gradient" size="lg" className="group">
                            <PlayIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                            Try API Now
                        </Button>
                        <Button variant="outline" size="lg">
                            <DocumentTextIcon className="h-5 w-5 mr-2" />
                            View Examples
                        </Button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Quick Start Section */}
            <motion.section
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="py-16 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Quick Start Guide
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Get up and running with our API in just a few steps
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickStartSteps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                variants={fadeInUp}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                                    <CardHeader className="text-center">
                                        <div className={cn(
                                            "w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
                                            step.color
                                        )}>
                                            <step.icon className="h-8 w-8 text-white" />
                                        </div>
                                        <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">{step.id}</span>
                                        </div>
                                        <CardTitle className="text-lg">{step.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-center">
                                            {step.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* API Explorer Section */}
            <motion.section
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            API Explorer
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Interactive documentation with live examples and code snippets
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Endpoints Sidebar */}
                        <motion.div variants={fadeInUp} className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <CubeIcon className="h-5 w-5 mr-2" />
                                        Endpoints
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="space-y-1">
                                        {apiEndpoints.map((endpoint) => (
                                            <button
                                                key={endpoint.id}
                                                onClick={() => setSelectedEndpoint(endpoint.id)}
                                                className={cn(
                                                    "w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-l-4",
                                                    selectedEndpoint === endpoint.id
                                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                                        : "border-transparent"
                                                )}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="flex items-center space-x-2">
                                                            <span className={cn(
                                                                "px-2 py-1 text-xs font-medium rounded",
                                                                endpoint.method === 'GET' && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                                                                endpoint.method === 'POST' && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                                                                endpoint.method === 'PUT' && "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
                                                                endpoint.method === 'DELETE' && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                            )}>
                                                                {endpoint.method}
                                                            </span>
                                                            <span className="font-medium text-sm">{endpoint.title}</span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                                                            {endpoint.path}
                                                        </p>
                                                    </div>
                                                    <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Endpoint Details */}
                        <motion.div variants={fadeInUp} className="lg:col-span-2">
                            <AnimatePresence mode="wait">
                                {currentEndpoint && (
                                    <motion.div
                                        key={currentEndpoint.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card>
                                            <CardHeader>
                                                <div className="flex items-center space-x-3">
                                                    <span className={cn(
                                                        "px-3 py-1 text-sm font-medium rounded-lg",
                                                        currentEndpoint.method === 'GET' && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                                                        currentEndpoint.method === 'POST' && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                                                        currentEndpoint.method === 'PUT' && "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
                                                        currentEndpoint.method === 'DELETE' && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                    )}>
                                                        {currentEndpoint.method}
                                                    </span>
                                                    <code className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                        {currentEndpoint.path}
                                                    </code>
                                                </div>
                                                <CardTitle className="text-xl">{currentEndpoint.title}</CardTitle>
                                                <CardDescription>{currentEndpoint.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                {/* Parameters */}
                                                {currentEndpoint.parameters && (
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Parameters</h4>
                                                        <div className="space-y-2">
                                                            {currentEndpoint.parameters.map((param) => (
                                                                <div key={param.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                                    <div>
                                                                        <div className="flex items-center space-x-2">
                                                                            <code className="text-sm font-mono">{param.name}</code>
                                                                            <span className="text-xs text-gray-500">{param.type}</span>
                                                                            {param.required && (
                                                                                <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded">
                                                                                    required
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                                            {param.description}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Response */}
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Response</h4>
                                                    <div className="bg-gray-900 rounded-lg p-4">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-green-400 text-sm font-medium">
                                                                {currentEndpoint.response.status} OK
                                                            </span>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => copyToClipboard(currentEndpoint.response.example, `response-${currentEndpoint.id}`)}
                                                                className="text-gray-400 hover:text-white"
                                                            >
                                                                {copiedCode === `response-${currentEndpoint.id}` ? (
                                                                    <CheckIcon className="h-4 w-4" />
                                                                ) : (
                                                                    <ClipboardDocumentIcon className="h-4 w-4" />
                                                                )}
                                                            </Button>
                                                        </div>
                                                        <pre className="text-sm text-gray-300 overflow-x-auto">
                                                            <code>{currentEndpoint.response.example}</code>
                                                        </pre>
                                                    </div>
                                                </div>

                                                {/* Code Examples */}
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Code Examples</h4>
                                                    <div className="space-y-4">
                                                        {/* Language Selector */}
                                                        <div className="flex space-x-2">
                                                            {(['curl', 'javascript', 'python'] as const).map((lang) => (
                                                                <button
                                                                    key={lang}
                                                                    onClick={() => setSelectedLanguage(lang)}
                                                                    className={cn(
                                                                        "px-3 py-1 text-sm font-medium rounded-lg transition-colors",
                                                                        selectedLanguage === lang
                                                                            ? "bg-blue-600 text-white"
                                                                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                                                    )}
                                                                >
                                                                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                                                </button>
                                                            ))}
                                                        </div>

                                                        {/* Code Block */}
                                                        <div className="bg-gray-900 rounded-lg p-4">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-gray-400 text-sm font-medium">
                                                                    {selectedLanguage}
                                                                </span>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => copyToClipboard(currentEndpoint.codeExample[selectedLanguage], `code-${currentEndpoint.id}-${selectedLanguage}`)}
                                                                    className="text-gray-400 hover:text-white"
                                                                >
                                                                    {copiedCode === `code-${currentEndpoint.id}-${selectedLanguage}` ? (
                                                                        <CheckIcon className="h-4 w-4" />
                                                                    ) : (
                                                                        <ClipboardDocumentIcon className="h-4 w-4" />
                                                                    )}
                                                                </Button>
                                                            </div>
                                                            <pre className="text-sm text-gray-300 overflow-x-auto">
                                                                <code>{currentEndpoint.codeExample[selectedLanguage]}</code>
                                                            </pre>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Authentication Guide Section */}
            <motion.section
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Authentication Guide
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Secure your API requests with our authentication methods
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* API Key Authentication */}
                        <motion.div variants={fadeInUp}>
                            <Card className="h-full">
                                <CardHeader>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                                            <KeyIcon className="h-5 w-5 text-white" />
                                        </div>
                                        <CardTitle>API Key Authentication</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Simple and secure authentication using API keys
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How to use:</h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                            <li>Generate an API key from your dashboard</li>
                                            <li>Include it in the Authorization header</li>
                                            <li>Use the Bearer token format</li>
                                        </ol>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Example:</h4>
                                        <div className="bg-gray-900 rounded-lg p-4">
                                            <pre className="text-sm text-gray-300 overflow-x-auto">
                                                <code>{`Authorization: Bearer sk_live_abc123...`}</code>
                                            </pre>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <ShieldCheckIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-medium text-blue-900 dark:text-blue-100">Security Tip</p>
                                            <p className="text-blue-700 dark:text-blue-300">
                                                Keep your API keys secure and never expose them in client-side code
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* OAuth 2.0 */}
                        <motion.div variants={fadeInUp}>
                            <Card className="h-full">
                                <CardHeader>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                            <GlobeAltIcon className="h-5 w-5 text-white" />
                                        </div>
                                        <CardTitle>OAuth 2.0</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Industry-standard authorization framework for secure access
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Flow:</h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                            <li>Redirect user to authorization URL</li>
                                            <li>User grants permission</li>
                                            <li>Exchange authorization code for access token</li>
                                            <li>Use access token for API requests</li>
                                        </ol>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Scopes:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['read', 'write', 'admin', 'billing'].map((scope) => (
                                                <span key={scope} className="px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded">
                                                    {scope}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                        <BoltIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-medium text-purple-900 dark:text-purple-100">Best Practice</p>
                                            <p className="text-purple-700 dark:text-purple-300">
                                                Request only the minimum scopes needed for your application
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Rate Limits & Best Practices */}
            <motion.section
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="py-16 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Rate Limits & Best Practices
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Guidelines for optimal API usage and performance
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <motion.div variants={fadeInUp}>
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <BoltIcon className="h-5 w-5 mr-2 text-orange-500" />
                                        Rate Limits
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Free Plan:</span>
                                            <span className="font-medium">1,000/hour</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Pro Plan:</span>
                                            <span className="font-medium">10,000/hour</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Enterprise:</span>
                                            <span className="font-medium">Custom</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <ShieldCheckIcon className="h-5 w-5 mr-2 text-green-500" />
                                        Error Handling
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <span className="w-12 text-green-600 font-mono">200</span>
                                            <span>Success</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="w-12 text-yellow-600 font-mono">400</span>
                                            <span>Bad Request</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="w-12 text-red-600 font-mono">401</span>
                                            <span>Unauthorized</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="w-12 text-red-600 font-mono">429</span>
                                            <span>Rate Limited</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="w-12 text-red-600 font-mono">500</span>
                                            <span>Server Error</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <SparklesIcon className="h-5 w-5 mr-2 text-blue-500" />
                                        Best Practices
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                        <li className="flex items-start space-x-2">
                                            <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>Use HTTPS for all requests</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>Implement exponential backoff</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>Cache responses when possible</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>Use pagination for large datasets</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>Monitor your usage</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </div>
    )
}
