import { Button, Modal } from "@/components/flowbite-components";
import imageMock from "@/images/bannerUFPA.png";
import { PlanoTrabalhoModel } from "@/model/response/PlanoModel";


export interface PlanoTrabalhoModalProps {
    onClose: (open: boolean) => void;
    open: boolean;
    planoTrabalho?: PlanoTrabalhoModel;
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
            <Modal.Body>

                <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img className="rounded-t-lg w-full" src={imageMock.src} alt="" />
                    </a>
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {props.planoTrabalho?.titulo}
                        </h5>
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {props.planoTrabalho?.areaTrabalho}
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {props.planoTrabalho?.descricao}
                            </p>
                        </div>
                    </div>
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