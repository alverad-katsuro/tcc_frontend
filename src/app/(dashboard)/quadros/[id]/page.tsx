import { consultarTarefas } from "@/api/apiFetch";
import BoardSectionList from "@/components/quadro/BoardSectionList";
import { TarefaDTO } from "@/model/quadro";

export default async function Quadro({ params }: { params: { id: number } }) {

    const tarefas: TarefaDTO[] = await consultarTarefas(params.id);

    return (
        <main className="overflow-y-hidden h-modal mx-6 mt-4 xl:mx-16">

            <BoardSectionList tarefasIniciais={tarefas} quadroId={params.id} />;

        </main>

    )

}