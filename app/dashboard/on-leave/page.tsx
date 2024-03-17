import OnLeaveForm from "@/app/ui/on-leave/on-leave-form";
import OnLeaveTable from "@/app/ui/on-leave/on-leave-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý phép",
};

const OnLeavePage = () => {
  return (
    <>
      <OnLeaveForm />
      <OnLeaveTable />
    </>
  );
};

export default OnLeavePage;
