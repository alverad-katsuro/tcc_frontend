'use client';

import { Button } from "@/components/flowbite-components";
import { useSidebarContext } from "@/context/SidebarContext";
import { useSession } from "next-auth/react";
import { AiFillPlusCircle, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineSearch } from "react-icons/ai";
import { BiBuoy } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import {
  HiChartPie,
  HiViewBoards
} from "react-icons/hi";
import { MdOutlineWork } from "react-icons/md";
import Sidebar from "./sidebar";
export default function SidebarStyled(): JSX.Element {

  const { isCollapsed, setCollapsed } = useSidebarContext();

  const { data } = useSession();

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
            <Sidebar.Item href="/quadros" icon={HiViewBoards}>
              Quadros Kanban
            </Sidebar.Item>
            {data?.user?.role?.includes("ROLE_ADMIN") ?
              <Sidebar.Collapse icon={MdOutlineWork} label="Planos de Trabalho">
                <Sidebar.Item href="/planoDeTrabalho/novo" icon={AiFillPlusCircle} >
                  Novo
                </Sidebar.Item>
                <Sidebar.Item href="/planoDeTrabalho" icon={AiOutlineSearch}>
                  Visualizar
                </Sidebar.Item>
              </Sidebar.Collapse> :
              <Sidebar.Item href="/planoDeTrabalho" icon={MdOutlineWork}>
                Planos de Trabalho
              </Sidebar.Item>
            }
            {data?.user?.role?.includes("ROLE_ADMIN") ?
              <Sidebar.Collapse icon={BsFillPeopleFill} label="Processo Seletivo">
                <Sidebar.Item href="/processoSeletivo/novo" icon={AiFillPlusCircle} >
                  Novo
                </Sidebar.Item>
                <Sidebar.Item href="/processoSeletivo" icon={AiOutlineSearch}>
                  Visualizar
                </Sidebar.Item>
              </Sidebar.Collapse> :
              <Sidebar.Item href="/processoSeletivo" icon={BsFillPeopleFill}>
                Processo Seletivo
              </Sidebar.Item>
            }
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
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
