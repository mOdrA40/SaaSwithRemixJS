export interface FAQItem {
    id: string
    question: string
    answer: string
    category: string
    helpful: number
    tags: string[]
}

export interface HelpArticle {
    id: string
    title: string
    content: string
    category: string
    lastUpdated: string
    readTime: number
    helpful: number
    tags: string[]
    slug: string
}

export const FAQ_ITEMS: FAQItem[] = [
    {
        id: "1",
        question: "Bagaimana cara memulai menggunakan SaaS Pro?",
        answer: "Untuk memulai menggunakan SaaS Pro, Anda dapat mendaftar akun gratis di halaman signup kami. Setelah verifikasi email, Anda akan langsung dapat mengakses dashboard dan mulai menggunakan fitur-fitur dasar. Kami juga menyediakan tutorial onboarding yang akan memandu Anda step-by-step.",
        category: "getting-started",
        helpful: 245,
        tags: ["signup", "onboarding", "tutorial"]
    },
    {
        id: "2",
        question: "Apakah ada trial gratis yang tersedia?",
        answer: "Ya! Kami menyediakan trial gratis selama 14 hari untuk semua paket berbayar. Selama periode trial, Anda dapat mengakses semua fitur premium tanpa batasan. Tidak diperlukan kartu kredit untuk memulai trial.",
        category: "account",
        helpful: 189,
        tags: ["trial", "gratis", "premium"]
    },
    {
        id: "3",
        question: "Bagaimana cara mengupgrade paket saya?",
        answer: "Anda dapat mengupgrade paket kapan saja melalui halaman Billing di dashboard Anda. Pilih paket yang diinginkan dan ikuti proses pembayaran. Upgrade akan berlaku segera dan Anda akan mendapat akses ke fitur-fitur tambahan.",
        category: "account",
        helpful: 156,
        tags: ["upgrade", "billing", "paket"]
    },
    {
        id: "4",
        question: "Apakah data saya aman di SaaS Pro?",
        answer: "Keamanan data adalah prioritas utama kami. Kami menggunakan enkripsi end-to-end, backup otomatis harian, dan infrastruktur cloud yang secure. Semua data disimpan di server yang memenuhi standar keamanan internasional seperti SOC 2 dan ISO 27001.",
        category: "account",
        helpful: 203,
        tags: ["keamanan", "data", "enkripsi"]
    },
    {
        id: "5",
        question: "Bagaimana cara mengintegrasikan SaaS Pro dengan aplikasi lain?",
        answer: "SaaS Pro menyediakan REST API yang comprehensive dan berbagai webhook untuk integrasi. Kami juga memiliki integrasi native dengan tools populer seperti Slack, Google Workspace, dan Zapier. Dokumentasi API lengkap tersedia di halaman developer kami.",
        category: "integrations",
        helpful: 178,
        tags: ["api", "integrasi", "webhook"]
    },
    {
        id: "6",
        question: "Bagaimana cara menambahkan anggota tim?",
        answer: "Untuk menambahkan anggota tim, masuk ke halaman Team Management di dashboard Anda. Klik 'Invite Member', masukkan email address, pilih role yang sesuai, dan kirim undangan. Anggota baru akan menerima email invitation untuk bergabung.",
        category: "features",
        helpful: 134,
        tags: ["tim", "invite", "member"]
    },
    {
        id: "7",
        question: "Apa yang harus dilakukan jika lupa password?",
        answer: "Jika lupa password, klik link 'Forgot Password' di halaman login. Masukkan email address Anda dan kami akan mengirimkan link reset password. Ikuti instruksi di email untuk membuat password baru.",
        category: "troubleshooting",
        helpful: 167,
        tags: ["password", "reset", "login"]
    },
    {
        id: "8",
        question: "Bagaimana cara mengekspor data saya?",
        answer: "Anda dapat mengekspor data melalui halaman Settings > Data Export. Pilih format yang diinginkan (CSV, JSON, atau PDF) dan data range. Export akan diproses dan link download akan dikirim ke email Anda.",
        category: "features",
        helpful: 145,
        tags: ["export", "data", "backup"]
    },
    {
        id: "9",
        question: "Apakah SaaS Pro memiliki mobile app?",
        answer: "Ya! Kami memiliki mobile app untuk iOS dan Android yang dapat didownload gratis di App Store dan Google Play Store. Mobile app menyediakan akses ke fitur-fitur utama dengan interface yang dioptimalkan untuk mobile.",
        category: "features",
        helpful: 198,
        tags: ["mobile", "app", "ios", "android"]
    },
    {
        id: "10",
        question: "Bagaimana cara menghubungi customer support?",
        answer: "Anda dapat menghubungi customer support melalui beberapa cara: live chat di dashboard (tersedia 24/7), email ke support@saaspro.com, atau melalui form contact di website kami. Untuk pelanggan Enterprise, tersedia juga dedicated phone support.",
        category: "troubleshooting",
        helpful: 223,
        tags: ["support", "contact", "help"]
    }
]

