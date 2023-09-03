"use client";
import { criarInscricao } from "@/api/api";
import { ProcessoSeletivoDTO, ProcessoSeletivoPlanoTrabalhoDTO } from "@/model/processoSeletivo/ProcessoSeletivoDTO";
import { notification } from "@/utils/Notification";
import { Button } from "flowbite-react";
import { signIn, useSession } from "next-auth/react";
import ProcessoSeletivoForms from "./ProcessoSeletivoForms";
import ProcessoSeletivoSimple from "./ProcessoSeletivoSimple";

export interface ProcessoSeletivoProps {
    processoSeletivo: ProcessoSeletivoDTO;
    planosTrabalho: ProcessoSeletivoPlanoTrabalhoDTO[];
}

export default function ProcessoSeletivoView({ planosTrabalho, processoSeletivo }: ProcessoSeletivoProps) {

    const { data, status } = useSession();

    function validaRegistro() {
        if (data?.user?.lattes === undefined) {
            notification("Preencha seus dados de perfil", 'warning');
            setTimeout(() => window.location.href = "/perfil/editar", 2000)
        } else {
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