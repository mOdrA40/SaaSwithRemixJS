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
import { EyeIcon, EyeSlashIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { signInSchema, type SignInInput } from "~/lib/validations"
import { COMPANY_INFO } from "~/data/constants"

// Type for action data
type ActionData = {
    message?: string
    errors?: Record<string, string[]>
}

export const meta: MetaFunction = () => {
    return [
        { title: `Masuk - ${COMPANY_INFO.name}` },
        { name: "description", content: "Masuk ke akun Anda untuk mengakses dashboard dan fitur lengkap" },
    ]
}

export async function loader() {
    // TODO: Check if user is already authenticated, redirect to dashboard
    return json({})
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    const result = signInSchema.safeParse(data)

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
        // TODO: Implement actual authentication logic
        // For now, simulate authentication
        await new Promise(resolve => setTimeout(resolve, 1000))

        // TODO: Verify user credentials
        // TODO: Check if user exists and password is correct
        // TODO: Set session/cookie

        // Simulate authentication failure for demo
        if (data.email === "test@error.com") {
            return json(
                {
                    message: "Email atau password salah. Silakan coba lagi.",
                    errors: {}
                },
                { status: 401 }
            )
        }

        return redirect("/dashboard")
    } catch (error) {
        return json(
            {
                message: "Terjadi kesalahan saat masuk. Silakan coba lagi.",
                errors: {}
            },
            { status: 500 }
        )
    }
}

export default function SignIn() {
    const actionData = useActionData() as ActionData | undefined
    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(false)

    const isSubmitting = navigation.state === "submitting"

    const {
        register,
        formState: { errors },
    } = useForm<SignInInput>({
        resolver: zodResolver(signInSchema),
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
                        Masuk ke Akun Anda
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Belum punya akun?{" "}
                        <Link
                            to="/auth/signup"
                            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                        >
                            Daftar di sini
                        </Link>
                    </p>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Selamat Datang Kembali</CardTitle>
                        <CardDescription>
                            Masukkan email dan password untuk mengakses dashboard Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form method="post" className="space-y-6">
                            {actionData?.message && (
                                <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                                    <div className="text-sm text-red-700 dark:text-red-400">
                                        {actionData.message}
                                    </div>
                                </div>
                            )}

                            <div>
                                <Input
                                    {...register("email")}
                                    type="email"
                                    label="Email"
                                    placeholder="nama@example.com"
                                    error={errors.email?.message}
                                    disabled={isSubmitting}
                                    autoComplete="email"
                                />
                            </div>

                            <div className="relative">
                                <Input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    label="Password"
                                    placeholder="Masukkan password Anda"
                                    error={errors.password?.message}
                                    disabled={isSubmitting}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                        Ingat saya
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <Link
                                        to="/auth/forgot-password"
                                        className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                                    >
                                        Lupa password?
                                    </Link>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                size="lg"
                                disabled={isSubmitting}
                                variant="gradient"
                            >
                                {isSubmitting ? (
                                    "Masuk..."
                                ) : (
                                    <>
                                        Masuk
                                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </Form>

                        {/* Demo credentials */}
                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-400 mb-2">
                                Demo Credentials:
                            </h4>
                            <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                                <p><strong>Email:</strong> demo@saaspro.com</p>
                                <p><strong>Password:</strong> password123</p>
                                <p className="mt-2 text-blue-600 dark:text-blue-400">
                                    Atau gunakan email apapun (kecuali test@error.com untuk testing error)
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Features */}
                <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Akses semua fitur premium setelah login
                    </p>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-blue-500">📊</span>
                            <span className="text-gray-600 dark:text-gray-300">Analytics Dashboard</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-purple-500">🚀</span>
                            <span className="text-gray-600 dark:text-gray-300">Advanced Features</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-green-500">👥</span>
                            <span className="text-gray-600 dark:text-gray-300">Team Collaboration</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 