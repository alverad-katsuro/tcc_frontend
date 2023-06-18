
"use client";
import gregorian_pt_br_minusculas from "@/utils/LocaleBR";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"


export default async function Home() {


    return (
        <DatePicker
            multiple
            range
            dateSeparator=" até "
            multipleRangeSeparator="&"
            locale={gregorian_pt_br_minusculas}
            className="bg-dark"

            plugins={[
                <DatePanel key={1} />
            ]}
        />

    )
}