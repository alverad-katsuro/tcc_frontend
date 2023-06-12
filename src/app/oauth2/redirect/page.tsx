"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const params = useSearchParams()
    const router = useRouter();
    const token = params.get("token");

    useEffect(() => {
        if (token) {
            localStorage.setItem("Token", token);
            router.push("/")
        }
    })


    return params.get("error");

}