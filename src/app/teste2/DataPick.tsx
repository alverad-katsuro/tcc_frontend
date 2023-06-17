import React, { useState } from 'react';

const DateRangePickerComp = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'start-date') {
            setStartDate(new Date(value));
        } else if (name === 'end-date') {
            setEndDate(new Date(value));
        }
    };

    return (
        <div className="container">
            <h1>Date Range Picker</h1>

            <div className="columns">
                <div className="column col-6">
                    <label htmlFor="start-date" className="form-label">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="start-date"
                        name="start-date"
                        className="form-input"
                        value={startDate.toISOString().split('T')[0]}
                        onChange={handleDateChange}
                    />
                </div>
                <div className="column col-6">
                    <label htmlFor="end-date" className="form-label">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="end-date"
                        name="end-date"
                        className="form-input"
                        value={endDate.toISOString().split('T')[0]}
                        onChange={handleDateChange}
                    />
                </div>
            </div>

            <div className="divider"></div>

            <div>
                <strong>Selected Range:</strong> {startDate.toDateString()} - {endDate.toDateString()}
            </div>
        </div>
    );
};

export default DateRangePickerComp;
