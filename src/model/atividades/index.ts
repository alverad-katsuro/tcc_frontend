export type StatusAtividade = 'ATIVIDADES';

export type AtividadeModel = {
  id: string;
  titulo?: string;
  checked: boolean;
};

export type BoardSections = {
  [name: string]: AtividadeModel[];
};
