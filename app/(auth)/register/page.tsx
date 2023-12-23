import MainHeading from "@/app/components/Heading";
import SubHeading from "@/app/components/SubHeading";
import HeaderBanner from "@/app/components/HeaderBanner";
import RegisterForm from "./components/RegisterForm";

import Link from "next/link";

import bannerImage from '@/app/assets/images/pexels-cottonbro-studio-5076516.jpg';

const RegisterPage = () => {
    return (
        <div className="component_RegisterPage">
            <HeaderBanner imageSize="small" imageUrl={bannerImage} />

            <div className="grid grid-cols-2 gap-4">
                <section className="flex flex-col gap-4">
                    <MainHeading title="Registration Page" />
                    <SubHeading description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe laborum reprehenderit doloribus! Tempora, reiciendis voluptates? Em ipsum dolor sit ame." />

                    <p className="text-md">Already registered? <Link href="/login" className="text-sky-600 underline">Sign in here.</Link></p>
                </section>

                <section>
                    <RegisterForm />
                </section>
            </div>
        </div>
    );
}

export default RegisterPage;