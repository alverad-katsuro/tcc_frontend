import { apiAddress } from "@/api/apiOptions";
import { PageInterface } from "@/interface/PageInterface";
import { ProcessoSeletivoDTO } from "@/model/processoSeletivo/ProcessoSeletivoDTO";
import { recuperarToken } from "@/service/auth";
import ProcessoSeletivoLista from "./ProcessoSeletivoLista";


async function consultarProcessoSeletivo(): Promise<PageInterface<ProcessoSeletivoDTO> | undefined> {
    const resp: Promise<PageInterface<ProcessoSeletivoDTO>> = fetch(apiAddress + "/processoSeletivo", {
        method: 'GET', cache: "no-cache", headers: {
            "Authorization": await recuperarToken()
        }
    }).then(r => r.json()).catch(e => undefined);

    return resp;

}


export default async function ProcessoSeletivo() {

    const planos: PageInterface<ProcessoSeletivoDTO> | undefined = await consultarProcessoSeletivo();

    if (planos === undefined) {

        return (

            <main className="flex flex-col items-center justify-between p-16 overflow-auto">

                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Sem Processos Seletivos cadastrados</h1>


            </main>

        )

    }

    return (

        <main className="flex flex-col items-center justify-between p-16 overflow-auto">

            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Processos Seletivos</h1>

            <ProcessoSeletivoLista processoSeletivoDTO={planos.content} />

        </main>

    )


}