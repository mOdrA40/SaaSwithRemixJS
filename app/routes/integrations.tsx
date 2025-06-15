import type { MetaFunction } from "react-router"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    PuzzlePieceIcon,
    BoltIcon,
    CloudIcon,
    ShieldCheckIcon,
    CheckIcon,
    ArrowTopRightOnSquareIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    SparklesIcon,
    CpuChipIcon,

    ChatBubbleLeftRightIcon,
    EnvelopeIcon,
    ChartBarIcon,
    CreditCardIcon,
    DocumentTextIcon
} from "@heroicons/react/24/outline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { Button } from "~/components/ui/Button"
import { COMPANY_INFO } from "~/data/constants"
import { cn } from "~/lib/utils"

export const meta: MetaFunction = () => {
    return [
        { title: `Integrations - ${COMPANY_INFO.name}` },
        { name: "description", content: "Connect with your favorite tools and services. Explore our extensive integration library." },
        { name: "keywords", content: "integrations, API, webhooks, automation, third-party, services" }
    ]
}

interface Integration {
    id: string
    name: string
    description: string
    category: string
    icon: React.ComponentType<{ className?: string }>
    color: string
    status: 'available' | 'coming-soon' | 'beta'
    features: string[]
    setupTime: string
    popularity: number
    verified: boolean
}

const integrations: Integration[] = [
    {
        id: 'slack',
        name: 'Slack',
        description: 'Get real-time notifications and manage your workspace directly from Slack',
        category: 'Communication',
        icon: ChatBubbleLeftRightIcon,
        color: 'from-purple-500 to-pink-500',
        status: 'available',
        features: ['Real-time notifications', 'Slash commands', 'Interactive messages', 'Bot integration'],
        setupTime: '5 minutes',
        popularity: 95,
        verified: true
    },
    {
        id: 'stripe',
        name: 'Stripe',
        description: 'Accept payments and manage billing with the world\'s leading payment platform',
        category: 'Payment',
        icon: CreditCardIcon,
        color: 'from-blue-500 to-cyan-500',
        status: 'available',
        features: ['Payment processing', 'Subscription management', 'Invoice generation', 'Webhook events'],
        setupTime: '10 minutes',
        popularity: 92,
        verified: true
    },
    {
        id: 'google-analytics',
        name: 'Google Analytics',
        description: 'Track user behavior and get detailed insights about your application usage',
        category: 'Analytics',
        icon: ChartBarIcon,
        color: 'from-green-500 to-emerald-500',
        status: 'available',
        features: ['Event tracking', 'Custom dimensions', 'Goal conversion', 'Real-time data'],
        setupTime: '3 minutes',
        popularity: 88,
        verified: true
    },
    {
        id: 'sendgrid',
        name: 'SendGrid',
        description: 'Send transactional and marketing emails with reliable delivery',
        category: 'Email',
        icon: EnvelopeIcon,
        color: 'from-orange-500 to-red-500',
        status: 'available',
        features: ['Email templates', 'Delivery tracking', 'A/B testing', 'Analytics'],
        setupTime: '7 minutes',
        popularity: 85,
        verified: true
    },
    {
        id: 'aws',
        name: 'Amazon Web Services',
        description: 'Deploy and scale your applications with AWS cloud infrastructure',
        category: 'Cloud',
        icon: CloudIcon,
        color: 'from-yellow-500 to-orange-500',
        status: 'available',
        features: ['Auto-scaling', 'Load balancing', 'Database management', 'CDN integration'],
        setupTime: '15 minutes',
        popularity: 90,
        verified: true
    },
    {
        id: 'zapier',
        name: 'Zapier',
        description: 'Automate workflows by connecting with 5000+ apps and services',
        category: 'Automation',
        icon: BoltIcon,
        color: 'from-indigo-500 to-purple-500',
        status: 'available',
        features: ['Workflow automation', 'Multi-step zaps', 'Conditional logic', 'Error handling'],
        setupTime: '5 minutes',
        popularity: 87,
        verified: true
    },
    {
        id: 'notion',
        name: 'Notion',
        description: 'Sync your data with Notion databases and create powerful workflows',
        category: 'Productivity',
        icon: DocumentTextIcon,
        color: 'from-gray-500 to-gray-700',
        status: 'beta',
        features: ['Database sync', 'Page creation', 'Block management', 'Team collaboration'],
        setupTime: '8 minutes',
        popularity: 78,
        verified: false
    },
    {
        id: 'openai',
        name: 'OpenAI',
        description: 'Integrate AI capabilities with GPT models for intelligent automation',
        category: 'AI/ML',
        icon: CpuChipIcon,
        color: 'from-emerald-500 to-teal-500',
        status: 'coming-soon',
        features: ['Text generation', 'Code completion', 'Image analysis', 'Custom models'],
        setupTime: '12 minutes',
        popularity: 82,
        verified: false
    }
]

const categories = ['All', 'Communication', 'Payment', 'Analytics', 'Email', 'Cloud', 'Automation', 'Productivity', 'AI/ML']

const stats = [
    { label: 'Total Integrations', value: '50+', icon: PuzzlePieceIcon },
    { label: 'Active Connections', value: '10M+', icon: BoltIcon },
    { label: 'Uptime', value: '99.9%', icon: ShieldCheckIcon },
    { label: 'Setup Time', value: '<10min', icon: SparklesIcon }
]

