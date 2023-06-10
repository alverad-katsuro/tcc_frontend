import { Dropdown, Avatar } from "@/components/flowbite-components"
import { useAuthContext } from "@/context/AuthenticateContext";
import Link from "next/link"

export default function HeaderAvatar() {

    const { isAuthenticate, userDetails, deslogar } = useAuthContext();

    return (
        isAuthenticate() ?
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
            : <Link href="/login">
                <Avatar alt="User settings" rounded={true} />
            </Link>
    )
}