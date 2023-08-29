import { isUsuarioNoPlano, reabrirPlanoTrabalho } from "@/api/api";
import { Button, Label, Table, TextInput } from "@/components/flowbite-components";
import { UsuarioNovoPlanoProjection } from "@/model/planoDeTrabalho/UsuarioNovoPlanoProjection";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import { notification } from "@/utils/Notification";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ObjetivoSimple from "./ObjetivoSimple";
import RecursosMateriaisSimple from "./RecursosMateriaisSimple";
import RelatorioModal from "./RelatorioModal";

export interface PlanosDeTrabalhoFormsProps {
    plano: PlanoTrabalhoModel;
    pesquisadores: UsuarioNovoPlanoProjection[];
    session?: Session | null;
}
export default function PlanoDeTrabalhoSimple({ plano, session }: PlanosDeTrabalhoFormsProps) {

    const [open, setOpen] = useState(false);

    const [noPlano, setNoPlano] = useState(false);

    console.log(plano)
    useEffect(() => {
        if (plano.relatorioResourceId === undefined && plano.id) {
            isUsuarioNoPlano(plano.id).then(r => setNoPlano(r));
        }
    }, []);

    function reabrirPlano() {
        if (plano.id) {
            reabrirPlanoTrabalho(plano.id).then((r) => {
                notification(r, 'success');
                window.location.reload();
            })
        }
    }

    return (
        <div className="flex flex-col gap-4">
            {open && plano.id !== undefined ?
                <RelatorioModal planoTrabalhoId={plano.id} stateModal={[open, setOpen]} /> : <></>
            }
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
                                    Pesquisadores no Projeto
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
            {plano.relatorioResourceId !== undefined ?
                <div className="col-span-full grid gap-4">
                    <div className="grid grid-cols-2">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white self-center">Relatorio</h5>
                    </div>
                    <div className="col-span-full grid gap-5">
                        <Link href={plano.relatorioUrl ?? ""} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Visualizar</Link>
                    </div>
                </div>
                : <></>}
            {plano.relatorioResourceId === undefined && noPlano ?
                <Button className="w-fit justify-self-center m-4 mx-auto" color='yellow' onClick={() => setOpen(true)}>Submeter Relatorio</Button>
                : <></>
            }
            {session?.user?.role?.includes("ROLE_ADMIN") && plano.finalizado ?
                <Button className="w-fit justify-self-center m-4 mx-auto" color='yellow' onClick={reabrirPlano}>Reabrir Plano de Trabalho</Button>
                : <></>}
        </div>

    )

}