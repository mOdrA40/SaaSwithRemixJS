export interface JobPosition {
    id: string
    title: string
    department: string
    type: string
    location: string
    remote: boolean
    salary: {
        min: number
        max: number
        currency: string
    }
    description: string
    requirements: string[]
    responsibilities: string[]
    benefits: string[]
    postedAt: string
    applicationDeadline: string
    featured: boolean
    slug: string
}

export const JOB_POSITIONS: JobPosition[] = [
    {
        id: "1",
        title: "Senior Full-Stack Developer",
        department: "engineering",
        type: "full-time",
        location: "Jakarta, Indonesia",
        remote: true,
        salary: {
            min: 25000000,
            max: 40000000,
            currency: "IDR"
        },
        description: "Kami mencari Senior Full-Stack Developer yang berpengalaman untuk bergabung dengan tim engineering kami. Anda akan bertanggung jawab mengembangkan dan memelihara platform SaaS Pro yang digunakan oleh ribuan pengguna.",
        requirements: [
            "Minimal 5 tahun pengalaman sebagai Full-Stack Developer",
            "Expertise dalam React, Node.js, dan TypeScript",
            "Pengalaman dengan database (PostgreSQL, MongoDB)",
            "Familiar dengan cloud platforms (AWS, GCP, Azure)",
            "Pengalaman dengan CI/CD dan DevOps practices",
            "Strong problem-solving skills dan attention to detail",
            "Kemampuan komunikasi yang baik dalam bahasa Indonesia dan Inggris"
        ],
        responsibilities: [
            "Mengembangkan fitur-fitur baru untuk platform SaaS Pro",
            "Memelihara dan mengoptimalkan kode existing",
            "Berkolaborasi dengan tim design dan product untuk implementasi UI/UX",
            "Melakukan code review dan mentoring junior developers",
            "Mengidentifikasi dan mengatasi performance bottlenecks",
            "Berkontribusi dalam architectural decisions",
            "Menulis dokumentasi teknis dan unit tests"
        ],
        benefits: [
            "Gaji kompetitif sesuai pengalaman",
            "Flexible working hours dan remote work options",
            "Asuransi kesehatan premium untuk karyawan dan keluarga",
            "Annual learning budget untuk courses dan conferences",
            "MacBook Pro dan setup kerja yang lengkap",
            "Unlimited PTO policy",
            "Stock options program",
            "Team building dan company retreats"
        ],
        postedAt: "2024-01-15",
        applicationDeadline: "2024-02-15",
        featured: true,
        slug: "senior-full-stack-developer"
    },
    {
        id: "2",
        title: "UI/UX Designer",
        department: "design",
        type: "full-time",
        location: "Jakarta, Indonesia",
        remote: true,
        salary: {
            min: 18000000,
            max: 30000000,
            currency: "IDR"
        },
        description: "Bergabunglah dengan tim design kami untuk menciptakan pengalaman pengguna yang luar biasa. Anda akan bekerja closely dengan product managers dan engineers untuk mendesign interface yang intuitive dan beautiful.",
        requirements: [
            "Minimal 3 tahun pengalaman sebagai UI/UX Designer",
            "Portfolio yang strong dengan case studies",
            "Expertise dalam Figma, Adobe Creative Suite",
            "Pemahaman yang baik tentang design systems",
            "Pengalaman dengan user research dan usability testing",
            "Knowledge tentang HTML/CSS adalah plus",
            "Passion untuk creating user-centered designs"
        ],
        responsibilities: [
            "Mendesign user interfaces untuk web dan mobile applications",
            "Melakukan user research dan usability testing",
            "Membuat dan memelihara design system",
            "Berkolaborasi dengan product team untuk define requirements",
            "Create wireframes, prototypes, dan high-fidelity mockups",
            "Ensure consistency across all touchpoints",
            "Stay updated dengan latest design trends dan best practices"
        ],
        benefits: [
            "Gaji kompetitif dengan performance bonus",
            "Creative freedom dan ownership atas projects",
            "Latest design tools dan software licenses",
            "Conference dan workshop attendance",
            "Flexible working arrangements",
            "Health insurance dan wellness programs",
            "Career development opportunities",
            "Collaborative dan inspiring work environment"
        ],
        postedAt: "2024-01-12",
        applicationDeadline: "2024-02-12",
        featured: true,
        slug: "ui-ux-designer"
    },
    {
        id: "3",
        title: "Product Marketing Manager",
        department: "marketing",
        type: "full-time",
        location: "Jakarta, Indonesia",
        remote: false,
        salary: {
            min: 20000000,
            max: 35000000,
            currency: "IDR"
        },
        description: "Kami mencari Product Marketing Manager yang akan bertanggung jawab untuk go-to-market strategy dan positioning SaaS Pro di pasar Indonesia dan Asia Tenggara.",
        requirements: [
            "Minimal 4 tahun pengalaman dalam product marketing atau related field",
            "Strong analytical skills dan data-driven mindset",
            "Pengalaman dengan B2B SaaS products",
            "Excellent written dan verbal communication skills",
            "Familiar dengan marketing automation tools",
            "Bachelor's degree dalam Marketing, Business, atau related field",
            "Fluent dalam bahasa Indonesia dan Inggris"
        ],
        responsibilities: [
            "Develop dan execute go-to-market strategies",
            "Create compelling product messaging dan positioning",
            "Collaborate dengan sales team untuk enable mereka dengan materials",
            "Conduct market research dan competitive analysis",
            "Manage product launches dan feature announcements",
            "Create content untuk marketing campaigns",
            "Track dan analyze marketing performance metrics"
        ],
        benefits: [
            "Competitive salary dengan commission structure",
            "Opportunity untuk shape product direction",
            "Access ke latest marketing tools dan platforms",
            "Professional development budget",
            "Health insurance dan life insurance",
            "Flexible PTO policy",
            "Team events dan company outings",
            "Growth opportunities dalam expanding company"
        ],
        postedAt: "2024-01-10",
        applicationDeadline: "2024-02-10",
        featured: false,
        slug: "product-marketing-manager"
    },
    {
        id: "4",
        title: "DevOps Engineer",
        department: "engineering",
        type: "full-time",
        location: "Jakarta, Indonesia",
        remote: true,
        salary: {
            min: 22000000,
            max: 38000000,
            currency: "IDR"
        },
        description: "Join our infrastructure team sebagai DevOps Engineer. Anda akan bertanggung jawab untuk maintaining dan scaling infrastructure yang mendukung platform SaaS Pro.",
        requirements: [
            "Minimal 3 tahun pengalaman sebagai DevOps Engineer",
            "Strong knowledge dalam AWS atau GCP",
            "Experience dengan containerization (Docker, Kubernetes)",
            "Familiar dengan Infrastructure as Code (Terraform, CloudFormation)",
            "Knowledge dalam CI/CD pipelines",
            "Experience dengan monitoring tools (Prometheus, Grafana)",
            "Scripting skills (Python, Bash, atau similar)"
        ],
        responsibilities: [
            "Manage dan optimize cloud infrastructure",
            "Implement dan maintain CI/CD pipelines",
            "Monitor system performance dan reliability",
            "Automate deployment processes",
            "Ensure security best practices",
            "Troubleshoot infrastructure issues",
            "Collaborate dengan development teams"
        ],
        benefits: [
            "Competitive salary dengan annual reviews",
            "Cutting-edge technology stack",
            "Certification reimbursement program",
            "Flexible working hours",
            "Health dan dental insurance",
            "Retirement savings plan",
            "Professional development opportunities",
            "Supportive team environment"
        ],
        postedAt: "2024-01-08",
        applicationDeadline: "2024-02-08",
        featured: false,
        slug: "devops-engineer"
    },
    {
        id: "5",
        title: "Customer Success Manager",
        department: "sales",
        type: "full-time",
        location: "Jakarta, Indonesia",
        remote: false,
        salary: {
            min: 15000000,
            max: 25000000,
            currency: "IDR"
        },
        description: "Sebagai Customer Success Manager, Anda akan memastikan customer satisfaction dan retention dengan memberikan support dan guidance kepada clients kami.",
        requirements: [
            "Minimal 2 tahun pengalaman dalam customer success atau account management",
            "Strong interpersonal dan communication skills",
            "Experience dengan SaaS products",
            "Analytical mindset dengan attention to detail",
            "Ability untuk work independently dan manage multiple accounts",
            "Bachelor's degree preferred",
            "Fluent dalam bahasa Indonesia dan Inggris"
        ],
        responsibilities: [
            "Onboard new customers dan ensure successful adoption",
            "Build strong relationships dengan key stakeholders",
            "Monitor customer health scores dan usage metrics",
            "Identify upselling dan cross-selling opportunities",
            "Resolve customer issues dan escalations",
            "Provide product training dan best practices",
            "Gather customer feedback untuk product improvements"
        ],
        benefits: [
            "Base salary plus performance incentives",
            "Direct impact pada customer satisfaction",
            "Comprehensive training program",
            "Career advancement opportunities",
            "Health insurance coverage",
            "Paid time off dan holidays",
            "Team building activities",
            "Modern office environment"
        ],
        postedAt: "2024-01-05",
        applicationDeadline: "2024-02-05",
        featured: false,
        slug: "customer-success-manager"
    }
]

export const FEATURED_JOBS = JOB_POSITIONS.filter(job => job.featured)

export const getJobBySlug = (slug: string): JobPosition | undefined => {
    return JOB_POSITIONS.find(job => job.slug === slug)
}

export const getJobsByDepartment = (department: string): JobPosition[] => {
    if (department === "all") return JOB_POSITIONS
    return JOB_POSITIONS.filter(job => job.department === department)
}

export const getJobsByType = (type: string): JobPosition[] => {
    if (type === "all") return JOB_POSITIONS
    return JOB_POSITIONS.filter(job => job.type === type)
}


