import gregorian_pt_br_minusculas from "@/utils/LocaleBR";
import DatePicker from "react-multi-date-picker";

import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useEffect, useState } from "react";
export default function DataRangeCustom() {

    const [mode, setMode] = useState<boolean>(false);

    useEffect(() => {

        setMode(window?.matchMedia('(prefers-color-scheme: dark)').matches);

    }, [setMode])

    return (

        <DatePicker
            multiple
            range
            dateSeparator=" até "
            multipleRangeSeparator="&"
            locale={gregorian_pt_br_minusculas}
            placeholder="Escolha um período"
            className={mode ? "bg-dark" : ""}
            inputClass="bg-white dark:bg-gray-800 border-none text-xl text-gray-900 dark:text-white"
            containerClassName="text-gray-900 dark:text-white "
            plugins={[
                <DatePanel key={1} />,
                <TimePicker key={2} position="bottom" />
            ]} />
    )

}