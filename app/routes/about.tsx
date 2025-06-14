import type { MetaFunction } from "react-router"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import {
    SparklesIcon,
    RocketLaunchIcon,
    ShieldCheckIcon,
    HeartIcon,
    LightBulbIcon,
    UsersIcon,
    GlobeAltIcon,
    TrophyIcon,
    StarIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    BuildingOfficeIcon,
    CalendarDaysIcon,
    ChartBarIcon
} from "@heroicons/react/24/outline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { Button } from "~/components/ui/Button"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `About Us - ${COMPANY_INFO.name}` },
        { name: "description", content: "Discover our story, mission, and the passionate team behind the innovation. Learn how we're transforming businesses worldwide." },
        
        // Open Graph / Social Media
        { property: "og:title", content: `About Us - ${COMPANY_INFO.name}` },
        { property: "og:description", content: "Discover our story, mission, and the passionate team behind the innovation." },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/logo-light.png" },
        
        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `About Us - ${COMPANY_INFO.name}` },
        { name: "twitter:description", content: "Discover our story, mission, and the passionate team behind the innovation." },
        { name: "twitter:image", content: "/logo-light.png" },
    ]
}

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
}

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

// Counter hook for animated numbers
const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    
    useEffect(() => {
        if (!isVisible) return
        
        let startTime: number
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            setCount(Math.floor(progress * end))
            
            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }
        
        requestAnimationFrame(animate)
    }, [end, duration, isVisible])
    
    return { count, setIsVisible }
}

// Company data
const companyStats = [
    { label: "Happy Clients", value: 10000, suffix: "+" },
    { label: "Projects Completed", value: 25000, suffix: "+" },
    { label: "Team Members", value: 150, suffix: "+" },
    { label: "Countries Served", value: 45, suffix: "+" }
]

const coreValues = [
    {
        icon: LightBulbIcon,
        title: "Innovation First",
        description: "We constantly push boundaries and embrace cutting-edge technologies to deliver solutions that shape the future.",
        color: "from-yellow-400 to-orange-500"
    },
    {
        icon: ShieldCheckIcon,
        title: "Trust & Security",
        description: "Your data and privacy are our top priority. We implement enterprise-grade security in everything we build.",
        color: "from-green-400 to-blue-500"
    },
    {
        icon: HeartIcon,
        title: "Customer Obsession",
        description: "Every decision we make is driven by our commitment to delivering exceptional value to our customers.",
        color: "from-pink-400 to-red-500"
    },
    {
        icon: UsersIcon,
        title: "Collaborative Spirit",
        description: "We believe in the power of teamwork and foster an inclusive environment where everyone can thrive.",
        color: "from-purple-400 to-indigo-500"
    }
]

const timeline = [
    {
        year: "2020",
        title: "The Beginning",
        description: "Founded with a vision to democratize enterprise-grade software for businesses of all sizes.",
        icon: RocketLaunchIcon
    },
    {
        year: "2021",
        title: "First Milestone",
        description: "Reached 1,000 customers and launched our flagship platform with AI-powered analytics.",
        icon: TrophyIcon
    },
    {
        year: "2022",
        title: "Global Expansion",
        description: "Expanded to 20+ countries and established partnerships with leading technology providers.",
        icon: GlobeAltIcon
    },
    {
        year: "2023",
        title: "Innovation Breakthrough",
        description: "Introduced revolutionary automation features that reduced customer workload by 70%.",
        icon: SparklesIcon
    },
    {
        year: "2024",
        title: "Industry Leadership",
        description: "Recognized as the fastest-growing SaaS platform with 10,000+ active customers worldwide.",
        icon: StarIcon
    }
]

