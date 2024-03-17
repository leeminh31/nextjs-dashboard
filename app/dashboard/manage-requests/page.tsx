import ManageRequestsForm from "@/app/ui/manage-requests/manage-requests-form";
import ManageRequestsTable from "@/app/ui/manage-requests/manage-requests-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý yêu cầu",
};

const ManageRequestsPage = () => {
  return (
    <>
      <ManageRequestsForm />
      <ManageRequestsTable />
    </>
  );
};

export default ManageRequestsPage;
