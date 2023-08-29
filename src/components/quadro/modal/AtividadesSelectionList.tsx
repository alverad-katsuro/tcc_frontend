import { criarAtividade, deleteAtividade, updateIndexAtividade } from "@/api/api";
import { AtividadeCreateDTO, AtividadeModel } from "@/model/atividades/index";
import { getTaskById } from "@/model/atividades/tasks";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  MeasuringStrategy,
  PointerSensor,
  TouchSensor,
  closestCorners,
  defaultDropAnimation,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Button } from 'flowbite-react';
import { useState } from 'react';
import AtividadeItem from './AtividadeItem';
import BoardSectionAtividade from './BoardSectionAtividade';


export interface Props {
  tarefaId: string;
  atividadesIni: AtividadeModel[];

}

export default function AtividadesSelectionList({ tarefaId, atividadesIni }: Props) {

  const [atividades, setAtividades] = useState<AtividadeModel[]>(atividadesIni);

  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 1250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {

    const activeIndex = atividades.findIndex(
      (atividade) => atividade.id === active.id
    );
    const overIndex = atividades.findIndex(
      (atividade) => atividade.id === over?.id
    );

    if (activeIndex !== overIndex) {

      setAtividades(() => {
        const overAtivides = arrayMove(
          atividades,
          activeIndex,
          overIndex
        )

        updateIndex(overAtivides);

        return overAtivides;
      })
    }
    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const atividade = activeTaskId ? getTaskById(atividades, activeTaskId) : null;

  async function adicionarAtividade() {
    const novaAtividade: AtividadeCreateDTO = {
      concluida: false,
      titulo: "Atividade Sem Titulo",
      index: 0,
    }
    const id: string = await criarAtividade(tarefaId, novaAtividade);
    const atividade: AtividadeModel = {
      ...novaAtividade,
      id: id
    }
    setAtividades(oldAtividades => {
      const atividades: AtividadeModel[] = [atividade, ...oldAtividades]

      updateIndex(atividades);
      return atividades;

    })

  }

  function updateIndex(atividades: AtividadeModel[]) {

    const novosIndices: AtividadeModel[] = atividades.map((atividade, i) => {
      const updateIndex: AtividadeModel = {
        ...atividade,
        index: i
      }
      return updateIndex;
    })
    setAtividades(novosIndices)

    updateIndexAtividade(novosIndices);
  }

  function removerAtividade(id: string) {

    deleteAtividade(tarefaId, id)
    setAtividades(atividades => {
      const newAtividades = atividades.filter(atividade => atividade.id !== id);
      return newAtividades;
    })

  }

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          }
        }}
      >
        <div className='flex flex-col gap-4' >
          <BoardSectionAtividade
            id={"Atividades"}
            atividades={atividades}
            remover={removerAtividade}
          />
          <Button className='w-fit' onClick={adicionarAtividade} color="green">Adicionar um item</Button>
          <DragOverlay dropAnimation={dropAnimation}>
            {atividade ? <AtividadeItem atividadeIni={atividade} remover={removerAtividade} /> : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
};
