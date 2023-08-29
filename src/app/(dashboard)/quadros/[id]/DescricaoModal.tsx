import { deleteTarefa, ingressarTarefa, updateTarefa } from "@/api/api";
import TinyCustomFormm from "@/components/TinyCustomFormm";
import { Button, Modal } from "@/components/flowbite-components";
import DataRangeCustom from "@/components/quadro/DataRangeCustom";
import MultipleSelectResponsavelCheckmarks from "@/components/quadro/MultipleSelectResponsavelCheckmarks";
import AtividadesSelectionList from "@/components/quadro/modal/AtividadesSelectionList";
import Impedimentos from "@/components/quadro/modal/Impedimentos";
import { UsuarioPlanoProjection } from "@/model/planoDeTrabalho/UsuarioPlanoProjection";
import { BoardSections, TarefaDTO } from "@/model/quadro";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
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

    const debouncedSearch = useDebounce(task, saveTask, 1000)

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
    }, [debouncedSearch]) //TODO pq coloquei task?

    function calcularEsforco() {
        const usuario: UsuarioPlanoProjection | undefined = pesquisadores.find(pesquisador => pesquisador.usuario.id === task.responsavel?.id)

        if (task.fim !== undefined && task.inicio !== undefined && usuario?.cargaHoraria !== undefined) {
            const Difference_In_Time = new Date(task.fim).getTime() - new Date(task.inicio).getTime();

            const Difference_In_Days = 1 + (Difference_In_Time / (1000 * 3600 * 24)); // 1 + para contar o dia inicial

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

    function ingressarTarefaDisponivel() {
        ingressarTarefa(task.id).then(() => {
            newSetTask((currentTask) => {
                if (currentTask) {
                    const newTask: TarefaDTO | undefined = { ...currentTask, responsavel: { id: data?.user?.sub } }; // ,  responsavel: data?.user?.name
                    return newTask
                }
                return currentTask;
            });
        }).catch()
    }

    function deletarTarefa() {
        deleteTarefa(task.id).then(() => {
            setBoardSections((secoesDoQuadro) => {
                const colunaDoQuadro = task.colunaKanban;
                const novaSecaoDoQuadro = secoesDoQuadro[colunaDoQuadro].filter((tarefaNaSecao) => {
                    if (tarefaNaSecao.id === task.id) {
                        return false;
                    }
                    return true;
                });
                return {
                    ...secoesDoQuadro,
                    [colunaDoQuadro]: novaSecaoDoQuadro,
                }

            });
            setOpen(false);
        });

    }

    return (

        <div ref={rootRef}>

            <Modal
                root={rootRef.current ?? undefined}
                dismissible
                show={open}
                onClose={() => {
                    setOpen(!open)
                    setTask(undefined);
                }}
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
                                        <TinyCustomFormm elementoState={[task, newSetTask]} id="task" elementField="descricao" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold tracking-tight text-gray-900 dark:text-white my-4">
                                            Atividades
                                        </h5>
                                        <AtividadesSelectionList tarefaId={task.id} atividadesIni={task.atividades} />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-row">
                                            <h5 className="font-bold tracking-tight text-gray-900 dark:text-white my-4 flex-1">
                                                Impedimentos
                                            </h5>
                                            <Button className="place-self-end w-fit self-center" color="green" onClick={() => newSetTask(old => {
                                                if (old) {
                                                    const newTask: TarefaDTO = { ...old, impedimentos: [...old.impedimentos, { impedimento: "Não informado" }] }
                                                    return newTask;
                                                }
                                            })} >
                                                <AiOutlinePlusCircle className="text-2xl " />
                                            </Button>
                                        </div>
                                        {task.impedimentos.map((impedimento, index) =>
                                            <Impedimentos key={index} index={index} impedimento={impedimento} setTask={newSetTask} />
                                        )}
                                    </div>
                                </div>
                            </div>
                            {task.responsavel === undefined || data?.user?.role?.includes("ROLE_ADMIN") ?
                                <div className="flex flex-auto flex-col gap-4 p-4 max-w-[12rem]">
                                    <h5 className="font-bold tracking-tight text-gray-900 dark:text-white  text-center">
                                        Menu
                                    </h5>
                                    {task.responsavel === undefined &&
                                        (<Button color={'dark'} onClick={ingressarTarefaDisponivel}>Ingressar na Tarefa</Button>)
                                    }
                                    {data?.user?.role?.includes("ROLE_ADMIN") ? (
                                        <>
                                            <MultipleSelectResponsavelCheckmarks pesquisadores={pesquisadores} setTask={newSetTask} task={task} />
                                            <Button color={'red'} onClick={deletarTarefa}>Deletar Tarefa</Button>
                                        </>)
                                        : <></>
                                    }
                                </div> : <></>
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </div>

    )

}