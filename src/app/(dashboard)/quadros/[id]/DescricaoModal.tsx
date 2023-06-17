import { Button, Checkbox, Label, Modal, Textarea } from "@/components/flowbite-components";
import { Task } from "@/model/quadro";

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
                    <div className="flex-col flex sm:flex-row ">
                        <div className="flex-auto">
                            <div className="p-5 space-y-6">
                                <div className="flex space-x-4">
                                    <h5 className="flex-auto mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        Alfredo Gabriel
                                    </h5>

                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        <div date-rangepicker className="flex items-center">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                                </div>
                                                <input name="start" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" />
                                            </div>
                                            <span className="mx-4 text-gray-500">to</span>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                                </div>
                                                <input name="end" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end" />
                                            </div>
                                        </div>
                                    </h5>
                                </div>
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