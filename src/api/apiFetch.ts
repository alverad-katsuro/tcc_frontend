import { PageInterface } from "@/interface/PageInterface";
import { TarefaDocument } from "@/model/quadro";
import { QuadroPainelDTO } from "@/model/quadro/dto/QuadroPainelDTO";
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


export async function consultarTarefas(quadro: number): Promise<TarefaDocument[]> {
    const resp: Promise<TarefaDocument[]> = fetch(apiAddress + `/tarefas/${quadro}`, {
        method: 'GET', cache: "no-cache", headers: {
            "Authorization": recuperarToken()!
        }
    }).then(r => r.status === 200 ? r.json() : []);
    return resp;
}