"use client";
import { useAuthContext } from "@/context/AuthenticateContext";
import { ProcessoSeletivoDTO, ProcessoSeletivoPlanoTrabalhoDTO } from "@/model/processoSeletivo/ProcessoSeletivoDTO";
import ProcessoSeletivoForms from "./ProcessoSeletivoForms";
import ProcessoSeletivoSimple from "./ProcessoSeletivoSimple";
import InscricaoModal from "./InscricaoModal";
import { useState } from "react";
import { Button } from "flowbite-react";

export interface ProcessoSeletivoProps {
    processoSeletivo: ProcessoSeletivoDTO;
    planosTrabalho: ProcessoSeletivoPlanoTrabalhoDTO[];
}

export default async function ProcessoSeletivoView({ planosTrabalho, processoSeletivo }: ProcessoSeletivoProps) {

    const { userDetails } = useAuthContext();

    const [show, setShow] = useState<boolean>(false);


    if (userDetails?.scope.includes("ROLE_ADMIN")) {
        return <ProcessoSeletivoForms planosTrabalho={planosTrabalho} processoSeletivo={processoSeletivo} />
    } else if (processoSeletivo.inscrito) {
        return <ProcessoSeletivoSimple planosTrabalho={planosTrabalho} processoSeletivo={processoSeletivo} />
    } else {
        return (
            <>
                <InscricaoModal processoSeletivo={processoSeletivo} stateModal={[show, setShow]} />
                <ProcessoSeletivoSimple planosTrabalho={planosTrabalho} processoSeletivo={processoSeletivo} />
                <Button onClick={() => setShow(e => !e)} className="mx-auto">Inscrever-se</Button>
            </>
        )
    }

}