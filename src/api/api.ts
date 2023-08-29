import { AtividadeCreateDTO, AtividadeModel } from '@/model/atividades';
import { UserDataKeycloak } from '@/model/keycloak/UserDataKeycloak';
import { ProcessoSeletivoDTO } from '@/model/processoSeletivo/ProcessoSeletivoDTO';
import { TarefaDTO } from '@/model/quadro';
import { TarefaCreateDTO } from '@/model/quadro/TarefaCreaeteDTO';
import { UpdateIndex } from '@/model/quadro/UpdateIndex';
import { PlanoTrabalhoModel } from '@/model/response/PlanoTrabalhoModel';
import { AxiosResponse } from 'axios';
import { VariantType, enqueueSnackbar } from 'notistack';
import apiAxios from './apiOptions';


export async function atualizarPerfil(perfil: UserDataKeycloak, foto?: File): Promise<AxiosResponse<void, any>> {
    const resp = (await apiAxios.putForm<void>("/usuario", {
        usuario: new Blob([JSON.stringify(perfil)], {
            type: 'application/json'
        }),
        foto: foto
    }));
    return resp;
}

export async function recuperarPerfil(): Promise<UserDataKeycloak> {
    const resp = (await apiAxios.get<UserDataKeycloak>("/usuario"));
    return resp.data;
}

// Plano de Trabalho

export function salvarPlanoTrabalho(plano: PlanoTrabalhoModel): Promise<{ data: string, response: AxiosResponse<string, any> }> {
    return plano.id != undefined && plano.id > 0 ? atualizarPlanoTrabalho(plano) : criarPlanoTrabalho(plano);
}

async function criarPlanoTrabalho(plano: PlanoTrabalhoModel): Promise<{ data: string, response: AxiosResponse<string, any> }> {
    plano.id = undefined;
    const resp = (await apiAxios.postForm<string>("/planoTrabalho", {
        planoTrabalho: new Blob([JSON.stringify({ ...plano, arquivo: undefined })], {
            type: 'application/json'
        }),
        arquivo: plano.arquivo
    }));
    return { data: resp.data, response: resp };
}

async function atualizarPlanoTrabalho(plano: PlanoTrabalhoModel): Promise<{ data: string, response: AxiosResponse<string, any> }> {
    console.log(plano, "asdasdas");

    const resp = (await apiAxios.putForm<string>("/planoTrabalho", {
        planoTrabalho: new Blob([JSON.stringify({ ...plano, arquivo: undefined })], {
            type: 'application/json'
        }),
        arquivo: plano.arquivo ?? undefined
    }));
    return { data: resp.data, response: resp }; //TODO fazer aqui tbm
}

export async function deletarPlanoTrabalho(id: number) {
    const resp = (await apiAxios.delete(`/planoTrabalho/${id}`));
    return resp.data;
}

export async function finalizarPlanoTrabalho(id: number): Promise<string> {
    const resp = (await apiAxios.put<string>(`/planoTrabalho/finalizar/${id}`));
    return resp.data;
}

export async function reabrirPlanoTrabalho(id: number): Promise<string> {
    const resp = (await apiAxios.put<string>(`/planoTrabalho/reabrir/${id}`));
    return resp.data;
}

export async function submeterRelatorioPlanoTrabalho(planoTrabalhoId: number, arquivo: File): Promise<{ data: string, response: AxiosResponse<string, any> }> {
    const resp = (await apiAxios.putForm<string>(`/planoTrabalho/${planoTrabalhoId}/relatorio`, { arquivo }));
    return { data: resp.data, response: resp };
}

export async function isUsuarioNoPlano(planoTrabalhoId: number): Promise<boolean> {
    const resp = (await apiAxios.get<boolean>(`/planoTrabalho/${planoTrabalhoId}/estouNele`));
    return resp.data;
}

// END

// Processos Seletivos

export function salvarProcessoSeletivo(processoSeletivo: ProcessoSeletivoDTO): Promise<{ data: string, response: AxiosResponse<string, any> }> {
    return processoSeletivo.id != undefined && processoSeletivo.id > 0 ? atualizarProcessoSeletivo(processoSeletivo) : criarProcessoSeletivo(processoSeletivo);
}

