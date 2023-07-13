import { useAuthContext } from "@/context/AuthenticateContext";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import PlanoDeTrabalhoSimple from "./PlanoDeTrabalhoSimple";
import PlanosDeTrabalhoForms from "./PlanosDeTrabalhoForms";

export interface PlanosDeTrabalhoFormsProps {
    plano: PlanoTrabalhoModel;
}

export default function PlanoDeTrabalhoView({ plano }: PlanosDeTrabalhoFormsProps) {

    const { userDetails } = useAuthContext();

    if (userDetails?.scope.includes("ROLE_ADMIN")) {
        return <PlanosDeTrabalhoForms plano={plano} />
    } else {
        return <PlanoDeTrabalhoSimple plano={plano} />
    }

}