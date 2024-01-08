'use client'

import { useState } from "react"
import MonthlyReportForm from "./monthly-report-form"
import MonthlyReportTable from "./monthly-report-table"

const MonthlyReport = () => {
    const [date, setDate] = useState(new Date())

    const onChangeDate = (e:any) => {
        setDate(e)
    } 

    return (
        <>
            <MonthlyReportForm onChangeDate={onChangeDate}/>
            <MonthlyReportTable date={date}/>
        </>
    )
}

export default MonthlyReport