async function criarProcessoSeletivo(processoSeletivo: ProcessoSeletivoDTO): Promise<{ data: string, response: AxiosResponse<string, any> }> {
    processoSeletivo.id = undefined;
    const resp = (await apiAxios.post<string>("/processoSeletivo", processoSeletivo));
    return { data: resp.data, response: resp };
}

async function atualizarProcessoSeletivo(processoSeletivo: ProcessoSeletivoDTO): Promise<{ data: string, response: AxiosResponse<string, any> }> {
    const resp = (await apiAxios.put<string>("/processoSeletivo", processoSeletivo));
    return { data: resp.data, response: resp };
}

export async function deletarProcessoSeletivo(id: number) {
    const resp = (await apiAxios.delete(`/processoSeletivo/${id}`));
    return resp.data;
}

// END

// Arquivo

export async function baixarArquivo(url: string): Promise<Blob> {
    const resp = (await apiAxios.get<Blob>(url));
    return resp.data;
}

// END

// Se Inscrever

export async function criarInscricao(processoId: number): Promise<string> {
    const resp = (await apiAxios.post<string>(`/usuarioProcessoSeletivo/processo/${processoId}`));
    return resp.data;
}

export async function estouNoProcesso(processoId: number): Promise<boolean> {
    const resp = (await apiAxios.get<boolean>(`/usuarioProcessoSeletivo/estouNoProcesso/${processoId}`));
    return resp.data;
}

// END

// Tarefas

export async function consultarTarefa(id: string): Promise<TarefaDTO | undefined> {
    const resp = (await apiAxios.get<TarefaDTO | undefined>(`/tarefa/${id}`));
    if (resp.data && resp.data?.atividades === undefined) {
        resp.data.atividades = []
    }
    return resp.data;
}

export async function criarTarefa(data: TarefaCreateDTO): Promise<string> {
    const resp = (await apiAxios.post<string>("/tarefa", data));
    return resp.data;
}

export async function updateTarefa(data: TarefaDTO): Promise<string> {
    const resp = (await apiAxios.put<string>("/tarefa", data));
    return resp.data;
}

export async function deleteTarefa(tarefaId: string): Promise<AxiosResponse<any, any>> {
    const resp = (await apiAxios.delete(`/tarefa/${tarefaId}`));
    return resp.data;
}

export async function updateIndexTarefa(data: UpdateIndex[]): Promise<string> {
    const resp = (await apiAxios.put<string>("/tarefa/index", data));
    return resp.data;
}

export async function criarAtividade(tarefaId: string, data: AtividadeCreateDTO): Promise<string> {
    const resp = (await apiAxios.post<string>(`/tarefa/${tarefaId}/atividade`, data));
    return resp.data;
}

export async function atualizarAtividade(data: AtividadeCreateDTO): Promise<string> {
    const resp = (await apiAxios.put<string>(`/tarefa/atividade`, data));
    return resp.data;
}

export async function deleteAtividade(tarefaId: string, atividadeId: string): Promise<AxiosResponse<any, any>> {
    const resp = (await apiAxios.delete(`/tarefa/${tarefaId}/atividade/${atividadeId}`));
    return resp.data;
}

export async function updateIndexAtividade(data: AtividadeModel[]): Promise<string> {
    const resp = (await apiAxios.put<string>(`/tarefa/atividade/index`, data));
    return resp.data;
}

export async function ingressarTarefa(tarefaId: string): Promise<AxiosResponse<any, any>> {
    const resp = (await apiAxios.post(`/tarefa/${tarefaId}/ingressar`));
    return resp
}

export async function indicarPesquisadorTarefa(tarefaId: string, pesquisadorId?: string): Promise<AxiosResponse<void, any>> {
    const resp = (await apiAxios.post<void>(`/tarefa/${tarefaId}/indicarPesquisadorTarefa`, { pesquisadorId: pesquisadorId }));
    return resp;
}


//

function notification(mensagem: string, variant: VariantType): void {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(mensagem, { variant });
};

apiAxios.interceptors.response.use(response => response, (error) => {
    switch (error.code) {
        case "ERR_BAD_REQUEST":
            if (error.response.status == 401) {
                notification(`Error: ${error.response.data.message}`, "error");
            } else {
                notification("Aviso: Não foi possivel salvar as alterações", "error");
            }
            return Promise.reject();

        case "ERR_NETWORK":
            notification("Error: Não foi possivel se conectar a base de dados", "error");
            return Promise.reject();

        default:
            return Promise.reject(error);
    }
})