export const HELP_ARTICLES: HelpArticle[] = [
    {
        id: "1",
        title: "Panduan Lengkap Setup Awal SaaS Pro",
        content: `
# Panduan Lengkap Setup Awal SaaS Pro

Selamat datang di SaaS Pro! Panduan ini akan membantu Anda melakukan setup awal dan memaksimalkan penggunaan platform kami.

## Langkah 1: Verifikasi Akun

Setelah mendaftar, periksa email Anda untuk link verifikasi. Klik link tersebut untuk mengaktifkan akun.

## Langkah 2: Lengkapi Profil

1. Masuk ke dashboard
2. Klik pada avatar Anda di pojok kanan atas
3. Pilih "Profile Settings"
4. Lengkapi informasi profil dan perusahaan

## Langkah 3: Setup Tim

Jika Anda bekerja dalam tim:
1. Buka halaman "Team Management"
2. Klik "Invite Members"
3. Masukkan email anggota tim
4. Pilih role yang sesuai

## Langkah 4: Konfigurasi Integrasi

Hubungkan SaaS Pro dengan tools yang Anda gunakan:
- Google Workspace
- Slack
- Zapier
- Dan lainnya

## Tips untuk Memulai

- Ikuti tutorial interaktif di dashboard
- Jelajahi semua menu untuk familiar dengan fitur
- Hubungi support jika ada pertanyaan

Selamat menggunakan SaaS Pro!
        `,
        category: "getting-started",
        lastUpdated: "2024-01-15",
        readTime: 5,
        helpful: 312,
        tags: ["setup", "onboarding", "tutorial"],
        slug: "panduan-setup-awal"
    },
    {
        id: "2",
        title: "Cara Menggunakan API SaaS Pro",
        content: `
# Cara Menggunakan API SaaS Pro

API SaaS Pro memungkinkan Anda mengintegrasikan platform kami dengan aplikasi lain.

## Authentication

Semua API calls memerlukan API key yang dapat Anda dapatkan di halaman Settings > API Keys.

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.saaspro.com/v1/users
\`\`\`

## Endpoints Utama

### Users
- GET /v1/users - List semua users
- POST /v1/users - Create user baru
- GET /v1/users/{id} - Get user by ID

### Projects
- GET /v1/projects - List semua projects
- POST /v1/projects - Create project baru

## Rate Limiting

API kami memiliki rate limit:
- Free plan: 100 requests/hour
- Pro plan: 1000 requests/hour
- Enterprise: Unlimited

## Error Handling

API menggunakan standard HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 429: Rate Limit Exceeded

Untuk dokumentasi lengkap, kunjungi developer portal kami.
        `,
        category: "api",
        lastUpdated: "2024-01-12",
        readTime: 8,
        helpful: 267,
        tags: ["api", "integration", "developer"],
        slug: "cara-menggunakan-api"
    },
    {
        id: "3",
        title: "Troubleshooting Login Issues",
        content: `
# Troubleshooting Login Issues

Mengalami masalah saat login? Berikut solusi untuk masalah umum.

## Lupa Password

1. Klik "Forgot Password" di halaman login
2. Masukkan email address Anda
3. Cek email untuk link reset password
4. Ikuti instruksi untuk membuat password baru

## Account Terkunci

Jika account terkunci setelah beberapa kali login gagal:
- Tunggu 15 menit sebelum mencoba lagi
- Atau gunakan "Forgot Password" untuk reset

## Browser Issues

Jika mengalami masalah di browser:
1. Clear cache dan cookies
2. Disable browser extensions
3. Coba browser lain
4. Pastikan JavaScript enabled

## Two-Factor Authentication

Jika menggunakan 2FA dan tidak bisa akses:
1. Gunakan backup codes yang disimpan
2. Hubungi support untuk disable 2FA sementara

## Masih Bermasalah?

Jika masalah berlanjut, hubungi support dengan informasi:
- Browser dan versi yang digunakan
- Screenshot error message
- Langkah-langkah yang sudah dicoba

Tim support kami siap membantu 24/7!
        `,
        category: "troubleshooting",
        lastUpdated: "2024-01-10",
        readTime: 4,
        helpful: 189,
        tags: ["login", "troubleshooting", "password"],
        slug: "troubleshooting-login"
    }
]

export const getFAQByCategory = (category: string): FAQItem[] => {
    if (category === "all") return FAQ_ITEMS
    return FAQ_ITEMS.filter(item => item.category === category)
}

export const getArticleBySlug = (slug: string): HelpArticle | undefined => {
    return HELP_ARTICLES.find(article => article.slug === slug)
}

export const getArticlesByCategory = (category: string): HelpArticle[] => {
    if (category === "all") return HELP_ARTICLES
    return HELP_ARTICLES.filter(article => article.category === category)
}

export const searchFAQ = (query: string): FAQItem[] => {
    const lowercaseQuery = query.toLowerCase()
    return FAQ_ITEMS.filter(item => 
        item.question.toLowerCase().includes(lowercaseQuery) ||
        item.answer.toLowerCase().includes(lowercaseQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
}

export const searchArticles = (query: string): HelpArticle[] => {
    const lowercaseQuery = query.toLowerCase()
    return HELP_ARTICLES.filter(article => 
        article.title.toLowerCase().includes(lowercaseQuery) ||
        article.content.toLowerCase().includes(lowercaseQuery) ||
        article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
}
