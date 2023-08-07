import { criarInscricao } from "@/api/api";
import { Button, FileInput, Modal } from "@/components/flowbite-components";
import { ProcessoSeletivoDTO } from "@/model/processoSeletivo/ProcessoSeletivoDTO";
import { notification } from "@/utils/Notification";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";
import { mixed, number, object } from "yup";

interface InscricaoModalProps {
    processoSeletivo: ProcessoSeletivoDTO;
    stateModal?: [boolean, Dispatch<SetStateAction<boolean>>];
}

export interface InscricaoRequest {
    processoSeletivoId: number;
    arquivo?: File;
}

export default function InscricaoModal({ processoSeletivo, stateModal }: InscricaoModalProps) {

    const [show, setShow] = stateModal ?? useState<boolean>(false);

    const router = useRouter();

    const validationSchema = object<InscricaoRequest>({
        processoSeletivoId: number().min(1, "Selecione um plano de trabalho.").required("Obrigatório"),
        arquivo: mixed().required("Insira o curriculo"),
    })


    const formik = useFormik({
        initialValues: {
            processoSeletivoId: processoSeletivo.id!,
            arquivo: undefined
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values: InscricaoRequest, { resetForm }) => {
            criarInscricao(values).then((r) => {
                notification(r, 'success');
                resetForm();
                router.refresh();
            });
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
                Menu de Inscrição - {processoSeletivo?.planoTrabalho.titulo}
            </Modal.Header>
            <Modal.Body>

                <form className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 block" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
                    <div className="p-5 grid gap-8">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                            Envie seu curriculo.
                        </h5>
                        <div className="space-y-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="imageFile">Curriculo</label>
                                <FileInput
                                    required
                                    id="arquivo"
                                    accept="image/*"
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