import type { MetaFunction } from "react-router"
import { motion } from "framer-motion"
import { ShieldCheckIcon, LockClosedIcon, EyeIcon } from "@heroicons/react/24/outline"
import { PolicyHeader, PolicySection, TableOfContents } from "~/components/policy/PolicySection"
import { PRIVACY_POLICY } from "~/data/PolicyData"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `${PRIVACY_POLICY.title} - ${COMPANY_INFO.name}` },
        { name: "description", content: `Kebijakan Privasi ${COMPANY_INFO.name} - Pelajari bagaimana kami melindungi dan mengelola data pribadi Anda dengan standar keamanan tertinggi.` },
        { name: "keywords", content: "kebijakan privasi, perlindungan data, keamanan informasi, GDPR, privacy policy" },
        { property: "og:title", content: `${PRIVACY_POLICY.title} - ${COMPANY_INFO.name}` },
        { property: "og:description", content: `Kebijakan Privasi ${COMPANY_INFO.name} - Komitmen kami untuk melindungi privasi dan keamanan data Anda.` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${PRIVACY_POLICY.title} - ${COMPANY_INFO.name}` },
        { name: "twitter:description", content: `Kebijakan Privasi ${COMPANY_INFO.name} - Komitmen kami untuk melindungi privasi dan keamanan data Anda.` },
        { name: "robots", content: "index, follow" },
        { name: "author", content: COMPANY_INFO.name },
        { name: "language", content: "id" }
    ]
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

export default function Privacy() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container mx-auto max-w-7xl relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                                <ShieldCheckIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                    Perlindungan Data & Privasi
                                </span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Kebijakan Privasi
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Komitmen kami untuk melindungi privasi dan keamanan informasi pribadi Anda dengan standar tertinggi
                        </p>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                            <LockClosedIcon className="h-6 w-6 text-green-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Enkripsi End-to-End
                            </span>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                            <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                GDPR Compliant
                            </span>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                            <EyeIcon className="h-6 w-6 text-purple-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Transparansi Penuh
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Policy Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Policy Header */}
                        <PolicyHeader
                            title={PRIVACY_POLICY.title}
                            lastUpdated={PRIVACY_POLICY.lastUpdated}
                            effectiveDate={PRIVACY_POLICY.effectiveDate}
                            introduction={PRIVACY_POLICY.introduction}
                        />

                        {/* Table of Contents */}
                        <TableOfContents
                            sections={PRIVACY_POLICY.sections}
                        />

                        {/* Policy Sections */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="prose prose-lg max-w-none dark:prose-invert"
                        >
                            {PRIVACY_POLICY.sections.map((section, index) => (
                                <PolicySection
                                    key={section.id}
                                    section={section}
                                    index={index}
                                />
                            ))}
                        </motion.div>

                        {/* Contact CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800"
                        >
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Masih Ada Pertanyaan?
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                                    Tim kami siap membantu Anda memahami kebijakan privasi kami dan menjawab pertanyaan tentang perlindungan data Anda.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href={`mailto:${COMPANY_INFO.email}`}
                                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Hubungi Kami
                                    </a>
                                    <a
                                        href="/contact"
                                        className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium border border-gray-300 dark:border-gray-600"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        Live Chat
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
