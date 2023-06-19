import { AtividadeModel } from '@/model/atividades';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableTaskItem from '../SortableTaskItem';
import AtividadeItem from './AtividadeItem';

type BoardSectionProps = {
  id: string;
  atividades: AtividadeModel[];
  remover: (id: string) => void;
};

const BoardSection = ({ id, atividades: atividade, remover }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className='block h-full overflow-auto'>
      <SortableContext
        id={id}
        items={atividade}
        strategy={verticalListSortingStrategy}
      >

        <div ref={setNodeRef} className='flex flex-col gap-2 px-2'>
          {atividade.map((task) => (
            <div key={task.id}>
              <SortableTaskItem id={task.id}>
                <AtividadeItem atividade={task} remover={remover} />
              </SortableTaskItem>
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default BoardSection;
