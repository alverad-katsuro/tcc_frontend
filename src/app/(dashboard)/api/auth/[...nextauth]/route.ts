import { decodeJWT } from "@/utils/DecodeJwt";
import { type TokenSet } from "@auth/core/types";
import { type NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: NextAuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: `${process.env.KEYCLOAK_ID}`,
            clientSecret: `${process.env.KEYCLOAK_SECRET}`,
            issuer: `${process.env.KEYCLOAK_ISSUER}`,
        })],
    callbacks: {
        async session({ session, token }) {
            session.user = {...token, role: decodeJWT(token.accessToken).realm_access.roles};
            return session;
        },
        async jwt({ token, user, account, profile }) {
            if (account) {
                token.accessToken = account.access_token ?? "";
                token.refreshToken = account.refresh_token ?? "";
                token.expiresIn = Number(account.expires_in) * 1000;
                token.refreshExpiresIn = Number(account.refresh_expires_in)
                token.sub = account.providerAccountId
                token.error = null
                return { ...token, ...user, ...profile }
            }
            else if (Date.now() < token.expiresIn * 1000) {
                return { ...token, ...user, ...profile };
            }
            else {
                try {

                    const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: new URLSearchParams({
                            client_id: process.env.KEYCLOAK_ID ?? "no_client",
                            client_secret: process.env.KEYCLOAK_SECRET ?? "no_secret",
                            grant_type: "refresh_token",
                            refresh_token: token.refreshToken,
                        }),
                        method: "POST",
                    })

                    const tokens: TokenSet = await response.json();

                    if (!response.ok) {
                        throw tokens;
                    }

                    token.accessToken = tokens.access_token ?? "";
                    token.expiresIn = Math.floor(Date.now() / 1000 + Number(tokens.expires_in));
                    token.refreshToken = tokens.refresh_token ?? token.refreshToken;
                    token.error = null;
                    return { ...token, ...user, ...profile };
                }
                catch (error) {
                    return { ...token, error: "RefreshAccessTokenError" as const }
                }
            }
        }
    },
    pages: {
        signIn: '/auth/signin',
    },
    events: {
        async signOut({ token }) {
            await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    client_id: process.env.KEYCLOAK_ID ?? "no_client",
                    client_secret: process.env.KEYCLOAK_SECRET ?? "no_secret",
                    refresh_token: token.refreshToken,
                }),
                method: "POST",
            })
        }
    },
    secret: process.env.JWT_SECRET,
}


declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        expiresIn: number;
        refreshToken: string;
        error: "RefreshAccessTokenError" | null;
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
