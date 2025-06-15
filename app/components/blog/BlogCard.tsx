import { Link } from "react-router"
import { motion } from "framer-motion"
import { CalendarIcon, ClockIcon, UserIcon, TagIcon } from "@heroicons/react/24/outline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { Button } from "~/components/ui/Button"
import type { BlogPost } from "~/data/BlogData"
import { formatDate } from "~/lib/utils"

interface BlogCardProps {
    post: BlogPost
    featured?: boolean
    index?: number
}

export function BlogCard({ post, featured = false, index = 0 }: BlogCardProps) {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.1
            }
        }
    }

    const imageVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.05 }
    }

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={featured ? "col-span-full" : ""}
        >
            <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-900 shadow-lg">
                {/* Featured Badge */}
                {post.featured && (
                    <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                            ⭐ Featured
                        </span>
                    </div>
                )}

                {/* Image */}
                <div className="relative overflow-hidden">
                    <motion.div
                        variants={imageVariants}
                        className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900"
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-6xl opacity-20">📝</div>
                        </div>
                    </motion.div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 backdrop-blur-sm">
                            {post.category}
                        </span>
                    </div>
                </div>

                <CardHeader className="pb-3">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center space-x-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{formatDate(new Date(post.publishedAt))}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <ClockIcon className="h-4 w-4" />
                            <span>{post.readTime} min read</span>
                        </div>
                    </div>

                    <CardTitle className={`line-clamp-2 group-hover:text-primary transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
                        {post.title}
                    </CardTitle>
                    
                    <CardDescription className={`line-clamp-3 ${featured ? 'text-base' : 'text-sm'}`}>
                        {post.excerpt}
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                    {/* Author Info */}
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                <UserIcon className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {post.author.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {post.author.role}
                            </p>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                            >
                                <TagIcon className="h-3 w-3 mr-1" />
                                {tag}
                            </span>
                        ))}
                        {post.tags.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                +{post.tags.length - 3} more
                            </span>
                        )}
                    </div>

                    {/* Read More Button */}
                    <Link to={`/blog/${post.slug}`}>
                        <Button 
                            variant="outline" 
                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                        >
                            Baca Selengkapnya
                            <motion.span
                                className="ml-2"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ 
                                    duration: 1.5, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                →
                            </motion.span>
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </motion.div>
    )
}
