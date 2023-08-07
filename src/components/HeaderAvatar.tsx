"use client";
import { Avatar, Dropdown } from "@/components/flowbite-components";
import { signIn, signOut, useSession } from "next-auth/react";

export default function HeaderAvatar() {

    const { data, status } = useSession();

    return (
        status === 'authenticated' ?
            < Dropdown
                arrowIcon={false}
                inline={true}
                label={< Avatar alt="User settings" img={data?.user?.image ?? ""
                } rounded={true} />}
            >
                <Dropdown.Header>
                    <span className="block text-sm">
                        {data?.user?.name}
                    </span>
                    <span className="block truncate text-sm font-medium">
                        {data?.user?.email}
                    </span>
                </Dropdown.Header>
                <Dropdown.Item>
                    Dashboard
                </Dropdown.Item>
                <Dropdown.Item>
                    Settings
                </Dropdown.Item>
                <Dropdown.Item>
                    Earnings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={signOut}>
                    Sign out
                </Dropdown.Item>
            </Dropdown >
            : <button onClick={() => signIn("keycloak")}>
                <Avatar alt="User settings" rounded={true} />
            </button>

    )
}