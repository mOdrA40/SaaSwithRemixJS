import type { MetaFunction } from "react-router"
import { Link } from "react-router"
import { motion } from "framer-motion"
import {
    ShieldCheckIcon,
    ChartBarIcon,
    DocumentTextIcon,
    SparklesIcon,
    ArrowRightIcon,
    CodeBracketIcon,
    CpuChipIcon,
    PaintBrushIcon
} from "@heroicons/react/24/outline"
import { Button } from "~/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `Component Demos - ${COMPANY_INFO.name}` },
        { name: "description", content: "Explore our premium component library with interactive demos and examples" },
    ]
}

const demos = [
    {
        id: 'auth',
        title: 'Authentication Components',
        description: 'Advanced authentication with 2FA, OAuth, and beautiful login forms',
        icon: ShieldCheckIcon,
        color: 'from-blue-500 to-cyan-500',
        features: [
            'Multi-factor Authentication',
            'OAuth Integration (6 providers)',
            'Real-time Validation',
            'Smooth Animations'
        ],
        href: '/demo/auth'
    },
    {
        id: 'dashboard',
        title: 'Dashboard Components',
        description: 'Interactive KPI cards, charts, and analytics widgets',
        icon: ChartBarIcon,
        color: 'from-purple-500 to-pink-500',
        features: [
            'Animated KPI Cards',
            'Interactive Charts',
            'Real-time Data',
            'Responsive Design'
        ],
        href: '/demo/dashboard'
    },
    {
        id: 'forms',
        title: 'Form Components',
        description: 'Multi-step wizards, file uploads, and advanced validation',
        icon: DocumentTextIcon,
        color: 'from-green-500 to-emerald-500',
        features: [
            'Multi-step Wizards',
            'Drag & Drop Upload',
            'Real-time Validation',
            'Auto-save Functionality'
        ],
        href: '/demo/forms'
    }
]

const features = [
    {
        icon: CodeBracketIcon,
        title: 'Production Ready',
        description: 'Enterprise-grade components built with TypeScript and best practices'
    },
    {
        icon: CpuChipIcon,
        title: 'High Performance',
        description: 'Optimized for speed with lazy loading and efficient rendering'
    },
    {
        icon: PaintBrushIcon,
        title: 'Beautiful Design',
        description: 'Carefully crafted with attention to detail and smooth animations'
    },
    {
        icon: SparklesIcon,
        title: 'Modern Stack',
        description: 'Built with React, Framer Motion, Tailwind CSS, and React Router v7'
    }
]

export default function DemoIndex() {
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
                    />
                    <motion.div
                        animate={{
                            y: [0, 30, 0],
                            rotate: [0, -5, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                        className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-15 blur-2xl"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800 mb-8">
                            <SparklesIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                            <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                                Premium Component Library
                            </span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
                    >
                        <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                            Interactive
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Component Demos
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
                    >
                        Explore our premium component library with interactive demos. 
                        See how enterprise-grade components work in real-time with 
                        <span className="font-semibold text-gray-900 dark:text-white"> beautiful animations and advanced features.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link to="/demo/auth">
                            <Button size="xl" variant="gradient" className="px-8 py-4 text-lg">
                                <SparklesIcon className="h-6 w-6 mr-2" />
                                Start Exploring
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button size="xl" variant="outline" className="px-8 py-4 text-lg">
                                Learn More
                                <ArrowRightIcon className="h-5 w-5 ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Demo Cards Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                        >
                            Component <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Showcase</span>
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                        >
                            Discover the power of our component library through interactive demonstrations
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        {demos.map((demo) => (
                            <motion.div
                                key={demo.id}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link to={demo.href}>
                                    <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden group cursor-pointer">
                                        <div className={`h-2 bg-gradient-to-r ${demo.color}`} />
                                        <CardHeader className="pb-4">
                                            <div className="flex items-center space-x-4 mb-4">
                                                <motion.div
                                                    whileHover={{ rotate: 360 }}
                                                    transition={{ duration: 0.6 }}
                                                    className={`p-4 rounded-xl bg-gradient-to-r ${demo.color} shadow-lg`}
                                                >
                                                    <demo.icon className="h-8 w-8 text-white" />
                                                </motion.div>
                                                <div>
                                                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {demo.title}
                                                    </CardTitle>
                                                </div>
                                            </div>
                                            <CardDescription className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                                {demo.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3 mb-6">
                                                {demo.features.map((feature, featureIndex) => (
                                                    <div key={featureIndex} className="flex items-center space-x-2">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            {feature}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <Button variant="outline" className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                                                View Demo
                                                <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                        >
                            Why Choose Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Components</span>
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                        >
                            Built with modern technologies and best practices for exceptional user experience
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                                className="text-center"
                            >
                                <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Ready to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Get Started</span>?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                            Experience the power of premium components in your next project
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/auth/signup">
                                <Button size="xl" variant="gradient" className="px-8 py-4 text-lg">
                                    <SparklesIcon className="h-6 w-6 mr-2" />
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button size="xl" variant="outline" className="px-8 py-4 text-lg">
                                    Contact Sales
                                    <ArrowRightIcon className="h-5 w-5 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
