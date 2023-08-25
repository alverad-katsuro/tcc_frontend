export type StatusAtividade = 'ATIVIDADES';

export type AtividadeModel = {
  id: string;
  titulo?: string;
  concluida: boolean;
  index?: number;
};

export type AtividadeCreateDTO = {
  titulo?: string;
  concluida: boolean;
  index?: number;
};

export type AtividadeIndexDTO = {
  id: string;
  index: number;
};


export type BoardSections = {
  [name: string]: AtividadeModel[];
};
