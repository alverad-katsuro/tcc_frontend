import { PageInterface } from "@/interface/PageInterface";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import PlanoTrabalhoLista from "./PlanoTrabalhoLista";
import { consultarPlanos } from "@/api/apiFetch";





export default async function PlanosDeTrabalho() {

    const planos: PageInterface<PlanoTrabalhoModel> | undefined = await consultarPlanos();

    if (planos === undefined) {

        return (

            <main className="flex flex-col items-center justify-between p-16 overflow-auto">

                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Sem Planos de Trabalho cadastrados</h1>


            </main>

        )

    }

    return (

        <main className="flex flex-col items-center justify-between p-16 overflow-auto">

            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Planos de Trabalho</h1>

            <PlanoTrabalhoLista planosTrabalhos={planos.content} />

        </main>

    )


}