import type { MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData, Link } from "@remix-run/react"
import {
    CreditCardIcon,
    DocumentTextIcon,
    StarIcon,
    CheckIcon,
    ExclamationTriangleIcon
} from "@heroicons/react/24/outline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { PLANS, COMPANY_INFO } from "~/data/constants"
import { formatCurrency, formatDate } from "~/lib/utils"

export const meta: MetaFunction = () => {
    return [
        { title: `Billing & Subscription - ${COMPANY_INFO.name}` },
        { name: "description", content: "Kelola subscription, billing, dan payment history Anda" },
    ]
}

export async function loader() {
    // TODO: Get actual subscription and billing data from database
    const mockSubscription = {
        id: "sub_123",
        plan: "pro",
        status: "active",
        currentPeriodStart: new Date("2024-01-01"),
        currentPeriodEnd: new Date("2024-02-01"),
        cancelAtPeriodEnd: false,
        nextBillingAmount: 29,
    }

    const mockPaymentHistory = [
        {
            id: "inv_001",
            date: new Date("2024-01-01"),
            amount: 29,
            status: "paid",
            description: "Pro Plan - Monthly",
            invoiceUrl: "#"
        },
        {
            id: "inv_002",
            date: new Date("2023-12-01"),
            amount: 29,
            status: "paid",
            description: "Pro Plan - Monthly",
            invoiceUrl: "#"
        },
        {
            id: "inv_003",
            date: new Date("2023-11-01"),
            amount: 29,
            status: "paid",
            description: "Pro Plan - Monthly",
            invoiceUrl: "#"
        }
    ]

    const mockPaymentMethod = {
        id: "pm_123",
        brand: "visa",
        last4: "4242",
        expMonth: 12,
        expYear: 2025
    }

    return json({
        subscription: mockSubscription,
        paymentHistory: mockPaymentHistory,
        paymentMethod: mockPaymentMethod
    })
}

export default function Billing() {
    const { subscription, paymentHistory, paymentMethod } = useLoaderData<typeof loader>()

    const currentPlan = PLANS.find(plan => plan.id === subscription.plan)

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
            case "paid":
                return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20"
            case "cancelled":
                return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20"
            case "past_due":
                return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20"
            default:
                return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20"
        }
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Billing & Subscription
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Kelola subscription dan payment method Anda
                    </p>
                </div>
            </div>

            {/* Alert for cancellation */}
            {subscription.cancelAtPeriodEnd && (
                <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                                Subscription akan berakhir
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                <p>
                                    Subscription Anda akan berakhir pada {formatDate(subscription.currentPeriodEnd)}.
                                    Anda masih dapat menggunakan semua fitur hingga tanggal tersebut.
                                </p>
                            </div>
                            <div className="mt-4">
                                <div className="-mx-2 -my-1.5 flex">
                                    <Button variant="outline" size="sm" className="bg-yellow-50 text-yellow-800 hover:bg-yellow-100">
                                        Reactivate Subscription
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Current Subscription */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <StarIcon className="h-5 w-5 mr-2 text-yellow-500" />
                        Current Subscription
                    </CardTitle>
                    <CardDescription>
                        Detail subscription aktif Anda
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Plan</div>
                            <div className="mt-1 flex items-center">
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {currentPlan?.name}
                                </span>
                                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                                    {subscription.status}
                                </span>
                            </div>
                        </div>

                        <div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Cost</div>
                            <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                {formatCurrency(subscription.nextBillingAmount)}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Billing</div>
                            <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                {formatDate(subscription.currentPeriodEnd)}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</div>
                            <div className="mt-1">
                                {subscription.cancelAtPeriodEnd ? (
                                    <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                                        <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                                        <span className="text-sm">Cancelling at period end</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center text-green-600 dark:text-green-400">
                                        <CheckIcon className="h-4 w-4 mr-1" />
                                        <span className="text-sm">Auto-renewing</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Button variant="outline" size="sm">
                            Change Plan
                        </Button>
                        <Button variant="outline" size="sm">
                            Update Payment Method
                        </Button>
                        {!subscription.cancelAtPeriodEnd ? (
                            <Button variant="destructive" size="sm">
                                Cancel Subscription
                            </Button>
                        ) : (
                            <Button variant="default" size="sm">
                                Reactivate Subscription
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <CreditCardIcon className="h-5 w-5 mr-2" />
                        Payment Method
                    </CardTitle>
                    <CardDescription>
                        Metode pembayaran yang aktif
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                                    <span className="text-white text-xs font-bold uppercase">
                                        {paymentMethod.brand}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    •••• •••• •••• {paymentMethod.last4}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Expires {paymentMethod.expMonth}/{paymentMethod.expYear}
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">
                            Update
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Available Plans */}
            <Card>
                <CardHeader>
                    <CardTitle>Available Plans</CardTitle>
                    <CardDescription>
                        Upgrade atau downgrade subscription Anda
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {PLANS.map((plan) => (
                            <div
                                key={plan.id}
                                className={`border rounded-lg p-6 relative ${plan.id === subscription.plan
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-gray-200 dark:border-gray-700"
                                    } ${plan.popular ? "ring-2 ring-blue-500" : ""
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                {plan.id === subscription.plan && (
                                    <div className="absolute -top-3 right-4">
                                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                            Current Plan
                                        </span>
                                    </div>
                                )}

                                <div className="text-center">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {plan.name}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        {plan.description}
                                    </p>
                                    <div className="mt-4">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                            {formatCurrency(plan.monthlyPrice)}
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-400">/month</span>
                                    </div>
                                </div>

                                <ul className="mt-6 space-y-3">
                                    {plan.features.slice(0, 4).map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <CheckIcon className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6">
                                    {plan.id === subscription.plan ? (
                                        <Button variant="outline" className="w-full" disabled>
                                            Current Plan
                                        </Button>
                                    ) : (
                                        <Button
                                            variant={plan.popular ? "gradient" : "outline"}
                                            className="w-full"
                                        >
                                            {plan.monthlyPrice > (currentPlan?.monthlyPrice || 0) ? "Upgrade" : "Downgrade"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <DocumentTextIcon className="h-5 w-5 mr-2" />
                        Payment History
                    </CardTitle>
                    <CardDescription>
                        Riwayat pembayaran dan invoice
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Invoice
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {paymentHistory.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {formatDate(payment.date)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {payment.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {formatCurrency(payment.amount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <Link
                                                to={payment.invoiceUrl}
                                                className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                                            >
                                                Download
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 