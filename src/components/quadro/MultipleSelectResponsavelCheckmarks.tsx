"use client";
import { consultarTarefa, indicarPesquisadorTarefa } from "@/api/api";
import { UsuarioPlanoProjection } from "@/model/planoDeTrabalho/UsuarioPlanoProjection";
import { TarefaDTO } from "@/model/quadro";
import { Checkbox, Dropdown } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";


export interface DescricaoModalProps {
    task: TarefaDTO;
    setTask: Dispatch<SetStateAction<TarefaDTO | undefined>>;
    pesquisadores: UsuarioPlanoProjection[];

}

export default function MultipleSelectResponsavelCheckmarks({ task, setTask, pesquisadores }: DescricaoModalProps) {

    function selecionaPesquisador(pesquisadorId?: string) {
        if (pesquisadorId !== undefined) {
            if (task.responsavel?.id === pesquisadorId) {
                indicarPesquisadorTarefa(task.id, undefined).then(() => {
                    consultarTarefa(task.id).then(tarefa => {
                        setTask(tarefa)
                    })
                })
            } else {
                indicarPesquisadorTarefa(task.id, pesquisadorId).then(() => {
                    consultarTarefa(task.id).then(tarefa => {
                        setTask(tarefa)
                    })
                })
            }

        }
    }

    return (
        <Dropdown
            label="Indicar Responsável"
            size="sm"
            color="blue"
            dismissOnClick={false}
        >
            {pesquisadores.length === 0 && <Dropdown.Item>Nenhum pesquisador disponível</Dropdown.Item>}
            {pesquisadores.map(pesquisador =>
                <Dropdown.Item className="flex gap-4" key={pesquisador.usuario.id}  >
                    <Checkbox id={pesquisador.usuario.id} checked={pesquisador.usuario.id === task.responsavel?.id} onChange={() => selecionaPesquisador(pesquisador.usuario.id)} />
                    {pesquisador.usuario.nome}
                </Dropdown.Item>
            )}
        </Dropdown>
    );
}
