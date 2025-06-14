import type { ActionFunctionArgs, MetaFunction } from "react-router"
import { Form, Link, useActionData, useNavigation } from "react-router"

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

const redirect = (url: string, init?: ResponseInit) => {
    return new Response(null, {
        ...init,
        status: 302,
        headers: {
            Location: url,
            ...init?.headers,
        },
    })
}


import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { Button } from "~/components/ui/Button"
import { Input } from "~/components/ui/Input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { signUpSchema, type SignUpInput } from "~/lib/validations"
import { COMPANY_INFO } from "~/data/constants"

// Type for action data
type ActionData = {
    message?: string
    errors?: Record<string, string[]>
}

export const meta: MetaFunction = () => {
    return [
        { title: `Daftar - ${COMPANY_INFO.name}` },
        { name: "description", content: "Daftar akun baru untuk menggunakan platform SaaS modern kami" },
    ]
}

export async function loader() {
    // TODO: Check if user is already authenticated, redirect to dashboard
    return json({})
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()

    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    }

    const result = signUpSchema.safeParse(data)

    if (!result.success) {
        return json(
            {
                errors: result.error.flatten().fieldErrors,
                message: "Mohon periksa kembali data yang Anda masukkan"
            },
            { status: 400 }
        )
    }

    try {
        // TODO: Implement actual user registration logic
        // For now, simulate successful registration
        await new Promise(resolve => setTimeout(resolve, 1000))

        // TODO: Create user in database
        // TODO: Send verification email
        // TODO: Set session/cookie

        return redirect("/dashboard?welcome=true")
    } catch (error) {
        return json(
            {
                message: "Terjadi kesalahan saat mendaftar. Silakan coba lagi.",
                errors: {}
            },
            { status: 500 }
        )
    }
}

export default function SignUp() {
    const actionData = useActionData() as ActionData | undefined
    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const isSubmitting = navigation.state === "submitting"

    const {
        register,
        formState: { errors },
    } = useForm<SignUpInput>({
        resolver: zodResolver(signUpSchema),
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center space-x-2 mb-8">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                            <span className="text-white font-bold">S</span>
                        </div>
                        <span className="font-bold text-xl">{COMPANY_INFO.name}</span>
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Buat Akun Baru
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Sudah punya akun?{" "}
                        <Link
                            to="/auth/signin"
                            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                        >
                            Masuk di sini
                        </Link>
                    </p>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Akun</CardTitle>
                        <CardDescription>
                            Isi informasi di bawah untuk membuat akun baru
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form method="post" className="space-y-6">
                            {actionData?.message && (
                                <div className="rounded-md bg-red-50 p-4">
                                    <div className="text-sm text-red-700">
                                        {actionData.message}
                                    </div>
                                </div>
                            )}

                            <div>
                                <Input
                                    {...register("name")}
                                    label="Nama Lengkap"
                                    placeholder="Masukkan nama lengkap Anda"
                                    error={errors.name?.message || actionData?.errors?.name?.[0]}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <Input
                                    {...register("email")}
                                    type="email"
                                    label="Email"
                                    placeholder="nama@example.com"
                                    error={errors.email?.message || actionData?.errors?.email?.[0]}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="relative">
                                <Input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    label="Password"
                                    placeholder="Minimal 8 karakter"
                                    error={errors.password?.message || actionData?.errors?.password?.[0]}
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            <div className="relative">
                                <Input
                                    {...register("confirmPassword")}
                                    type={showConfirmPassword ? "text" : "password"}
                                    label="Konfirmasi Password"
                                    placeholder="Ulangi password Anda"
                                    error={errors.confirmPassword?.message || actionData?.errors?.confirmPassword?.[0]}
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Dengan mendaftar, Anda menyetujui{" "}
                                <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                                    Syarat & Ketentuan
                                </Link>{" "}
                                dan{" "}
                                <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                                    Kebijakan Privasi
                                </Link>{" "}
                                kami.
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                size="lg"
                                disabled={isSubmitting}
                                variant="gradient"
                            >
                                {isSubmitting ? "Mendaftar..." : "Daftar Sekarang"}
                            </Button>
                        </Form>
                    </CardContent>
                </Card>

                {/* Features */}
                <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Mengapa memilih {COMPANY_INFO.name}?
                    </p>
                    <div className="grid grid-cols-1 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-300">
                                ✨ Gratis untuk 14 hari pertama
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-300">
                                🔒 Data Anda aman dan terenkripsi
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-300">
                                🚀 Setup hanya dalam 2 menit
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 