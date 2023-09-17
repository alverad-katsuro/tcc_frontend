import { recuperarPerfil } from "@/api/apiFetch";
import { Profile } from "./Profile";

export default async function Page() {

    const perfil = await recuperarPerfil();

    return (
        <Profile user={perfil} />
    )
}