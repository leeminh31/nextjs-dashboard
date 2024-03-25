import OnLeaveTable from "@/app/ui/on-leave/on-leave-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý phép",
};

const OnLeavePage = () => {
  return (
    <>
      <OnLeaveTable />
    </>
  );
};

export default OnLeavePage;
