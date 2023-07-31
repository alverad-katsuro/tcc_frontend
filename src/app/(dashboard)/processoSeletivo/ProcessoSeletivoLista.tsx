"use client";

import { Card } from "@/components/flowbite-components";
import imageMock from "@/images/bannerUFPA.png";
import { ProcessoSeletivoDTO } from "@/model/processoSeletivo/ProcessoSeletivoDTO";
import Link from "next/link";

export interface PlanoTrabalhoListaProps {
    processoSeletivoDTO: ProcessoSeletivoDTO[];
}

export default function ProcessoSeletivoLista({ processoSeletivoDTO }: PlanoTrabalhoListaProps) {

    return (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

                {processoSeletivoDTO.map((e) =>
                    <Link href={`/processoSeletivo/${e.id}`} key={e.id} >

                        <Card imgSrc={imageMock.src} key={e.id}>
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