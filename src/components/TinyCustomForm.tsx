import { Button, ToggleSwitch } from '@/components/flowbite-components';
import { useState } from 'react';
import TinyCustom from './TinyCustom';


export interface TinyCustomProps {
    onSave: (texto: any) => string;
}

export default function TinyCustomForm({ onSave }: TinyCustomProps) {


    const [editar, setEditar] = useState<boolean>(false);

    const [texto, setTexto] = useState<string>("");

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
                        <TinyCustom setTexto={setTexto} texto={texto} />
                        <Button className='self-end w-fit' color={'green'} onClick={salvar}>Salvar</Button>
                    </div>
                    :
                    <div dangerouslySetInnerHTML={{ __html: texto }} className=' text-gray-900 dark:text-white my-4 flex-auto overflow-auto max-h-64' />
                }
            </div>
        </>


    )

}