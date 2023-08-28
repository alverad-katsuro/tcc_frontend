export interface UsuarioProcessoSeletivoDTO {
    id: {
        usuarioId: number;
        processoSeletivoId: number;
    };
    aprovado: boolean;
    inscricao: string;
    curriculo: string;
    usuario: {
        id: string;
        nome: string;
        email: string;
    }
}