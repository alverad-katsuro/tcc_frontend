export type Status = 'TODO' | 'In Progress' | 'DONE';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
  progress: number;
};

export type BoardSections = {
  [name: string]: Task[];
};
