import { consultaPlanoTrabalho } from "@/api/apiFetch";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import PlanoTrabalhoModal from "./PlanoTrabalhoModal";

export default async function AtualizarPlanoTrabalho({ params }: { params: { id: number } }) {

    const plano: PlanoTrabalhoModel = await consultaPlanoTrabalho(params.id);

    return (
        <PlanoTrabalhoModal planoTrabalho={plano} />
    )
}