import type { MetaFunction } from "react-router"
import DashboardDemo from "~/components/dashboard/DashboardDemo"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `Dashboard - ${COMPANY_INFO.name}` },
        { name: "description", content: "Your comprehensive dashboard overview with real-time analytics and premium components" },
    ]
}

export default function Dashboard() {
    return (
        <div className="p-6">
            <DashboardDemo />
        </div>
    )
}