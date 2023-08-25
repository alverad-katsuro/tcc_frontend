"use client";
import { UsuarioPlanoProjection } from "@/model/planoDeTrabalho/UsuarioNovoPlanoProjection";
import { TarefaDTO } from "@/model/quadro";
import { Checkbox, Dropdown } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";


export interface DescricaoModalProps {
    task: TarefaDTO;
    setTask: Dispatch<SetStateAction<TarefaDTO | undefined>>;
    pesquisadores: UsuarioPlanoProjection[];

}

export default function MultipleSelectResponsavelCheckmarks({ task, setTask, pesquisadores }: DescricaoModalProps) {


    return (
        <div>
            <Dropdown
                label="Indicar Responsável"
                size="sm"
                color="blue"
                dismissOnClick={false}
            >
                {pesquisadores.map(pesquisador =>
                    <Dropdown.Item className="flex gap-4" >
                        <Checkbox id={pesquisador.usuario.id} defaultChecked={pesquisador.usuario.id === task.responsavel?.id} />
                        {pesquisador.usuario.nome}
                    </Dropdown.Item>
                )}
            </Dropdown>
        </div>
    );
}
