"use client";
import { Combobox, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { HiOutlineChevronUpDown } from 'react-icons/hi2';


export interface Dictionary<T> {
    id: number;
    nome: string;
}

export interface ComboBoxCustomProps<T> {
    elementos: T[];

    elementoId: keyof T;
    elementoField: keyof T;
    callback?: (elemento: T) => void;
    defaultValue?: T;
    id: string;
    label: React.ReactNode;
}

export default function ComboBoxCustom<T>({
    elementos,
    label,
    elementoId,
    elementoField,
    callback = () => { return },
    defaultValue,
    id
}: ComboBoxCustomProps<T>) {

    const [selected, setSelected] = useState<T | undefined>(defaultValue)
    const [query, setQuery] = useState('')

    const filteredPeople =
        query === ''
            ? elementos
            : elementos.filter((elemento) =>
                (elemento[elementoField] as string)
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    return (
        <Combobox value={selected} onChange={(e) => { setSelected(e); callback(e) }}>
            <div className="relative mt-1">
                <div className="mb-2 block">
                    {label}
                </div>
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white dark:bg-gray-700 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                        className="block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
                        displayValue={(object: T) => object[elementoField] as string}
                        onChange={(event) => setQuery(event.target.value)}
                        id={id}

                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <HiOutlineChevronUpDown
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-700">
                        {filteredPeople.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-white">
                                Nada encontrado.
                            </div>
                        ) : (
                            filteredPeople.map((object) => (
                                <Combobox.Option
                                    key={object[elementoId] as number}
                                    className={({ active }) =>
                                        `relative cursor-default select-none z-10 py-2 pl-10 pr-4 ${active ? 'bg-slate-300 dark:text-black dark:bg-white' : 'dark:bg-gray-700 dark:text-white'
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
                </Transition>
            </div>
        </Combobox>
    )
}
