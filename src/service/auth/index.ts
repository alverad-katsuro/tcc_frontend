import { authOptions } from "@/app/(dashboard)/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function recuperarToken() {
    const session = await getServerSession(authOptions);

    if (session == null || session.user == null || session.user.accessToken == null) {
        return Promise.reject();
    }

    return `Bearer ${session.user.accessToken}`;
}
