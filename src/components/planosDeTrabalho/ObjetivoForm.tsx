import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import { Button, Label, TextInput } from "flowbite-react";
import { FormikProps } from "formik";

export interface ObjetivoFormProps {
    formik: FormikProps<PlanoTrabalhoModel>;
    index: number;
    removeItem: (index: number) => void;
}

export interface IObjectList {
    id: string;
    descricao: string;
}

export default function ObjetivoForm(props: ObjetivoFormProps) {

    return (
        <div className="grid gap-4">
            <div className="col-span-full">
                <div className="mb-2 block">
                    <Label
                        htmlFor={`objetivos.[${props.index}].descricao`}
                        value="Novo objetivo."
                        color={(props.formik.errors.objetivos?.[props.index] && (props.formik.errors.objetivos[props.index] as IObjectList).descricao) ? "failure" : undefined}
                    />
                </div>
                <TextInput
                    id={`objetivos.[${props.index}].descricao`}
                    type="text"
                    sizing="md"
                    placeholder="Descrição do objetivo."
                    onChange={props.formik.handleChange}
                    defaultValue={props.formik.values.objetivos?.[props.index]?.descricao}
                    helperText={props.formik.errors.objetivos?.[props.index] ? (props.formik.errors.objetivos[props.index] as IObjectList).descricao : ''}
                    color={(props.formik.errors.objetivos?.[props.index] && (props.formik.errors.objetivos[props.index] as IObjectList).descricao) ? "failure" : undefined}
                    required
                />
            </div>
            <Button className="col-span-full w-fit place-self-end" color={'red'} onClick={() => props.removeItem(props.index)}> Excluir </Button>
        </div>

    )
}