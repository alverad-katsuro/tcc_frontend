"use client";
import PlanoTrabalhoModal from "@/app/(dashboard)/planosDeTrabalho/PlanoTrabalhoModal";

import { Card } from "@/components/flowbite-components";
import imageMock from "@/images/bannerUFPA.png";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import { Suspense, useState } from "react";

export interface PlanoTrabalhoListaProps {
    planosTrabalhos: PlanoTrabalhoModel[];
}

export default function PlanoTrabalhoLista({ planosTrabalhos }: PlanoTrabalhoListaProps) {

    const [open, setOpen] = useState<boolean>(false);

    const [planoTrabalho, setPlanoTrabalho] = useState<PlanoTrabalhoModel>();

    function openModal(planoTrabalho: PlanoTrabalhoModel) {

        setPlanoTrabalho(planoTrabalho);
        setOpen(!open);
    }

    return (

        <>
            <Suspense>
                <PlanoTrabalhoModal planoTrabalho={planoTrabalho} open={open} onClose={setOpen} />
            </Suspense>

            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Planos de Trabalho</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

                {planosTrabalhos.map((e) =>
                    <Card imgSrc={imageMock.src} key={e.id} onClick={() => openModal(e)}>
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

                )}


            </div>

        </>


    )
}