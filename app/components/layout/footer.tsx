import { Link } from "react-router"
import { COMPANY_INFO } from "~/data/constants"

export function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        product: [
            { name: "Features", href: "/#features" },
            { name: "Pricing", href: "/#pricing" },
            { name: "API", href: "/docs/api" },
            { name: "Integrations", href: "/integrations" },
        ],
        company: [
            { name: "About", href: "/about" },
            { name: "Blog", href: "/blog" },
            { name: "Careers", href: "/careers" },
            { name: "Contact", href: "/contact" },
        ],
        support: [
            { name: "Help Center", href: "/help" },
            { name: "Documentation", href: "/docs" },
            { name: "Status", href: "/status" },
            { name: "Security", href: "/security" },
        ],
        legal: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Cookie Policy", href: "/cookies" },
            { name: "Refund Policy", href: "/refund" },
        ],
    }

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    {/* Company Info */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                                <span className="text-white font-bold">S</span>
                            </div>
                            <span className="font-bold text-xl">{COMPANY_INFO.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            {COMPANY_INFO.description}
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                to={COMPANY_INFO.social.twitter}
                                className="text-muted-foreground hover:text-primary transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="sr-only">Twitter</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </Link>
                            <Link
                                to={COMPANY_INFO.social.linkedin}
                                className="text-muted-foreground hover:text-primary transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <Link
                                to={COMPANY_INFO.social.github}
                                className="text-muted-foreground hover:text-primary transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="sr-only">GitHub</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Support</h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 border-t pt-8">
                    <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                        <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4">
                            <p className="text-sm text-muted-foreground">
                                © {currentYear} {COMPANY_INFO.name}. All rights reserved.
                            </p>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <span>Made with</span>
                                <span className="text-red-500">❤️</span>
                                <span>in {COMPANY_INFO.address}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{COMPANY_INFO.email}</span>
                            <span>•</span>
                            <span>{COMPANY_INFO.phone}</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
