import ManageExplanationsForm from "@/app/ui/manage-explanations/manage-explanations-form"
import ManageExplanationsTable from "@/app/ui/manage-explanations/manage-explanations-table"
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Quản lý giải trình',
};

const ManageExplanationsPage = () => {
    return (
        <>
            <ManageExplanationsForm />
            <ManageExplanationsTable />
        </>
    )
}

export default ManageExplanationsPage