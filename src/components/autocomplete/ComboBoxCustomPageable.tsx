"use client";
import { PageInterface } from '@/interface/PageInterface';
import { Combobox } from '@headlessui/react';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { HiOutlineChevronUpDown } from 'react-icons/hi2';

export interface ComboBoxCustomPageableProps<T> {
    elementosState: [PageInterface<T> | undefined, Dispatch<SetStateAction<PageInterface<T> | undefined>>];
    elementoId: keyof T;
    elementoField: keyof T;
    callbackSelect?: (elemento: T) => void;
    callbackSearch: (busca: {
        elementField?: any;
        page?: number;
    }) => Promise<PageInterface<T>>;
    defaultValue?: T;
    id: string;
    label: React.ReactNode;
}

export default function ComboBoxCustomPageable<T>({
    elementosState,
    label,
    elementoId,
    elementoField,
    callbackSelect = () => { return },
    callbackSearch,

    defaultValue,
    id
}: ComboBoxCustomPageableProps<T>) {

    const [page, setPage] = useState<number>(0);
    const [selected, setSelected] = useState<T | undefined>(defaultValue)
    const [elementos, setElementos] = elementosState;

    const optionsRef = useRef<HTMLDivElement>(null);

    async function buscaNovosElement(elementField: any) {
        if (elementField.length > 3) {
            callbackSearch({ elementField, page }).then((r) => setElementos(r))
        }
    }

    const handleScroll = () => {
        const optionsDiv = optionsRef.current;
        if (!optionsDiv) return;

        // Verifica se chegou ao fim da lista (margem de 20 pixels)
        const scrollPos = optionsDiv.scrollTop;
        const scrollHeight = optionsDiv.scrollHeight;
        const clientHeight = optionsDiv.clientHeight;

        if (scrollHeight - scrollPos - clientHeight <= 20) {
            // Aqui você pode realiTar a ação de carregar mais elementos
            callbackSearch({ page: page + 1 }).then((r) => setElementos(e => {
                setPage(currentPage => currentPage + 1);
                r.content = { ...e?.content, ...r.content }
                return r;
            }
            )).catch((e) => console.log(e));
        }
    };

    useEffect(() => {
        const optionsDiv = optionsRef.current;
        if (!optionsDiv) return;

        optionsDiv.addEventListener('scroll', handleScroll);
        return () => {
            optionsDiv.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <Combobox value={selected} onChange={(e) => { setSelected(e); callbackSelect(e) }} ref={optionsRef}>
            <div className="relative mt-1">
                <div className="mb-2 block">
                    {label}
                </div>
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white dark:bg-gray-700 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                        className="block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
                        displayValue={(object: T) => object[elementoField] as string}
                        onChange={(event) => buscaNovosElement(event.target.value)}
                        id={id}

                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <HiOutlineChevronUpDown
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-700">
                    {elementos?.content.length === 0 ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-white">
                            Nada encontrado.
                        </div>
                    ) : (
                        elementos?.content?.map((object) => (
                            <Combobox.Option
                                key={object[elementoId] as number}
                                className={({ active }) =>
                                    `relative cursor-default z-20 select-none T-10 py-2 pl-10 pr-4 ${active ? 'bg-slate-300 dark:text-black dark:bg-white' : 'dark:bg-gray-700 dark:text-white'
                                    }`
                                }
                                value={object}
                            >
                                {({ selected, active }: { selected: any, active: any }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                }`}
                                        >
                                            {object[elementoField] as string}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-black' : 'text-teal-600'}`}
                                            >
                                                <AiFillCheckCircle className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Combobox.Option>
                        ))
                    )}
                </Combobox.Options>
            </div>
        </Combobox>
    )
}
