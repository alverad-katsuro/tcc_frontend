import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function RequireAuth() {

    const { data: session } = useSession();

    const router = useRouter();

    useEffect(() => {
        if (typeof session != null) {
            router.push("/login")
        }
    }, [useSession, useRouter])

    return session;
}