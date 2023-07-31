"use client";

import { baixarArquivo, deletarProcessoSeletivo, salvarProcessoSeletivo } from "@/api/api";
import { Button, Checkbox, Label, Select, Table, TextInput } from "@/components/flowbite-components";
import { ProcessoSeletivoDTO, ProcessoSeletivoPlanoTrabalhoDTO } from "@/model/processoSeletivo/ProcessoSeletivoDTO";
import { useFormik } from "formik";
import Link from "next/link";
import { VariantType, enqueueSnackbar } from "notistack";
import { date, number, object, string } from "yup";
import TinyCustomForm from "../TinyCustomForm";
import { ProcessoSeletivoProps } from "./ProcessoSeletivoView";
import { useEffect } from "react";

export default function ProcessoSeletivoForms({ processoSeletivo, planosTrabalho }: ProcessoSeletivoProps) {

    const validationSchema = object<ProcessoSeletivoDTO>({
        fim: date().required("Campo obrigatório."),
        inicio: date().required("Campo obrigatório."),
        requisitos: string().required("Campo obrigatório."),
        areaInteresse: string().required("Campo obrigatório."),
        planoTrabalho: object<ProcessoSeletivoPlanoTrabalhoDTO>({
            id: number().min(1, "Selecione um plano de trabalho.").required("Obrigatório")
        }).required("Campo obrigatório."),
    })



    const formik = useFormik({
        initialValues: processoSeletivo,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            salvarProcessoSeletivo(values).then(({ data, response }) => {
                notification(data, 'success');
                window.location.href = `/processoSeletivo/${(response.headers.location as string).split("/").pop()}`
            });
        }
    })

    function notification(mensagem: string, variant: VariantType): void {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(mensagem, { variant });
    };

    function setTexto(texto: string) {
        formik.setFieldValue("requisitos", texto).catch(e => console.log(e))
    }

    function deletePlano() {
        if (processoSeletivo.id) {
            deletarProcessoSeletivo(processoSeletivo.id).then(() => {
                notification('Deletado com sucesso', 'success');
                window.location.href = "/processoSeletivo"
            }).catch((error) => console.log(error));
        }
    }

    return (
        <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
            <div className="col-span-full">
                <div className="mb-2 block">
                    <Label
                        htmlFor="planoTrabalho.id"
                        value="Plano Trabalho"
                        color={formik.errors.planoTrabalho?.id ? "failure" : undefined}
                    />
                </div>
                <Select
                    id="planoTrabalho.id"
                    required
                    onChange={formik.handleChange}
                    helperText={formik.errors.planoTrabalho?.id}
                    color={formik.errors.planoTrabalho?.id ? "failure" : undefined}
                    defaultValue={formik.values?.planoTrabalho?.id}
                >
                    <option>
                    </option>
                    {planosTrabalho.map((e) => {
                        return (
                            <option value={e.id} key={e.id}>
                                {e.titulo}
                            </option>
                        )
                    })}
                </Select>
            </div>

            <div className="col-span-full">
                <div className="mb-2 block">
                    <Label
                        htmlFor="areaInteresse"
                        value="Area de Interesse"
                        color={formik.errors.areaInteresse ? "failure" : undefined}
                    />
                </div>
                <TextInput
                    id="areaInteresse"
                    type="text"
                    sizing="md"
                    placeholder="Area de Interesse"
                    onChange={formik.handleChange}
                    helperText={formik.errors.areaInteresse}
                    defaultValue={formik.values?.areaInteresse}
                    color={formik.errors.areaInteresse ? "failure" : undefined}
                    required
                />
            </div>
            <div className="grid grid-cols-2 gap-4 col-span-full">
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="inicio"
                            value="Inicio do Periodo de Inscrição"
                            color={formik.errors.inicio ? "failure" : undefined}
                        />
                    </div>
                    <TextInput
                        id="inicio"
                        type="date"
                        sizing="md"
                        required
                        onChange={formik.handleChange}
                        helperText={formik.errors.inicio}
                        defaultValue={formik.values.inicio.toString()}
                        color={formik.errors.inicio ? "failure" : undefined}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="fim"
                            value="Fim do Periodo de Inscrição"
                            color={formik.errors.fim ? "failure" : undefined}
                        />
                    </div>
                    <TextInput
                        id="fim"
                        type="date"
                        sizing="md"
                        required
                        onChange={formik.handleChange}
                        helperText={formik.errors.fim}
                        defaultValue={formik.values.fim.toString()}
                        color={formik.errors.fim ? "failure" : undefined}
                    />
                </div>
            </div>

            <div>

                <TinyCustomForm descricao={formik.values?.requisitos} onSave={setTexto} isEditavel={processoSeletivo.id ? false : true}
                    label={
                        <Label
                            htmlFor="requisitos"
                            value="Requisitos"
                            className="font-bold tracking-tight my-4 flex-auto"
                            color={formik.errors.requisitos ? "failure" : undefined}
                        />
                    }
                />
            </div>

            <div className={`${processoSeletivo.candidatos.length == 0 ? "hidden" : "flex"} flex-col gap-4 overflow-x-auto`}>
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
                                    Email
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Inscrito em
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Curriculo
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Aprovado
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {processoSeletivo.candidatos.map((e, k) =>
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={`${e.id.usuarioId}e${e.id.processoSeletivoId}`}>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {e.usuario.nome}
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {e.usuario.email}
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {new Date(e.inscricao).toLocaleString("pt-BR", {
                                                day: '2-digit',
                                                month: '2-digit'
                                            })
                                            }
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            <Link href={e.curriculo} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                Download
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            <Checkbox defaultChecked={e.aprovado} onClick={(e) => formik.setFieldValue(`candidatos[${k}].aprovado`, Boolean(e.currentTarget.checked))} />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 place-self-center">
                <Button className="w-fit justify-self-center" type="submit">Salvar</Button>
                {processoSeletivo.id ?
                    <Button className="w-fit justify-self-center" color={'red'} onClick={deletePlano}>Deletar Plano de Trabalho</Button>
                    : <></>}

            </div>

        </form>
    )

}