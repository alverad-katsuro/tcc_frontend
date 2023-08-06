import { PageInterface } from "@/interface/PageInterface";
import { UsuarioNovoPlanoProjection } from "@/model/planoDeTrabalho/UsuarioNovoPlanoProjection";
import { ProcessoSeletivoDTO, ProcessoSeletivoPlanoTrabalhoDTO } from "@/model/processoSeletivo/ProcessoSeletivoDTO";
import { TarefaDTO } from "@/model/quadro";
import { QuadroPainelDTO } from "@/model/quadro/dto/QuadroPainelDTO";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import { recuperarToken } from "@/service/auth";
import { apiAddress } from "./apiOptions";

export async function consultarQuadrosPainel(): Promise<PageInterface<QuadroPainelDTO>> {
    const resp: Promise<PageInterface<QuadroPainelDTO>> = fetch(apiAddress + "/quadro/painel", {
        method: 'GET', cache: "no-cache", headers: {
            "Authorization": recuperarToken()!
        }
    }).then(r => r.json());
    return resp;
}


export async function consultarTarefas(quadro: number): Promise<TarefaDTO[]> {
    const resp: Promise<TarefaDTO[]> = fetch(apiAddress + `/tarefa/quadro/${quadro}`, {
        method: 'GET', cache: "no-cache", headers: {
            "Authorization": recuperarToken()!
        }
    }).then(r => r.status === 200 ? r.json() : []);
    return resp;
}

export async function consultarTarefa(id: string): Promise<TarefaDTO> {
    const resp: Promise<TarefaDTO> = fetch(apiAddress + `/tarefa/${id}`, {
        method: 'GET', cache: "no-cache", headers: {
            "Authorization": recuperarToken()!
        }
    }).then(r => r.status === 200 ? r.json() : []);
    return resp;
}

export async function consultarPesquisadores(planoId: number = 0): Promise<UsuarioNovoPlanoProjection[]> {
    const resp: Promise<UsuarioNovoPlanoProjection[]> = fetch(apiAddress + `/usuarioPlanoTrabalho/estaNoPlanoTrabalho?planoTrabalhoId=${planoId}`, {
        method: 'GET', cache: "no-cache", headers: {
            "Authorization": recuperarToken()!
        }
    }).then(r => r.status === 200 ? r.json() : []);
    return resp;
}

export async function consultaPlanoTrabalho(id: number): Promise<PlanoTrabalhoModel> {
    const resp: Promise<PlanoTrabalhoModel> = fetch(apiAddress + `/planoTrabalho/${id}`, {
        method: 'GET', cache: "no-cache", headers: {
            "Authorization": recuperarToken()!
        }
    }).then(r => r.status === 200 ? r.json() : undefined);
    return resp;
}

// Processo Seletivo

export async function consultaProcessoSeletivo(id: number): Promise<ProcessoSeletivoDTO> {
    const resp: Promise<ProcessoSeletivoDTO> = fetch(apiAddress + `/processoSeletivo/${id}`, {
        method: 'GET', cache: "no-cache", headers: {
            "Authorization": recuperarToken()!
        }
    }).then(r => r.status === 200 ? r.json() : undefined);
    return resp;
}

export async function consultaPlanoTrabalhosProcessoSeletivo(): Promise<ProcessoSeletivoPlanoTrabalhoDTO[]> {
    const resp: Promise<ProcessoSeletivoPlanoTrabalhoDTO[]> = fetch(apiAddress + `/processoSeletivo/planoTrabalhoDisponiveis`, {
        method: 'GET', cache: "no-cache", headers: {
            "Authorization": recuperarToken()!
        }
    }).then(r => r.status === 200 ? r.json() : undefined);
    return resp;
}

// END

// UsuarioProcessoSeleteivo


// END