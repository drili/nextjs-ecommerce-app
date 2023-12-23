import MainHeading from "@/app/components/Heading";
import SubHeading from "@/app/components/SubHeading";
import HeaderBanner from "@/app/components/HeaderBanner";
import LoginForm from "./components/LoginForm";

import Link from "next/link";

import bannerImage from '@/app/assets/images/pexels-anete-lusina-6331230.jpg';

const LoginPage = () => {
    return (
        <div className="" id="page_LoginPage">
            <HeaderBanner imageSize="small" imageUrl={bannerImage} />

            <div className="grid grid-cols-2 gap-4">
                <section className="flex flex-col gap-4">
                    <MainHeading title="Login Page" />
                    <SubHeading description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe laborum reprehenderit doloribus! Tempora, reiciendis voluptates?" />

                    <p className="text-md">Not registered? <Link href="/register" className="text-sky-600 underline">Sign up here.</Link></p> 
                </section>

                <section>
                    <LoginForm />
                </section>
            </div>
        </div>
    );
}

export default LoginPage;