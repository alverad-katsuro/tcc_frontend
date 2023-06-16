import { Task } from '@/model/quadro';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableTaskItem from './SortableTaskItem';
import TaskItem from './TaskItem';

type BoardSectionProps = {
  id: string;
  title: string;
  tasks: Task[];
  onClick: (task: Task) => void;
};

const BoardSection = ({ id, title, tasks, onClick }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className=''>
      <h1 className="block text-3xl text-center font-bold tracking-tight text-gray-900 dark:text-white p-4">{title}</h1>

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
