import Contract from '@/app/ui/contract/contract';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Quản lý hợp đồng',
};

const ContractPage = () => {
    return (
        <>
            <Contract/>
        </>
    )
}

export default ContractPage