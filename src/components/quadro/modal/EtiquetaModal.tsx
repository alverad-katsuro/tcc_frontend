import { EtiquetaDTO, TarefaDTO } from "@/model/quadro";
import { Button, Modal, TextInput } from "flowbite-react";
import { Dispatch, SetStateAction, useRef } from "react";
import { SwatchesPicker } from "react-color";

export interface ModalProps {
    setIndex: (index: number | undefined) => void;
    setTask: Dispatch<SetStateAction<TarefaDTO | undefined>>;
    index: number;
    task: TarefaDTO;
    state: [EtiquetaDTO, Dispatch<SetStateAction<EtiquetaDTO | undefined>>]

}
export default function ModalEtiqueta({ setIndex, setTask, index, state }: ModalProps) {

    const rootRef = useRef<HTMLDivElement>(null);

    const [etiqueta, setEtiqueta] = state;

    function deletarImpedimento() {
        setTask(t => {
            if (t) {
                const newTask: TarefaDTO = {
                    ...t, etiquetas: t.etiquetas.filter((imp, i) => i !== index)
                }
                return newTask
            }
        })
        setEtiqueta(undefined);
    }

    function salvarImpedimento() {
        setTask(t => {
            if (t) {
                const newTask: TarefaDTO = {
                    ...t, etiquetas: t.etiquetas.map((imp, i) => {
                        if (i === index) {
                            return etiqueta;
                        }
                        return imp;
                    })
                }
                return newTask
            }
        })
        setEtiqueta(undefined);
    }


    return (
        <div ref={rootRef}>

            <Modal
                root={rootRef.current ?? undefined}
                show={true}
                theme={{
                    root: {
                        base: "fixed top-0 right-0 left-0 z-100 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full items-center justify-center flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80 z-50",
                    }
                }}
                onClose={() => {
                    setIndex(undefined)
                }}
                size="lg"
            >
                <Modal.Header>
                    Editar etiqueta
                </Modal.Header>
                <Modal.Body className="flex flex-col bg-slate-700 gap-4 p-4">
                    <div className="flex items-center justify-center p-4 bg-black">
                        <label htmlFor={`color${index}`} style={{ backgroundColor: etiqueta.color }} className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 rounded-lg bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600">{etiqueta.nome}</label>

                        <input id={`color${index}`} type="color" className=" rounded-full bg-transparent sr-only"
                            onChange={(e) => {
                                if (e.currentTarget.value !== undefined) {
                                    setEtiqueta(et => {
                                        if (et) {
                                            const newImp: EtiquetaDTO = {
                                                ...et, color: e.currentTarget?.value
                                            };
                                            return newImp;
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
                            onChange={(e) =>
                                setEtiqueta(et => {
                                    const newImp: EtiquetaDTO = {
                                        ...et, nome: e.currentTarget?.value
                                    };
                                    return newImp;
                                })
                            }
                            defaultValue={etiqueta.nome}
                        />
                    </div>

                    <SwatchesPicker onChangeComplete={(e) => {
                        if (e !== undefined) {
                            setEtiqueta(et => {
                                if (et) {
                                    const newImp: EtiquetaDTO = {
                                        ...et, color: e.hex
                                    };
                                    return newImp;
                                }
                            })
                        }
                    }}

                        styles={{ default: { picker: { height: "100%", width: "100%" } } }}
                    />
                    <div className="flex flex-row gap-4 mx-auto">
                        <Button color="green" onClick={salvarImpedimento}>Salvar</Button>

                        <Button color="red" onClick={deletarImpedimento}>Deletar</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>

    )
}