export interface BlogPost {
    id: string
    title: string
    excerpt: string
    content: string
    author: {
        name: string
        avatar: string
        role: string
    }
    category: string
    tags: string[]
    publishedAt: string
    readTime: number
    featured: boolean
    image: string
    slug: string
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: "1",
        title: "Membangun SaaS Modern dengan Remix dan TypeScript",
        excerpt: "Panduan lengkap untuk membangun aplikasi SaaS yang scalable menggunakan teknologi terdepan seperti Remix.js dan TypeScript.",
        content: `
# Membangun SaaS Modern dengan Remix dan TypeScript

Dalam era digital saat ini, membangun aplikasi SaaS yang robust dan scalable menjadi kebutuhan utama bagi banyak perusahaan. Artikel ini akan membahas bagaimana memanfaatkan Remix.js dan TypeScript untuk menciptakan platform SaaS yang modern.

## Mengapa Remix.js?

Remix.js menawarkan pendekatan yang unik dalam pengembangan web application dengan fokus pada:
- Server-side rendering yang optimal
- Progressive enhancement
- Nested routing yang powerful
- Data loading yang efisien

## Setup Project

Untuk memulai project SaaS dengan Remix, ikuti langkah-langkah berikut:

\`\`\`bash
npx create-remix@latest my-saas-app
cd my-saas-app
npm install
\`\`\`

## Struktur Folder yang Optimal

Organisasi folder yang baik sangat penting untuk maintainability:

\`\`\`
app/
├── components/
│   ├── ui/
│   ├── layout/
│   └── features/
├── routes/
├── lib/
└── data/
\`\`\`

## Best Practices

1. **Type Safety**: Gunakan TypeScript secara konsisten
2. **Component Composition**: Buat komponen yang reusable
3. **Performance**: Implementasikan lazy loading dan code splitting
4. **Testing**: Tulis unit test dan integration test

Dengan mengikuti panduan ini, Anda dapat membangun SaaS application yang professional dan scalable.
        `,
        author: {
            name: "Ahmad Rizki",
            avatar: "/images/authors/ahmad.jpg",
            role: "Senior Full-Stack Developer"
        },
        category: "tech",
        tags: ["Remix", "TypeScript", "SaaS", "Web Development"],
        publishedAt: "2024-01-15",
        readTime: 8,
        featured: true,
        image: "/images/blog/remix-typescript.jpg",
        slug: "membangun-saas-modern-dengan-remix-typescript"
    },
    {
        id: "2",
        title: "10 Fitur Terbaru SaaS Pro yang Wajib Anda Coba",
        excerpt: "Temukan fitur-fitur terbaru yang telah kami rilis untuk meningkatkan produktivitas dan efisiensi bisnis Anda.",
        content: `
# 10 Fitur Terbaru SaaS Pro yang Wajib Anda Coba

Kami dengan bangga memperkenalkan 10 fitur terbaru yang akan mengubah cara Anda mengelola bisnis.

## 1. Dashboard Analytics Real-time

Dashboard baru dengan visualisasi data yang lebih interaktif dan real-time updates.

## 2. AI-Powered Insights

Analisis cerdas menggunakan machine learning untuk memberikan rekomendasi bisnis.

## 3. Advanced Team Collaboration

Tools kolaborasi yang lebih powerful dengan real-time editing dan commenting.

## 4. Mobile App Redesign

Aplikasi mobile yang completely redesigned dengan UX yang lebih intuitive.

## 5. API v2.0

API yang lebih robust dengan better documentation dan rate limiting.

Dan masih banyak lagi fitur menarik lainnya!
        `,
        author: {
            name: "Sarah Putri",
            avatar: "/images/authors/sarah.jpg",
            role: "Product Manager"
        },
        category: "product",
        tags: ["Product Updates", "Features", "SaaS Pro"],
        publishedAt: "2024-01-10",
        readTime: 5,
        featured: true,
        image: "/images/blog/new-features.jpg",
        slug: "10-fitur-terbaru-saas-pro"
    },
    {
        id: "3",
        title: "Tutorial: Mengintegrasikan API SaaS Pro dengan React",
        excerpt: "Pelajari cara mengintegrasikan API SaaS Pro ke dalam aplikasi React Anda dengan mudah dan efisien.",
        content: `
# Tutorial: Mengintegrasikan API SaaS Pro dengan React

Dalam tutorial ini, kita akan belajar cara mengintegrasikan API SaaS Pro ke dalam aplikasi React.

## Prerequisites

- Node.js 18+
- React 18+
- API Key SaaS Pro

## Setup

\`\`\`bash
npm install @saaspro/sdk axios
\`\`\`

## Konfigurasi

\`\`\`javascript
import { SaasProClient } from '@saaspro/sdk';

const client = new SaasProClient({
  apiKey: process.env.REACT_APP_SAASPRO_API_KEY,
  baseURL: 'https://api.saaspro.com/v1'
});
\`\`\`

## Implementasi

Mari kita buat hook custom untuk menggunakan API:

\`\`\`javascript
import { useState, useEffect } from 'react';

export function useSaasProData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await client.getData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading };
}
\`\`\`

Dengan setup ini, Anda dapat dengan mudah mengintegrasikan SaaS Pro ke dalam aplikasi React Anda.
        `,
        author: {
            name: "Budi Santoso",
            avatar: "/images/authors/budi.jpg",
            role: "Developer Advocate"
        },
        category: "tutorial",
        tags: ["Tutorial", "React", "API", "Integration"],
        publishedAt: "2024-01-05",
        readTime: 12,
        featured: false,
        image: "/images/blog/react-integration.jpg",
        slug: "tutorial-integrasi-api-saas-pro-react"
    },
    {
        id: "4",
        title: "Roadmap SaaS Pro 2024: Apa yang Akan Datang",
        excerpt: "Simak rencana pengembangan SaaS Pro untuk tahun 2024 dan fitur-fitur menarik yang sedang kami kembangkan.",
        content: `
# Roadmap SaaS Pro 2024: Apa yang Akan Datang

Tahun 2024 akan menjadi tahun yang exciting untuk SaaS Pro. Berikut roadmap lengkap kami.

## Q1 2024
- Mobile App v2.0
- Advanced Analytics
- Team Collaboration Tools

## Q2 2024
- AI Integration
- Workflow Automation
- Third-party Integrations

## Q3 2024
- Enterprise Features
- Advanced Security
- Custom Branding

## Q4 2024
- Machine Learning Insights
- Advanced Reporting
- Global Expansion

Stay tuned untuk updates selanjutnya!
        `,
        author: {
            name: "Lisa Chen",
            avatar: "/images/authors/lisa.jpg",
            role: "CEO & Founder"
        },
        category: "company",
        tags: ["Roadmap", "Company", "Future", "Planning"],
        publishedAt: "2024-01-01",
        readTime: 6,
        featured: false,
        image: "/images/blog/roadmap-2024.jpg",
        slug: "roadmap-saas-pro-2024"
    }
]

export const FEATURED_POSTS = BLOG_POSTS.filter(post => post.featured)

export const getPostBySlug = (slug: string): BlogPost | undefined => {
    return BLOG_POSTS.find(post => post.slug === slug)
}

export const getPostsByCategory = (category: string): BlogPost[] => {
    if (category === "all") return BLOG_POSTS
    return BLOG_POSTS.filter(post => post.category === category)
}

export const getPostsByTag = (tag: string): BlogPost[] => {
    return BLOG_POSTS.filter(post => 
        post.tags.some(postTag => 
            postTag.toLowerCase().includes(tag.toLowerCase())
        )
    )
}
