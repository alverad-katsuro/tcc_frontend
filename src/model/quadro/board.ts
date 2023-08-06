import { BoardSections, ColunaKanban, TarefaDTO } from ".";
import { BOARD_SECTIONS } from "./BoardSections";
import { getTasksByStatus } from "./tasks";

export const initializeBoard = (tasks: TarefaDTO[]) => {
  const boardSections: BoardSections = {};

  Object.keys(ColunaKanban).forEach((boardSectionKey) => {
    boardSections[boardSectionKey] = getTasksByStatus(
      tasks,
      boardSectionKey as ColunaKanban
    );
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
