import { Button, ToggleSwitch } from '@/components/flowbite-components';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';


export interface TinyCustomProps {
    onSave: (texto: any) => string;
}

export default function TinyCustom({ onSave }: TinyCustomProps) {

    const editorRef = useRef<any>(null);

    const [editar, setEditar] = useState<boolean>(false);

    const [texto, setTexto] = useState<string>("");

    const [mode, setMode] = useState<boolean>(false);

    useEffect(() => {

        setMode(window?.matchMedia('(prefers-color-scheme: dark)').matches);

    }, [setMode])

    function salvar() {
        setEditar(e => !e)
        onSave(texto);
    }

    return (

        <>
            <div>

                <div className='flex-col flex sm:flex-row'>
                    <h5 className="font-bold tracking-tight text-gray-900 dark:text-white my-4 flex-auto">
                        Descrição
                    </h5>

                    <div className='self-center'>
                        <ToggleSwitch
                            label="Editar"
                            checked={editar}
                            onChange={() => setEditar(e => !e)}
                        />
                    </div>
                </div>
                {editar ?
                    <div className='flex flex-col gap-4'>
                        <Editor
                            id='textArea'
                            onInit={(evt, editor) => editorRef.current = editor}
                            apiKey='62cqow4ni7it7aic3ti7otiey0heae9aupfz6y9vayv9tfqf'
                            value={texto}
                            init={{
                                menubar: true,
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                skin: mode ? 'oxide-dark' : "oxide",
                                content_css: mode ? 'dark' : "default",
                                language: "pt_BR"
                            }}
                            onEditorChange={setTexto}

                        />
                        <Button className='self-end w-fit' color={'green'} onClick={salvar}>Salvar</Button>
                    </div>
                    :
                    <div dangerouslySetInnerHTML={{ __html: texto }} className=' text-gray-900 dark:text-white my-4 flex-auto overflow-auto max-h-64' />
                }
            </div>
        </>


    )

}