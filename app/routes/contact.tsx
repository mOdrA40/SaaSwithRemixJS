import type { ActionFunctionArgs, MetaFunction } from "react-router"
import { Form, useActionData, useNavigation } from "react-router"
import { useState, useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"

// Helper functions for responses
const json = (data: unknown, init?: ResponseInit) => {
    return new Response(JSON.stringify(data), {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...init?.headers,
        },
    })
}

import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ClockIcon,
    PaperAirplaneIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    EyeIcon,
    UserIcon
} from "@heroicons/react/24/outline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { Button } from "~/components/ui/Button"
import { Input } from "~/components/ui/Input"
import { contactSchema, type ContactInput } from "~/lib/validations"
import { COMPANY_INFO } from "~/data/constants"

// Type for action data
type ActionData = {
    message?: string
    success?: boolean
    errors?: Record<string, string[]>
}

export const meta: MetaFunction = () => {
    return [
        { title: `Contact Us - ${COMPANY_INFO.name}` },
        { name: "description", content: "Hubungi tim kami untuk pertanyaan, dukungan, atau diskusi bisnis" },
    ]
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()

    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
    }

    // Simple validation
    if (!data.name || !data.email || !data.subject || !data.message) {
        return json(
            {
                message: "Mohon isi semua field yang diperlukan",
                errors: {}
            },
            { status: 400 }
        )
    }

    try {
        // TODO: Send email or save to database
        await new Promise(resolve => setTimeout(resolve, 1000))

        return json(
            {
                success: true,
                message: "Terima kasih! Pesan Anda telah terkirim. Tim kami akan merespons dalam 24 jam."
            }
        )
    } catch (error) {
        return json(
            {
                message: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
                errors: {}
            },
            { status: 500 }
        )
    }
}

