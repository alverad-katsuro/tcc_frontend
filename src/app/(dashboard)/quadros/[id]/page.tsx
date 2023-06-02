import KanbanLocao from "../../planosDeTrabalho/[id]";


export default function Quadro({ params }: { params: { id: number } }) {

    return (
        <main className="justify-between overflow-auto mx-6 mt-10 xl:mx-32 xl:mt-10">

            <KanbanLocao/>
        </main>

    )

}