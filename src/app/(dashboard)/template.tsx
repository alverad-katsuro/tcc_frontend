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
                <div className="flex h-full overflow-hidden bg-white dark:bg-gray-900">
                    <div className="order-1 flex">
                        <SidebarStyled />
                    </div>
                    <div className="order-2 w-full flex-1 overflow-auto p-4">
                        <Suspense fallback={<Loading />}>
                            {children}
                        </Suspense>
                    </div>
                </div>
            </SidebarProvider>
        </>
    )
}