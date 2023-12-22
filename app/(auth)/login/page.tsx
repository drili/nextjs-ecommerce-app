import MainHeading from "@/app/components/Heading";
import SubHeading from "@/app/components/SubHeading";
import Link from "next/link";

const LoginPage = () => {
    return (
        <div className="" id="page_LoginPage">
            <div className="grid grid-cols-2 gap-4">
                <section className="flex flex-col gap-4">
                    <MainHeading title="Login Page" />
                    <SubHeading description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe laborum reprehenderit doloribus! Tempora, reiciendis voluptates?" />

                    <p className="text-md">Not registered? <Link href="/register" className="text-sky-600 underline">Sign up here.</Link></p> 
                </section>

                <section>
                    <p>Login Form...</p>
                </section>
            </div>
        </div>
    );
}

export default LoginPage;