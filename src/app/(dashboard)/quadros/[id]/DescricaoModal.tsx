import TinyCustom from "@/components/TinyCustom";
import TinyCustomForm from "@/components/TinyCustomForm";
import { Button, Modal } from "@/components/flowbite-components";
import DataRangeCustom from "@/components/quadro/DataRangeCustom";
import AtividadesSelectionList from "@/components/quadro/modal/AtividadesSelectionList";
import { Task } from "@/model/quadro";
import { useRef } from "react";


export interface DescricaoModalProps {
    task?: Task;
    open: boolean;
    setOpen: (open: boolean) => void;
}


export default function DescricaoModal({ task, setOpen, open }: DescricaoModalProps) {

    const rootRef = useRef<HTMLDivElement>(null);

    function save(e: any) {
        console.log(e);
        return "aaa";
    }

    return (

        <div ref={rootRef}>
            <Modal
                root={rootRef.current ?? undefined}
                dismissible
                show={open}
                onClose={() => setOpen(!open)}
            >
                <Modal.Body>
                    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">

                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {task?.title}
                        </h5>
                        <div className="flex-col flex sm:flex-row ">
                            <div className="flex-auto">
                                <div className="p-5 space-y-6">
                                    <div className="flex space-x-4 items-center">
                                        <h5 className="flex-auto text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            Alfredo Gabriel
                                        </h5>

                                        <div className="flex-col flex sm:flex-row">
                                            <DataRangeCustom />
                                            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white self-center text-center">
                                                Esforço: 30 horas.
                                            </h5>
                                        </div>
                                    </div>
                                    <div>
                                        <TinyCustomForm onSave={save} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold tracking-tight text-gray-900 dark:text-white my-4">
                                            Atividades
                                        </h5>
                                        <AtividadesSelectionList />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-auto flex-col gap-4 p-4 max-w-[12rem]">
                                <h5 className="font-bold tracking-tight text-gray-900 dark:text-white  text-center">
                                    Menu
                                </h5>
                                <Button color={'dark'} >Indicar Responsável</Button>
                                <Button color={'dark'} >Ingressar na Tarefa</Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </div>

    )

}