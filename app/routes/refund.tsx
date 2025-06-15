import type { MetaFunction } from "react-router"
import { motion } from "framer-motion"
import { CurrencyDollarIcon, ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import { PolicyHeader, PolicySection, TableOfContents } from "~/components/policy/PolicySection"
import { REFUND_POLICY } from "~/data/PolicyData"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `${REFUND_POLICY.title} - ${COMPANY_INFO.name}` },
        { name: "description", content: `Kebijakan Pengembalian Dana ${COMPANY_INFO.name} - Panduan lengkap proses refund dengan syarat dan ketentuan yang jelas.` },
        { name: "keywords", content: "kebijakan refund, pengembalian dana, refund policy, pembatalan langganan" },
        { property: "og:title", content: `${REFUND_POLICY.title} - ${COMPANY_INFO.name}` },
        { property: "og:description", content: `Kebijakan Pengembalian Dana ${COMPANY_INFO.name} - Proses refund yang transparan dan adil.` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${REFUND_POLICY.title} - ${COMPANY_INFO.name}` },
        { name: "twitter:description", content: `Kebijakan Pengembalian Dana ${COMPANY_INFO.name} - Proses refund yang transparan dan adil.` },
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

export default function Refund() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
                            <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                                <CurrencyDollarIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                                    Pengembalian Dana
                                </span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Refund Policy
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Proses pengembalian dana yang transparan dan adil dengan syarat dan ketentuan yang jelas
                        </p>
                    </motion.div>

                    {/* Key Features */}
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
                            <ClockIcon className="h-6 w-6 text-emerald-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Proses Cepat 14 Hari
                            </span>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                            <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Syarat yang Adil
                            </span>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                            <CurrencyDollarIcon className="h-6 w-6 text-teal-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Refund Transparan
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Refund Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Policy Header */}
                        <PolicyHeader
                            title={REFUND_POLICY.title}
                            lastUpdated={REFUND_POLICY.lastUpdated}
                            effectiveDate={REFUND_POLICY.effectiveDate}
                            introduction={REFUND_POLICY.introduction}
                        />

                        {/* Table of Contents */}
                        <TableOfContents
                            sections={REFUND_POLICY.sections}
                        />

                        {/* Refund Sections */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="prose prose-lg max-w-none dark:prose-invert"
                        >
                            {REFUND_POLICY.sections.map((section, index) => (
                                <PolicySection
                                    key={section.id}
                                    section={section}
                                    index={index}
                                />
                            ))}
                        </motion.div>

                        {/* Quick Refund Guide */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mt-16 p-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800"
                        >
                            <div className="text-center mb-8">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                                        <CurrencyDollarIcon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Panduan Cepat Refund
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                                    Ikuti langkah-langkah sederhana ini untuk mengajukan pengembalian dana
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                            1
                                        </div>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        Kirim Email
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Email ke billing@saaspro.com dengan subjek &quot;Refund Request&quot;
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                            2
                                        </div>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        Sertakan Detail
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Nomor invoice, alasan refund, dan dokumentasi pendukung
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                            3
                                        </div>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        Tunggu Proses
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Tim kami akan memproses dalam 3-5 hari kerja
                                    </p>
                                </div>
                            </div>

                            <div className="text-center mt-8">
                                <a
                                    href="mailto:billing@saaspro.com?subject=Refund Request"
                                    className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Ajukan Refund Sekarang
                                </a>
                            </div>
                        </motion.div>

                        {/* Support Notice */}
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
                                        Butuh Bantuan?
                                    </h3>
                                    <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                                        Sebelum mengajukan refund, coba hubungi tim support kami terlebih dahulu. Mungkin masalah Anda dapat diselesaikan tanpa perlu refund. Tim kami siap membantu 24/7.
                                    </p>
                                    <div className="mt-4">
                                        <a
                                            href="/help"
                                            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Kunjungi Help Center
                                        </a>
                                    </div>
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
                                    Pertanyaan tentang Refund?
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                                    Tim billing kami siap membantu menjelaskan proses refund dan menjawab pertanyaan Anda.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href="mailto:billing@saaspro.com"
                                        className="inline-flex items-center px-6 py-3 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors font-medium"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Hubungi Tim Billing
                                    </a>
                                    <a
                                        href={`tel:${COMPANY_INFO.phone}`}
                                        className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium border border-gray-300 dark:border-gray-600"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Telepon Kami
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
