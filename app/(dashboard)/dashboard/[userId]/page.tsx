"use client"

import { useRouter } from "next/navigation";

import { useUser } from "@/app/context/UserContex";
import withAuth from "@/app/hoc/withAuth";
import MainHeading from "@/app/components/Heading";
import SubHeading from "@/app/components/SubHeading";
import HeaderBanner from "@/app/components/HeaderBanner";

import bannerImage from '@/app/assets/images/pexels-pixabay-259200.jpg';

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
            <div className="grid grid-cols-2 mb-10">
                <section className="flex flex-col gap-4">
                    <MainHeading title="Dashboard Page" />
                    <SubHeading description={`Welcome to your store, ${user.userFirstName}.`} />
                </section>
            </div>

            <HeaderBanner imageSize="small"  imageUrl={bannerImage} />

        </div>
    );
}

export default withAuth(DashboardPage)