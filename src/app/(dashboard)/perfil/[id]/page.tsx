import Profile from "@/app/(dashboard)/perfil/Profile";
import { recuperarPerfilAdm } from "@/api/apiFetch";

export default async function Page({ params }: { params: { id: string } }) {

    const perfil = await recuperarPerfilAdm(params.id);

    return (
        <Profile user={perfil} />
    )
}