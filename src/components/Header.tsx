'use client';
import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "@/components/flowbite-components";
import { useAuthContext } from "@/context/AuthenticateContext";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { FC } from "react";
import HeaderSidebar from "./HeaderSidebar";
import HeaderAvatar from "./HeaderAvatar";

const Header: FC<Record<string, never>> = function () {

    const path = usePathname();

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
                    <HeaderAvatar />
                    <DarkThemeToggle className="mx-2 lg:ml-6" />
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link
                        href="/"
                        active={path === "/"}
                    >
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="/planosDeTrabalho"
                        active={path === "/planosDeTrabalho"}
                    >
                        Planos de Trabalho
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header;
