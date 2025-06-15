// Documentation data for API and guides
export interface APIEndpoint {
    id: string
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
    path: string
    title: string
    description: string
    parameters?: Parameter[]
    requestBody?: RequestBody
    responses: Response[]
    examples: Example[]
    category: string
}

export interface Parameter {
    name: string
    type: string
    required: boolean
    description: string
    example?: string
}

export interface RequestBody {
    type: string
    description: string
    schema: Record<string, unknown>
    example: Record<string, unknown>
}

export interface Response {
    status: number
    description: string
    schema?: Record<string, unknown>
    example?: Record<string, unknown>
}

export interface Example {
    title: string
    description: string
    code: string
    language: string
}

export interface DocSection {
    id: string
    title: string
    description: string
    icon: string
    items: DocItem[]
}

export interface DocItem {
    id: string
    title: string
    description: string
    href: string
    readTime: number
    difficulty: "beginner" | "intermediate" | "advanced"
    tags: string[]
}

// API Documentation Categories
export const API_CATEGORIES = [
    { id: "authentication", name: "Authentication", icon: "🔐" },
    { id: "users", name: "Users", icon: "👥" },
    { id: "projects", name: "Projects", icon: "📁" },
    { id: "analytics", name: "Analytics", icon: "📊" },
    { id: "billing", name: "Billing", icon: "💳" },
    { id: "webhooks", name: "Webhooks", icon: "🔗" }
]

// API Endpoints
export const API_ENDPOINTS: APIEndpoint[] = [
    {
        id: "auth-login",
        method: "POST",
        path: "/api/auth/login",
        title: "User Login",
        description: "Authenticate user and get access token",
        category: "authentication",
        parameters: [],
        requestBody: {
            type: "application/json",
            description: "User credentials",
            schema: {
                type: "object",
                properties: {
                    email: { type: "string", format: "email" },
                    password: { type: "string", minLength: 8 }
                },
                required: ["email", "password"]
            },
            example: {
                email: "user@example.com",
                password: "securepassword123"
            }
        },
        responses: [
            {
                status: 200,
                description: "Login successful",
                example: {
                    success: true,
                    data: {
                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        user: {
                            id: "user_123",
                            email: "user@example.com",
                            name: "John Doe"
                        }
                    }
                }
            },
            {
                status: 401,
                description: "Invalid credentials",
                example: {
                    success: false,
                    error: "Invalid email or password"
                }
            }
        ],
        examples: [
            {
                title: "cURL",
                description: "Login using cURL",
                language: "bash",
                code: `curl -X POST https://api.saaspro.com/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'`
            },
            {
                title: "JavaScript",
                description: "Login using fetch API",
                language: "javascript",
                code: `const response = await fetch('https://api.saaspro.com/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'securepassword123'
  })
});

const data = await response.json();
console.log(data);`
            }
        ]
    },
    {
        id: "users-list",
        method: "GET",
        path: "/api/users",
        title: "List Users",
        description: "Get a list of all users with pagination",
        category: "users",
        parameters: [
            {
                name: "page",
                type: "integer",
                required: false,
                description: "Page number for pagination",
                example: "1"
            },
            {
                name: "limit",
                type: "integer",
                required: false,
                description: "Number of users per page",
                example: "20"
            },
            {
                name: "search",
                type: "string",
                required: false,
                description: "Search users by name or email",
                example: "john"
            }
        ],
        responses: [
            {
                status: 200,
                description: "Users retrieved successfully",
                example: {
                    success: true,
                    data: {
                        users: [
                            {
                                id: "user_123",
                                name: "John Doe",
                                email: "john@example.com",
                                createdAt: "2024-01-15T10:30:00Z"
                            }
                        ],
                        pagination: {
                            page: 1,
                            limit: 20,
                            total: 150,
                            totalPages: 8
                        }
                    }
                }
            }
        ],
        examples: [
            {
                title: "cURL",
                description: "Get users with pagination",
                language: "bash",
                code: `curl -X GET "https://api.saaspro.com/users?page=1&limit=20" \\
  -H "Authorization: Bearer YOUR_TOKEN"`
            }
        ]
    }
]

