import { Button, TextInput } from "@/components/flowbite-components";
import { TarefaDTO } from "@/model/quadro";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

export interface Props {
    tarefa?: TarefaDTO;
    setTask: Dispatch<SetStateAction<TarefaDTO | undefined>>;
}

export default function TituloTarefa({ tarefa, setTask }: Props) {

    const [editavel, setEditavel] = useState<boolean>(false);

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
                        onChange={(e) => setTask((task) => {
                            if (task != undefined) {
                                const newTask: TarefaDTO = { ...task, titulo: e?.currentTarget?.value };
                                return newTask;
                            }
                        })}
                        defaultValue={tarefa?.titulo}
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
            {tarefa?.titulo}
        </h5>
    );
};