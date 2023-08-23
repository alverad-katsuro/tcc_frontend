import { InscricaoRequest } from '@/components/processoSeletivo/InscricaoModal';
import { AtividadeCreateDTO, AtividadeModel } from '@/model/atividades';
import { ProcessoSeletivoDTO } from '@/model/processoSeletivo/ProcessoSeletivoDTO';
import { TarefaDTO } from '@/model/quadro';
import { TarefaCreateDTO } from '@/model/quadro/TarefaCreaeteDTO';
import { UpdateIndex } from '@/model/quadro/UpdateIndex';
import { PlanoTrabalhoModel } from '@/model/response/PlanoTrabalhoModel';
import { AxiosResponse } from 'axios';
import { VariantType, enqueueSnackbar } from 'notistack';
import apiAxios from './apiOptions';


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

export async function criarInscricao(data: InscricaoRequest): Promise<string> {
    const resp = (await apiAxios.postForm<string>("/usuarioProcessoSeletivo", data));
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

export async function updateIndexAtividade(data: AtividadeModel[]): Promise<string> {
    const resp = (await apiAxios.put<string>(`/tarefa/atividade/index`, data));
    return resp.data;
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
                notification("Aviso: Usuario não autenticado", "error");
            } else {
                notification("Aviso: Não foi possivel salvar as alterações", "error");
            }
            break;

        case "ERR_NETWORK":
            notification("Error: Não foi possivel se conectar a base de dados", "error");
            break;

        default:
            return Promise.reject(error);
        //break;
    }
})