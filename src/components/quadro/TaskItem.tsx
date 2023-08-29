"use client";
import { ColunaKanban, TarefaBasicDTO } from "@/model/quadro";
import { Avatar, Badge, Progress } from "flowbite-react";
import { AiOutlineFieldTime } from "react-icons/ai";
type TaskItemProps = {
  task: TarefaBasicDTO;
  onClick: (task: string) => void;
};

export default function TaskItem({ task, onClick }: TaskItemProps) {// TODO: Se task concluida retornar color green

  const progresso = calculaPrazo(task.fim, task.inicio);

  const color = task.colunaKanban === ColunaKanban.DONE ? "green" : ["green", "yellow", "red"][calcColor()];

  function calcColor() {
    if (progresso <= 60) {
      return 0;
    } else if (progresso <= 80)
      return 1;
    else {
      return 2;
    }
  }

  function calculaPrazo(dataFim?: string, dataIni?: string) {
    if (!dataFim || !dataIni) {
      return 0;
    }
    const dF: number = new Date(dataFim).getTime();
    const dI: number = new Date(dataIni).getTime();
    const dH: number = Date.now();
    if (dI > dH) {
      return 0;
    }
    return Number(((1 - (dF - Date.now()) / (dF - dI)) * 100).toFixed(2));
  }

  return (

    <div className="flex h-full mx-4">

      <div onClick={() => onClick(task.id)} className="grid gap-4 p-6 mx-auto w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex gap-4">
          <Badge color="red" className="w-1/6 text-sm block" />
          <Badge color="red" className="w-1/6 text-sm block" />
          <Badge color="red" className="w-1/6 text-sm block" />
          <Badge color="red" className="w-1/6 text-sm block" />
          <Badge color="red" className="w-1/6 text-sm block" />
        </div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.titulo}</h5>
        <div className="grid grid-cols-4 items-center">
          <div className="col-span-3 flex flex-row gap-4">
            <div className="w-full self-center">
              <Progress progress={progresso} className="h-[10px] rounded-full flex-1" color={color} />
            </div>
            <AiOutlineFieldTime className="font-bold tracking-tight text-gray-900 dark:text-white" size={30} />
          </div>
          <Avatar img={task.responsavel?.picture} rounded className="place-self-end" />
        </div>
      </div>
    </div>

  );
};
