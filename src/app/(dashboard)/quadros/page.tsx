import { consultarQuadrosPainel } from "@/api/apiFetch";
import { PageInterface } from "@/interface/PageInterface";
import { QuadroPainelDTO } from "@/model/quadro/dto/QuadroPainelDTO";

export default async function Quadros() {

    const quadros: PageInterface<QuadroPainelDTO> = await consultarQuadrosPainel();

    return (
        <main className="justify-between overflow-auto mx-6 mt-10 xl:mx-32 xl:mt-10">


            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {quadros.content.map(q =>
                    <div key={q.id} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 max-h-64">
                        <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2 line-clamp-4 h-4/5">{q.titulo}</h2>
                        <a href={`/quadros/${q.id}`} className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Abrir
                            <svg aria-hidden="true" className="w-4 h-4 ml-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </a>
                    </div>
                )}

            </div>
        </main>
    )

}