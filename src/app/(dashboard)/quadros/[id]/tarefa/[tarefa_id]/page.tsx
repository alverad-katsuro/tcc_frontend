"use client";
import { consultaPlanoTrabalho } from "@/api/api";
import DescricaoTarefa from "./DescricaoModal";

export default async function AtualizarTarefa({ params }: { params: { tarefa_id: number } }) {

    const task: any = await consultaPlanoTrabalho(params.tarefa_id); // FIXME asdsadsad

    return (
        <main>asdsadsadsadasd</main>
    )
}