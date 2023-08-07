import axios, { Axios } from 'axios';
import { getSession, useSession } from 'next-auth/react';

if (process.env.NEXT_PUBLIC_API_URL === undefined) {
    throw new Error("URL DA API NÃO INFORMADA.");
}

export const apiAddress: string = process.env.NEXT_PUBLIC_API_URL!;


const apiAxios: Axios = axios.create({ baseURL: apiAddress });

apiAxios.interceptors.request.use(async function (config) {
    const session: any = await getSession();

    console.log("SESSION:", session)
    if (session?.user?.accessToken) {
        config.headers!.Authorization = `Bearer ${session.user?.accessToken}`
    }
    return config;
}, (error) => Promise.reject(error))


export default apiAxios;