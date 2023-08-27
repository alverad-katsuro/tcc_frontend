"use client";
import { ProcessoSeletivoDTO, ProcessoSeletivoPlanoTrabalhoDTO } from "@/model/processoSeletivo/ProcessoSeletivoDTO";
import { notification } from "@/utils/Notification";
import { Button } from "flowbite-react";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import InscricaoModal from "./InscricaoModal";
import ProcessoSeletivoForms from "./ProcessoSeletivoForms";
import ProcessoSeletivoSimple from "./ProcessoSeletivoSimple";

export interface ProcessoSeletivoProps {
    processoSeletivo: ProcessoSeletivoDTO;
    planosTrabalho: ProcessoSeletivoPlanoTrabalhoDTO[];
}

export default function ProcessoSeletivoView({ planosTrabalho, processoSeletivo }: ProcessoSeletivoProps) {

    const { data, status } = useSession();

    const [show, setShow] = useState<boolean>(false);

    function validaRegistro() {
        if (data?.user?.lattes === undefined) {
            notification("Preencha seus dados de perfil", 'warning');
            setTimeout(() => window.location.href = "/perfil/editar", 2000)
        } else {
            setShow(e => !e)
        }

    }

    if (data?.user?.role?.includes("ROLE_ADMIN")) {
        return <ProcessoSeletivoForms planosTrabalho={planosTrabalho} processoSeletivo={processoSeletivo} />
    } else if (processoSeletivo.inscrito) {
        return <ProcessoSeletivoSimple planosTrabalho={planosTrabalho} processoSeletivo={processoSeletivo} />
    } else {
        return (
            <>
                <InscricaoModal processoSeletivo={processoSeletivo} stateModal={[show, setShow]} />
                <ProcessoSeletivoSimple planosTrabalho={planosTrabalho} processoSeletivo={processoSeletivo} />
                {status === "authenticated" ?
                    <Button onClick={validaRegistro} className="mx-auto">Inscrever-se</Button>
                    :
                    <Button onClick={() => signIn("keycloak")} className="mx-auto">Inscrever-se</Button>

                }
            </>
        )
    }

}