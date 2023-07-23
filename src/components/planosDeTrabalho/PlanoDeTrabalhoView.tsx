"use client";
import { useAuthContext } from "@/context/AuthenticateContext";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import PlanoDeTrabalhoSimple from "./PlanoDeTrabalhoSimple";
import PlanosDeTrabalhoForms from "./PlanosDeTrabalhoForms";
import { UsuarioNovoPlanoProjection } from "@/model/planoDeTrabalho/UsuarioNovoPlanoProjection";

export interface PlanosDeTrabalhoFormsProps {
    plano: PlanoTrabalhoModel;
    pesquisadores: UsuarioNovoPlanoProjection[];
}

export default function PlanoDeTrabalhoView({ plano, pesquisadores }: PlanosDeTrabalhoFormsProps) {

    const { userDetails } = useAuthContext();

    if (userDetails?.scope.includes("ROLE_ADMIN")) {
        return <PlanosDeTrabalhoForms plano={plano} pesquisadores={pesquisadores} />
    } else {
        return <PlanoDeTrabalhoSimple plano={plano} pesquisadores={pesquisadores} />
    }

}