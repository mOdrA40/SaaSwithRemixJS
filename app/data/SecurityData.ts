// Security page data for compliance and security features
export interface SecurityFeature {
    id: string
    title: string
    description: string
    icon: string
    details: string[]
    category: "encryption" | "access" | "monitoring" | "compliance" | "infrastructure"
}

export interface Compliance {
    id: string
    name: string
    description: string
    status: "certified" | "in_progress" | "planned"
    certificationDate?: string
    validUntil?: string
    logo: string
    details: string[]
}

export interface SecurityReport {
    id: string
    title: string
    type: "penetration_test" | "vulnerability_scan" | "audit_report" | "compliance_report"
    date: string
    summary: string
    findings: {
        critical: number
        high: number
        medium: number
        low: number
    }
    status: "completed" | "in_progress" | "scheduled"
    downloadUrl?: string
}

export interface SecurityMetric {
    id: string
    name: string
    value: string
    description: string
    icon: string
    trend: "up" | "down" | "stable"
}

// Security Features
export const SECURITY_FEATURES: SecurityFeature[] = [
    {
        id: "encryption",
        title: "End-to-End Encryption",
        description: "All data is encrypted in transit and at rest using industry-standard AES-256 encryption",
        icon: "🔐",
        category: "encryption",
        details: [
            "AES-256 encryption for data at rest",
            "TLS 1.3 for data in transit",
            "Key rotation every 90 days",
            "Hardware Security Modules (HSM) for key management",
            "Zero-knowledge architecture"
        ]
    },
    {
        id: "access_control",
        title: "Advanced Access Control",
        description: "Multi-factor authentication and role-based access control to secure your data",
        icon: "🛡️",
        category: "access",
        details: [
            "Multi-factor authentication (MFA)",
            "Single Sign-On (SSO) integration",
            "Role-based access control (RBAC)",
            "Session management and timeout",
            "IP whitelisting and geofencing"
        ]
    },
    {
        id: "monitoring",
        title: "24/7 Security Monitoring",
        description: "Continuous monitoring and threat detection to protect against security incidents",
        icon: "👁️",
        category: "monitoring",
        details: [
            "Real-time threat detection",
            "Automated incident response",
            "Security Information and Event Management (SIEM)",
            "Intrusion detection and prevention",
            "Behavioral analytics and anomaly detection"
        ]
    },
    {
        id: "compliance",
        title: "Regulatory Compliance",
        description: "Certified compliance with major industry standards and regulations",
        icon: "📋",
        category: "compliance",
        details: [
            "SOC 2 Type II certified",
            "ISO 27001 compliant",
            "GDPR compliant",
            "HIPAA ready",
            "Regular compliance audits"
        ]
    },
    {
        id: "infrastructure",
        title: "Secure Infrastructure",
        description: "Enterprise-grade infrastructure with multiple layers of security",
        icon: "🏗️",
        category: "infrastructure",
        details: [
            "AWS/Azure enterprise security",
            "Network segmentation and firewalls",
            "DDoS protection and mitigation",
            "Regular security patches and updates",
            "Disaster recovery and backup systems"
        ]
    },
    {
        id: "data_privacy",
        title: "Data Privacy Protection",
        description: "Comprehensive data privacy controls and user rights management",
        icon: "🔒",
        category: "compliance",
        details: [
            "Data minimization principles",
            "Right to be forgotten",
            "Data portability and export",
            "Privacy by design architecture",
            "Regular privacy impact assessments"
        ]
    }
]

// Compliance Certifications
export const COMPLIANCE_CERTIFICATIONS: Compliance[] = [
    {
        id: "soc2",
        name: "SOC 2 Type II",
        description: "Service Organization Control 2 certification for security, availability, and confidentiality",
        status: "certified",
        certificationDate: "2024-03-15",
        validUntil: "2025-03-15",
        logo: "/images/certifications/soc2.png",
        details: [
            "Annual third-party audit",
            "Security controls validation",
            "Availability and confidentiality assessment",
            "Processing integrity verification",
            "Privacy controls evaluation"
        ]
    },
    {
        id: "iso27001",
        name: "ISO 27001",
        description: "International standard for information security management systems",
        status: "certified",
        certificationDate: "2024-01-20",
        validUntil: "2027-01-20",
        logo: "/images/certifications/iso27001.png",
        details: [
            "Information security management system",
            "Risk assessment and treatment",
            "Security controls implementation",
            "Continuous improvement process",
            "Regular surveillance audits"
        ]
    },
    {
        id: "gdpr",
        name: "GDPR Compliant",
        description: "General Data Protection Regulation compliance for EU data protection",
        status: "certified",
        certificationDate: "2024-05-25",
        logo: "/images/certifications/gdpr.png",
        details: [
            "Data protection by design and default",
            "Lawful basis for processing",
            "Individual rights implementation",
            "Data breach notification procedures",
            "Privacy impact assessments"
        ]
    },
    {
        id: "hipaa",
        name: "HIPAA Ready",
        description: "Health Insurance Portability and Accountability Act readiness",
        status: "certified",
        certificationDate: "2024-02-10",
        logo: "/images/certifications/hipaa.png",
        details: [
            "Administrative safeguards",
            "Physical safeguards",
            "Technical safeguards",
            "Business associate agreements",
            "Risk assessment and management"
        ]
    },
    {
        id: "pci_dss",
        name: "PCI DSS",
        description: "Payment Card Industry Data Security Standard compliance",
        status: "in_progress",
        logo: "/images/certifications/pci.png",
        details: [
            "Secure network architecture",
            "Cardholder data protection",
            "Vulnerability management program",
            "Access control measures",
            "Regular monitoring and testing"
        ]
    }
]

