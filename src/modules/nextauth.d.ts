// next-auth/core/types.ts

// Importe a interface DefaultSession original
import { DefaultSession } from "next-auth/core/types";

// Sobrescreva a interface DefaultSession adicionando/modificando as propriedades conforme necessário
declare module "next-auth" {
    interface Session extends DefaultSession {
        user?: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            // Adicione novas propriedades personalizadas, se necessário
            role?: string[] | null;
            accessToken?: string;
            sub?: string;
            // Adicione a propriedade refreshToken
            refreshToken?: string | null;
            // Adicione as propriedades given_name e family_name
            given_name?: string | null;
            family_name?: string | null;
            picture?: string | null;
            lattes?: string | null;
        };
        expires: string;
        // Adicione novas propriedades personalizadas, se necessário
        customProperty?: string;
    }

}
