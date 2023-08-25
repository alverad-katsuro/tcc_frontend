import { UsuarioDTO } from "../quadro/UsuarioDTO";

export interface UsuarioPlanoProjection {
    cargaHoraria: number,
    usuario: UsuarioDTO
}