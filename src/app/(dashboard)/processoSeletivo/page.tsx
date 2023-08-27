import { consultarProcessos } from "@/api/apiFetch";
import { PageInterface } from "@/interface/PageInterface";
import { ProcessoSeletivoDTO } from "@/model/processoSeletivo/ProcessoSeletivoDTO";
import ProcessoSeletivoLista from "./ProcessoSeletivoLista";

export default async function ProcessoSeletivo() {

    const planos: PageInterface<ProcessoSeletivoDTO> | undefined = await consultarProcessos();

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