import type { MetaFunction } from "react-router"
import { motion } from "framer-motion"
import { DocumentTextIcon, ScaleIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import { PolicyHeader, PolicySection, TableOfContents } from "~/components/policy/PolicySection"
import { TERMS_OF_SERVICE } from "~/data/PolicyData"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `${TERMS_OF_SERVICE.title} - ${COMPANY_INFO.name}` },
        { name: "description", content: `Syarat dan Ketentuan Layanan ${COMPANY_INFO.name} - Panduan lengkap penggunaan platform kami dengan hak dan kewajiban yang jelas.` },
        { name: "keywords", content: "syarat ketentuan, terms of service, aturan penggunaan, kebijakan layanan" },
        { property: "og:title", content: `${TERMS_OF_SERVICE.title} - ${COMPANY_INFO.name}` },
        { property: "og:description", content: `Syarat dan Ketentuan Layanan ${COMPANY_INFO.name} - Panduan lengkap untuk menggunakan platform kami.` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${TERMS_OF_SERVICE.title} - ${COMPANY_INFO.name}` },
        { name: "twitter:description", content: `Syarat dan Ketentuan Layanan ${COMPANY_INFO.name} - Panduan lengkap untuk menggunakan platform kami.` },
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

export default function Terms() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
                            <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900 rounded-full">
                                <DocumentTextIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                    Syarat & Ketentuan
                                </span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                Terms of Service
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Panduan lengkap penggunaan platform kami dengan hak dan kewajiban yang jelas untuk semua pengguna
                        </p>
                    </motion.div>

                    {/* Key Points */}
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
                            <ScaleIcon className="h-6 w-6 text-green-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Hak & Kewajiban Jelas
                            </span>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                            <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Penggunaan yang Adil
                            </span>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                            <DocumentTextIcon className="h-6 w-6 text-purple-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Transparansi Penuh
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Terms Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Policy Header */}
                        <PolicyHeader
                            title={TERMS_OF_SERVICE.title}
                            lastUpdated={TERMS_OF_SERVICE.lastUpdated}
                            effectiveDate={TERMS_OF_SERVICE.effectiveDate}
                            introduction={TERMS_OF_SERVICE.introduction}
                        />

                        {/* Table of Contents */}
                        <TableOfContents
                            sections={TERMS_OF_SERVICE.sections}
                        />

                        {/* Terms Sections */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="prose prose-lg max-w-none dark:prose-invert"
                        >
                            {TERMS_OF_SERVICE.sections.map((section, index) => (
                                <PolicySection
                                    key={section.id}
                                    section={section}
                                    index={index}
                                />
                            ))}
                        </motion.div>

                        {/* Important Notice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mt-16 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800"
                        >
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                                        Pemberitahuan Penting
                                    </h3>
                                    <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed">
                                        Dengan menggunakan layanan kami, Anda menyatakan telah membaca, memahami, dan menyetujui semua syarat dan ketentuan yang tercantum di atas. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak menggunakan layanan kami.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mt-8 p-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl border border-green-200 dark:border-green-800"
                        >
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Butuh Klarifikasi?
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                                    Tim legal kami siap membantu menjelaskan syarat dan ketentuan ini dengan bahasa yang lebih mudah dipahami.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href={`mailto:legal@saaspro.com`}
                                        className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Hubungi Tim Legal
                                    </a>
                                    <a
                                        href="/help"
                                        className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium border border-gray-300 dark:border-gray-600"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        FAQ & Help Center
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
