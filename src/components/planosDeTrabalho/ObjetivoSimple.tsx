import { ObjetivoModel } from "@/model/response/ObjetivoModel";
import { Label, TextInput } from "flowbite-react";

export interface ObjetivoFormProps {
    objetivo: ObjetivoModel;
}

export default function ObjetivoSimple({ objetivo }: ObjetivoFormProps) {

    return (
        <div className="grid gap-4">
            <div className="col-span-full">
                <div className="mb-2 block">
                    <Label
                        value="Descrição do objetivo."
                    />
                </div>
                <TextInput
                    type="text"
                    sizing="md"
                    placeholder="Descrição do novo objetivo."
                    defaultValue={objetivo.descricao}
                    disabled
                />
            </div>
        </div>

    )
}