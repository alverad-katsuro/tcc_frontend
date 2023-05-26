"use client";
import { Card } from "flowbite-react";

export default function PlanosDeTrabalho() {

    return (

        <main className="flex flex-col items-center justify-between p-16 overflow-auto">

            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Planos de Trabalho</h1>

            <Card imgSrc="#">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>
                        Noteworthy technology acquisitions 2021
                    </p>
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    <p>
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    </p>
                </p>
            </Card>

        </main>


    )
}