import { Task } from "@/model/quadro";
import { Badge, Button, Checkbox, Label, Modal, Textarea } from "flowbite-react";

export interface DescricaoModalProps {
    task?: Task;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function DescricaoModal({ task, setOpen, open }: DescricaoModalProps) {

    return (

        <Modal
            dismissible
            show={open}
            onClose={() => setOpen(!open)}
        >
            <Modal.Body>
                <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">

                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {task?.title}
                    </h5>
                    <div className="flex space-x-4">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Alfredo Gabriel
                        </h5>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Alfredo Gabriel
                        </h5>
                        
                    </div>
                    <div className="flex-col flex sm:flex-row ">
                        <div className="flex-auto">
                            <div className="p-5 space-y-6">
                                <div>
                                    <h5 className="font-bold tracking-tight text-gray-900 dark:text-white my-4">
                                        Descrição
                                    </h5>
                                    {/* <div className="mb-2 block">
                                        <Label
                                            htmlFor="descricao"
                                            value="Descrição"
                                            // color={props.formik.errors.nome ? "failure" : undefined}
                                        />
                                    </div> */}
                                    <Textarea
                                        id="descricao"
                                        className="text-base leading-relaxed text-gray-500 dark:text-gray-400"
                                        defaultValue={task?.description}
                                        rows={6}
                                    />
                                </div>
                                <div>
                                    <h5 className="font-bold tracking-tight text-gray-900 dark:text-white my-4">
                                        Atividades
                                    </h5>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="remember" />
                                            <Label htmlFor="remember">
                                                1. Tarefa
                                            </Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="remember" />
                                            <Label htmlFor="remember">
                                                2. Tarefa
                                            </Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="remember" />
                                            <Label htmlFor="remember">
                                                3. Tarefa
                                            </Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="remember" />
                                            <Label htmlFor="remember">
                                                4. Tarefa
                                            </Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="remember" />
                                            <Label htmlFor="remember">
                                                5. Tarefa
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-auto flex-col gap-4 p-4 max-w-[12rem]">
                            <div className="flex flex-col gap-4">
                                <h5 className="font-bold tracking-tight text-gray-900 dark:text-white">
                                    Adicionar ao Cartão
                                </h5>
                                <Button color={'dark'} >Button</Button>
                                <Button color={'dark'} >Button</Button>
                                <Button color={'dark'} >Button</Button>
                                <Button color={'dark'} >Button</Button>

                            </div>
                            <Button color={'dark'} >Button</Button>
                            <Button color={'dark'} >Button</Button>
                            <Button color={'dark'} >Button</Button>
                            <Button color={'dark'} >Button</Button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

    )

}