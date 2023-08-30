import { Button, Dropdown } from "@/components/flowbite-components";
import { EtiquetaDTO, TarefaDTO } from "@/model/quadro";
import { Dispatch, SetStateAction } from "react";
import { AiFillEdit, AiOutlinePlusCircle } from "react-icons/ai";



export interface EtiquetaProps {
    etiqueta: EtiquetaDTO;
    index: number;
    setTask: Dispatch<SetStateAction<TarefaDTO | undefined>>;

    setIndex: (index: number | undefined) => void;

}

function Etiqueta({ etiqueta, index, setTask, setIndex }: EtiquetaProps) {


    return (
        <div className="flex flex-row gap-4 place-items-center">
            <div>
                <label style={{ backgroundColor: etiqueta.color }} className="block h-[30px] w-[200px] border-black dark:border-white border-2 text-center self-center">{etiqueta.nome}</label>

            </div>
            <Button onClick={(() => setIndex(index))}
                outline
                className="w-fit bg-transparent"
            >
                <AiFillEdit className="text-xl" />
            </Button>

        </div >
    )
}

export interface Props {
    tarefa: TarefaDTO;
    setTask: Dispatch<SetStateAction<TarefaDTO | undefined>>;
    setIndex: (index: number | undefined) => void;

}

export default function EtiquetaComponentes({ tarefa, setTask, setIndex }: Props) {

    return (
        <>

            <Dropdown
                label="Etiquetas"
                size="xl"
                color="blue"
                dismissOnClick={false}
            >
                <Dropdown.Header  >

                    <div className="flex gap-4">
                        <Button className="place-self-end w-fit self-center" color="green" onClick={() => setTask(old => {
                            if (old) {
                                const newTask: TarefaDTO = { ...old, etiquetas: [...old.etiquetas, { nome: "Não informado", color: "#ad261f" }] }
                                return newTask;
                            }
                        })} >
                            <AiOutlinePlusCircle className="text-2xl mr-2 h-5 w-5" />
                            Criar Etiqueta
                        </Button>
                    </div>

                </Dropdown.Header>

                <Dropdown.Divider />

                {
                    tarefa.etiquetas?.map((etiqueta, index) =>
                        <div className="items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-ful hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white flex gap-4" key={index}>
                            <Etiqueta etiqueta={etiqueta} index={index} setTask={setTask} setIndex={setIndex} />
                        </div>
                    )}
            </Dropdown>
        </>

    )

}