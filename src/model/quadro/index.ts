export enum ColunaKanban {
  TODO = 'TODO',
  IN_PROGRESS = 'In Progress',
  DONE = 'DONE',
};

export type TarefaDocument = {

  id?: string;

  titulo: string;

  descricao: string;

  colunaKanban: ColunaKanban;

  inicio?: Date;

  fim?: Date;

  quadroId?: number;

  posicaoKanban?: number;

  pai?: TarefaDocument;

  objetivoId?: number;

  concluida?: boolean;

  cargaHoraria?: number;

  etiquetas?: string[];

  responsavel?: number;

  resultadosObtidos?: number[];

  atividades?: AtividadeDocument[];

  impedimentos?: ImpedimentoDocument[];
};

interface AtividadeDocument {
  atividade: string;
  concluida: boolean;
}

interface ImpedimentoDocument {
  impedimento: string;
  dataOcorrido: Date;
}

export type BoardSections = {
  [name: string]: TarefaDocument[];
};
