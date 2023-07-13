import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import { RecursoMaterialModel } from "@/model/response/RecursoMaterialModel";
import { Label, TextInput, FileInput, Button } from "flowbite-react";
import { FormikProps } from "formik";

export interface RecursosMateriaisFormProps {
    recurso: RecursoMaterialModel;
}

export default function RecursosMateriaisSimple({ recurso }: RecursosMateriaisFormProps) {

    return (
        <div className="grid gap-4">
            <div className="col-span-full">
                <div className="mb-2 block">
                    <Label
                        value="Nome recurso material."
                    />
                </div>
                <TextInput
                    type="text"
                    sizing="md"
                    placeholder="Nome do recurso material."
                    defaultValue={recurso.descricao}
                    disabled
                />
            </div>
        </div>

    )
}