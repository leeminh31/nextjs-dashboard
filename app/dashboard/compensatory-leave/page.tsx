import CompensatoryLeaveForm from '@/app/ui/compensatory-leave/compensatory-leave-form';
import CompensatoryLeaveTable from '@/app/ui/compensatory-leave/compensatory-leave-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý bù',
};

export default function CompensatoryLeavePage() {
  return (
    <>
      <CompensatoryLeaveForm/>
      <CompensatoryLeaveTable/>
    </>
  );
}