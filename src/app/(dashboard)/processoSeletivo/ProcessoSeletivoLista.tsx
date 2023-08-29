"use client";

import { Card } from "@/components/flowbite-components";
import { ProcessoSeletivoDTO } from "@/model/processoSeletivo/ProcessoSeletivoDTO";
import Image from "next/image";
import Link from "next/link";

export interface PlanoTrabalhoListaProps {
    processoSeletivoDTO: ProcessoSeletivoDTO[];
}

export default function ProcessoSeletivoLista({ processoSeletivoDTO }: PlanoTrabalhoListaProps) {

    return (

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-y-4">

            {processoSeletivoDTO.map((e) =>
                <Link href={`/processoSeletivo/${e.id}`} key={e.id} className="grow sm:basis-1/2 xl:basis-1/3 px-2 max-w-md" >
                    <Card key={e.id}>
                        <div className="w-44 h-44 sm:w-72 sm:h-72 object-none relative justify-self-center">
                            <Image priority fill src={e.planoTrabalho.capaUrl ?? ""} className="object-cover rounded-3xl" alt="foto de perfil" /> : <></>
                        </div>
                        <div className="overflow-auto max-h-64 gap-4 gap flex flex-col">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                <strong>Título:</strong> {e.planoTrabalho.titulo}
                            </h5>

                            <p className="font-normal text-gray-800 dark:text-white">
                                {e.areaInteresse}
                            </p>
                            <div dangerouslySetInnerHTML={{ __html: e.requisitos }} className='text-gray-700 dark:text-gray-400 overflow-auto max-h-64' />

                        </div>

                    </Card>
                </Link>
            )}


        </div>


    )
}