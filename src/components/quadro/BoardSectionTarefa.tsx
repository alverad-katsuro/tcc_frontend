import { ColunaKanban, TarefaBasicDTO } from '@/model/quadro';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSession } from "next-auth/react";
import BoardTitulo from './BoardTitulo';
import SortableItems from './SortableTaskItem';
import TaskItem from './TaskItem';

type BoardSectionProps = {
  id: string;
  title: ColunaKanban;
  tasks: TarefaBasicDTO[];
  onClick: (task: string) => void;
  addTask: () => void;
};

const BoardSectionTarefa = ({ id, title, tasks, onClick, addTask }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  const { data } = useSession();

  const disabled = ColunaKanban.DONE === title && !data?.user?.role?.includes("ROLE_ADMIN");

  return (
    <div className="flex flex-col gap-4 h-full w-screen lg:w-full max-w-xs xl:max-w-lg">

      <BoardTitulo titulo={title} addTask={addTask} />

      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
        disabled={disabled}
      >
        <div ref={setNodeRef} className='flex flex-col gap-4 overflow-auto'>
          {tasks.map((task) => (
            <div key={task.id}>
              <SortableItems id={task.id}>
                <TaskItem task={task} onClick={onClick} />
              </SortableItems>
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default BoardSectionTarefa;
