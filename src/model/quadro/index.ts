import { AtividadeModel } from "../atividades";
import { UsuarioDTO } from "./UsuarioDTO";

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

  inicio?: string;

  fim?: string;

  quadroId: number;

  posicaoKanban: number;

  pai?: TarefaDTO;

  objetivoId?: number;

  concluida: boolean;

  cargaHoraria?: number;

  etiquetas?: string[];

  responsavel?: UsuarioDTO;

  resultadosObtidos?: number[];

  atividades: AtividadeModel[];

  impedimentos: ImpedimentoDocument[];
};

export type TarefaBasicDTO = {

  id: string;

  titulo: string;

  descricao: string;

  colunaKanban: ColunaKanban;

  inicio?: string;

  fim?: string;

  quadroId?: number;

  posicaoKanban?: number;

  etiquetas?: string[];

  responsavel?: UsuarioDTO;

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

export interface ImpedimentoDocument {
  impedimento: string;
  dataOcorrido?: string;
}

export type BoardSections = {
  [name: string]: TarefaBasicDTO[];
};
