import { PlanoModel } from "@/model/response/PlanoModel";
import { Modal, Button } from "flowbite-react";

export interface PlanoTrabalhoModalProps {
    onClose: (open: boolean) => void;
    open: boolean;
    planoTrabalho?: PlanoModel;
}

export default function PlanoTrabalhoModal(props: PlanoTrabalhoModalProps) {

    function onClose() {
        props.onClose(!props.open);
    }

    return (
        <Modal
            dismissible
            onClose={onClose}
            show={props.open}
        >
            <Modal.Header>
                {props.planoTrabalho?.titulo}
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {props.planoTrabalho?.areaTrabalho}
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {props.planoTrabalho?.descricao}
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer className="place-content-center">
                <Button >
                    Inscrever-se
                </Button>
            </Modal.Footer>
        </Modal>
    )
}