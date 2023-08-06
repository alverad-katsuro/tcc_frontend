import { ColunaKanban, TarefaDTO } from ".";

export const getTasksByStatus = (tasks: TarefaDTO[], status: ColunaKanban) => {

  return tasks.filter((task) => {
    return task.colunaKanban === status
  });
};

export const getTaskById = (tasks: TarefaDTO[], id: string) => {
  return tasks.find((task) => task.id === id);
};
