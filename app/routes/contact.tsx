import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Form, useActionData, useNavigation } from "@remix-run/react"
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ClockIcon
} from "@heroicons/react/24/outline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { COMPANY_INFO } from "~/data/constants"

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
    const actionData = useActionData<typeof action>()
    const navigation = useNavigation()

    const isSubmitting = navigation.state === "submitting"

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
                                <Form method="post" className="space-y-6">
                                    {actionData?.message && (
                                        <div className={`rounded-md p-4 ${('success' in actionData) && actionData.success
                                            ? "bg-green-50 dark:bg-green-900/20"
                                            : "bg-red-50 dark:bg-red-900/20"
                                            }`}>
                                            <div className={`text-sm ${('success' in actionData) && actionData.success
                                                ? "text-green-700 dark:text-green-400"
                                                : "text-red-700 dark:text-red-400"
                                                }`}>
                                                {actionData.message}
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            name="name"
                                            label="Nama Lengkap"
                                            placeholder="John Doe"
                                            disabled={isSubmitting}
                                            required
                                        />
                                        <Input
                                            name="email"
                                            type="email"
                                            label="Email"
                                            placeholder="john@example.com"
                                            disabled={isSubmitting}
                                            required
                                        />
                                    </div>

                                    <Input
                                        name="subject"
                                        label="Subjek"
                                        placeholder="Tentang apa yang ingin Anda diskusikan?"
                                        disabled={isSubmitting}
                                        required
                                    />

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Pesan
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={6}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                            placeholder="Jelaskan detail pertanyaan atau kebutuhan Anda..."
                                            disabled={isSubmitting}
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        variant="gradient"
                                        className="w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                                    </Button>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
} 