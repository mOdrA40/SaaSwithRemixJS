import { motion } from "framer-motion"
import { PolicySection as PolicySectionType, PolicySubsection } from "~/data/PolicyData"

interface PolicySectionProps {
    section: PolicySectionType
    index: number
}



const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94] as const
        }
    }
}

function PolicySubsectionComponent({ subsection }: { subsection: PolicySubsection }) {
    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="ml-6 mt-6"
        >
            <h4 
                id={subsection.id}
                className="text-lg font-semibold text-gray-900 dark:text-white mb-3 scroll-mt-24"
            >
                {subsection.title}
            </h4>
            <div className="space-y-3">
                {subsection.content.map((paragraph, paragraphIndex) => (
                    <div key={paragraphIndex}>
                        {paragraph.includes("•") || paragraph.includes("-") ? (
                            // Handle bullet points
                            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                                {paragraph.split(/[•-]/).filter(item => item.trim()).map((item, itemIndex) => (
                                    <li key={itemIndex} className="ml-4">
                                        {item.trim()}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            // Handle regular paragraphs
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {paragraph}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export function PolicySection({ section, index }: PolicySectionProps) {
    return (
        <motion.section
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mb-12"
        >
            <h3 
                id={section.id}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6 scroll-mt-24 border-b border-gray-200 dark:border-gray-700 pb-3"
            >
                {index + 1}. {section.title}
            </h3>
            
            <div className="space-y-4">
                {section.content.map((paragraph, paragraphIndex) => (
                    <div key={paragraphIndex}>
                        {paragraph.includes("•") || paragraph.includes("-") ? (
                            // Handle bullet points
                            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                                {paragraph.split(/[•-]/).filter(item => item.trim()).map((item, itemIndex) => (
                                    <li key={itemIndex} className="ml-4">
                                        {item.trim()}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            // Handle regular paragraphs
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                {paragraph}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* Subsections */}
            {section.subsections && section.subsections.length > 0 && (
                <div className="mt-8 space-y-6">
                    {section.subsections.map((subsection) => (
                        <PolicySubsectionComponent
                            key={subsection.id}
                            subsection={subsection}
                        />
                    ))}
                </div>
            )}
        </motion.section>
    )
}

// Table of Contents Component

export function TableOfContents({ sections }: { sections: PolicySectionType[] }) {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const offset = 100 // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8 print:hidden"
        >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Daftar Isi
            </h3>
            <nav className="space-y-2">
                {sections.map((section, index) => (
                    <div key={section.id}>
                        <button
                            onClick={() => scrollToSection(section.id)}
                            className="block w-full text-left text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 px-2 rounded hover:bg-white dark:hover:bg-gray-700"
                        >
                            {index + 1}. {section.title}
                        </button>
                        {section.subsections && section.subsections.length > 0 && (
                            <div className="ml-4 mt-1 space-y-1">
                                {section.subsections.map((subsection) => (
                                    <button
                                        key={subsection.id}
                                        onClick={() => scrollToSection(subsection.id)}
                                        className="block w-full text-left text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 px-2 rounded hover:bg-white dark:hover:bg-gray-700"
                                    >
                                        • {subsection.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </motion.div>
    )
}

// Policy Header Component
interface PolicyHeaderProps {
    title: string
    lastUpdated: string
    effectiveDate: string
    introduction: string
}

export function PolicyHeader({ title, lastUpdated, effectiveDate, introduction }: PolicyHeaderProps) {
    const handlePrint = () => {
        window.print()
    }

    return (
        <>
            {/* Print Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    body {
                        font-family: 'Times New Roman', serif;
                        font-size: 12pt;
                        line-height: 1.5;
                        color: #000;
                        background: #fff;
                    }

                    .print\\:hidden {
                        display: none !important;
                    }

                    h1 {
                        font-size: 24pt;
                        font-weight: bold;
                        margin-bottom: 20pt;
                        page-break-after: avoid;
                    }

                    h2, h3 {
                        font-size: 16pt;
                        font-weight: bold;
                        margin-top: 20pt;
                        margin-bottom: 10pt;
                        page-break-after: avoid;
                    }

                    h4 {
                        font-size: 14pt;
                        font-weight: bold;
                        margin-top: 15pt;
                        margin-bottom: 8pt;
                        page-break-after: avoid;
                    }

                    p {
                        margin-bottom: 10pt;
                        text-align: justify;
                        orphans: 2;
                        widows: 2;
                    }

                    ul, ol {
                        margin-bottom: 10pt;
                        padding-left: 20pt;
                    }

                    li {
                        margin-bottom: 5pt;
                    }

                    .page-break {
                        page-break-before: always;
                    }

                    .no-break {
                        page-break-inside: avoid;
                    }

                    @page {
                        margin: 2cm;
                        size: A4;
                    }
                }
                `
            }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 print:mb-8"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 print:text-3xl print:mb-4">
                    {title}
                </h1>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-300 print:text-black print:text-xs print:mb-4">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 print:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Terakhir diperbarui: {lastUpdated}
                    </div>
                    <div className="hidden sm:block text-gray-400 print:hidden">•</div>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 print:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Berlaku sejak: {effectiveDate}
                    </div>
                </div>

                <div className="max-w-3xl mx-auto mb-8 print:mb-6">
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed print:text-black print:text-base">
                        {introduction}
                    </p>
                </div>

                <div className="flex justify-center print:hidden">
                    <button
                        onClick={handlePrint}
                        className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Cetak Halaman
                    </button>
                </div>
            </motion.div>
        </>
    )
}
