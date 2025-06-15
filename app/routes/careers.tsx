import type { MetaFunction } from "react-router"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    BriefcaseIcon,
    UsersIcon,
    HeartIcon,
    GlobeAltIcon,
    AcademicCapIcon
} from "@heroicons/react/24/outline"
import { Button } from "~/components/ui/Button"
import { Input } from "~/components/ui/Input"
import { JobCard } from "~/components/careers/JobCard"
import { JOB_POSITIONS, FEATURED_JOBS, getJobsByDepartment } from "~/data/CareersData"
import { JOB_DEPARTMENTS, JOB_TYPES, COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `Careers - ${COMPANY_INFO.name}` },
        { name: "description", content: "Bergabunglah dengan tim SaaS Pro dan bangun masa depan teknologi bersama kami. Temukan lowongan kerja terbaru dan mulai karir impian Anda." },
        { name: "keywords", content: "karir, lowongan kerja, jobs, teknologi, remote work, SaaS, developer, designer" },
        { property: "og:title", content: `Careers - ${COMPANY_INFO.name}` },
        { property: "og:description", content: "Bergabunglah dengan tim SaaS Pro dan bangun masa depan teknologi bersama kami" },
        { property: "og:type", content: "website" },
    ]
}

export default function Careers() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedDepartment, setSelectedDepartment] = useState("all")
    const [selectedType, setSelectedType] = useState("all")
    const [showFilters, setShowFilters] = useState(false)

    // Filter jobs based on search query, department, and type
    const filteredJobs = useMemo(() => {
        let jobs = JOB_POSITIONS

        // Filter by department
        if (selectedDepartment !== "all") {
            jobs = getJobsByDepartment(selectedDepartment)
        }

        // Filter by type
        if (selectedType !== "all") {
            jobs = jobs.filter(job => job.type === selectedType)
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            jobs = jobs.filter(job =>
                job.title.toLowerCase().includes(query) ||
                job.description.toLowerCase().includes(query) ||
                job.department.toLowerCase().includes(query) ||
                job.location.toLowerCase().includes(query)
            )
        }

        return jobs
    }, [searchQuery, selectedDepartment, selectedType])




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

    const companyValues = [
        {
            icon: UsersIcon,
            title: "Team Collaboration",
            description: "Kami percaya pada kekuatan kolaborasi dan saling mendukung untuk mencapai tujuan bersama."
        },
        {
            icon: HeartIcon,
            title: "Work-Life Balance",
            description: "Kesehatan mental dan keseimbangan hidup adalah prioritas utama dalam budaya kerja kami."
        },
        {
            icon: GlobeAltIcon,
            title: "Remote-First",
            description: "Fleksibilitas bekerja dari mana saja dengan tools dan support yang lengkap."
        },
        {
            icon: AcademicCapIcon,
            title: "Continuous Learning",
            description: "Investasi dalam pengembangan skill dan karir jangka panjang setiap anggota tim."
        }
    ]

    const benefits = [
        "💰 Gaji kompetitif dengan review tahunan",
        "🏥 Asuransi kesehatan premium",
        "🏠 Flexible working arrangements",
        "📚 Learning budget Rp 10 juta/tahun",
        "💻 MacBook Pro dan setup lengkap",
        "🌴 Unlimited PTO policy",
        "📈 Stock options program",
        "🎉 Team building & retreats"
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
                            <div className="flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                                <BriefcaseIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                                    We&apos;re Hiring
                                </span>
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Build the 
                            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                {" "}Future
                            </span>
                            <br />with Us
                        </h1>
                        
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Bergabunglah dengan tim yang passionate dalam membangun solusi SaaS terdepan. 
                            Kami mencari talenta terbaik untuk bersama-sama menciptakan dampak positif.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gradient" size="lg">
                                <BriefcaseIcon className="h-5 w-5 mr-2" />
                                Lihat Lowongan
                            </Button>
                            <Button variant="outline" size="lg">
                                Tentang Kami
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Company Values */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Why Join SaaS Pro?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Kami bukan hanya tempat kerja, tapi komunitas yang mendukung pertumbuhan 
                            dan inovasi setiap anggota tim.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {companyValues.map((value) => (
                            <motion.div
                                key={value.title}
                                variants={itemVariants}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                                        <value.icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Benefits & Perks
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Kami peduli dengan kesejahteraan dan pengembangan tim
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                            >
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    {benefit}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Cari posisi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Filter Toggle */}
                        <Button
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden"
                        >
                            <FunnelIcon className="h-4 w-4 mr-2" />
                            Filter
                        </Button>

                        {/* Filters */}
                        <div className={`flex flex-wrap gap-2 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
                            {/* Department Filter */}
                            <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
                            >
                                {JOB_DEPARTMENTS.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>

                            {/* Type Filter */}
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
                            >
                                {JOB_TYPES.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Jobs Section */}
            {selectedDepartment === "all" && selectedType === "all" && !searchQuery && (
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="container mx-auto max-w-7xl">
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Featured Positions
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Posisi prioritas yang sedang kami cari
                            </p>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        >
                            {FEATURED_JOBS.map((job, index) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    index={index}
                                />
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* All Jobs Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {searchQuery ? `Hasil pencarian "${searchQuery}"` : "Open Positions"}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            {filteredJobs.length} posisi tersedia
                        </p>
                    </motion.div>

                    {filteredJobs.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredJobs.map((job, index) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    index={index}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-center py-16"
                        >
                            <div className="text-6xl mb-4">💼</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Tidak ada posisi ditemukan
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Coba ubah kata kunci pencarian atau filter
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchQuery("")
                                    setSelectedDepartment("all")
                                    setSelectedType("all")
                                }}
                            >
                                Reset Filter
                            </Button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Tidak menemukan posisi yang cocok?
                        </h2>
                        <p className="text-purple-100 mb-8 text-lg">
                            Kami selalu terbuka untuk talenta luar biasa. Kirimkan CV Anda dan 
                            kami akan menghubungi ketika ada posisi yang sesuai.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="secondary" size="lg">
                                Kirim CV Spontan
                            </Button>
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
                                Hubungi HR
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
