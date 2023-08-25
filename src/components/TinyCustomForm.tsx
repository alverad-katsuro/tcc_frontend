import { Button, ToggleSwitch } from '@/components/flowbite-components';
import { useState } from 'react';
import TinyCustom from './TinyCustom';


export interface TinyCustomProps {
    onSave: (texto: any) => void;
    descricao?: string;
    isEditavel?: boolean;
    label?: React.ReactNode;
    id?: string;
}

export default function TinyCustomForm({ onSave, descricao, isEditavel = false, label, id }: TinyCustomProps) {

    const [editar, setEditar] = useState<boolean>(isEditavel);

    const [texto, setTexto] = useState<string>(descricao ?? "");

    function salvar() {
        setEditar(e => !e)
        onSave(texto);
    }

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
                        <TinyCustom setTexto={setTexto} texto={texto} id={id} />
                        <Button className='self-end w-fit' color={'green'} onClick={salvar}>Salvar</Button>
                    </div>
                    :
                    <div dangerouslySetInnerHTML={{ __html: texto }} className=' text-gray-900 dark:text-white my-4 flex-auto overflow-auto max-h-64' />
                }
            </div>
        </>


    )

}