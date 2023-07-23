import { UsuarioNovoPlanoProjection } from "../planoDeTrabalho/UsuarioNovoPlanoProjection";
import { ObjetivoModel } from "./ObjetivoModel";
import { RecursoMaterialModel } from "./RecursoMaterialModel";

export interface PlanoTrabalhoModel {
    id?: number;
    titulo: string;
    areaTrabalho: string;
    descricao: string;
    recursoMateriais: RecursoMaterialModel[];
    objetivos: ObjetivoModel[];

    pesquisadores?: UsuarioNovoPlanoProjection[];

}