import { Link } from "react-router"
import { motion } from "framer-motion"
import { 
    MapPinIcon, 
    ClockIcon, 
    CurrencyDollarIcon, 
    BuildingOfficeIcon,
    CalendarIcon,
    StarIcon
} from "@heroicons/react/24/outline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { Button } from "~/components/ui/Button"
import type { JobPosition } from "~/data/CareersData"
import { formatSalary, formatDate } from "~/lib/utils"

interface JobCardProps {
    job: JobPosition
    index?: number
}

export function JobCard({ job, index = 0 }: JobCardProps) {
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

    const getDepartmentColor = (department: string) => {
        const colors = {
            engineering: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            design: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
            marketing: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            sales: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
            hr: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
        }
        return colors[department as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }

    const getTypeColor = (type: string) => {
        const colors = {
            "full-time": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
            "part-time": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
            contract: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
            internship: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200"
        }
        return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4 }}
            className="h-full"
        >
            <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-900 shadow-lg">
                {/* Featured Badge */}
                {job.featured && (
                    <div className="absolute top-4 right-4 z-10">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                            <StarIcon className="h-3 w-3 mr-1" />
                            Featured
                        </span>
                    </div>
                )}

                <CardHeader className="pb-4">
                    {/* Department & Type Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getDepartmentColor(job.department)}`}>
                            <BuildingOfficeIcon className="h-3 w-3 mr-1" />
                            {job.department.charAt(0).toUpperCase() + job.department.slice(1)}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(job.type)}`}>
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {job.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                        {job.remote && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
                                🌐 Remote OK
                            </span>
                        )}
                    </div>

                    <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                        {job.title}
                    </CardTitle>
                    
                    <CardDescription className="line-clamp-3 text-sm">
                        {job.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                    {/* Job Details */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-muted-foreground">
                            <MapPinIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>{job.location}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                            <CurrencyDollarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>{formatSalary(job.salary)} per bulan</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>Posted {formatDate(new Date(job.postedAt))}</span>
                        </div>
                    </div>

                    {/* Key Requirements Preview */}
                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                            Key Requirements:
                        </h4>
                        <ul className="space-y-1">
                            {job.requirements.slice(0, 3).map((req, index) => (
                                <li key={index} className="text-xs text-muted-foreground flex items-start">
                                    <span className="text-primary mr-2 mt-1">•</span>
                                    <span className="line-clamp-1">{req}</span>
                                </li>
                            ))}
                            {job.requirements.length > 3 && (
                                <li className="text-xs text-muted-foreground">
                                    <span className="text-primary mr-2">•</span>
                                    <span>+{job.requirements.length - 3} more requirements</span>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Benefits Preview */}
                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                            Benefits:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                            {job.benefits.slice(0, 3).map((benefit, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                >
                                    {benefit.length > 20 ? `${benefit.substring(0, 20)}...` : benefit}
                                </span>
                            ))}
                            {job.benefits.length > 3 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                    +{job.benefits.length - 3}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Application Deadline */}
                    <div className="mb-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <div className="flex items-center text-sm">
                            <CalendarIcon className="h-4 w-4 mr-2 text-yellow-600 dark:text-yellow-400" />
                            <span className="text-yellow-800 dark:text-yellow-200">
                                Application deadline: {formatDate(new Date(job.applicationDeadline))}
                            </span>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <div className="flex gap-2">
                        <Link to={`/careers/${job.slug}`} className="flex-1">
                            <Button 
                                variant="outline" 
                                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                            >
                                View Details
                            </Button>
                        </Link>
                        <Button 
                            variant="gradient"
                            className="flex-1"
                            onClick={() => {
                                // Handle apply action
                                window.open(`mailto:careers@saaspro.com?subject=Application for ${job.title}`, '_blank')
                            }}
                        >
                            Apply Now
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
