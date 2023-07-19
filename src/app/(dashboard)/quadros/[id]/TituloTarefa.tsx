import { Button, TextInput } from "@/components/flowbite-components";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

export interface Props {
    titulo?: string;
}

export default function TituloTarefa({ titulo = "Sem Titulo" }: Props) {

    const [editavel, setEditavel] = useState<boolean>(false);

    const [tituloState, setTitulo] = useState<string>(titulo)

    if (editavel) {
        return (
            <div className="flex items-center gap-2 p-3">
                <div className="flex-auto flex gap-2 place-content-center">
                    <TextInput
                        id="titulo"
                        type="text"
                        sizing="md"
                        className="w-full"
                        placeholder="Titulo"
                        onChange={(e) => setTitulo(e.currentTarget.value)}
                        defaultValue={tituloState}
                        required
                    />

                </div>
                <Button onClick={() => setEditavel(e => !e)}>
                    <AiOutlineCheck size={20} />
                    <p className="mx-2">
                        Concluir
                    </p>
                </Button>
            </div>

        )
    }

    return (
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" onClick={() => setEditavel(e => !e)}>
            {tituloState}
        </h5>
    );
};