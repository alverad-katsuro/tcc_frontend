import { useAuthContext } from "@/context/AuthenticateContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function RequireAuth() {

    const { isAuthenticate, userDetails } = useAuthContext();

    const router = useRouter();

    useEffect(() => {
        if (isAuthenticate()) {
            router.push("/login")
        }
    }, [isAuthenticate, useRouter])

    return userDetails;
}