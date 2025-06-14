import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  CheckIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { PLANS, FEATURES, COMPANY_INFO } from "~/data/constants";
import { formatCurrency } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: `${COMPANY_INFO.name} - ${COMPANY_INFO.tagline}` },
    { name: "description", content: COMPANY_INFO.description },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 lg:py-40 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 mb-8">
                <SparklesIcon className="mr-2 h-4 w-4" />
                Transformasi Digital untuk Semua
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
                Platform SaaS{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Modern
                </span>{" "}
                untuk Bisnis Anda
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Kelola bisnis Anda dengan lebih efisien menggunakan platform all-in-one yang powerful,
                aman, dan mudah digunakan. Dapatkan insights mendalam dan otomatisasi cerdas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Link to="/auth/signup">
                <Button size="xl" variant="gradient" className="px-8">
                  <RocketLaunchIcon className="mr-2 h-5 w-5" />
                  Mulai Gratis Sekarang
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="xl" variant="outline" className="px-8">
                  Lihat Demo
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              ✨ Gratis untuk 14 hari • Tidak perlu kartu kredit • Setup dalam 2 menit
            </motion.div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]">
            <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-blue-500 to-purple-600 opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Fitur Lengkap untuk Kebutuhan Bisnis
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Dapatkan semua tools yang Anda butuhkan dalam satu platform yang terintegrasi
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Harga yang Transparan
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={plan.popular ? "lg:scale-105" : ""}
              >
                <Card className={`relative h-full ${plan.popular
                  ? "border-blue-500 shadow-xl ring-2 ring-blue-500"
                  : "hover:shadow-lg"
                  } transition-all duration-300`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Paling Populer
                      </span>
                    </div>
                  )}

                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(plan.monthlyPrice)}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">/bulan</span>
                      <div className="text-sm text-gray-500 mt-1">
                        atau {formatCurrency(plan.yearlyPrice)}/tahun (hemat 17%)
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-6 py-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="px-6 pb-6">
                    <Link to="/auth/signup" className="w-full">
                      <Button
                        className="w-full"
                        variant={plan.popular ? "gradient" : "outline"}
                        size="lg"
                      >
                        {plan.buttonText}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Siap untuk Mulai?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Bergabung dengan ribuan bisnis yang sudah mempercayai platform kami
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth/signup">
                <Button size="xl" variant="secondary" className="px-8">
                  <ShieldCheckIcon className="mr-2 h-5 w-5" />
                  Mulai Gratis 14 Hari
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="xl" variant="ghost" className="px-8 text-white hover:bg-white/10">
                  Hubungi Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