// Documentation Sections
export const DOC_SECTIONS: DocSection[] = [
    {
        id: "getting-started",
        title: "Getting Started",
        description: "Quick start guides and basic concepts",
        icon: "🚀",
        items: [
            {
                id: "introduction",
                title: "Introduction",
                description: "Learn about SaaS Pro API and its capabilities",
                href: "/docs/introduction",
                readTime: 5,
                difficulty: "beginner",
                tags: ["overview", "basics"]
            },
            {
                id: "authentication",
                title: "Authentication",
                description: "How to authenticate and secure your API requests",
                href: "/docs/authentication",
                readTime: 10,
                difficulty: "beginner",
                tags: ["auth", "security", "tokens"]
            },
            {
                id: "quick-start",
                title: "Quick Start",
                description: "Get up and running in 5 minutes",
                href: "/docs/quick-start",
                readTime: 8,
                difficulty: "beginner",
                tags: ["tutorial", "setup"]
            }
        ]
    },
    {
        id: "api-reference",
        title: "API Reference",
        description: "Complete API documentation with examples",
        icon: "📚",
        items: [
            {
                id: "users-api",
                title: "Users API",
                description: "Manage users, profiles, and permissions",
                href: "/docs/api/users",
                readTime: 15,
                difficulty: "intermediate",
                tags: ["api", "users", "crud"]
            },
            {
                id: "projects-api",
                title: "Projects API",
                description: "Create and manage projects and workspaces",
                href: "/docs/api/projects",
                readTime: 20,
                difficulty: "intermediate",
                tags: ["api", "projects", "workspaces"]
            },
            {
                id: "analytics-api",
                title: "Analytics API",
                description: "Access analytics data and generate reports",
                href: "/docs/api/analytics",
                readTime: 25,
                difficulty: "advanced",
                tags: ["api", "analytics", "reports"]
            }
        ]
    },
    {
        id: "sdks",
        title: "SDKs & Libraries",
        description: "Official SDKs and community libraries",
        icon: "🛠️",
        items: [
            {
                id: "javascript-sdk",
                title: "JavaScript SDK",
                description: "Official JavaScript/TypeScript SDK",
                href: "/docs/sdks/javascript",
                readTime: 12,
                difficulty: "intermediate",
                tags: ["sdk", "javascript", "typescript"]
            },
            {
                id: "python-sdk",
                title: "Python SDK",
                description: "Official Python SDK with async support",
                href: "/docs/sdks/python",
                readTime: 15,
                difficulty: "intermediate",
                tags: ["sdk", "python", "async"]
            },
            {
                id: "react-components",
                title: "React Components",
                description: "Pre-built React components for quick integration",
                href: "/docs/sdks/react",
                readTime: 18,
                difficulty: "intermediate",
                tags: ["sdk", "react", "components"]
            }
        ]
    },
    {
        id: "guides",
        title: "Guides & Tutorials",
        description: "Step-by-step guides for common use cases",
        icon: "📖",
        items: [
            {
                id: "webhooks-guide",
                title: "Setting up Webhooks",
                description: "Configure webhooks for real-time notifications",
                href: "/docs/guides/webhooks",
                readTime: 20,
                difficulty: "intermediate",
                tags: ["webhooks", "notifications", "integration"]
            },
            {
                id: "rate-limiting",
                title: "Rate Limiting",
                description: "Understanding and handling API rate limits",
                href: "/docs/guides/rate-limiting",
                readTime: 10,
                difficulty: "beginner",
                tags: ["rate-limiting", "best-practices"]
            },
            {
                id: "error-handling",
                title: "Error Handling",
                description: "Best practices for handling API errors",
                href: "/docs/guides/error-handling",
                readTime: 15,
                difficulty: "intermediate",
                tags: ["errors", "debugging", "best-practices"]
            }
        ]
    }
]

// Search function for documentation
export function searchDocs(query: string): DocItem[] {
    const lowercaseQuery = query.toLowerCase()
    const allItems = DOC_SECTIONS.flatMap(section => section.items)

    return allItems.filter(item =>
        item.title.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
}

// Get documentation by category
export function getDocsByCategory(categoryId: string): DocItem[] {
    const section = DOC_SECTIONS.find(s => s.id === categoryId)
    return section ? section.items : []
}

// Get API endpoints by category
export function getAPIEndpointsByCategory(categoryId: string): APIEndpoint[] {
    return API_ENDPOINTS.filter(endpoint => endpoint.category === categoryId)
}
