import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDownIcon, HandThumbUpIcon, TagIcon } from "@heroicons/react/24/outline"
import { HandThumbUpIcon as HandThumbUpSolidIcon } from "@heroicons/react/24/solid"
import { Button } from "~/components/ui/Button"
import type { FAQItem as FAQItemType } from "~/data/HelpData"

interface FAQItemProps {
    faq: FAQItemType
    index?: number
}

export function FAQItem({ faq, index = 0 }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isHelpful, setIsHelpful] = useState(false)
    const [helpfulCount, setHelpfulCount] = useState(faq.helpful)

    const itemVariants = {
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

    const contentVariants = {
        hidden: {
            opacity: 0,
            height: 0
        },
        visible: {
            opacity: 1,
            height: "auto"
        }
    }

    const chevronVariants = {
        closed: { rotate: 0 },
        open: { rotate: 180 }
    }

    const handleHelpful = () => {
        if (!isHelpful) {
            setIsHelpful(true)
            setHelpfulCount(prev => prev + 1)
        }
    }

    const getCategoryIcon = (category: string) => {
        const icons = {
            "getting-started": "🚀",
            "account": "👤",
            "features": "⚡",
            "integrations": "🔗",
            "troubleshooting": "🔧",
            "api": "📚"
        }
        return icons[category as keyof typeof icons] || "❓"
    }

    const getCategoryColor = (category: string) => {
        const colors = {
            "getting-started": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            "account": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            "features": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
            "integrations": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
            "troubleshooting": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
            "api": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
        }
        return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
            {/* Question Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
                <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                        {/* Category Badge */}
                        <div className="flex items-center mb-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(faq.category)}`}>
                                <span className="mr-1">{getCategoryIcon(faq.category)}</span>
                                {faq.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                        </div>
                        
                        {/* Question */}
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                            {faq.question}
                        </h3>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-2">
                            {faq.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                >
                                    <TagIcon className="h-3 w-3 mr-1" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    {/* Chevron Icon */}
                    <motion.div
                        variants={chevronVariants}
                        animate={isOpen ? "open" : "closed"}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </motion.div>
                </div>
            </button>

            {/* Answer Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-4">
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                {/* Answer */}
                                <div className="prose prose-sm max-w-none dark:prose-invert">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>

                                {/* Helpful Section */}
                                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Was this helpful?
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={handleHelpful}
                                                className={`transition-colors ${
                                                    isHelpful 
                                                        ? "text-green-600 dark:text-green-400" 
                                                        : "text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                                                }`}
                                                disabled={isHelpful}
                                            >
                                                {isHelpful ? (
                                                    <HandThumbUpSolidIcon className="h-4 w-4 mr-1" />
                                                ) : (
                                                    <HandThumbUpIcon className="h-4 w-4 mr-1" />
                                                )}
                                                Yes
                                            </Button>
                                        </div>
                                        
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <HandThumbUpIcon className="h-4 w-4 mr-1" />
                                            <span>{helpfulCount} people found this helpful</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
