// HOC
// Um componente que embloga outro componente

import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookie from "js-cookie";

export default function withAuth(WrappedComponent) {
    const Wrapper = (props) => {

        const router = useRouter()

        useEffect(() => {
            const token = Cookie.get("token");

            // se nao tenho um token
            if (!token) {
                router.replace("/");
            }
        }, []);
        return <WrappedComponent {...props} />
    }
    return Wrapper;
}