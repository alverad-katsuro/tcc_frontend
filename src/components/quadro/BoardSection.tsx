import { ColunaKanban, TarefaDocument } from '@/model/quadro';
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
  tasks: TarefaDocument[];
  onClick: (task: TarefaDocument) => void;
  addTask: () => void;
};

const BoardSection = ({ id, title, tasks, onClick, addTask }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="grid gap-4 p-6 mx-auto w-full bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">

      <BoardTitulo titulo={title} addTask={addTask} />

      <div className='block h-full overflow-auto'>
        <SortableContext
          id={id}
          items={tasks}
          strategy={verticalListSortingStrategy}
        >
          <div className='h-screen'>

            <div ref={setNodeRef} className='grid gap-4 overflow-auto'>
              {tasks.map((task) => (
                <div key={task.id}>
                  <SortableTaskItem id={task.id}>
                    <TaskItem task={task} onClick={onClick} />
                  </SortableTaskItem>
                </div>
              ))}
            </div>
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default BoardSection;
