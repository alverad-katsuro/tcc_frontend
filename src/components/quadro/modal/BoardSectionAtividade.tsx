import { AtividadeModel } from '@/model/atividades';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItems from '../SortableTaskItem';
import AtividadeItem from './AtividadeItem';

type BoardSectionProps = {
  id: string;
  atividades: AtividadeModel[];
  remover: (id: string) => void;
};

const BoardSectionAtividade = ({ id, atividades, remover }: BoardSectionProps) => {

  return (
    <div className='block h-full overflow-auto'>
      <SortableContext
        items={atividades}
        strategy={verticalListSortingStrategy}
      >

        <div className='flex flex-col gap-2'>
          {atividades.map((task) => (
            <div key={task.id}>
              <SortableItems id={task.id}>
                <AtividadeItem atividadeIni={task} remover={remover} />
              </SortableItems>
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default BoardSectionAtividade;
