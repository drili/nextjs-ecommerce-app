import { useRouter } from "next/navigation";

import { useUser } from "@/app/context/UserContex";

type WithAuthProps = {
    WrappedComponent: React.ComponentType<any>
}

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    const WithAuthComponent: React.FC = (props) => {
        const router = useRouter();
        const { user } = useUser();

        if (!user) {
            router.replace('/login');
            return null;
        }

        return <WrappedComponent {...props} />;
    }

    return WithAuthComponent;
}

export default withAuth