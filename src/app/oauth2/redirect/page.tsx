"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
    const params = useSearchParams()
    const router = useRouter();
    const token = params.get("token");

    if (token) {
        localStorage.setItem("Token", token);
        router.push("/")
    }

    return params.get("error");

}