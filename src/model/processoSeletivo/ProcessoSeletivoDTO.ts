import { UsuarioProcessoSeletivoDTO } from "./UsuarioProcessoSeletivoDTO";

export interface ProcessoSeletivoDTO {
    id?: number;
    fim: string;
    inicio: string;
    requisitos: string;
    areaInteresse: string;
    inscrito?: boolean;
    planoTrabalho: ProcessoSeletivoPlanoTrabalhoDTO;
    candidatos: UsuarioProcessoSeletivoDTO[];
}

export interface ProcessoSeletivoPlanoTrabalhoDTO {
    id?: number;
    titulo: string;
}
