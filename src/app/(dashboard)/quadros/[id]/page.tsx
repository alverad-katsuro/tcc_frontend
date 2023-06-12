"use client";
import BoardSectionList from "@/components/quadro/BoardSectionList";


export default function Quadro({ params }: { params: { id: number } }) {

    return (
        <main className="justify-between overflow-hidden h-modal mx-6 mt-4 xl:mx-16">

            <BoardSectionList />;

        </main>

    )

}