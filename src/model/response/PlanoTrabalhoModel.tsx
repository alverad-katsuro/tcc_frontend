import { UsuarioNovoPlanoProjection } from "../planoDeTrabalho/UsuarioNovoPlanoProjection";
import { ObjetivoModel } from "./ObjetivoModel";
import { RecursoMaterialModel } from "./RecursoMaterialModel";

export interface PlanoTrabalhoModel {
    id?: number;
    arquivo?: File;
    capaResourceId?: string;
    capaUrl?: string;
    titulo: string;
    areaTrabalho: string;
    descricao: string;
    recursoMateriais: RecursoMaterialModel[];
    objetivos: ObjetivoModel[];
    finalizado?: boolean;
    relatorioUrl?: string;
    relatorioResourceId?: string;
    pesquisadores?: UsuarioNovoPlanoProjection[];

}