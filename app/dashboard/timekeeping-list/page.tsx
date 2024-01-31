import TimekeepingListForm from "@/app/ui/timekeeping-list/timekeeping-list-form"
import TimekeepingListTable from "@/app/ui/timekeeping-list/timekeeping-list-table"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Danh sách chấm công',
};

const TimekeepingList = () => {
    return (
        <>
            <TimekeepingListForm />
            <TimekeepingListTable />
        </>
    )
}

export default TimekeepingList