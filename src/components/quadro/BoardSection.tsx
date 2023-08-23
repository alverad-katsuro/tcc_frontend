import { ColunaKanban, TarefaBasicDTO } from '@/model/quadro';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import BoardTitulo from './BoardTitulo';
import SortableTaskItem from './SortableTaskItem';
import TaskItem from './TaskItem';

type BoardSectionProps = {
  id: string;
  title: ColunaKanban;
  tasks: TarefaBasicDTO[];
  onClick: (task: string) => void;
  addTask: () => void;
};

const BoardSection = ({ id, title, tasks, onClick, addTask }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="flex flex-col gap-4 h-full w-screen lg:w-full max-w-xs xl:max-w-lg">

      <BoardTitulo titulo={title} addTask={addTask} />

      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
        disabled={title === ColunaKanban.DONE}
      >
        <div ref={setNodeRef} className='flex flex-col gap-4 overflow-auto'>
          {tasks.map((task) => (
            <div key={task.id}>
              <SortableTaskItem id={task.id}>
                <TaskItem task={task} onClick={onClick} />
              </SortableTaskItem>
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default BoardSection;
