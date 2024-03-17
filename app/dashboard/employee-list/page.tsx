import EmployeeList from "@/app/ui/employee-list/employee-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý nhân viên",
};

const EmployeeListPage = () => {
  return (
    <>
      <EmployeeList />
    </>
  );
};

export default EmployeeListPage;
