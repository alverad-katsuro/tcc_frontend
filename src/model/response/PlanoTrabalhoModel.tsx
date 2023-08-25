import { UsuarioNovoPlanoProjection } from "../planoDeTrabalho/UsuarioPlanoProjection";
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

    pesquisadores?: UsuarioNovoPlanoProjection[];

}