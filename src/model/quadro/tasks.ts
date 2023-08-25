import { BoardSections, ColunaKanban, TarefaBasicDTO } from ".";

export const getTasksByStatus = (tasks: TarefaBasicDTO[], status: ColunaKanban) => {

  return tasks.filter((task) => {
    return task.colunaKanban === status
  });
};

// export const getTaskById = (tasks: TarefaDTO[], id: string) => {
//   return tasks.find((task) => task.id === id);
// };

export const getTaskById = (board: BoardSections, id: string) => {
  for (let b in board) {
    const task = board[b].find((task) => task.id === id);
    if (task !== undefined) {
      return task;
    }
  }
  return undefined;
  //return tasks.find((task) => task.id === id);
};
