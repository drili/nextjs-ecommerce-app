import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { useUser } from "@/app/context/UserContex";

const redirectIfAuthenticated = (WrappedComponent: React.ComponentType<any>) => {
    const RedirectComponent: React.FC = (props) => {
        const { user } = useUser();
        const router = useRouter();

        useEffect(() => {
            if (user) {
                router.push(`/dashboard/${user._id}`)
            }
        }, [user, router])

        return <WrappedComponent {...props} />;
    }

    return RedirectComponent;
}

export default redirectIfAuthenticated;