import Header from "@/components/Header";
import SidebarStyled from "@/components/SidebarStyled";
import { SidebarProvider } from "@/context/SidebarContext";
import '@/style/globals.css'
import { Suspense } from "react";
import Loading from "./loading";

export default function Template({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <SidebarProvider>
                <Header />
                <div className="flex dark:bg-gray-900">
                    <SidebarStyled />
                    <div className="order-1 h-screen">
                    </div>
                    <div className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
                        <Suspense fallback={<Loading />}>
                            {children}
                        </Suspense>
                    </div>
                </div>
            </SidebarProvider>
        </>
    )
}