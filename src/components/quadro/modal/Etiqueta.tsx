import { Button, Dropdown, Modal, TextInput } from "@/components/flowbite-components";
import { EtiquetaDTO, TarefaDTO } from "@/model/quadro";
import { Dispatch, SetStateAction, useState } from "react";
import { AiFillEdit, AiOutlinePlusCircle } from "react-icons/ai";

interface DataModal { index: number; etiqueta: EtiquetaDTO }

export interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setTask: Dispatch<SetStateAction<TarefaDTO | undefined>>;
    dataModal: DataModal;
}
function ModalEtiqueta({ open, setOpen, setTask, dataModal: { etiqueta, index } }: ModalProps) {
    return (
        <Modal
            show={true}
            theme={{
                root: {
                    base: "fixed top-0 right-0 left-0 z-100 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full items-center justify-center flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
                }
            }}
            onClose={() => {
                setOpen(!open)
            }}
            id="SADSADSADSAD"
            size="sm"
        >
            <Modal.Header>
                Editar etiqueta
            </Modal.Header>
            <Modal.Body className="flex flex-col bg-slate-700 gap-4">
                <div className="flex items-center justify-center p-10 bg-black">
                    <label htmlFor={`color${index}`} style={{ backgroundColor: etiqueta.color }} className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 rounded-lg bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600">{etiqueta.nome}</label>

                    <input id={`color${index}`} type="color" className=" rounded-full bg-transparent sr-only"
                        onChange={(e) => {
                            if (e.currentTarget.value !== undefined) {
                                const newImp: EtiquetaDTO = {
                                    ...etiqueta, color: e.currentTarget.value
                                }
                                setTask(t => {
                                    if (t) {
                                        const newTask: TarefaDTO = {
                                            ...t, etiquetas: t.etiquetas.map((imp, i) => {
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
                        defaultValue={etiqueta.color}
                    />
                </div>
                <div className="p-2">

                <TextInput
                    id="nome"
                    type="text"
                    sizing="md"
                    placeholder="nome"
                    onChange={(e) => {
                        if (e.currentTarget.value !== undefined) {
                            const newImp: EtiquetaDTO = {
                                ...etiqueta, nome: e.currentTarget.value
                            }
                            setTask(t => {
                                if (t) {
                                    const newTask: TarefaDTO = {
                                        ...t, etiquetas: t.etiquetas.map((imp, i) => {
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
                    defaultValue={etiqueta.nome}
                    required
                />
                </div>
            </Modal.Body>
        </Modal>

    )
}

export interface EtiquetaProps {
    etiqueta: EtiquetaDTO;
    index: number;
    setTask: Dispatch<SetStateAction<TarefaDTO | undefined>>;

    setDataModal: Dispatch<SetStateAction<DataModal | undefined>>;

}

function Etiqueta({ etiqueta, index, setTask, setDataModal }: EtiquetaProps) {


    return (
        <div className="flex flex-row gap-4 place-items-center">
            <div>
                <label htmlFor={`color${index}`} style={{ backgroundColor: etiqueta.color }} className="block h-[30px] w-[200px] border-black dark:border-white border-2 text-center self-center">{etiqueta.nome}</label>

                <input id={`color${index}`} type="color" className=" rounded-full bg-transparent sr-only"
                    onChange={(e) => {
                        if (e.currentTarget.value !== undefined) {
                            const newImp: EtiquetaDTO = {
                                ...etiqueta, color: e.currentTarget.value
                            }
                            setTask(t => {
                                if (t) {
                                    const newTask: TarefaDTO = {
                                        ...t, etiquetas: t.etiquetas.map((imp, i) => {
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
                    defaultValue={etiqueta.color}
                />
            </div>
            <Button onClick={(() => setDataModal({ etiqueta, index }))}
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
}

export default function EtiquetaComponentes({ tarefa, setTask }: Props) {

    const [edit, setEdit] = useState(false);

    const [dataModal, setDataModal] = useState<DataModal | undefined>();



    return (
        <>
            {dataModal ? <ModalEtiqueta open={edit} setOpen={setEdit} setTask={setTask} dataModal={dataModal} /> : <></>}

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
                                const newTask: TarefaDTO = { ...old, etiquetas: [...old.etiquetas, { nome: "Não informado" }] }
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
                        <div className="items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-ful hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white flex gap-4" key={index} >
                            <Etiqueta etiqueta={etiqueta} index={index} setTask={setTask} setDataModal={setDataModal} />
                        </div>
                    )}
            </Dropdown>
        </>

    )

}