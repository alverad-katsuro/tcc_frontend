import { Task } from "@/model/quadro";
import { Button, Modal } from "flowbite-react";

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
                <div className="w-full min-h-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {task?.title}
                        </h5>
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {task?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button >
                    I accept
                </Button>
                <Button
                    color="gray"
                >
                    <p>
                        Decline
                    </p>
                </Button>
            </Modal.Footer>
        </Modal>

    )

}