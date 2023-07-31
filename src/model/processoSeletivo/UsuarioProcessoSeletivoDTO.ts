export interface UsuarioProcessoSeletivoDTO {
    id: {
        usuarioId: number;
        processoSeletivoId: number;
    };
    aprovado: boolean;
    inscricao: string;
    curriculo: string;
    usuario: {
        id: number;
        nome: string;
        email: string;
    }
}