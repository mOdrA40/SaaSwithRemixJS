import type { MetaFunction } from "react-router"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { 
    MagnifyingGlassIcon, 
    DocumentTextIcon,
    CodeBracketIcon,
    BookOpenIcon,
    RocketLaunchIcon,
    CubeIcon,

} from "@heroicons/react/24/outline"
import { Button } from "~/components/ui/Button"
import { Input } from "~/components/ui/Input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { CodeBlock, APIEndpoint } from "~/components/docs/CodeBlock"
import {
    DOC_SECTIONS,
    API_ENDPOINTS,
    API_CATEGORIES,
    getAPIEndpointsByCategory
} from "~/data/DocsData"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `Documentation - ${COMPANY_INFO.name}` },
        { name: "description", content: "Comprehensive API documentation, guides, and tutorials for SaaS Pro. Get started with our powerful APIs and SDKs." },
        { name: "keywords", content: "API documentation, developer guides, SDK, tutorials, integration, REST API" },
        { property: "og:title", content: `Documentation - ${COMPANY_INFO.name}` },
        { property: "og:description", content: "Complete developer documentation for SaaS Pro APIs and integrations" },
        { property: "og:type", content: "website" },
    ]
}

export default function Documentation() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")



    // Filter API endpoints based on category
    const filteredEndpoints = useMemo(() => {
        return selectedCategory === "all" 
            ? API_ENDPOINTS
            : getAPIEndpointsByCategory(selectedCategory)
    }, [selectedCategory])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    const quickStartCode = `// Install the SaaS Pro SDK
npm install @saaspro/sdk

// Initialize the client
import { SaasProClient } from '@saaspro/sdk'

const client = new SaasProClient({
  apiKey: 'your-api-key',
  environment: 'production' // or 'sandbox'
})

// Make your first API call
const users = await client.users.list({
  page: 1,
  limit: 10
})

console.log('Users:', users.data)`

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                                <DocumentTextIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                    Developer Documentation
                                </span>
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Build with 
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {" "}SaaS Pro
                            </span>
                            <br />APIs
                        </h1>
                        
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Comprehensive documentation, interactive examples, and powerful SDKs 
                            to help you integrate SaaS Pro into your applications quickly and efficiently.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto mb-8">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search documentation, APIs, guides..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary"
                            />
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                <RocketLaunchIcon className="h-5 w-5 mr-2" />
                                Quick Start
                            </Button>
                            <Button variant="outline" size="lg">
                                <CodeBracketIcon className="h-5 w-5 mr-2" />
                                API Reference
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Start Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Get Started in Minutes
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Follow our quick start guide to make your first API call and start building amazing applications.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <CodeBlock
                                code={quickStartCode}
                                language="javascript"
                                title="Quick Start Example"
                            />
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-6"
                        >
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">1</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Get Your API Key
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Sign up for a free account and get your API key from the dashboard.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">2</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Install the SDK
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Use our official SDKs for JavaScript, Python, or make direct HTTP requests.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">3</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Make Your First Call
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Start with a simple API call to fetch users or create your first project.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Documentation Sections */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Explore Documentation
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Find guides, tutorials, and references for all SaaS Pro features
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {DOC_SECTIONS.map((section) => (
                            <motion.div
                                key={section.id}
                                variants={itemVariants}
                                whileHover={{ y: -4 }}
                                className="cursor-pointer"
                                onClick={() => setSelectedCategory(section.id)}
                            >
                                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                                    <CardHeader className="text-center">
                                        <div className="text-4xl mb-3">{section.icon}</div>
                                        <CardTitle className="text-lg">{section.title}</CardTitle>
                                        <CardDescription>{section.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center">
                                            <span className="text-sm text-gray-500 dark:text-gray-500">
                                                {section.items.length} articles
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* API Categories */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            API Reference
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Complete API documentation with interactive examples
                        </p>
                    </motion.div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        <button
                            onClick={() => setSelectedCategory("all")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                selectedCategory === "all"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                        >
                            All APIs
                        </button>
                        {API_CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    selectedCategory === category.id
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                            >
                                {category.icon} {category.name}
                            </button>
                        ))}
                    </div>

                    {/* API Endpoints */}
                    <div className="space-y-8">
                        {filteredEndpoints.slice(0, 2).map((endpoint) => (
                            <APIEndpoint
                                key={endpoint.id}
                                method={endpoint.method}
                                path={endpoint.path}
                                title={endpoint.title}
                                description={endpoint.description}
                                parameters={endpoint.parameters}
                                requestBody={endpoint.requestBody}
                                responses={endpoint.responses}
                                examples={endpoint.examples}
                            />
                        ))}
                    </div>

                    {filteredEndpoints.length > 2 && (
                        <div className="text-center mt-8">
                            <Button variant="outline" size="lg">
                                <BookOpenIcon className="h-5 w-5 mr-2" />
                                View All {filteredEndpoints.length} Endpoints
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* SDK Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Official SDKs & Libraries
                        </h2>
                        <p className="text-blue-100 mb-8 text-lg">
                            Use our official SDKs to integrate SaaS Pro into your favorite programming language
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { name: "JavaScript", icon: "🟨", description: "For Node.js and browsers" },
                                { name: "Python", icon: "🐍", description: "With async/await support" },
                                { name: "React", icon: "⚛️", description: "Pre-built components" }
                            ].map((sdk) => (
                                <motion.div
                                    key={sdk.name}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
                                >
                                    <div className="text-4xl mb-3">{sdk.icon}</div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{sdk.name}</h3>
                                    <p className="text-blue-100 text-sm mb-4">{sdk.description}</p>
                                    <Button variant="secondary" size="sm">
                                        <CubeIcon className="h-4 w-4 mr-2" />
                                        Get Started
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
