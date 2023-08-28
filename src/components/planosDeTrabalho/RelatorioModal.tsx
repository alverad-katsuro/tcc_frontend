import { submeterRelatorioPlanoTrabalho } from "@/api/api";
import { Button, FileInput, Modal } from "@/components/flowbite-components";
import { notification } from "@/utils/Notification";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import { mixed, object } from "yup";

interface InscricaoModalProps {
    planoTrabalhoId: number;
    stateModal: [boolean, Dispatch<SetStateAction<boolean>>];
}


export default function RelatorioModal({ planoTrabalhoId, stateModal }: InscricaoModalProps) {

    const [show, setShow] = stateModal;

    const router = useRouter();

    const validationSchema = object<{ arquivo: File | undefined }>({
        arquivo: mixed().required("Insira o curriculo"),
    })

    const formik = useFormik({
        initialValues: { arquivo: undefined },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (values.arquivo) {
                submeterRelatorioPlanoTrabalho(planoTrabalhoId, values.arquivo).then(({ data, response }) => {
                    notification(data, 'success');
                    setShow(e => !e);
                });
            }
        }
    })

    function uploadArquivo(e: ChangeEvent<HTMLInputElement>) {
        if (!e.currentTarget.files) {
            // A propriedade files é nula, então nenhum arquivo válido foi selecionado
            formik.setFieldValue("arquivo", undefined)
            return;
        }

        const file = e.currentTarget.files[0];
        if (!file) {
            // Nenhum arquivo foi selecionado, ou seja, o array de arquivos está vazio
            formik.setFieldValue("arquivo", undefined)
            return;
        }

        // Um arquivo válido foi selecionado, então atualizamos o estado da inscrição
        formik.setFieldValue("arquivo", file)
    }

    const onDismiss = useCallback(() => {
        setShow(e => !e)
        router.back()
    }, [router])

    return (
        <Modal
            size="xl"
            show={show}
            onClose={onDismiss}
        >
            <Modal.Header>
                Menu de Submissão do Relatório
            </Modal.Header>
            <Modal.Body>

                <form className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 block" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
                    <div className="p-5 grid gap-8">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                            Envie o relatório.
                        </h5>
                        <div className="space-y-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="imageFile">Curriculo</label>
                                <FileInput
                                    required
                                    id="arquivo"
                                    accept="application/pdf"
                                    onChange={uploadArquivo}
                                    helperText={formik.errors.arquivo as string}
                                    color={formik.errors.arquivo ? "failure" : undefined}
                                />
                            </div>

                        </div>
                        <Button type="submit" className="justify-self-center w-fit">Confirmar envio</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}