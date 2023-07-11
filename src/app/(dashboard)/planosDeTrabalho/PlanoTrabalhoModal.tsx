import { Button, Modal } from "@/components/flowbite-components";
import imageMock from "@/images/bannerUFPA.png";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


export interface PlanoTrabalhoModalProps {
    onClose: (open: boolean) => void;
    open: boolean;
    planoTrabalho?: PlanoTrabalhoModel;
}

export default function PlanoTrabalhoModal({ onClose, open, planoTrabalho }: PlanoTrabalhoModalProps) {

    const asPath = usePathname()

    return (
        <Modal
            size="xl"
            dismissible
            onClose={() => onClose(!open)}
            show={open}
        >
            <Modal.Body>

                <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link href={`${asPath}/${planoTrabalho?.id}`}>
                        <img className="rounded-t-lg w-full" src={imageMock.src} alt="" />
                    </Link>
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {planoTrabalho?.titulo}
                        </h5>
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {planoTrabalho?.areaTrabalho}
                            </p>
                            {planoTrabalho !== undefined ?
                                <div dangerouslySetInnerHTML={{ __html: planoTrabalho.descricao }} className='text-base leading-relaxed text-gray-500 dark:text-gray-400overflow-auto max-h-64' /> : <></>
                            }
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