import MonthlyReport from "@/app/ui/monthly-report/monthly-report"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Báo cáo theo tháng',
};

const MonthlyReportPage = () => {
    return (
        <>
            <MonthlyReport/>
        </>
    )
}

export default MonthlyReportPage