"use client";
import { Card } from "@/components/flowbite-components";
import imageMock from "@/images/bannerUFPA.png"
import planosMock from "@/mock/PlanoTrabalho.json"
import { PlanoModel } from "@/model/response/PlanoModel";
import PlanoTrabalhoModal from "@/app/(dashboard)/planosDeTrabalho/PlanoTrabalhoModal";
import { Suspense, useState } from "react";

const planos: PlanoModel[] = JSON.parse(JSON.stringify(planosMock));
export default function PlanosDeTrabalho() {

    const [planoTrabalho, setPlanoTrabalho] = useState<PlanoModel>();
    const [open, setOpen] = useState<boolean>(false);

    function openModal(planoTrabalho: PlanoModel) {

        setPlanoTrabalho(planoTrabalho);
        setOpen(!open);
    }

    return (

        <main className="flex flex-col items-center justify-between p-16 overflow-auto">
            <Suspense>
                <PlanoTrabalhoModal planoTrabalho={planoTrabalho} open={open} onClose={setOpen} />
            </Suspense>

            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Planos de Trabalho</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

                {planos.map((e) =>
                    <Card imgSrc={imageMock.src} key={e.id} onClick={() => openModal(e)}>
                        <div className="overflow-auto max-h-64 gap-4 gap flex flex-col">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                <strong>Título:</strong> {e.titulo}
                            </h5>

                            <p className="font-normal text-gray-800 dark:text-white">
                                {e.areaTrabalho}
                            </p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {e.descricao}
                            </p>

                        </div>

                    </Card>

                )}


            </div>

        </main>


    )
}