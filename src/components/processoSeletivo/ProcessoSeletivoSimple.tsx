import { Checkbox, Label, Table, TextInput } from "@/components/flowbite-components";
import { ProcessoSeletivoProps } from "./ProcessoSeletivoView";


export default function ProcessoSeletivoSimple({ processoSeletivo }: ProcessoSeletivoProps) {

    return (
        <>
            <div className="col-span-full">
                <div className="mb-2 block">
                    <Label
                        htmlFor="planoTrabalho.id"
                        value="Plano Trabalho"
                    />
                </div>
                <TextInput
                    id="titulo"
                    type="text"
                    sizing="md"
                    placeholder="Titulo"
                    defaultValue={processoSeletivo.planoTrabalho.titulo}
                    disabled
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="areaInteresse"
                        value="Area de Interesse"
                    />
                </div>
                <TextInput
                    id="areaInteresse"
                    type="text"
                    sizing="md"
                    placeholder="Area de Interesse"
                    defaultValue={processoSeletivo.areaInteresse}
                    disabled
                />
            </div>
            <div className="grid grid-cols-2 gap-4 col-span-full">
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="inicio"
                            value="Inicio do Periodo de Inscrição"
                        />
                    </div>
                    <TextInput
                        id="inicio"
                        type="date"
                        sizing="md"
                        required
                        defaultValue={processoSeletivo.inicio}
                        disabled
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="fim"
                            value="Fim do Periodo de Inscrição"
                        />
                    </div>
                    <TextInput
                        id="fim"
                        type="date"
                        sizing="md"
                        required
                        defaultValue={processoSeletivo.fim}
                        disabled
                    />
                </div>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="descricao"
                        value="Descrição"
                    />
                </div>
                <div dangerouslySetInnerHTML={{ __html: processoSeletivo.requisitos }} className=' text-gray-900 dark:text-white my-4 flex-auto overflow-auto max-h-64' />
            </div>
            <div className={`flex-col gap-4 ${processoSeletivo.candidatos.length == 0 ? "hidden" : "flex"}`}>
                <div className="grid grid-cols-2">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white self-center">Candidatos</h5>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-auto  max-h-60">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>
                                    Nome
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Inscrito em
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Aprovado
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {processoSeletivo.candidatos.map((e) =>
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={`${e.id.usuarioId}e${e.id.processoSeletivoId}`}>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {e.usuario.nome}
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {new Date(e.inscricao).toLocaleString("pt-BR", {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: "numeric"
                                            })
                                            }
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            <Checkbox id="aprovado" defaultChecked={e.aprovado} disabled />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
        </>

    )

}