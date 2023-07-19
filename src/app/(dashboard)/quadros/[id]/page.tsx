import { consultarTarefas } from "@/api/apiFetch";
import BoardSectionList from "@/components/quadro/BoardSectionList";
import { TarefaDocument } from "@/model/quadro";

export default async function Quadro({ params }: { params: { id: number } }) {

    let tarefas: TarefaDocument[] = await consultarTarefas(params.id);

    return (
        <main className="justify-between overflow-hidden h-modal mx-6 mt-4 xl:mx-16">

            <BoardSectionList tarefasIniciais={tarefas} />;

        </main>

    )

}