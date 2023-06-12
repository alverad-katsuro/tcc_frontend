"use client";

import { UserDetails } from "@/model/UserDetails";
import { decodeJWT } from "@/utils/DecodeJwt";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextProps {
	isLogado: boolean;
	userDetails: UserDetails;
	setUserDetails: (user: UserDetails) => void;
	deslogar: () => void;
}

const AuthContext = createContext<AuthContextProps>(undefined!);

export function AuthProvider({
	children,
}: PropsWithChildren<Record<string, unknown>>) {
	const [userDetails, setUserDetails] = useState<UserDetails>({});

	const router = useRouter();

	const [isLogado, setIsLogado] = useState<boolean>(false);

	function deslogar() {
		deleteCookie("Token");
		if (!hasCookie("Token")) {
			setIsLogado(false);
			router.push("/");
			router.refresh();
		}
	}

	useEffect(() => {
		let cookie = getCookie("Token")?.toString();
		if (cookie != undefined) {
			setUserDetails(decodeJWT(cookie));
		}
		setIsLogado(cookie != undefined ? true : false);
	}, [setIsLogado, setUserDetails, decodeJWT, getCookie])

	return (
		<AuthContext.Provider
			value={useMemo(() => ({
				isLogado: isLogado,
				setUserDetails: setUserDetails,
				userDetails: userDetails,
				deslogar: deslogar,
			}), [setUserDetails, deslogar])}
		>
			{children}
		</AuthContext.Provider>
	);
}


export function useAuthContext(): AuthContextProps {
	const context = useContext(AuthContext) as AuthContextProps | undefined;

	if (!context) {
		throw new Error(
			"useAuthContext should be used within the AuthContext provider!"
		);
	}

	return context;
}