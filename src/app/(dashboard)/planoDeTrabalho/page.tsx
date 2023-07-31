import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import PlanoTrabalhoLista from "./PlanoTrabalhoLista";
import { apiAddress } from "@/api/apiOptions";
import { PageInterface } from "@/interface/PageInterface";
import { recuperarToken } from "@/service/auth";


async function consultarPlanos(): Promise<PageInterface<PlanoTrabalhoModel>> {
    const resp: Promise<PageInterface<PlanoTrabalhoModel>> = fetch(apiAddress + "/planoTrabalho", {
        method: 'GET', cache: "no-cache", headers: {
            "Authorization": recuperarToken()!
        }
    }).then(r => r.json());
    return resp;

}


export default async function PlanosDeTrabalho() {

    const planos: PageInterface<PlanoTrabalhoModel> = await consultarPlanos();

    return (

        <main className="flex flex-col items-center justify-between p-16 overflow-auto">

            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Planos de Trabalho</h1>

            <PlanoTrabalhoLista planosTrabalhos={planos.content}/>

        </main>

    )


}