import { AtividadeModel } from "@/model/atividades/index";
import { getTaskById } from '@/model/atividades/tasks';
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
import { useState } from 'react';
import AtividadeItem from './AtividadeItem';
import BoardSection from './BoardSection';


const AtividadesSelectionList = () => {

  const [atividades, setAtividades] = useState<AtividadeModel[]>([
    {
      id: "1",
      checked: false,
      titulo: "asdasdsad"
    },
    {
      id: "2",
      checked: true,
      titulo: "111212121212"
    }

  ]);

  const [id, setId] = useState<number>(atividades.length + 1);

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

    const activeIndex = atividades.findIndex(
      (task) => task.id === active.id
    );
    const overIndex = atividades.findIndex(
      (task) => task.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setAtividades((atividades) =>
        arrayMove(
          atividades,
          activeIndex,
          overIndex)
      )
    }
    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(atividades, activeTaskId) : null;

  function adicionarAtividade() {
    const ativi: AtividadeModel = {
      id: String(id),
      checked: false,
      titulo: "asdasdsad"
    }
    setId(id => id + 1);
    setAtividades(atividades => {
      atividades.push(ativi);
      return atividades;
    });

  }

  function removerAtividade(id: string) {
    setAtividades(atividades => atividades.filter(atividade => atividade.id !== id))
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
            atividades={atividades}
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

export default AtividadesSelectionList;
