"use client";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import PlanoDeTrabalhoSimple from "./PlanoDeTrabalhoSimple";
import PlanosDeTrabalhoForms from "./PlanosDeTrabalhoForms";
import { UsuarioNovoPlanoProjection } from "@/model/planoDeTrabalho/UsuarioNovoPlanoProjection";
import { useSession } from "next-auth/react";

export interface PlanosDeTrabalhoFormsProps {
    plano: PlanoTrabalhoModel;
    pesquisadores: UsuarioNovoPlanoProjection[];
}

export default function PlanoDeTrabalhoView({ plano, pesquisadores }: PlanosDeTrabalhoFormsProps) {

    const { data } = useSession();
    if (data?.user?.role?.includes("ROLE_ADMIN")) {
        return <PlanosDeTrabalhoForms plano={plano} pesquisadores={pesquisadores} />
    } else {
        return <PlanoDeTrabalhoSimple plano={plano} pesquisadores={pesquisadores} />
    }

}