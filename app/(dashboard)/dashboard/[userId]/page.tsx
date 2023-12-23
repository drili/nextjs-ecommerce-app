"use client"

import { useRouter } from "next/navigation";

import { useUser } from "@/app/context/UserContex";
import withAuth from "@/app/hoc/withAuth";

const DashboardPage = ({
    params
}: {
    params: { userId: string }
}) => {
    const { user } = useUser()
    const router = useRouter()
    const userId = params.userId as string

    if (!user || user._id !== userId) {
        router.push("/")
        return null;
    }

    return (
        <div id="page_DashboardPage">
            <h1>Dashboard Page</h1>

            <p>Hello {userId}</p>
        </div>
    );
}

export default withAuth(DashboardPage)