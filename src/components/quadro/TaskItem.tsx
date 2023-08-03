import { TarefaDocument } from "@/model/quadro";
import { Avatar, Badge, Progress } from "flowbite-react";

type TaskItemProps = {
  task: TarefaDocument;
  onClick: (task: TarefaDocument) => void;
};

const TaskItem = ({ task, onClick }: TaskItemProps) => {

  const progresso = 20;

  const color = ["red", "yellow", "green"][Math.floor(progresso % 3)];

  function calculaPrazo() {

  }

  return (

    <div className="flex h-full mx-4">

      <div onClick={() => onClick(task)} className="grid gap-4 p-6 mx-auto w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex gap-4">
          <Badge color="red" className="w-1/6 text-sm block" />
          <Badge color="red" className="w-1/6 h-20 block" />
          <Badge color="red" className="w-1/6 h-20 block" />
          <Badge color="red" className="w-1/6 h-20 block" />
        </div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.titulo}</h5>
        <div className="grid grid-cols-4 items-center">
          <div className="col-span-3">
            <Progress progress={progresso} color={color} />
          </div>
          <Avatar rounded className="place-self-end" />
        </div>
      </div>
    </div>

  );
};

export default TaskItem;
