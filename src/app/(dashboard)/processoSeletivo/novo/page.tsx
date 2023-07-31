import { consultaPlanoTrabalhosProcessoSeletivo } from "@/api/apiFetch";
import ProcessoSeletivoForms from "@/components/processoSeletivo/ProcessoSeletivoForms";
import { ProcessoSeletivoDTO } from "@/model/processoSeletivo/ProcessoSeletivoDTO";

export default async function NovoPlanoTrabalho() {

    const processoSeletivo: ProcessoSeletivoDTO = {
        areaInteresse: '',
        inicio: '',
        fim: '',
        requisitos: '',
        planoTrabalho: {
            titulo: '',
        },
        candidatos: []
    };

    const planosTrabalho = await consultaPlanoTrabalhosProcessoSeletivo();

    return (
        <main className="flex flex-col items-center justify-between p-16 overflow-auto gap-4">

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Cadastrar Plano de Trabalho</h5>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full">
                <ProcessoSeletivoForms processoSeletivo={processoSeletivo} planosTrabalho={planosTrabalho} />
            </div>
        </main>

    )
}