import { consultarPesquisadores } from "@/api/apiFetch";
import PlanosDeTrabalhoForms from "@/components/planosDeTrabalho/PlanosDeTrabalhoForms";
import { UsuarioNovoPlanoProjection } from "@/model/planoDeTrabalho/UsuarioNovoPlanoProjection";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";

export default async function NovoPlanoTrabalho() {

    const pesquisadores: UsuarioNovoPlanoProjection[] = await consultarPesquisadores();

    const plano: PlanoTrabalhoModel = {
        id: undefined,
        titulo: '',
        areaTrabalho: '',
        descricao: '',
        recursoMateriais: [
            {
                descricao: ""
            }
        ],
        objetivos: [
            {
                descricao: ""
            }
        ]
    };

    return (
        <main className="flex flex-col items-center justify-between p-16 overflow-auto gap-4">

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Cadastrar Plano de Trabalho</h5>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full">
                <PlanosDeTrabalhoForms plano={plano} pesquisadoresInit={pesquisadores} />
            </div>
        </main>

    )
}