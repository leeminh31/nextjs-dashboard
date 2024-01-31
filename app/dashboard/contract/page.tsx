import ContractForm from "@/app/ui/contract/contract-form"
import ContractTable from "@/app/ui/contract/contract-table"
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Quản lý hợp đồng',
};

const ContractPage = () => {
    return (
        <>
            <ContractForm/>
            <ContractTable/>
        </>
    )
}

export default ContractPage