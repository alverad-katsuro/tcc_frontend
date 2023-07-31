import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';


export interface TinyCustomProps {
    texto?: string;
    setTexto?: (texto: string) => void;
    id?: string;
}

export default function TinyCustom({ texto, setTexto, id = "textArea" }: TinyCustomProps) {

    const editorRef = useRef<any>(null);

    const [mode, setMode] = useState<boolean>(false);

    useEffect(() => {

        setMode(window?.matchMedia('(prefers-color-scheme: dark)').matches);

    }, [setMode])


    return (

        <>
            <Editor
                id={id}
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
        </>


    )

}