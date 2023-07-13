import { AtividadeModel } from ".";

export const getTaskById = (tasks: AtividadeModel[], id: string) => {
  return tasks.find((task) => task.id === id);
};
