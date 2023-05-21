// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PageRequest } from '@/model/PageRequest';
import { TokenAuth } from '@/model/TokenAuth';
import { UserLogin } from '@/model/UserLogin';
import axios, { Axios } from 'axios';
import { getCookie } from 'cookies-next';
import { VariantType, enqueueSnackbar } from 'notistack';
import { PessoaModel } from '../model/PessoaModel';

const apiAddress: string = "http://10.85.200.77:16000/"

const apiAxios: Axios = axios.create({ baseURL: apiAddress });

function validToken(): string {
    const token: string = getCookie("Token", { path: "/" }) as string;
    return "Bearer " + token;
}

export async function loginAuth(data: UserLogin): Promise<TokenAuth> {
    const resp = (await apiAxios.post<TokenAuth>("/auth/login", data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true }));
    return resp.data;
}

export async function savePessoa(pessoa: PessoaModel): Promise<PessoaModel> {
    const resp = (await apiAxios.postForm<PessoaModel>("/pessoa", pessoa)).data;
    return resp;
}

function notification(mensagem: string, variant: VariantType): void {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(mensagem, { variant });
};
