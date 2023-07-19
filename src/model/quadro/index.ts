export enum ColunaKanban {
  TODO = 'TODO',
  IN_PROGRESS = 'In Progress',
  DONE = 'DONE',
};

export type TarefaDocument = {
  id: string;
  titulo: string;
  descricao: string;
  status: ColunaKanban;

  inicio?: Date;

  fim?: Date;

  planoTrabalho?: number;

  posicaoKanban?: number;

  concluida?: boolean;

  cargaHoraria?: number;

  etiquetas?: string[];

  responsavel?: number;

  //List<Integer> resultadosObtidos;

  atividades?: AtividadeDocument[];

  impedimentos?: ImpedimentoDocument[];
};

interface AtividadeDocument {
  atividade: string;
  concluida: boolean;
}

interface ImpedimentoDocument {
  impedimento: string;
  concluida: boolean;
}

export type BoardSections = {
  [name: string]: TarefaDocument[];
};
