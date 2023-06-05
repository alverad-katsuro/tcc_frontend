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
};

const BoardSection = ({ id, title, tasks }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className='space-y-4'>
      <h1 className="text-3xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className='gap-4 grid'>
          {tasks.map((task) => (
            <div key={task.id}>
              <SortableTaskItem id={task.id}>
                <TaskItem task={task} />
              </SortableTaskItem>
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default BoardSection;
