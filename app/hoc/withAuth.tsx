import { useRouter } from "next/navigation";

import { useUser } from "@/app/context/UserContex";
import { useEffect } from "react";

type WithAuthProps = {
    WrappedComponent: React.ComponentType<any>
}

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    const WithAuthComponent: React.FC = (props) => {
        const router = useRouter();
        const { user } = useUser();

        useEffect(() => {
            if (!user) {
                router.replace('/login');
            }
        }, [user, router]);

        if (!user) {
            return null;
        }

        return <WrappedComponent {...props} />;
    }

    return WithAuthComponent;
}

export default withAuth