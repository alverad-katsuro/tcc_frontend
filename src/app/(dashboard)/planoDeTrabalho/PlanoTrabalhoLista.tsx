"use client";

import { Card } from "@/components/flowbite-components";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import { loaderExternalImage } from "@/utils/LoaderExternalImage";
import Image from "next/image";
import Link from "next/link";

export interface PlanoTrabalhoListaProps {
    planosTrabalhos: PlanoTrabalhoModel[];
}

export default function PlanoTrabalhoLista({ planosTrabalhos }: PlanoTrabalhoListaProps) {

    return (

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-y-4">

            {planosTrabalhos.map((e) =>
                <Link href={`/planoDeTrabalho/${e.id}`} key={e.id} className="grow sm:basis-1/2 xl:basis-1/3 px-2 max-w-md">
                    <Card key={e.id} >
                        <div className="w-44 h-44 sm:w-72 sm:h-72 object-none relative justify-self-center">
                            <Image
                                priority
                                fill
                                src={e.capaUrl ?? ""}
                                className="object-cover rounded-3xl"
                                loader={loaderExternalImage}
                                alt="foto de perfil" /> : <></>
                        </div>
                        <div className="overflow-auto max-h-64 gap-4 gap flex flex-col ">
                            <p className="text-2xl text-gray-900 dark:text-white break-all text-justify">
                                <strong>Título:</strong> {e.titulo}
                            </p>

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