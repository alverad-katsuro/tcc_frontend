"use client";
import { criarTarefa, updateIndexTarefa } from '@/api/api';
import DescricaoModal from '@/app/(dashboard)/quadros/[id]/DescricaoModal';
import { TarefaCreateDTO } from '@/model/quadro/TarefaCreaeteDTO';
import { UpdateIndex } from '@/model/quadro/UpdateIndex';
import { findBoardSectionContainer, initializeBoard } from '@/model/quadro/board';
import { BoardSections, ColunaKanban, TarefaDTO } from "@/model/quadro/index";
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

export interface Props {
  tarefasIniciais: TarefaDTO[];
  quadroId: number;
}
function BoardSectionList({ tarefasIniciais, quadroId }: Props) {
  const [boardSections, setBoardSections] =
    useState<BoardSections>(initializeBoard(tarefasIniciais));

  const [open, setOpen] = useState<boolean>(false);

  const [taskModal, setTaskModal] = useState<TarefaDTO | undefined>();

  function openModal(task: TarefaDTO) {
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
      boardSection[activeContainer][activeIndex].colunaKanban = overContainer as ColunaKanban;
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);


      const activeTask = [
        ...boardSection[activeContainer].filter(
          (item) => item.id !== active.id
        ),
      ];

      const overTask = [
        ...boardSection[overContainer].slice(0, overIndex),
        boardSections[activeContainer][activeIndex],
        ...boardSection[overContainer].slice(
          overIndex,
          boardSection[overContainer].length
        ),
      ]

      updateIndex([...activeTask, ...overTask]);

      return {
        ...boardSection,
        [activeContainer]: activeTask,
        [overContainer]: overTask,
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
      setBoardSections((boardSection) => {

        const overBoard = arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex
        )

        updateIndex(overBoard);
        
        return ({
          ...boardSection,
          [overContainer]: overBoard,
        })
      });
    }

    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(boardSections, activeTaskId) : null;

  async function addTask() {
    const tarefaCreate: TarefaCreateDTO = {
      titulo: "Sem Titulo",
      descricao: "",
      colunaKanban: ColunaKanban.TODO,
      quadroId: quadroId,
      posicaoKanban: 0,
    };
    const id = await criarTarefa(tarefaCreate);
    const tarefa: TarefaDTO = {
      ...tarefaCreate,
      id: id,
    }
    setBoardSections((boardSection) => {
      const newTodoTasks = [
        tarefa,
        ...boardSection[ColunaKanban.TODO] // Copiar as tarefas existentes da coluna "TODO"
      ];

      updateIndex(newTodoTasks);

      return {
        ...boardSection,
        [ColunaKanban.TODO]: newTodoTasks
      };
    });
  }

  function updateIndex(tarefas: TarefaDTO[]) {
    const novosIndices: UpdateIndex[] = tarefas.map(({ id, colunaKanban }, i) => {
      const updateIndex: UpdateIndex = {
        id, posicaoKanban: i, colunaKanban
      }
      return updateIndex;
    })
    console.log(novosIndices)
    updateIndexTarefa(novosIndices);
  }

  return (
    <div className='block h-full'>
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
