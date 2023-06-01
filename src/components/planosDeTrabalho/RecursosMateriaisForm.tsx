import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import { Label, TextInput, FileInput, Button } from "flowbite-react";
import { FormikProps } from "formik";

export interface RecursosMateriaisFormProps {
    formik: FormikProps<PlanoTrabalhoModel>;
    index: number;
    removeItem: (index: number) => void;
}

export interface IObjectList {
    id: string;
    descricao: string;
}

export default function RecursosMateriaisForm(props: RecursosMateriaisFormProps) {

    return (
        <div className="grid gap-4">
            <div className="col-span-full">
                <div className="mb-2 block">
                    <Label
                        htmlFor={`recursoMateriais.[${props.index}].descricao`}
                        value="Nome recurso material."
                        color={(props.formik.errors.recursoMateriais?.[props.index] && (props.formik.errors.recursoMateriais[props.index] as IObjectList).descricao) ? "failure" : undefined}
                    />
                </div>
                <TextInput
                    id={`recursoMateriais.[${props.index}].descricao`}
                    type="text"
                    sizing="md"
                    placeholder="Nome do recurso material."
                    onChange={props.formik.handleChange}
                    defaultValue={props.formik.values.recursoMateriais?.[props.index]?.descricao}
                    helperText={props.formik.errors.recursoMateriais?.[props.index] ? (props.formik.errors.recursoMateriais[props.index] as IObjectList).descricao : ''}
                    color={(props.formik.errors.recursoMateriais?.[props.index] && (props.formik.errors.recursoMateriais[props.index] as IObjectList).descricao) ? "failure" : undefined}
                    required
                />
            </div>
            <Button className="col-span-full w-fit place-self-end" color={'red'} onClick={() => props.removeItem(props.index)}> Excluir </Button>
        </div>

    )
}