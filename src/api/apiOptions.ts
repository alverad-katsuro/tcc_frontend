import axios, { Axios } from 'axios';
import { getCookie } from 'cookies-next';

if (process.env.NEXT_PUBLIC_API_URL === undefined) {
    throw new Error("URL DA API NÃO INFORMADA.");
}

export const apiAddress: string = process.env.NEXT_PUBLIC_API_URL!;


const apiAxios: Axios = axios.create({ baseURL: apiAddress });

function validToken(): string | undefined {
    return getCookie("Token", { path: "/" })?.toString();
}

apiAxios.interceptors.request.use(config => {
    const token = validToken();
    if (token !== undefined) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error))


export default apiAxios;