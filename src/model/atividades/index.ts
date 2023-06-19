export type StatusAtividade = 'ATIVIDADES';

export type AtividadeModel = {
  id: string;
  title: string;
  checked: boolean;
};

export type BoardSections = {
  [name: string]: AtividadeModel[];
};
