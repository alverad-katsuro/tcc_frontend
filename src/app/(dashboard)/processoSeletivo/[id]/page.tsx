import { consultaPlanoTrabalhosProcessoSeletivo, consultaProcessoSeletivo } from "@/api/apiFetch";
import ProcessoSeletivoView from "@/components/processoSeletivo/ProcessoSeletivoView";
import { ProcessoSeletivoDTO, ProcessoSeletivoPlanoTrabalhoDTO } from "@/model/processoSeletivo/ProcessoSeletivoDTO";

export default async function AtualizarProcessoSeletivo({ params }: { params: { id: number } }) {

    const processoSeletivo: ProcessoSeletivoDTO = await consultaProcessoSeletivo(params.id);

    const planosTrabalho: ProcessoSeletivoPlanoTrabalhoDTO[] = await consultaPlanoTrabalhosProcessoSeletivo();

    if (planosTrabalho.length == 0) {
        planosTrabalho.push(processoSeletivo.planoTrabalho);
    }

    return (
        <main className="flex flex-col items-center justify-between p-16 overflow-auto gap-4">

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Plano de Trabalho</h5>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full">
                <ProcessoSeletivoView processoSeletivo={processoSeletivo} planosTrabalho={planosTrabalho} />
            </div>
        </main>
    )
}