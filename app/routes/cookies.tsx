import type { MetaFunction } from "react-router"
import { motion } from "framer-motion"
import { CogIcon, EyeIcon, ChartBarIcon } from "@heroicons/react/24/outline"
import { PolicyHeader, PolicySection, TableOfContents } from "~/components/policy/PolicySection"
import { COOKIE_POLICY } from "~/data/PolicyData"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `${COOKIE_POLICY.title} - ${COMPANY_INFO.name}` },
        { name: "description", content: `Kebijakan Cookie ${COMPANY_INFO.name} - Pelajari bagaimana kami menggunakan cookies untuk meningkatkan pengalaman Anda.` },
        { name: "keywords", content: "kebijakan cookie, cookies, tracking, analytics, privacy" },
        { property: "og:title", content: `${COOKIE_POLICY.title} - ${COMPANY_INFO.name}` },
        { property: "og:description", content: `Kebijakan Cookie ${COMPANY_INFO.name} - Transparansi penggunaan cookies di platform kami.` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${COOKIE_POLICY.title} - ${COMPANY_INFO.name}` },
        { name: "twitter:description", content: `Kebijakan Cookie ${COMPANY_INFO.name} - Transparansi penggunaan cookies di platform kami.` },
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

export default function Cookies() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
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
                            <div className="flex items-center space-x-2 px-4 py-2 bg-orange-100 dark:bg-orange-900 rounded-full">
                                <CogIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                                    Cookies & Tracking
                                </span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                Cookie Policy
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Transparansi penuh tentang bagaimana kami menggunakan cookies untuk meningkatkan pengalaman Anda
                        </p>
                    </motion.div>

                    {/* Cookie Types */}
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
                            <CogIcon className="h-6 w-6 text-orange-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Essential Cookies
                            </span>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                            <ChartBarIcon className="h-6 w-6 text-blue-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Analytics Cookies
                            </span>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                            <EyeIcon className="h-6 w-6 text-purple-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Marketing Cookies
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Cookie Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Policy Header */}
                        <PolicyHeader
                            title={COOKIE_POLICY.title}
                            lastUpdated={COOKIE_POLICY.lastUpdated}
                            effectiveDate={COOKIE_POLICY.effectiveDate}
                            introduction={COOKIE_POLICY.introduction}
                        />

                        {/* Table of Contents */}
                        <TableOfContents
                            sections={COOKIE_POLICY.sections}
                        />

                        {/* Cookie Sections */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="prose prose-lg max-w-none dark:prose-invert"
                        >
                            {COOKIE_POLICY.sections.map((section, index) => (
                                <PolicySection
                                    key={section.id}
                                    section={section}
                                    index={index}
                                />
                            ))}
                        </motion.div>

                        {/* Cookie Management Tool */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mt-16 p-8 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border border-orange-200 dark:border-orange-800"
                        >
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                                        <CogIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Kelola Preferensi Cookie
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                                    Anda memiliki kontrol penuh atas cookies yang kami gunakan. Atur preferensi Anda sesuai keinginan.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={() => {
                                            // This would open a cookie preference modal in a real implementation
                                            alert('Cookie preference panel akan dibuka di sini')
                                        }}
                                        className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                                    >
                                        <CogIcon className="w-5 h-5 mr-2" />
                                        Atur Preferensi
                                    </button>
                                    <button
                                        onClick={() => {
                                            // This would clear all non-essential cookies
                                            alert('Cookies non-essential akan dihapus')
                                        }}
                                        className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium border border-gray-300 dark:border-gray-600"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Hapus Cookies
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Browser Guide */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800"
                        >
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                                        Pengaturan Browser
                                    </h3>
                                    <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                                        Anda juga dapat mengelola cookies langsung melalui pengaturan browser Anda. Setiap browser memiliki cara yang berbeda untuk mengatur cookies. Silakan cek dokumentasi browser Anda untuk panduan lengkap.
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
                            className="mt-8 p-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700"
                        >
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Pertanyaan tentang Cookies?
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                                    Tim privacy kami siap membantu menjelaskan penggunaan cookies dan cara mengelolanya.
                                </p>
                                <a
                                    href={`mailto:privacy@saaspro.com`}
                                    className="inline-flex items-center px-6 py-3 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors font-medium"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Hubungi Tim Privacy
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
