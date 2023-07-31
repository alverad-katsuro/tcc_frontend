"use client";

import { Card } from "@/components/flowbite-components";
import imageMock from "@/images/bannerUFPA.png";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import Link from "next/link";

export interface PlanoTrabalhoListaProps {
    planosTrabalhos: PlanoTrabalhoModel[];
}

export default function PlanoTrabalhoLista({ planosTrabalhos }: PlanoTrabalhoListaProps) {

    return (

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

            {planosTrabalhos.map((e) =>
                <Link href={`/planoDeTrabalho/${e.id}`} key={e.id} >

                    <Card imgSrc={imageMock.src} key={e.id}>
                        <div className="overflow-auto max-h-64 gap-4 gap flex flex-col">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                <strong>Título:</strong> {e.titulo}
                            </h5>

                            <p className="font-normal text-gray-800 dark:text-white">
                                {e.areaTrabalho}
                            </p>
                            <div dangerouslySetInnerHTML={{ __html: e.descricao }} className='text-gray-700 dark:text-gray-400 overflow-auto max-h-64' />

                        </div>

                    </Card>
                </Link>
            )}


        </div>



    )
}