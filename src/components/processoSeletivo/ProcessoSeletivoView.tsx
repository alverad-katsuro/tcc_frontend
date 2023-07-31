"use client";
import { useAuthContext } from "@/context/AuthenticateContext";
import { ProcessoSeletivoDTO, ProcessoSeletivoPlanoTrabalhoDTO } from "@/model/processoSeletivo/ProcessoSeletivoDTO";
import ProcessoSeletivoForms from "./ProcessoSeletivoForms";
import ProcessoSeletivoSimple from "./ProcessoSeletivoSimple";

export interface ProcessoSeletivoProps {
    processoSeletivo: ProcessoSeletivoDTO;
    planosTrabalho: ProcessoSeletivoPlanoTrabalhoDTO[];
}

export default function ProcessoSeletivoView({ planosTrabalho, processoSeletivo }: ProcessoSeletivoProps) {

    const { userDetails } = useAuthContext();
    if (userDetails?.scope.includes("ROLE_ADMIN")) {
        return <ProcessoSeletivoForms planosTrabalho={planosTrabalho} processoSeletivo={processoSeletivo} />
    } else {
        return <ProcessoSeletivoSimple planosTrabalho={planosTrabalho} processoSeletivo={processoSeletivo} />
    }

}