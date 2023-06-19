import { TokenAuth } from '@/model/TokenAuth';
import { UserLogin } from '@/model/UserLogin';
import { PlanoTrabalhoModel } from '@/model/response/PlanoTrabalhoModel';
import { VariantType, enqueueSnackbar } from 'notistack';
import apiAxios from './apiOptions';
import { AxiosResponse } from 'axios';

export async function loginAuth(data: UserLogin): Promise<TokenAuth> {
    const resp = (await apiAxios.post<TokenAuth>("/auth/login", data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true }));
    return resp.data;
}

// export async function savePessoa(pessoa: PessoaModel): Promise<PessoaModel> {
//     const resp = (await apiAxios.postForm<PessoaModel>("/pessoa", pessoa)).data;
//     return resp;
// }



// Plano de Trabalho

export async function consultaPlanoTrabalho(id: number): Promise<PlanoTrabalhoModel> {
    const resp = (await apiAxios.get<PlanoTrabalhoModel>(`/planoTrabalho/${id}`));
    return resp.data;
}


export function salvarPlanoTrabalho(plano: PlanoTrabalhoModel): Promise<string> | Promise<AxiosResponse<string, any> > {
    return plano.id != undefined && plano.id > 0 ? atualizarPlanoTrabalho(plano) : criarPlanoTrabalho(plano);
}

async function criarPlanoTrabalho(plano: PlanoTrabalhoModel) {
    plano.id = undefined;
    const resp = (await apiAxios.post<string>("/planoTrabalho", plano));
    return resp;
}

async function atualizarPlanoTrabalho(plano: PlanoTrabalhoModel): Promise<string> {
    const resp = (await apiAxios.put<string>("/planoTrabalho", plano));
    return resp.data;
}

// END


function notification(mensagem: string, variant: VariantType): void {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(mensagem, { variant });
};

apiAxios.interceptors.response.use(response => response, (error) => {
    switch (error.code) {
        case "ERR_BAD_REQUEST":
            if (error.response.status == 401) {
                notification("Aviso: Usuario não autenticado", "error");
            } else {
                notification("Aviso: Não foi possivel salvar as alterações", "error");
            }
            break;

        case "ERR_NETWORK":
            notification("Error: Não foi possivel se conectar a base de dados", "error");
            break;

        default:
            //notification(`Error: ${error.response.data.message}`, "error")
            return Promise.reject(error);
        //break;
    }
})