import { RecursoMaterialModel } from "./RecursoMaterialModel";

export interface PlanoTrabalhoModel {
    id?: number;
    titulo: string;
    areaTrabalho: string;
    descricao: string;
    recursoMateriais: RecursoMaterialModel[];
}