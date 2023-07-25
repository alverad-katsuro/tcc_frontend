import { consultaPlanoTrabalho, consultarPesquisadores } from "@/api/apiFetch";
import PlanoDeTrabalhoView from "@/components/planosDeTrabalho/PlanoDeTrabalhoView";
import { UsuarioNovoPlanoProjection } from "@/model/planoDeTrabalho/UsuarioNovoPlanoProjection";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";

export default async function AtualizarPlanoTrabalho({ params }: { params: { id: number } }) {

    const plano: PlanoTrabalhoModel = await consultaPlanoTrabalho(params.id);

    const pesquisadores: UsuarioNovoPlanoProjection[] = await consultarPesquisadores(params.id);
    console.log(plano);
    return (
        <main className="flex flex-col items-center justify-between p-16 overflow-auto gap-4">

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Plano de Trabalho</h5>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full">
                <PlanoDeTrabalhoView plano={plano} pesquisadores={pesquisadores} />
            </div>
        </main>
    )
}