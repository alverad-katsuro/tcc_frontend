"use client";
import { ProcessoSeletivoDTO, ProcessoSeletivoPlanoTrabalhoDTO } from "@/model/processoSeletivo/ProcessoSeletivoDTO";
import { Button } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import InscricaoModal from "./InscricaoModal";
import ProcessoSeletivoForms from "./ProcessoSeletivoForms";
import ProcessoSeletivoSimple from "./ProcessoSeletivoSimple";

export interface ProcessoSeletivoProps {
    processoSeletivo: ProcessoSeletivoDTO;
    planosTrabalho: ProcessoSeletivoPlanoTrabalhoDTO[];
}

export default async function ProcessoSeletivoView({ planosTrabalho, processoSeletivo }: ProcessoSeletivoProps) {

    const { data } = useSession();

    const [show, setShow] = useState<boolean>(false);

    if (data?.user?.role?.includes("ROLE_ADMIN")) {
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