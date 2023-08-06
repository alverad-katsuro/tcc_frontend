import { ColunaKanban, TarefaDTO } from '@/model/quadro';
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
  tasks: TarefaDTO[];
  onClick: (task: TarefaDTO) => void;
  addTask: () => void;
};

const BoardSection = ({ id, title, tasks, onClick, addTask }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  const sortedTasks = tasks.slice().sort((taskA, taskB) => {
    // Compara as posições kanban das tarefas.
    // Verifica se os atributos posicaoKanban existem para evitar erros.
    const posicaoA = taskA.posicaoKanban ?? 0;
    const posicaoB = taskB.posicaoKanban ?? 0;

    return posicaoA - posicaoB;
  });

  return (
    <div className="flex flex-col gap-4 h-full w-screen max-w-xs">

      <BoardTitulo titulo={title} addTask={addTask} />

      <SortableContext
        id={id}
        items={sortedTasks}
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
