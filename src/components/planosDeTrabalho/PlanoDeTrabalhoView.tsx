"use client";
import { UsuarioNovoPlanoProjection } from "@/model/planoDeTrabalho/UsuarioNovoPlanoProjection";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import { useSession } from "next-auth/react";
import PlanoDeTrabalhoSimple from "./PlanoDeTrabalhoSimple";
import PlanosDeTrabalhoForms from "./PlanosDeTrabalhoForms";

export interface PlanosDeTrabalhoFormsProps {
    plano: PlanoTrabalhoModel;
    pesquisadores: UsuarioNovoPlanoProjection[];
}

export default function PlanoDeTrabalhoView({ plano, pesquisadores }: PlanosDeTrabalhoFormsProps) {

    const { data } = useSession();
    if (data?.user?.role?.includes("ROLE_ADMIN")) {
        return <PlanosDeTrabalhoForms plano={plano} pesquisadoresInit={pesquisadores} />
    } else {
        //@ts-ignore
        return <PlanoDeTrabalhoSimple plano={plano} pesquisadores={pesquisadores} />
    }

}