"use client";
import { criarInscricao, estouNoProcesso } from "@/api/api";
import { ProcessoSeletivoDTO, ProcessoSeletivoPlanoTrabalhoDTO } from "@/model/processoSeletivo/ProcessoSeletivoDTO";
import { notification } from "@/utils/Notification";
import { Button } from "flowbite-react";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProcessoSeletivoForms from "./ProcessoSeletivoForms";
import ProcessoSeletivoSimple from "./ProcessoSeletivoSimple";

export interface ProcessoSeletivoProps {
    processoSeletivo: ProcessoSeletivoDTO;
    planosTrabalho: ProcessoSeletivoPlanoTrabalhoDTO[];
}

export default function ProcessoSeletivoView({ planosTrabalho, processoSeletivo }: ProcessoSeletivoProps) {

    const { data, status } = useSession();

    // const [noProcesso, setNoProcesso] = useState(false);

    // useEffect(() => {
    //     if (processoSeletivo.id) {
    //         estouNoProcesso(processoSeletivo.id).then((r) => setNoProcesso(r));
    //     }
    // }, [])

    function validaRegistro() {
        if (data?.user?.lattes === undefined) {
            notification("Preencha seus dados de perfil", 'warning');
            setTimeout(() => window.location.href = "/perfil/editar", 2000)
        } else {
            alert("vai madnar request")
            if (processoSeletivo.id) {
                criarInscricao(processoSeletivo.id).then((r) => {
                    notification(r, 'success');
                    window.location.reload();
                }).catch((e) => {
                    notification(e.response.data.message, 'error');
                })

            }
        }

    }

    if (data?.user?.role?.includes("ROLE_ADMIN")) {
        return <ProcessoSeletivoForms planosTrabalho={planosTrabalho} processoSeletivo={processoSeletivo} />
    } else if (processoSeletivo.inscrito) {
        return <ProcessoSeletivoSimple planosTrabalho={planosTrabalho} processoSeletivo={processoSeletivo} />
    } else {
        return (
            <>
                <ProcessoSeletivoSimple planosTrabalho={planosTrabalho} processoSeletivo={processoSeletivo} />
                {status === "authenticated" ?
                    <Button onClick={validaRegistro} className="mx-auto">{processoSeletivo.inscrito ? "Estou Inscrito" : "Inscrever-se"}</Button>
                    :
                    <Button onClick={() => signIn("keycloak")} className="mx-auto">Inscrever-se</Button>

                }
            </>
        )
    }

}