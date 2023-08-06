export enum ColunaKanban {
  TODO = 'TODO',
  IN_PROGRESS = 'In Progress',
  DONE = 'DONE',
};

export type TarefaDTO = {

  id: string;

  titulo: string;

  descricao: string;

  colunaKanban: ColunaKanban;

  inicio?: Date;

  fim?: Date;

  quadroId?: number;

  posicaoKanban: number;

  pai?: TarefaDTO;

  objetivoId?: number;

  concluida?: boolean;

  cargaHoraria?: number;

  etiquetas?: string[];

  responsavel?: number;

  resultadosObtidos?: number[];

  atividades?: AtividadeDocument[];

  impedimentos?: ImpedimentoDocument[];
};

export type TarefaBasicDTO = {

  id: string;

  titulo: string;

  descricao: string;

  colunaKanban: ColunaKanban;

  inicio?: Date;

  fim?: Date;

  quadroId?: number;

  posicaoKanban?: number;

  etiquetas?: string[];

  responsavel?: number;

};

export type TarefaIndexDTO = {

  id: string;

  colunaKanban: ColunaKanban;

  posicaoKanban?: number;

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
  [name: string]: TarefaDTO[];
};
