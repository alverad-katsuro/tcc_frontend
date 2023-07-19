import { ColunaKanban, TarefaDocument } from ".";

export const getTasksByStatus = (tasks: TarefaDocument[], status: ColunaKanban) => {
  return tasks.filter((task) => task.status === status);
};

export const getTaskById = (tasks: TarefaDocument[], id: string) => {
  return tasks.find((task) => task.id === id);
};
