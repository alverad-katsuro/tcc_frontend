"use client";

import { deletarPlanoTrabalho, salvarPlanoTrabalho } from "@/api/api";
import { Button, Checkbox, Label, Table, TextInput } from "@/components/flowbite-components";
import { UsuarioNovoPlanoProjection } from "@/model/planoDeTrabalho/UsuarioNovoPlanoProjection";
import { ObjetivoModel } from "@/model/response/ObjetivoModel";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import { RecursoMaterialModel } from "@/model/response/RecursoMaterialModel";
import { useFormik } from "formik";
import { VariantType, enqueueSnackbar } from "notistack";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { array, object, string } from "yup";
import TinyCustomForm from "../TinyCustomForm";
import ObjetivoForm from "./ObjetivoForm";
import RecursosMateriaisForm from "./RecursosMateriaisForm";

export interface PlanosDeTrabalhoFormsProps {
    plano: PlanoTrabalhoModel;
    pesquisadores: UsuarioNovoPlanoProjection[];
}
export default function PlanosDeTrabalhoForms({ plano, pesquisadores }: PlanosDeTrabalhoFormsProps) {

    const validationSchema = object<PlanoTrabalhoModel>({
        titulo: string().required("Campo obrigatório."),
        areaTrabalho: string().required("Campo obrigatório."),
        descricao: string().required("Campo obrigatório."),
        recursoMateriais: array().of(object<RecursoMaterialModel>(
            {
                descricao: string().required("Campo obrigatório.")
            }
        )).min(1, "No minimo 1 recurso material.").required("Campo obrigatório."),
        objetivos: array().of(object<ObjetivoModel>(
            {
                descricao: string().required("Campo obrigatório.")
            }
        )).min(1, "No minimo 1 objetivo.").required("Campo obrigatório.")
    })

    const [pesquisadoresState, setPesquisadoresState] = useState<UsuarioNovoPlanoProjection[]>(pesquisadores);

    const formik = useFormik({
        initialValues: plano,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            salvarPlanoTrabalho({
                ...values,
                pesquisadores: pesquisadoresState.filter(e => e.participante) // manda somente os selecionados
            }).then(({ data, response }) => {
                notification(data, 'success');
                window.location.href = `/planoDeTrabalho/${(response.headers.location as string).split("/").pop()}`
            });
        }
    })

    function notification(mensagem: string, variant: VariantType): void {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(mensagem, { variant });
    };

    function novoRecursoMaterial() {
        formik.setFieldValue(`recursoMateriais.[${formik.values.recursoMateriais.length}].descricao`, "").catch((e) => { notification(e, 'warning') });
    }

    function removeRecursoMaterial(index: number) {
        formik.setFieldValue("recursoMateriais", formik.values.recursoMateriais.filter((e, k) => k !== index)).catch((e) => { notification(e, 'warning') });
    }

    function novoObjetivo() {
        formik.setFieldValue(`objetivos.[${formik.values.objetivos.length}].descricao`, "").catch((e) => { notification(e, 'warning') });
    }

    function removeObjetivo(index: number) {
        formik.setFieldValue("objetivos", formik.values.objetivos.filter((e, k) => k !== index)).catch((e) => { notification(e, 'warning') });
    }

    function setTexto(texto: string) {
        formik.setFieldValue("descricao", texto).catch(e => console.log(e))
    }

    function deletePlano() {
        if (plano.id) {
            deletarPlanoTrabalho(plano.id).then(() => {
                notification('Deletado com sucesso', 'success');
                window.location.href = "/planoDeTrabalho"
            }).catch((error) => console.log(error));
        }
    }

    function adicionarRemoverPesquisador(pesquisador: UsuarioNovoPlanoProjection) {
        pesquisador.participante = !pesquisador.participante;
    }

    return (
        <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
            <div className="col-span-full">
                <div className="mb-2 block">
                    <Label
                        htmlFor="titulo"
                        value="Titulo do Trabalho"
                        color={formik.errors.titulo ? "failure" : undefined}
                    />
                </div>
                <TextInput
                    id="titulo"
                    type="text"
                    sizing="md"
                    placeholder="Titulo"
                    onChange={formik.handleChange}
                    helperText={formik.errors.titulo}
                    defaultValue={formik.values?.titulo}
                    color={formik.errors.titulo ? "failure" : undefined}
                    required
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="areaTrabalho"
                        value="Area de Trabalho"
                        color={formik.errors.areaTrabalho ? "failure" : undefined}
                    />
                </div>
                <TextInput
                    id="areaTrabalho"
                    type="text"
                    sizing="md"
                    placeholder="Computação; Inteligência Artificial"
                    onChange={formik.handleChange}
                    helperText={formik.errors.areaTrabalho}
                    defaultValue={formik.values?.areaTrabalho}
                    color={formik.errors.areaTrabalho ? "failure" : undefined}
                    required
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="descricao"
                        value="Descrição"
                        color={formik.errors.descricao ? "failure" : undefined}
                    />
                </div>
                <TinyCustomForm descricao={formik.values?.descricao} onSave={setTexto} isEditavel={plano.id ? false : true} />
            </div>
            <div className="col-span-full grid gap-4">
                <div className="grid grid-cols-2">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white self-center">Objetivos</h5>
                    <Button className="place-self-end w-fit self-center" onClick={novoObjetivo} >
                        <AiOutlinePlusCircle className="text-2xl " />
                    </Button>
                </div>
                <div className="col-span-full grid gap-5">

                    {typeof formik.errors.objetivos === 'string' ? <p className="text-red-500">{formik.errors.objetivos.toString()}</p> : <></>}

                    {formik.values.objetivos.map((e, i) =>
                        <ObjetivoForm formik={formik} index={i} key={i} removeItem={removeObjetivo} />
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
                                    Participante
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Nome
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Carga Horaria
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {pesquisadoresState.map((e) =>
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={e.id}>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            <Checkbox defaultChecked={e.participante} onClick={() => adicionarRemoverPesquisador(e)} />
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {e.nome}
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            <TextInput disabled={!e.participante} type="number" min={0} defaultValue={e.cargaHoraria} onChange={ev => e.cargaHoraria = Number(ev.currentTarget.value)} />
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
                    <Button className="place-self-end w-fit self-center" onClick={novoRecursoMaterial} >
                        <AiOutlinePlusCircle className="text-2xl " />
                    </Button>
                </div>
                <div className="col-span-full grid gap-5">

                    {typeof formik.errors.recursoMateriais === 'string' ? <p className="text-red-500">{formik.errors.recursoMateriais.toString()}</p> : <></>}

                    {formik.values.recursoMateriais.map((e, i) =>
                        <RecursosMateriaisForm formik={formik} index={i} key={i} removeItem={removeRecursoMaterial} />
                    )}

                </div>
            </div>

            <div className="flex gap-4 place-self-center">
                <Button className="w-fit justify-self-center" type="submit">Salvar</Button>
                {plano.id ?
                    <Button className="w-fit justify-self-center" color={'red'} onClick={deletePlano}>Deletar Plano de Trabalho</Button>
                    : <></>}

            </div>

        </form>
    )

}