'use client';

import { useSidebarContext } from "@/context/SidebarContext";
import { Button } from "flowbite-react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import Sidebar from "./sidebar";
export default function SidebarStyled(): JSX.Element {

  const { isCollapsed, setCollapsed } = useSidebarContext();

  function toggle() {
    setCollapsed(!isCollapsed);
  }
  return (
    <>
      <Sidebar collapsed={isCollapsed} draggable className="ease-in-out min-h-screen duration-300 sticky z-10" >
        <Sidebar.Items >
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiViewBoards}>
              Kanban
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiInbox}>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="/paciente/cadastrar" icon={HiUser}>
              Cadastrar Paciente
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiTable}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Upgrade to Pro
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiViewBoards}>
              Documentation
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={BiBuoy}>
              Help
            </Sidebar.Item>
            <Button onClick={toggle} className="mx-auto my-5 w-full">
              {isCollapsed ? <AiOutlineArrowRight className="text-xl" /> : <AiOutlineArrowLeft className="text-xl" />}
            </Button>

          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}