const teamMembers = [
    {
        name: "Sarah Johnson",
        role: "Chief Executive Officer",
        bio: "Visionary leader with 15+ years in enterprise software. Former VP at Microsoft.",
        image: null,
        linkedin: "#"
    },
    {
        name: "Michael Chen",
        role: "Chief Technology Officer",
        bio: "Tech innovator and AI expert. Previously led engineering teams at Google and Tesla.",
        image: null,
        linkedin: "#"
    },
    {
        name: "Emily Rodriguez",
        role: "Chief Design Officer",
        bio: "Award-winning designer passionate about creating intuitive user experiences.",
        image: null,
        linkedin: "#"
    },
    {
        name: "David Kim",
        role: "Chief Operating Officer",
        bio: "Operations excellence expert with proven track record in scaling global businesses.",
        image: null,
        linkedin: "#"
    }
]

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })
    
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4])

    return (
        <div ref={containerRef} className="min-h-screen bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <motion.div 
                    style={{ y, opacity }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"
                />
                
                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
                    />
                    <motion.div
                        animate={{
                            y: [0, 30, 0],
                            rotate: [0, -5, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                        className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-15 blur-2xl"
                    />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800 mb-8">
                            <SparklesIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                            <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                                Crafting the Future of Business Technology
                            </span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
                    >
                        <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                            We Are
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Innovators
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
                    >
                        Driven by passion, guided by innovation, and committed to transforming 
                        how businesses operate in the digital age. We don't just build software—
                        <span className="font-semibold text-gray-900 dark:text-white"> we craft experiences that inspire.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Button size="xl" variant="gradient" className="px-8 py-4 text-lg">
                            <RocketLaunchIcon className="h-6 w-6 mr-2" />
                            Join Our Journey
                        </Button>
                        <Button size="xl" variant="outline" className="px-8 py-4 text-lg">
                            Meet Our Team
                            <ArrowRightIcon className="h-5 w-5 ml-2" />
                        </Button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* Company Stats Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {companyStats.map((stat, index) => {
                            const { count, setIsVisible } = useCounter(stat.value)
                            const ref = useRef<HTMLDivElement>(null)
                            const isInView = useInView(ref, { once: true })

                            useEffect(() => {
                                if (isInView) setIsVisible(true)
                            }, [isInView, setIsVisible])

                            return (
                                <motion.div
                                    key={stat.label}
                                    ref={ref}
                                    variants={fadeInUp}
                                    className="text-center"
                                >
                                    <div className="relative">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={isInView ? { scale: 1 } : { scale: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
                                        >
                                            {count.toLocaleString()}{stat.suffix}
                                        </motion.div>
                                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                                            {stat.label}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-24 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            From a bold vision to industry leadership, discover the milestones that shaped our path to innovation.
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full hidden lg:block" />

                        <div className="space-y-16">
                            {timeline.map((item, index) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                                >
                                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                                        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                                            <CardHeader>
                                                <div className="flex items-center space-x-4">
                                                    <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                                                        <item.icon className="h-6 w-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                                                            {item.year}
                                                        </CardTitle>
                                                        <CardDescription className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                                            {item.title}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Timeline Dot */}
                                    <div className="hidden lg:block relative z-10">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
                                        />
                                    </div>

                                    <div className="flex-1" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Values</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            The principles that guide every decision we make and every solution we create.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {coreValues.map((value) => (
                            <motion.div
                                key={value.title}
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden group">
                                    <div className={`h-2 bg-gradient-to-r ${value.color}`} />
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center space-x-4">
                                            <motion.div
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.6 }}
                                                className={`p-4 rounded-xl bg-gradient-to-r ${value.color} shadow-lg`}
                                            >
                                                <value.icon className="h-8 w-8 text-white" />
                                            </motion.div>
                                            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {value.title}
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Leadership Team Section */}
            <section className="py-24 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Meet Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Leaders</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Visionary leaders with decades of experience, united by a shared passion for innovation and excellence.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {teamMembers.map((member) => (
                            <motion.div
                                key={member.name}
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="group"
                            >
                                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden">
                                    <CardHeader className="text-center pb-4">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative mx-auto mb-6"
                                        >
                                            {member.image ? (
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-24 h-24 rounded-full object-cover border-4 border-gradient-to-r from-blue-500 to-purple-500"
                                                />
                                            ) : (
                                                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg">
                                                    <span className="text-white text-2xl font-bold">
                                                        {member.name.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                            )}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileHover={{ scale: 1 }}
                                                className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-3 border-white dark:border-gray-800 flex items-center justify-center"
                                            >
                                                <CheckCircleIcon className="h-4 w-4 text-white" />
                                            </motion.div>
                                        </motion.div>

                                        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {member.name}
                                        </CardTitle>
                                        <CardDescription className="text-blue-600 dark:text-blue-400 font-semibold">
                                            {member.role}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                                            {member.bio}
                                        </p>
                                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                                            Connect on LinkedIn
                                            <ArrowRightIcon className="h-4 w-4 ml-1" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center text-white"
                    >
                        <h2 className="text-4xl lg:text-6xl font-bold mb-8">
                            Our <span className="text-yellow-300">Mission</span>
                        </h2>
                        <p className="text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto mb-12 text-blue-100">
                            To empower every business with intelligent, scalable, and secure technology solutions
                            that unlock their full potential and drive sustainable growth in the digital economy.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <GlobeAltIcon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Global Impact</h3>
                                <p className="text-blue-100">Transforming businesses across 45+ countries worldwide</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <LightBulbIcon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                                <p className="text-blue-100">Pioneering next-generation solutions with AI and automation</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <HeartIcon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Customer Success</h3>
                                <p className="text-blue-100">Dedicated to delivering exceptional value and support</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-24 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Ready to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Transform</span> Your Business?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
                            Join thousands of forward-thinking companies who trust us to power their digital transformation journey.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button size="xl" variant="gradient" className="px-8 py-4 text-lg">
                                <RocketLaunchIcon className="h-6 w-6 mr-2" />
                                Start Your Journey
                            </Button>
                            <Button size="xl" variant="outline" className="px-8 py-4 text-lg">
                                <CalendarDaysIcon className="h-6 w-6 mr-2" />
                                Schedule a Demo
                            </Button>
                        </div>

                        <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                Free 14-day trial
                            </div>
                            <div className="flex items-center">
                                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                No credit card required
                            </div>
                            <div className="flex items-center">
                                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                24/7 support
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
