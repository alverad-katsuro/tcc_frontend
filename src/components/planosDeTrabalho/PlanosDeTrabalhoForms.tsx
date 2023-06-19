import { salvarPlanoTrabalho } from "@/api/api";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import { RecursoMaterialModel } from "@/model/response/RecursoMaterialModel";
import { notification } from "@/utils/Notification";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useFormik } from "formik";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { array, number, object, string } from "yup";
import RecursosMateriaisForm from "./RecursosMateriaisForm";
import TinyCustom from "../TinyCustom";

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
            salvarPlanoTrabalho(values).then((suc) => {
                if (typeof suc === 'string') {
                    notification(suc, 'success');
                } else {
                    console.log(suc.headers.location)
                    //window.location.href = suc.headers.
                }
            }).catch((error) => console.log(error));
        }
    })

    function novoRecursoMaterial() {
        formik.setFieldValue(`recursoMateriais.[${formik.values.recursoMateriais.length}].descricao`, "").catch((e) => { notification(e, 'warning') });
    }

    function removeRecursoMaterial(index: number) {
        formik.setFieldValue("recursoMateriais", formik.values.recursoMateriais.filter((e, k) => k !== index)).catch((e) => { notification(e, 'warning') });
    }

    function setTexto(texto: string) {
        formik.setFieldValue("descricao", texto).catch(e => console.log(e))
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
                <TinyCustom setTexto={setTexto} texto={formik.values.descricao}/>
            </div>
            <div className="col-span-full grid gap-4">
                <div className="grid grid-cols-2">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white self-center">Recursos Materiais</h5>

                    <Button className="place-self-end w-fit self-center">
                        <AiOutlinePlusCircle className="text-2xl " onClick={novoRecursoMaterial} />
                    </Button>
                </div>
                <div className="col-span-full grid gap-5">

                    {formik.values.recursoMateriais.map((e, i) =>
                        <RecursosMateriaisForm formik={formik} index={i} key={i} removeItem={removeRecursoMaterial} />
                    )}

                </div>
            </div>

            <Button className="w-fit justify-self-center" type="submit">Salvar</Button>
        </form>
    )

}