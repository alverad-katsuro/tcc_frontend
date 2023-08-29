import { ImpedimentoDocument, TarefaDTO } from "@/model/quadro";
import { Button, TextInput } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";

export interface Props {
    impedimento: ImpedimentoDocument;
    index: number;
    setTask: Dispatch<SetStateAction<TarefaDTO | undefined>>;
}
export default function Impedimentos({ setTask, impedimento, index }: Props) {

    const ref = useRef<any | undefined>(undefined)

    const [editavel, setEditavel] = useState<boolean>(false);


    useEffect(() => {

        function handleClickOutside(event: MouseEvent) {
            if (ref.current && editavel && !ref.current.contains(event.target)) {
                setEditavel(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };

    })

    useEffect(() => {

        function handleClickInside(event: MouseEvent) {
            if (ref.current && !editavel && ref.current.contains(event.target)) {
                setEditavel(true)
            }
        }
        // Bind the event listener
        document.addEventListener("click", handleClickInside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("click", handleClickInside);
        };
    })

    function remover() {
        setTask(t => {
            if (t) {
                const newTask: TarefaDTO = {
                    ...t, impedimentos: t.impedimentos.filter((imp, i) => i !== index)
                }
                return newTask;
            }
        })
    }


    return (
        <div className="flex items-center gap-2 p-3 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

            <div className="flex-auto flex items-center gap-2 p-3">
                <div
                    ref={ref}
                    className="w-full"
                >
                    {editavel ?
                        <div className="flex flex-col gap-4">
                            <TextInput
                                id="titulo"
                                type="text"
                                sizing="md"
                                placeholder="Titulo"
                                onChange={(e) => {
                                    if (e.currentTarget.value !== undefined) {
                                        const newImp: ImpedimentoDocument = {
                                            ...impedimento, impedimento: e.currentTarget.value
                                        }
                                        setTask(t => {
                                            if (t) {
                                                const newTask: TarefaDTO = {
                                                    ...t, impedimentos: t.impedimentos.map((imp, i) => {
                                                        if (i === index) {
                                                            return newImp;
                                                        }

                                                        return imp;
                                                    })
                                                }
                                                return newTask;
                                            }
                                        })
                                    }
                                }}
                                defaultValue={impedimento.impedimento}
                                required
                            />
                            <TextInput
                                id="ocorrido"
                                type="date"
                                sizing="md"
                                placeholder="Ocorrido em"
                                onChange={(e) => {
                                    if (e.currentTarget.value !== undefined) {
                                        const newImp: ImpedimentoDocument = {
                                            ...impedimento, dataOcorrido: e.currentTarget.value
                                        }
                                        setTask(t => {
                                            if (t) {
                                                const newTask: TarefaDTO = {
                                                    ...t, impedimentos: t.impedimentos.map((imp, i) => {
                                                        if (i === index) {
                                                            return newImp;
                                                        }

                                                        return imp;
                                                    })
                                                }
                                                return newTask;
                                            }
                                        })
                                    }
                                }}
                                defaultValue={impedimento.dataOcorrido}
                                required
                            />
                        </div>
                        :
                        <p className=" text-gray-900 dark:text-white self-center text-justify">
                            {impedimento.impedimento ?? ""} - Ocorrido em: {impedimento.dataOcorrido && new Date(impedimento.dataOcorrido).toLocaleDateString()}
                        </p>
                    }
                </div>
            </div>
            <Button onClick={remover} color='red'>
                <CiCircleRemove size={20} />
                <p className="mx-2">
                    Remover
                </p>
            </Button>
        </div>
    )

}