// Security Reports
export const SECURITY_REPORTS: SecurityReport[] = [
    {
        id: "pentest_2024_q2",
        title: "Q2 2024 Penetration Testing Report",
        type: "penetration_test",
        date: "2024-06-01",
        summary: "Comprehensive penetration testing conducted by third-party security firm",
        findings: {
            critical: 0,
            high: 1,
            medium: 3,
            low: 5
        },
        status: "completed",
        downloadUrl: "/reports/pentest-q2-2024.pdf"
    },
    {
        id: "vuln_scan_2024_05",
        title: "May 2024 Vulnerability Scan",
        type: "vulnerability_scan",
        date: "2024-05-15",
        summary: "Monthly automated vulnerability scanning and assessment",
        findings: {
            critical: 0,
            high: 0,
            medium: 2,
            low: 8
        },
        status: "completed",
        downloadUrl: "/reports/vuln-scan-may-2024.pdf"
    },
    {
        id: "soc2_audit_2024",
        title: "SOC 2 Type II Audit Report",
        type: "audit_report",
        date: "2024-03-15",
        summary: "Annual SOC 2 Type II audit by independent auditing firm",
        findings: {
            critical: 0,
            high: 0,
            medium: 1,
            low: 2
        },
        status: "completed",
        downloadUrl: "/reports/soc2-audit-2024.pdf"
    }
]

// Security Metrics
export const SECURITY_METRICS: SecurityMetric[] = [
    {
        id: "uptime",
        name: "Security Uptime",
        value: "99.99%",
        description: "Security systems availability",
        icon: "🛡️",
        trend: "stable"
    },
    {
        id: "threats_blocked",
        name: "Threats Blocked",
        value: "1,247",
        description: "Threats blocked this month",
        icon: "🚫",
        trend: "up"
    },
    {
        id: "response_time",
        name: "Incident Response",
        value: "< 15 min",
        description: "Average security incident response time",
        icon: "⚡",
        trend: "down"
    },
    {
        id: "compliance_score",
        name: "Compliance Score",
        value: "98%",
        description: "Overall compliance rating",
        icon: "📊",
        trend: "up"
    }
]

// Security Best Practices
export const SECURITY_BEST_PRACTICES = [
    {
        title: "Use Strong Passwords",
        description: "Create unique, complex passwords for all accounts and enable two-factor authentication",
        icon: "🔑"
    },
    {
        title: "Keep Software Updated",
        description: "Regularly update your applications and operating systems to patch security vulnerabilities",
        icon: "🔄"
    },
    {
        title: "Be Cautious with Links",
        description: "Verify the authenticity of links and attachments before clicking or downloading",
        icon: "🔍"
    },
    {
        title: "Use Secure Networks",
        description: "Avoid public Wi-Fi for sensitive activities and use VPN when necessary",
        icon: "🌐"
    },
    {
        title: "Regular Backups",
        description: "Maintain regular backups of important data and test recovery procedures",
        icon: "💾"
    },
    {
        title: "Monitor Account Activity",
        description: "Regularly review account activity and report any suspicious behavior immediately",
        icon: "👀"
    }
]

// Helper functions
export function getComplianceByStatus(status: "certified" | "in_progress" | "planned"): Compliance[] {
    return COMPLIANCE_CERTIFICATIONS.filter(cert => cert.status === status)
}

export function getSecurityFeaturesByCategory(category: SecurityFeature["category"]): SecurityFeature[] {
    return SECURITY_FEATURES.filter(feature => feature.category === category)
}

export function getRecentReports(limit: number = 5): SecurityReport[] {
    return SECURITY_REPORTS
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit)
}
