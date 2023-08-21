import { criarAtividade } from "@/api/api";
import { AtividadeCreateDTO, AtividadeModel } from "@/model/atividades/index";
import { getTaskById } from '@/model/atividades/tasks';
import { TarefaDTO } from "@/model/quadro";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  defaultDropAnimation,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Button } from 'flowbite-react';
import { Dispatch, SetStateAction, useState } from 'react';
import AtividadeItem from './AtividadeItem';
import BoardSection from './BoardSection';


export interface Props {
  tarefa: TarefaDTO;
  setTask: Dispatch<SetStateAction<TarefaDTO | undefined>>;

}

export default function AtividadesSelectionList({ tarefa, setTask }: Props) {

  //const debouncedSearch = useDebounce(tarefa, saveTask, 500) acho q tbm n vai precisar


  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {

    const activeIndex = tarefa.atividades.findIndex(
      (task) => task.id === active.id
    );
    const overIndex = tarefa.atividades.findIndex(
      (task) => task.id === over?.id
    );

    if (activeIndex !== overIndex) {

      setTask(task => {
        if (task !== undefined) {
          const overAtivides = arrayMove(
            task.atividades,
            activeIndex,
            overIndex
          )

          //updateIndex(overAtivides);  //FIXME testar a necessidade disso

          const newTask: TarefaDTO = { ...task, atividades: overAtivides }
          return newTask;
        }
      })
    }
    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(tarefa?.atividades, activeTaskId) : null;

  async function adicionarAtividade() {
    const novaAtividade: AtividadeCreateDTO = {
      checked: false,
      titulo: "Atividade Sem Titulo",
      index: 0,
    }
    const id: string = await criarAtividade(tarefa.id, novaAtividade);
    const atividade: AtividadeModel = {
      ...novaAtividade,
      id: id
    }

    setTask(task => {
      if (task !== undefined) {
        const newTask: TarefaDTO = { ...task, atividades: [atividade, ...task.atividades] }
        return newTask;
      }
    })

    updateIndex(tarefa.atividades);
  }

  function updateIndex(atividades: AtividadeModel[]) {
    const novosIndices: AtividadeModel[] = atividades.map((atividade, i) => {
      const updateIndex: AtividadeModel = {
        ...atividade,
        index: i
      }
      return updateIndex;
    })
    setTask(task => {
      if (task !== undefined) {
        const newTask: TarefaDTO = { ...task, atividades: novosIndices }
        return newTask;
      }
    })
    //updateIndexAtividade(tarefa.id, novosIndices); //FIXME testar a necessidade disso
  }

  function removerAtividade(id: string) {
    setTask(task => {
      if (task !== undefined) {
        const newAtividades = task.atividades.filter(atividade => atividade.id !== id);
        return { ...task, atividades: newAtividades };
      }
    })

    //FIXME verificar se precisa fazer request to update
  }

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className='flex flex-col gap-4' >
          <BoardSection
            id={"Atividades"}
            atividades={tarefa.atividades}
            remover={removerAtividade}
          />
          <Button className='w-fit' onClick={adicionarAtividade}>Adicionar um item</Button>
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <AtividadeItem atividade={task} remover={removerAtividade} /> : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
};
