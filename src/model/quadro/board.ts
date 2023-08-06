import { BoardSections, ColunaKanban, TarefaDTO } from ".";
import { getTasksByStatus } from "./tasks";

export const initializeBoard = (tasks: TarefaDTO[]) => {
  const boardSections: BoardSections = {};

  Object.keys(ColunaKanban).forEach((boardSectionKey) => {
    boardSections[boardSectionKey] = getTasksByStatus(
      tasks,
      boardSectionKey as ColunaKanban
    ).sort((taskA, taskB) => {
      // Compara as posições kanban das tarefas.
      // Verifica se os atributos posicaoKanban existem para evitar erros.
      const posicaoA = taskA.posicaoKanban || 0;
      const posicaoB = taskB.posicaoKanban || 0;

      return posicaoA - posicaoB;
    });
  });

  return boardSections;
};

export const findBoardSectionContainer = (
  boardSections: BoardSections,
  id: string
) => {
  if (id in boardSections) {
    return id;
  }

  const container = Object.keys(boardSections).find((key) =>
    boardSections[key].find((item) => item.id === id)
  );
  return container;
};
