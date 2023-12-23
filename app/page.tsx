"use client"

import redirectIfAuthenticated from "@/app/hoc/redirectIfAuthenticated";

import MainHeading from "@/app/components/Heading";
import HeaderBanner from "@/app/components/HeaderBanner";
import SubHeading from "@/app/components/SubHeading";

import bannerImage from '@/app/assets/images/pexels-karolina-grabowska-5650023.jpg';

function Home() {
    return (
        <div id="page_Home">
            <HeaderBanner imageUrl={bannerImage} />

            <div className="grid grid-cols-2">
                <section className="flex flex-col gap-4">
                    <MainHeading title="Home Page" />
                    <SubHeading description="Welcome to NextJS Ecommerce App. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit facere iste corrupti rem id deserunt vero placeat quos error eum!" />
                </section>
            </div>
        </div>
    )
}

export default redirectIfAuthenticated(Home)