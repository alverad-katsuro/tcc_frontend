"use client";
import { Avatar, Dropdown } from "@/components/flowbite-components";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function HeaderAvatar() {

    const { data, status } = useSession();

    return (
        status === 'authenticated' ?
            < Dropdown
                arrowIcon={false}
                inline={true}

                style={{ zIndex: "10" }}
                label={< Avatar alt="User settings" img={data?.user?.picture ?? ""
                } rounded={true}
                />}
            >
                <Dropdown.Header>
                    <span className="block text-sm">
                        {data?.user?.name}
                    </span>
                    <span className="block truncate text-sm font-medium">
                        {data?.user?.email}
                    </span>
                </Dropdown.Header>
                <Dropdown.Item as={Link} href="/perfil">
                    Perfil
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={signOut}>
                    Sair
                </Dropdown.Item>
            </Dropdown >
            : <button onClick={() => signIn("keycloak")}>
                <Avatar alt="User settings" rounded={true} />
            </button>

    )
}