import { useEffect, useRef, useState } from 'react'
import { DateRangePicker, Range, ClassNames } from 'react-date-range'

import { addDays } from 'date-fns'
import format from 'date-fns/format'
import { ptBR } from 'date-fns/locale'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateRangePickerComp = () => {

    // date state
    const [range, setRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])

    // open close
    const [open, setOpen] = useState<boolean>(false)

    // get the target element to toggle
    const refOne = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // event listeners
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
        return () => {
            // cleanup event listeners
            document.removeEventListener("keydown", hideOnEscape, true);
            document.removeEventListener("click", hideOnClickOutside, true);
        };
    }, [])

    // hide dropdown on ESC press
    const hideOnEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            setOpen(false)
        }
    }

    // Hide dropdown on outside click
    const hideOnClickOutside = (e: MouseEvent) => {
        console.log(e)
        if (refOne.current && !refOne.current.contains(e.target as Node)) {
            setOpen(false)
        }
    }

    const style: ClassNames = {
        dateRangeWrapper: "1",
        calendarWrapper: "2",
        dateDisplay: "1",
        dateDisplayItem: "1",
        dateDisplayItemActive: "1",
        monthAndYearWrapper: "1",
        monthAndYearPickers: "1",
        nextPrevButton: "1",
        month: "1",
        weekDays: "1",
        weekDay: "1",
        days: "1",
        day: "1",
        dayNumber: "1",
        dayPassive: "1",
        dayToday: "1",
        dayStartOfWeek: "1",
        dayEndOfWeek: "1",
        daySelected: "1",
        dayDisabled: "1",
        dayStartOfMonth: "1",
        dayEndOfMonth: "1",
        dayWeekend: "1",
        dayStartPreview: "1",
        dayInPreview: "1",
        dayEndPreview: "1",
        dayHovered: "1",
        dayActive: "1",
        inRange: "1",
        endEdge: "1",
        startEdge: "1",
        prevButton: "1",
        nextButton: "1",
        selected: "1",
        months: "1",
        monthPicker: "1",
        yearPicker: "1",
        dateDisplayWrapper: "1",
        definedRangesWrapper: "1",
        staticRanges: "1",
        staticRange: "1",
        inputRanges: "1",
        inputRange: "1",
        inputRangeInput: "1",
        dateRangePickerWrapper: "1",
        staticRangeLabel: "1",
        staticRangeSelected: "1",
        monthName: "1",
        infiniteMonths: "1",
        monthsVertical: "1",
        monthsHorizontal: "1",
    }

    return (
        <div className="calendarWrap">

            <input
                value={`${format(range[0].startDate!, "MM/dd/yyyy")} até ${format(range[0].endDate!, "MM/dd/yyyy")}`}
                readOnly
                className="inputBox"
                onClick={() => setOpen(open => !open)}
            />

            <div ref={refOne}>
                {open &&
                    <DateRangePicker
                        onChange={item => setRange([item.selection])}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        locale={ptBR}
                        months={2}
                        classNames={style}
                        direction="horizontal"
                    />
                }
            </div>

        </div>
    )
}

export default DateRangePickerComp