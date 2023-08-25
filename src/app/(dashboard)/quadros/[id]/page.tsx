import { consultarPesquisadoresNoPlano, consultarTarefas } from "@/api/apiFetch";
import BoardSectionList from "@/components/quadro/BoardSectionList";
import { UsuarioPlanoProjection } from "@/model/planoDeTrabalho/UsuarioPlanoProjection";
import { TarefaBasicDTO } from "@/model/quadro";

export default async function Quadro({ params }: { params: { id: number } }) {

    const tarefas: TarefaBasicDTO[] = await consultarTarefas(params.id);

    const pesquisadoresPlano: UsuarioPlanoProjection[] = await consultarPesquisadoresNoPlano(params.id);

    return (
        <main className="overflow-y-hidden h-modal mx-6 mt-4 xl:mx-16">

            <BoardSectionList tarefasIniciais={tarefas} quadroId={params.id} pesquisadores={pesquisadoresPlano} />;

        </main>

    )

}