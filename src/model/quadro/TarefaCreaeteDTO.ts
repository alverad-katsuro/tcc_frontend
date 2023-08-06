import { ColunaKanban } from ".";

export interface TarefaCreateDTO {
    titulo: string;
    descricao: string;
    colunaKanban: ColunaKanban;
    quadroId: number;
};