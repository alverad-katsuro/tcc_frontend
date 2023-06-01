'use client';

import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "@/components/flowbite-components";
import { useRouter } from "next/navigation";
import { FC } from "react";
import HeaderSidebar from "./HeaderSidebar";

const Header: FC<Record<string, never>> = function () {


    const router = useRouter();

    return (
        <header className="sticky top-0 z-20">
            <Navbar
                fluid
            >
                <HeaderSidebar />
                <Navbar.Brand href="/">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Meu Bolsista
                    </span>
                </Navbar.Brand>

                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />}
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">
                                Bonnie Green
                            </span>
                            <span className="block truncate text-sm font-medium">
                                name@flowbite.com
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
                        <Dropdown.Item>
                            Sign out
                        </Dropdown.Item>
                    </Dropdown>
                    <DarkThemeToggle className="mx-2 lg:ml-6" />
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link
                        href="/"
                        active={window.location.pathname === "/"}
                    >
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="/planosDeTrabalho"
                        active={window.location.pathname === "/planosDeTrabalho"}
                    >
                        Planos de Trabalho
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header;
