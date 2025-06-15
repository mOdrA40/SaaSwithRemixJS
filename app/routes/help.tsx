import type { MetaFunction } from "react-router"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { 
    MagnifyingGlassIcon, 
    QuestionMarkCircleIcon,
    ChatBubbleLeftRightIcon,
    DocumentTextIcon,
    PhoneIcon,
    EnvelopeIcon,
    ClockIcon
} from "@heroicons/react/24/outline"
import { Button } from "~/components/ui/Button"
import { Input } from "~/components/ui/Input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { FAQItem } from "~/components/help/FAQItem"
import { FAQ_ITEMS, HELP_ARTICLES, getFAQByCategory, searchFAQ, searchArticles } from "~/data/HelpData"
import { HELP_CATEGORIES, COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `Help Center - ${COMPANY_INFO.name}` },
        { name: "description", content: "Pusat bantuan SaaS Pro. Temukan jawaban atas pertanyaan Anda, tutorial lengkap, dan dukungan 24/7 dari tim ahli kami." },
        { name: "keywords", content: "help, bantuan, FAQ, tutorial, support, dokumentasi, panduan" },
        { property: "og:title", content: `Help Center - ${COMPANY_INFO.name}` },
        { property: "og:description", content: "Pusat bantuan SaaS Pro dengan FAQ lengkap dan dukungan 24/7" },
        { property: "og:type", content: "website" },
    ]
}

export default function Help() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [activeTab, setActiveTab] = useState<"faq" | "articles">("faq")

    // Filter FAQ and articles based on search and category
    const filteredFAQ = useMemo(() => {
        if (searchQuery.trim()) {
            return searchFAQ(searchQuery)
        }
        return selectedCategory === "all" ? FAQ_ITEMS : getFAQByCategory(selectedCategory)
    }, [searchQuery, selectedCategory])

    const filteredArticles = useMemo(() => {
        if (searchQuery.trim()) {
            return searchArticles(searchQuery)
        }
        return HELP_ARTICLES
    }, [searchQuery])

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

    const supportChannels = [
        {
            icon: ChatBubbleLeftRightIcon,
            title: "Live Chat",
            description: "Chat langsung dengan tim support",
            availability: "24/7",
            action: "Mulai Chat",
            color: "bg-blue-500"
        },
        {
            icon: EnvelopeIcon,
            title: "Email Support",
            description: "Kirim pertanyaan detail via email",
            availability: "Response < 2 jam",
            action: "Kirim Email",
            color: "bg-green-500"
        },
        {
            icon: PhoneIcon,
            title: "Phone Support",
            description: "Hubungi langsung tim support",
            availability: "Senin-Jumat 9-17 WIB",
            action: "Hubungi Sekarang",
            color: "bg-purple-500"
        },
        {
            icon: DocumentTextIcon,
            title: "Documentation",
            description: "Panduan lengkap dan API docs",
            availability: "Selalu tersedia",
            action: "Buka Docs",
            color: "bg-orange-500"
        }
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
                                <QuestionMarkCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                    Help Center
                                </span>
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            How can we 
                            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                {" "}help
                            </span>
                            <br />you today?
                        </h1>
                        
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Temukan jawaban atas pertanyaan Anda, ikuti tutorial step-by-step, 
                            atau hubungi tim support kami yang siap membantu 24/7.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Cari bantuan, tutorial, atau FAQ..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Support Channels */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Need Immediate Help?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Pilih channel support yang paling sesuai dengan kebutuhan Anda
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {supportChannels.map((channel) => (
                            <motion.div
                                key={channel.title}
                                variants={itemVariants}
                                whileHover={{ y: -4 }}
                                className="group"
                            >
                                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                                    <CardHeader className="pb-4">
                                        <div className="flex justify-center mb-4">
                                            <div className={`p-3 ${channel.color} rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                                                <channel.icon className="h-6 w-6 text-white" />
                                            </div>
                                        </div>
                                        <CardTitle className="text-lg">{channel.title}</CardTitle>
                                        <CardDescription>{channel.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-center mb-4 text-sm text-muted-foreground">
                                            <ClockIcon className="h-4 w-4 mr-1" />
                                            {channel.availability}
                                        </div>
                                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                            {channel.action}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Categories Section */}
            {!searchQuery && (
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="container mx-auto max-w-7xl">
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Browse by Category
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Temukan bantuan berdasarkan topik yang Anda butuhkan
                            </p>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {HELP_CATEGORIES.map((category) => (
                                <motion.div
                                    key={category.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -2 }}
                                    className="cursor-pointer"
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                                        <CardHeader className="text-center">
                                            <div className="text-3xl mb-2">{category.icon}</div>
                                            <CardTitle className="text-lg">{category.name}</CardTitle>
                                        </CardHeader>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Content Tabs */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-12">
                        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                            <button
                                onClick={() => setActiveTab("faq")}
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                    activeTab === "faq"
                                        ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                }`}
                            >
                                Frequently Asked Questions
                            </button>
                            <button
                                onClick={() => setActiveTab("articles")}
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                    activeTab === "articles"
                                        ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                }`}
                            >
                                Help Articles
                            </button>
                        </div>
                    </div>

                    {/* FAQ Tab */}
                    {activeTab === "faq" && (
                        <motion.div
                            key="faq"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {searchQuery ? `Hasil pencarian "${searchQuery}"` : "Frequently Asked Questions"}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {filteredFAQ.length} pertanyaan ditemukan
                                </p>
                            </div>

                            {filteredFAQ.length > 0 ? (
                                <div className="space-y-4 max-w-4xl mx-auto">
                                    {filteredFAQ.map((faq, index) => (
                                        <FAQItem
                                            key={faq.id}
                                            faq={faq}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Tidak ada FAQ ditemukan
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        Coba ubah kata kunci pencarian atau pilih kategori lain
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSearchQuery("")
                                            setSelectedCategory("all")
                                        }}
                                    >
                                        Reset Pencarian
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Articles Tab */}
                    {activeTab === "articles" && (
                        <motion.div
                            key="articles"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Help Articles
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {filteredArticles.length} artikel tersedia
                                </p>
                            </div>

                            {filteredArticles.length > 0 ? (
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {filteredArticles.map((article) => (
                                        <motion.div
                                            key={article.id}
                                            variants={itemVariants}
                                            whileHover={{ y: -4 }}
                                        >
                                            <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                                                <CardHeader>
                                                    <CardTitle className="line-clamp-2 text-lg">
                                                        {article.title}
                                                    </CardTitle>
                                                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                                                        <span>{article.readTime} min read</span>
                                                        <span>Updated {new Date(article.lastUpdated).toLocaleDateString()}</span>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {article.tags.map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <Button variant="outline" className="w-full">
                                                        Baca Artikel
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="text-6xl mb-4">📚</div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Tidak ada artikel ditemukan
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Coba ubah kata kunci pencarian
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Masih butuh bantuan?
                        </h2>
                        <p className="text-green-100 mb-8 text-lg">
                            Tim support kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi 
                            kami kapan saja.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="secondary" size="lg">
                                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                                Live Chat
                            </Button>
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600">
                                <EnvelopeIcon className="h-5 w-5 mr-2" />
                                Email Support
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
