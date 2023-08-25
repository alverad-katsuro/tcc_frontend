"use client";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import PlanoDeTrabalhoSimple from "./PlanoDeTrabalhoSimple";
import PlanosDeTrabalhoForms from "./PlanosDeTrabalhoForms";
import { useSession } from "next-auth/react";
import { UsuarioNovoPlanoProjection } from "@/model/planoDeTrabalho/UsuarioNovoPlanoProjection";

export interface PlanosDeTrabalhoFormsProps {
    plano: PlanoTrabalhoModel;
    pesquisadores: UsuarioNovoPlanoProjection[];
}

export default function PlanoDeTrabalhoView({ plano, pesquisadores }: PlanosDeTrabalhoFormsProps) {

    const { data } = useSession();
    if (data?.user?.role?.includes("ROLE_ADMIN")) {
        return <PlanosDeTrabalhoForms plano={plano} pesquisadores={pesquisadores} />
    } else {
        //@ts-ignore
        return <PlanoDeTrabalhoSimple plano={plano} pesquisadores={pesquisadores} />
    }

}