export default function Integrations() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

    const filteredIntegrations = integrations.filter(integration => {
        const matchesCategory = selectedCategory === 'All' || integration.category === selectedCategory
        const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            integration.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative py-20 px-4 sm:px-6 lg:px-8"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10" />
                <div className="relative max-w-7xl mx-auto text-center">
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        className="flex justify-center mb-6"
                    >
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600">
                            <PuzzlePieceIcon className="h-12 w-12 text-white" />
                        </div>
                    </motion.div>
                    
                    <motion.h1
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6"
                    >
                        Powerful Integrations
                    </motion.h1>
                    
                    <motion.p
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
                    >
                        Connect with your favorite tools and services. Build powerful workflows 
                        and automate your business processes with our extensive integration library.
                    </motion.p>

                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button variant="gradient" size="lg" className="group">
                            <BoltIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                            Browse Integrations
                        </Button>
                        <Button variant="outline" size="lg">
                            <DocumentTextIcon className="h-5 w-5 mr-2" />
                            View Documentation
                        </Button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Stats Section */}
            <motion.section
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="py-16 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                variants={fadeInUp}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="text-center hover:shadow-lg transition-all duration-300 group">
                                    <CardContent className="pt-6">
                                        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <stat.icon className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {stat.label}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Search and Filter Section */}
            <motion.section
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                        {/* Search */}
                        <motion.div variants={fadeInUp} className="relative flex-1 max-w-md">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search integrations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </motion.div>

                        {/* Category Filter */}
                        <motion.div variants={fadeInUp} className="flex items-center space-x-2">
                            <FunnelIcon className="h-5 w-5 text-gray-400" />
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={cn(
                                            "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                                            selectedCategory === category
                                                ? "bg-purple-600 text-white"
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                        )}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Integrations Grid */}
            <motion.section
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="py-16 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Available Integrations
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            {filteredIntegrations.length} integration{filteredIntegrations.length !== 1 ? 's' : ''} found
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {filteredIntegrations.map((integration, index) => (
                                <motion.div
                                    key={integration.id}
                                    variants={fadeInUp}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ delay: index * 0.05 }}
                                    layout
                                >
                                    <Card
                                        className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
                                        onClick={() => setSelectedIntegration(integration)}
                                    >
                                        <CardHeader className="pb-4">
                                            <div className="flex items-start justify-between">
                                                <div className={cn(
                                                    "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center group-hover:scale-110 transition-transform",
                                                    integration.color
                                                )}>
                                                    <integration.icon className="h-6 w-6 text-white" />
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {integration.verified && (
                                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                                            <CheckIcon className="h-4 w-4 text-white" />
                                                        </div>
                                                    )}
                                                    <span className={cn(
                                                        "px-2 py-1 text-xs font-medium rounded-full",
                                                        integration.status === 'available' && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                                                        integration.status === 'beta' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                                                        integration.status === 'coming-soon' && "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                                                    )}>
                                                        {integration.status === 'coming-soon' ? 'Coming Soon' : integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                                                    </span>
                                                </div>
                                            </div>
                                            <CardTitle className="text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                {integration.name}
                                            </CardTitle>
                                            <CardDescription className="text-sm line-clamp-2">
                                                {integration.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600 dark:text-gray-400">Setup time:</span>
                                                    <span className="font-medium">{integration.setupTime}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600 dark:text-gray-400">Popularity:</span>
                                                    <div className="flex items-center space-x-1">
                                                        <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                                                                style={{ width: `${integration.popularity}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs font-medium">{integration.popularity}%</span>
                                                    </div>
                                                </div>
                                                <div className="pt-2">
                                                    <Button
                                                        variant={integration.status === 'available' ? 'gradient' : 'outline'}
                                                        size="sm"
                                                        className="w-full group-hover:scale-105 transition-transform"
                                                        disabled={integration.status === 'coming-soon'}
                                                    >
                                                        {integration.status === 'available' ? 'Connect' :
                                                         integration.status === 'beta' ? 'Try Beta' : 'Coming Soon'}
                                                        {integration.status !== 'coming-soon' && (
                                                            <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredIntegrations.length === 0 && (
                        <motion.div
                            variants={fadeInUp}
                            className="text-center py-12"
                        >
                            <PuzzlePieceIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No integrations found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Try adjusting your search or filter criteria
                            </p>
                        </motion.div>
                    )}
                </div>
            </motion.section>

            {/* Integration Detail Modal */}
            <AnimatePresence>
                {selectedIntegration && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                        onClick={() => setSelectedIntegration(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className={cn(
                                            "w-16 h-16 rounded-2xl bg-gradient-to-r flex items-center justify-center",
                                            selectedIntegration.color
                                        )}>
                                            <selectedIntegration.icon className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-2 mb-1">
                                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {selectedIntegration.name}
                                                </h3>
                                                {selectedIntegration.verified && (
                                                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                                        <CheckIcon className="h-4 w-4 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {selectedIntegration.category}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedIntegration(null)}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                    >
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {selectedIntegration.description}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Features</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {selectedIntegration.features.map((feature, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Setup Time</h4>
                                            <p className="text-2xl font-bold text-purple-600">{selectedIntegration.setupTime}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Popularity</h4>
                                            <div className="flex items-center space-x-2">
                                                <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                                                        style={{ width: `${selectedIntegration.popularity}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium">{selectedIntegration.popularity}%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3 pt-4">
                                        <Button
                                            variant={selectedIntegration.status === 'available' ? 'gradient' : 'outline'}
                                            className="flex-1"
                                            disabled={selectedIntegration.status === 'coming-soon'}
                                        >
                                            {selectedIntegration.status === 'available' ? 'Connect Integration' :
                                             selectedIntegration.status === 'beta' ? 'Try Beta Version' : 'Coming Soon'}
                                        </Button>
                                        <Button variant="outline">
                                            <DocumentTextIcon className="h-4 w-4 mr-2" />
                                            Documentation
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
