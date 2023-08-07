import { PageInterface } from "@/interface/PageInterface";
import { UsuarioNovoPlanoProjection } from "@/model/planoDeTrabalho/UsuarioNovoPlanoProjection";
import { ProcessoSeletivoDTO, ProcessoSeletivoPlanoTrabalhoDTO } from "@/model/processoSeletivo/ProcessoSeletivoDTO";
import { TarefaBasicDTO, TarefaDTO } from "@/model/quadro";
import { QuadroPainelDTO } from "@/model/quadro/dto/QuadroPainelDTO";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import { recuperarToken } from "@/service/auth";
import { apiAddress } from "./apiOptions";





const apiFetch: typeof fetch = async (url, params) => {

    const token = await recuperarToken();

    const headers = new Headers(params?.headers);
    if (token) {
        headers.append("Authorization", token);
    }

    const data = await fetch(url, {
        ...params,
        headers: headers
    });

    return data;

}

export async function consultarPlanos(): Promise<PageInterface<PlanoTrabalhoModel> | undefined> {
    const resp: Promise<PageInterface<PlanoTrabalhoModel>> = apiFetch(apiAddress + "/planoTrabalho", {
        method: 'GET', cache: "no-cache"
    }).then(r => r.json()).catch(() => undefined);
    return resp;

}


export async function consultarQuadrosPainel(): Promise<PageInterface<QuadroPainelDTO>> {
    const resp: Promise<PageInterface<QuadroPainelDTO>> = apiFetch(apiAddress + "/quadro/painel", {
        method: 'GET', cache: "no-cache"
    }).then(r => r.json());
    return resp;
}


export async function consultarTarefas(quadro: number): Promise<TarefaBasicDTO[]> {
    const resp: Promise<TarefaBasicDTO[]> = apiFetch(apiAddress + `/tarefa/quadro/${quadro}`, {
        method: 'GET', cache: "no-cache"
    }).then(r => r.status === 200 ? r.json() : []);
    return resp;
}

export async function consultarTarefa(id: string): Promise<TarefaDTO> {
    const resp: Promise<TarefaDTO> = apiFetch(apiAddress + `/tarefa/${id}`, {
        method: 'GET', cache: "no-cache"
    }).then(r => r.status === 200 ? r.json() : []);
    return resp;
}

export async function consultarPesquisadores(planoId: number = 0): Promise<UsuarioNovoPlanoProjection[]> {
    const resp: Promise<UsuarioNovoPlanoProjection[]> = apiFetch(apiAddress + `/usuarioPlanoTrabalho/estaNoPlanoTrabalho?planoTrabalhoId=${planoId}`, {
        method: 'GET', cache: "no-cache"
    }).then(r => r.status === 200 ? r.json() : []);
    return resp;
}

export async function consultaPlanoTrabalho(id: number): Promise<PlanoTrabalhoModel> {
    const resp: Promise<PlanoTrabalhoModel> = apiFetch(apiAddress + `/planoTrabalho/${id}`, {
        method: 'GET', cache: "no-cache"
    }).then(r => r.status === 200 ? r.json() : undefined);
    return resp;
}

// Processo Seletivo

export async function consultaProcessoSeletivo(id: number): Promise<ProcessoSeletivoDTO> {
    const resp: Promise<ProcessoSeletivoDTO> = apiFetch(apiAddress + `/processoSeletivo/${id}`, {
        method: 'GET', cache: "no-cache"
    }).then(r => r.status === 200 ? r.json() : undefined);
    return resp;
}

export async function consultaPlanoTrabalhosProcessoSeletivo(): Promise<ProcessoSeletivoPlanoTrabalhoDTO[]> {
    const resp: Promise<ProcessoSeletivoPlanoTrabalhoDTO[]> = apiFetch(apiAddress + `/processoSeletivo/planoTrabalhoDisponiveis`, {
        method: 'GET', cache: "no-cache"
    }).then(r => r.status === 200 ? r.json() : []);
    return resp;
}

// END

// UsuarioProcessoSeleteivo


// END