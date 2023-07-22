'use client';

import { Button } from "@/components/flowbite-components";
import { useAuthContext } from "@/context/AuthenticateContext";
import { useSidebarContext } from "@/context/SidebarContext";
import { AiFillPlusCircle, AiFillMinusCircle, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineSearch } from "react-icons/ai";
import { BiBuoy } from "react-icons/bi";
import {
  HiChartPie,
  HiViewBoards
} from "react-icons/hi";
import { MdOutlineWork } from "react-icons/md";
import Sidebar from "./sidebar";
export default function SidebarStyled(): JSX.Element {

  const { isCollapsed, setCollapsed } = useSidebarContext();

  const { userDetails } = useAuthContext();

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
            {userDetails?.scope.includes("ROLE_ADMIN") ?
              <Sidebar.Collapse icon={MdOutlineWork} label="Planos de Trabalho">
                <Sidebar.Item href="/planosDeTrabalho/novo" icon={AiFillPlusCircle} >
                  Novo
                </Sidebar.Item>
                <Sidebar.Item href="/planosDeTrabalho" icon={AiOutlineSearch}>
                  Visualizar
                </Sidebar.Item>
                {/* <Sidebar.Item href="/planosDeTrabalho/remover" icon={AiFillMinusCircle} >
                  Remover
                </Sidebar.Item> */}
              </Sidebar.Collapse> :
              <Sidebar.Item href="/planosDeTrabalho" icon={MdOutlineWork}>
                Planos de Trabalho
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
