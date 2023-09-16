import { Button, ToggleSwitch } from '@/components/flowbite-components';
import { tinymceKey } from '@/constants/TinymceKey';
import { Editor } from '@tinymce/tinymce-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';


export interface TinyCustomProps<T> {
    isEditavel?: boolean;
    label?: React.ReactNode;
    id?: string;
    elementoState: [T | undefined, Dispatch<SetStateAction<T | undefined>>];
    elementField: keyof T;
}

export default function TinyCustomFormm<T>({ isEditavel = false, label, id, elementoState, elementField }: TinyCustomProps<T>) {

    const [element, setElement] = elementoState;

    const [editar, setEditar] = useState<boolean>(isEditavel);

    function salvar() {
        setEditar(e => !e)
    }

    const editorRef = useRef<any>(null);

    const [mode, setMode] = useState<boolean>(false);

    useEffect(() => {

        setMode(window?.matchMedia('(prefers-color-scheme: dark)').matches);

    }, [setMode])

    return (

        <>
            <div>

                <div className='flex-col flex sm:flex-row'>
                    {label !== undefined ? label :
                        <h5 className="font-bold tracking-tight text-gray-900 dark:text-white my-4 flex-auto">
                            Descrição
                        </h5>
                    }

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
                            id={id}
                            onInit={(evt, editor) => editorRef.current = editor}
                            apiKey={tinymceKey}
                            value={element !== undefined && element !== null ? element[elementField] as string : ""}
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
                            onEditorChange={(e) => setElement((el) => {
                                if (el !== undefined) {
                                    const newEl = { ...el, [elementField]: e };
                                    return newEl;
                                }
                            })}

                        />
                        <Button className='self-end w-fit' color={'green'} onClick={salvar}>Salvar</Button>
                    </div>
                    :
                    <div dangerouslySetInnerHTML={{ __html: element !== undefined && element !== null ? element[elementField] as string : "" }} className=' text-gray-900 dark:text-white my-4 flex-auto overflow-auto max-h-64' />
                }
            </div>
        </>


    )

}