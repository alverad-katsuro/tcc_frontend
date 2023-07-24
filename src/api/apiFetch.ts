import { PageInterface } from "@/interface/PageInterface";
import { TarefaDocument } from "@/model/quadro";
import { QuadroPainelDTO } from "@/model/quadro/dto/QuadroPainelDTO";
import { recuperarToken } from "@/service/auth";
import { apiAddress } from "./apiOptions";
import { UsuarioNovoPlanoProjection } from "@/model/planoDeTrabalho/UsuarioNovoPlanoProjection";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";

export async function consultarQuadrosPainel(): Promise<PageInterface<QuadroPainelDTO>> {
    const resp: Promise<PageInterface<QuadroPainelDTO>> = fetch(apiAddress + "/quadro/painel", {
        method: 'GET', cache: "no-cache", headers: {
            "Authorization": recuperarToken()!
        }
    }).then(r => r.json());
    return resp;
}


export async function consultarTarefas(quadro: number): Promise<TarefaDocument[]> {
    const resp: Promise<TarefaDocument[]> = fetch(apiAddress + `/tarefas/${quadro}`, {
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
    }).then(r => r.status === 200 ? r.json() : []);
    return resp;
}


// export async function consultaPlanoTrabalho(id: number): Promise<PlanoTrabalhoModel> {
//     const resp = (await apiAxios.get<PlanoTrabalhoModel>(`/planoTrabalho/${id}`));
//     return resp.data;
//}