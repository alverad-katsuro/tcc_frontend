import { Dropdown, Avatar } from "@/components/flowbite-components"
import { useAuthContext } from "@/context/AuthenticateContext";
import { KEYCLOAK_AUTH_URL } from "@/service/oauth";
import Link from "next/link"

export default function HeaderAvatar() {

    const { isLogado, userDetails, deslogar } = useAuthContext();

    return (
        isLogado ?
            < Dropdown
                arrowIcon={false}
                inline={true}
                label={< Avatar alt="User settings" img={userDetails?.imagemUrl ?? ""
                } rounded={true} />}
            >
                <Dropdown.Header>
                    <span className="block text-sm">
                        {userDetails?.nome}
                    </span>
                    <span className="block truncate text-sm font-medium">
                        {userDetails?.email}
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
                <Dropdown.Item onClick={deslogar}>
                    Sign out
                </Dropdown.Item>
            </Dropdown >
            : <Link href={KEYCLOAK_AUTH_URL}>
                <Avatar alt="User settings" rounded={true} />
            </Link>
    )
}