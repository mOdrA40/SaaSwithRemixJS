import type { MetaFunction } from "react-router"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { 
    MagnifyingGlassIcon, 
    FunnelIcon,
    SparklesIcon,
    NewspaperIcon,
    RssIcon
} from "@heroicons/react/24/outline"
import { Button } from "~/components/ui/Button"
import { Input } from "~/components/ui/Input"
import { BlogCard } from "~/components/blog/BlogCard"
import { FEATURED_POSTS, getPostsByCategory } from "~/data/BlogData"
import { BLOG_CATEGORIES, COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `Blog - ${COMPANY_INFO.name}` },
        { name: "description", content: "Temukan artikel terbaru tentang teknologi, tutorial, dan update produk dari tim SaaS Pro" },
        { name: "keywords", content: "blog, artikel, teknologi, tutorial, SaaS, tips, update produk" },
        { property: "og:title", content: `Blog - ${COMPANY_INFO.name}` },
        { property: "og:description", content: "Temukan artikel terbaru tentang teknologi, tutorial, dan update produk dari tim SaaS Pro" },
        { property: "og:type", content: "website" },
    ]
}

export default function Blog() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [showFilters, setShowFilters] = useState(false)

    // Filter posts based on search and category
    const filteredPosts = useMemo(() => {
        let posts = getPostsByCategory(selectedCategory)
        
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            posts = posts.filter(post => 
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.author.name.toLowerCase().includes(query) ||
                post.tags.some(tag => tag.toLowerCase().includes(query))
            )
        }
        
        return posts
    }, [searchQuery, selectedCategory])

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
                                <NewspaperIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                    Blog SaaS Pro
                                </span>
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Insights & 
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {" "}Stories
                            </span>
                        </h1>
                        
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Temukan artikel terbaru tentang teknologi, tutorial mendalam, dan update produk 
                            dari tim ahli SaaS Pro. Tingkatkan pengetahuan Anda dengan konten berkualitas tinggi.
                        </p>

                        {/* Newsletter Subscription */}
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Masukkan email Anda"
                                className="flex-1"
                            />
                            <Button variant="gradient" className="sm:w-auto">
                                <RssIcon className="h-4 w-4 mr-2" />
                                Subscribe
                            </Button>
                        </div>
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
                                placeholder="Cari artikel..."
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

                        {/* Category Filters */}
                        <div className={`flex flex-wrap gap-2 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
                            {BLOG_CATEGORIES.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={selectedCategory === category.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category.id)}
                                    className="transition-all duration-200"
                                >
                                    {category.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Posts Section */}
            {selectedCategory === "all" && !searchQuery && (
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="container mx-auto max-w-7xl">
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-center mb-12"
                        >
                            <div className="flex items-center justify-center mb-4">
                                <SparklesIcon className="h-6 w-6 text-yellow-500 mr-2" />
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Featured Articles
                                </h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                                Artikel pilihan yang wajib Anda baca
                            </p>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        >
                            {FEATURED_POSTS.map((post, index) => (
                                <BlogCard
                                    key={post.id}
                                    post={post}
                                    featured={true}
                                    index={index}
                                />
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* All Posts Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {searchQuery ? `Hasil pencarian "${searchQuery}"` : 
                             selectedCategory !== "all" ? 
                             `Artikel ${BLOG_CATEGORIES.find(c => c.id === selectedCategory)?.name}` : 
                             "Semua Artikel"}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            {filteredPosts.length} artikel ditemukan
                        </p>
                    </motion.div>

                    {filteredPosts.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredPosts.map((post, index) => (
                                <BlogCard
                                    key={post.id}
                                    post={post}
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
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Tidak ada artikel ditemukan
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Coba ubah kata kunci pencarian atau filter kategori
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchQuery("")
                                    setSelectedCategory("all")
                                }}
                            >
                                Reset Filter
                            </Button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ingin berkontribusi?
                        </h2>
                        <p className="text-blue-100 mb-8 text-lg">
                            Bagikan pengetahuan Anda dengan komunitas SaaS Pro. 
                            Kami selalu mencari penulis berbakat untuk bergabung dengan tim kami.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="secondary" size="lg">
                                Kirim Artikel
                            </Button>
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                                Pelajari Guidelines
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
