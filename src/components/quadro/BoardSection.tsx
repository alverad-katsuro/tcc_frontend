import { ColunaKanban, TarefaDTO } from '@/model/quadro';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableTaskItem from './SortableTaskItem';
import TaskItem from './TaskItem';
import BoardTitulo from './BoardTitulo';

type BoardSectionProps = {
  id: string;
  title: ColunaKanban;
  tasks: TarefaDTO[];
  onClick: (task: TarefaDTO) => void;
  addTask: () => void;
};

const BoardSection = ({ id, title, tasks, onClick, addTask }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="flex flex-col gap-4 h-full w-screen max-w-xs">

      <BoardTitulo titulo={title} addTask={addTask} />

      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
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
