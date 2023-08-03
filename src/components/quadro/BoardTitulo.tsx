import { ColunaKanban } from "@/model/quadro";
import { Dropdown } from "@/components/flowbite-components";
import { SlOptionsVertical } from "react-icons/sl";
export interface Props {
    titulo: ColunaKanban;
    addTask: () => void;

}
export default function BoardTitulo({ titulo, addTask }: Props) {

    if (titulo === "TODO") {
        return (
            <div className="flex w-5/6 justify-self-center mx-auto">
                <h1 className="block text-3xl font-bold tracking-tight text-gray-900 dark:text-white p-4 grow">{ColunaKanban[titulo as keyof typeof ColunaKanban]}</h1>
                <div className="self-center ">

                    <Dropdown
                        arrowIcon={false}
                        label={<SlOptionsVertical className="text-gray-900 dark:text-white" />}
                        color={""}
                    >
                        <Dropdown.Item onClick={addTask}>
                            Criar nova Tarefa
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
        )

    }
    return (
        <h1 className="block text-3xl w-5/6 justify-self-center font-bold tracking-tight text-gray-900 dark:text-white p-4">{ColunaKanban[titulo as keyof typeof ColunaKanban]}</h1>
    )

}