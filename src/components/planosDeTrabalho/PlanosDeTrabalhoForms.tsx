"use client";

import { deletarPlanoTrabalho, salvarPlanoTrabalho } from "@/api/api";
import { Button, Label, TextInput } from "@/components/flowbite-components";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import { RecursoMaterialModel } from "@/model/response/RecursoMaterialModel";
import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import { VariantType, enqueueSnackbar } from "notistack";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { array, number, object, string } from "yup";
import TinyCustomForm from "../TinyCustomForm";
import RecursosMateriaisForm from "./RecursosMateriaisForm";

export interface PlanosDeTrabalhoFormsProps {
    plano: PlanoTrabalhoModel;
}
export default function PlanosDeTrabalhoForms(props: PlanosDeTrabalhoFormsProps) {

    const validationSchema = object<PlanoTrabalhoModel>({
        titulo: string().required("Campo obrigatório."),
        areaTrabalho: string().required("Campo obrigatório."),
        descricao: string().required("Campo obrigatório."),
        recursoMateriais: array().of(object<RecursoMaterialModel>(
            {
                id: number().required("Campo obrigatório."),
                descricao: string().required("Campo obrigatório.")
            }
        )).min(1, "No minimo 1 recurso material.").required("Campo obrigatório.")
    })

    const formik = useFormik({
        initialValues: props.plano,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            salvarPlanoTrabalho(values).then(({ data, response }) => {
                notification(data, 'success');
                window.location.href = `/planoDeTrabalho/${(response.headers.location as string).split("/").pop()}`
            }).catch((error) => console.log(error));
        }
    })

    function verificarString(response: string | AxiosResponse<string, any>): response is string {
        return typeof response === 'string';
    }

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

    function setTexto(texto: string) {
        formik.setFieldValue("descricao", texto).catch(e => console.log(e))
    }

    function deletePlano() {
        if (props.plano.id) {
            deletarPlanoTrabalho(props.plano.id).then(() => {
                notification('Deletado com sucesso', 'success');
                window.location.href = "/planosDeTrabalho"
            }).catch((error) => console.log(error));
        }
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
                <TinyCustomForm descricao={formik.values?.descricao} onSave={setTexto} isEditavel={props.plano.id ? false : true} />
            </div>
            <div className="col-span-full grid gap-4">
                <div className="grid grid-cols-2">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white self-center">Recursos Materiais</h5>

                    <Button className="place-self-end w-fit self-center" onClick={novoRecursoMaterial} >
                        <AiOutlinePlusCircle className="text-2xl " />
                    </Button>
                </div>
                <div className="col-span-full grid gap-5">

                    {formik.values.recursoMateriais.map((e, i) =>
                        <RecursosMateriaisForm formik={formik} index={i} key={i} removeItem={removeRecursoMaterial} />
                    )}

                </div>
            </div>

            <div className="flex gap-4 place-self-center">
                <Button className="w-fit justify-self-center" type="submit">Salvar</Button>
                {props.plano.id ?
                    <Button className="w-fit justify-self-center" color={'red'} onClick={deletePlano}>Deletar Plano de Trabalho</Button>
                    : <></>}

            </div>

        </form>
    )

}