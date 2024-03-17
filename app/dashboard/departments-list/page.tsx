import DepartmentsList from "@/app/ui/departments-list/departments-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý phòng ban",
};

const DepartmentsListPage = () => {
  return (
    <>
      <DepartmentsList />
    </>
  );
};

export default DepartmentsListPage;