export default function Contact() {
    const actionData = useActionData() as ActionData | undefined
    const navigation = useNavigation()
    const [showSuccess, setShowSuccess] = useState(false)

    const isSubmitting = navigation.state === "submitting"

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
        watch,
        control,
        reset,
        setValue,
        getValues
    } = useForm<ContactInput>({
        resolver: zodResolver(contactSchema),
        mode: "onChange",
        defaultValues: {
            priority: "medium",
            category: "general"
        }
    })

    // Watch form values for dynamic features
    const watchedMessage = useWatch({ control, name: "message" })
    const watchedCategory = useWatch({ control, name: "category" })

    // Character count for message
    const messageLength = watchedMessage?.length || 0
    const maxMessageLength = 1000

    // Success animation effect
    useEffect(() => {
        if (actionData?.success) {
            setShowSuccess(true)
            reset()
            setTimeout(() => setShowSuccess(false), 5000)
        }
    }, [actionData?.success, reset])

    const contactInfo = [
        {
            icon: EnvelopeIcon,
            title: "Email",
            value: COMPANY_INFO.email,
            description: "Kirim email untuk pertanyaan umum"
        },
        {
            icon: PhoneIcon,
            title: "Phone",
            value: COMPANY_INFO.phone,
            description: "Hubungi kami untuk dukungan langsung"
        },
        {
            icon: MapPinIcon,
            title: "Address",
            value: COMPANY_INFO.address,
            description: "Kantor pusat kami"
        },
        {
            icon: ClockIcon,
            title: "Business Hours",
            value: "Senin - Jumat, 9:00 - 18:00 WIB",
            description: "Waktu operasional tim support"
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                        Hubungi Kami
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Tim kami siap membantu Anda dengan pertanyaan, dukungan teknis, atau diskusi tentang kebutuhan bisnis Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Kontak</CardTitle>
                                <CardDescription>
                                    Berbagai cara untuk menghubungi tim kami
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {contactInfo.map((info) => (
                                    <div key={info.title} className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                                <info.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                {info.title}
                                            </h3>
                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1">
                                                {info.value}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {info.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Kirim Pesan</CardTitle>
                                <CardDescription>
                                    Isi form di bawah dan kami akan merespons sesegera mungkin
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Success Animation */}
                                <AnimatePresence>
                                    {showSuccess && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8, y: -20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                            className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                                                <div>
                                                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                                                        Pesan Terkirim!
                                                    </h3>
                                                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                                                        Terima kasih! Tim kami akan merespons dalam 24 jam.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <Form method="post" className="space-y-6">
                                    {actionData?.message && !showSuccess && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`rounded-md p-4 ${('success' in actionData) && actionData.success
                                                ? "bg-green-50 dark:bg-green-900/20"
                                                : "bg-red-50 dark:bg-red-900/20"
                                                }`}>
                                            <div className={`text-sm flex items-center space-x-2 ${('success' in actionData) && actionData.success
                                                ? "text-green-700 dark:text-green-400"
                                                : "text-red-700 dark:text-red-400"
                                                }`}>
                                                {('success' in actionData) && actionData.success ? (
                                                    <CheckCircleIcon className="h-5 w-5" />
                                                ) : (
                                                    <ExclamationTriangleIcon className="h-5 w-5" />
                                                )}
                                                <span>{actionData.message}</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Category Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            Kategori Pertanyaan
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {[
                                                { value: "general", label: "Umum", icon: UserIcon },
                                                { value: "support", label: "Support", icon: ExclamationTriangleIcon },
                                                { value: "sales", label: "Sales", icon: EnvelopeIcon },
                                                { value: "partnership", label: "Partnership", icon: EyeIcon }
                                            ].map((category) => (
                                                <motion.label
                                                    key={category.value}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`relative flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                                        watchedCategory === category.value
                                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                                            : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                                                    }`}
                                                >
                                                    <input
                                                        {...register("category")}
                                                        type="radio"
                                                        value={category.value}
                                                        className="sr-only"
                                                    />
                                                    <div className="flex flex-col items-center space-y-1">
                                                        <category.icon className={`h-5 w-5 ${
                                                            watchedCategory === category.value
                                                                ? "text-blue-600 dark:text-blue-400"
                                                                : "text-gray-400"
                                                        }`} />
                                                        <span className={`text-xs font-medium ${
                                                            watchedCategory === category.value
                                                                ? "text-blue-700 dark:text-blue-300"
                                                                : "text-gray-600 dark:text-gray-400"
                                                        }`}>
                                                            {category.label}
                                                        </span>
                                                    </div>
                                                </motion.label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            {...register("name")}
                                            label="Nama Lengkap"
                                            placeholder="John Doe"
                                            disabled={isSubmitting}
                                            error={errors.name?.message}
                                        />
                                        <Input
                                            {...register("email")}
                                            type="email"
                                            label="Email"
                                            placeholder="john@example.com"
                                            disabled={isSubmitting}
                                            error={errors.email?.message}
                                        />
                                    </div>

                                    <Input
                                        {...register("subject")}
                                        label="Subjek"
                                        placeholder="Tentang apa yang ingin Anda diskusikan?"
                                        disabled={isSubmitting}
                                        error={errors.subject?.message}
                                    />

                                    {/* Priority Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            Prioritas
                                        </label>
                                        <div className="flex space-x-4">
                                            {[
                                                { value: "low", label: "Rendah", color: "green" },
                                                { value: "medium", label: "Sedang", color: "yellow" },
                                                { value: "high", label: "Tinggi", color: "red" }
                                            ].map((priority) => (
                                                <label
                                                    key={priority.value}
                                                    className="flex items-center space-x-2 cursor-pointer"
                                                >
                                                    <input
                                                        {...register("priority")}
                                                        type="radio"
                                                        value={priority.value}
                                                        className={`h-4 w-4 text-${priority.color}-600 focus:ring-${priority.color}-500 border-gray-300`}
                                                    />
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                                        {priority.label}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Pesan
                                            </label>
                                            <span className={`text-xs ${
                                                messageLength > maxMessageLength * 0.9
                                                    ? "text-red-500"
                                                    : messageLength > maxMessageLength * 0.7
                                                    ? "text-yellow-500"
                                                    : "text-gray-400"
                                            }`}>
                                                {messageLength}/{maxMessageLength}
                                            </span>
                                        </div>
                                        <textarea
                                            {...register("message")}
                                            id="message"
                                            rows={6}
                                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors ${
                                                errors.message
                                                    ? "border-red-300 dark:border-red-600 focus:ring-red-500"
                                                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                            }`}
                                            placeholder="Jelaskan detail pertanyaan atau kebutuhan Anda..."
                                            disabled={isSubmitting}
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                                {errors.message.message}
                                            </p>
                                        )}
                                    </div>

                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <Button
                                            type="submit"
                                            size="lg"
                                            variant="gradient"
                                            className="w-full"
                                            disabled={isSubmitting || !isValid}
                                        >
                                            <div className="flex items-center justify-center space-x-2">
                                                <PaperAirplaneIcon className="h-5 w-5" />
                                                <span>
                                                    {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                                                </span>
                                            </div>
                                        </Button>
                                    </motion.div>

                                    {/* Form Status Indicator */}
                                    <div className="text-center">
                                        <div className={`inline-flex items-center space-x-2 text-xs ${
                                            isValid && isDirty
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-gray-400"
                                        }`}>
                                            <div className={`w-2 h-2 rounded-full ${
                                                isValid && isDirty ? "bg-green-500" : "bg-gray-300"
                                            }`} />
                                            <span>
                                                {isValid && isDirty
                                                    ? "Form siap dikirim"
                                                    : "Lengkapi form untuk melanjutkan"
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
} 