import type { MetaFunction } from "react-router"
import { useState } from "react"
import { motion } from "framer-motion"
import { 
    ShieldCheckIcon,
    LockClosedIcon,
    DocumentTextIcon,

    CheckBadgeIcon,
    ExclamationTriangleIcon,
    ArrowDownTrayIcon
} from "@heroicons/react/24/outline"
import { Button } from "~/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { SecurityFeature, ComplianceCard, SecurityMetric } from "~/components/security/SecurityFeature"
import {
    SECURITY_FEATURES,
    SECURITY_METRICS,
    SECURITY_BEST_PRACTICES,
    getComplianceByStatus,
    getSecurityFeaturesByCategory,
    getRecentReports
} from "~/data/SecurityData"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `Security & Compliance - ${COMPANY_INFO.name}` },
        { name: "description", content: "Comprehensive security features, compliance certifications, and data protection measures for SaaS Pro. Learn about our enterprise-grade security." },
        { name: "keywords", content: "security, compliance, encryption, data protection, SOC 2, ISO 27001, GDPR, HIPAA" },
        { property: "og:title", content: `Security & Compliance - ${COMPANY_INFO.name}` },
        { property: "og:description", content: "Enterprise-grade security and compliance for SaaS Pro" },
        { property: "og:type", content: "website" },
    ]
}

export default function Security() {
    const [activeCategory, setActiveCategory] = useState("all")
    const [activeTab, setActiveTab] = useState("features")

    const certifiedCompliance = getComplianceByStatus("certified")
    const inProgressCompliance = getComplianceByStatus("in_progress")
    const recentReports = getRecentReports(3)

    const filteredFeatures = activeCategory === "all" 
        ? SECURITY_FEATURES 
        : getSecurityFeaturesByCategory(activeCategory as "encryption" | "access" | "monitoring" | "compliance" | "infrastructure")

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

    const categories = [
        { id: "all", name: "All Features", icon: "🛡️" },
        { id: "encryption", name: "Encryption", icon: "🔐" },
        { id: "access", name: "Access Control", icon: "🔑" },
        { id: "monitoring", name: "Monitoring", icon: "👁️" },
        { id: "compliance", name: "Compliance", icon: "📋" },
        { id: "infrastructure", name: "Infrastructure", icon: "🏗️" }
    ]

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
                            <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900 rounded-full">
                                <ShieldCheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                    Security & Compliance
                                </span>
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Enterprise-Grade
                            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                {" "}Security
                            </span>
                            <br />& Compliance
                        </h1>
                        
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Your data is protected by industry-leading security measures, comprehensive compliance 
                            certifications, and continuous monitoring to ensure the highest level of protection.
                        </p>

                        {/* Security Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {[
                                { icon: "🔐", title: "AES-256 Encryption", description: "End-to-end encryption" },
                                { icon: "✅", title: "SOC 2 Certified", description: "Type II compliance" },
                                { icon: "🛡️", title: "24/7 Monitoring", description: "Real-time threat detection" }
                            ].map((highlight, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (index * 0.1) }}
                                    className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 text-center"
                                >
                                    <div className="text-3xl mb-2">{highlight.icon}</div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                        {highlight.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {highlight.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Security Metrics */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Security Metrics
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Real-time security performance indicators
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {SECURITY_METRICS.map((metric, index) => (
                            <SecurityMetric
                                key={metric.id}
                                metric={metric}
                                index={index}
                            />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Content Tabs */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-12">
                        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                            {[
                                { id: "features", label: "Security Features", icon: ShieldCheckIcon },
                                { id: "compliance", label: "Compliance", icon: CheckBadgeIcon },
                                { id: "reports", label: "Security Reports", icon: DocumentTextIcon }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                                        activeTab === tab.id
                                            ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                    }`}
                                >
                                    <tab.icon className="h-4 w-4 mr-2" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Security Features Tab */}
                    {activeTab === "features" && (
                        <motion.div
                            key="features"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Category Filter */}
                            <div className="flex flex-wrap justify-center gap-2 mb-8">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            activeCategory === category.id
                                                ? "bg-green-600 text-white"
                                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                                        }`}
                                    >
                                        {category.icon} {category.name}
                                    </button>
                                ))}
                            </div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredFeatures.map((feature, index) => (
                                    <SecurityFeature
                                        key={feature.id}
                                        feature={feature}
                                        index={index}
                                    />
                                ))}
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Compliance Tab */}
                    {activeTab === "compliance" && (
                        <motion.div
                            key="compliance"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="space-y-12">
                                {/* Certified Compliance */}
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                                        Current Certifications
                                    </h3>
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                                    >
                                        {certifiedCompliance.map((compliance, index) => (
                                            <ComplianceCard
                                                key={compliance.id}
                                                compliance={compliance}
                                                index={index}
                                            />
                                        ))}
                                    </motion.div>
                                </div>

                                {/* In Progress Compliance */}
                                {inProgressCompliance.length > 0 && (
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                                            In Progress
                                        </h3>
                                        <motion.div
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                        >
                                            {inProgressCompliance.map((compliance, index) => (
                                                <ComplianceCard
                                                    key={compliance.id}
                                                    compliance={compliance}
                                                    index={index}
                                                />
                                            ))}
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Security Reports Tab */}
                    {activeTab === "reports" && (
                        <motion.div
                            key="reports"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Security Reports & Audits
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Regular security assessments and compliance reports
                                </p>
                            </div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {recentReports.map((report) => (
                                    <motion.div
                                        key={report.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -4 }}
                                    >
                                        <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                                            <CardHeader>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-2xl">
                                                        {report.type === "penetration_test" ? "🔍" :
                                                         report.type === "vulnerability_scan" ? "🛡️" :
                                                         report.type === "audit_report" ? "📋" : "📊"}
                                                    </span>
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                        report.status === "completed" 
                                                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                    }`}>
                                                        {report.status === "completed" ? "✅ Completed" : "🔄 In Progress"}
                                                    </span>
                                                </div>
                                                <CardTitle className="text-lg">{report.title}</CardTitle>
                                                <CardDescription>
                                                    {report.summary}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    {/* Findings Summary */}
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                                            Findings Summary:
                                                        </h4>
                                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                                            <div className="flex justify-between">
                                                                <span className="text-red-600">Critical:</span>
                                                                <span className="font-medium">{report.findings.critical}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-orange-600">High:</span>
                                                                <span className="font-medium">{report.findings.high}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-yellow-600">Medium:</span>
                                                                <span className="font-medium">{report.findings.medium}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-blue-600">Low:</span>
                                                                <span className="font-medium">{report.findings.low}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-200 dark:border-gray-700">
                                                        <span>Date: {new Date(report.date).toLocaleDateString()}</span>
                                                    </div>

                                                    {report.downloadUrl && (
                                                        <Button variant="outline" size="sm" className="w-full">
                                                            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                                                            Download Report
                                                        </Button>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Security Best Practices */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Security Best Practices
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Follow these guidelines to keep your account and data secure
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {SECURITY_BEST_PRACTICES.map((practice, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -2 }}
                            >
                                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                                    <CardContent className="p-6">
                                        <div className="text-center">
                                            <div className="text-3xl mb-3">{practice.icon}</div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                {practice.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {practice.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Contact Security Team */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Security Questions?
                        </h2>
                        <p className="text-green-100 mb-8 text-lg">
                            Our security team is here to help. Contact us for security inquiries, 
                            vulnerability reports, or compliance questions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="secondary" size="lg">
                                <LockClosedIcon className="h-5 w-5 mr-2" />
                                Report Vulnerability
                            </Button>
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600">
                                <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                                Security Contact
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
