import StaffTransferForm from "@/app/ui/staff-transfer/staff-transfer-form";
import StaffTransferTable from "@/app/ui/staff-transfer/staff-transfer-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều chuyển nhân viên",
};

const StaffTransferPage = () => {
  return (
    <>
      <StaffTransferForm />
      <StaffTransferTable />
    </>
  );
};

export default StaffTransferPage;
