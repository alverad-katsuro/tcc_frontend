import { ColunaKanban, TarefaDocument } from ".";

export const getTasksByStatus = (tasks: TarefaDocument[], status: ColunaKanban) => {

  return tasks.filter((task) => {
    return task.colunaKanban === status
  });
};

export const getTaskById = (tasks: TarefaDocument[], id: string) => {
  return tasks.find((task) => task.id === id);
};
