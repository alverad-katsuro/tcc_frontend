"use client";
import DescricaoModal from '@/app/(dashboard)/quadros/[id]/DescricaoModal';
import { findBoardSectionContainer, initializeBoard } from '@/model/quadro/board';
import { BoardSections, ColunaKanban, TarefaDocument } from "@/model/quadro/index";
import { getTaskById } from '@/model/quadro/tasks';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  defaultDropAnimation,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import BoardSection from './BoardSection';
import TaskItem from './TaskItem';
import { Button } from 'flowbite-react';
import { criarTarefa } from '@/api/api';

export interface Props {
  tarefasIniciais: TarefaDocument[];
  quadroId: number;
}
function BoardSectionList({ tarefasIniciais, quadroId }: Props) {
  const [tarefas, setTarefas] = useState<TarefaDocument[]>(tarefasIniciais);
  const initialBoardSections = initializeBoard(tarefas);
  const [boardSections, setBoardSections] =
    useState<BoardSections>(initialBoardSections);

  const [open, setOpen] = useState<boolean>(false);

  const [taskModal, setTaskModal] = useState<TarefaDocument | undefined>();

  function openModal(task: TarefaDocument) {
    setOpen(!open);
    setTaskModal(task);
  }

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

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(tarefas, activeTaskId) : null;

  async function addTask() {
    const tarefa: TarefaDocument = {
      titulo: "Sem Titulo",
      descricao: "",
      colunaKanban: ColunaKanban.TODO,
      quadroId: quadroId
    };
    tarefa.id = await criarTarefa(tarefa);
    setTarefas((tarefas) => {
      tarefas.unshift(tarefa)
      for (let index = 0; index < tarefas.length; index++) {
        tarefas[index].posicaoKanban = index;
      }
      return (tarefas)
    });
    setBoardSections((boardSection) => {
      const newTodoTasks = [
        tarefas[0],
        ...boardSection[ColunaKanban.TODO] // Copiar as tarefas existentes da coluna "TODO"
      ];

      return {
        ...boardSection,
        [ColunaKanban.TODO]: newTodoTasks
      };
    });
  }

  return (
    <div className='block h-full'>
      <Button onClick={() => console.log(boardSections)}>asdasd</Button>
      <DescricaoModal open={open} setOpen={setOpen} task={taskModal} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className='flex flex-row gap-4 h-full' >
          {Object.keys(boardSections).map((boardSectionKey) => (
            <div className='bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full sm:w-full max-w-xs mx-auto'
              key={boardSectionKey}
            >
              <BoardSection
                id={boardSectionKey}
                title={boardSectionKey as ColunaKanban}
                tasks={boardSections[boardSectionKey]}
                onClick={openModal}
                addTask={addTask}
              />
            </div>
          ))}
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <TaskItem task={task} onClick={openModal} /> : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
};

export default BoardSectionList;
