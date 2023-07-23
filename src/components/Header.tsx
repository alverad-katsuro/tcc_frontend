'use client';
import { Navbar } from "@/components/flowbite-components";
import { usePathname } from 'next/navigation';
import { FC } from "react";
import HeaderAvatar from "./HeaderAvatar";
import HeaderSidebar from "./HeaderSidebar";

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
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link
                        href="/"
                        active={path === "/"}
                    >
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="/planoDeTrabalho"
                        active={path === "/planoDeTrabalho"}
                    >
                        Planos de Trabalho
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header;
