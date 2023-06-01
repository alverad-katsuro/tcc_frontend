import { Sidebar as FlowbiteSidebar } from "@/components/flowbite-components";
import classNames from "classnames";
import type { FC, PropsWithChildren } from "react";
import { useSidebarContext } from "../context/SidebarContext";

const Sidebar: FC<PropsWithChildren<Record<string, unknown>>> = function ({
  children,
}) {
  const { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens, isCollapsed } =
    useSidebarContext();

  return (
    <div
      className={classNames(
        "fixed top-10 h-screen z-10 lg:sticky lg:!block",
        {
          hidden: !isSidebarOpenOnSmallScreens,
        }
      )}
    >
      <FlowbiteSidebar collapsed={isCollapsed} className="lg:ease-in-out lg:duration-300">{children}</FlowbiteSidebar>
    </div>
  );
};

export default Object.assign(Sidebar, { ...FlowbiteSidebar });
