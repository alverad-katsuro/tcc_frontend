import { criarAtividade, updateIndexAtividade } from "@/api/api";
import { AtividadeCreateDTO, AtividadeModel } from "@/model/atividades/index";
import { getTaskById } from "@/model/atividades/tasks";
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


export interface Props {
  tarefaId: string;
  atividadesIni: AtividadeModel[];

}

export default function AtividadesSelectionList({ tarefaId, atividadesIni }: Props) {//TODO tirar set Task e usar useState interno não posso fzr isso aqui n

  const [atividades, setAtividades] = useState<AtividadeModel[]>(atividadesIni);

  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),

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

      setAtividades(atividade => {
        const overAtivides = arrayMove(
          atividades,
          activeIndex,
          overIndex
        )

        updateIndex(overAtivides);  //FIXME testar a necessidade disso

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
      checked: false,
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

    updateIndexAtividade(novosIndices); //FIXME testar a necessidade disso
  }

  function removerAtividade(id: string) {
    alert(id)
    setAtividades(atividade => {
      const newAtividades = atividades.filter(atividade => atividade.id !== id);
      return { ...atividade, atividades: newAtividades };
    })
    console.log(atividades)

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
            atividades={atividades}
            remover={removerAtividade}
          />
          <Button className='w-fit' onClick={adicionarAtividade}>Adicionar um item</Button>
          <DragOverlay dropAnimation={dropAnimation}>
            {atividade ? <AtividadeItem atividadeIni={atividade} remover={removerAtividade} /> : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
};
