import { Task } from "@/model/quadro";
import { Avatar, Badge, Button, Progress } from "flowbite-react";

type TaskItemProps = {
  task: Task;
};

const TaskItem = ({ task }: TaskItemProps) => {
  const color = ["red", "yellow", "green"][Math.floor(task.progress % 3)];

  return (

    <div className="grid gap-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex gap-4">
        <Badge color="red" className="w-1/6 text-sm block" />
        <Badge color="red" className="w-1/6 h-20 block" />
        <Badge color="red" className="w-1/6 h-20 block" />
        <Badge color="red" className="w-1/6 h-20 block" />
      </div>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.title}</h5>
      <div className="grid grid-cols-4 items-center">
        <div className="col-span-3">
          <Progress progress={task.progress} color={color} />
        </div>
        <Avatar rounded className="place-self-end" />
      </div>
    </div>

  );
};

export default TaskItem;
