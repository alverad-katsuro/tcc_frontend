import { Label, Table, TextInput } from "@/components/flowbite-components";
import { UsuarioNovoPlanoProjection } from "@/model/planoDeTrabalho/UsuarioNovoPlanoProjection";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import ObjetivoSimple from "./ObjetivoSimple";
import RecursosMateriaisSimple from "./RecursosMateriaisSimple";
import { Suspense } from "react";
import Image from "next/image";

export interface PlanosDeTrabalhoFormsProps {
    plano: PlanoTrabalhoModel;
    pesquisadores: UsuarioNovoPlanoProjection[];
}
export default async function PlanoDeTrabalhoSimple({ plano }: PlanosDeTrabalhoFormsProps) {

    return (
        <>
            {plano.capaUrl !== undefined &&
                <Image src={plano.capaUrl} loading="lazy" width={300} quality={100} height={300} alt="Banner do Plano de Trabalho" className="mx-auto w-full max-w-[30%] h-auto rounded-lg" />
            }
            <div className="col-span-full">
                <div className="mb-2 block">
                    <Label
                        htmlFor="titulo"
                        value="Titulo do Trabalho"
                    />
                </div>
                <TextInput
                    id="titulo"
                    type="text"
                    sizing="md"
                    placeholder="Titulo"
                    disabled
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="areaTrabalho"
                        value="Area de Trabalho"
                    />
                </div>
                <TextInput
                    id="areaTrabalho"
                    type="text"
                    sizing="md"
                    placeholder="Computação; Inteligência Artificial"
                    disabled
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="descricao"
                        value="Descrição"
                    />
                </div>
                <div dangerouslySetInnerHTML={{ __html: plano.descricao }} className=' text-gray-900 dark:text-white my-4 flex-auto overflow-auto max-h-64' />
            </div>
            <div className="col-span-full grid gap-4">
                <div className="grid grid-cols-2">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white self-center">Objetivos</h5>
                </div>
                <div className="col-span-full grid gap-5">

                    {plano.objetivos.map((e, i) =>
                        <ObjetivoSimple objetivo={e} key={e.id} />
                    )}

                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white self-center">Recursos Humanos</h5>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-auto  max-h-60">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>
                                    Pesquisadores Disponiveis
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {plano.pesquisadores?.map((e) =>
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={e.id}>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {e.nome}
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
            <div className="col-span-full grid gap-4">
                <div className="grid grid-cols-2">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white self-center">Recursos Materiais</h5>
                </div>
                <div className="col-span-full grid gap-5">

                    {plano.recursoMateriais.map((e, i) =>
                        <RecursosMateriaisSimple recurso={e} key={e.id} />
                    )}

                </div>
            </div>
        </>

    )

}