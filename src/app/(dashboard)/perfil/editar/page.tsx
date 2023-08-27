import { recuperarPerfil } from "@/api/apiFetch";
import PerfilForm from "./PerfilForm";

export default async function PerfilEditar() {

    const perfil = await recuperarPerfil();

    return (
        <PerfilForm userKeycloak={perfil} />
    )

}