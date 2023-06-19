import { UserDetails } from "@/model/UserDetails";

export function decodeJWT(token: string): UserDetails {
    const base64Url = token.split('.')[1];
    const data = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(Buffer.from(data, 'base64').toString());
}