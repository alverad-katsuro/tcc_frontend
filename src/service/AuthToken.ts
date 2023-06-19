import { cookies } from "next/headers";

export function recuperarToken(): string | undefined{
    const token = cookies().get("Token");
    if (token == undefined) {
        return undefined;
    }
    return `Bearer ${token.value}`;
}