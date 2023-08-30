import gregorian_pt_br_minusculas from "@/utils/LocaleBR";
import DatePicker from "react-multi-date-picker";

import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

import { TarefaDTO } from "@/model/quadro";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type numberArray = number[];


export interface DataRangeCustomProps {
    tarefa?: TarefaDTO;
    setTask: Dispatch<SetStateAction<TarefaDTO | undefined>>;
}

export default function DataRangeCustom({ tarefa, setTask }: DataRangeCustomProps) {

    const [mode, setMode] = useState<boolean>(false);

    useEffect(() => {

        setMode(window?.matchMedia('(prefers-color-scheme: dark)').matches);

    }, [setMode])

    function setDate(datas: numberArray[]) {
        if (datas.length === 0) {
            setTask(task => {
                if (task !== undefined) {
                    const newTask: TarefaDTO = { ...task, fim: undefined, inicio: undefined }
                    return newTask;
                }
            })
        }
        if (datas.length > 1) {
            datas.shift();
        }
        const primeiraData: numberArray | undefined = datas[0];
        if (primeiraData?.length === 2) {
            setTask(task => {
                if (task !== undefined) {
                    const newTask: TarefaDTO = { ...task, fim: new Date(primeiraData[1]).toISOString(), inicio: new Date(primeiraData[0]).toISOString() }
                    return newTask;
                }
            })
        }
    }
    const initData: numberArray[] = [];

    if (tarefa?.inicio != undefined && tarefa?.fim != undefined) {
        initData.push([new Date(tarefa?.inicio).getTime(), new Date(tarefa?.fim).getTime()]);
    }



    return (

        <DatePicker
            multiple
            range
            dateSeparator=" até "
            multipleRangeSeparator="&"
            locale={gregorian_pt_br_minusculas}
            value={initData as any}
            placeholder="Escolha um período"
            className={mode ? "bg-dark" : ""}
            inputClass="bg-white dark:bg-gray-800 border-none text-xl text-gray-900 dark:text-white"
            containerClassName="text-gray-900 dark:text-white "
            onChange={dateObject => {
                setDate(JSON.parse(JSON.stringify(dateObject)))
            }}
            plugins={[
                <DatePanel key={1} />,
                // <TimePicker key={2} position="bottom" />
            ]} />
    )

}