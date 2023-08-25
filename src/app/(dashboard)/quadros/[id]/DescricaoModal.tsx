import { updateTarefa } from "@/api/api";
import TinyCustomFormm from "@/components/TinyCustomFormm";
import { Button, Modal } from "@/components/flowbite-components";
import DataRangeCustom from "@/components/quadro/DataRangeCustom";
import MultipleSelectResponsavelCheckmarks from "@/components/quadro/MultipleSelectResponsavelCheckmarks";
import AtividadesSelectionList from "@/components/quadro/modal/AtividadesSelectionList";
import { UsuarioPlanoProjection } from "@/model/planoDeTrabalho/UsuarioNovoPlanoProjection";
import { BoardSections, ColunaKanban, TarefaDTO } from "@/model/quadro";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import useDebounce from "./Deb";
import TituloTarefa from "./TituloTarefa";


export interface DescricaoModalProps {
    task: TarefaDTO;
    setTask: Dispatch<SetStateAction<TarefaDTO | undefined>>;
    setBoardSections: Dispatch<SetStateAction<BoardSections>>;

    open: boolean;
    setOpen: (open: boolean) => void;
    pesquisadores: UsuarioPlanoProjection[];

}


export default function DescricaoModal({ task, setOpen, open, setTask, setBoardSections, pesquisadores }: DescricaoModalProps) {

    const rootRef = useRef<HTMLDivElement>(null);

    const debouncedSearch = useDebounce(task, saveTask, 500)

    const { data } = useSession();

    function saveTask(task?: TarefaDTO) {
        if (task != undefined) {
            updateTarefa(task);
        }
    }

    useEffect(() => {
        if (debouncedSearch) {
            console.log(debouncedSearch)
        }
    }, [debouncedSearch])

    function voltarParaInProgress() {
        newSetTask(task => {
            if (task != undefined) {
                const newTask: TarefaDTO = { ...task, colunaKanban: "IN_PROGRESS" as ColunaKanban }
                return newTask;
            }
        })
    }

    function calcularEsforco() {
        const usuario: UsuarioPlanoProjection | undefined = pesquisadores.find(pesquisador => pesquisador.usuario.id === task.responsavel?.id)

        if (task.fim !== undefined && task.inicio !== undefined && usuario?.cargaHoraria !== undefined) {
            const Difference_In_Time = new Date(task.fim).getTime() - new Date(task.inicio).getTime();

            const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

            const diasSemana = 5;

            const horasDia = usuario?.cargaHoraria / diasSemana;

            return Difference_In_Days * horasDia;
        }
        return 0;
    }


    const newSetTask = (updateFunction: SetStateAction<TarefaDTO | undefined>) => {
        setTask((currentTask) => {
            const updatedTask = typeof updateFunction === 'function' ? updateFunction(currentTask) : updateFunction;

            if (updatedTask !== undefined) {
                setBoardSections((secoesDoQuadro) => {
                    const colunaDoQuadro = updatedTask.colunaKanban;
                    const novaSecaoDoQuadro = secoesDoQuadro[colunaDoQuadro].map((tarefaNaSecao) => {
                        if (tarefaNaSecao.id === updatedTask.id) {
                            return { ...updatedTask };
                        }
                        return tarefaNaSecao;
                    });

                    return {
                        ...secoesDoQuadro,
                        [colunaDoQuadro]: novaSecaoDoQuadro,
                    };
                });
            }
            return updatedTask;
        });
    };


    return (

        <div ref={rootRef}>
            <Modal
                root={rootRef.current ?? undefined}
                dismissible
                show={open}
                onClose={() => setOpen(!open)}
                size="5xl"
            >
                <Modal.Body>

                    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">
                        <TituloTarefa tarefa={task} setTask={newSetTask} />
                        <div className="flex-col flex sm:flex-row ">
                            <div className="flex-auto">
                                <div className="p-5 space-y-6">
                                    <div className="flex space-x-4 items-center">
                                        <h5 className="flex-auto text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            {task.responsavel?.nome}
                                        </h5>

                                        <div className="flex-col flex sm:flex-row">
                                            <DataRangeCustom setTask={newSetTask} tarefa={task} />
                                            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white self-center text-center">
                                                Esforço: {calcularEsforco()} horas.
                                            </h5>
                                        </div>
                                    </div>
                                    <div>
                                        {task !== undefined ?
                                            <TinyCustomFormm elementoState={[task, newSetTask]} id="task" elementField="descricao" />
                                            : <></>

                                        }
                                    </div>
                                    <div>
                                        <h5 className="font-bold tracking-tight text-gray-900 dark:text-white my-4">
                                            Atividades
                                        </h5>
                                        {task !== undefined && <AtividadesSelectionList tarefaId={task.id} atividadesIni={task.atividades} />}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-auto flex-col gap-4 p-4 max-w-[12rem]">
                                <h5 className="font-bold tracking-tight text-gray-900 dark:text-white  text-center">
                                    Menu
                                </h5>
                                <MultipleSelectResponsavelCheckmarks pesquisadores={pesquisadores} setTask={newSetTask} task={task} />
                                {task.responsavel === undefined &&
                                    <Button color={'dark'} >Ingressar na Tarefa</Button>
                                }
                                {task?.colunaKanban === ColunaKanban.DONE && data?.user?.role?.includes("ROLE_ADMIN") ?
                                    <Button color={'dark'} onClick={voltarParaInProgress}>Voltar uma etapa</Button> : <></>
                                }
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </div>

    )

}